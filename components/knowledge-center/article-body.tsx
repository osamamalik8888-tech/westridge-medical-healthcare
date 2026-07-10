"use client";

import type { KnowledgeArticle, Bilingual } from "@/lib/knowledge-center";
import { useArticleLocale } from "@/components/knowledge-center/article-locale";
import { CheckIcon, CloseIcon } from "@/components/shared/icons";

const sectionLabels: Record<string, Bilingual> = {
  intro: { en: "", ur: "" },
  causes: { en: "Causes", ur: "وجوہات" },
  symptoms: { en: "Symptoms", ur: "علامات" },
  diagnosis: { en: "Diagnosis", ur: "تشخیص" },
  treatment: { en: "Treatment Overview", ur: "علاج کا جائزہ" },
  prevention: { en: "Prevention", ur: "بچاؤ" },
  lifestyle: { en: "Lifestyle Advice", ur: "طرز زندگی کے مشورے" },
  foodsToEat: { en: "Foods to Eat", ur: "کھانے کی اشیاء" },
  foodsToAvoid: { en: "Foods to Avoid", ur: "پرہیز کی اشیاء" },
  warningSigns: { en: "Warning Signs", ur: "خطرے کی علامات" },
  whenToSeeDoctor: { en: "When to Visit a Doctor", ur: "ڈاکٹر سے کب رجوع کریں" },
};

const sectionOrder: (keyof KnowledgeArticle["sections"])[] = [
  "causes",
  "symptoms",
  "diagnosis",
  "treatment",
  "prevention",
  "lifestyle",
  "foodsToEat",
  "foodsToAvoid",
  "warningSigns",
  "whenToSeeDoctor",
];

export function ArticleBody({ article }: { article: KnowledgeArticle }) {
  const { locale } = useArticleLocale();
  const dir = locale === "ur" ? "rtl" : "ltr";

  return (
    <div dir={dir} className={locale === "ur" ? "mt-8 text-right font-sans" : "mt-8"}>
      <div className="flex flex-col gap-4">
        {article.sections.intro.map((p, i) => (
          <p key={i} className="text-[0.9375rem] leading-relaxed text-navy-700 dark:text-white/75">
            {p[locale]}
          </p>
        ))}
      </div>

      {sectionOrder.map((key) => {
        const content = article.sections[key];
        if (!content || (Array.isArray(content) && content.length === 0)) return null;
        const label = sectionLabels[key];
        if (!label) return null;

        return (
          <div key={key} className="mt-10">
            <h2 className="font-serif text-xl text-navy-950 dark:text-white">{label[locale]}</h2>
            <div className="mt-3 flex flex-col gap-3">
              {(content as Bilingual[]).map((p, i) => (
                <p
                  key={i}
                  className="text-[0.9375rem] leading-relaxed text-navy-700 dark:text-white/75"
                >
                  {p[locale]}
                </p>
              ))}
            </div>
          </div>
        );
      })}

      {article.sections.mythVsFact && article.sections.mythVsFact.length > 0 && (
        <div className="mt-10">
          <h2 className="font-serif text-xl text-navy-950 dark:text-white">
            {locale === "en" ? "Myth vs Fact" : "افسانہ بمقابلہ حقیقت"}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {article.sections.mythVsFact.map((pair, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-mist p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start gap-2.5">
                  <CloseIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-400 dark:text-white/40" />
                  <p className="text-sm text-navy-500 dark:text-white/55">{pair.myth[locale]}</p>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-300" />
                  <p className="text-sm font-medium text-navy-800 dark:text-white/85">
                    {pair.fact[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {article.status === "in-development" && (
        <div className="mt-10 rounded-2xl border border-line bg-mist p-5 text-sm text-navy-500 dark:border-white/10 dark:bg-white/5 dark:text-white/55">
          {locale === "en"
            ? "The full version of this article — causes, symptoms, treatment, prevention, and more — is in development and will be researched and published with the same standard as the rest of the Knowledge Center."
            : "اس مضمون کا مکمل ورژن تیار کیا جا رہا ہے۔"}
        </div>
      )}
    </div>
  );
}
