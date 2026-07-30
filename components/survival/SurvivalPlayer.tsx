"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { SurvivalLevel, HEARTS_START, HP_START, AchievementLevel } from "@/content/survival/schema";
import { useSurvivalStore } from "@/lib/store/useSurvivalStore";
import { useProgressStore } from "@/lib/store/useProgressStore";
import { useGameStore } from "@/lib/store/useGameStore";
import { submitResult } from "@/lib/supabase/games";
import { AvatarBadge } from "./AvatarBadge";
import { SurvivalScene } from "./SurvivalScene";
import { HeartsHud, HealthHud } from "./SurvivalHud";
import { Diagram } from "@/components/diagrams/registry";
import { QUIZ_COMPLETION_BONUS } from "@/content/schema";

const HEAL_ON_CORRECT = 5;
const pointsForLevel = (al: AchievementLevel) => (al <= 2 ? 10 : al === 3 ? 15 : al === 4 ? 20 : 25);

interface AnswerRecord {
  questionId: string;
  benchmarkId: string;
  correct: boolean;
  pointsAwarded: number;
}

export function SurvivalPlayer({ level }: { level: SurvivalLevel }) {
  const avatar = useSurvivalStore((s) => s.avatar);
  const completeLevel = useSurvivalStore((s) => s.completeLevel);
  const recordQuizResult = useProgressStore((s) => s.recordQuizResult);

  const isHearts = level.mechanic === "hearts";
  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [hearts, setHearts] = useState(level.startingHearts ?? HEARTS_START);
  const [hp, setHp] = useState(level.startingHp ?? HP_START);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [survived, setSurvived] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const finalizedRef = useRef(false);

  if (!avatar) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-sm text-amber-900">You need a survivor first.</p>
        <Link href="/survival/avatar" className="mt-2 inline-block text-sm font-semibold text-emerald-700 underline">
          Create your survivor →
        </Link>
      </div>
    );
  }

  const step = level.steps[stepIndex];
  const isLastStep = stepIndex === level.steps.length - 1;
  const wasCorrect = submitted && selected === step.question.correctIndex;

  function finalize(didSurvive: boolean, finalAnswers: AnswerRecord[]) {
    if (finalizedRef.current) return;
    finalizedRef.current = true;

    const benchmarkIds = Array.from(new Set(finalAnswers.map((a) => a.benchmarkId)));
    const correctCount = finalAnswers.filter((a) => a.correct).length;
    const earnedFromAnswers = finalAnswers.reduce((s, a) => s + (a.correct ? a.pointsAwarded : 0), 0);
    const bonus = didSurvive ? QUIZ_COMPLETION_BONUS : 0;

    // Points, mastery, badges, ledger via the shared progress store.
    recordQuizResult({ quizId: `survival-${level.id}`, benchmarkIds, answers: finalAnswers });
    setPointsEarned(earnedFromAnswers + bonus);

    // Survival-specific progress + accessory unlock.
    completeLevel(level.id, {
      survived: didSurvive,
      score: correctCount,
      total: level.steps.length,
      accessoryId: level.rewardAccessory.id,
    });

    // Report to the teacher if the student is in a game.
    const game = useGameStore.getState();
    if (game.playerId) {
      const breakdown: Record<string, { correct: number; total: number }> = {};
      for (const a of finalAnswers) {
        const b = breakdown[a.benchmarkId] ?? { correct: 0, total: 0 };
        b.total += 1;
        if (a.correct) b.correct += 1;
        breakdown[a.benchmarkId] = b;
      }
      submitResult({
        playerId: game.playerId,
        quizId: `survival-${level.id}`,
        benchmarkIds,
        score: correctCount,
        total: finalAnswers.length,
        points: earnedFromAnswers + bonus,
        breakdown,
      }).catch(() => {});
    }
  }

  function handleSubmit() {
    if (selected === null) return;
    const correct = selected === step.question.correctIndex;
    setAnswers((prev) => [
      ...prev,
      {
        questionId: step.id,
        benchmarkId: step.question.benchmarkId,
        correct,
        pointsAwarded: pointsForLevel(step.question.achievementLevel),
      },
    ]);

    if (isHearts) {
      if (!correct) setHearts((h) => h - 1);
    } else {
      const hazard = step.hazard;
      let delta = 0;
      if (hazard) delta -= hazard.passiveDamage;
      if (correct) delta += HEAL_ON_CORRECT;
      else if (hazard) delta -= hazard.wrongPenalty;
      setHp((v) => v + delta);
    }
    setSubmitted(true);
  }

  function handleContinue() {
    const currentAnswers = answers; // already includes this step (set in submit)
    const dead = isHearts ? hearts <= 0 : hp <= 0;
    if (dead) {
      setSurvived(false);
      finalize(false, currentAnswers);
      setPhase("result");
      return;
    }
    if (isLastStep) {
      setSurvived(true);
      finalize(true, currentAnswers);
      setPhase("result");
      return;
    }
    setStepIndex((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  }

  // --- Intro screen ---
  if (phase === "intro") {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <AvatarBadge avatar={avatar} size="sm" />
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Level {level.order} · {isHearts ? "❤️ Hearts" : "🩸 Health"}
          </span>
        </div>
        <div className="mt-4">
          <SurvivalScene order={level.order} avatarEmoji={avatar.emoji} />
        </div>
        <h1 className="mt-3 text-center text-2xl font-bold text-gray-900">{level.title}</h1>
        <p className="mt-3 text-gray-700 leading-relaxed">{level.intro}</p>
        <p className="mt-3 text-xs text-gray-500">
          {isHearts
            ? `You start with ${level.startingHearts ?? HEARTS_START} hearts. Each wrong answer costs one — lose them all and you don't survive.`
            : `You start at ${level.startingHp ?? HP_START} HP. The hostile environment drains health each step; correct answers help you recover, wrong answers cost you dearly.`}
        </p>
        <button
          onClick={() => setPhase("playing")}
          className="mt-6 w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Enter the scenario →
        </button>
      </div>
    );
  }

  // --- Result screen ---
  if (phase === "result") {
    const correctCount = answers.filter((a) => a.correct).length;
    return (
      <div
        className={`rounded-xl border p-6 text-center ${
          survived ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
        }`}
      >
        <p className="text-5xl">{survived ? "🎉" : "💀"}</p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {survived ? "You survived!" : "You didn't make it"}
        </h1>
        <p className="mt-1 text-gray-700">
          {correctCount}/{level.steps.length} correct · +{pointsEarned} points
        </p>
        {survived && (
          <p className="mt-2 text-sm text-emerald-800">
            Unlocked: {level.rewardAccessory.icon} {level.rewardAccessory.name}
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!survived && (
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Try again
            </button>
          )}
          <Link
            href="/survival"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to level map
          </Link>
        </div>
      </div>
    );
  }

  // --- Playing screen ---
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <SurvivalScene order={level.order} avatarEmoji={avatar.emoji} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {level.emoji} Level {level.order} · Step {stepIndex + 1}/{level.steps.length}
        </span>
        {isHearts ? <HeartsHud hearts={hearts} max={level.startingHearts ?? HEARTS_START} /> : <HealthHud hp={hp} max={level.startingHp ?? HP_START} />}
      </div>

      {!isHearts && step.hazard && (
        <div className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800 ring-1 ring-inset ring-rose-200">
          {step.hazard.icon} Hazard: {step.hazard.name}
        </div>
      )}

      <p className="mt-4 text-gray-700 leading-relaxed">{step.narrative}</p>

      {step.question.diagramKey && <Diagram diagramKey={step.question.diagramKey} showCaption={false} />}

      <p className="mt-4 text-lg font-medium text-gray-900">{step.question.prompt}</p>

      <div className="mt-4 space-y-2">
        {step.question.choices.map((choice, index) => {
          const isSelected = selected === index;
          const isCorrectChoice = index === step.question.correctIndex;
          let cls = "border-gray-200 hover:border-emerald-300";
          if (submitted) {
            if (isCorrectChoice) cls = "border-emerald-500 bg-emerald-50";
            else if (isSelected) cls = "border-rose-500 bg-rose-50";
          } else if (isSelected) cls = "border-emerald-500 bg-emerald-50";
          return (
            <button
              key={index}
              type="button"
              disabled={submitted}
              onClick={() => setSelected(index)}
              className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm font-medium text-gray-800 transition disabled:cursor-default ${cls}`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`mt-4 rounded-lg p-4 text-sm ring-1 ring-inset ${
            wasCorrect ? "bg-emerald-50 text-emerald-900 ring-emerald-200" : "bg-rose-50 text-rose-900 ring-rose-200"
          }`}
        >
          <p className="font-semibold">{wasCorrect ? "Correct — you press on." : "Wrong — the environment takes its toll."}</p>
          <p className="mt-1">{step.question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {!submitted ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={handleSubmit}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 hover:bg-emerald-700"
          >
            Respond
          </button>
        ) : (
          <button
            type="button"
            onClick={handleContinue}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
