<#
.SYNOPSIS
  Downloads the remote hero images that are LCP candidates, so they can be
  served from /public instead of fetched from Pexels/Unsplash at request time.

.DESCRIPTION
  next/image proxies remote sources through /_next/image on our own domain: the
  SERVER fetches the original before it can transcode. On a cold cache that adds
  a full round trip to Pexels or Unsplash before anything paints, which is what
  pushed homepage LCP to 6.8s and tour-page LCP to 4.5s.

  Self-hosting removes that hop entirely. Only images rendered WITHOUT
  loading="lazy" are included — everything below the fold loads after paint and
  never affects LCP, so downloading those would add weight to the repo for no gain.

  Sources are requested at w=2400 regardless of how they are used today: this
  becomes the build-time original, and Next.js downsizes from it per breakpoint.
  Visitors never receive the 2400px file.

  Licensing: Pexels and Unsplash both permit self-hosting under their standard
  licences. Verify anything you sourced elsewhere before redistributing it.

.EXAMPLE
  .\scripts\fetch-hero-images.ps1
#>

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $repo "public/gallery"

if (-not (Test-Path $dest)) { throw "Gallery folder not found: $dest" }

# filename -> source URL. Ordered by how many pages each one affects.
$images = [ordered]@{
  # 66 blog pages
  "blog-hero-atlas-valley-panorama.jpg" =
    "https://images.pexels.com/photos/36540904/pexels-photo-36540904.jpeg?auto=compress&cs=tinysrgb&w=2400"
  # 24 blog pages
  "blog-hero-sahara-dunes-golden.jpg" =
    "https://images.pexels.com/photos/998637/pexels-photo-998637.jpeg?auto=compress&cs=tinysrgb&w=2400"
  # 12 blog pages
  "blog-hero-desert-camp-night.jpg" =
    "https://images.pexels.com/photos/37764121/pexels-photo-37764121.jpeg?auto=compress&cs=tinysrgb&w=2400"
  # 6 homepage variants - the site's single most important image
  "imlil-valley-high-atlas-hero.jpg" =
    "https://images.pexels.com/photos/37538532/pexels-photo-37538532.jpeg?auto=compress&cs=tinysrgb&w=2400"
  # 12 category pages
  "category-hero-mgoun-massif.jpg" =
    "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=2400&q=85"
  "category-hero-desert-caravan.jpg" =
    "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=2400&q=85"
  "category-hero-medina-doorway.jpg" =
    "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=2400&q=85"
  "category-hero-atlas-ridge.jpg" =
    "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=2400&q=85"
  # destinations + tours share this one
  "destination-hero-toubkal-snow.jpg" =
    "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=2400&q=85"
  # 6 about pages
  "about-hero-berber-team.jpg" =
    "https://images.unsplash.com/photo-1548018560-4cb48a8837c1?w=2400&q=80"
  # 6 contact pages
  "contact-hero-morocco-doorway.jpg" =
    "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=2400&q=80"
}

Write-Host "Downloading $($images.Count) hero images to public/gallery/" -ForegroundColor Cyan
Write-Host ""

$ok = 0; $skip = 0; $fail = 0
foreach ($name in $images.Keys) {
  $out = Join-Path $dest $name
  if (Test-Path $out) {
    Write-Host "  = $name (already present)" -ForegroundColor DarkGray
    $skip++
    continue
  }
  try {
    Invoke-WebRequest -Uri $images[$name] -OutFile $out -UseBasicParsing
    $kb = [math]::Round((Get-Item $out).Length / 1KB)
    Write-Host "  + $name  ($kb KB)" -ForegroundColor Green
    $ok++
  } catch {
    Write-Host "  x $name  - $($_.Exception.Message)" -ForegroundColor Red
    $fail++
  }
}

Write-Host ""
Write-Host "Downloaded $ok, skipped $skip, failed $fail." -ForegroundColor Cyan
if ($fail -eq 0) {
  Write-Host "Next: tell Claude they are in place and the code will be pointed at them." -ForegroundColor Cyan
}
