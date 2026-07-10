import { describe, it, expect } from "vitest";
import { getDemoReply } from "./ai-assistant";

describe("getDemoReply — emergency detection", () => {
  it("classifies chest pain as emergency and never suggests booking", () => {
    const r = getDemoReply("I have chest pain");
    expect(r.classification).toBe("emergency");
    expect(r.suggestBooking).toBe(false);
  });

  it("classifies breathing difficulty as emergency", () => {
    expect(getDemoReply("I can't breathe properly").classification).toBe("emergency");
  });

  it("classifies stroke signs as emergency", () => {
    expect(getDemoReply("my face is drooping on one side").classification).toBe("emergency");
  });

  it("classifies loss of consciousness as emergency", () => {
    expect(getDemoReply("I fainted and passed out").classification).toBe("emergency");
  });
});

describe("getDemoReply — crisis language gets a care-first response, not a generic one", () => {
  it("responds with encouragement to reach out, not just a classification label", () => {
    const r = getDemoReply("I want to kill myself");
    expect(r.classification).toBe("emergency");
    expect(r.suggestBooking).toBe(false);
    expect(r.text.toLowerCase()).toContain("reach out");
  });
});

describe("getDemoReply — headache regression (real bug, found by execution testing)", () => {
  // \bache\b never matched "headache" (no word boundary between "head"
  // and "ache" — it's one continuous word), so every headache-related
  // message silently fell through to the generic fallback instead of
  // being classified at all. These four cases exist so it can't happen
  // again without a test failing immediately.
  it("classifies a severe headache as urgent", () => {
    expect(getDemoReply("severe headache that won't go away").classification).toBe("urgent");
  });
  it("classifies a minor headache as self-care", () => {
    expect(getDemoReply("minor headache today").classification).toBe("self-care");
  });
  it("recognizes stomachache as a symptom", () => {
    expect(getDemoReply("I have a stomachache").classification).toBeDefined();
  });
  it("recognizes a slight toothache as self-care", () => {
    expect(getDemoReply("slight toothache").classification).toBe("self-care");
  });
});

describe("getDemoReply — routine and self-care tiers", () => {
  it("classifies an unqualified symptom as routine and suggests booking", () => {
    const r = getDemoReply("I have a cough");
    expect(r.classification).toBe("routine");
    expect(r.suggestBooking).toBe(true);
  });
  it("classifies a mild symptom as self-care and does not suggest booking", () => {
    const r = getDemoReply("I have a slight cold");
    expect(r.classification).toBe("self-care");
    expect(r.suggestBooking).toBe(false);
  });
});

describe("getDemoReply — FAQ matching gives real answers, no classification needed", () => {
  it("answers a booking question without an urgency classification", () => {
    const r = getDemoReply("how do I book an appointment");
    expect(r.classification).toBeUndefined();
    expect(r.text.length).toBeGreaterThan(0);
  });
  it("answers an hours question", () => {
    const r = getDemoReply("what are your hours");
    expect(r.text.toLowerCase()).toMatch(/am|pm|hour/);
  });
});

describe("getDemoReply — safe fallback for anything unrecognized", () => {
  it("never invents an answer to something it doesn't understand", () => {
    const r = getDemoReply("blah random nonsense xyz123");
    expect(r.classification).toBeUndefined();
    expect(r.text.toLowerCase()).toContain("not confident");
  });
});

describe("getDemoReply — substring false-positive regression", () => {
  // A short, unbounded keyword ("fee") matched inside "feel", silently
  // hijacking "I don't feel well" into the pricing FAQ answer instead of
  // asking a clarifying question. Found by actually running the code
  // against real phrases, not by reading the regex and assuming it was
  // scoped correctly.
  it('"I don\'t feel well" is treated as vague, not as a pricing question', () => {
    const r = getDemoReply("I don't feel well");
    expect(r.text.toLowerCase()).not.toContain("pricing");
    expect(r.text).toContain("?");
  });
  it('"I feel great today" does not trigger the pricing FAQ', () => {
    expect(getDemoReply("I feel great today").text.toLowerCase()).not.toContain("pricing");
  });
  it('"latest news" does not trigger the lab FAQ ("test" inside "latest")', () => {
    expect(getDemoReply("what's the latest news").text.toLowerCase()).not.toContain(
      "sample collection"
    );
  });
  it('"label" does not trigger the lab FAQ ("lab" inside "label")', () => {
    expect(getDemoReply("is there a label on it").text.toLowerCase()).not.toContain(
      "sample collection"
    );
  });
});

describe("getDemoReply — inflected symptom forms", () => {
  // \bmigraine\b never matched "migraines" (no boundary before the
  // plural "s"), and \bdiarrh\b never matched "diarrhea" (the pattern
  // was a prefix, not a real word) — both silently fell through to the
  // generic fallback instead of being recognized as symptoms at all.
  it("recognizes the plural form of a symptom word", () => {
    expect(getDemoReply("I get migraines often").classification).toBeDefined();
  });
  it("recognizes diarrhea (the full word, not a truncated stem)", () => {
    expect(getDemoReply("I have diarrhea").classification).toBeDefined();
  });
  it('recognizes "vomiting" (the -ing form, not just "vomit")', () => {
    expect(getDemoReply("I've been vomiting").classification).toBeDefined();
  });
  it('recognizes "coughing" (the -ing form, not just "cough")', () => {
    expect(getDemoReply("coughing all night").classification).toBeDefined();
  });
});
