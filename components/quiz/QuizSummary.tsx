import Link from "next/link";
import { QUIZ_COMPLETION_BONUS } from "@/content/schema";

export function QuizSummary({
  score,
  total,
  pointsEarned,
  newBadgeNames,
}: {
  score: number;
  total: number;
  pointsEarned: number;
  newBadgeNames: string[];
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
      <p className="text-sm font-medium text-gray-500">Quiz complete</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">
        {score} / {total} correct
      </p>
      <p className="mt-2 text-emerald-700 font-semibold">
        +{pointsEarned} points earned (includes +{QUIZ_COMPLETION_BONUS} completion bonus)
      </p>

      {newBadgeNames.length > 0 && (
        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
          🏅 New badge{newBadgeNames.length > 1 ? "s" : ""} earned: {newBadgeNames.join(", ")}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/quiz"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to quizzes
        </Link>
        <Link
          href="/rewards"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Redeem points →
        </Link>
      </div>
    </div>
  );
}
