import { describe, it, expect } from "vitest";
import {
  calculateBmi,
  bmiCategory,
  calculateIdealWeightKg,
  calculateBmr,
  calculateTdee,
  classifyBloodPressure,
} from "./health-calculators";

describe("calculateBmi", () => {
  it("computes BMI from height (cm) and weight (kg)", () => {
    expect(calculateBmi(170, 70)).toBeCloseTo(24.22, 2);
  });
});

describe("bmiCategory", () => {
  it("classifies underweight below 18.5", () => {
    expect(bmiCategory(18.4)).toBe("Underweight");
  });
  it("classifies the 18.5 boundary as normal range", () => {
    expect(bmiCategory(18.5)).toBe("Normal range");
  });
  it("classifies just under 25 as normal range", () => {
    expect(bmiCategory(24.9)).toBe("Normal range");
  });
  it("classifies the 25 boundary as overweight", () => {
    expect(bmiCategory(25)).toBe("Overweight");
  });
  it("classifies just under 30 as overweight", () => {
    expect(bmiCategory(29.9)).toBe("Overweight");
  });
  it("classifies the 30 boundary as obese", () => {
    expect(bmiCategory(30)).toBe("Obese");
  });
});

describe("calculateIdealWeightKg (Devine formula)", () => {
  it("gives exactly 50kg for a man at exactly 5 feet (the formula's defining anchor point)", () => {
    expect(calculateIdealWeightKg(152.4, "male")).toBeCloseTo(50, 1);
  });
  it("gives exactly 45.5kg for a woman at exactly 5 feet", () => {
    expect(calculateIdealWeightKg(152.4, "female")).toBeCloseTo(45.5, 1);
  });
  it("never goes below the base weight for someone under 5 feet", () => {
    expect(calculateIdealWeightKg(140, "male")).toBeCloseTo(50, 1);
  });
});

describe("calculateBmr + calculateTdee (Mifflin-St Jeor)", () => {
  it("computes BMR for a known case", () => {
    expect(calculateBmr(170, 70, 30, "male")).toBeCloseTo(1617.5, 1);
  });
  it("applies the sedentary activity factor (1.2x) correctly", () => {
    const bmr = calculateBmr(170, 70, 30, "male");
    expect(calculateTdee(bmr, "sedentary")).toBeCloseTo(bmr * 1.2, 1);
  });
  it("applies the very-active activity factor (1.9x) correctly", () => {
    const bmr = calculateBmr(170, 70, 30, "male");
    expect(calculateTdee(bmr, "very active")).toBeCloseTo(bmr * 1.9, 1);
  });
});

describe("classifyBloodPressure (AHA thresholds)", () => {
  it("classifies 119/79 as Normal", () => {
    expect(classifyBloodPressure(119, 79)).toEqual({ label: "Normal", urgent: false });
  });
  it("classifies 120/79 as Elevated (systolic boundary)", () => {
    expect(classifyBloodPressure(120, 79)).toEqual({ label: "Elevated", urgent: false });
  });
  it("classifies 125/85 as Stage 1 (diastolic alone can trigger it)", () => {
    expect(classifyBloodPressure(125, 85)).toEqual({
      label: "High Blood Pressure — Stage 1",
      urgent: false,
    });
  });
  it("classifies 145/95 as Stage 2", () => {
    expect(classifyBloodPressure(145, 95)).toEqual({
      label: "High Blood Pressure — Stage 2",
      urgent: false,
    });
  });
  it("classifies 185/90 as a Hypertensive Crisis via systolic alone", () => {
    const result = classifyBloodPressure(185, 90);
    expect(result.label).toBe("Hypertensive Crisis");
    expect(result.urgent).toBe(true);
  });
  it("classifies 120/125 as a Hypertensive Crisis via diastolic alone", () => {
    const result = classifyBloodPressure(120, 125);
    expect(result.label).toBe("Hypertensive Crisis");
    expect(result.urgent).toBe(true);
  });
});
