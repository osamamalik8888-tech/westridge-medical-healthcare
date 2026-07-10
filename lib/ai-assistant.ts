import { siteConfig, whatsapp, doctors } from "@/lib/site-config";
import { faqItems } from "@/lib/faq";

export type Classification = "emergency" | "urgent" | "routine" | "self-care";

export interface AssistantReply {
  text: string;
  classification?: Classification;
  suggestBooking?: boolean;
  followUps?: string[];
}

export const suggestedQuestions = [
  "I have a fever, what should I do?",
  "How do I book an appointment?",
  "What are your hours?",
  "Do you do lab tests here?",
  "What should I bring to my first visit?",
  "I have chest pain",
];

/**
 * Genuine red-flag language. Deliberately broad and case-insensitive —
 * false positives here (flagging something as an emergency that wasn't
 * quite one) are the safe direction to err in; false negatives are not.
 */
const EMERGENCY_PATTERNS: RegExp[] = [
  /chest\s*(pain|pressure|tightness)/i,
  /crushing (pain|feeling)/i,
  /can'?t breathe|difficult(y)? breathing|shortness of breath|struggling to breathe|gasping/i,
  /face (is )?droop|slurred speech|can'?t speak (properly|right)|sudden weakness|sudden numbness|one side.{0,15}(weak|numb|paraly)/i,
  /severe bleeding|bleeding (a lot|heavily)|won'?t stop bleeding|deep cut|wound.{0,15}(gaping|deep)/i,
  /unconscious|passed out|fainted|not responding|unresponsive|won'?t wake up/i,
  /severe allergic|throat.{0,15}swelling|anaphyla|swollen (tongue|throat)/i,
  /severe (abdominal|stomach) pain/i,
  /(overdose|poisoned|poisoning|swallowed (something|poison|chemical))/i,
  /severe burn|third.degree burn/i,
  /head injury|hit (my|his|her) head hard|concussion/i,
  /broken bone|bone (is )?sticking out|compound fracture/i,
  /seizure|convulsi/i,
  /baby.{0,15}(won'?t stop crying|blue|not breathing|floppy)/i,
  /choking|something stuck in (my|his|her) throat/i,
];

/** Handled completely separately from the emergency bucket — this needs
 *  care and real resources, not a "call 1122" one-liner. */
const CRISIS_PATTERNS: RegExp[] = [
  /suicid|kill myself|end my life|harm myself|self.?harm|don'?t want to (live|be alive)|no reason to live/i,
];

const URGENT_PATTERNS: RegExp[] = [
  /high fever|fever (for|since) \d+/i,
  /severe (pain|headache)/i,
  /vomiting blood|blood in (my )?(stool|vomit|urine)/i,
  /can'?t keep (anything|food|water) down/i,
  /getting worse|not improving|won'?t go away/i,
  /(3|three|4|four|5|five|more than a few) days? (now )?and (still|it'?s still)/i,
  /pregnant.{0,20}(pain|bleeding|cramp)/i,
  /child.{0,15}(high fever|won'?t eat|very tired|lethargic)/i,
];

const SELF_CARE_PATTERNS: RegExp[] = [
  /slight|minor|mild|little bit of|small|just started|barely/i,
];

/** Message reads as a symptom concern, but too vague to classify
 *  confidently yet — worth one clarifying question instead of guessing. */
const VAGUE_PATTERNS: RegExp[] = [
  /^i (don'?t feel well|feel (bad|sick|unwell|off|weird|strange))\.?$/i,
  /^(something'?s wrong|not feeling (great|good|well))\.?$/i,
  /^i'?m sick\.?$/i,
  /^help\.?$/i,
];

interface FaqMatch {
  keywords: RegExp;
  answer: string;
}

const faqMatchers: FaqMatch[] = [
  {
    keywords: /appointment|book(ing)?|schedule/i,
    answer: `The fastest way is the appointment form on this site, or WhatsApp directly. ${faqItems.find((f) => f.question.includes("How do I book"))?.answer ?? ""}`,
  },
  {
    keywords: /hours|open|close|timing/i,
    answer: faqItems.find((f) => f.question.includes("hours"))?.answer ?? siteConfig.hours.opdDisplay,
  },
  {
    keywords: /walk.?in|without (an )?appointment/i,
    answer: faqItems.find((f) => f.question.includes("walk in"))?.answer ?? "",
  },
  {
    keywords: /pharmacy|medicine|prescription/i,
    answer:
      "Westridge Plus Pharmacy is on site and open 24/7, independent of the doctor's session hours — no prescription from this clinic specifically required.",
  },
  {
    keywords: /\blab\b|\btests?\b|blood work|sample/i,
    answer: faqItems.find((f) => f.question.includes("lab test"))?.answer ?? "",
  },
  {
    keywords: /bring|first visit|what do i need/i,
    answer: faqItems.find((f) => f.question.includes("bring"))?.answer ?? "",
  },
  {
    keywords: /address|location|where are you|directions/i,
    answer: `We're at ${siteConfig.address.lines.join(", ")}.`,
  },
  {
    keywords: /price|cost|\bfee\b|how much|insurance/i,
    answer:
      "Pricing isn't published on the site yet, and we don't currently have insurance partnerships listed — message us on WhatsApp with what you need and we'll quote it directly.",
  },
  {
    keywords: /vaccin|immuniz/i,
    answer:
      "Vaccinations are one of our services — message us with which one you need and we'll confirm availability and timing.",
  },
  {
    keywords: /ecg|ekg|heart (test|monitor)/i,
    answer: "ECG is available on site as part of our general services — no separate referral needed.",
  },
  {
    keywords: /corporate|company|workplace|employees/i,
    answer:
      "We arrange corporate and group health visits directly rather than through the usual booking flow — worth a WhatsApp message with your team size and what you're looking for.",
  },
  {
    keywords: /doctor'?s? name|who is the doctor|which doctor/i,
    answer: `${doctors[0]?.name ?? "Our physician"} sees patients here — ${doctors[0]?.credentials ?? ""}.`,
  },
  {
    keywords: /career|job|hiring|vacan|apply/i,
    answer: "We're hiring — there's a real application form on the Careers page, not just a mailbox.",
  },
];

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

const bookingFollowUps = ["How do I book an appointment?", "What are your hours?"];

/**
 * The demo-mode "brain." Deliberately simple pattern matching, not a real
 * language model — see AI_ASSISTANT_SETUP.md for exactly where a real one
 * plugs in once a provider key is added (lib/ai-provider-config.ts).
 * Every branch either gives a safe, factual answer, asks one clarifying
 * question, or defers to a human — never guesses at a diagnosis.
 */
export function getDemoReply(userText: string): AssistantReply {
  const text = userText.trim();

  if (matchesAny(text, CRISIS_PATTERNS)) {
    return {
      text: `I'm really glad you reached out, and I want to take this seriously rather than give you a generic answer. Please talk to someone right now — call ${siteConfig.emergency.number} (Rescue), go to your nearest emergency department, or reach out to someone you trust so you're not dealing with this alone. This tool can't provide the support you need right now, but a real person can, immediately.`,
      classification: "emergency",
      suggestBooking: false,
    };
  }

  if (matchesAny(text, EMERGENCY_PATTERNS)) {
    return {
      text: `What you're describing needs attention right now, not a booked appointment. Please call ${siteConfig.emergency.number} (Rescue) or go directly to your nearest emergency department. Don't wait for a reply here.`,
      classification: "emergency",
      suggestBooking: false,
    };
  }

  const faqMatch = faqMatchers.find((m) => m.keywords.test(text));
  if (faqMatch && faqMatch.answer) {
    return {
      text: faqMatch.answer,
      suggestBooking: /appointment|book/i.test(text) === false,
      followUps: bookingFollowUps,
    };
  }

  if (matchesAny(text, VAGUE_PATTERNS)) {
    return {
      text: "Sorry you're feeling that way. To point you in the right direction, can you tell me a bit more — where it's bothering you, or what it feels like?",
      followUps: [
        "It's a headache",
        "It's my stomach",
        "I have a fever",
        "It's hard to explain",
      ],
    };
  }

  const looksLikeSymptom =
    /\b(pain|ache|headaches?|migraines?|stomachaches?|backaches?|toothaches?|earaches?|hurts?|fevers?|cough(ing)?|cold|flu|rash(es)?|nause(a|ous|ated)|vomit(ing)?|dizz(y|iness)|tired|fatigued?|swelling|sore throat|congest(ed|ion)?|allerg(y|ies|ic)?|itch(y|ing)?|burn(ing)?|numb(ness)?|tingl(e|ing|y)|cramp(s|ing)?|diarrhea|constipat(ed|ion)?|bloat(ed|ing)?)\b/i.test(
      text
    );

  if (looksLikeSymptom) {
    if (matchesAny(text, URGENT_PATTERNS)) {
      return {
        text: "That sounds like something worth getting looked at soon rather than waiting it out — I'd suggest booking a visit today if you can, or calling us to talk it through.",
        classification: "urgent",
        suggestBooking: true,
        followUps: bookingFollowUps,
      };
    }
    if (matchesAny(text, SELF_CARE_PATTERNS)) {
      return {
        text: "That sounds manageable on its own for now — rest, fluids, and keeping an eye on it is reasonable. If it isn't improving in a few days, or gets worse, it's worth booking a visit.",
        classification: "self-care",
        suggestBooking: false,
        followUps: ["When should I actually be worried?", "How do I book an appointment?"],
      };
    }
    return {
      text: "Thanks for sharing that. I can't tell you what's causing it — that genuinely needs a doctor's assessment, not a guess from me — but it's the kind of thing worth booking a routine visit for so it gets a proper look.",
      classification: "routine",
      suggestBooking: true,
      followUps: ["What should I bring to my visit?", ...bookingFollowUps.slice(0, 1)],
    };
  }

  return {
    text: "I'm not confident I understood that correctly, and I'd rather be upfront about it than guess. You can message us directly on WhatsApp, or try asking in a different way — I can help with hours, booking, services, and general symptom guidance.",
    suggestBooking: false,
    followUps: suggestedQuestions.slice(0, 3),
  };
}

export const disclaimerText =
  "This assistant gives general information only — it never diagnoses conditions, never prescribes or recommends medication, and doesn't replace a real consultation with " +
  (doctors[0]?.name ?? "our physician") +
  ". It classifies how soon something is worth being seen for (Emergency, Urgent, Routine, or Self-care) — that's guidance, not a clinical judgment. In an emergency, call " +
  siteConfig.emergency.number +
  " or go to your nearest emergency department immediately, rather than waiting for a reply here. Conversations aren't stored — closing or refreshing this page clears them.";

export function bookingUrl(context: string) {
  return whatsapp.href(`Hi Westridge Medical Healthcare, following up from the AI Health Assistant: ${context}`);
}
