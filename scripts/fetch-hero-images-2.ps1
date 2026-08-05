<#
.SYNOPSIS
  Round 2: downloads the remaining 71 per-page hero images.

.DESCRIPTION
  fetch-hero-images.ps1 covered the 11 heroes SHARED across many pages. It
  missed the long tail: 71 images used by exactly one page each (x6 locales),
  every one of them that page-s LCP element. They were hidden because the
  detection script printed only the top 6 sources per section.

  Combined with round 1, this puts every above-the-fold image on our own
  origin, so no page waits on a Pexels/Unsplash round trip before first paint.

  Requested at w=2400: this is the build-time original that next/image
  downsizes from. Visitors never receive the full-size file.

  ~71 files, roughly 60-80 MB. Takes a few minutes.

.EXAMPLE
  .\scripts\fetch-hero-images-2.ps1
#>

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $repo "public/gallery"

if (-not (Test-Path $dest)) { throw "Gallery folder not found: $dest" }

# filename -> source URL, grouped by section.
$images = [ordered]@{

  # ---- blog ----
  "blog-agafay-desert-marrakech-guide.jpg"                 =
    "https://images.unsplash.com/photo-1673283579119-d108cbd0ed7f?w=2400&q=85"
  "blog-agafay-vs-merzouga-vs-zagora.jpg"                  =
    "https://images.unsplash.com/photo-1614364962243-5eefd3905fe9?w=2400&q=85"
  "blog-ait-benhaddou-guide.jpg"                           =
    "https://images.unsplash.com/photo-1527338611623-4e242563220a?w=2400&q=85"
  "blog-alcohol-in-morocco.jpg"                            =
    "https://images.pexels.com/photos/30497987/pexels-photo-30497987.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-anti-atlas-trekking-guide.jpg"                     =
    "https://images.unsplash.com/photo-1575064038796-5f31308aa3e9?w=2400&q=85"
  "blog-argan-oil-souss-valley-agadir-guide.jpg"           =
    "https://images.pexels.com/photos/13812743/pexels-photo-13812743.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-best-day-trips-from-agadir.jpg"                    =
    "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=2400&q=85"
  "blog-best-sim-card-morocco-tourists.jpg"                =
    "https://images.pexels.com/photos/36209321/pexels-photo-36209321.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-best-time-to-visit-morocco.jpg"                    =
    "https://images.unsplash.com/photo-1722180862276-970599009d51?w=2400&q=85"
  "blog-chefchaouen-complete-travel-guide.jpg"             =
    "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=2400&q=85"
  "blog-dades-valley-gorges-guide.jpg"                     =
    "https://images.unsplash.com/photo-1738189237717-739ec4e0ee2a?w=2400&q=85"
  "blog-erg-chebbi-vs-erg-chegaga.jpg"                     =
    "https://images.unsplash.com/photo-1743890914315-b53fb9e704cf?w=2400&q=85"
  "blog-essaouira-day-trip-from-agadir.jpg"                =
    "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=2400&q=85"
  "blog-fes-medina-travel-guide.jpg"                       =
    "https://images.unsplash.com/photo-1528657249085-c569d3c869e4?w=2400&q=85"
  "blog-how-many-days-do-you-need-in-morocco.jpg"          =
    "https://images.unsplash.com/photo-1772580310425-63f2290c2ba7?w=2400&q=85"
  "blog-how-much-does-a-morocco-desert-tour-cost.jpg"      =
    "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=2400&q=85"
  "blog-is-morocco-safe-tourist-guide.jpg"                 =
    "https://images.pexels.com/photos/36871944/pexels-photo-36871944.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-marrakech-medina-complete-guide.jpg"               =
    "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=2400&q=85"
  "blog-marrakech-to-fes-road-trip-guide.jpg"              =
    "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=2400&q=85"
  "blog-marrakech-vs-agadir-which-base.jpg"                =
    "https://images.unsplash.com/photo-1701793347370-bde5c22670e9?w=2400&q=85"
  "blog-merzouga-vs-zagora-which-desert-tour.jpg"          =
    "https://images.pexels.com/photos/37818882/pexels-photo-37818882.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-morocco-food-guide-what-to-eat.jpg"                =
    "https://images.unsplash.com/photo-1661083098412-054431ab7112?w=2400&q=85"
  "blog-morocco-unesco-sites-film-locations.jpg"           =
    "https://images.pexels.com/photos/13811656/pexels-photo-13811656.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-paradise-valley-agadir-complete-guide.jpg"         =
    "https://images.unsplash.com/photo-1777815966041-7d8a58fb7fad?w=2400&q=85"
  "blog-sahara-desert-facts.jpg"                           =
    "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=2400&q=85"
  "blog-sahara-desert-from-agadir.jpg"                     =
    "https://images.unsplash.com/photo-1672754521539-49de145445a6?w=2400&q=85"
  "blog-solo-female-travel-morocco-guide.jpg"              =
    "https://images.pexels.com/photos/35216129/pexels-photo-35216129.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-souss-massa-national-park-birdwatching-guide.jpg"  =
    "https://images.pexels.com/photos/35506095/pexels-photo-35506095.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-taghazout-surf-guide-morocco.jpg"                  =
    "https://images.unsplash.com/photo-1538053367502-742497073841?w=2400&q=85"
  "blog-taroudant-day-trip-from-agadir-guide.jpg"          =
    "https://images.pexels.com/photos/37684084/pexels-photo-37684084.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-todra-gorge-guide.jpg"                             =
    "https://images.unsplash.com/photo-1706804391543-0edd327103d9?w=2400&q=85"
  "blog-visiting-morocco-during-ramadan.jpg"               =
    "https://images.pexels.com/photos/36503098/pexels-photo-36503098.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-what-is-a-kasbah.jpg"                              =
    "https://images.pexels.com/photos/37818895/pexels-photo-37818895.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-what-is-a-riad.jpg"                                =
    "https://images.pexels.com/photos/36966423/pexels-photo-36966423.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "blog-what-to-pack-desert-tour-morocco.jpg"              =
    "https://images.unsplash.com/photo-1685311572420-513619470404?w=2400&q=85"
  "blog-who-are-the-berbers.jpg"                           =
    "https://images.pexels.com/photos/33808740/pexels-photo-33808740.jpeg?auto=compress&cs=tinysrgb&w=2400"

  # ---- categories ----
  "categories-cultural.jpg"                                =
    "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=2400&q=85"

  # ---- destinations ----
  "destinations-agadir.jpg"                                =
    "https://images.unsplash.com/photo-1562874732-260714dfe537?w=2400&q=85"
  "destinations-chefchaouen.jpg"                           =
    "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=2400&q=85"
  "destinations-essaouira.jpg"                             =
    "https://images.unsplash.com/photo-1555686367-56d5186965d5?w=2400&q=85"
  "destinations-fes.jpg"                                   =
    "https://images.unsplash.com/photo-1582742850838-24590fb39fdc?w=2400&q=85"
  "destinations-marrakech.jpg"                             =
    "https://images.unsplash.com/photo-1708823081494-3e5bbd2ce931?w=2400&q=85"
  "destinations-ouzoud.jpg"                                =
    "https://images.unsplash.com/photo-1535027341838-aa4d6ab54a25?w=2400&q=85"
  "destinations-sahara.jpg"                                =
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=2400&q=85"

  # ---- tours ----
  "tours-agadir-imperial-cities-6day.jpg"                  =
    "https://images.pexels.com/photos/30398390/pexels-photo-30398390.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-agadir-surf-lesson.jpg"                           =
    "https://images.unsplash.com/photo-1537174621888-eba6137cf6c9?w=2400&q=85"
  "tours-agadir-to-chefchaouen-5day.jpg"                   =
    "https://images.pexels.com/photos/33891400/pexels-photo-33891400.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-agadir-to-essaouira-day-trip.jpg"                 =
    "https://images.pexels.com/photos/31930613/pexels-photo-31930613.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-agadir-to-fes-4day.jpg"                           =
    "https://images.pexels.com/photos/38112211/pexels-photo-38112211.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-agafay-desert-sunset.jpg"                         =
    "https://images.unsplash.com/photo-1535191059345-c16453b851b2?w=2400&q=85"
  "tours-anti-atlas-trekking-agadir.jpg"                   =
    "https://images.unsplash.com/photo-1517227062101-68105352ffc7?w=2400&q=85"
  "tours-desert-4day-agadir.jpg"                           =
    "https://images.pexels.com/photos/30757368/pexels-photo-30757368.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-desert-4day-marrakech.jpg"                        =
    "https://images.pexels.com/photos/29107888/pexels-photo-29107888.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-erg-chegaga-3day-agadir.jpg"                      =
    "https://images.pexels.com/photos/4405241/pexels-photo-4405241.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-erg-chegaga-3day-marrakech.jpg"                   =
    "https://images.pexels.com/photos/35666328/pexels-photo-35666328.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-family-desert-4day-marrakech.jpg"                 =
    "https://images.pexels.com/photos/10434667/pexels-photo-10434667.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-marrakech-food-market-tour.jpg"                   =
    "https://images.unsplash.com/photo-1761255240953-c571ba0b98d7?w=2400&q=85"
  "tours-marrakech-imperial-cities-5day.jpg"               =
    "https://images.pexels.com/photos/29595710/pexels-photo-29595710.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-marrakech-medina-cultural-tour.jpg"               =
    "https://images.pexels.com/photos/34793906/pexels-photo-34793906.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-marrakech-to-fes-3day.jpg"                        =
    "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=2400&q=85"
  "tours-merzouga-3day-agadir.jpg"                         =
    "https://images.pexels.com/photos/9029494/pexels-photo-9029494.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-merzouga-stargazing-desert-tour.jpg"              =
    "https://images.unsplash.com/photo-1683138155815-d7edd806d8a3?w=2400&q=85"
  "tours-ourika-valley-day-hike.jpg"                       =
    "https://images.pexels.com/photos/38084347/pexels-photo-38084347.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-ouzoud-waterfalls-day-trip.jpg"                   =
    "https://images.unsplash.com/photo-1683028094236-7e5655c6607b?w=2400&q=85"
  "tours-sahara-2day-agadir.jpg"                           =
    "https://images.pexels.com/photos/35976808/pexels-photo-35976808.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-sous-massa-national-park.jpg"                     =
    "https://images.unsplash.com/photo-1593253029968-940e0625b482?w=2400&q=85"
  "tours-souss-valley-cultural-tour.jpg"                   =
    "https://images.unsplash.com/photo-1593253029656-9aaee080fb29?w=2400&q=85"
  "tours-taroudant-day-trip-agadir.jpg"                    =
    "https://images.unsplash.com/photo-1778339517491-167ba786167b?w=2400&q=85"
  "tours-toubkal-aguelzim-pass-3day.jpg"                   =
    "https://images.pexels.com/photos/29601658/pexels-photo-29601658.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-zagora-2day-agadir.jpg"                           =
    "https://images.pexels.com/photos/35901289/pexels-photo-35901289.jpeg?auto=compress&cs=tinysrgb&w=2400"
  "tours-zagora-2day-marrakech.jpg"                        =
    "https://images.pexels.com/photos/11387348/pexels-photo-11387348.jpeg?auto=compress&cs=tinysrgb&w=2400"
}

