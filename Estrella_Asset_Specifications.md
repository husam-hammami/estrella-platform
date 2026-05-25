# Estrella — Asset Specifications

A complete list of every image asset the prototype expects, organized by priority. All assets sit alongside `Nesreen_Platform_Prototype.html`. The HTML already references every filename below — when you drop the file in the right location, it appears automatically. Until you do, an elegant fallback shows in its place, so the prototype never breaks.

---

## Folder structure

```
Talos/
├── Nesreen_Platform_Prototype.html
├── nesreen-hero.jpg              ← REQUIRED (brand portrait)
├── nesreen-graduation.jpg        ← REQUIRED (MBA credential photo)
└── assets/
    ├── icons/                     ← RECOMMENDED (8 coaching icons)
    │   ├── career.png
    │   ├── interview.png
    │   ├── leadership.png
    │   ├── clarity.png
    │   ├── cv.png
    │   ├── burnout.png
    │   ├── executive.png
    │   └── quiz.png
    ├── books/                     ← OPTIONAL (4 book covers)
    │   ├── quiet-power.jpg
    │   ├── career-compass.jpg
    │   ├── interview-playbook.jpg
    │   └── reset-journal.jpg
    ├── courses/                   ← OPTIONAL (3 course banners)
    │   ├── confidence-reset.jpg
    │   ├── leadership.jpg
    │   └── offer-machine.jpg
    └── clients/                   ← OPTIONAL (3 testimonial portraits)
        ├── layla.jpg
        ├── karim.jpg
        └── sofia.jpg
```

---

## Brand style guide for all artwork

Every asset must feel like it belongs in the same magazine spread. Hold these constants:

- **Palette** — Cream `#F2EBDC` background, ink `#14120E`, gold `#B8985C / #97793F`, lavender `#B8A8E0`, sage `#9BC2B5`, peach `#F4C2A1`, rose `#E8A5B8`.
- **Mood** — Editorial. Quiet luxury. Calm authority. Never corporate, never tech-y, never overly digital.
- **Photography style** — Soft natural light. Warm undertones. Shallow depth of field. Cream / neutral backgrounds. Composed, not candid.
- **Illustration style** — Thin line work (1.2–1.5 stroke). Generous whitespace. Single accent color from the palette. Editorial restraint.
- **Avoid** — Harsh shadows, neon colors, busy textures, photorealistic 3D renders, AI-glitchy artifacts, overly geometric tech illustrations, stock-photo cliches.

---

## 1. REQUIRED ASSETS

### 1.1 — Brand Portrait

| Field | Spec |
|---|---|
| **Filename** | `nesreen-hero.jpg` |
| **Location** | `Talos/nesreen-hero.jpg` |
| **Dimensions** | 1200 × 1500 px (4:5 portrait), min 800 × 1000 |
| **Format** | JPG, sRGB, ~80% quality |
| **Appears in** | Home hero (full-bleed right column) · Dashboard session card avatar |
| **Visual direction** | The professional brand portrait: Nesreen in a black blazer over a cream blouse, long brunette wavy hair, direct calm gaze, soft cream background, subtle gold accents. Eye-level framing, head and upper torso. |

### 1.2 — MBA Graduation Photo

| Field | Spec |
|---|---|
| **Filename** | `nesreen-graduation.jpg` |
| **Location** | `Talos/nesreen-graduation.jpg` |
| **Dimensions** | 1200 × 1500 px (4:5 portrait), min 800 × 1000 |
| **Format** | JPG, sRGB, ~80% quality |
| **Appears in** | About view — full-bleed left panel (the main About hero image) |
| **Visual direction** | The graduation photo: Nesreen in graduation cap and gown holding the Plymouth Marjon University banner. The full-bleed crop favors her face and cap in the upper portion of the frame, with the banner and gown filling the lower half. The cream/neutral wall background blends naturally with the page palette. |

---

## 2. RECOMMENDED ASSETS — Coaching Icons

The eight track icons in the Coaching tab. The prototype currently displays elegant inline-SVG line-art as a fallback — but the user-supplied versions will give the brand its definitive visual signature. Add them and they replace the SVGs automatically.

**Universal icon spec for all 8:**
- Dimensions: **400 × 400 px** (square, scales down to 40px display)
- Format: **PNG with transparent background** (or SVG if vector)
- Color: Single accent color from the palette (specified per icon below) on transparent
- Style: Thin line-art, editorial, generous negative space, ~5–8% stroke width
- Background: Transparent — the card behind it provides a colored circle

### 2.1 — Career Coaching

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/career.png` |
| **Accent** | Gold `#97793F` |
| **Visual concept** | An elegant compass rose with a clear directional needle. Suggests path, direction, finding one's way. Could also be a single golden thread tracing a graceful curve toward a star. |
| **For card** | "Career Coaching" — clarity, direction, next-chapter design |

### 2.2 — Interview Coaching

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/interview.png` |
| **Accent** | Burnt peach `#C57A4A` |
| **Visual concept** | A door slightly ajar with a small sparkle of light streaming through, OR an elegant microphone stand. Suggests "stepping through to the offer." Avoid handshakes or generic briefcases. |
| **For card** | "Interview Coaching" — confidence + tactics, land the offer |

### 2.3 — Leadership Coaching

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/leadership.png` |
| **Accent** | Lavender-deep `#5B4B8A` |
| **Visual concept** | A mountain peak with a small guiding star above it. Suggests elevation, summit, leadership as ascent. Alternative: a single classical column or laurel wreath. |
| **For card** | "Leadership Coaching" — managers stepping into power |

### 2.4 — Career Clarity

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/clarity.png` |
| **Accent** | Sky-deep `#4F7EAD` |
| **Visual concept** | A magnifying lens with a focused star at its center. Suggests "seeing clearly through the fog." Alternative: a single eye-shape with starlight reflected in the iris. |
| **For card** | "Career Clarity" — for the lost, the unsure, the searching |

