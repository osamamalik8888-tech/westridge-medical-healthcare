import type { Metadata } from "next";
import { ChatInterface } from "@/components/ai-assistant/chat-interface";
import { CheckIcon, CloseIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "AI Health Assistant",
  description: "Ask the Westridge Medical Healthcare AI Health Assistant about symptoms, hours, booking, and what to expect — general guidance only, never a diagnosis.",
  alternates: { canonical: "/ai-health-assistant" },
};

const canDo = [
  "Classify how soon a symptom is worth being seen for — Emergency, Urgent, Routine, or Self-care",
  "Answer real questions about hours, services, booking, and what to bring",
  "Point you to Rescue immediately if anything sounds like an emergency",
];

const wontDo = [
  "Diagnose a condition, or tell you what you \"have\"",
  "Prescribe or recommend a specific medicine or dose",
  "Replace an actual consultation with Dr. Ahmed",
];

export default function AiHealthAssistantPage() {
  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          AI Health Assistant
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Ask a question, get real guidance
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Running in demo mode right now — simple, rule-based logic rather than a full
          language model. Every safety rule below applies either way.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5 dark:border-white/10 dark:bg-navy-900">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-navy-500 dark:text-white/50">
            What it can do
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {canDo.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy-600 dark:text-white/70">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600 dark:text-red-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5 dark:border-white/10 dark:bg-navy-900">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-navy-500 dark:text-white/50">
            What it won&rsquo;t do
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {wontDo.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy-600 dark:text-white/70">
                <CloseIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-400 dark:text-white/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <ChatInterface />
      </div>
    </div>
  );
}
