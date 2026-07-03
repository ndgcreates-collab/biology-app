import { QuizQuestion } from "@/content/schema";

export function InstantFeedback({
  question,
  wasCorrect,
}: {
  question: QuizQuestion;
  wasCorrect: boolean;
}) {
  return (
    <div
      className={`mt-4 rounded-lg p-4 text-sm ring-1 ring-inset ${
        wasCorrect
          ? "bg-emerald-50 text-emerald-900 ring-emerald-200"
          : "bg-rose-50 text-rose-900 ring-rose-200"
      }`}
    >
      <p className="font-semibold">
        {wasCorrect ? `Correct! +${question.points} pts` : "Not quite."}
      </p>
      <p className="mt-1">{question.explanation}</p>
    </div>
  );
}
