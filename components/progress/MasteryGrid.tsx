"use client";

import { benchmarks } from "@/content/benchmarks";
import { useProgressStore } from "@/lib/store/useProgressStore";
import { ProgressBar } from "@/components/shared/ProgressBar";

const levelColor: Record<string, string> = {
  "not-started": "bg-gray-300",
  practicing: "bg-amber-500",
  proficient: "bg-sky-500",
  mastered: "bg-emerald-500",
};

export function MasteryGrid() {
  const mastery = useProgressStore((s) => s.benchmarkMastery);

  return (
    <div className="space-y-3">
      {benchmarks.map((benchmark) => {
        const m = mastery[benchmark.id];
        const level = m?.masteryLevel ?? "not-started";
        return (
          <div key={benchmark.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">{benchmark.title}</h4>
              <span className="text-xs font-medium capitalize text-gray-500">{level}</span>
            </div>
            <div className="mt-2">
              <ProgressBar value={m?.correct ?? 0} max={(m?.attempts ?? 0) || 1} colorClassName={levelColor[level]} />
            </div>
            {m && (
              <p className="mt-1 text-xs text-gray-500">
                {m.correct}/{m.attempts} correct
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
