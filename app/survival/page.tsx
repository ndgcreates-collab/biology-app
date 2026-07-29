"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { useSurvivalStore } from "@/lib/store/useSurvivalStore";
import { AvatarBadge } from "@/components/survival/AvatarBadge";
import { survivalLevels } from "@/content/survival";
import { isLevelUnlocked } from "@/lib/survival/progress";

const achievementLabel: Record<number, string> = {
  1: "Achievement Level 1",
  2: "Achievement Level 2",
  3: "Achievement Level 3",
  4: "Achievement Level 4",
  5: "Achievement Level 5 · Mastery",
};

export default function SurvivalPage() {
  const avatar = useSurvivalStore((s) => s.avatar);
  const outcomes = useSurvivalStore((s) => s.levelOutcomes);

  if (!avatar) {
    return (
      <PageContainer>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-4xl">🌲🎮</p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Ecosystem Survival</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
            Create a survivor and drop into a forest where deforestation is unfolding. Answer
            scenario challenges to stay alive and climb the Florida Biology EOC achievement levels —
            from basic recognition all the way to mastery.
          </p>
          <Link
            href="/survival/avatar"
            className="mt-4 inline-flex rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Create your survivor →
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Ecosystem Survival</h1>
        <Link href="/survival/avatar" className="text-sm text-emerald-700 hover:underline">
          Edit survivor
        </Link>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
        <AvatarBadge avatar={avatar} size="md" />
      </div>

      <div className="mt-6 space-y-3">
        {survivalLevels.map((level) => {
          const unlocked = isLevelUnlocked(level.order, outcomes);
          const outcome = outcomes[level.id];
          const survived = outcome?.survived;

          const body = (
            <div
              className={`flex items-center gap-4 rounded-xl border p-4 ${
                unlocked ? "border-gray-200 bg-white" : "border-gray-200 bg-gray-50 opacity-60"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-2xl">
                {unlocked ? level.emoji : "🔒"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Level {level.order}
                  </span>
                  <span className="text-xs text-gray-400">· {achievementLabel[level.achievementLevel]}</span>
                  <span className="text-xs text-gray-400">
                    · {level.mechanic === "hearts" ? "❤️ hearts" : "🩸 health"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900">{level.title}</h3>
                <p className="truncate text-sm text-gray-600">{level.setting}</p>
              </div>
              <div className="shrink-0 text-right">
                {survived ? (
                  <span className="text-sm font-semibold text-emerald-700">
                    ✓ Survived
                    <br />
                    <span className="text-xs font-normal text-gray-500">
                      {outcome.bestScore}/{outcome.total}
                    </span>
                  </span>
                ) : unlocked ? (
                  <span className="text-sm font-medium text-emerald-700">Play →</span>
                ) : (
                  <span className="text-xs text-gray-400">Locked</span>
                )}
              </div>
            </div>
          );

          return unlocked ? (
            <Link key={level.id} href={`/survival/${level.id}`}>
              {body}
            </Link>
          ) : (
            <div key={level.id}>{body}</div>
          );
        })}
      </div>
    </PageContainer>
  );
}
