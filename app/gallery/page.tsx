import type { Metadata } from "next";
import Image from "next/image";
import { ImageReveal } from "@/components/shared/image-reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look inside Westridge Medical Healthcare on Main GT Road, Rawalpindi.",
  alternates: { canonical: "/gallery" },
};

const photos = [
  {
    src: "/images/gallery/building-daytime.jpg",
    alt: "Westridge Medical Healthcare and Westridge Plus Pharmacy storefront on Main GT Road, daytime",
    position: "object-top",
  },
  {
    src: "/images/gallery/building-nighttime.jpg",
    alt: "Westridge Medical Healthcare and Westridge Plus Pharmacy storefront on Main GT Road, at night",
    position: "object-top",
  },
  {
    src: "/images/gallery/recovery-area.png",
    alt: "Treatment area inside Westridge Medical Healthcare, with examination couches and monitoring equipment",
    position: "object-center",
  },
  {
    src: "/images/gallery/storefront.jpeg",
    alt: "Westridge Medical Healthcare and Westridge Plus Pharmacy storefront on Main GT Road",
    position: "object-center",
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Gallery
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Inside Westridge
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          More photos are being added as we shoot them — this page grows with
          the clinic rather than shipping with stand-ins.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {photos.map((photo, i) => (
          <ImageReveal
            key={photo.src}
            delay={i * 0.12}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-navy-50 dark:border-white/10 dark:bg-white/5"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className={`object-cover ${photo.position}`}
            />
          </ImageReveal>
        ))}
      </div>
    </div>
  );
}
