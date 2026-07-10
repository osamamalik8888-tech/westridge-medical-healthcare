import { describe, it, expect } from "vitest";
import { getGuidance, durations, severities } from "./symptom-checker";

describe("getGuidance", () => {
  it("recommends booking today for any severe symptom, regardless of duration", () => {
    expect(getGuidance("Just started today", "severe").tier).toBe("Book today if you can");
  });

  it("recommends scheduling soon for moderate symptoms lasting about a week", () => {
    expect(getGuidance("About a week", "moderate").tier).toBe("Worth scheduling a visit soon");
  });

  it("recommends scheduling soon for moderate symptoms lasting longer than a week", () => {
    expect(getGuidance("Longer than a week", "moderate").tier).toBe(
      "Worth scheduling a visit soon"
    );
  });

  it("recommends getting checked for mild symptoms that have lasted over a week", () => {
    expect(getGuidance("Longer than a week", "mild").tier).toBe("Worth getting checked");
  });

  it("recommends watching and waiting for a new, mild symptom", () => {
    expect(getGuidance("Just started today", "mild").tier).toBe("Keep an eye on it");
  });

  it("never returns a result that names a specific medical condition", () => {
    // A loose but meaningful regression check: the whole point of this tool
    // is that it only ever talks about urgency, never a diagnosis.
    const allCombinations = durations.flatMap((duration) =>
      severities.map((s) => getGuidance(duration, s.key))
    );
    const suspiciousWords = ["flu", "infection", "virus", "disease", "diagnosis", "condition is"];
    for (const result of allCombinations) {
      const text = (result.tier + " " + result.detail).toLowerCase();
      for (const word of suspiciousWords) {
        expect(text).not.toContain(word);
      }
    }
  });
});
