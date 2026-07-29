// Literal class strings so Tailwind's scanner keeps them.
export const avatarColors: Record<string, { bg: string; ring: string; text: string; chip: string }> = {
  emerald: { bg: "bg-emerald-100", ring: "ring-emerald-400", text: "text-emerald-800", chip: "bg-emerald-500" },
  sky: { bg: "bg-sky-100", ring: "ring-sky-400", text: "text-sky-800", chip: "bg-sky-500" },
  amber: { bg: "bg-amber-100", ring: "ring-amber-400", text: "text-amber-800", chip: "bg-amber-500" },
  rose: { bg: "bg-rose-100", ring: "ring-rose-400", text: "text-rose-800", chip: "bg-rose-500" },
  violet: { bg: "bg-violet-100", ring: "ring-violet-400", text: "text-violet-800", chip: "bg-violet-500" },
  orange: { bg: "bg-orange-100", ring: "ring-orange-400", text: "text-orange-800", chip: "bg-orange-500" },
};

export const avatarColorOptions = Object.keys(avatarColors);

export const characterOptions = ["🧑‍🔬", "👩‍🌾", "🧗", "🕵️", "🧑‍🚀", "🦸", "🧙", "🏕️"];
