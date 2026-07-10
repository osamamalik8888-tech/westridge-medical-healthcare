/**
 * Data shape for the Knowledge Center. Every article is bilingual
 * (English + Urdu) and broken into the same clinical-education sections
 * throughout, so the article template only needs to be built once.
 *
 * `reviewStatus` is deliberately not "reviewed" for anything generated
 * here — see KNOWLEDGE_CENTER_NOTES.md for why, and exactly what changes
 * the moment a piece has actually been read by a physician.
 */

export type Locale = "en" | "ur";

export interface Bilingual {
  en: string;
  ur: string;
}

export interface MythFact {
  myth: Bilingual;
  fact: Bilingual;
}

export interface Faq {
  question: Bilingual;
  answer: Bilingual;
}

export interface Reference {
  label: string; // e.g. "Mayo Clinic — Corticosteroid side effects"
  url: string;
}

/** Every field is optional except intro — not every topic needs every
 *  section (a vaccination guide doesn't need "foods to avoid", for
 *  instance), and forcing empty sections into every article would read
 *  as padding, not genuine patient education. */
export interface ArticleSections {
  intro: Bilingual[];
  causes?: Bilingual[];
  symptoms?: Bilingual[];
  diagnosis?: Bilingual[];
  treatment?: Bilingual[];
  prevention?: Bilingual[];
  lifestyle?: Bilingual[];
  foodsToEat?: Bilingual[];
  foodsToAvoid?: Bilingual[];
  warningSigns?: Bilingual[];
  whenToSeeDoctor?: Bilingual[];
  mythVsFact?: MythFact[];
}

export interface KnowledgeArticle {
  slug: string;
  featured?: boolean;
  /** 1-12, for the monthly organization. Omitted for the featured article. */
  month?: number;
  category: Bilingual;
  title: Bilingual;
  metaDescription: Bilingual;
  excerpt: Bilingual;
  readingMinutes: number;
  reviewStatus: "pending-review" | "reviewed";
  reviewerName?: string;
  reviewerRole?: string;
  sections: ArticleSections;
  faqs: Faq[];
  references: Reference[];
  relatedSlugs: string[];
  /** Full sections written and researched, vs. a scaffolded placeholder
   *  awaiting full development. Both render correctly; this just
   *  controls whether the "in development" notice shows. */
  status: "complete" | "in-development";
}

export const months: Bilingual[] = [
  { en: "January", ur: "جنوری" },
  { en: "February", ur: "فروری" },
  { en: "March", ur: "مارچ" },
  { en: "April", ur: "اپریل" },
  { en: "May", ur: "مئی" },
  { en: "June", ur: "جون" },
  { en: "July", ur: "جولائی" },
  { en: "August", ur: "اگست" },
  { en: "September", ur: "ستمبر" },
  { en: "October", ur: "اکتوبر" },
  { en: "November", ur: "نومبر" },
  { en: "December", ur: "دسمبر" },
];