Write-Host "Downloading $($images.Count) page heroes to public/gallery/" -ForegroundColor Cyan
Write-Host ""

$ok = 0; $skip = 0; $fail = 0; $bytes = 0
$i = 0
foreach ($name in $images.Keys) {
  $i++
  $out = Join-Path $dest $name
  if (Test-Path $out) {
    $skip++
    continue
  }
  try {
    Invoke-WebRequest -Uri $images[$name] -OutFile $out -UseBasicParsing
    $len = (Get-Item $out).Length
    $bytes += $len
    Write-Host ("  [{0,2}/{1}] + {2}  ({3} KB)" -f $i, $images.Count, $name, [math]::Round($len/1KB)) -ForegroundColor Green
    $ok++
  } catch {
    Write-Host ("  [{0,2}/{1}] x {2}  - {3}" -f $i, $images.Count, $name, $_.Exception.Message) -ForegroundColor Red
    $fail++
  }
}

Write-Host ""
Write-Host ("Downloaded {0}, skipped {1}, failed {2}  ({3} MB)" -f $ok, $skip, $fail, [math]::Round($bytes/1MB,1)) -ForegroundColor Cyan
if ($fail -gt 0) { Write-Host "Re-run to retry the failures; existing files are skipped." -ForegroundColor Yellow }