"use client";

import { Avatar, useSurvivalStore } from "@/lib/store/useSurvivalStore";
import { avatarColors } from "./avatarTheme";
import { survivalLevels } from "@/content/survival";

export function AvatarBadge({ avatar, size = "md" }: { avatar: Avatar; size?: "sm" | "md" | "lg" }) {
  const unlocked = useSurvivalStore((s) => s.unlockedAccessories);
  const theme = avatarColors[avatar.color] ?? avatarColors.emerald;

  const dim = size === "lg" ? "h-24 w-24 text-5xl" : size === "sm" ? "h-10 w-10 text-xl" : "h-16 w-16 text-3xl";

  // Accessories awarded for surviving levels.
  const accessories = survivalLevels
    .map((l) => l.rewardAccessory)
    .filter((a) => unlocked.includes(a.id));

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex ${dim} items-center justify-center rounded-full ${theme.bg} ring-4 ${theme.ring}`}
      >
        <span>{avatar.emoji}</span>
      </div>
      <div>
        <p className={`font-bold ${theme.text}`}>{avatar.name}</p>
        {accessories.length > 0 && (
          <p className="text-sm" title={accessories.map((a) => a.name).join(", ")}>
            {accessories.map((a) => (
              <span key={a.id}>{a.icon}</span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
