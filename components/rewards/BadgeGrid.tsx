"use client";

import { badges } from "@/content/rewards/badges";
import { useProgressStore } from "@/lib/store/useProgressStore";

export function BadgeGrid() {
  const earnedBadgeIds = useProgressStore((s) => s.earnedBadgeIds);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {badges.map((badge) => {
        const earned = earnedBadgeIds.includes(badge.id);
        return (
          <div
            key={badge.id}
            className={`flex items-start gap-3 rounded-lg border p-4 ${
              earned ? "border-amber-300 bg-amber-50" : "border-gray-200 bg-gray-50 opacity-60"
            }`}
          >
            <div className="text-3xl">{badge.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-900">{badge.name}</h4>
              <p className="text-sm text-gray-600">{badge.description}</p>
              {!earned && <p className="mt-1 text-xs text-gray-400">Not yet earned</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
