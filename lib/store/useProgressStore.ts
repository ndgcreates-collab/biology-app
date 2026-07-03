"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  computeMasteryLevel,
  computeStreak,
  evaluateBadges,
  todayIso,
  BenchmarkMastery,
} from "@/lib/points/computePoints";
import { badges } from "@/content/rewards/badges";
import { rewardCatalog } from "@/content/rewards/catalog";
import { QUIZ_COMPLETION_BONUS } from "@/content/schema";

export interface PointsTransaction {
  id: string;
  timestamp: string;
  type: "earn" | "redeem";
  amount: number;
  reason: string;
  relatedQuizId?: string;
  relatedRewardId?: string;
}

export interface QuizAnswerResult {
  questionId: string;
  benchmarkId: string;
  correct: boolean;
  pointsAwarded: number;
}

export interface QuizHistoryEntry {
  quizId: string;
  benchmarkIds: string[];
  score: number;
  total: number;
  date: string;
}

interface ProgressState {
  totalPoints: number;
  spendablePoints: number;
  transactions: PointsTransaction[];
  ownedRewardIds: string[];
  earnedBadgeIds: string[];
  streak: { currentDays: number; lastActiveDate: string; longestDays: number };
  benchmarkMastery: Record<string, BenchmarkMastery>;
  quizHistory: QuizHistoryEntry[];
  newlyEarnedBadgeIds: string[];

  recordQuizResult: (args: {
    quizId: string;
    benchmarkIds: string[];
    answers: QuizAnswerResult[];
  }) => void;
  redeemReward: (rewardId: string) => boolean;
  clearNewlyEarnedBadges: () => void;
  touchStreak: () => void;
}

const initialMastery: Record<string, BenchmarkMastery> = {};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      spendablePoints: 0,
      transactions: [],
      ownedRewardIds: [],
      earnedBadgeIds: [],
      streak: { currentDays: 0, lastActiveDate: "", longestDays: 0 },
      benchmarkMastery: initialMastery,
      quizHistory: [],
      newlyEarnedBadgeIds: [],

      touchStreak: () => {
        const today = todayIso();
        const current = get().streak;
        if (current.lastActiveDate === today) return;
        set({ streak: computeStreak(current, today) });
      },

      recordQuizResult: ({ quizId, benchmarkIds, answers }) => {
        const today = todayIso();
        const state = get();

        const streak = computeStreak(state.streak, today);

        const mastery = { ...state.benchmarkMastery };
        for (const answer of answers) {
          const existing = mastery[answer.benchmarkId] ?? {
            attempts: 0,
            correct: 0,
            lastAttemptDate: today,
            masteryLevel: "not-started" as const,
          };
          const attempts = existing.attempts + 1;
          const correct = existing.correct + (answer.correct ? 1 : 0);
          mastery[answer.benchmarkId] = {
            attempts,
            correct,
            lastAttemptDate: today,
            masteryLevel: computeMasteryLevel(correct, attempts),
          };
        }

        const correctCount = answers.filter((a) => a.correct).length;
        const earnedFromAnswers = answers.reduce(
          (sum, a) => sum + (a.correct ? a.pointsAwarded : 0),
          0
        );
        const completionBonus = QUIZ_COMPLETION_BONUS;
        const totalEarned = earnedFromAnswers + completionBonus;

        const newTransactions: PointsTransaction[] = [
          ...answers
            .filter((a) => a.correct)
            .map((a) => ({
              id: `${quizId}-${a.questionId}`,
              timestamp: new Date().toISOString(),
              type: "earn" as const,
              amount: a.pointsAwarded,
              reason: `Correct answer (${a.benchmarkId})`,
              relatedQuizId: quizId,
            })),
          {
            id: `${quizId}-completion`,
            timestamp: new Date().toISOString(),
            type: "earn" as const,
            amount: completionBonus,
            reason: "Quiz completion bonus",
            relatedQuizId: quizId,
          },
        ];

        const quizHistoryEntry: QuizHistoryEntry = {
          quizId,
          benchmarkIds,
          score: correctCount,
          total: answers.length,
          date: today,
        };

        const nextState = {
          totalPoints: state.totalPoints + totalEarned,
          spendablePoints: state.spendablePoints + totalEarned,
          transactions: [...state.transactions, ...newTransactions],
          benchmarkMastery: mastery,
          streak,
          quizHistory: [...state.quizHistory, quizHistoryEntry],
        };

        const newlyEarned = evaluateBadges(
          {
            totalPoints: nextState.totalPoints,
            earnedBadgeIds: state.earnedBadgeIds,
            streak: nextState.streak,
            quizHistory: nextState.quizHistory,
            benchmarkMastery: nextState.benchmarkMastery,
          },
          badges
        );

        set({
          ...nextState,
          earnedBadgeIds: [...state.earnedBadgeIds, ...newlyEarned],
          newlyEarnedBadgeIds: newlyEarned,
        });
      },

      redeemReward: (rewardId: string) => {
        const state = get();
        const reward = rewardCatalog.find((r) => r.id === rewardId);
        if (!reward) return false;
        if (state.spendablePoints < reward.cost) return false;
        if (state.ownedRewardIds.includes(rewardId)) return false;

        const transaction: PointsTransaction = {
          id: `redeem-${rewardId}-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: "redeem",
          amount: -reward.cost,
          reason: `Redeemed: ${reward.name}`,
          relatedRewardId: rewardId,
        };

        set({
          spendablePoints: state.spendablePoints - reward.cost,
          ownedRewardIds: [...state.ownedRewardIds, rewardId],
          transactions: [...state.transactions, transaction],
        });
        return true;
      },

      clearNewlyEarnedBadges: () => set({ newlyEarnedBadgeIds: [] }),
    }),
    {
      name: "biology-app-progress",
      version: 1,
    }
  )
);
