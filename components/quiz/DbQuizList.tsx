"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listDbQuizzes, type DbQuiz } from "@/lib/supabase/quizzes";

export function DbQuizList() {
  const [quizzes, setQuizzes] = useState<DbQuiz[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await listDbQuizzes();
        if (!cancelled) setQuizzes(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load quizzes.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Nothing to show until we know there are DB quizzes.
  if (error) return null;
  if (!quizzes || quizzes.length === 0) return null;

  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        From Supabase
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/quiz/db?slug=${encodeURIComponent(quiz.slug)}`}
            className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 transition hover:border-indigo-300 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                ☁ Supabase
              </span>
            </div>
            <h4 className="mt-2 font-semibold text-gray-900">{quiz.title}</h4>
            {quiz.description && (
              <p className="mt-1 text-xs text-gray-600">{quiz.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
