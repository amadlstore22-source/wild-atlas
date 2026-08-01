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

  [switch]$DryRun
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

$count = (Get-Content $urls | Where-Object { $_.Trim() -ne "" }).Count
Write-Host "Submitting $count URLs from $(Split-Path -Leaf $urls)" -ForegroundColor Cyan
if ($count -gt 200) {
  Write-Host "WARNING: over the 200/day quota - the tail will be rejected." -ForegroundColor Yellow
}

$nodeArgs = @($script, "--key", $key, "--urls", $urls)
if ($DryRun) { $nodeArgs += "--dry-run" }

& node @nodeArgs
