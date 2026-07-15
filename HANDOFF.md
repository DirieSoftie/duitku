# Duitku — Session Handoff

Last updated: 2026-07-15

## Where you left off

Pivoted from Splitwise-clone ("Splitter") to a Malaysia-focused personal finance
tracker called **Duitku** ("my money" in Malay). Scaffold from `create-next-app`
already exists — needs to be renamed from `splitter/` to `duitku/`.

Current scaffold location: `/Users/ray/repos/money-tracker/splitter/`
Target location: `/Users/ray/repos/money-tracker/duitku/`
`create-next-app` already ran `git init` (there's a `.git/` inside).

**Next up:**
1. Rename `splitter/` → `duitku/` and update `package.json` `name` field
2. Create GitHub repo `duitku` at github.com/DirieSoftie
3. Push, then deploy to Vercel for a live URL

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
week 1.

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

## Stack (decided)

- **Framework:** Next.js (App Router) + TypeScript
- **UI:** Tailwind + shadcn/ui (add later — polished defaults with almost no CSS work)
- **Database:** Postgres via Neon (free tier, no infra)
- **ORM:** Prisma
- **Auth:** Clerk (fastest for a beginner)
- **File upload:** Next.js route handler receives the file, parses in-memory or
  saves temporarily. No long-term storage of raw statements (privacy win).
- **Parsing:**
  - CSV: standard parser (`papaparse` or similar)
  - PDF: Claude API (vision or text) — one call, JSON output of transactions
- **Categorization:** Malaysia-specific merchant KB + LLM fallback for unknowns
- **Deploy:** Vercel, auto-deploy on git push

Why Next.js: internship listings favor React/Next.js, and Next.js gives
frontend + backend in one framework, one-command Vercel deploy.

---

## MVP scope

**In v1:**
- Sign up / log in (Clerk)
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

- **Week 1:** Next.js skeleton deployed to Vercel. Auth working (Clerk). Can
  upload a file and see its raw contents echoed back on screen.
- **Week 2:** Real parsing (start with Maybank CSV — simplest format).
  Transactions stored in Postgres via Prisma. List view.
- **Week 3:** Auto-categorization with Malaysia merchant KB + LLM fallback.
  Dashboard with total + by-category views.
- **Week 4:** PDF support (Claude API), month-over-month chart, manual edit
  flow, polish, README with screenshots, 60-second demo video.

Rule: **deploy live in week 1, even when the app does almost nothing.** Late
deploys are where portfolio projects die.

---

## Immediate next steps (day 1–7)

1. Rename `splitter/` → `duitku/`, update `package.json` name field
2. Verify `npm run dev` still works after rename
3. Create empty GitHub repo `duitku` at github.com/DirieSoftie
4. Push local repo to GitHub
5. Sign up at vercel.com, import the repo, deploy — get live URL
6. Sign up for Clerk, follow their Next.js App Router quickstart
7. Sign up for Neon, create a Postgres database
8. Install Prisma, model `User`, `Transaction`, `Category`
9. Build a file-upload form that echoes contents (proves the pipe works before
   real parsing)

By end of week 1: on your live URL, sign up → upload a file → see it processed.

---

## How we're working

Teaching mode: I explain what each command does and why. You run it. You come
back with output or questions. I don't scaffold, install, or write code without
you asking directly — the point is *you* build this project.

Read-only checks (versions, `ls`, git config) I'll still run myself since
they're diagnostic.

---

## Reference: environment (checked 2026-07-15)

- Node v24.11.1, npm 11.6.2 — good
- Git configured as `DirieSoftie` (GitHub username)
- `gh` CLI not installed — GitHub work happens in the browser
- Scaffold at `/Users/ray/repos/money-tracker/splitter/` (rename pending)
