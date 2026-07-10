import Image from "next/image";
import dynamic from "next/dynamic";
import { ceo } from "@/lib/site-config";
import { initials } from "@/lib/utils";

const ScrollReveal = dynamic(() =>
  import("@/components/shared/scroll-reveal").then((mod) => mod.ScrollReveal)
);

export function CeoMessage() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      {/* Elegant ambient lighting — two soft glows, not a busy background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-500/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-navy-400/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div data-reveal className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
              Executive Message
            </p>
          </div>

          <div
            data-reveal
            className="mt-10 grid items-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-sm md:grid-cols-[26rem_1fr]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950">
              {ceo.image ? (
                <Image
                  src={ceo.image}
                  alt={ceo.name}
                  fill
                  sizes="(min-width: 768px) 26rem, 100vw"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-serif text-6xl text-white/90">{initials(ceo.name)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <svg
                viewBox="0 0 32 24"
                className="h-9 w-11 fill-red-400/30"
                aria-hidden="true"
              >
                <path d="M0 24V13.5C0 6 4.5 1 12 0l1.5 4C8 5.5 5.5 8.5 5.5 13H12v11H0Zm18 0V13.5C18 6 22.5 1 30 0l1.5 4C26 5.5 23.5 8.5 23.5 13H30v11H18Z" />
              </svg>

              <h2 className="mt-4 font-serif text-2xl text-white sm:text-3xl">
                Message from the CEO
              </h2>

              <div className="mt-6 flex flex-col gap-4">
                {ceo.message.map((paragraph, i) => (
                  <p key={i} className="text-[0.9375rem] leading-relaxed text-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-serif text-3xl italic text-white">{ceo.name}</p>
                <p className="mt-1.5 text-sm text-white/50">{ceo.title}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
