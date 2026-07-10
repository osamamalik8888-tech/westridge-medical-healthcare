# Progress Tracker

Every discrete, checkable requirement from the original brief, tallied
honestly. "Done" means real, working code in this repo — not a plan for it.

## Round 20 — doctor image removed, header nav spacing fixed

**1. Doctor image removed, completely, from all three locations it
appeared** — homepage spotlight, the dedicated Doctors page, and the
Appointments trust card. Not replaced with a placeholder or initials
circle; the professional information (name, role, bio, credentials,
qualifications) stays exactly as it was. On the Doctors page
specifically, the outer card used a 2-column grid sized for the image
(`sm:grid-cols-[19rem_1fr]`) — removing the image without adjusting that
would have squeezed the text into a narrow leftover column, so the grid
was simplified to a single column as a direct, necessary consequence of
the removal, not a separate redesign. Verified with an exhaustive search
afterward: zero remaining references anywhere, including structured
data. Removed now-unused `Image`/`initials` imports from all three files.

**2. Header nav spacing — root cause diagnosed before touching anything.**
The uploaded screenshot showed "AI Health Assistant" and "Knowledge
Center" wrapping to two lines while the other five items stayed on one —
that wrapping, not the underlying gap value, was almost certainly what
read as "inconsistent spacing" (the actual CSS gap was already uniform
across every item). Measured this properly rather than guessing:
rendered every nav label with an actual font renderer (DejaVu Sans as a
stand-in for Manrope — not pixel-identical, but far more reliable than
counting characters) to get real width numbers, then computed the full
row's total width against the real available space at the breakpoint
where the desktop nav appears.

That math showed a genuine ~41px shortfall — confirming the wrap isn't
cosmetic randomness, there truly isn't room for every label on one line
at that breakpoint anymore. This got tighter than it was after the
original Round 7 header-width fix specifically because a Language
Selector was added to that same row afterward, eating into the margin
that fix had established.

**Fixed within the explicitly authorized scope** (nav item padding and
gap only — nothing to font size, colors, the utility-icon group, or
breakpoints): tightened nav item padding (`px-3`→`px-2`) and the gap
between items (`gap-1`→`gap-0.5`), and added `whitespace-nowrap` so
labels can no longer wrap at all — which is what actually eliminates the
irregular rhythm, since wrapping was the root cause, not the gap value.
Stress-tested the fix against a deliberately pessimistic 8-10% font-width
margin of error (to account for DejaVu-vs-Manrope uncertainty) and it
did not hold up as comfortably as the plain best-estimate math suggested
— so on top of the measured fix, added a genuine engineering safety net
(`overflow-x-auto` + `shrink-0` on the nav specifically) so that even if
real-world Manrope rendering differs from these estimates, the result is
nothing worse than the nav quietly gaining internal scroll capability at
the very edge of its range — never visible breakage, overlap, or text
cut off.

**Honest limitation, stated plainly rather than glossed over**: this was
verified with real measurement and real math, not guessed — but it was
not verified by literally rendering the real Manrope font in a real
browser at 1280px, which isn't available in this environment. The
underlying math and the safety net together make this a well-reasoned,
low-risk fix, not a certainty claimed as one.

Left the utility-icon group (Language Selector, A+, dark mode, Book
Appointment) untouched — the screenshot didn't show it as visibly
uneven, and the brief's wording asked to "maintain" that group's
spacing, not necessarily change it.

## Round 19 — real build error, from an actual `npm run build`

First genuine feedback from an actual production build, not this
sandbox's approximation of one — and it caught something real.

**The error:**
`components/knowledge-center/article-body.tsx:55` — `'label' is possibly
'undefined'`.

**Root cause, diagnosed precisely:** the project's real `tsconfig.json`
has `"noUncheckedIndexedAccess": true` — a strict setting configured
early in this project, which correctly types any `Record<string, T>`
index access as `T | undefined`, since TypeScript can't prove a given
key actually exists. `sectionLabels[key]` on line 51 was exactly this
case, and line 55 used the result (`label[locale]`) without narrowing
it first. This is a real gap in this project's own verification
methodology, not a one-off mistake: every "strict tsc" check run
throughout this project used a simplified, manually-built tsconfig for
speed, and none of them replicated `noUncheckedIndexedAccess` — meaning
this whole class of error had a blind spot until an actual build caught
it. Worth knowing going forward, not just for this one fix.

**Fixed** with a genuine narrowing guard — `if (!label) return null;`
right after the indexed access — the same pattern (index, then guard)
already used safely elsewhere in this file and in `footer.tsx` /
`contact/page.tsx`. No `any`, no suppression, no non-null assertion.

**Verified rigorously, not just reasoned about:** built an isolated
test environment replicating the real `noUncheckedIndexedAccess: true`
setting exactly, and empirically confirmed: the exact broken pattern
fails (matching the real error precisely), the fix resolves it cleanly,
and the fix works in the *exact* real code shape (a `.map()` returning
JSX, not just a simplified analog).

**Went further than the one reported line**, since "ensure there are no
remaining TypeScript errors" means checking for siblings, not just the
one instance reported:
- Found every other `Record<string, T>` declaration in the project (4
  more) and tested each one's actual usage pattern in isolation under
  the real strict setting. All 4 were already safe — through `&&`
  short-circuit guards, `?? fallback`, or `typeof` narrowing — genuinely
  verified, not assumed.
- Found every array-literal-index access (`doctors[0]`, etc.) across the
  project. All but one already use `?.`. The one exception
  (`appointments/page.tsx`) has a preceding `{doctors[0] && (...)}`
  guard — empirically tested whether TypeScript's narrowing actually
  persists across multiple separate re-accesses of the same expression
  on different lines within that block (a genuinely subtle question, not
  assumed either way): it does, confirmed clean.
- Checked every `.find()` result in the project for proper handling.
  All already correctly guarded.

**Result:** the one reported error is fixed and verified; a systematic
check for the same bug class elsewhere found nothing else broken. Scope
kept to exactly what was asked — no design, layout, or functionality
changes; this file gained exactly two lines.

## Round 18 — favicon fix (documented after the fact — this was missed
at the time)

Asked to replace the browser tab icon with the real logo, surgically,
with an extensive list of things not to touch. Diagnosed the actual
cause first: no `favicon.ico` existed anywhere in the project, and the
only icon references were 192px/512px PWA sizes — nothing sized for a
browser tab. The "default blue" icon being seen was the browser's own
fallback, not a wrong file actively overriding the real one.

