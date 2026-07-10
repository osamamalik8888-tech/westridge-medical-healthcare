# Deployment Guide

Getting this live costs nothing — GitHub and Vercel's free tiers cover
everything this project needs. No domain purchase required; the site
works completely on the free `*.vercel.app` address Vercel gives you.

## 1. GitHub setup

If you don't already have a GitHub account, create one free at
[github.com](https://github.com).

From inside this project folder:

```bash
git init
git add -A
git commit -m "Initial commit"
```

Then on GitHub: click **New repository**, name it (e.g.
`westridge-medical`), leave it empty (don't add a README or .gitignore —
this project already has one), and create it. GitHub will show you two
commands to run — they'll look like this:

```bash
git remote add origin https://github.com/YOUR-USERNAME/westridge-medical.git
git branch -M main
git push -u origin main
```

Run those, and the code is on GitHub. This also means the CI workflow
(`.github/workflows/ci.yml`) starts running automatically on every future
push — it lints and builds the project so a broken commit is visible
immediately, right on GitHub, before it ever reaches Vercel.

## 2. Vercel setup (free tier)

1. Go to [vercel.com](https://vercel.com) and sign up — **use the "Continue
   with GitHub" option**, since that automatically connects the two and
   makes the next step one click.
2. Click **Add New → Project**.
3. Select the `westridge-medical` repository from the list.
4. Vercel detects this is a Next.js project automatically. Leave every
   setting on its default — no build command changes, no output directory
   changes, nothing to configure.
5. Click **Deploy**.

That's it. In a minute or two, Vercel gives you a live URL that looks like
`westridge-medical.vercel.app` (or with some random characters added if
that exact name is taken).

**From this point on, deployment is automatic:** every time you push to
the `main` branch on GitHub, Vercel rebuilds and redeploys the live site
within a minute or two, with zero manual steps.

## 3. Environment variables

Exactly one is relevant, and it's optional:

| Variable | Required? | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Overrides the site's canonical URL (used in the sitemap, robots.txt, and social share tags). Without it, the site automatically uses whatever `*.vercel.app` address Vercel assigns — **the site is fully correct without setting this at all.** Only add it once a custom domain is connected (see below). |

Nothing else needs a key or secret — there's no backend, no database, no
third-party API calls that need credentials. WhatsApp booking, the health
calculators, and the symptom checker all run entirely in the visitor's
browser.

To set it later, if you want it: Vercel dashboard → your project →
**Settings → Environment Variables** → add `NEXT_PUBLIC_SITE_URL` with
value `https://your-actual-domain.com` → redeploy.

## 4. Domain

**You don't need to buy one.** The free `*.vercel.app` address is a real,
working, HTTPS-secured URL — share it, put it on a business card, link to
it from social media, all of it works exactly the same as a custom domain
would.

If you decide to add a custom domain later (no rush): Vercel dashboard →
your project → **Settings → Domains** → enter the domain → Vercel shows
you the DNS records to add at whichever registrar you bought the domain
from. Once that propagates (usually minutes to a few hours), set
`NEXT_PUBLIC_SITE_URL` as described above and redeploy.

## 5. Traffic data (already wired up)

Vercel Analytics is already in the codebase (`@vercel/analytics`) and needs
no setup — it activates automatically the moment this is deployed on
Vercel, and does nothing (no error, no data sent) anywhere else, including
local development. It's cookieless, so it doesn't need a cookie-consent
banner. To actually see the numbers: Vercel dashboard → your project →
**Analytics** tab. Data starts appearing within a day of real traffic.

## 6. Preview deployments (already working, no setup needed)

Once GitHub and Vercel are connected, every pull request automatically
gets its own preview URL — a full, real deployment of that branch, separate
from the live production site. This means changes can be reviewed on a
real URL before they ever reach production, without any extra
configuration. Push a branch, open a PR, Vercel comments the preview link
directly on the PR.

## 7. What you get on the free tier, confirmed

- **HTTPS** — enabled automatically on every deploy, free `*.vercel.app`
  or custom domain alike. No configuration needed.
- **SEO** — `sitemap.xml`, `robots.txt`, and the MedicalClinic/Physician
  structured data all generate correctly regardless of which URL the site
  is running on, since they read from the same environment-aware URL
  logic described above.
- **PWA** — the manifest and service worker both work on the free tier;
  installability doesn't depend on a custom domain.
- **Fast global delivery** — Vercel's free tier serves this project from
  its global edge network by default, the same infrastructure paid plans
  use. Static pages (most of this site) are served instantly from the
  nearest edge location with no cold start.

## Redeploying after changes

Any of these trigger a new deploy automatically:

```bash
git add -A
git commit -m "describe what changed"
git push
```

No Vercel-specific command needed — pushing to GitHub is the entire
deployment step once the two are connected.
