import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const fullTrail: Crumb[] = [{ label: "Home", href: "/" }, ...trail];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullTrail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy-400 dark:text-white/40">
          {fullTrail.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === fullTrail.length - 1 ? (
                <span aria-current="page" className="text-navy-600 dark:text-white/70">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="transition-colors hover:text-navy-700 dark:hover:text-white/70">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
