# Westridge Medical Healthcare

Next.js 16 / React 19 / TypeScript / Tailwind v4 source for
westridgemedicalhealthcare.pk.

## Deploy it

CI is already set up (`.github/workflows/ci.yml`) — it lints and builds on
every push and PR once this is on GitHub, so a broken build shows up before
it reaches production, not after.

1. `git init && git add -A && git commit -m "Initial commit"`, then push to
   a new GitHub repo.
2. On [vercel.com](https://vercel.com), "New Project" → import that repo.
   Vercel detects Next.js automatically; no config needed.
3. Add the production domain under Project Settings → Domains once one's
   registered, and update `siteConfig.url` in `lib/site-config.ts` to match
   — that value feeds the sitemap, robots.txt, and Open Graph tags, so it's
   worth getting right before the first real deploy.
4. No environment variables are required for anything currently built —
   there's no backend yet. WhatsApp booking, the calculators, and the
   symptom checker all run client-side with no API keys.

## Run it

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

This sandbox has no network access, so none of the above has been executed
here — `npm install` needs a real internet connection. Everything was
written and cross-checked by hand (path aliases, imports/exports, and
Tailwind class names were swept with scripts for validity), but a first
`npm run build` on your machine is the real compile check. If it throws
anything, send the error back and it'll get fixed immediately.

## The doctor's name — confirmed

The source material spelled it two ways — "Khalid Ahmed" in the original
brief, "Khalid Ahmad" on the printed credentials card. **You've confirmed
"Ahmed" is correct**, and the whole site now uses it consistently — the
central data field in `lib/site-config.ts` (`doctors[0].name`), the URL
slug, and every hardcoded mention that had crept into blog posts and
component copy (8 files in total, found by searching the whole project
rather than assuming the one data field covered everything).

## Where real data lives

Every fact on the site — phones, hours, address, doctor credentials, service
list — is centralized in `lib/site-config.ts`. Nothing is duplicated inline
in components, so correcting a phone number or hour there updates the whole
site.

Sourced from your own materials, not invented:

- **Hours** — split from your OPD-timings graphic: doctor sessions
  10 AM–3 PM and 6 PM–12 AM, pharmacy 24/7. (The original brief said a flat
  "9 AM–12 AM"; the printed graphic is more specific, so that's what's live.)
- **Phones** — all three numbers from the social graphic (0321 7295474,
  0335 5712347, 0315 9900999).
- **Doctor credentials** — MBBS, FCPS Part-I (Medicine), Ex-Senior Medical
  Officer at Lady Reading Hospital Peshawar, PM&DC 12990-N — taken from the
  credentials card, not filled in generically.
- **Colors** — sampled directly from `WMH_LOGO.png` with a small script
  (navy `#052268`, red `#FC0100`), then expanded into full tonal scales in
  `app/globals.css`. Nothing was eyeballed.
- **Photos** — the two real interior/storefront photos you sent are in
  `public/images/gallery/` and are already used on the homepage hero and the
  `/gallery` page. No stock photography anywhere.

## What's built vs. what's next

**Live now:** full project scaffold, design system (colors/type/motion),
header + footer + nav, homepage (hero, services, doctor spotlight, why-us,
appointment CTA), and real content on `/about`, `/services` (an overview of
all six, each with a "Full page" link where one exists), `/pharmacy`,
`/diagnostic-laboratory`, `/vaccination`, `/corporate-healthcare` (these
four and the `/services` overview all read from the same
`lib/service-details.ts`, so there's one place to update a service, not
five), `/doctors`, `/contact`, `/gallery`, `/appointments` (doctor + date +
time + visit type + complaint → opens WhatsApp with the message
pre-written), `/blog` (three real posts), `/health-packages` (the shapes
packages come in, honest that pricing isn't confirmed yet rather than
inventing numbers), and `/patient-resources` (a
symptom checker scoped to urgency-only — it deliberately never names a
condition, and screens for emergency red-flag symptoms first — plus BMI,
ideal weight, calorie needs, and blood-pressure-category calculators; real
formulas, calculated in the browser, nothing sent anywhere). What's left as
an on-brand placeholder: nothing, actually — `/careers` now says plainly
that there are no open roles rather than inventing any, with a real way to
send a CV in anyway. No dead links or 404s
anywhere on the site — every internal link was extracted and checked
against the real route list, not just spot-checked. Also done:
`sitemap.xml`, `robots.txt`, MedicalClinic/Physician JSON-LD
structured data, a PWA manifest with real icons generated from the logo,
and the offline-support service worker described further down.

**Still ahead:** nothing from the original brief's feature list — everything
requested has at least a real, working first version now. What's left is
depth: filling in the About/Services page content further, writing more
blog posts, and the legal review noted below.

**Three more brief items, found on a second read-through:** re-checking the
original brief line by line turned up three requested things that weren't
built yet — a large-text accessibility toggle (`components/shared/text-size-toggle.tsx`,
next to the theme toggle; scales the root rem so it cascades through every
size in the project, not just a chosen few), a branded loading state
(`app/loading.tsx`, the logo pulsing like a heartbeat plus the ECG line),
and page-transition animation (`app/template.tsx`, using Next's template
convention — it remounts on every navigation, unlike layout.tsx — with a
short Framer Motion fade/rise). All three are in now.

**And two more, on a third pass:** the brief's animation list also named
"parallax" and "image reveals" specifically, as their own line items, not
just general motion. The hero photo now drifts subtly on scroll (clipped by
its own frame, not the whole card — the classic effect, not a gimmick),
built with Framer Motion's `useScroll`/`useTransform` directly against the
section's own scroll range. And there's a dedicated clip-path wipe reveal
(`components/shared/image-reveal.tsx`, distinct from the generic fade-up
used for text) on the About page's storefront photo and both Gallery
photos. Both respect reduced-motion.

**A real contrast audit caught two genuine bugs:** computing exact WCAG
ratios (not eyeballing) for every dark-mode text color against its actual
background turned up two real failures — the red-400 eyebrow labels used
across ~15 pages measured 3.92:1 on navy-900 (needs 4.5:1 for text that
small), and several white/40 captions measured 3.4–3.7:1. Both are fixed
project-wide: eyebrow/label text now uses red-300 (6.5–7.7:1), and small
dark-mode text has a white/50 floor (4.6:1+). Icons kept their lower
opacity where used, since icons only need 3:1, not 4.5:1.

**Health blog, honestly scoped:** three real posts at `/blog` — about the
one-roof model, the OPD/pharmacy hours split, and what the pharmacy stocks.
All clinic-voice, operational content (`lib/blog-posts.ts`). None of it is
written as medical advice or attributed to Dr. Ahmed; a health-advice column
in his voice needs an actual draft from him, not one written on his behalf.

**Offline support:** `public/sw.js` is a deliberately conservative service
worker — page navigations always try the network first (so nothing stale
ever gets served) and only fall back to a static `offline.html` if there's
truly no connection; icons and photos get cached for repeat visits. It only
registers in production builds (`components/shared/service-worker-registration.tsx`),
so it won't interfere with `npm run dev`.

**A stronger check than usual:** this sandbox unexpectedly had a global
TypeScript compiler available, so `lib/site-config.ts`, `lib/blog-posts.ts`,
`lib/utils.ts`, `app/sitemap.ts`, and `app/robots.ts` — the files most of
the site's logic actually lives in — were run through real `tsc --strict`
(with small hand-written stubs for the couple of packages not present
locally), not just the pattern-matching scripts used everywhere else. All
clean. The remaining `.tsx` files couldn't get the same treatment (no
`@types/react` available offline to install), so they're still "only"
verified the way the rest of this project has been throughout.

