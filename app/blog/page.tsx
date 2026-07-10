import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { ArrowRightIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Health Blog",
  description: "News and updates from Westridge Medical Healthcare, Rawalpindi.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Health Blog
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Notes from Westridge
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Updates about the clinic itself for now — hours, services, what&rsquo;s
          new. Health articles from Dr. Ahmed will join these once he has time
          to write them; we&rsquo;re not putting words in his mouth to fill
          the page faster.
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-[1.75rem] border border-line bg-white p-7 transition-colors hover:bg-navy-50/60 dark:border-white/10 dark:bg-navy-900 dark:hover:bg-white/5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-navy-400 dark:text-white/50">
              {formatDate(post.date)} · {post.readingMinutes} min read
            </p>
            <h2 className="mt-2 font-serif text-2xl text-navy-950 dark:text-white">
              {post.title}
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-600 dark:text-white/60">
              {post.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 transition-transform group-hover:translate-x-1 dark:text-white">
              Read more
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
