"use client";

import { useProgressStore } from "@/lib/store/useProgressStore";

export function StreakDisplay() {
  const streak = useProgressStore((s) => s.streak);

  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <p className="text-xs font-medium text-gray-500">Current streak</p>
        <p className="text-2xl font-bold text-orange-600">🔥 {streak.currentDays}</p>
      </div>
      <div className="border-l border-gray-200 pl-4">
        <p className="text-xs font-medium text-gray-500">Longest streak</p>
        <p className="text-2xl font-bold text-gray-700">{streak.longestDays}</p>
      </div>
    </div>
  );
}
