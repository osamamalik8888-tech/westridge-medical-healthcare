"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import {
  calculateBmi,
  bmiCategory,
  calculateIdealWeightKg,
  calculateBmr,
  calculateTdee,
  classifyBloodPressure,
  activityLevels,
  type Sex,
  type ActivityKey,
} from "@/lib/health-calculators";

/* ---------------------------------------------------------------------- */
/* Shared bits                                                             */
/* ---------------------------------------------------------------------- */

function Field({
  label,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  suffix?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-navy-700 dark:text-white/75">{label}</span>
      <span className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-line bg-white px-3.5 pr-12 text-[0.9375rem] text-navy-900 focus:border-navy-400 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/40"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-navy-400 dark:text-white/50">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

function ResultCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-mist p-5 dark:border-white/10 dark:bg-white/5">
      {children}
    </div>
  );
}

const disclaimer =
  "A general estimate, not a diagnosis. Talk to Dr. Ahmed about what it means for you.";

function num(v: string) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

function SexToggle({ value, onChange }: { value: Sex; onChange: (v: Sex) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-navy-700 dark:text-white/75">Sex</span>
      <div className="flex h-11 overflow-hidden rounded-xl border border-line dark:border-white/15">
        {(["male", "female"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "flex-1 text-sm font-medium capitalize transition-colors",
              value === option
                ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900"
                : "bg-white text-navy-600 hover:bg-navy-50 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </label>
  );
}

/* ---------------------------------------------------------------------- */
/* BMI                                                                     */
/* ---------------------------------------------------------------------- */

function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const h = num(height);
  const w = num(weight);
  const bmi = h && w && h > 0 ? calculateBmi(h, w) : null;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Height" suffix="cm" value={height} onChange={setHeight} placeholder="170" />
        <Field label="Weight" suffix="kg" value={weight} onChange={setWeight} placeholder="70" />
      </div>
      {bmi !== null && (
        <ResultCard>
          <p className="text-sm text-navy-500 dark:text-white/55">Your BMI</p>
          <p className="mt-1 font-serif text-3xl text-navy-950 dark:text-white">
            {bmi.toFixed(1)}{" "}
            <span className="text-lg font-sans font-medium text-red-600 dark:text-red-300">
              {bmiCategory(bmi)}
            </span>
          </p>
          <p className="mt-3 text-xs text-navy-400 dark:text-white/50">{disclaimer}</p>
        </ResultCard>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Ideal weight (Devine formula)                                           */
/* ---------------------------------------------------------------------- */

function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const h = num(height);
  const ideal = h && h > 0 ? calculateIdealWeightKg(h, sex) : null;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Height" suffix="cm" value={height} onChange={setHeight} placeholder="170" />
        <SexToggle value={sex} onChange={setSex} />
      </div>
      {ideal !== null && (
        <ResultCard>
          <p className="text-sm text-navy-500 dark:text-white/55">Estimated ideal weight (Devine formula)</p>
          <p className="mt-1 font-serif text-3xl text-navy-950 dark:text-white">{ideal.toFixed(1)} kg</p>
          <p className="mt-3 text-xs text-navy-400 dark:text-white/50">
            One of several standard formulas — healthy weight is a range, not one number. {disclaimer}
          </p>
        </ResultCard>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Calorie needs (Mifflin-St Jeor)                                         */
/* ---------------------------------------------------------------------- */

function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [activity, setActivity] = useState<ActivityKey>("sedentary");

  const a = num(age);
  const h = num(height);
  const w = num(weight);

  const bmr = a && h && w ? calculateBmr(h, w, a, sex) : null;
  const tdee = bmr !== null ? calculateTdee(bmr, activity) : null;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Age" suffix="years" value={age} onChange={setAge} placeholder="30" />
        <SexToggle value={sex} onChange={setSex} />
        <Field label="Height" suffix="cm" value={height} onChange={setHeight} placeholder="170" />
        <Field label="Weight" suffix="kg" value={weight} onChange={setWeight} placeholder="70" />
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-navy-700 dark:text-white/75">Activity level</span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as ActivityKey)}
            className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[0.9375rem] text-navy-900 focus:border-navy-400 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/40"
          >
            {activityLevels.map((level) => (
              <option key={level.key} value={level.key}>
                {level.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {tdee !== null && bmr !== null && (
        <ResultCard>
          <p className="text-sm text-navy-500 dark:text-white/55">Estimated daily calories to maintain weight</p>
          <p className="mt-1 font-serif text-3xl text-navy-950 dark:text-white">{Math.round(tdee)} kcal/day</p>
          <p className="mt-1 text-sm text-navy-500 dark:text-white/55">Base metabolic rate: {Math.round(bmr)} kcal/day</p>
          <p className="mt-3 text-xs text-navy-400 dark:text-white/50">{disclaimer}</p>
        </ResultCard>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Blood pressure category (AHA thresholds)                                */
/* ---------------------------------------------------------------------- */

function BloodPressureChecker() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const s = num(systolic);
  const d = num(diastolic);
  const result = s && d ? classifyBloodPressure(s, d) : null;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Systolic (top number)" suffix="mmHg" value={systolic} onChange={setSystolic} placeholder="120" />
        <Field label="Diastolic (bottom number)" suffix="mmHg" value={diastolic} onChange={setDiastolic} placeholder="80" />
      </div>
      {result && (
        <ResultCard>
          {result.urgent ? (
            <div className="rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
              <p className="font-serif text-2xl text-red-700 dark:text-red-300">{result.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-700 dark:text-white/75">
                This range needs medical attention now. Call {siteConfig.emergency.number}{" "}
                (Rescue) or go to your nearest emergency department — don&rsquo;t wait for a
                clinic appointment.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-navy-500 dark:text-white/55">Category (AHA guidelines)</p>
              <p className="mt-1 font-serif text-3xl text-navy-950 dark:text-white">{result.label}</p>
              <p className="mt-3 text-xs text-navy-400 dark:text-white/50">
                Based on a single reading — blood pressure varies through the day. {disclaimer}
              </p>
            </>
          )}
        </ResultCard>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Tabbed container                                                        */
/* ---------------------------------------------------------------------- */

const tabs = [
  { key: "bmi", label: "BMI", component: BmiCalculator },
  { key: "ideal-weight", label: "Ideal Weight", component: IdealWeightCalculator },
  { key: "calories", label: "Calories", component: CalorieCalculator },
  { key: "blood-pressure", label: "Blood Pressure", component: BloodPressureChecker },
] as const;

export function HealthCalculators() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("bmi");
  const ActiveComponent = tabs.find((t) => t.key === active)!.component;

  return (
    <div className="rounded-[1.75rem] border border-line bg-white p-6 dark:border-white/10 dark:bg-navy-900 sm:p-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Health calculators">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === tab.key
                ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900"
                : "bg-navy-50 text-navy-600 hover:bg-navy-100 dark:bg-white/5 dark:text-white/65 dark:hover:bg-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-7">
        <ActiveComponent />
      </div>
    </div>
  );
}