**Dark mode is complete, site-wide:** the toggle
(`components/shared/theme-toggle.tsx`) flips a `.dark` class on `<html>`,
persists to `localStorage`, and an inline script in `app/layout.tsx` applies
it before first paint so there's no flash of the wrong theme. Every page and
component now has `dark:` variants — homepage, About, Services, Doctors,
Contact, Appointments, Patient Resources (calculators + symptom checker),
Gallery, the legal pages, and every placeholder page. A handful of elements
(footer, the header's phone/hours strip, the hero's photo panel, the closing
appointment CTA band) are deliberately always-dark regardless of the toggle
— the same way they'd stay dark on any site, as accent bands, not a gap.

**Motion stack, concretely:** Framer Motion (`motion` package) handles
component-level animation — the hero entrance sequence, header dropdown and
mobile menu. GSAP + ScrollTrigger (`components/shared/scroll-reveal.tsx`)
handles scroll-batched reveals — the services list, doctor cards, and the
"why Westridge" grid stagger in as they enter the viewport. Both respect
`prefers-reduced-motion`.

**Three.js, minimal, as asked:** one ambient particle field
(`components/shared/ambient-particles.tsx`, vanilla Three.js, not React
Three Fiber) on the closing appointment CTA band only — deliberately not on
the hero, which already carries the real photo and the ECG motif.

