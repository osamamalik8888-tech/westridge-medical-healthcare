import type { Metadata } from "next";
import { HealthCalculators } from "@/components/patient-resources/health-calculators";
import { SymptomChecker } from "@/components/patient-resources/symptom-checker";
import { Faq } from "@/components/shared/faq";
import { FaqStructuredData } from "@/components/shared/faq-structured-data";

export const metadata: Metadata = {
  title: "Patient Resources",
  description: "A symptom checker and free health calculators — BMI, ideal weight, daily calorie needs, and blood pressure category — from Westridge Medical Healthcare.",
  alternates: { canonical: "/patient-resources" },
};

export default function PatientResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Patient Resources
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Not sure what you need?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Start with the checker below to get a sense of how soon to come in,
          then use the calculators for a quick BMI, ideal weight, calorie, or
          blood pressure reading. Nothing typed here is sent anywhere —
          it&rsquo;s all calculated in your browser.
        </p>
      </div>

      <div className="mt-12">
        <SymptomChecker />
      </div>

      <div className="mt-16">
        <h2 className="font-serif text-2xl text-navy-900 dark:text-white">Health calculators</h2>
        <div className="mt-6">
          <HealthCalculators />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-serif text-2xl text-navy-900 dark:text-white">
          Frequently asked questions
        </h2>
        <div className="mt-6">
          <Faq />
        </div>
        <FaqStructuredData />
      </div>

      <p className="mt-10 text-sm text-navy-500 dark:text-white/55">
        Intake forms and test-preparation guides are being added here next.
      </p>
    </div>
  );
}
