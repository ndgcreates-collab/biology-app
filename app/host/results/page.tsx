"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { getResults, type GameResults } from "@/lib/supabase/games";
import { getBenchmark } from "@/content/benchmarks";

interface StudentSummary {
  name: string;
  quizzes: number;
  score: number;
  total: number;
  points: number;
  benchmarks: Record<string, { correct: number; total: number }>;
}

function summarize(data: GameResults): StudentSummary[] {
  return data.players.map((p) => {
    const benchmarks: Record<string, { correct: number; total: number }> = {};
    let score = 0;
    let total = 0;
    let points = 0;
    for (const r of p.results) {
      score += r.score;
      total += r.total;
      points += r.points;
      if (r.breakdown) {
        for (const [bid, b] of Object.entries(r.breakdown)) {
          const acc = benchmarks[bid] ?? { correct: 0, total: 0 };
          acc.correct += b.correct;
          acc.total += b.total;
          benchmarks[bid] = acc;
        }
      }
    }
    return { name: p.name, quizzes: p.results.length, score, total, points, benchmarks };
  });
}

function benchmarkLabel(id: string) {
  return getBenchmark(id)?.title ?? id;
}

function errMsg(e: unknown) {
  return e instanceof Error ? e.message : "Could not load results.";
}

function ResultsInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const pin = searchParams.get("pin");

  const [data, setData] = useState<GameResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!(code && pin));

  const load = useCallback(async () => {
    if (!code || !pin) return;
    setLoading(true);
    setError(null);
    try {
      setData(await getResults(code, pin));
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, [code, pin]);

  // Initial load runs inside an async IIFE so no state is set synchronously.
  useEffect(() => {
    if (!code || !pin) return;
    let cancelled = false;
    (async () => {
      try {
        const d = await getResults(code, pin);
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) setError(errMsg(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, pin]);

  if (!code || !pin) {
    return (
      <>
        <h1 className="text-2xl font-bold text-gray-900">Results</h1>
        <p className="mt-2 text-sm text-gray-600">
          Missing game code or PIN.{" "}
          <Link href="/host" className="text-emerald-700 underline">
            Go back to Host
          </Link>
          .
        </p>
      </>
    );
  }

  const students = data ? summarize(data) : [];
  const allBenchmarkIds = Array.from(new Set(students.flatMap((s) => Object.keys(s.benchmarks))));

  return (
    <>
      <Link href="/host" className="text-sm text-emerald-700 hover:underline">
        ← Host
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Results — <span className="font-mono">{code}</span>
        </h1>
        <button
          onClick={load}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ↻ Refresh
        </button>
      </div>
      {data?.game.title && <p className="mt-1 text-sm text-gray-600">{data.game.title}</p>}

      {loading && <p className="mt-6 text-sm text-gray-500">Loading results…</p>}
      {error && <p className="mt-6 text-sm text-rose-600">{error}</p>}

      {!loading && !error && students.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">
          No students have submitted results yet. Share the code{" "}
          <span className="font-mono font-semibold">{code}</span> and check back.
        </p>
      )}

      {students.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-left text-gray-600">
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">Quizzes</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2 pr-4">Points</th>
                {allBenchmarkIds.map((bid) => (
                  <th key={bid} className="py-2 pr-4 text-xs font-medium">
                    {benchmarkLabel(bid)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium text-gray-900">{s.name}</td>
                  <td className="py-2 pr-4 text-gray-700">{s.quizzes}</td>
                  <td className="py-2 pr-4 text-gray-700">
                    {s.score}/{s.total}
                    {s.total > 0 && (
                      <span className="ml-1 text-xs text-gray-400">
                        ({Math.round((s.score / s.total) * 100)}%)
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-4 font-semibold text-emerald-700">{s.points}</td>
                  {allBenchmarkIds.map((bid) => {
                    const b = s.benchmarks[bid];
                    if (!b)
                      return (
                        <td key={bid} className="py-2 pr-4 text-gray-300">
                          —
                        </td>
                      );
                    const pct = Math.round((b.correct / b.total) * 100);
                    const color =
                      pct >= 75 ? "text-emerald-700" : pct >= 40 ? "text-amber-600" : "text-rose-600";
                    return (
                      <td key={bid} className={`py-2 pr-4 ${color}`}>
                        {b.correct}/{b.total}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default function ResultsPage() {
  return (
    <PageContainer>
      <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
        <ResultsInner />
      </Suspense>
    </PageContainer>
  );
}