### 2.5 — CV & LinkedIn

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/cv.png` |
| **Accent** | Gold `#97793F` |
| **Visual concept** | A folded letter or document with a small wax-seal dot. Or an elegant quill pen mid-stroke. Suggests "the document that opens doors." Avoid generic file-folder icons. |
| **For card** | "CV & LinkedIn" — strategic profile + recruiter playbook |

### 2.6 — Burnout & Confidence

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/burnout.png` |
| **Accent** | Rose-deep `#B8537B` |
| **Visual concept** | A sun rising over a horizon line (renewal, reignite, "the morning after exhaustion"). Alternative: a small flame inside a circle of soft petals. Avoid literal hearts or batteries. |
| **For card** | "Burnout & Confidence" — reset, rebuild, reignite |

### 2.7 — Executive Coaching

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/executive.png` |
| **Accent** | Sage-deep `#3F7E6F` |
| **Visual concept** | A minimal crown silhouette with three gem-dots, OR three classical columns. Suggests sovereignty, authority, the C-suite. Should feel earned, not flashy. |
| **For card** | "Executive Coaching" — C-suite & VP-level transformation |

### 2.8 — Not Sure? (Clarity Quiz)

| Field | Spec |
|---|---|
| **Filename** | `assets/icons/quiz.png` |
| **Accent** | Lavender-deep `#5B4B8A` |
| **Visual concept** | A question mark surrounded by small sparkles, OR a compass-needle still spinning. Suggests "AI will help you discover your path." Light, curious, inviting. |
| **For card** | "Not sure?" — 60-second clarity quiz, AI recommends |

---

## 3. OPTIONAL ASSETS — Polish Layer

These already render as elegantly designed CSS gradients with typography. Replace only if you want photographic / illustrated book covers and course banners.

### 3.1 — Book Covers (4)

**Where they appear:** Library tab — featured book card + 4-book grid.

| Filename | Book | Cover direction |
|---|---|---|
| `assets/books/quiet-power.jpg` | *Quiet Power* | Deep aubergine + ivory typography. Theme: leadership without burnout |
| `assets/books/career-compass.jpg` | *Career Compass* | Warm gold + dark navy. Compass motif welcome |
| `assets/books/interview-playbook.jpg` | *The Interview Playbook* | Sage green + ivory. Could feature elegant typography only |
| `assets/books/reset-journal.jpg` | *The Reset Journal* | Soft rose + cream. Notebook-feel acceptable |

**Universal spec:** 600 × 900 px (2:3 aspect), JPG, real book cover artwork or richly designed typographic covers.

### 3.2 — Course Banners (3)

**Where they appear:** Academy tab — featured course visual + course card thumbnails.

| Filename | Course | Banner direction |
|---|---|---|
| `assets/courses/confidence-reset.jpg` | *Confidence Reset* | Lavender + deep purple gradient. Abstract dawn imagery |
| `assets/courses/leadership.jpg` | *Leadership Without Burnout* | Gold + deep purple. Soft mountain or summit imagery |
| `assets/courses/offer-machine.jpg` | *The Offer Machine* | Sage + deep purple. Abstract pathway imagery |

**Universal spec:** 1200 × 675 px (16:9), JPG, cinematic and abstract. Faces or hands acceptable but optional.

### 3.3 — Testimonial Headshots (3)

**Where they appear:** About tab — two mini testimonial cards. (Currently rendered as initials in colored circles.)

| Filename | Person | Direction |
|---|---|---|
| `assets/clients/layla.jpg` | Layla M., VP Marketing | Editorial headshot, cream/neutral background, warm tones |
| `assets/clients/karim.jpg` | Karim A., Founder | Same style — calm, confident, real-feeling |
| `assets/clients/sofia.jpg` | Sofia R., Director | Same style — feels like part of the same brand world |

**Universal spec:** 200 × 200 px, JPG, square crop, head and shoulders, same lighting/treatment across all three.

---

## 4. AI generation prompts (if using Midjourney/DALL-E)

If you'd like to generate these with AI, here are tested prompt structures.

### For the 8 coaching icons

> *"Minimalist line-art icon, single thin gold line on transparent background, [SUBJECT — e.g. elegant compass rose with directional needle], editorial illustration style, generous negative space, square format, no shading, no fill, premium luxury brand aesthetic, sophisticated, refined"*

Replace `[SUBJECT]` with the visual concept from each icon spec above.

### For book covers & course banners

> *"Premium book cover design, [TITLE] by Nesreen, [PALETTE — e.g. deep aubergine and ivory], minimal typography-led composition, editorial luxury aesthetic, no people, soft gradients, gold accent, calm, sophisticated, magazine-quality"*

### For client headshots

> *"Editorial corporate portrait, [GENDER] business professional, [AGE RANGE], warm cream background, soft natural lighting, calm confident expression, looking at camera, head and shoulders, sophisticated styling, premium magazine quality, shallow depth of field"*

---

## 5. Summary checklist

When you're done, you should have:

- [ ] `nesreen-hero.jpg` in `Talos/`
- [ ] `nesreen-graduation.jpg` in `Talos/`
- [ ] 8 icon PNGs in `Talos/assets/icons/`
- [ ] *(Optional)* 4 book cover JPGs in `Talos/assets/books/`
- [ ] *(Optional)* 3 course banner JPGs in `Talos/assets/courses/`
- [ ] *(Optional)* 3 client headshot JPGs in `Talos/assets/clients/`

The HTML auto-detects each file. Refresh the prototype after adding any asset to see it appear in place of the fallback.

---

*Document version 1.0 · Estrella Platform Prototype*
