# Moroccan Visual Language — Research & Application

**Date:** 29 July 2026
**Status:** Complete. Cultural research checked against the design system already in the repo.

---

## Headline finding: your design system is already correct

Before recommending anything, I audited what exists. **The Moroccan visual language is
already built** in `app/globals.css` and `components/ui/MoroccanMotifs.tsx`, and it is
faithful to the source material. This research mostly *validates* it and identifies where
it is under-deployed.

---

## The cultural source material

### Zellige — what it actually is
Hand-cut mosaic tilework covering fountains, floors, riad walls, and madrasa courtyards.
Clay from near Fez is shaped, fired, glazed, fired again, then a master craftsman (**maâlem**)
chisels each tile by hand into stars, polygons, half-moons and slivers.

**The geometry:** patterns are built **from the compass and the straightedge** — stars of
**8, 12, 16, up to 24 points** radiating in interlaced rosettes.

→ **Your implementation is accurate.** `ZelligeDivider` uses the **khatam** (8-point star)
constructed as *two superimposed squares, one rotated 45°* — which is precisely the
classical construction that generates the Moroccan star-and-cross. This is not a
decorative approximation; it is the real geometric method. Good.

### The authentic palette
Traditional glaze colours: **white, black, green, yellow, blue, and a deep cobalt-and-brown.**
The classic palette is often summarised as **Fes blue, green, honey, and white.**

→ **Your tokens map onto this well:**

| Your token | Value | Authentic counterpart |
|---|---|---|
| `--color-indigo` | `#2B3A67` | Fes/Majorelle blue ✅ |
| `--color-saffron` / `brass` | `#C97B2B` | honey / yellow ochre ✅ |
| `--color-olive` | `#6B7A45` | zellige green ✅ |
| `--color-surface` | `#F2EDE4` | tadelakt plaster / white ✅ |
| `--color-terracotta` | `#B4472C` | fired clay ✅ |
| `--color-ink` | `#1F1A16` | warm near-black ✅ |

There is nothing to "fix" in the palette. It is a considered, culturally-grounded system —
notably it avoids the generic "travel teal" and sterile white that plague competitor sites.

### Riad architecture
Key features: **zellige tiles, tadelakt plaster walls, ornate wood/metalwork**, and the
central courtyard — an inward-facing, calm, open space.

→ Your CSS header already names its sources: *"tadelakt plaster, zellige geometry,
horseshoe arch, Amazigh (Tifinagh) script."* The `tex-plaster` / `tex-sand` textures and
the `ArchImage` horseshoe clip-path implement this.

### Amazigh (Berber) heritage
Distinct from Arab-Andalusian zellige — the **Tifinagh** script and the **yaz (ⵣ)** symbol
represent free/noble people and are a genuine Amazigh identity marker.

→ You use ⵣ as the itinerary list marker, with the code comment *"authentic Berber heritage
mark, not decoration."* This is exactly the right instinct: it honours the guides' actual
heritage rather than treating Morocco as generic exotica.

---

## The real gap: deployment, not design

Motif usage audit across the codebase:

| Motif | Where it's used | Assessment |
|---|---|---|
| `ZelligeBand` | about, blog index, contact, destinations (×2), guides | Well used |
| `ZelligeField` | about, blog index, contact, destinations, news teaser | Well used |
| `ArabesqueDivider` | about | Fine |
| `ZelligeStar` | CategoryAnimation | Fine |
| `ZelligeDivider` | homepage → **now also tour + blog detail** | ✅ Fixed 29 Jul |
| **`ArchImage`** | **OurStory only** | ⚠️ Under-used |
| **`ArchDivider`** | **nowhere** | ⚠️ Unused |

**The pattern was backwards:** ornament sat on low-traffic pages (about, contact) while the
two highest-intent page types — **tour detail and blog post — had zero motifs.**
Fixed for the divider on 29 Jul (commit `c2ea51b`).

### Why the arch was NOT forced onto tour/blog pages
`ArchImage` clips content to a horseshoe-arch silhouette. It needs a **standalone lead
image**. Both the tour hero and blog hero are **full-bleed backgrounds with title overlays**,
and the tour gallery is a **flush 3-column grid**. Clipping either would leave broken gaps
against adjacent elements — it would read as a bug, not a flourish.

**The principle:** authenticity comes from restraint and correctness. A motif applied where
it structurally does not fit damages credibility more than its absence.

**Where the arch *would* work:** guide portrait photos (once real photos exist — a
horseshoe-arch portrait frame is genuinely evocative of a riad doorway), and destination
hub lead images.

---

## Design guardrails (derived, not invented)

1. **Ornament only at structural breaks.** The `ZelligeDivider` docstring already says
   *"max 5 per page, between major sections only. Do not tile it, nest it in cards, or use
   it as a background."* Keep enforcing this.
2. **Geometry must be constructible.** Real zellige comes from compass-and-straightedge.
   Never fake a "Moroccan-looking" squiggle.
3. **Restraint over decoration.** Competitor sites (e.g. emoji-heavy Toubkal Peaks) prove
   that more ornament reads as *less* premium.
4. **Photography beats pattern.** Research is unambiguous that stock imagery reduces trust
   and real photography builds it. Your authentic Toubkal photos do more for Moroccan
   feeling than any tile pattern could.

---

## Sources
- [Zellige: The Art of Moroccan Tilework — Morocco Guide](https://www.morocco-guide.com/culture/zellige-moroccan-tiles/)
- [Moroccan Architecture Guide: Riads, Kasbahs & Zellige — Moratra](https://moratra.com/moroccan-architecture-guide/)
- [Zellige tilework techniques in Moroccan Architecture](https://moroccandiaspora.com/zellige-tilework-techniques-in-moroccan-architecture/)
- [The Enchanting World of Moroccan Mosaic](https://www.momentslog.com/culture/the-enchanting-world-of-moroccan-mosaic-zellige-patterns-and-architectural-beauty)
- [Designing a Moroccan style house — Clé Tile](https://www.cletile.com/blogs/cle-education/moroccan-style-house)
- Internal: `app/globals.css`, `components/ui/MoroccanMotifs.tsx`, `components/ui/ZelligeDivider.tsx`
