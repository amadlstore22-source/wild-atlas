<#
.SYNOPSIS
  Submits a batch of URLs to the Google Indexing API.

.DESCRIPTION
  Wrapper around google-index.mjs that resolves every path relative to the
  repo root, so it works no matter which directory you run it from. Running
  the raw node command from C:\WINDOWS\System32 fails with MODULE_NOT_FOUND,
  which is easy to do and gives a confusing error.

  Also fills in the --key flag, which is always the same file.

.EXAMPLE
  .\scripts\index-batch.ps1 docs/batch-2026-08-01.txt

.EXAMPLE
  .\scripts\index-batch.ps1 docs/batch-2026-08-01.txt -DryRun

.NOTES
  Two guards run before anything is sent, each from a real incident:

    - the batch is refused if nothing is outstanding site-wide (2026-08-16:
      200 URLs re-sent for nothing, and Google reported no error)
    - the batch is refused if any URL does not serve HTTP 200 (2026-08-28:
      six URLs 404'd because Vercel was still deploying)

  Override with -Force and -SkipLiveCheck respectively. -DryRun skips both,
  since it sends nothing.
#>
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Batch,

  [switch]$DryRun,

  # Submit at most N URLs. Use with -Offset to page a list larger than the
  # 200/day quota across consecutive days without editing the file.
  [int]$Limit = 0,

  # Skip the first N URLs.
  [int]$Offset = 0,

  # Send even if the batch has already been submitted, or if some URLs are not
  # serving 200. Both guards exist because of real incidents -- see below.
  [switch]$Force,

  # Skip the live-URL check. Only for a batch you have already verified.
  [switch]$SkipLiveCheck
)

$ErrorActionPreference = "Stop"

# Repo root is the parent of the directory holding this script.
$repo = Split-Path -Parent $PSScriptRoot
$key = Join-Path $repo "service-account.json"
$script = Join-Path $repo "scripts/google-index.mjs"

# Accept either a repo-relative path or an absolute one.
$urls = if ([System.IO.Path]::IsPathRooted($Batch)) { $Batch } else { Join-Path $repo $Batch }

if (-not (Test-Path $key))   { throw "Service account key not found: $key" }
if (-not (Test-Path $urls))  { throw "Batch file not found: $urls" }

$total = (Get-Content $urls | Where-Object { $_.Trim() -ne "" }).Count

# What will actually be sent once --offset and --limit are applied.
$count = $total - $Offset
if ($count -lt 0) { $count = 0 }
if ($Limit -gt 0 -and $Limit -lt $count) { $count = $Limit }

Write-Host "Submitting $count of $total URLs from $(Split-Path -Leaf $urls)" -ForegroundColor Cyan

# The 200/day quota is per PROJECT per DAY, not per batch. Warning only when a
# single file exceeds 200 missed the real failure mode: two batches of 78 and
# 159 on the same day, where the second is rejected from URL 123 onward with a
# 429. Track what has already gone out today and warn on the running total.
$ledger = Join-Path $repo "docs/.submitted-today.json"
$today = (Get-Date).ToString("yyyy-MM-dd")
$usedToday = 0
if (Test-Path $ledger) {
  try {
    $entry = Get-Content $ledger -Raw | ConvertFrom-Json
    if ($entry.date -eq $today) { $usedToday = [int]$entry.count }
  } catch { $usedToday = 0 }
}

$remaining = 200 - $usedToday
if ($usedToday -gt 0) {
  Write-Host "Already submitted today: $usedToday - $remaining of the 200/day quota left." -ForegroundColor DarkGray
}

if ($count -gt $remaining) {
  Write-Host ""
  Write-Host "WARNING: this exceeds today's remaining quota ($remaining)." -ForegroundColor Yellow
  Write-Host "         URLs past #$remaining will fail with HTTP 429." -ForegroundColor Yellow
  if ($remaining -gt 0) {
    Write-Host "         Run with -Limit $remaining today, then -Offset $remaining tomorrow." -ForegroundColor Yellow
  } else {
    Write-Host "         Quota is exhausted for today. Try again after midnight Pacific." -ForegroundColor Yellow
  }
  Write-Host ""
}

