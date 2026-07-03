# Nuria · *Grow Beyond Limits*

> Premium AI-assisted career coaching, led by Nesreen.

Nuria pairs one human coach with one AI that works the whole practice: it interviews each
client before they book, writes the brief Nesreen reads before the hour, stays with the
client between sessions, tutors inside every Academy lesson, and drafts Nesreen's
session-prep dossiers and follow-ups at her desk.

**Live:** the platform runs as a static single-file app (`index.html`) + 12 Vercel
serverless functions, backed by Supabase, Stripe Connect, Calendly, LinkedIn sign-in, and
the Anthropic API.

---

## The design

Nuria means **light**. The interface speaks two registers:

| | Day — paper | Night — sky |
|---|---|---|
| Who | Nesreen: the human, the credential, the transaction | Nuria: the AI between sessions |
| Where | Home, About, Library, Academy atelier, Checkout, Coach desk | Screening, Member dashboard |
| Ground | Warm paper `#F2EBDC` | Warm near-black `#131109` |

Type: **Bodoni Moda** (display — matches the didone wordmark) + **Instrument Sans** (UI).
The recurring motif is the **Ascent** — the logo's gold arc rising to an eight-point star —
used as the intake progress line and the brand mark. Tokens flip per register via scoped
CSS custom properties (`data-register="night"`).

## What's real (everything)

- **Screening** — `/api/estrella` streams a real Claude interview; a forced `submit_brief`
  tool call produces the structured brief. If the AI is unreachable, the UI degrades to a
  clearly-labeled written intake — no scripted impostor.
- **Companion** — dashboard chat, server-grounded in the signed-in client's own briefs.
- **Tutor** — in-lesson coaching in the Academy, grounded in that lesson's content.
- **Dossier & follow-up** — coach-gated: Nuria drafts Nesreen's session prep and her
  post-session note; both save into coach notes.
- **Payments** — Stripe Checkout destination charges on Nesreen's connected account;
  paid state written only by the signature-verified webhook (idempotent).
- **Scheduling** — Calendly OAuth + webhooks; entitlements ledger (one payment = one session).
- **Sign-in** — LinkedIn OpenID Connect; signed HttpOnly session cookie.
- **CVs** — direct-to-storage signed uploads, parsed by Claude into the brief.
- **Books** — four complete digital editions by Nesreen, readable in full.

No fake testimonials, no invented stats, no simulated payments, no scripted AI.

## Repo layout

```
estrella/                 (directory name is historical; the brand is Nuria)
├── index.html            # The entire app — views, design system, JS
├── api/                  # 12 Vercel functions (Hobby cap — do not add a 13th)
│   ├── estrella.js       # AI endpoint: screening / companion / tutor / dossier / followup
│   ├── checkout.js       # Stripe Checkout session (destination charge)
│   ├── stripe/webhook.js # Stripe + Calendly webhooks (idempotent, signature-verified)
│   ├── coach/[route].js  # Coach desk dispatcher (roster/member/briefs/integrations/connect)
│   └── …                 # me, briefs, availability, cv-*, health, linkedin/*
├── lib/api.js            # Session cookies, Supabase REST, crypto, OAuth helpers
├── supabase/schema.sql   # Canonical idempotent schema (tables, RLS, buckets)
├── academy-*.js          # Course content + simple-mode content
└── docs/                 # Plans, incident log, setup guides, NURIA_VISION.md
```

## Running locally

```bash
python -m http.server 4399    # static preview (AI/auth need the deployed functions)
```

Full stack requires the Vercel project (root directory = `estrella/`) with env vars:
`SESSION_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `LINKEDIN_CLIENT_ID/SECRET`,
`COACH_LINKEDIN_SUB`, `INTEGRATION_ENC_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`STRIPE_CONNECT_CLIENT_ID`, `CALENDLY_CLIENT_ID/SECRET`, `ANTHROPIC_API_KEY`
(+ optional `ESTRELLA_MODEL`, default `claude-sonnet-5`). `/api/health` (coach-gated)
validates the shape of each. Setup guides: `docs/COACHING_SETUP.md`, `docs/LINKEDIN_SETUP.md`.

## Brand essentials

- **Brand:** Nuria — *Grow Beyond Limits*
- **Founder & coach:** Nesreen — MBA in HR and Artificial Intelligence, Plymouth Marjon University
- **LinkedIn:** [linkedin.com/in/nesrinabdelhakim](https://www.linkedin.com/in/nesrinabdelhakim/)
- "Estrella" is the retired internal codename; it must never appear anywhere a user can see.

## License

Proprietary · All rights reserved · Nesreen Abdelhakim · 2026
