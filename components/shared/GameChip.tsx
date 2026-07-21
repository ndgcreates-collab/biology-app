"use client";

import { useGameStore } from "@/lib/store/useGameStore";

export function GameChip() {
  const gameCode = useGameStore((s) => s.gameCode);
  const playerName = useGameStore((s) => s.playerName);

  if (!gameCode) return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
      🎮 {playerName} · {gameCode}
    </span>
  );
}