# ---------------------------------------------------------------------------
# Guard 1: has this batch already gone out?
#
# On 2026-08-16, 200 URLs were re-submitted because a fresh queue was built
# from the sitemap instead of reading docs/INDEXING-STATE.md. Google accepted
# all 200 -- there is no error when you re-send -- so the only symptom was a
# day of quota buying nothing. A spent batch file is the easiest way to repeat
# that, since it looks exactly like an unsent one.
#
# diff-unsubmitted.mjs compares the list against what has actually been sent,
# which is the only question that matters.
# ---------------------------------------------------------------------------
if (-not $DryRun -and -not $Force) {
  $diff = Join-Path $repo "scripts/seo/diff-unsubmitted.mjs"
  if (Test-Path $diff) {
    $diffOut = & node $diff 2>&1 | Out-String
    if ($diffOut -match "NOT yet submitted\s*:\s*(\d+)") {
      $outstanding = [int]$Matches[1]
      if ($outstanding -eq 0) {
        Write-Host ""
        Write-Host "STOP: nothing is outstanding - every site URL has already been submitted." -ForegroundColor Red
        Write-Host "      Re-sending buys nothing and spends quota. Google accepts duplicates" -ForegroundColor Red
        Write-Host "      silently, so there would be no error to notice." -ForegroundColor Red
        Write-Host ""
        Write-Host "      If you genuinely need to re-submit (a price changed, say), use -Force." -ForegroundColor DarkGray
        exit 1
      }
      Write-Host "Outstanding across the site: $outstanding URL(s)." -ForegroundColor DarkGray
    }
  }
}

# ---------------------------------------------------------------------------
# Guard 2: are the URLs actually serving?
#
# On 2026-08-28 a batch of six was built the moment the commit was pushed, and
# all six still returned 404 -- Vercel had not finished deploying. Submitting
# then spends quota to show Google a 404 on a brand-new page, and the URLs can
# be recorded as not-found. They went live ~105 seconds later.
#
# HEAD is enough to tell serving from missing, and is far cheaper than GET.
# ---------------------------------------------------------------------------
if (-not $DryRun -and -not $SkipLiveCheck) {
  $toCheck = Get-Content $urls | Where-Object { $_.Trim() -ne "" }
  if ($Offset -gt 0) { $toCheck = $toCheck | Select-Object -Skip $Offset }
  if ($Limit -gt 0)  { $toCheck = $toCheck | Select-Object -First $Limit }

  Write-Host "Checking $($toCheck.Count) URL(s) are live..." -ForegroundColor DarkGray

  # HttpClient rather than Invoke-WebRequest. The first version of this check
  # used Invoke-WebRequest -SkipHttpErrorCheck, which is PowerShell 7+ only:
  # under Windows PowerShell 5.1 -- the default shell, and the one this repo is
  # actually driven from -- it throws a parameter-binding error BEFORE issuing
  # any request. The catch turned that into code 0, so every URL failed the
  # check whether or not it was live, and the guard blocked every legitimate
  # batch. A guard that cannot pass is worse than no guard: it trains you to
  # reach for -SkipLiveCheck, which is exactly what it exists to prevent.
  #
  # HttpClient is .NET Framework 4.5+ / .NET Core, so it behaves identically on
  # 5.1 and 7.x, returns non-2xx as a status rather than an exception, and does
  # not follow redirects when told not to.
  Add-Type -AssemblyName System.Net.Http -ErrorAction SilentlyContinue
  $handler = New-Object System.Net.Http.HttpClientHandler
  $handler.AllowAutoRedirect = $false
  $client = New-Object System.Net.Http.HttpClient($handler)
  $client.Timeout = [TimeSpan]::FromSeconds(20)

  $bad = New-Object System.Collections.Generic.List[string]
  foreach ($u in $toCheck) {
    try {
      $req = New-Object System.Net.Http.HttpRequestMessage(
        [System.Net.Http.HttpMethod]::Head, $u.Trim())
      $resp = $client.SendAsync($req).GetAwaiter().GetResult()
      $code = [int]$resp.StatusCode
      $resp.Dispose()
    } catch {
      # A genuine transport failure (DNS, TLS, timeout). Distinct from a live
      # server returning an error status, so report it as such rather than
      # silently as 0.
      $code = -1
    }
    # A 3xx matters as much as a 404: submitting a URL that redirects asks
    # Google to crawl the redirect rather than the page, which is what shows up
    # in Search Console as "Page with redirect".
    if ($code -ne 200) {
      $label = if ($code -eq -1) { "no-response" } else { $code }
      $bad.Add(("{0}  {1}" -f $label, $u.Trim()))
    }
  }
  $client.Dispose()

  if ($bad.Count -gt 0) {
    Write-Host ""
    Write-Host "STOP: $($bad.Count) URL(s) are not serving 200:" -ForegroundColor Red
    $bad | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "      A 404 usually means the deploy has not finished - wait a minute and retry." -ForegroundColor Yellow
    Write-Host "      'no-response' is a transport failure (DNS/TLS/timeout), not the server." -ForegroundColor Yellow
    Write-Host "      A 3xx means the list holds a URL that redirects; fix the list, do not submit it." -ForegroundColor Yellow
    Write-Host "      Override with -SkipLiveCheck only if you know why." -ForegroundColor DarkGray
    exit 1
  }
  Write-Host "All $($toCheck.Count) serving 200." -ForegroundColor DarkGray
}

