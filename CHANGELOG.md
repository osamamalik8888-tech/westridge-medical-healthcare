# Changelog

All notable changes to this project, newest first. `PROGRESS.md` has the
granular step-by-step version of this same history; this is the
release-notes-style summary.

## Round 20 — Doctor Image Removed, Header Nav Spacing Fixed

### Removed
- Doctor photograph and its image container from all three locations:
  homepage spotlight, Doctors page, Appointments trust card. Not
  replaced with a placeholder. Professional info text unchanged.

### Changed
- Doctors page card: grid simplified from a 2-column image+text split
  (`sm:grid-cols-[19rem_1fr]`) to a single column, a direct consequence
  of removing the image that was sized for.
- Header desktop nav: item padding `px-3`→`px-2`, gap `gap-1`→`gap-0.5`,
  `whitespace-nowrap` added to prevent the text wrapping that was
  causing the uneven-looking spacing reported in the screenshot.
  `overflow-x-auto` + `shrink-0` added to the nav as a safety net.

### Note
- Header fix verified with real font-metric measurements and width math
  (not guessed), stress-tested against a pessimistic margin of error,
  and backed by a genuine engineering safety net — but not verified by
  literally rendering real Manrope in a real browser, which isn't
  available in this environment. Stated as a real limitation, not
  glossed over.

## Round 19 — Real Build Error Fixed

### Fixed
- `components/knowledge-center/article-body.tsx` — `'label' is possibly
  'undefined'` under the project's real `noUncheckedIndexedAccess: true`
  setting. Fixed with a genuine narrowing guard (`if (!label) return
  null;`), matching the pattern already used safely elsewhere in this
  project. No `any`, no suppression.

### Note
- This project's own "strict tsc" verification checks throughout prior
  rounds used a simplified tsconfig that didn't replicate
  `noUncheckedIndexedAccess` — a real methodology gap, now known.
- Checked every structurally similar pattern in the project (other
  `Record<string, T>` indexing, array-literal indexing, `.find()`
  results) against the real strict setting. All already safe;
  nothing else needed fixing.

## Round 18 — Favicon Fix

### Added
- `app/favicon.ico` — real multi-resolution icon (16/32/48px) generated
  from the actual logo file.
- `public/icons/favicon-16.png`, `public/icons/favicon-32.png`.

### Changed
- `app/layout.tsx` — 2 lines added to the existing icon array; nothing
  else in the file touched.

## Round 17 — Health Knowledge Center

### Added
- `lib/knowledge-center/` — bilingual (EN/UR) article data architecture:
  `types.ts`, `featured-article.ts`, `article-dengue.ts`,
  `monthly-scaffold.ts` (23 topics), `index.ts`.
- `/knowledge-center` — index page, featured article pinned with badge,
  12 monthly sections.
- `/knowledge-center/[slug]` — article detail template: language toggle,
  section renderer, FAQs, references, related articles, Article/
  FAQPage/MedicalWebPage schema.
- `components/knowledge-center/` — `article-locale.tsx` (bilingual
  toggle), `article-body.tsx` (section rendering), `article-schema.tsx`
  (structured data).
- `StarIcon` added to the shared icon set.
- `KNOWLEDGE_CENTER_NOTES.md` — what's fully researched vs. scaffolded,
  and exactly how to complete the rest.
- Knowledge Center routes added to `sitemap.ts`.

### Changed
- Header and footer nav: "Health Blog" relabeled "Knowledge Center",
  pointing to the new section. The original `/blog` route and its 5
  posts are untouched and still live at their original URLs.

### Fixed
- A third occurrence of the `siteConfig.doctors[0]` bug (Round 15) found
  in the new Knowledge Center index page, caught and fixed before
  shipping; project-wide search afterward confirmed no other instance.
- My own import-resolution verification script didn't understand
  directory-to-`index.ts` resolution (this round's architecture uses it
  for the first time) — fixed the checker, not just the false alarm.

### Note
- No "Reviewed by Dr Khalid Ahmed" byline was added to any article — he
  hasn't actually reviewed this content, and that attribution would be
  false. `reviewStatus: "pending-review"` on every article instead; see
  `KNOWLEDGE_CENTER_NOTES.md` for exactly what changes once a real
  review happens.
- All citations were verified against real sources (WHO, Mayo Clinic,
  Pakistan NIH, peer-reviewed case series) before writing, not invented.

