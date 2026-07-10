import { describe, it, expect } from "vitest";
import { appointmentSchema } from "./appointment-schema";

const validAppointment = {
  name: "Ayesha Khan",
  doctorSlug: "khalid-ahmed",
  date: "2026-08-01",
  time: "10:00 AM",
  visitType: "New Patient Consultation",
  complaint: "Recurring headaches",
};

describe("appointmentSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = appointmentSchema.safeParse(validAppointment);
    expect(result.success).toBe(true);
  });

  it("accepts a valid submission with no complaint (optional field)", () => {
    const { complaint, ...withoutComplaint } = validAppointment;
    const result = appointmentSchema.safeParse(withoutComplaint);
    expect(result.success).toBe(true);
  });

  it("rejects a one-character name", () => {
    const result = appointmentSchema.safeParse({ ...validAppointment, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects a name that's only whitespace (trimmed before the length check)", () => {
    const result = appointmentSchema.safeParse({ ...validAppointment, name: "   " });
    expect(result.success).toBe(false);
  });

  it("trims the name before storing it", () => {
    const result = appointmentSchema.safeParse({ ...validAppointment, name: "  Ayesha Khan  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Ayesha Khan");
    }
  });

  it("rejects a missing date", () => {
    const result = appointmentSchema.safeParse({ ...validAppointment, date: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing time", () => {
    const result = appointmentSchema.safeParse({ ...validAppointment, time: "" });
    expect(result.success).toBe(false);
  });
});
