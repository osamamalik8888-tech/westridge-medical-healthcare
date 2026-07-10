# Knowledge Center — Notes

Honest documentation of what's actually built, what's scaffolded, and why,
for whoever picks this up next (including a future round of this same
project).

## What "reviewed" means here, and why nothing is marked that way yet

Every article's `reviewStatus` is `"pending-review"`. None of this content
has actually been read by Dr. Ahmed. The original brief asked for a
"Reviewed by Dr Khalid Ahmed" byline on the featured article — that byline
was deliberately not added, because it would be false. A licensed
physician's name attached to clinical content he hasn't seen is a real
problem, not a formality, for him and for anyone who trusts that
attribution.

**To add it honestly**, once an article has actually been reviewed: set
`reviewStatus: "reviewed"` and add `reviewerName` / `reviewerRole` on that
specific article's data object. The article page, and the schema markup,
both already check this field and will render the real byline
automatically — nothing else needs to change.

## What's fully written vs. scaffolded

**Fully researched and written (English + Urdu draft):**
- The featured article (`featured-article.ts`) — Dexamethasone/steroid
  misuse. Written from real sources: Mayo Clinic directly on corticosteroid
  pharmacology and side effects, and peer-reviewed Pakistani case series
  specifically on steroid-misuse harm (pediatric Cushing's syndrome from
  unqualified treatment, mucormycosis linked to unsupervised steroid use
  during COVID-19, iatrogenic Cushing's in adults). Full reference list in
  the article's `references` field.
- Dengue (`article-dengue.ts`) — written from WHO's own Pakistan
  disease-outbreak pages, Pakistan's National Institutes of Health dengue
  advisory, and Lancet/PMC coverage of Pakistani dengue seasons.

**Scaffolded, not fully written (`monthly-scaffold.ts`):** the other 23
monthly topics. Each has a real, accurate title, category, and one-line
excerpt — the kind of description that's safe to state without per-topic
research. Each is explicitly marked `status: "in-development"` and shows
an honest "in development" notice on its page rather than pretending to
be complete. None of them have a researched clinical body, because writing
one *without* the same research process used for dengue and dexamethasone
would mean either inventing medical content or quietly citing sources that
were never actually checked — both worse than an honest placeholder.

## Why: the actual scale of "24 fully researched bilingual articles"

Each of the two written articles took multiple real web searches, reading
actual WHO/Mayo Clinic/peer-reviewed sources, and translating carefully.
Doing that with the same rigor for all 24 — plus proper Urdu review by an
actual bilingual speaker, plus Dr. Ahmed's real review — is genuinely
weeks of work for an actual editorial team, not something to compress into
one sitting without cutting corners somewhere. The honest choice was
between "24 articles, some of them under-researched or with invented
citations" and "2 articles done right, 22 scaffolded and clearly labeled."
This took the second path.

## How to complete a scaffolded article

1. Research it the same way dengue was: 2-4 targeted web searches
   (general medical facts + Pakistan-specific context), reading real
   sources, not assuming.
2. Fill in the relevant `sections` fields — not every section applies to
   every topic (a vaccination guide doesn't need "foods to avoid"; skip
   fields that don't fit rather than padding them).
3. Write the Urdu version alongside the English, or leave it for a native
   speaker to complete — either way, don't publish as reviewed until it
   actually has been.
4. Add real `references` and a few genuine `faqs`.
5. Set `status: "complete"`.
6. Get Dr. Ahmed (or another qualified reviewer) to actually read it, then
   set `reviewStatus: "reviewed"` with his name and title.

## Urdu translation caveat

The Urdu throughout (featured article, dengue, and the scaffold intros) is
a first draft, not a verified translation. It should be reviewed by a
native Urdu speaker with medical familiarity before this goes live — same
caveat, same reasoning, as the Privacy Policy and Terms needing an actual
lawyer's review before publishing. Thorough drafting doesn't substitute
for that review; it just gives the reviewer something real to start from
instead of a blank page.

## Architecture, for anyone extending this

- `lib/knowledge-center/types.ts` — the data shape. Every section is
  optional except `intro`, and every string is `{ en, ur }`.
- One file per fully-written article, plus `monthly-scaffold.ts` for the
  rest, combined in `index.ts` (the single import point for the rest of
  the app).
- `components/knowledge-center/article-body.tsx` renders whichever
  sections exist, in order, in the selected language — adding a new
  section type means adding one entry to `sectionLabels` and
  `sectionOrder`, not touching the rendering logic itself.
- The bilingual toggle (`article-locale.tsx`) is per-page client state —
  it doesn't persist across page loads or affect the rest of the site's
  language (that's a separate, site-wide `LanguageSelector` in the
  header, currently English-only).