## Round 16 — Photo Correction, CEO/Doctor Section Upgrades, Header Redesign

### Fixed
- **The CEO and doctor photos had been swapped.** Black-suit photo (was
  incorrectly at `khalid-ahmed.jpg`) moved to the new
  `public/images/ceo/qaim-raza.jpg` and set as `ceo.image`. Gray-suit
  photo restored to `public/images/doctors/khalid-ahmed.jpg` — the file
  that had actually been serving as the doctor's photo since Round 5,
  before Round 15 overwrote it. Verified with an exhaustive codebase
  search: exactly one reference to each image path exists anywhere,
  exactly one file exists in each folder.
- The CEO section's first draft repeated the exact `aspect-auto` /
  unpredictable-crop-height bug from Round 15, in the same file, a
  second time — caught and fixed before shipping.
- Two header additions were first placed at breakpoints too tight for
  the available width (the Hiring pill unconditional at `sm:`; the
  Language Selector at `sm:` in the already-tight main row) — the width
  math was redone for each and both moved to safer breakpoints.

### Changed
- CEO section rebuilt: always-dark navy background with ambient glow,
  larger portrait, glassmorphism card, bigger signature-style name.
- Doctor section (`/doctors`): larger portrait, a subtle pulse-line
  watermark (the site's existing ECG motif), qualifications restructured
  into three labeled cards (Qualification / Experience / PM&DC
  Registration).
- Header: utility bar gained Email, WhatsApp, and Location (staggered
  across `md:`/`lg:`/`xl:`), plus a prominent glowing "We're Hiring" pill
  (`md:` and up, and in the mobile menu).

### Added
- `components/shared/language-selector.tsx` — English-only today,
  config-ready for more languages later.
- `glow-pulse` CSS keyframe (`app/globals.css`) for the Hiring pill,
  using the site's real brand red, respecting `prefers-reduced-motion`.

## Round 15 — Photo Fix, CEO Section, Hiring Visibility, AI Upgrade, Omnichannel Contact

### Added
- `components/home/ceo-message.tsx` — Message from the CEO homepage
  section (Qaim Raza), `lib/site-config.ts`'s new `ceo` export.
- `components/home/hiring-banner.tsx` — large homepage hiring banner,
  plus a second CTA in the footer.
- `lib/ai-provider-config.ts` — single-file provider configuration
  (OpenAI/Claude/Gemini/demo).
- `components/shared/multi-channel-cta.tsx` — reusable WhatsApp/Call/
  Email component, now used on the appointment form, Contact page,
  footer, Doctors page, and the AI Assistant's booking suggestions.
- `lib/contact-schema.ts` + `components/contact/contact-form.tsx` — a
  real contact form (none existed before).
- `CopyIcon`, `TrashIcon` added to the shared icon set; chat interface
  gained copy-conversation and clear-chat controls.
- Conversation history now sent to the AI Assistant's API route (unused
  by demo mode, wired through for a future real provider).

### Changed
- New photo now used for Dr. Khalid Ahmed
  (`public/images/doctors/khalid-ahmed.jpg`).
- Doctor photo crop fixed on both the homepage spotlight and the Doctors
  page — landscape/auto-height frames replaced with one consistent
  portrait ratio (4:5) that doesn't risk cropping into the face.
- Appointment form: real Send-via-Email option added alongside WhatsApp
  (previously WhatsApp-only), plus Call/copy-number/copy-email.
- Footer: WhatsApp-only CTA replaced with a real 4-action grid (WhatsApp,
  Call Now, Email Us, Directions).
- Doctors page: Call, Email, and a link to the full booking form added
  alongside the existing WhatsApp button.
- `lib/ai-assistant.ts`: significantly expanded demo-mode intelligence —
  more emergency patterns, clarifying follow-ups for vague messages, far
  more symptom vocabulary, more FAQ topics.
- `AI_ASSISTANT_SETUP.md`: Gemini added as a third provider option.

### Fixed
- **Critical, caught before running**: the AI assistant rewrite used
  `siteConfig.doctors[0]`, but `doctors` is a separate top-level export,
  not a property of `siteConfig` — would have thrown at module-load time,
  breaking the entire feature. Found by checking the export structure,
  not assumed.
- A bare `fee` keyword was matching inside "feel", silently hijacking "I
  don't feel well" into the pricing FAQ instead of asking a clarifying
  question. Found by actually running the code against real phrases.
