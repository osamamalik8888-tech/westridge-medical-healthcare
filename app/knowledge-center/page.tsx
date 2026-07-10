import type { Metadata } from "next";
import Link from "next/link";
import { featuredArticle, allMonthlyArticles, months } from "@/lib/knowledge-center";
import { StarIcon, ClockIcon, ArrowRightIcon } from "@/components/shared/icons";
import { siteConfig, doctors } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Health Knowledge Center",
  description: "Evidence-based health education from Westridge Medical Healthcare — organized month by month around the illnesses most relevant to Pakistan.",
  alternates: { canonical: "/knowledge-center" },
};

export default function KnowledgeCenterPage() {
  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Health Knowledge Center
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Health education worth trusting
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Organized by month, in English and Urdu, around what actually affects health in
          Pakistan through the year — not a generic blog feed.
        </p>
      </div>

      {/* Featured Medical Insight of the Year — pinned, always first, visually larger */}
      <div className="mx-auto mt-16 max-w-4xl">
        <Link
          href={`/knowledge-center/${featuredArticle.slug}`}
          className="group block overflow-hidden rounded-[2rem] border border-red-200 bg-gradient-to-br from-navy-950 to-navy-900 shadow-xl shadow-navy-900/10 transition-shadow hover:shadow-2xl dark:border-red-500/20"
        >
          <div className="p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white">
              <StarIcon className="h-3.5 w-3.5" />
              Featured Medical Insight of the Year
            </span>
            <h2 className="mt-6 text-balance font-serif text-2xl text-white sm:text-3xl lg:text-4xl">
              {featuredArticle.title.en}
            </h2>
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white/65">
              {featuredArticle.excerpt.en}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" />
                {featuredArticle.readingMinutes} min read
              </span>
              <span>{featuredArticle.category.en}</span>
              <span className="inline-flex items-center gap-1 font-medium text-white transition-transform group-hover:translate-x-1">
                Read the full article
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Monthly Health Guides */}
      <div className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-center font-serif text-2xl text-navy-950 dark:text-white sm:text-3xl">
          Monthly Health Guides
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-navy-500 dark:text-white/55">
          Two guides for every month — organized around what's actually relevant to Pakistan
          at that time of year.
        </p>

        <div className="mt-12 flex flex-col gap-12">
          {months.map((month, i) => {
            const monthNumber = i + 1;
            const articles = allMonthlyArticles.filter((a) => a.month === monthNumber);
            if (articles.length === 0) return null;
            return (
              <div key={month.en}>
                <h3 className="font-serif text-xl text-navy-900 dark:text-white">{month.en}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/knowledge-center/${article.slug}`}
                      className="group rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-navy-900/[0.06] dark:border-white/10 dark:bg-navy-900"
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-red-600 dark:text-red-300">
                        {article.category.en}
                      </p>
                      <h4 className="mt-2 font-medium text-navy-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-300">
                        {article.title.en}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-navy-500 dark:text-white/55">
                        {article.excerpt.en}
                      </p>
                      {article.status === "in-development" && (
                        <span className="mt-3 inline-block rounded-full bg-navy-50 px-2.5 py-1 text-[0.6875rem] font-medium text-navy-400 dark:bg-white/5 dark:text-white/40">
                          In development
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-2xl rounded-[1.75rem] bg-navy-950 px-8 py-12 text-center dark:border dark:border-white/10">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">
          Have a question this didn&rsquo;t answer?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-white/60">
          {doctors[0]?.name ?? "Our physician"} sees patients directly for exactly
          this — book a visit rather than relying on an article alone.
        </p>
        <div className="mt-7">
          <Link
            href="/appointments"
            className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-700"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
