"use client";

import { useState } from "react";

const CONFETTI_COLORS = ["#22c55e", "#eab308", "#38bdf8", "#f97316", "#a855f7", "#ef4444"];

interface Piece {
  dx: number;
  dy: number;
  rot: number;
  color: string;
  left: number;
  delay: number;
}

function makePieces(): Piece[] {
  return Array.from({ length: 16 }).map((_, i) => ({
    dx: Math.round((Math.random() - 0.5) * 260),
    dy: Math.round(40 + Math.random() * 130),
    rot: Math.round((Math.random() - 0.5) * 720),
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: 50 + Math.round((Math.random() - 0.5) * 30),
    delay: (i % 4) * 40,
  }));
}

// A one-shot burst of effects rendered over the scene. Remount (via a React
// `key`) to replay it on each answer.
export function JuiceOverlay({ kind, points }: { kind: "correct" | "wrong"; points: number }) {
  if (kind === "wrong") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="sv-flash-red absolute inset-0 bg-rose-500" />
        <div className="sv-float-up absolute left-1/2 top-20 text-2xl font-black text-rose-600 drop-shadow">
          💥
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div className="sv-flash-green absolute inset-0 bg-emerald-400" />
      <Confetti />
      <div className="sv-float-up absolute left-1/2 top-20 text-xl font-black text-emerald-600 drop-shadow">
        +{points}
      </div>
    </div>
  );
}

function Confetti() {
  const [pieces] = useState<Piece[]>(makePieces);
  return (
    <>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="sv-confetti absolute top-16 h-2 w-2 rounded-[1px]"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            ["--dx" as string]: `${p.dx}px`,
            ["--dy" as string]: `${p.dy}px`,
            ["--rot" as string]: `${p.rot}deg`,
            animationDelay: `${p.delay}ms`,
          }}
        />
      ))}
    </>
  );
}

