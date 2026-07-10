import { siteConfig } from "@/lib/site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Either works. Walk-ins are welcome during OPD hours, and booking ahead on WhatsApp just means less waiting when you arrive.",
  },
  {
    question: "What are your hours?",
    answer: `The doctor holds two OPD sessions daily, seven days a week: ${siteConfig.hours.opdDisplay.replace("Mon–Sun, ", "")}. ${siteConfig.hours.pharmacyDisplay}.`,
  },
  {
    question: "Is the pharmacy open even when the doctor isn't in?",
    answer:
      "Yes — Westridge Plus Pharmacy runs 24 hours a day, independent of the doctor's session times, and doesn't require a prescription from this clinic specifically.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "The fastest way is WhatsApp — the appointment form on this site builds a message with your details already filled in. A phone call works just as well if you'd rather talk it through.",
  },
  {
    question: "What should I bring to my first visit?",
    answer:
      "Any previous test results, prescriptions, or medical reports relevant to why you're coming in, plus a list of any medication you're currently taking. Beyond that, walking in is enough — nothing needs to be prepared in advance.",
  },
  {
    question: "Can I get a lab test done without a doctor's visit first?",
    answer:
      "Message us on WhatsApp with what you need — sample collection is available on site, and we can confirm availability before you come in.",
  },
  {
    question: "Is Westridge equipped for medical emergencies?",
    answer: siteConfig.emergency.note,
  },
];
