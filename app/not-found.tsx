import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/shared/coming-soon";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist or has moved. Find your way back to Westridge Medical Healthcare.",
};

export default function NotFound() {
  return (
    <ComingSoonPage
      eyebrow="404"
      title="This page took a wrong turn."
      description="The page you're looking for doesn't exist, or has moved. Head back to the homepage, or reach us directly below."
      contactPrompt="Looking for something specific? Reach us directly:"
    />
  );
}