- `\bmigraine\b` and `\bdiarrh\b` never matched their own plural/inflected
  forms ("migraines", "diarrhea") — the same class of bug as the
  Round 5 "headache" bug. Same fix pattern applied, plus the FAQ matcher
  list was reviewed for the same risk (found and fixed "lab"/"test"
  matching inside "label"/"latest" too).
- The CEO section's first draft repeated the exact `aspect-auto` bug just
  found and fixed in Section 1, in a brand new file — caught and fixed
  before shipping.
- `MultiChannelCta`'s "compact" variant was silently ignoring the
  `showCopy` prop (early return skipped that code path) — fixed and
  documented so it can't happen again unnoticed.

## Round 13 — Careers Discoverability

### Added
- "We're hiring" link in the header utility bar (`md:` and up).
- Careers link in the mobile menu.
- `BriefcaseIcon` in the shared icon set.

### Note
- No new careers *functionality* was needed — the full application form
  (Doctor/Nurse/Pharmacist/Lab/Reception/Admin, WhatsApp-connected) has
  existed since Round 2. It was only linked from the footer; these
  changes are entirely about making it discoverable, not rebuilding it.
- Deliberately did not add it as an 8th item to the main desktop nav row
  — that's already at its width limit as of the Round 7 fix.

## Round 12 — Legal Pages Updated for the AI Assistant

### Added
- Privacy Policy: "AI Health Assistant" section — verified against the
  actual code (no storage calls anywhere in that pipeline) before
  writing the claim that nothing is persisted.
- Terms: AI Assistant now named in the medical disclaimer (previously
  absent) plus a dedicated section on what the urgency classifications
  are and aren't a substitute for.

## Round 11 — PWA Shortcuts

### Added
- `public/manifest.json` — `shortcuts` field with three quick actions
  (Book an Appointment, AI Health Assistant, Contact Us), available via
  long-press on an installed home-screen icon.

## Round 10 — Chat Interface Accessibility

### Fixed
- AI Health Assistant chat: added `role="log"` + `aria-live="polite"` to
  the message thread so new messages are announced to screen readers
  automatically, and a visually-hidden text label to the typing
  indicator (previously three purely visual animated dots with no
  accessible equivalent).

## Round 8 — Doctor Photo Fallback Fixed Properly

### Fixed
- The Appointments page trust card had "KA" hardcoded as literal text
  instead of computing it, bypassing the `initials()` logic used
  correctly elsewhere — wrong for any doctor other than this one, and
  duplicated logic in two other files besides. Extracted `initials()`
  into `lib/utils.ts` as a single shared function used by all three
  doctor-photo locations (Doctors page, homepage spotlight, Appointments
  trust card). The real photo was already rendering correctly today
  (`doctors[0].image` is genuinely set) — this fixes the underlying
  fallback logic so it's correct if that ever changes, not just today.

## Round 7 — Header Width Fix

