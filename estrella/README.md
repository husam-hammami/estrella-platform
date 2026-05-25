# Estrella · *Born to Shine*

> Premium AI-assisted career coaching led by Nesreen.

A high-end coaching platform that pairs the depth of 1-on-1 work with Nesreen with the intelligence of an AI companion (*Estrella*) that prepares clients, supports them between sessions, and grows the practice's reach.

This repository contains the interactive frontend prototype, the full UI/UX master plan, and the strategic UX documentation for the platform.

---

## What's in this repo

```
estrella/
├── index.html                  # The interactive prototype (open in any browser)
├── nesreen-hero.jpg            # Brand portrait (Home + Dashboard)
├── nesreen-graduation.jpg      # MBA credential photo (About)
├── Assets/                     # All track icons, book covers, course banners, client headshots, logo
└── docs/
    ├── UIUX_Master_Plan.html   # Full visual UI/UX plan with mockups for all 10 core screens
    ├── coaching_UX.md          # Strategic UX restructure for the coaching module
    └── Asset_Specifications.md # Complete asset spec — every file, every dimension, every visual concept
```

---

## Quick start

Open `index.html` in any modern browser. No build step, no dependencies — the prototype is a single self-contained HTML file.

```bash
# macOS
open index.html

# Windows
start index.html

# or just double-click the file
```

---

## What the prototype demonstrates

The prototype is a fully interactive walk-through of the platform across 11 screens:

**Public surfaces**
- Home — hero with Nesreen's portrait, brand pitch, CTAs
- Coaching — service tracks, journey, "Inside the Experience" mockups
- Library — featured book, audio sample, full grid with filters
- Academy — featured course, inline AI tutor mockup, course grid
- About — full-bleed graduation photo, founder story, MBA credential, testimonials, LinkedIn link

**Booking flow**
- Service selection → live Calendar → secure Payment (with quick-pay options)
- Simulated payment success → automatic transition to AI onboarding

**Authenticated portal**
- AI onboarding chat (scripted conversation with Estrella, animated readiness bar, constellation profile viz)
- Readiness reveal with animated concentric rings (Apple Health-style)
- Dashboard — next session card, activity rings, action plan, assessments, curated recommendations
- AI Twin — premium voice-conversation interface with Nesreen's AI

Click through the full flow: **Home → Book Session → pick a service → choose a date → pay → chat with Estrella → see your readiness reveal → enter dashboard → explore AI Twin / Library / Academy.**

---

## Design system

| | |
|---|---|
| **Background** | Cream `#F2EBDC` |
| **Ink** | `#14120E` |
| **Gold** | `#B8985C` / `#97793F` (deep) |
| **Aurora** (AI moments) | Lavender `#B8A8E0` |
| **Sage** (success) | `#9BC2B5` |
| **Peach** (emotional) | `#F4C2A1` |
| **Display type** | Cormorant Garamond (italic emphasis) |
| **UI type** | Inter (300/400/500/600) |

The full design system, component library, and motion principles are documented in `docs/UIUX_Master_Plan.html`.

---

## Strategy documents

- **`docs/UIUX_Master_Plan.html`** — visual master plan covering brand positioning, IA, user flows, screen-by-screen mockups, design system, AI architecture, KPIs, and a 4-phase implementation roadmap.
- **`docs/coaching_UX.md`** — opinionated UX strategy for restructuring the Coaching module from a SaaS-style product catalog into a relationship-led conversational entry point. Includes 6-stage mental model, success metrics, and phased rollout.
- **`docs/Asset_Specifications.md`** — every image asset the prototype expects: filename, location, dimensions, format, visual direction. Includes Midjourney/DALL-E prompts.

---

## Brand essentials

- **Brand name:** Estrella
- **Tagline:** Born to Shine
- **Founder:** Nesreen — MBA in HR and Artificial Intelligence, Plymouth Marjon University, London
- **Coach LinkedIn:** [linkedin.com/in/nesrinabdelhakim](https://www.linkedin.com/in/nesrinabdelhakim/)

---

## Tech stack (current prototype)

- Single-file HTML, vanilla CSS, vanilla JavaScript
- Google Fonts: Cormorant Garamond + Inter
- Inline SVG for icons, mockups, and animations
- No build pipeline, no dependencies — designed for instant preview and rapid iteration

**Recommended production stack** (per the master plan): Next.js 14 + Tailwind + Supabase + Anthropic Claude for AI, Stripe + Tap Payments + PayTabs for UAE-first payments, Cal.com for scheduling, ElevenLabs for AI Twin voice.

---

## Status

**Stage:** Interactive design prototype · v1.0
**Next milestone:** Phase 1 of `coaching_UX.md` — reframing public surface (Coaching → The Practice, new `/start` Estrella diagnostic, new Recommendation screen)

---

## License

Proprietary · All rights reserved · Nesreen Abdelhakim · 2026
