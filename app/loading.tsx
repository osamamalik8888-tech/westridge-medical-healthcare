import Image from "next/image";
import { EcgLine } from "@/components/shared/ecg-line";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 py-24">
      <Image
        src="/images/logo.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 animate-pulse-dot"
      />
      <EcgLine className="h-8 w-40" strokeClassName="stroke-red-500" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