### Fixed
- The header's desktop nav (7 items as of Round 5's "AI Health
  Assistant" addition) was estimated, by hand, to not reliably fit in
  the 1024–1280px viewport range it was set to appear in — the classes
  were all individually valid, they just added up to more total width
  than the container had. Moved the desktop-nav breakpoint from `lg:`
  to `xl:` (1280px, the header's own max-width) and tightened nav item
  padding/font-size slightly as additional margin.

## Round 6 — Closing Out Round 5's Gaps

### Added
- Building photo on the Contact page, above the map.
- `components/home/stats-strip.tsx` — real, verifiable homepage stats.
- `components/home/testimonials.tsx` — reviews section, config-ready via
  `lib/site-config.ts`'s new `reviews` and `googleReviewsUrl` fields.
- Patient Journey section on About (four patient types, distinct from the
  existing Consultation Process steps).
- `components/services/corporate-partners.tsx` on `/corporate-healthcare`,
  config-ready via the new `corporatePartners` array.
- Certifications section on About, using real credential data already in
  `site-config.ts`.

### Changed
- Footer now has the nighttime building photo as a 10%-opacity background
  texture across the whole section, instead of a discrete image competing
  with the existing dense content.
- Homepage composition: `Hero → StatsStrip → ServicesOverview → ... →
  Testimonials → AppointmentCta`.

### Fixed
- `corporate-partners.tsx` briefly used a raw `<img>` tag for future
  partner logos during this same round — caught and switched to
  `next/image` before shipping, keeping the zero-raw-`<img>` guarantee
  verified earlier in this project intact.

## Round 5 — AI Health Assistant, Real Photos, Trust Building

### Added
- `/ai-health-assistant` — a real chat interface (`components/ai-assistant/chat-interface.tsx`),
  disclaimer gate, typing animation, suggested/follow-up questions,
  urgency classification badges. New nav item.
- `app/api/ai-assistant/route.ts` — API route running rule-based demo
  logic (`lib/ai-assistant.ts`) today, with the exact integration point
  for a real OpenAI or Claude key clearly marked.
- `AI_ASSISTANT_SETUP.md` — working code for both providers, ready to
  drop in.
- `lib/ai-assistant.test.ts` — regression tests, including the headache
  bug caught this round.
- Real photos: `public/images/doctors/khalid-ahmed.jpg`,
  `public/images/gallery/building-daytime.jpg`,
  `public/images/gallery/building-nighttime.jpg`.
- A Consultation Process section on the About page (real 4-step flow).
- `SendIcon`, `SparkleIcon` added to the shared icon set.

### Changed
- `doctors[0].image` in `lib/site-config.ts` now points to the real
  photo (was `undefined`).
- Homepage doctor spotlight and the Doctors page now render the real
  photo instead of an initials placeholder; Doctors page also gained
  consultation hours and special interests (data that already existed,
  wasn't yet displayed).
- Appointments page gained a small "who you're booking with" trust card.
- Homepage Hero's photo changed from an interior shot to the new
  nighttime building exterior.
- About page's hero image upgraded to the new daytime building photo
  (aspect ratio corrected to match its actual portrait orientation,
  which the original 16:9 frame would have badly cropped).
- Gallery expanded from 2 photos to 4.

### Fixed
- A real bug in the AI assistant's symptom detection: `\bache\b` never
  matched "headache" (no word boundary within the single word
  "headache"), silently breaking classification for every
  headache-related message. Found by actually executing the logic
  against test inputs, not by reading the regex and assuming it worked.

## Round 4 — "$100K Client" Review

A direct question — what's still missing for a real paying client — turned
into a full pass across content, testing, SEO, and trust signals.

### Added
- Automated test suite (Vitest): `lib/health-calculators.test.ts`,
  `lib/symptom-checker.test.ts`, `lib/utils.test.ts`,
  `lib/appointment-schema.test.ts`, `lib/careers-schema.test.ts`.
- `lib/health-calculators.ts` and `lib/symptom-checker.ts` — pure business
  logic extracted out of their components so it's independently testable.
- FAQPage structured data + a real FAQ accordion on Patient Resources
  (`components/shared/faq.tsx`, `lib/faq.ts`).
- BreadcrumbList structured data + visible breadcrumb navigation
  (`components/shared/breadcrumbs.tsx`) on all four dedicated service
  pages and every blog post.
- `/accessibility` — a real Accessibility Statement page.
- A proper 1200×630 Open Graph image (`public/images/og-image.jpg`),
  replacing a reused square photo.
- Honeypot spam protection on the appointment and careers forms.
- A print stylesheet.
- Vercel Analytics (`@vercel/analytics`).

### Changed
- `Twitter` card upgraded from `summary` to `summary_large_image`.
- `components/patient-resources/health-calculators.tsx` and
  `components/patient-resources/symptom-checker.tsx` now import their
  logic from `lib/` instead of defining it inline.
- Deduplicated a copy-pasted sex-selection toggle into one shared
  component.
- `DEPLOYMENT.md` and `BUILD_GUIDE.md` expanded to cover analytics,
  preview deployments, and running the new test suite.

### Fixed
- `@vercel/analytics` was briefly added to the wrong `package.json`
  section (`devDependencies` instead of `dependencies`) during this same
  round — caught and corrected before shipping, not left in.

## Round 3 — Final QA & Release Audit

Formal 10-category senior-engineering audit. 9 real issues found, 9 fixed,
0 Critical. Full findings in `AUDIT_REPORT.md`.

### Fixed
- Three.js and GSAP no longer bundle eagerly into the homepage's initial
  JS — all four usages converted to `next/dynamic()` code-split imports.
- Added `app/error.tsx` and `app/global-error.tsx` — unhandled errors now
  show an on-brand recovery screen instead of Next.js's bare default.
- Added canonical URLs (`alternates.canonical`) to all 18 routes.
- Added focus management on client-side route changes
  (`components/shared/route-focus-manager.tsx`) for screen reader and
  keyboard users.
- Added Escape-key handling to the header's Services dropdown and mobile
  menu.
- Escaped JSON-LD structured data against a `</script>`-breakout pattern
  in `dangerouslySetInnerHTML`.
- Fixed a tablet-width layout gap — the homepage hero now switches to its
  two-column layout at `md:` (768px) instead of `lg:` (1024px).
- Both forms (appointment, careers) now show a visible fallback link if
  the browser blocks the WhatsApp popup, instead of failing silently.
- Extracted duplicated form-field styling from both forms into shared
  constants in `lib/utils.ts`.
- Added a missing meta description to `not-found.tsx`.

## Round 2 — Refinement Instructions

Six specific requests, all completed:

### Added
- `BUILD_GUIDE.md` and `DEPLOYMENT.md` (GitHub + Vercel free-tier setup,
  no domain purchase assumed).
- Real careers application form (`components/careers/careers-application-form.tsx`,
  React Hook Form + Zod) sending applications via WhatsApp.
- Facebook/Instagram/LinkedIn icons and a proper icon-button social row in
  the footer and Contact page (empty today — no fake links — but ready
  the moment real URLs exist).
- A site-wide floating WhatsApp button.
- Config-ready health package pricing (`HealthPackage.price`, currently
  unset).

### Changed
- Health Packages page redesigned around Dr. Ahmed's clinical focus areas
  instead of pricing, which isn't published yet.
- `lib/site-config.ts`'s site URL now resolves automatically to Vercel's
  assigned subdomain (or a manually-set custom domain) instead of a
  hardcoded domain that might never be purchased.
- Privacy Policy and Terms of Service substantially expanded: user
  responsibilities, appointment/careers form data specifics, an explicit
  "not an emergency service" disclaimer, future online-booking language,
  and a real "Last updated" date.

## Round 1 — Original Build

The full site, built from an initial brief plus real client-provided
assets (logo, clinic photos, doctor credentials, hours, phone numbers).

### Added
- Complete design system derived from the real logo's sampled colors
  (navy `#052268`, red `#FC0100`), not guessed ones.
- All 18 pages, either fully built or (for the handful needing
  business decisions not yet made) an honest, on-brand holding page
  with working contact CTAs — never a dead end.
- Working appointment booking form (doctor/date/time/visit-type/complaint
  → pre-filled WhatsApp message).
- AI-labeled features built as what they actually are: a symptom checker
  scoped to urgency-only (never names a condition, screens for
  emergencies first) and real BMI/ideal-weight/calorie/blood-pressure
  calculators.
- Health blog (5 posts, clinic-voice only — never written as medical
  advice attributed to the doctor without his actual review).
- Full animation set: Framer Motion for component-level interaction,
  GSAP for scroll-batched reveals, one deliberately minimal Three.js
  ambient particle field, a signature animated ECG-line motif used
  structurally throughout, page transitions, a branded loading state,
  and scroll-linked parallax on the hero photo.
- Dark mode (real toggle, persisted, site-wide) and a large-text
  accessibility toggle.
- PWA support: manifest, generated icons, and a conservative
  network-first service worker.
- SEO: sitemap, robots.txt, MedicalClinic/Physician JSON-LD structured
  data (including real geo-coordinates, decoded from a client-provided
  Plus Code and cross-validated against a published worked example).
- GitHub Actions CI (lint + build on every push).

### Fixed (found via manual audits during the build itself, not after)
- Two real WCAG AA contrast failures in dark mode (red-400 eyebrow
  labels, some white/40 captions) — both measured with actual contrast
  math, not eyeballed, and corrected project-wide.
- A logic bug in the live "open now" status: the morning session's close
  time displayed in 24-hour form ("until 15:00") instead of matching the
  12-hour format used everywhere else on the site.
- A backwards value-proposition sentence in the hero copy ("a visit here
  is *rarely* just one stop" — the opposite of the intended meaning).
- The doctor's name spelling, corrected project-wide once confirmed
  ("Ahmed," not "Ahmad") — 8 files touched, including a URL slug a
  simple find-and-replace would have missed.
