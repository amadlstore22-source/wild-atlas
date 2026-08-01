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
if ($count -gt 200) {
  Write-Host "WARNING: over the 200/day quota - the tail will be rejected." -ForegroundColor Yellow
  Write-Host "         Re-run with -Limit 200, then tomorrow add -Offset 200." -ForegroundColor Yellow
}

$nodeArgs = @($script, "--key", $key, "--urls", $urls)
if ($DryRun)      { $nodeArgs += "--dry-run" }
if ($Limit -gt 0) { $nodeArgs += @("--limit", $Limit) }
if ($Offset -gt 0){ $nodeArgs += @("--offset", $Offset) }

& node @nodeArgs
