import type { KnowledgeArticle } from "./types";
import { featuredArticle } from "./featured-article";
import { dengueArticle } from "./article-dengue";
import { monthlyScaffold } from "./monthly-scaffold";

export * from "./types";

export const allMonthlyArticles: KnowledgeArticle[] = [dengueArticle, ...monthlyScaffold].sort(
  (a, b) => (a.month ?? 0) - (b.month ?? 0)
);

export const allArticles: KnowledgeArticle[] = [featuredArticle, ...allMonthlyArticles];

export function getArticle(slug: string): KnowledgeArticle | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByMonth(month: number): KnowledgeArticle[] {
  return allMonthlyArticles.filter((a) => a.month === month);
}

export { featuredArticle };
