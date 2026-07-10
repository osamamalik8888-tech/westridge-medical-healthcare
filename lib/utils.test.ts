import { describe, it, expect } from "vitest";
import { cn, to12Hour, formatHour12 } from "./utils";

describe("cn", () => {
  it("merges class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("resolves conflicting Tailwind utilities, keeping the last one", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
  it("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});

describe("to12Hour / formatHour12", () => {
  // This exact function is where a real bug shipped and was later found by
  // hand: the OPD "open now" status displayed the morning session's close
  // time as "15:00" instead of "3:00 PM". These cases exist so that
  // specific regression can never silently reappear.
  it("formats the afternoon session's close hour (15) as 3:00 PM, not 15:00", () => {
    expect(formatHour12(15)).toBe("3:00 PM");
  });
  it("formats midnight (24) as 12:00 AM", () => {
    expect(formatHour12(24)).toBe("12:00 AM");
  });
  it("formats true midnight (0) as 12:00 AM too", () => {
    expect(formatHour12(0)).toBe("12:00 AM");
  });
  it("formats a morning hour (10) correctly", () => {
    expect(formatHour12(10)).toBe("10:00 AM");
  });
  it("formats an evening hour (18) correctly", () => {
    expect(formatHour12(18)).toBe("6:00 PM");
  });
  it("formats noon (12) as 12:00 PM, not 0:00 PM", () => {
    expect(formatHour12(12)).toBe("12:00 PM");
  });

  it("to12Hour splits the hour and period consistently with formatHour12", () => {
    expect(to12Hour(15)).toEqual({ hour12: 3, period: "PM" });
    expect(to12Hour(0)).toEqual({ hour12: 12, period: "AM" });
  });
});
