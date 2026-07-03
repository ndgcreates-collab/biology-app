import { BigIdea } from "@/content/schema";

// Tailwind needs literal class names to appear in source for its scanner to
// pick them up, so we map themes to full class strings instead of building
// them dynamically (e.g. `bg-${color}-100`).
export const bigIdeaTheme: Record<BigIdea["colorTheme"], { bg: string; text: string; ring: string; solid: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    ring: "ring-emerald-300",
    solid: "bg-emerald-600",
  },
  sky: {
    bg: "bg-sky-50",
    text: "text-sky-800",
    ring: "ring-sky-300",
    solid: "bg-sky-600",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    ring: "ring-amber-300",
    solid: "bg-amber-600",
  },
};
