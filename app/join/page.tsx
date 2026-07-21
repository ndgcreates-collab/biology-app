"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { joinGame } from "@/lib/supabase/games";
import { useGameStore } from "@/lib/store/useGameStore";

export default function JoinPage() {
  const router = useRouter();
  const joinedGame = useGameStore((s) => s.joinedGame);
  const currentCode = useGameStore((s) => s.gameCode);
  const currentName = useGameStore((s) => s.playerName);
  const leaveGame = useGameStore((s) => s.leaveGame);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await joinGame(code.trim(), name.trim());
      joinedGame({
        gameCode: code.trim().toUpperCase(),
        playerId: res.player_id,
        playerName: res.name,
      });
      router.push("/quiz");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900">Join a Game</h1>
      <p className="mt-1 text-sm text-gray-600">
        Enter the game code your teacher gave you and pick a name. Your quiz scores will be sent to
        your teacher.
      </p>

      {currentCode && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-inset ring-emerald-200">
          You&apos;re in game <span className="font-mono font-bold">{currentCode}</span> as{" "}
          <span className="font-semibold">{currentName}</span>.{" "}
          <Link href="/quiz" className="underline">
            Go to quizzes
          </Link>{" "}
          or{" "}
          <button onClick={leaveGame} className="underline">
            leave game
          </button>
          .
        </div>
      )}

      <form onSubmit={handleJoin} className="mt-6 max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Game code</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-lg tracking-widest uppercase focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jordan"
            maxLength={40}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={busy || code.trim().length === 0 || name.trim().length === 0}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-emerald-700"
        >
          {busy ? "Joining…" : "Join game"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500">
        Are you a teacher?{" "}
        <Link href="/host" className="text-emerald-700 underline">
          Host a game
        </Link>
      </p>
    </PageContainer>
  );
}
