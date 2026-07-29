"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Avatar {
  name: string;
  emoji: string;
  color: string; // tailwind color token, e.g. "emerald"
  /** Reward id of an equipped avatar frame owned in the Rewards shop, if any. */
  equippedFrameRewardId?: string;
}

export interface LevelOutcome {
  completed: boolean;
  survived: boolean;
  bestScore: number; // correct answers
  total: number;
}

interface SurvivalState {
  avatar: Avatar | null;
  unlockedAccessories: string[]; // accessory ids awarded for surviving levels
  levelOutcomes: Record<string, LevelOutcome>; // keyed by level id

  setAvatar: (avatar: Avatar) => void;
  completeLevel: (
    levelId: string,
    result: { survived: boolean; score: number; total: number; accessoryId?: string }
  ) => void;
  resetSurvival: () => void;
}

export const useSurvivalStore = create<SurvivalState>()(
  persist(
    (set, get) => ({
      avatar: null,
      unlockedAccessories: [],
      levelOutcomes: {},

      setAvatar: (avatar) => set({ avatar }),

      completeLevel: (levelId, result) => {
        const state = get();
        const prev = state.levelOutcomes[levelId];
        const bestScore = Math.max(prev?.bestScore ?? 0, result.score);
        const nextAccessories =
          result.survived && result.accessoryId && !state.unlockedAccessories.includes(result.accessoryId)
            ? [...state.unlockedAccessories, result.accessoryId]
            : state.unlockedAccessories;

        set({
          levelOutcomes: {
            ...state.levelOutcomes,
            [levelId]: {
              completed: true,
              survived: (prev?.survived ?? false) || result.survived,
              bestScore,
              total: result.total,
            },
          },
          unlockedAccessories: nextAccessories,
        });
      },

      resetSurvival: () => set({ avatar: null, unlockedAccessories: [], levelOutcomes: {} }),
    }),
    { name: "biology-app-survival", version: 1 }
  )
);