$nodeArgs = @($script, "--key", $key, "--urls", $urls)
if ($DryRun)      { $nodeArgs += "--dry-run" }
if ($Limit -gt 0) { $nodeArgs += @("--limit", $Limit) }
if ($Offset -gt 0){ $nodeArgs += @("--offset", $Offset) }

# Stream the submitter's output line by line as it arrives, while capturing it
# so we can read back how many requests actually reached Google. Piping the
# whole run into Tee-Object buffered everything and showed a blank screen until
# it finished -- the per-URL progress has to stay live on a run this long.
#
# Charging the whole batch to the ledger was wrong: a network drop that never
# left the machine consumes no quota, but still got billed to the day -- which
# is how a run of 15 real submissions reported 146/200 used.
$captured = New-Object System.Collections.Generic.List[string]
& node @nodeArgs 2>&1 | ForEach-Object {
  $line = [string]$_
  $captured.Add($line)
  # The marker is machine-readable bookkeeping, not output for the operator.
  if ($line -notmatch '^QUOTA_CONSUMED=') { Write-Host $line }
}

# Record the run so the next invocation today knows the remaining quota.
# Counts what was ATTEMPTED, not what succeeded: a 429 still consumes nothing,
# but anything that returned 200 did, and attempts are the safe over-estimate.
#
# Only when node actually ran, though. This used to add $count unconditionally,
# so a run that died on a network error before sending a single URL still
# charged the full batch against the day -- one ETIMEDOUT took the ledger to
# 400/200 having submitted nothing, and locked out the rest of the day.
# Exit code 0 means the submitter completed and printed its own tally; anything
# else means we cannot know what went out, and the safe assumption for a
# CONNECTION failure is that nothing did.
$submitterExit = $LASTEXITCODE
if (-not $DryRun -and $submitterExit -eq 0) {
  # Prefer the submitter's own count of requests that reached Google.
  # Fall back to the batch size only if the marker is missing (older script).
  $consumed = $count
  $marker = $captured | Select-String -Pattern '^QUOTA_CONSUMED=(\d+)$' |
    Select-Object -Last 1
  if ($marker) { $consumed = [int]$marker.Matches[0].Groups[1].Value }
  $newTotal = $usedToday + $consumed
  @{ date = $today; count = $newTotal } | ConvertTo-Json -Compress |
    Set-Content -Path $ledger -Encoding utf8
  Write-Host ""
  Write-Host "Quota used today: $newTotal / 200" -ForegroundColor DarkGray
} elseif (-not $DryRun) {
  Write-Host ""
  Write-Host "Submitter exited with code $submitterExit - ledger NOT advanced." -ForegroundColor Yellow
  Write-Host "If it failed before sending, today's quota is untouched. Re-run when the network is back." -ForegroundColor Yellow
}
