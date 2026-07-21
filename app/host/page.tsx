"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { createGame, type CreatedGame } from "@/lib/supabase/games";

export default function HostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState<CreatedGame | null>(null);

  // results lookup
  const [lookupCode, setLookupCode] = useState("");
  const [lookupPin, setLookupPin] = useState("");

  async function handleCreate() {
    setError(null);
    setBusy(true);
    try {
      const created = await createGame(title.trim() || undefined);
      setGame(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function goToResults(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ code: lookupCode.trim(), pin: lookupPin.trim() });
    router.push(`/host/results?${params.toString()}`);
  }

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900">Teacher: Host a Game</h1>
      <p className="mt-1 text-sm text-gray-600">
        Create a game, share the game code with your students, and keep the results PIN private so
        only you can see their scores.
      </p>

      {/* Create a new game */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900">Start a new game</h2>
        {!game ? (
          <div className="mt-3 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional game name (e.g. Period 3 — Ecology)"
              maxLength={80}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              onClick={handleCreate}
              disabled={busy}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 hover:bg-emerald-700"
            >
              {busy ? "Creating…" : "Create game"}
            </button>
          </div>
        ) : (
          <div className="mt-3 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-emerald-50 p-4 text-center ring-1 ring-inset ring-emerald-200">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Game code (share with students)
                </p>
                <p className="mt-1 font-mono text-3xl font-bold tracking-widest text-emerald-900">
                  {game.code}
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 text-center ring-1 ring-inset ring-amber-200">
                <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
                  Results PIN (keep private)
                </p>
                <p className="mt-1 font-mono text-3xl font-bold tracking-widest text-amber-900">
                  {game.host_pin}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Students go to <span className="font-semibold">Join a Game</span> and enter{" "}
              <span className="font-mono font-semibold">{game.code}</span>. Save your PIN — you&apos;ll
              need it (with the code) to view results.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/host/results?code=${game.code}&pin=${game.host_pin}`}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                View live results →
              </Link>
              <button
                onClick={() => {
                  setGame(null);
                  setTitle("");
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Start another game
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Look up results for an existing game */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900">View results for an existing game</h2>
        <form onSubmit={goToResults} className="mt-3 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Game code</label>
            <input
              value={lookupCode}
              onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              required
              className="mt-1 w-32 rounded-md border border-gray-300 px-3 py-2 font-mono uppercase tracking-widest focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Results PIN</label>
            <input
              value={lookupPin}
              onChange={(e) => setLookupPin(e.target.value.toUpperCase())}
              placeholder="PIN"
              maxLength={6}
              required
              className="mt-1 w-32 rounded-md border border-gray-300 px-3 py-2 font-mono uppercase tracking-widest focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
          >
            View results
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