**Two more from the required tech stack:** the appointment form now runs on
React Hook Form + Zod (`lib/appointment-schema.ts` is the single schema —
validation rules and the TypeScript type both come from it, so they can't
drift apart), replacing the hand-rolled `useState` validation from earlier.
Pinned to stable React Hook Form v7 deliberately — v8 is in beta with
breaking changes as of this writing, not something to build a client's site
on. **React Query is the one item left un-added, on purpose**: it manages
server-state caching and refetching, and this site has no backend API to
fetch from — every page is either statically generated from
`lib/site-config.ts`/`lib/blog-posts.ts` or computed client-side (the
calculators). Adding it now would be a dependency with nothing to do;
it's a natural fit once there's a real API behind appointments or the
blog, not before.

**A real bug, found by hand-tracing the logic, not by any script:** the
live "open now" status was showing the morning session's close time in
24-hour form — "until 15:00" instead of "until 3:00 PM" — inconsistent
with the 12-hour format used everywhere else on the site. The evening
session's "until 12:00 AM" happened to look right by coincidence (24 % 12
== 0 also gives a sensible-looking answer), which is exactly why it slipped
past every syntax/structural check so far — nothing about it was
*invalid*, just wrong for one of the two sessions. Traced every boundary
by hand after the fact (session start/end hours, midnight rollover, the
gap between sessions) to confirm the actual open/closed detection was
right and only the display formatting was off. Fixed with one shared
`to12Hour`/`formatHour12` helper in `lib/utils.ts`, used by both
`open-status.tsx` and the appointment form's time-slot builder, so the
same bug can't reappear in only one of the two places that need it.

**Needs a lawyer, not more code:** `/privacy-policy` and `/terms` are
structured drafts with a visible on-page disclaimer. Real patient health
data is in scope here, so these should get an actual legal review before
they go live as-is.

## Structure

```
.github/workflows/ci.yml     lint + build on every push/PR
app/                        routes (App Router)
app/loading.tsx               branded loading state
app/template.tsx              page-transition wrapper
app/sitemap.ts               dynamic sitemap.xml
app/robots.ts                robots.txt
components/layout/           header, footer, newsletter form
components/home/             homepage sections
components/appointments/     appointment request form
components/patient-resources/ symptom checker + health calculators
components/shared/           logo, icons, ECG motif, coming-soon page,
                              open-status, JSON-LD structured data,
                              GSAP scroll-reveal wrapper, Three.js particles,
                              image-reveal wipe, theme toggle, text-size
                              toggle, service worker registration
components/services/         shared dedicated-service-page template
components/ui/               button primitive
lib/site-config.ts           all real business data, single source of truth
lib/service-details.ts       shared content for /services + the 4 dedicated
                              service pages (one source, not five)
lib/appointment-schema.ts    Zod schema for the appointment form
lib/blog-posts.ts            blog post content
lib/utils.ts                 cn() classname helper + shared 12-hour time
                              formatting (to12Hour/formatHour12)
public/images/                real logo + photos
public/icons/, manifest.json  generated PWA icons + manifest
public/sw.js, offline.html    service worker + offline fallback page
```
