"use client";

import Link from "next/link";
import { Benchmark } from "@/content/schema";
import { DraftBadge } from "@/components/shared/DraftBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { useProgressStore } from "@/lib/store/useProgressStore";

export function BenchmarkCard({ benchmark }: { benchmark: Benchmark }) {
  const mastery = useProgressStore((s) => s.benchmarkMastery[benchmark.id]);

  return (
    <Link
      href={`/review/${benchmark.bigIdeaId}/${benchmark.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-gray-900">{benchmark.title}</h4>
        <DraftBadge meta={benchmark.meta} />
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-gray-600">{benchmark.summary}</p>
      {mastery && mastery.attempts > 0 && (
        <div className="mt-3">
          <ProgressBar value={mastery.correct} max={mastery.attempts} />
          <p className="mt-1 text-xs text-gray-500 capitalize">{mastery.masteryLevel}</p>
        </div>
      )}
    </Link>
  );
}
