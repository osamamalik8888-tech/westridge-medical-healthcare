import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
      <Breadcrumbs
        trail={[
          { label: "Health Blog", href: "/blog" },
          { label: post.title, href: `/blog/${slug}` },
        ]}
      />
      <p className="text-xs font-medium uppercase tracking-[0.1em] text-navy-400 dark:text-white/50">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </p>
      <h1 className="mt-3 text-balance font-serif text-4xl text-navy-950 dark:text-white sm:text-5xl">
        {post.title}
      </h1>

      <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-navy-700 dark:text-white/75">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
