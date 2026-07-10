/**
 * Pure calculation functions, deliberately separated from
 * components/patient-resources/health-calculators.tsx (which handles only
 * form state and rendering). Kept here so they're unit-testable without
 * rendering React — see health-calculators.test.ts.
 */

export function calculateBmi(heightCm: number, weightKg: number): number {
  return weightKg / (heightCm / 100) ** 2;
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export type Sex = "male" | "female";

/** Devine formula. One of several standard estimates, not a target. */
export function calculateIdealWeightKg(heightCm: number, sex: Sex): number {
  const totalInches = heightCm / 2.54;
  const inchesOver5ft = Math.max(0, totalInches - 60);
  return (sex === "male" ? 50 : 45.5) + 2.3 * inchesOver5ft;
}

export const activityLevels = [
  { key: "sedentary", label: "Sedentary (little to no exercise)", factor: 1.2 },
  { key: "light", label: "Light exercise (1–3 days/week)", factor: 1.375 },
  { key: "moderate", label: "Moderate exercise (3–5 days/week)", factor: 1.55 },
  { key: "active", label: "Active (6–7 days/week)", factor: 1.725 },
  { key: "very active", label: "Very active (physical job or 2x/day training)", factor: 1.9 },
] as const;

export type ActivityKey = (typeof activityLevels)[number]["key"];

/** Mifflin-St Jeor equation. */
export function calculateBmr(heightCm: number, weightKg: number, age: number, sex: Sex): number {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
}

export function calculateTdee(bmr: number, activityKey: ActivityKey): number {
  const level = activityLevels.find((l) => l.key === activityKey);
  return bmr * (level?.factor ?? 1);
}

export interface BloodPressureResult {
  label: string;
  urgent: boolean;
}

/** AHA blood pressure categories. Order matters — checked highest severity first. */
export function classifyBloodPressure(systolic: number, diastolic: number): BloodPressureResult {
  if (systolic > 180 || diastolic > 120) return { label: "Hypertensive Crisis", urgent: true };
  if (systolic >= 140 || diastolic >= 90)
    return { label: "High Blood Pressure — Stage 2", urgent: false };
  if (systolic >= 130 || diastolic >= 80)
    return { label: "High Blood Pressure — Stage 1", urgent: false };
  if (systolic >= 120 && diastolic < 80) return { label: "Elevated", urgent: false };
  return { label: "Normal", urgent: false };
}
