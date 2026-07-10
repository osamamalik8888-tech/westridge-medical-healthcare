import type { KnowledgeArticle } from "./types";

/**
 * The remaining monthly topics, scaffolded rather than fully written.
 * Each has a real, accurate topic framing and excerpt (safe, general
 * knowledge — the kind of one-line description that doesn't need
 * per-topic research to state correctly), but status is
 * "in-development": the full 14-section clinical body for each would
 * need the same research-per-topic process as the dengue and
 * dexamethasone articles before publishing, not a shortcut.
 *
 * See KNOWLEDGE_CENTER_NOTES.md for the reasoning and how to complete
 * these one at a time.
 */

function scaffold(
  slug: string,
  month: number,
  titleEn: string,
  titleUr: string,
  excerptEn: string,
  category: { en: string; ur: string }
): KnowledgeArticle {
  return {
    slug,
    month,
    category,
    title: { en: titleEn, ur: titleUr },
    metaDescription: { en: excerptEn, ur: "مکمل مضمون تیار کیا جا رہا ہے۔" },
    excerpt: { en: excerptEn, ur: "مکمل مضمون تیار کیا جا رہا ہے۔" },
    readingMinutes: 0,
    reviewStatus: "pending-review",
    status: "in-development",
    sections: {
      intro: [
        {
          en: `This guide on "${titleEn}" is planned for the Knowledge Center and is currently in development — it will be researched and written with the same standard as the published articles (real sources, reviewed content) before it goes live, rather than published as a placeholder.`,
          ur: `"${titleUr}" کے بارے میں یہ مضمون نالج سینٹر کے لیے منصوبہ بند ہے اور فی الحال تیار کیا جا رہا ہے۔`,
        },
      ],
    },
    faqs: [],
    references: [],
    relatedSlugs: [],
  };
}

