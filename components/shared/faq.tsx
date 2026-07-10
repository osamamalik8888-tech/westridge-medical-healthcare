import { faqItems } from "@/lib/faq";
import { ChevronDownIcon } from "@/components/shared/icons";

export function Faq() {
  return (
    <div className="flex flex-col divide-y divide-line rounded-[1.75rem] border border-line bg-white dark:divide-white/10 dark:border-white/10 dark:bg-navy-900">
      {faqItems.map((item) => (
        <details key={item.question} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-navy-900 marker:content-none dark:text-white">
            {item.question}
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-navy-400 transition-transform group-open:rotate-180 dark:text-white/50" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-white/65">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
