import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allArticles, getArticle } from "@/lib/knowledge-center";
import {
  ArticleLocaleProvider,
  ArticleLanguageToggle,
} from "@/components/knowledge-center/article-locale";
import { ArticleBody } from "@/components/knowledge-center/article-body";
import { KnowledgeArticleSchema } from "@/components/knowledge-center/article-schema";
import { StarIcon, ClockIcon, WhatsappIcon, PhoneIcon, MailIcon } from "@/components/shared/icons";
import { whatsapp, primaryPhone, siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title.en,
    description: article.metaDescription.en,
    alternates: { canonical: `/knowledge-center/${slug}` },
    openGraph: {
      title: article.title.en,
      description: article.metaDescription.en,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const bookingMessage = `Hi Westridge Medical Healthcare, I read "${article.title.en}" on the Knowledge Center and had a question.`;

  return (
    <ArticleLocaleProvider>
      <KnowledgeArticleSchema article={article} />
      <article className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
        <Breadcrumbs
          trail={[
            { label: "Knowledge Center", href: "/knowledge-center" },
            { label: article.title.en, href: `/knowledge-center/${slug}` },
          ]}
        />

        {article.featured && (
          <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white">
            <StarIcon className="h-3.5 w-3.5" />
            Featured Medical Insight of the Year
          </span>
        )}

        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.1em] text-red-600 dark:text-red-300",
            article.featured && "mt-4"
          )}
        >
          {article.category.en}
        </p>
        <h1 className="mt-3 text-balance font-serif text-3xl text-navy-900 dark:text-white sm:text-4xl">
          {article.title.en}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-navy-500 dark:text-white/55">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            {article.readingMinutes > 0 ? `${article.readingMinutes} min read` : "In development"}
          </span>
          <span
            className={
              article.reviewStatus === "reviewed"
                ? "rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-600 dark:bg-white/10 dark:text-white/70"
                : "rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
            }
          >
            {article.reviewStatus === "reviewed"
              ? `Reviewed by ${article.reviewerName}`
              : "Pending physician review"}
          </span>
        </div>

        <div className="mt-6">
          <ArticleLanguageToggle />
        </div>

        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-navy-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-white/80">
          This article is for general education and does not replace a consultation with a
          qualified physician. It does not diagnose or treat any individual condition. If this
          is a medical emergency, call {siteConfig.emergency.number} or go to your nearest
          emergency department immediately.
        </div>

        <ArticleBody article={article} />

        {article.faqs.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-2xl text-navy-950 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 flex flex-col divide-y divide-line rounded-2xl border border-line dark:divide-white/10 dark:border-white/10">
              {article.faqs.map((faq, i) => (
                <details key={i} className="group px-5 py-4">
                  <summary className="cursor-pointer list-none font-medium text-navy-900 marker:content-none dark:text-white">
                    {faq.question.en}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-white/65">
                    {faq.answer.en}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {article.references.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-xl text-navy-950 dark:text-white">References</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {article.references.map((ref) => (
                <li key={ref.url}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-navy-600 underline decoration-navy-200 underline-offset-2 hover:text-red-600 dark:text-white/65 dark:decoration-white/20 dark:hover:text-red-300"
                  >
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 rounded-[1.75rem] bg-navy-950 p-8 text-center dark:border dark:border-white/10">
          <h2 className="font-serif text-xl text-white">Questions about this?</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
            An article is a starting point, not a diagnosis — talk to a doctor about your
            specific situation.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsapp.href(bookingMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={primaryPhone.href}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <PhoneIcon className="h-4 w-4" />
              Call Clinic
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <MailIcon className="h-4 w-4" />
              Email
            </a>
          </div>
          <Link
            href="/appointments"
            className="mt-4 inline-block text-sm font-medium text-white/70 underline underline-offset-4 hover:text-white"
          >
            Or book an appointment directly →
          </Link>
        </div>

        {article.relatedSlugs.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-xl text-navy-950 dark:text-white">Related Articles</h2>
            <div className="mt-4 flex flex-col gap-2">
              {article.relatedSlugs.map((relatedSlug) => {
                const related = getArticle(relatedSlug);
                if (!related) return null;
                return (
                  <Link
                    key={relatedSlug}
                    href={`/knowledge-center/${relatedSlug}`}
                    className="text-sm font-medium text-red-600 hover:underline dark:text-red-300"
                  >
                    {related.title.en} →
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </ArticleLocaleProvider>
  );
}
