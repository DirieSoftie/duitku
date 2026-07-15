# Duitku — Session Handoff

Last updated: 2026-07-15

## Where you left off

Week 1 milestones are essentially hit. Live URL is deployed with auto-deploy on
push, and Clerk auth (sign up / sign in / user button) works end-to-end in
production.

- Live URL: https://duitku-five-lemon.vercel.app/
- GitHub: https://github.com/DirieSoftie/duitku
- Local: `/Users/ray/repos/duitku/`

**Next up:**
1. Sign up for Neon, create a Postgres database (region: Singapore)
2. Install Prisma, model `User`, `Transaction`, `Category`, run first migration
3. Build a file-upload form that echoes contents (proves the pipe works
   before real parsing)

---

## Project overview

**Building:** Personal finance tracker targeted at Malaysians. Users upload a
bank statement (PDF or CSV) → transactions auto-parsed → auto-categorized using
a Malaysia-specific merchant knowledge base → spending dashboard in MYR.

**Hook feature:** Drop in a Maybank/CIMB PDF statement → within seconds, see a
categorized spending dashboard. Malaysian merchants (Grab, TnG, Shopee,
Foodpanda, Petronas, mamak stalls, etc.) recognized natively — no manual
tagging needed.

**Why this project:** Portfolio piece before first internship starts. Chosen
for a memorable demo moment, real product decisions, local product thinking
(underserved market), and 4-week scope.

**Goal:** ONE polished full-stack project (depth over breadth). Live URL from
week 1 — done.

---

## Why NOT bank API / Apple Pay integration (important context)

The original idea was automatic tracking via bank APIs, TnG eWallet, and Apple
Pay. Ruled out after research:

- **Malaysian banks:** no open banking framework in Malaysia (BNM is working on
  it but nothing solo devs can plug into as of 2026). No public APIs from
  Maybank, CIMB, Public Bank, RHB, etc. Aggregators are enterprise-only.
- **TnG eWallet:** merchant API only, no consumer transaction feed.
- **Apple Pay:** Apple never exposes transaction data to third-party apps. No
  Shortcut trigger for Apple Pay transactions either.
- **Android notification listener:** genuinely works and legit finance apps use
  it, BUT requires a native Android app — not achievable inside the Next.js
  web-first plan.

Pivot: web app with statement import first, mobile companion app (Android
notification listener) is the v2 story for interviews.

---

## Stack (in place unless noted)

- **Framework:** Next.js 15.5.20 (App Router) + TypeScript ✅
- **Deploy:** Vercel, auto-deploy on `git push` to main ✅
- **Auth:** Clerk (`@clerk/nextjs` 7.5.18) ✅
- **UI:** Tailwind (already in scaffold) ✅ · shadcn/ui — add later
- **Database:** Postgres via Neon — not yet set up
- **ORM:** Prisma — not yet installed
- **File upload:** Next.js route handler receives the file, parses in-memory or
  saves temporarily. No long-term storage of raw statements (privacy win).
- **Parsing:**
  - CSV: standard parser (`papaparse` or similar)
  - PDF: Claude API (vision or text) — one call, JSON output of transactions
- **Categorization:** Malaysia-specific merchant KB + LLM fallback for unknowns

### Version note

Downgraded from Next.js 16 (create-next-app default) to Next.js 15 on
2026-07-15 for beginner-friendlier ecosystem — every third-party tutorial,
Clerk doc, shadcn guide, and Stack Overflow answer currently assumes v15. v16
was days old and introduced breaking changes (e.g. `middleware.ts` → `proxy.ts`
rename) that would compound learning friction. Revisit once the ecosystem
catches up.

---

## MVP scope

**In v1:**
- Sign up / log in (Clerk) ✅
- Upload a bank statement (PDF or CSV) — start with Maybank, add more later
- Parse transactions (date, amount, merchant, raw description)
- Auto-categorize using Malaysia merchant KB (Grab, TnG, Shopee, Foodpanda,
  Petronas, mamak, groceries, utilities, etc.)
- Manual edit: fix a wrong category, edit a merchant name
- Dashboard: total spend this month, by category, month-over-month trend
- Currency: MYR only

**Not in v1 (resist scope creep):**
- Bank API integration (locked behind partnerships)
- Mobile app / notification listener (v2)
- Multi-currency, budgets, goals, forecasting
- Recurring transaction detection
- Investment tracking
- Sharing / joint accounts

---

## 4-week plan

- **Week 1:** ✅ Next.js skeleton deployed to Vercel. Auth working (Clerk).
  File-upload echo form pending — the last week-1 item.
- **Week 2:** Real parsing (start with Maybank CSV — simplest format).
  Transactions stored in Postgres via Prisma. List view.
- **Week 3:** Auto-categorization with Malaysia merchant KB + LLM fallback.
  Dashboard with total + by-category views.
- **Week 4:** PDF support (Claude API), month-over-month chart, manual edit
  flow, polish, README with screenshots, 60-second demo video.

Rule: **deploy live in week 1, even when the app does almost nothing.** Late
deploys are where portfolio projects die.

---

## Immediate next steps

1. Sign up at neon.tech (GitHub login), create project `duitku`, region
   Singapore
2. Copy the connection string Neon provides
3. Install Prisma: `npm install prisma @prisma/client`, then `npx prisma init`
4. Add the Neon connection string to `.env.local` as `DATABASE_URL`
5. Model `User`, `Transaction`, `Category` in `prisma/schema.prisma`
6. Run first migration: `npx prisma migrate dev --name init`
7. Add `DATABASE_URL` to Vercel env vars (Settings → Environment Variables)
8. Build a `/upload` page with a file input + route handler that echoes the
   raw file contents back on screen
9. Push, verify on live URL: sign in → upload a file → see it echoed

---

## How we're working

Teaching mode: I explain what each command does and why. You run it. You come
back with output or questions. I don't scaffold, install, or write code without
you asking directly — the point is *you* build this project.

Exceptions where I act directly: read-only diagnostic checks (versions, `ls`,
git config) and file edits you explicitly ask me to make.

---

## Reference: environment (checked 2026-07-15)

- Node v24.11.1, npm 11.6.2
- Git configured as `DirieSoftie` (GitHub username)
- `gh` CLI not installed — GitHub work happens in the browser
- Local project: `/Users/ray/repos/duitku/`
- Env vars in `.env.local` (git-ignored): `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`,
  `CLERK_SECRET_KEY`
- Same two env vars set in Vercel dashboard for production
