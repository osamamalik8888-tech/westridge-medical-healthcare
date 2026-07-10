import type { KnowledgeArticle } from "@/lib/knowledge-center";
import { siteConfig, doctors } from "@/lib/site-config";

export function KnowledgeArticleSchema({ article }: { article: KnowledgeArticle }) {
  const url = `${siteConfig.url}/knowledge-center/${article.slug}`;
  const doctor = doctors[0];

  const medicalWebPage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    url,
    name: article.title.en,
    description: article.metaDescription.en,
    ...(article.reviewStatus === "reviewed" && article.reviewerName
      ? {
          reviewedBy: {
            "@type": "Person",
            name: article.reviewerName,
            jobTitle: article.reviewerRole,
          },
        }
      : {}),
    publisher: {
      "@type": "MedicalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title.en,
    description: article.metaDescription.en,
    url,
    ...(doctor && article.reviewStatus === "reviewed"
      ? { author: { "@type": "Person", name: doctor.name, jobTitle: doctor.role } }
      : { author: { "@type": "Organization", name: siteConfig.name } }),
    publisher: {
      "@type": "MedicalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const faqSchema =
    article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question.en,
            acceptedAnswer: { "@type": "Answer", text: faq.answer.en },
          })),
        }
      : null;

  const schemas = [medicalWebPage, articleSchema, faqSchema].filter(Boolean);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
