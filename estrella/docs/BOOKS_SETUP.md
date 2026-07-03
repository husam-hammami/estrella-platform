# Books for sale — operator setup

Nesreen's four books are sold as a low-price tripwire: a **free in-app sample**
(cover + chapter list + a real excerpt) and a **paid full digital edition** (AED 29)
delivered — after a real Stripe purchase — via a signed URL from a private Supabase
bucket. No fabricated data; real payment, real entitlement, real delivery.

Reuses the **existing** Stripe + Supabase credentials — **no new API keys.** The whole
feature is folded into existing serverless functions (still 12 total, Hobby-cap safe).

## What's already built (in code)
- `lib/api.js` — `BOOK_CATALOG` (ids, names, AED 29 price, bucket file names).
- `api/checkout.js` — `POST {product:'book', book_id}` → Stripe Checkout (direct charge on the platform account).
- `api/stripe/webhook.js` — grants a `book_entitlements` row on `checkout.session.completed` (idempotent).
- `api/me.js` — `GET ?action=book-access&id=<id>` → signed 60s URL if owned; `booksOwned[]` in the profile.
- `index.html` — sample preview modal, Buy / "Read your copy" states, purchase-return handling.
- Full editions are **git-ignored** (not served on the live site); delivery is the private `books` bucket only.

## Operator steps (one time)
1. **Run the SQL.** In the Supabase SQL editor, run `supabase/schema.sql` (idempotent —
   safe to re-run). It creates `book_entitlements` and the private `books` bucket.
2. **Upload the four editions** into the `books` bucket. From the `estrella/` project root,
   with the master HTML files still present locally under `Assets/Books/`:
   ```
   SUPABASE_URL=<your-url> SUPABASE_SERVICE_ROLE_KEY=<service-role-key> node scripts/upload_books.mjs
   ```
   (Or drag the four files into the `books` bucket in the Supabase dashboard, named
   `quiet.html`, `compass.html`, `interview.html`, `reset.html`.)
3. **Stripe** — already configured for the AED 500 coaching session, so book charges work
   with the same `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`. Nothing extra to add.

That's it. No new environment variables. Change the price in one place: `BOOK_PRICE_AED`
in `index.html` (display) and `price_fils` in `lib/api.js` `BOOK_CATALOG` (charge) — keep
them in sync.

> Note: the book files were previously committed to the public repo, so they still exist in
> git *history*. The live site no longer serves them and the paywall delivers only via signed
> URL — sufficient for a low-price tripwire. If you want them purged from history entirely,
> that's a separate destructive `git filter-repo` pass (ask before running it).