export const monthlyScaffold: KnowledgeArticle[] = [
  // January
  scaffold("seasonal-influenza-flu-prevention", 1, "Seasonal Influenza & Flu Prevention", "موسمی انفلوئنزا اور فلو سے بچاؤ", "How flu actually spreads in winter, and what genuinely reduces your risk versus what's just folklore.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  scaffold("winter-cough-cold-respiratory-infections", 1, "Winter Cough, Cold & Respiratory Infections", "سردیوں کی کھانسی، زکام اور نظام تنفس کے انفیکشن", "Most winter coughs are viral and self-limiting — here's how to tell the ones that aren't.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  // February
  scaffold("heart-health-blood-pressure-awareness", 2, "Heart Health & Blood Pressure Awareness", "دل کی صحت اور بلڈ پریشر سے آگاہی", "Blood pressure has almost no symptoms until it's a real problem — why regular checks matter more than how you feel.", { en: "Chronic Disease", ur: "دائمی بیماری" }),
  scaffold("healthy-lifestyle-heart-disease-prevention", 2, "Healthy Lifestyle for Heart Disease Prevention", "دل کی بیماری سے بچاؤ کے لیے صحت مند طرز زندگی", "The genuinely evidence-backed lifestyle changes that lower cardiovascular risk, not the trendy ones.", { en: "Chronic Disease", ur: "دائمی بیماری" }),
  // March
  scaffold("seasonal-allergies", 3, "Seasonal Allergies", "موسمی الرجی", "Spring pollen and dust triggers in Pakistan, and what actually helps versus what just masks symptoms.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  scaffold("asthma-awareness-management", 3, "Asthma Awareness & Management", "دمہ سے آگاہی اور انتظام", "Living well with asthma comes down to a small number of things that genuinely matter — here's what they are.", { en: "Chronic Disease", ur: "دائمی بیماری" }),
  // April
  scaffold("healthy-ramadan-nutrition", 4, "Healthy Ramadan Nutrition", "صحت مند رمضان نیوٹریشن", "Suhoor and iftar choices that actually sustain energy through the fast, versus the ones that work against you.", { en: "Nutrition", ur: "نیوٹریشن" }),
  scaffold("heat-exhaustion-prevention", 4, "Heat Exhaustion Prevention", "گرمی کی تھکن سے بچاؤ", "The early warning signs of heat exhaustion, and why catching them early matters as temperatures rise.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  // May
  scaffold("heat-stroke-prevention", 5, "Heat Stroke Prevention", "لو لگنے سے بچاؤ", "Heat stroke is a genuine medical emergency, not just \"bad heat exhaustion\" — knowing the difference matters.", { en: "Emergency Awareness", ur: "ہنگامی آگاہی" }),
  scaffold("food-poisoning-summer", 5, "Food Poisoning During Summer", "گرمیوں میں فوڈ پوائزننگ", "Why food poisoning spikes in Pakistan's hot months, and the food-safety habits that actually prevent it.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  // June
  scaffold("dehydration-prevention", 6, "Dehydration Prevention", "پانی کی کمی سے بچاؤ", "In peak summer heat, dehydration risk is higher than most people realize — the real warning signs to watch for.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  scaffold("typhoid-awareness", 6, "Typhoid Awareness", "ٹائیفائیڈ سے آگاہی", "Typhoid remains a genuine risk in Pakistan, including drug-resistant strains — what actually prevents it.", { en: "Infectious Disease", ur: "متعدی بیماری" }),
  // July (dengue is fully written separately)
  scaffold("malaria-prevention-symptoms-treatment", 7, "Malaria Prevention, Symptoms & Treatment", "ملیریا سے بچاؤ، علامات اور علاج", "Malaria and dengue share a season but not a prevention strategy — the real differences that matter.", { en: "Infectious Disease", ur: "متعدی بیماری" }),
  // August
  scaffold("viral-fever", 8, "Viral Fever", "وائرل بخار", "Most fevers in monsoon season are viral and self-limiting — here's how to actually tell when one isn't.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  scaffold("monsoon-waterborne-diseases", 8, "Monsoon Waterborne Diseases", "مون سون میں پانی سے پھیلنے والی بیماریاں", "Flooding and contaminated water bring a real, documented spike in specific illnesses — what to watch for.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  // September
  scaffold("child-vaccination-guide", 9, "Child Vaccination Guide", "بچوں کی ویکسینیشن گائیڈ", "What's actually on Pakistan's routine immunization schedule, and why the timing of each dose matters.", { en: "Preventive Care", ur: "احتیاطی نگہداشت" }),
  scaffold("back-to-school-health-tips", 9, "Back-to-School Health Tips", "اسکول واپسی کی صحت کے مشورے", "The genuinely useful health prep for a new school year, beyond just buying new stationery.", { en: "Preventive Care", ur: "احتیاطی نگہداشت" }),
  // October
  scaffold("diabetes-awareness", 10, "Diabetes Awareness", "ذیابیطس سے آگاہی", "Pakistan has one of the world's highest diabetes rates — the early signs that are easy to dismiss.", { en: "Chronic Disease", ur: "دائمی بیماری" }),
  scaffold("healthy-nutrition-weight-management", 10, "Healthy Nutrition & Weight Management", "صحت مند نیوٹریشن اور وزن کا انتظام", "Sustainable weight management, built on what actually works rather than restrictive fads.", { en: "Nutrition", ur: "نیوٹریشن" }),
  // November
  scaffold("pneumonia-prevention", 11, "Pneumonia Prevention", "نمونیا سے بچاؤ", "Pneumonia risk rises sharply in winter, especially for children and older adults — real prevention steps.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  scaffold("winter-respiratory-diseases", 11, "Winter Respiratory Diseases", "سردیوں کی سانس کی بیماریاں", "Smog and cold air both stress the respiratory system in Pakistani winters — what genuinely helps.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  // December
  scaffold("winter-health-care", 12, "Winter Health Care", "سردیوں کی صحت کی دیکھ بھال", "The genuinely useful winter health habits, for the whole family, not just the well-known ones.", { en: "Seasonal Illness", ur: "موسمی بیماری" }),
  scaffold("strengthening-immune-system", 12, "Strengthening Your Immune System", "اپنے مدافعتی نظام کو مضبوط بنانا", "What actually strengthens immune function, evidence-based — and what's marketing dressed up as medicine.", { en: "Preventive Care", ur: "احتیاطی نگہداشت" }),
];
