"use client";

import { useState, createContext, useContext } from "react";
import type { Locale } from "@/lib/knowledge-center";
import { cn } from "@/lib/utils";

const LocaleContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: "en",
  setLocale: () => {},
});

export function useArticleLocale() {
  return useContext(LocaleContext);
}

export function ArticleLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
  );
}

export function ArticleLanguageToggle() {
  const { locale, setLocale } = useArticleLocale();
  return (
    <div className="inline-flex rounded-full border border-line bg-white p-1 dark:border-white/15 dark:bg-navy-900">
      {(["en", "ur"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            locale === l
              ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900"
              : "text-navy-600 hover:bg-navy-50 dark:text-white/65 dark:hover:bg-white/10"
          )}
        >
          {l === "en" ? "English" : "اردو"}
        </button>
      ))}
    </div>
  );
}
