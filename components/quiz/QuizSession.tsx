"use client";

import { useId, useMemo, useState } from "react";
import { QuizQuestion } from "@/content/schema";
import { QuestionCard } from "./QuestionCard";
import { InstantFeedback } from "./InstantFeedback";
import { QuizSummary } from "./QuizSummary";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { useProgressStore } from "@/lib/store/useProgressStore";
import { useGameStore } from "@/lib/store/useGameStore";
import { submitResult } from "@/lib/supabase/games";
import { badges } from "@/content/rewards/badges";

export function QuizSession({ topicId, questions }: { topicId: string; questions: QuizQuestion[] }) {
  const reactId = useId();
  const quizId = `quiz-${topicId}-${reactId}`;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<
    { questionId: string; benchmarkId: string; correct: boolean; pointsAwarded: number }[]
  >([]);
  const [finished, setFinished] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [newBadgeNames, setNewBadgeNames] = useState<string[]>([]);
  const [gameSubmit, setGameSubmit] = useState<"none" | "sending" | "sent" | "error">("none");

  const recordQuizResult = useProgressStore((s) => s.recordQuizResult);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const wasCorrect = useMemo(
    () => submitted && selectedIndex === currentQuestion?.correctIndex,
    [submitted, selectedIndex, currentQuestion]
  );

  if (questions.length === 0) {
    return <p className="text-sm text-gray-500">No questions are available for this quiz yet.</p>;
  }

  function handleSelect(index: number) {
    if (submitted) return;
    setSelectedIndex(index);
  }

  function handleSubmit() {
    if (selectedIndex === null) return;
    const correct = selectedIndex === currentQuestion.correctIndex;
    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        benchmarkId: currentQuestion.benchmarkId,
        correct,
        pointsAwarded: currentQuestion.points,
      },
    ]);
    setSubmitted(true);
  }

  function handleNext() {
    if (isLastQuestion) {
      const finalResults = results;
      const benchmarkIds = Array.from(new Set(finalResults.map((r) => r.benchmarkId)));
      const earnedBadgesBefore = useProgressStore.getState().earnedBadgeIds;

      recordQuizResult({ quizId, benchmarkIds, answers: finalResults });

      const state = useProgressStore.getState();
      const earned = finalResults
        .filter((r) => r.correct)
        .reduce((sum, r) => sum + r.pointsAwarded, 0);
      const newlyEarnedIds = state.earnedBadgeIds.filter((id) => !earnedBadgesBefore.includes(id));
      const names = badges.filter((b) => newlyEarnedIds.includes(b.id)).map((b) => b.name);

      const totalPoints = earned + 20;
      setPointsEarned(totalPoints);
      setNewBadgeNames(names);
      setFinished(true);

      // If the student is in a game, report this quiz to the teacher.
      const game = useGameStore.getState();
      if (game.playerId) {
        const breakdown: Record<string, { correct: number; total: number }> = {};
        for (const r of finalResults) {
          const b = breakdown[r.benchmarkId] ?? { correct: 0, total: 0 };
          b.total += 1;
          if (r.correct) b.correct += 1;
          breakdown[r.benchmarkId] = b;
        }
        setGameSubmit("sending");
        submitResult({
          playerId: game.playerId,
          quizId: topicId,
          benchmarkIds,
          score: finalResults.filter((r) => r.correct).length,
          total: finalResults.length,
          points: totalPoints,
          breakdown,
        })
          .then(() => setGameSubmit("sent"))
          .catch(() => setGameSubmit("error"));
      }
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedIndex(null);
    setSubmitted(false);
  }

  if (finished) {
    const score = results.filter((r) => r.correct).length;
    return (
      <QuizSummary
        score={score}
        total={questions.length}
        pointsEarned={pointsEarned}
        newBadgeNames={newBadgeNames}
        gameSubmit={gameSubmit}
      />
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="mt-1">
          <ProgressBar value={currentIndex + (submitted ? 1 : 0)} max={questions.length} />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedIndex={selectedIndex}
        submitted={submitted}
        onSelect={handleSelect}
      />

      {submitted && <InstantFeedback question={currentQuestion} wasCorrect={wasCorrect} />}

      <div className="mt-6 flex justify-end">
        {!submitted ? (
          <button
            type="button"
            disabled={selectedIndex === null}
            onClick={handleSubmit}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-emerald-700"
          >
            Submit answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {isLastQuestion ? "See results" : "Next question →"}
          </button>
        )}
      </div>
    </div>
  );
}