Generated a proper multi-resolution `app/favicon.ico` (16/32/48px) and
explicit `favicon-16.png` / `favicon-32.png`, all from the real logo file
verified byte-for-byte via SHA256 hash against what was already in the
project (the user re-uploaded it in a later message; confirmed identical,
no rework needed). Caught a real mistake in the first attempt — the
initial `.ico` save call only embedded one size instead of three despite
reporting success — caught by checking the actual file format with
`file`, not trusting the save call's return value. Added the new icons
to `layout.tsx`'s existing icon array: two lines added, nothing removed,
nothing else in the file touched. Verified scope directly by diffing
actual file content against the prior round, not just checking
timestamps (which turned out to be an unreliable signal in this
environment).

## Round 17 — Health Knowledge Center

Asked for a 25-piece bilingual medical content system (1 featured article
+ 24 monthly guides), with citations from WHO/CDC/Mayo Clinic/NHS/peer-
reviewed journals and a "Reviewed by Dr Khalid Ahmed" byline.

**Two things flagged and handled deliberately before writing anything:**
- **The byline wasn't added.** Dr. Ahmed hasn't actually read this
  content. Attaching a licensed physician's name as having reviewed
  clinical content he hasn't seen is a real problem, not a formality.
  Every article ships as `reviewStatus: "pending-review"` instead — the
  UI shows this honestly, and adding the real byline once he's actually
  reviewed a piece is a two-field change, not a rebuild.
- **Citations are real, not invented.** Actually searched and read WHO's
  own Pakistan pages, Mayo Clinic directly, Pakistan's National Institutes
  of Health, and peer-reviewed case series (Lancet, PMC) before writing
  anything — full reference lists are in each article's data, linking to
  the real source.

**Built:**
- Full bilingual (English/Urdu) architecture: `lib/knowledge-center/`
  (types, per-article data files, lookup helpers), reusable article
  detail template with a language toggle, section renderer that only
  shows sections a given topic actually needs, Article/FAQPage/
  MedicalWebPage schema, breadcrumbs, SEO metadata.
- The featured article, fully researched and written (EN + Urdu draft):
  dexamethasone/steroid misuse, grounded in Mayo Clinic pharmacology
  data and Pakistani case series documenting real harm (pediatric
  Cushing's syndrome from unqualified steroid treatment, mucormycosis
  linked to unsupervised steroid use during COVID-19).
- One monthly article fully researched and written the same way: Dengue
  Prevention & Warning Signs, from WHO's Pakistan outbreak pages and
  Pakistan's NIH dengue advisory.
- The remaining 23 monthly topics: real, accurate titles and one-line
  excerpts, explicitly marked "in development" rather than either
  skipped or filled with unresearched content — see
  `KNOWLEDGE_CENTER_NOTES.md` for exactly why and how to complete each
  one with the same rigor as the two that are done.

**Real bug caught during this round, again**: a third occurrence of the
`siteConfig.doctors[0]` mistake (from Round 15) showed up in the new
Knowledge Center index page — `doctors` is a separate export, not a
property of `siteConfig`. Caught and fixed before shipping; a project-wide
search afterward confirmed no other instance exists.

**Verification for this round specifically:**
- Isolated the exact TypeScript pattern behind a confusing "symbol cannot
  be used as an index type" error in a clean test file (no crude stub)
  to confirm it was an artifact of simplified type-checking, not a real
  bug, before moving on.
- Fixed my own import-resolution checker mid-round — it didn't understand
  directory imports resolving through `index.ts`, which this round's
  architecture uses for the first time in this project.
- Actually executed the article lookup/organization logic (not just
  compiled it): confirmed 25 total articles, exactly 2 per month, correct
  slug lookups.
- Full link check across all 22 routes, clean.
- `/blog`'s original 5 posts were **not deleted** — the nav now points
  to the new Knowledge Center, but the old route and its content are
  still live at their original URLs, exactly matching "do not remove
  existing functionality."

## Round 16 — photo mix-up corrected, CEO/Doctor sections upgraded, header redesigned

**What actually happened, traced precisely rather than just accepting the
claim:** the black-suit photo (blue background) was placed at
`/images/doctors/khalid-ahmed.jpg` in Round 15, on the reading that it was
"the uploaded doctor photograph." That overwrote a different photo
(gray suit, architectural background) that had been serving as the real
Dr. Khalid Ahmed photo since Round 5. This round's brief identified the
black-suit photo as the CEO and the gray-suit photo as the doctor —
consistent with what Round 5 had actually set up, before Round 15's edit
changed it. Corrected:

- Black-suit photo → `/images/ceo/qaim-raza.jpg`, now `ceo.image`.
- Gray-suit photo → restored to `/images/doctors/khalid-ahmed.jpg`,
  `doctors[0].image` unchanged (same path, correct file now at it).
- **Verified exhaustively, not just fixed and assumed correct**: searched
  the entire codebase for every reference to either file path, every
  usage of `doctor.image`/`ceo.image`, and every file on disk under
  `public/images/doctors/` and `public/images/ceo/`. Exactly one
  reference to each path exists (in `site-config.ts`, the single source
  of truth every consuming component reads through), and exactly one
  file exists in each folder — no orphaned duplicates, no stray
  hardcoded references anywhere that could reintroduce a mix-up.

**CEO section rebuilt** to the "premium hospital, not a team card"
standard asked for: always-dark navy section with soft ambient glow,
larger portrait (26rem), glassmorphism card (`backdrop-blur-sm`,
translucent white overlay), bigger signature-style name. **Caught the
exact `aspect-auto` bug from Round 15 in the first draft of this same
file, again** — fixed the same way as before (fixed aspect ratio,
`items-center` on the grid) before it shipped.

**Doctor section enhanced**: larger portrait (19rem), a subtle
pulse-line watermark (reusing the site's own established ECG motif,
not a new random pattern), and qualifications restructured into three
clear labeled cards — Qualification, Experience, PM&DC Registration —
instead of a plain list, making each explicitly visible as asked.

