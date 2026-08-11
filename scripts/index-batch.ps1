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
#>
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Batch,

  [switch]$DryRun,

  # Submit at most N URLs. Use with -Offset to page a list larger than the
  # 200/day quota across consecutive days without editing the file.
  [int]$Limit = 0,

  # Skip the first N URLs.
  [int]$Offset = 0
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

$nodeArgs = @($script, "--key", $key, "--urls", $urls)
if ($DryRun)      { $nodeArgs += "--dry-run" }
if ($Limit -gt 0) { $nodeArgs += @("--limit", $Limit) }
if ($Offset -gt 0){ $nodeArgs += @("--offset", $Offset) }

& node @nodeArgs

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
  $newTotal = $usedToday + $count
  @{ date = $today; count = $newTotal } | ConvertTo-Json -Compress |
    Set-Content -Path $ledger -Encoding utf8
  Write-Host ""
  Write-Host "Quota used today: $newTotal / 200" -ForegroundColor DarkGray
} elseif (-not $DryRun) {
  Write-Host ""
  Write-Host "Submitter exited with code $submitterExit - ledger NOT advanced." -ForegroundColor Yellow
  Write-Host "If it failed before sending, today's quota is untouched. Re-run when the network is back." -ForegroundColor Yellow
}
