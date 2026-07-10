export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  body: string[]; // paragraphs
}

/**
 * Deliberately clinic-voice, operational content only — introducing the
 * building, the hours, the pharmacy. Nothing here is written as medical
 * advice or attributed to Dr. Ahmed; a doctor's-column style post is easy
 * to add later once there's an actual draft from him to publish, but
 * writing "his" health advice for him isn't something to do on his behalf.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "complete-healthcare-under-one-roof",
    title: "Complete Healthcare Under One Roof",
    excerpt:
      "Why we built Westridge around one idea: a doctor, a lab, and a pharmacy, in the same building.",
    date: "2026-06-01",
    readingMinutes: 3,
    body: [
      "Most clinic visits don't end at the clinic. You see a doctor, get sent for tests at a lab across town, then wait in line at a pharmacy for whatever's been prescribed. Three stops, three waits, and three places for something to get lost in between.",
      "Westridge Medical Healthcare was built to close that gap. Dr. Khalid Ahmed's consultation room, the diagnostic laboratory, and Westridge Plus Pharmacy all sit in the same building on Main GT Road. A blood test ordered during your consultation can be drawn the same visit. A prescription can be filled on your way out, not on your way home from somewhere else.",
      "That's the whole idea behind \"Complete Healthcare Under One Roof\" — it's not a slogan first, it's a floor plan first. The slogan just describes what the building already does.",
      "It also means the building has two different rhythms. The doctor sees patients in two sessions — mornings and evenings — while Westridge Plus Pharmacy stays open around the clock, because a prescription doesn't always wait for office hours.",
    ],
  },
  {
    slug: "our-hours-explained",
    title: "Our Hours, Explained",
    excerpt:
      "Two OPD sessions a day and a 24/7 pharmacy — here's why the clinic and the pharmacy run on different clocks.",
    date: "2026-06-15",
    readingMinutes: 2,
    body: [
      "If you've looked at our hours and wondered why the doctor and the pharmacy don't seem to follow the same schedule, here's the short version: they're built for two different kinds of need.",
      "Dr. Khalid Ahmed holds two OPD sessions a day, seven days a week — 10:00 AM to 3:00 PM, and 6:00 PM to midnight. That split covers a morning slot before work or school, and an evening slot after, without asking anyone to take half a day off for a routine visit.",
      "Westridge Plus Pharmacy doesn't follow that schedule at all — it's open 24 hours. A prescription that needs filling at 2 AM doesn't care what time the consultation room closes, so the pharmacy simply doesn't close.",
      "If you're not sure whether the doctor is in right now, the status indicator in the site header shows it live. The pharmacy, as a rule, is always the answer to \"is Westridge open.\"",
    ],
  },
  {
    slug: "inside-westridge-plus-pharmacy",
    title: "What's Inside Westridge Plus Pharmacy",
    excerpt:
      "A quick look at what the in-house and outpatient pharmacy counter actually carries.",
    date: "2026-06-28",
    readingMinutes: 2,
    body: [
      "Westridge Plus Pharmacy shares a building with the clinic, but it's open to anyone — you don't need to see the doctor first to use it.",
      "The counter carries genuine branded and generic medicines, over-the-counter essentials, and everyday wellness and personal care items. Prescriptions written next door in the consultation room are filled on the spot; prescriptions from anywhere else are just as welcome.",
      "Because it runs 24/7, it's also where a lot of people end up outside normal clinic hours — picking up something for a child's fever at night, or restocking a first-aid kit on a Sunday.",
      "If you're ever unsure whether something's in stock, a quick message on WhatsApp before you head over will get you a straight answer.",
    ],
  },
  {
    slug: "how-appointment-booking-works",
    title: "How Appointment Booking Works Here",
    excerpt:
      "No account to create, no app to download — just WhatsApp. Here's what actually happens after you send that message.",
    date: "2026-07-05",
    readingMinutes: 2,
    body: [
      "The booking form on this site doesn't send anything anywhere by itself — it builds a WhatsApp message with your name, preferred doctor, date, time, and visit type already filled in, and hands it to you to review before you send it.",
      "That's deliberate. Nothing goes to Westridge until you've actually pressed send on WhatsApp, so there's no risk of a half-finished form submitting itself or a request going out with the wrong details.",
      "Once it's sent, a real person on the other end confirms the actual time back to you on WhatsApp — the form gets you most of the way there, but the final confirmation is always a human reading your message, not an automated system deciding for you.",
      "If WhatsApp isn't convenient, the same information works just as well over a phone call. Nothing on this site requires you to use one channel over the other.",
    ],
  },
  {
    slug: "what-to-bring-to-your-first-visit",
    title: "What to Bring to Your First Visit",
    excerpt:
      "Nothing complicated — a handful of things make the first consultation faster if you have them on hand.",
    date: "2026-07-08",
    readingMinutes: 2,
    body: [
      "A first visit doesn't require much preparation, but a few things on hand make the consultation more useful for both you and Dr. Ahmed.",
      "Bring any previous test results, prescriptions, or medical reports relevant to why you're coming in — even old ones. A pattern over time is often more useful than a single reading.",
      "If you're currently taking any medication, bring the boxes or a written list of names and doses, rather than trying to recall them from memory.",
      "Beyond that: come as you are. Walk-ins are genuinely welcome during OPD hours, and if a test is needed, the lab is down the hall rather than a separate appointment somewhere else.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
