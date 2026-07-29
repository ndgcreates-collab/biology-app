import { ContentMeta } from "@/content/schema";

export type AchievementLevel = 1 | 2 | 3 | 4 | 5;
export type SurvivalMechanic = "hearts" | "health";

// One scenario beat: a bit of narrative + a hazard (health mode) + one MC item.
export interface SurvivalStep {
  id: string;
  narrative: string;
  /** Health-mode hazard shown for this beat. Passive damage is taken on entry; a wrong answer adds `wrongPenalty`. */
  hazard?: { name: string; icon: string; passiveDamage: number; wrongPenalty: number };
  question: {
    prompt: string;
    choices: string[];
    correctIndex: number;
    explanation: string;
    benchmarkId: string;
    achievementLevel: AchievementLevel;
    diagramKey?: string;
  };
}

export interface SurvivalLevel {
  id: string;
  order: number; // 1..5
  achievementLevel: AchievementLevel; // EOC achievement level this level targets
  title: string;
  emoji: string;
  setting: string; // short label, e.g. "Healthy pine forest"
  primaryBenchmarkId: string;
  alsoAssesses: string[]; // other benchmark ids reflected in the scenario
  intro: string; // scenario setup shown before the first question
  mechanic: SurvivalMechanic;
  startingHearts?: number; // hearts mode
  startingHp?: number; // health mode
  /** Unlocked and awarded to the avatar after surviving this level. */
  rewardAccessory: { id: string; name: string; icon: string };
  steps: SurvivalStep[];
  meta: ContentMeta;
}

export const HEARTS_START = 3;
export const HP_START = 100;