**Hiring made genuinely prominent**: moved into the header itself (not
just a homepage banner) — a glowing, gently-pulsing pill in the utility
bar (`md:` and up) and a matching treatment in the mobile menu, so it's
reachable at every width, not just desktop. The glow-pulse animation is
a new CSS keyframe using the site's real brand red, respects
`prefers-reduced-motion` twice over (`motion-safe:` variant, plus the
project's existing blanket reduced-motion rule).

**Header redesigned** with Phone, Email, WhatsApp, and Location added to
the utility bar, plus a new Language Selector (English only today,
architecturally ready for more — same config-ready pattern as
`healthPackages` pricing and `corporatePartners` logos elsewhere in this
project) in the main row. **Given the real overflow bug found and fixed
in Round 7, every one of these additions was staggered across
breakpoints with the width math actually recomputed each time** — two
first-draft placements (the Hiring pill unconditionally visible at
`sm:`, and the Language Selector at `sm:` in the tight main row) were
found too tight on redoing the math and moved to safer breakpoints
before shipping, not after.

**Final QA, matching the explicit checklist**: photo mix-up verified via
exhaustive codebase search (above) — pass. Dark mode re-checked on every
file touched this round — pass, all flagged items confirmed intentional
always-dark contexts. All 20 routes' internal links — pass. Confirmed
the AI Assistant and appointment booking files are untouched this round
— existing functionality preserved, not just assumed so.

## Round 15 — photo fix, CEO section, hiring visibility, AI upgrade, omnichannel contact

Six sections. Audited existing code before touching anything, as
instructed. One uploaded photo this round — used for Dr. Ahmed per
Section 1's explicit wording ("the uploaded doctor photograph"); the CEO
photo was explicitly described as a future upload, not this one.

**1. Doctor photo — real bug found and fixed, not just re-cropped.**
`doctor-spotlight.tsx` used a landscape 4:3 frame with `object-top` on a
near-square photo — worked out the actual math: that crops ~28% off the
bottom, enough to cut into the chin/shoulders depending on framing.
`doctors/page.tsx` removed the aspect-ratio constraint entirely at `sm:`
and up, making the crop height depend unpredictably on the sibling text
column's length. Both fixed to one consistent, safe portrait ratio (4:5)
at every breakpoint, which only trims the sides on this photo — full
head-to-shoulders composition preserved either way.

**2. Message from the CEO — built.** New homepage section
(`components/home/ceo-message.tsx`), real name/title/message text,
quotation styling, signature-style closing, reveal animation, full dark
mode. Photo is a placeholder (initials, same pattern as doctors without
one) since it wasn't part of this upload — architecture is ready to take
the real one the moment it's provided, no other changes needed. **Caught
and fixed a real bug while building this**: first draft used
`aspect-auto` on the image at the `md:` breakpoint, the exact same
unpredictable-height problem just found and fixed in Section 1, in a
brand new place. Fixed before it shipped, not after.

**3. Hiring visibility — done.** Large homepage banner
(`hiring-banner.tsx`) with real reasons to join (grounded in what's
actually true about Westridge, not generic copy), all six real position
types listed, Apply Now → `/careers`. A second, distinct CTA near the
footer. The desktop-nav-item route considered and deliberately rejected
— redid the Round 7 width math and a full new item doesn't fit; the
homepage banner and footer CTA solve the actual visibility problem
without reopening that risk.

**4. AI Health Assistant — substantially upgraded, one critical bug
caught before shipping.** New `lib/ai-provider-config.ts` — the literal
"configurable from one file" requirement, now supporting OpenAI, Claude,
*and* Gemini (researched Gemini's actual current API pattern rather than
guessing). Demo-mode intelligence significantly expanded: more emergency
red flags, clarifying follow-up questions for vague messages ("I don't
feel well" → asks what's wrong instead of guessing), far more symptom
vocabulary, more clinic FAQ topics. Chat UI gained copy-conversation and
clear-chat controls, conversation history now sent to the API (unused by
demo mode, wired through for a real provider). **A critical bug was
caught before ever running**: the rewrite used `siteConfig.doctors[0]`,
but `doctors` is a separate top-level export, not a property of
`siteConfig` — this would have thrown at module-load time, breaking the
entire feature. Found by checking the actual export structure before
trusting the code, not after. **Two more real bugs found by actually
executing the new logic against real phrases**: a bare `fee` keyword
(for the pricing FAQ) was matching inside "feel", silently hijacking "I
don't feel well" into a pricing answer instead of asking what was wrong;
and `\bmigraine\b` / `\bdiarrh\b` never matched their own plural/inflected
forms ("migraines", "diarrhea") due to missing or misplaced word
boundaries — the same class of bug as the "headache" bug from Round 5.
All fixed, all covered by new permanent regression tests, and the FAQ
matcher list was reviewed end-to-end for the same substring risk (found
and fixed the same issue in "lab"/"test" matching inside "label" and
"latest").

**5. Omnichannel contact — done.** New `MultiChannelCta` component (one
shared source for "every CTA should offer Phone, Email, and WhatsApp"),
wired into: the appointment form (now has a real Send-via-Email option
alongside WhatsApp, not just a link, plus Call/copy-number/copy-email);
a brand new Contact page form (Section 5 asked for one — none existed);
the footer (a real 4-action grid: WhatsApp, Call Now, Email Us,
Directions, replacing a WhatsApp-only button); the Doctors page (Call,
Email, and a link to the full booking form alongside the existing
WhatsApp button); and the AI Assistant's booking suggestions (was
WhatsApp-only, now offers all three). **One inconsistency caught while
wiring this up**: the component's "compact" layout silently ignored the
`showCopy` prop (early return skipped that whole block) — fixed by using
the right variant, and documented in the component so the same mistake
doesn't happen again.

**6. Final QA — run fresh.** Dark mode sweep across every file touched
this round (8 flagged, all 8 confirmed intentional — inside the
established always-dark footer, using opacity-based white styling that
doesn't need a dark: variant). Full internal-link resolution across all
20 routes. Unused-import sweep. Zero raw `<img>` tags. Strict `tsc` on
every touched lib file. The AI assistant logic was compiled and actually
executed one final time, including the exact bugs found this round,
confirming they stay fixed — not just re-read and assumed still correct.

## Round 14 — final comprehensive verification

Asked to go through everything and confirm it's genuinely final. Ran
every verification method built up across this whole project together,
fresh, against the current state — not a repeat of old results.

**Technical sweep (12 checks, all pass):** Tailwind class validity,
import resolution, bracket/paren balance, `"use client"` correctness,
image alt text, zero raw `<img>` tags anywhere, all 20 routes' internal
links, metadata completeness, canonical URL coverage, icon import
correctness, JSON validity, GSAP/Three.js code-splitting.

**Dark mode, whole project this time, not just recent files:** scanned
all 62 relevant `.tsx` files. 5 flagged, all 5 confirmed intentional
always-dark elements (footer, header utility bar, the appointment CTA
band, the hero's photo frame background, the skip-link's focus style) —
the same deliberate pattern established since Round 1, still holding.

**Actually re-executed the logic, not just re-read it:** compiled the
current, post-13-rounds versions of the health calculators, symptom
checker, and AI assistant to real JS and ran 15 regression tests against
them — including the exact headache bug from Round 5, confirmed still
fixed. All 15 pass on the code as it stands today, not as it stood when
first written.

**Two more checks that hadn't been done before:**
- Every image path referenced anywhere in real, functional code
  (excluding one doc-comment example that was never actually rendered)
  corresponds to a file that genuinely exists on disk.
- Every package actually imported anywhere in the code is declared in
  `package.json` — nothing that would silently break a real
  `npm install`.

**Result: no new issues found.** This round is confirmation, not a fix —
the project was already in the state these checks describe.

## Round 13 — careers already existed, discoverability was the real gap

Asked for a slot to apply for nurse, doctor, and other healthcare roles.
That's been fully built since Round 2 — `/careers` has a real form with
exactly those position options (Doctor, Nurse, Pharmacist, Laboratory
Staff, Receptionist, Administrative Staff), wired to WhatsApp. Checked
first rather than assuming, though: it was only ever linked from the
footer, never the header — the likely reason it hadn't been noticed.

**Fixed the actual problem (discoverability), not by rebuilding what
already worked:**
- Added a "We're hiring" link to the header's utility bar (the slim bar
  above the main nav, which had a lot of unused space — confirmed by
  the same width math from the Round 7 header fix, this one has real
  room to spare). Gated to `md:` and up for extra margin.
- Also added it directly to the mobile menu, since the utility-bar link
  alone wouldn't reach phone users — a vertical mobile menu has no width
  constraint the way the horizontal desktop bar does, so this is
  genuinely the more important of the two additions for actual traffic.
- Deliberately did *not* add an 8th flat item to the tight desktop nav
  row itself — redid the same width math from Round 7 and a full new
  item would have made that overflow risk real again. The utility bar
  and mobile menu both solve the actual problem without touching that
  constraint.

New `BriefcaseIcon` added to the shared icon set for both new links.

## Round 12 — legal pages hadn't caught up to the AI Assistant

Real gap, found by checking rather than assuming: `/privacy-policy` and
`/terms` were both written in Round 2, before the AI Health Assistant
existed (Round 5), and were never revisited afterward. A feature that
collects typed, potentially health-related messages had zero mention in
the privacy policy — a real gap, not a nice-to-have.

**Before writing the fix, verified the claim it would make was actually
true** — searched the entire AI assistant pipeline (API route, logic,
chat component) for any database, file, or storage call. None exist;
every message is genuinely processed in-memory per-request and never
persisted. Wrote the privacy section to say exactly that, not a more
reassuring-sounding claim that wasn't checked against the real code.

**Added:**
- Privacy Policy: a new "AI Health Assistant" section — what demo mode
  actually does (local pattern matching, nothing sent externally,
  nothing stored), and what changes the day a real AI provider gets
  connected (messages would then go to that provider, and this section
  gets updated before that happens, not after).
- Terms: the medical disclaimer now names the AI Assistant alongside the
  symptom checker and calculators (it previously didn't mention it at
  all), plus a new dedicated section explaining what the urgency
  classifications are and aren't a substitute for.

## Round 11 — fresh checks on older infrastructure, one real addition

Went looking at pieces that hadn't been reconsidered since much earlier
rounds, now that the site has grown a lot since they were built.

**Checked clean (confirmed correct, not just assumed):**
- The FAQ answer that does `siteConfig.hours.opdDisplay.replace("Mon–Sun,
  ", "")` — actually ran the replace against the real string to confirm
  the en-dash characters match and it genuinely strips the prefix, rather
  than assuming two independently-typed dash characters are identical
  (exactly the kind of thing that fails silently if they're not).
- `StatsStrip`'s `doctors[0]?.focusAreas?.length ?? 0` — safe against an
  empty doctors array or a doctor without focus areas.
- The service worker (`public/sw.js`) — built in Round 1 with a
  pattern-based cache rule (`/images/*`) rather than a hardcoded file
  list, specifically so new photos wouldn't require updating it later.
  Confirmed that held up: all three photos added in Round 5 are covered
  automatically, no changes needed.

**One real, previously-missing feature added:** the PWA manifest never
had a `shortcuts` field — the long-press quick-actions menu available on
an installed home-screen icon. Given the site now has three genuinely
strong candidates for it (booking, the AI Assistant, contact), added all
three. Not a bug fix — a real gap in an otherwise-complete PWA setup that
only became clearly worth filling once there was an AI Assistant page to
put in it.

## Round 10 — chat interface accessibility pass

The AI Health Assistant's chat UI (Round 5) had never gotten a dedicated
accessibility review of its own — the site-wide checks (alt text, focus
management, contrast) don't catch chat-specific patterns, since a chat
log has accessibility needs a static page doesn't.

**Found two real gaps:**
- No live region on the message thread — a screen reader user could type
  a message and get zero indication a reply ever arrived, since nothing
  announced new messages being added to the DOM.
- The typing indicator was three purely visual animated dots with no
  text equivalent at all.

**Fixed:** `role="log"` + `aria-live="polite"` + `aria-relevant="additions"`
on the message thread (the standard pattern for chat interfaces — new
messages get announced automatically as they arrive), plus a visually
hidden "Assistant is typing…" label on the typing indicator so that
state is communicated too, not just shown.

Spot-checked the other Round 5/6 additions for similar gaps while at
it — the reviews star-rating component was already correct (an
`aria-label` with the full "X out of 5 stars" on the container, each
individual decorative star marked `aria-hidden`), so no change needed
there.

## Round 9 — verification, no code changes needed

Concern raised: make sure no other doctor's name or picture appears
anywhere, and that Dr. Khalid Ahmed's real photo stays only in the
places already established. Source of the concern: last round's response
mentioned "Dr. Ayesha Malik" as a hypothetical example while testing the
`initials()` fix — that name was only ever used inside a temporary
verification script (`/home/claude/verify-initials/`, deleted
immediately after use), never written into the actual project. Worth
confirming with real evidence rather than just asserting it, so:

- Searched every `.tsx`/`.ts` file in the project for any `"Dr.
  Firstname Lastname"` pattern — the only one that exists anywhere is
  "Dr. Khalid Ahmed." Nothing else, confirmed by actually running the
  search, not by recollection.
- Confirmed `doctors[]` in `lib/site-config.ts` has exactly one entry.
- Confirmed exactly one file exists in `public/images/doctors/`
  (`khalid-ahmed.jpg`) and exactly one `image:` reference to it exists in
  code.
- Confirmed the two "more physicians joining" placeholder tiles (Homepage,
  Doctors page) only ever mention future *specialties* (dentistry, ENT,
  gynecology, physiotherapy) — never a name, real or invented.

**Nothing needed to change.** The project already fully matched the
request; this round is the verification proving that, not a fix.

## Round 8 — the "KA" fallback fixed properly

Flagged: make sure the doctor's real picture shows where "KA" was
written, not the initials fallback. Checked the actual data first —
`doctors[0].image` is genuinely set and the file genuinely exists, so the
photo was already the one rendering there today, not "KA." But the
underlying code had a real problem worth fixing regardless: the
Appointments page trust card had "KA" *hardcoded as literal text*,
completely bypassing the `initials()` function that the Doctors page and
homepage spotlight both correctly use to compute initials from whoever
the doctor actually is. That function was also duplicated in those two
files rather than shared.

**Fixed properly, not just patched:** extracted `initials()` into
`lib/utils.ts` as one shared function (previously duplicated in two
places, hardcoded as literal "KA" in a third — the same class of problem
as the time-formatting bug and the form-styling duplication from earlier
rounds). All three doctor-photo locations now use the same shared,
correct function. Verified by actually running it, not just reading it:
`initials("Dr. Khalid Ahmed")` → "KA" (matches today's behavior exactly,
no visible change), `initials("Dr. Ayesha Malik")` → "AM" (correct for
any future doctor, which the old hardcoded version would have gotten
wrong for anyone but this one doctor).

## Round 7 — fresh verification pass

No new instructions this round — re-ran the full 10-check consolidated
sweep from the audit round (it had been several rounds since all 10 ran
together), confirmed clean, then went looking for anything the
mechanical checks structurally can't catch.

Found one real thing, through arithmetic rather than a script: adding
"AI Health Assistant" as a 7th top-level nav item (Round 5) was never
checked against the header's actual available width. Estimated the real
pixel cost of every nav item plus the logo plus the CTA button and
toggles — it added up to roughly the same width as the header's own
`max-w-7xl` (1280px) container, meaning anywhere in the 1024–1280px
range (where the desktop nav was set to appear) likely didn't have
enough room, which a script checking Tailwind class *validity* has no
way to catch — the classes were all individually valid, just added up to
too much total width.

**Fixed two ways:**
- Moved the desktop-nav breakpoint from `lg:` (1024px) to `xl:` (1280px)
  — the exact width of the header's own container, guaranteeing the full
  available width exists before the nav needs to fit into it, rather
  than guessing.
- Tightened nav item padding and font size slightly regardless
  (`px-3.5`→`px-3`, `0.9rem`→`0.875rem`) as margin, since even at 1280px
  the estimated total was close enough that rounding differences across
  browsers/fonts could still matter.

Below 1280px, the mobile menu now shows instead of a cramped desktop
nav — a real, working fallback, not a compromise, since that same
hamburger menu has been in place and verified since Round 1.

Full sweep re-run clean after the fix.

## Round 6 — closing out Round 5's honestly-flagged gaps

Everything explicitly marked "not done yet" at the end of Round 5,
addressed in the same order it was flagged.

- [x] **Contact page building photo** — added above the map (helps
      visitors recognize the building when they arrive, genuinely useful
      alongside directions, not just decorative).
- [x] **Footer building photo** — not a discrete photo (the footer is
      already dense with functional content — nav, map, newsletter,
      emergency callout — and a prominent image would have competed with
      it). Used the nighttime shot as a 10% opacity background texture
      across the whole footer instead: real brand presence without
      fighting the existing content for attention. `alt=""` +
      `aria-hidden` since it's decorative, not informational.
- [x] **Medical statistics** — added to the homepage
      (`components/home/stats-strip.tsx`). Every number is real and
      pulled directly from existing data (service count, focus-area
      count) — deliberately excludes anything that would need
      fabricating to sound impressive, like a patient count or
      satisfaction percentage nobody has real numbers for.
- [x] **Testimonials + Google Reviews placeholder** — combined into one
      section (`components/home/testimonials.tsx`), since real reviews
      would likely serve both purposes at once. Config-ready
      (`lib/site-config.ts`'s `reviews` array, currently empty) — add
      real ones and the section renders them automatically. Until then,
      an honest "reviews are on their way" state with a real way to
      leave feedback, not invented quotes.
- [x] **Patient Journey** — added to About, distinct from the
      Consultation Process section from Round 5 (that's the linear
      in-visit flow; this is different patient *types* — first-time,
      follow-up, family, corporate).
- [x] **Insurance/Corporate Partners placeholder** — added to
      `/corporate-healthcare` specifically, the actual natural home for
      it (`components/services/corporate-partners.tsx`). Config-ready
      (`lib/site-config.ts`'s `corporatePartners` array), logo-ready
      layout, honest placeholder until real partnerships exist.
- [x] **Certifications** — added to About
      (`Qualifications & registration`), using only real data already in
      `site-config.ts` (MBBS, FCPS Part-I, the actual PM&DC number) — no
      invented generic trust badges.

**A correction made mid-round, not after:** the corporate partners
component was first written with a raw `<img>` tag for future logos,
which breaks the "next/image everywhere" discipline verified multiple
times earlier in this project. Caught and fixed to use `next/image`
before it shipped, not after.

**Verification, run fresh:** the same full sweep as every previous
round — Tailwind class validity, import resolution, `"use client"`
boundaries, image alt text, zero raw `<img>` tags anywhere in the
project, all 20 routes' internal links, JSON validity. All pass.

## Round 5 — AI Health Assistant, real photos, trust building

Seven numbered sections, real client photos uploaded for the first time
(doctor headshot, daytime and nighttime building shots). Audited the
existing architecture first, as instructed, before touching anything —
existing pages, design system, and functionality all preserved; nothing
rebuilt.

**1. AI Health Assistant — built.** New nav item, new page at
`/ai-health-assistant`. Real chat interface: disclaimer gate before any
conversation starts, typing animation, suggested starter questions,
contextual follow-ups, classification badges (Emergency/Urgent/Routine/
Self-care styled as a red-intensity gradient rather than introducing an
off-brand color), a persistent "Demo mode" indicator so it's never
mistaken for a real AI, and a booking CTA that appears exactly when the
logic suggests it should. Runs on `lib/ai-assistant.ts` — rule-based
pattern matching, not a real language model yet, architected so a real
OpenAI or Claude key drops into exactly one clearly marked spot in
`app/api/ai-assistant/route.ts` (full walkthrough for either provider in
the new `AI_ASSISTANT_SETUP.md`, including a written `SYSTEM_PROMPT`
with every safety rule already encoded). The demo logic was actually
*executed* against ~20 real test inputs before being trusted — not just
read and assumed correct — which caught a real bug: `\bache\b` never
matched "headache" (no word boundary between "head" and "ache," since
it's one continuous word), so every headache-related message silently
fell through to the generic fallback instead of being classified at all.
Fixed, and turned into 4 permanent regression tests
(`lib/ai-assistant.test.ts`) so it can't happen again unnoticed.
Crisis-language input (anything resembling self-harm) gets a distinct,
caring response — not lumped into a generic "call 1122" emergency
reply — encouraging the person to reach out to someone right now, since
that distinction actually matters. The existing Patient Resources symptom
checker was **not removed or touched** — this is a genuinely new,
separate, more prominent feature, not a replacement of one you may not
have realized was already there.

**2. Doctor profile — done for 3 of 4 requested locations.** The real
uploaded photo now appears on the homepage doctor spotlight, the
dedicated Doctors page (which also gained consultation hours and special
interests — data that already existed in `site-config.ts` but wasn't
being displayed anywhere), and a new trust card on the Appointments page
above the booking form. About page intentionally left without a separate
doctor photo — it doesn't have a "meet the doctor" moment distinct from
what the Doctors page already does, so adding one there would've been
forced rather than natural ("where appropriate" was read as permission to
skip a genuinely awkward fit, not an oversight).

**3. Clinic building — partially done.** The new daytime and nighttime
photos are live on the Homepage Hero (nighttime — the dark sky pairs
naturally with the existing navy gradient overlay), the About page hero
image, and the Gallery (both, alongside the two originals — 4 photos
now). **Not yet done: Contact page and Footer** — flagged honestly below,
not silently skipped.

**4 & 5. Homepage polish and trust-building — partially done.** Added a
real "What a visit actually looks like" Consultation Process section
(4 steps) to the About page, built from the site's actual real flow, not
invented. **Not yet done: testimonials, medical statistics, Patient
Journey, Insurance/Corporate Partners placeholder, Certifications section,
Google Reviews placeholder** — see the honest list below.

**6. Performance** — the code-splitting, image optimization
(`next/image` throughout, including all three new photos), and metadata
discipline from the last audit round were maintained throughout this one;
nothing added here works against those. An actual Lighthouse run still
hasn't happened — same caveat as every previous round, this sandbox can't
run one.

**7. Verification, run fresh:** Tailwind class validity, import
resolution, `"use client"` boundaries, image alt text, all 20 routes'
internal links, JSON validity — all pass. The AI assistant's logic was
compiled and actually executed (not just read) against real test inputs
before being trusted, the same standard applied to every safety-relevant
piece of logic in this project.

**A genuine, unprompted observation, not a request to change anything:**
the two new building photos are labeled "8k" in their filenames but are
actually 850×1502 and 941×1672 pixels — nowhere near 8K resolution, and
noticeably more polished/idealized than the original phone photo of the
same storefront (no people, no motorcycles, dramatic lighting). They very
likely depict the real building, possibly AI-enhanced for marketing
polish, which is completely normal practice — worth knowing the actual
numbers rather than assuming "8k" is literal, that's all.

## Round 4 — "$100K client" review

Prompted by a direct question: what would still be improved before handing
this to a paying client with a real budget. Full list — implemented and
recommended-but-not-implemented, with reasons — is in the response this
round was delivered in; summary here.

**Implemented (13 items):**
- Real automated test suite (Vitest) — pure business logic
  (`lib/health-calculators.ts`, `lib/symptom-checker.ts`) extracted out of
  components specifically to make it testable, 5 test files, 40+ cases.
  Every pure-function assertion was actually executed against the real
  implementation before being trusted (31/31 passed) — not just written
  and assumed correct, the same standard applied to everything else in
  this project.
- A proper 1200×630 Open Graph share image (was reusing a square gallery
  photo at the wrong aspect ratio); Twitter card upgraded to
  `summary_large_image` to match.
- Honeypot spam protection on both forms.
- FAQPage structured data, backed by a real visible FAQ accordion (native
  `<details>`/`<summary>` — zero JavaScript) on Patient Resources.
- BreadcrumbList structured data + visible breadcrumb navigation on the
  four dedicated service pages and every blog post.
- A real Accessibility Statement page — lists what's actually been done,
  honestly notes what hasn't (no real screen-reader testing yet, no formal
  WCAG audit), and gives a direct way to report a problem.
- A print stylesheet.
- Vercel Analytics — cookieless, zero-config on the free tier, gives the
  business visibility into traffic they currently have none of.
- Deduplicated a copy-pasted Sex-toggle UI component, found incidentally
  while extracting the calculator logic.
- Documented (not installed — needs a real account) exactly how to wire in
  real error monitoring later.
- Expanded `DEPLOYMENT.md` (analytics, preview deployments — already
  automatic once GitHub+Vercel are connected) and `BUILD_GUIDE.md`
  (running the new test suite).
- Caught and fixed a real mistake made *this round*: `@vercel/analytics`
  was initially added to `devDependencies` instead of `dependencies` — it
  renders in production, so it needed to be a real dependency. Found by
  checking, not assumed correct.

**Recommended, not implemented — genuinely needs your resources or a
decision, not more code:** professional photography, real patient
testimonials, an Urdu translation (deliberately not attempted here —
mistranslated medical content is worse than none, this needs a
professional translator plus the doctor's own review), a CMS so
non-technical staff can edit content, real email marketing integration, a
real backend + admin dashboard for appointment management, Google Business
Profile setup, browser-based E2E testing (Playwright) to complement the
new unit tests, a formal accessibility audit by an actual screen-reader
user, Lighthouse CI enforcement, uptime monitoring, video content, and the
legal review that's been flagged since Round 1.

## Round 3 — final QA & release audit

A formal senior-engineering audit across 10 categories (code quality,
UI/UX, performance, SEO, accessibility, security, production readiness,
visual polish, medical-industry trust, future scalability). Full findings
and fixes in `AUDIT_REPORT.md`; summary here:

- **9 real issues found, 9 fixed, 0 Critical.** 2 High (Three.js/GSAP
  bundled eagerly into the homepage instead of code-split — the most
  performance-impactful fix in this round; no `error.tsx`/`global-error.tsx`
  anywhere, meaning any unhandled error showed Next's bare default screen).
  6 Medium (duplicated form styling, a tablet breakpoint gap in the hero,
  missing canonical URLs on all 18 pages, no focus management on route
  change, no Escape-key handling on the header's dropdown/mobile menu, an
  unescaped JSON-LD injection point). 1 Low (no fallback when a browser
  blocks the WhatsApp popup).
- Also caught in passing: `not-found.tsx` was missing a meta description
  (a special Next.js file, so it wasn't touched by the earlier
  canonical-URL pass, which only covered regular `page.tsx` files).
- Full project re-verification — 10 automated checks, including the two
  new ones specific to this round (canonical URL coverage, GSAP/Three.js
  code-splitting confirmation) — run clean after every single fix, not
  batched to the end.
- **Release Candidate Approved.**

## Round 2 — refinement instructions

A second, more specific instruction set arrived after the original 66-item
build was complete, asking for six concrete things. Tracked separately
since it's a distinct scope, not a continuation of the same checklist.

- [x] **1. Legal review of policy pages** — both `/privacy-policy` and
      `/terms` rewritten with every requested section: appointment-request
      data specifics, contact/careers form data, cookies, data security,
      medical disclaimer, limitation of liability, user responsibilities
      (new), IP rights, third-party services, future online-booking
      integrations (new), an explicit "not an emergency service"
      disclaimer (new, separate from the general medical disclaimer), and
      a real "Last updated" date. Still marked as a draft needing actual
      legal review — that part doesn't change no matter how thorough the
      draft gets.
- [x] **2. Build process** — `BUILD_GUIDE.md` added, explaining
      `npm install` (what each dependency is for, in a table) and
      `npm run build` (what each of its four stages does) in plain
      language, plus what a clean build output looks like and what to do
      if it isn't clean.
- [x] **3. Free deployment** — `DEPLOYMENT.md` added: GitHub setup, Vercel
      free-tier setup, environment variables (there's exactly one,
      optional), and domain instructions that don't assume a purchase.
      `lib/site-config.ts`'s site URL is no longer hardcoded to a domain
      that might never exist — it now resolves to `NEXT_PUBLIC_SITE_URL`
      if set, else Vercel's own automatically-provided subdomain, else
      localhost. This means sitemap/robots/Open Graph are automatically
      correct on the free tier with zero configuration.
- [x] **4. Health Packages redesign** — no pricing anywhere. Leads with
      Dr. Ahmed's clinical focus areas (as you described them — framed as
      "conditions commonly seen and managed," not a subspecialty
      certification claim, since his credentials show FCPS in Medicine,
      not a cardiology fellowship). Package pricing is now genuinely
      config-ready: `HealthPackage.price` is an optional field in
      `lib/site-config.ts` — add a value and it displays automatically.
- [x] **5. Careers page** — real application form
      (`components/careers/careers-application-form.tsx`), React Hook
      Form + Zod like the appointment form, fields for name/phone/email/
      position/experience/message, generates a WhatsApp message to
      +923217295474 on submit. Position list (Doctor, Nurse, Pharmacist,
      Laboratory Staff, Receptionist, Administrative Staff) lives in
      `lib/careers-schema.ts`.
- [x] **6. Social media** — `socialLinks` was already free of placeholder
      links (empty array, by design, from Round 1). Upgraded from a plain
      text-link list to real icon buttons (Facebook/Instagram/LinkedIn
      icons added to `icons.tsx`) so the footer *and* the Contact page
      render properly the moment a real URL is added — no redesign
      needed, exactly as asked. Also added a persistent floating WhatsApp
      button (site-wide except on `/appointments` and `/careers`, where a
      WhatsApp-ending form is already the whole page) and a WhatsApp CTA
      in the footer's brand column.

**Final verification, run fresh against the whole project (not reused from
earlier):** Tailwind class validity, import resolution, bracket balance,
`"use client"` correctness, image alt text, all 18 routes' internal links,
page metadata completeness, JSON validity, dark-mode coverage on every file
touched this round — all PASS. 15 WhatsApp call-to-action sites across 15
files. 2 forms confirmed on React Hook Form + Zod.

## Original 66-item tracker (for history)

## Pages — 18 / 18

- [x] Home
- [x] About
- [x] Doctors
- [x] Services
- [x] Pharmacy
- [x] Diagnostic Laboratory
- [x] Vaccination
- [x] Corporate Healthcare
- [x] Appointments (full doctor/date/time/visit-type/complaint form)
- [x] Health Packages
- [x] Gallery
- [x] Health Blog
- [x] Patient Resources
- [x] Contact
- [x] Careers
- [x] Privacy Policy (draft — legal review still needed, see below)
- [x] Terms (draft — legal review still needed, see below)
- [x] 404

## Tech stack — 13 / 14 built, 1 / 14 deliberately deferred

- [x] Next.js (16, current stable — brief said 15, 16 is what a fresh
      install gives you today)
- [x] React 19
- [x] TypeScript
- [x] Tailwind CSS (v4)
- [x] Framer Motion
- [x] GSAP
- [x] Three.js (minimal, as asked)
- [x] ShadCN-pattern components (hand-rolled variant system + `cn()` —
      the CLI itself needs network access this sandbox doesn't have)
- [x] React Hook Form
- [x] Zod
- [ ] React Query — **not added on purpose.** It manages server-state
      caching; this site has no backend API yet for it to cache against.
      Add it when appointments or the blog get a real backend, not before.
- [x] PWA (manifest, icons, service worker)
- [x] GitHub (CI workflow, `.github/workflows/ci.yml`)
- [x] Vercel (deploy steps documented — actually deploying needs your
      account)

## Animations — 13 / 13

- [x] Ultra smooth scrolling
- [x] Micro interactions
- [x] Premium hover effects
- [x] Text reveals
- [x] Image reveals (dedicated clip-path wipe, distinct from text fade-up)
- [x] Parallax (hero photo, scroll-linked)
- [x] Mouse interactions (hover states throughout)
- [x] Floating background elements (Three.js ambient particles)
- [x] Heartbeat-inspired motion (pulse dot, ECG line)
- [x] Animated ECG line (the site's signature motif)
- [x] SVG path animations
- [x] Page transitions
- [x] Loading animation based on the logo

## AI features — 3 / 3

- [x] AI Symptom Checker (informational only — urgency triage, never
      names a condition, screens for emergencies first)
- [x] AI Health Calculators — BMI, Ideal Weight, Calories, Blood Pressure
- [x] Future AI Patient Portal — addressed as architecture (centralized
      data layer, clean component boundaries), not a standalone feature
      to build until there's a real portal to architect for

## Patient experience — 5 / 5

- [x] Dark mode (real toggle, persisted, site-wide)
- [x] Light mode (default)
- [x] Installable as an app (PWA)
- [x] Accessibility — large-text toggle, focus states, semantic HTML,
      alt text, WCAG-checked contrast (two real failures found and fixed)
- [x] Mobile experience (responsive throughout; not tested on a physical
      device, since this sandbox can't do that)

## SEO — 6 / 6 (one caveat noted)

- [x] Schema.org / medical structured data (MedicalClinic + Physician)
- [x] Open Graph
- [x] Twitter Cards
- [x] Local SEO — NAP (name/address/phone) consistent site-wide via
      `site-config.ts`; geo-coordinates now real too — decoded from your
      Plus Code and validated (see the changelog below), not guessed.
- [x] Google indexing ready (`sitemap.xml`, `robots.txt`)
- [x] Health Blog (counts toward SEO too — 5 real posts, up from 3)

## Footer — 6 / 7 live, 1 / 7 honestly empty

- [x] Quick links
- [x] Emergency numbers (Rescue 1122, verified real)
- [x] Services
- [x] Google Maps
- [ ] Socials — no real profile links were provided, so the section is
      built but hidden rather than filled with guessed URLs. Add real
      links to `socialLinks` in `lib/site-config.ts` and they'll appear.
- [x] Newsletter (mailto-based — functional today, upgradeable to a real
      ESP later)
- [x] Copyright

## What's not "left to build" — it's external

These aren't gaps in the code. They need your input, a lawyer, or a real
network connection, not more of my time:

1. **Doctor's name spelling** — ~~"Ahmed" vs "Ahmad"~~ **Resolved: "Dr
   Khalid Ahmed," confirmed directly.** Every instance across the site
   (name, slug, bio, blog posts, calculators, symptom checker) updated
   from the one source field plus a project-wide search for stray
   hardcoded mentions — 8 files touched, all now consistent.
2. **Legal review** of `/privacy-policy` and `/terms`.
3. **`npm install && npm run build`** — the real compile check, needs a
   machine with network access.
4. **Actual deployment** — needs your GitHub + Vercel accounts.
5. **Real pricing** for `/health-packages`, once decided.
6. **Real job listings** for `/careers`, once there are any.
7. **Real social media links**, once you share them.
8. ~~**Precise geo-coordinates** for structured data, once pinned.~~
   **Resolved** — you gave a real Plus Code (`J264+2C Rawalpindi`),
   decoded to `33.610062, 73.006062` and now live in structured data.

## Running total

**66 / 66** buildable requirements from the brief have real, working
code. **2 of the 8** external items are now resolved with real
information you provided (doctor's name, coordinates) — **6 remain**,
all needing your input, a lawyer, or a live network, not more code.

## Changelog

- **Step 1** — baseline established. All 66 checklist items above were
  already built before this file existed; writing it down just made the
  count explicit instead of implicit.
- **Step 2** — blog expanded from 3 to 5 posts ("How Appointment Booking
  Works Here", "What to Bring to Your First Visit"). Not a checklist item
  by itself — blog depth is open-ended, not a fixed target — but real,
  verified (strict `tsc` pass), added value.
- **Step 3** — every verification method used throughout this build (Tailwind
  class validity, `@/` import resolution, bracket/paren balance,
  `"use client"` correctness, image alt text, internal link resolution,
  page metadata completeness, JSON validity) run together as one
  consolidated sweep across all 56 `.ts`/`.tsx` files. 8/8 checks pass.
- **Step 4** — searched for precise geo-coordinates for structured data
  (item 8 on the external list); only got locality-level confirmation,
  not anything precise enough to add responsibly, so that stays undone on
  purpose rather than being guessed. Redirected the effort into the one
  external item code *can* partially help with: expanded `/privacy-policy`
  and `/terms` with the standard sections a real policy needs (data
  retention, security, lab/specialist sharing, cookies, children's data,
  IP, limitation of liability, changes-to-this-policy) so your lawyer has
  a full draft to edit rather than a thin one. Also caught and fixed a
  stale line on the terms page calling the symptom checker "future" —
  it's been live for several steps now.
- **Step 5** — proofread the actual rendered copy (not the code, the
  sentences) across the homepage and About/Services pages. Found a real
  one: the hero's value-prop line said "a visit here is *rarely* just one
  stop" — which literally states the opposite of what Westridge offers.
  The same idea is phrased correctly on About ("usually just one stop")
  and Services ("instead of at three different addresses"); only the hero
  had it backwards. Fixed to "rarely just the doctor," which now says what
  it was supposed to.
- **Step 6** — you confirmed two real external items: the doctor's name is
  "Ahmed" (not "Ahmad"), and the real location is Plus Code
  `J264+2C Rawalpindi`. Name: global find-replace plus a full project
  search to confirm no hardcoded mentions were missed (8 files touched,
  including a stale slug the search-and-replace itself couldn't catch).
  Coordinates: rather than trust a hand-decode blindly, the map
  embed/directions links now pass your Plus Code straight to Google
  (which resolves it authoritatively — zero decode risk for the part
  people actually click). For structured data specifically, wrote an
  Open Location Code decoder, validated it against a published worked
  example (Merlion Park, Singapore) until it reproduced the known
  answer exactly, caught and fixed a real exponent bug in the short-code
  recovery math during that process, then confirmed the final result
  (33.610062, 73.006062) was identical across three independently-sourced
  reference points before trusting it.
