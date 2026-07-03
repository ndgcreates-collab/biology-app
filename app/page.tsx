"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { StreakDisplay } from "@/components/progress/StreakDisplay";
import { useProgressStore } from "@/lib/store/useProgressStore";
import { bigIdeas } from "@/content/bigIdeas";

export default function Home() {
  const touchStreak = useProgressStore((s) => s.touchStreak);
  const spendablePoints = useProgressStore((s) => s.spendablePoints);
  const quizHistoryCount = useProgressStore((s) => s.quizHistory.length);

  useEffect(() => {
    touchStreak();
  }, [touchStreak]);

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-gray-900">SC.912.L.17: Interdependence</h1>
      <p className="mt-2 text-gray-600">
        Review the benchmarks, take quizzes, and redeem the points you earn for badges and
        cosmetics.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StreakDisplay />
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium text-gray-500">Spendable points</p>
          <p className="text-2xl font-bold text-emerald-700">⭐ {spendablePoints}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/review"
          className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
        >
          <h3 className="font-bold text-gray-900">📖 Review</h3>
          <p className="mt-1 text-sm text-gray-600">
            Browse the {bigIdeas.length} big ideas of Interdependence.
          </p>
        </Link>
        <Link
          href="/quiz"
          className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
        >
          <h3 className="font-bold text-gray-900">
            📝 {quizHistoryCount > 0 ? "Keep quizzing" : "Take your first quiz"}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Answer questions and earn points instantly.
          </p>
        </Link>
        <Link
          href="/rewards"
          className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
        >
          <h3 className="font-bold text-gray-900">🎁 Rewards</h3>
          <p className="mt-1 text-sm text-gray-600">Redeem points for badges and cosmetics.</p>
        </Link>
      </div>
    </PageContainer>
  );
}
