"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { createQuiz, type NewQuizQuestion } from "@/lib/supabase/quizzes";
import { benchmarks } from "@/content/benchmarks";
import { diagramRegistry } from "@/components/diagrams/registry";
import { POINTS_BY_DIFFICULTY } from "@/content/schema";

type Difficulty = "easy" | "medium" | "hard";

interface DraftQuestion {
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
  benchmarkId: string;
  diagramKey: string;
}

const emptyQuestion = (): DraftQuestion => ({
  prompt: "",
  choices: ["", "", "", ""],
  correctIndex: 0,
  explanation: "",
  difficulty: "medium",
  benchmarkId: "",
  diagramKey: "",
});

const PIN_KEY = "biology-app-quiz-author-pin";
const diagramKeys = Object.keys(diagramRegistry);

export default function CreateQuizPage() {
  const [pin, setPin] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<DraftQuestion[]>([emptyQuestion()]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  // Remember the author passcode across visits (kept only on this device).
  // Reading localStorage must happen after mount, hence the one-time effect.
  useEffect(() => {
    const saved = localStorage.getItem(PIN_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setPin(saved);
  }, []);

  function updateQuestion(i: number, patch: Partial<DraftQuestion>) {
    setQuestions((qs) => qs.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  }

  function updateChoice(qi: number, ci: number, value: string) {
    setQuestions((qs) =>
      qs.map((q, idx) =>
        idx === qi ? { ...q, choices: q.choices.map((c, j) => (j === ci ? value : c)) } : q
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const prepared: NewQuizQuestion[] = [];
    for (const q of questions) {
      const choices = q.choices.map((c) => c.trim()).filter((c) => c.length > 0);
      // Re-map the correct index to the filtered choices.
      const correctText = q.choices[q.correctIndex]?.trim() ?? "";
      const correctIndex = choices.indexOf(correctText);
      if (q.prompt.trim().length === 0) {
        setError("Every question needs a prompt.");
        return;
      }
      if (choices.length < 2) {
        setError("Every question needs at least two answer choices.");
        return;
      }
      if (correctIndex < 0) {
        setError("Every question needs a correct answer selected (and it can't be a blank choice).");
        return;
      }
      prepared.push({
        prompt: q.prompt.trim(),
        choices,
        correct_index: correctIndex,
        explanation: q.explanation.trim() || undefined,
        difficulty: q.difficulty,
        points: POINTS_BY_DIFFICULTY[q.difficulty],
        benchmark_id: q.benchmarkId || undefined,
        diagram_key: q.diagramKey || undefined,
      });
    }

    setBusy(true);
    try {
      localStorage.setItem(PIN_KEY, pin.trim());
      const res = await createQuiz({
        pin: pin.trim(),
        title: title.trim(),
        description: description.trim() || undefined,
        questions: prepared,
      });
      setCreatedSlug(res.slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (createdSlug) {
    return (
      <PageContainer>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-2xl">✅</p>
          <h1 className="mt-2 text-xl font-bold text-gray-900">Quiz created!</h1>
          <p className="mt-1 text-sm text-gray-600">
            It now appears in the &quot;From Supabase&quot; section of the Quiz page for everyone.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href={`/quiz/db?slug=${encodeURIComponent(createdSlug)}`}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Play it now →
            </Link>
            <button
              onClick={() => {
                setCreatedSlug(null);
                setTitle("");
                setDescription("");
                setQuestions([emptyQuestion()]);
              }}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
            >
              Create another
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link href="/host" className="text-sm text-emerald-700 hover:underline">
        ← Host
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">Create a Quiz</h1>
      <p className="mt-1 text-sm text-gray-600">
        Build a quiz that saves to Supabase and appears in the app for all students. Requires the
        teacher author passcode.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <label className="block text-sm font-medium text-gray-700">Author passcode</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            className="mt-1 w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
          <label className="mt-4 block text-sm font-medium text-gray-700">Quiz title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            placeholder="e.g. Ecosystems Unit Review"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
          <label className="mt-4 block text-sm font-medium text-gray-700">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {questions.map((q, qi) => (
          <div key={qi} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Question {qi + 1}</h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => setQuestions((qs) => qs.filter((_, idx) => idx !== qi))}
                  className="text-sm text-rose-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <label className="mt-3 block text-sm font-medium text-gray-700">Prompt</label>
            <textarea
              value={q.prompt}
              onChange={(e) => updateQuestion(qi, { prompt: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />

            <p className="mt-3 text-sm font-medium text-gray-700">
              Answer choices <span className="text-gray-400">(select the correct one)</span>
            </p>
            <div className="mt-1 space-y-2">
              {q.choices.map((choice, ci) => (
                <div key={ci} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qi}`}
                    checked={q.correctIndex === ci}
                    onChange={() => updateQuestion(qi, { correctIndex: ci })}
                    className="h-4 w-4 accent-emerald-600"
                  />
                  <input
                    value={choice}
                    onChange={(e) => updateChoice(qi, ci, e.target.value)}
                    placeholder={`Choice ${ci + 1}`}
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">Difficulty</label>
                <select
                  value={q.difficulty}
                  onChange={(e) => updateQuestion(qi, { difficulty: e.target.value as Difficulty })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  <option value="easy">Easy (10 pts)</option>
                  <option value="medium">Medium (15 pts)</option>
                  <option value="hard">Hard (25 pts)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Topic (optional)</label>
                <select
                  value={q.benchmarkId}
                  onChange={(e) => updateQuestion(qi, { benchmarkId: e.target.value })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  <option value="">— none —</option>
                  {benchmarks.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Diagram (optional)</label>
                <select
                  value={q.diagramKey}
                  onChange={(e) => updateQuestion(qi, { diagramKey: e.target.value })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  <option value="">— none —</option>
                  {diagramKeys.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="mt-3 block text-xs font-medium text-gray-700">
              Explanation <span className="text-gray-400">(optional, shown after answering)</span>
            </label>
            <input
              value={q.explanation}
              onChange={(e) => updateQuestion(qi, { explanation: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => setQuestions((qs) => [...qs, emptyQuestion()])}
          className="rounded-md border border-dashed border-gray-400 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-white"
        >
          + Add question
        </button>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-40 hover:bg-emerald-700"
          >
            {busy ? "Creating…" : "Create quiz"}
          </button>
          <span className="text-xs text-gray-500">
            {questions.length} question{questions.length === 1 ? "" : "s"}
          </span>
        </div>
      </form>
    </PageContainer>
  );
}
