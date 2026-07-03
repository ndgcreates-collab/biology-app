import { Badge, BadgeCriteria } from "@/content/rewards/badges";

export type MasteryLevel = "not-started" | "practicing" | "proficient" | "mastered";

export interface BenchmarkMastery {
  attempts: number;
  correct: number;
  lastAttemptDate: string;
  masteryLevel: MasteryLevel;
}

export function computeMasteryLevel(correct: number, attempts: number): MasteryLevel {
  if (attempts === 0) return "not-started";
  const ratio = correct / attempts;
  if (ratio >= 0.9) return "mastered";
  if (ratio >= 0.75) return "proficient";
  if (ratio >= 0.4) return "practicing";
  return "practicing";
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysBetween(isoA: string, isoB: string): number {
  const a = new Date(isoA + "T00:00:00");
  const b = new Date(isoB + "T00:00:00");
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

export function computeStreak(
  previous: { currentDays: number; lastActiveDate: string; longestDays: number },
  today: string
): { currentDays: number; lastActiveDate: string; longestDays: number } {
  if (!previous.lastActiveDate) {
    return { currentDays: 1, lastActiveDate: today, longestDays: 1 };
  }
  const gap = daysBetween(previous.lastActiveDate, today);
  if (gap === 0) return previous;
  const nextCurrent = gap === 1 ? previous.currentDays + 1 : 1;
  return {
    currentDays: nextCurrent,
    lastActiveDate: today,
    longestDays: Math.max(previous.longestDays, nextCurrent),
  };
}

export interface BadgeEvalState {
  totalPoints: number;
  earnedBadgeIds: string[];
  streak: { currentDays: number };
  quizHistory: { quizId: string }[];
  benchmarkMastery: Record<string, BenchmarkMastery>;
}

function criteriaMet(criteria: BadgeCriteria, state: BadgeEvalState): boolean {
  switch (criteria.kind) {
    case "streak":
      return state.streak.currentDays >= criteria.days;
    case "totalPoints":
      return state.totalPoints >= criteria.threshold;
    case "quizzesCompleted":
      return state.quizHistory.length >= criteria.count;
    case "topicMastery": {
      const mastery = state.benchmarkMastery[criteria.benchmarkId];
      if (!mastery || mastery.attempts === 0) return false;
      return mastery.correct / mastery.attempts >= criteria.accuracyThreshold;
    }
  }
}

export function evaluateBadges(state: BadgeEvalState, badgeDefs: Badge[]): string[] {
  const newlyEarned: string[] = [];
  for (const badge of badgeDefs) {
    if (state.earnedBadgeIds.includes(badge.id)) continue;
    if (criteriaMet(badge.criteria, state)) newlyEarned.push(badge.id);
  }
  return newlyEarned;
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
