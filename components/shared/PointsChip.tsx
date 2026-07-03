"use client";

import { useProgressStore } from "@/lib/store/useProgressStore";

export function PointsChip() {
  const spendablePoints = useProgressStore((s) => s.spendablePoints);
  const streak = useProgressStore((s) => s.streak.currentDays);

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
        ⭐ {spendablePoints} pts
      </span>
      {streak > 0 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-orange-800">
          🔥 {streak} day{streak === 1 ? "" : "s"}
        </span>
      )}
    </div>
  );
}
