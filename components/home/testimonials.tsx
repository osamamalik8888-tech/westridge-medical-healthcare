import { reviews, googleReviewsUrl, whatsapp } from "@/lib/site-config";
import { WhatsappIcon } from "@/components/shared/icons";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < count ? "fill-red-500" : "fill-navy-100 dark:fill-white/15"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.7l-5.2 2.8 1-5.8-4.2-4.1 5.8-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Shows real reviews the moment lib/site-config.ts's `reviews` array has
 * any — until then, an honest placeholder rather than invented quotes.
 * Fabricated testimonials on a healthcare site are exactly the kind of
 * thing that erodes trust the moment anyone notices, which patients do.
 */
export function Testimonials() {
  if (reviews.length === 0) {
    return (
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
            Patient Reviews
          </p>
          <h2 className="mt-4 font-serif text-3xl text-navy-950 dark:text-white sm:text-4xl">
            Reviews are on their way
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-navy-600 dark:text-white/65">
            We&rsquo;d rather wait for real ones than write something ourselves. If
            you&rsquo;ve visited recently, we&rsquo;d genuinely like to hear how it went.
          </p>
          <a
            href={whatsapp.href("Hi, I'd like to share feedback about my visit.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10"
          >
            <WhatsappIcon className="h-4 w-4" />
            Tell us about your visit
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
            Patient Reviews
          </p>
          <h2 className="mt-4 font-serif text-3xl text-navy-950 dark:text-white sm:text-4xl">
            What patients say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.author + review.date}
              className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-navy-900"
            >
              <Stars count={review.rating} />
              <p className="mt-3 text-sm leading-relaxed text-navy-700 dark:text-white/75">
                {review.text}
              </p>
              <p className="mt-4 text-sm font-medium text-navy-900 dark:text-white">
                {review.author}
              </p>
            </div>
          ))}
        </div>

        {googleReviewsUrl && (
          <div className="mt-10 text-center">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-red-600 hover:underline dark:text-red-300"
            >
              Read all reviews on Google →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
