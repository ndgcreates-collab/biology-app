"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  // Set when a student has joined a game.
  gameCode: string | null;
  playerId: string | null;
  playerName: string | null;

  joinedGame: (args: { gameCode: string; playerId: string; playerName: string }) => void;
  leaveGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      gameCode: null,
      playerId: null,
      playerName: null,
      joinedGame: ({ gameCode, playerId, playerName }) =>
        set({ gameCode, playerId, playerName }),
      leaveGame: () => set({ gameCode: null, playerId: null, playerName: null }),
    }),
    { name: "biology-app-game", version: 1 }
  )
);
