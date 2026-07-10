import { describe, it, expect } from "vitest";
import { applicationSchema, positions } from "./careers-schema";

const validApplication = {
  name: "Bilal Ahmad",
  phone: "0300 1234567",
  email: "bilal@example.com",
  position: "Pharmacist" as const,
  experience: "3 years at a retail pharmacy chain",
  message: "",
};

describe("applicationSchema", () => {
  it("accepts a fully valid application", () => {
    expect(applicationSchema.safeParse(validApplication).success).toBe(true);
  });

  it("accepts every position in the real position list", () => {
    for (const position of positions) {
      const result = applicationSchema.safeParse({ ...validApplication, position });
      expect(result.success).toBe(true);
    }
  });

  it("rejects a position outside the fixed list", () => {
    const result = applicationSchema.safeParse({ ...validApplication, position: "CEO" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = applicationSchema.safeParse({ ...validApplication, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("accepts an email with surrounding whitespace and trims it", () => {
    const result = applicationSchema.safeParse({
      ...validApplication,
      email: "  bilal@example.com  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("bilal@example.com");
    }
  });

  it("rejects a phone number that's too short to be real", () => {
    const result = applicationSchema.safeParse({ ...validApplication, phone: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing experience field", () => {
    const result = applicationSchema.safeParse({ ...validApplication, experience: "" });
    expect(result.success).toBe(false);
  });

  it("treats the message field as genuinely optional", () => {
    const { message, ...withoutMessage } = validApplication;
    expect(applicationSchema.safeParse(withoutMessage).success).toBe(true);
  });
});
