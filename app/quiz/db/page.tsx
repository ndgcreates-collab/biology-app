"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { QuizSession } from "@/components/quiz/QuizSession";
import { getDbQuiz } from "@/lib/supabase/quizzes";
import { QuizQuestion } from "@/content/schema";
import { DbQuiz } from "@/lib/supabase/quizzes";

function DbQuizInner() {
  const slug = useSearchParams().get("slug");
  const [state, setState] = useState<
    | { kind: "loading" }
    | { kind: "error"; message: string }
    | { kind: "ready"; quiz: DbQuiz; questions: QuizQuestion[] }
    | { kind: "notfound" }
  >(() => (slug ? { kind: "loading" } : { kind: "error", message: "No quiz specified." }));

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await getDbQuiz(slug);
        if (cancelled) return;
        if (!result) setState({ kind: "notfound" });
        else setState({ kind: "ready", quiz: result.quiz, questions: result.questions });
      } catch (e) {
        if (!cancelled)
          setState({ kind: "error", message: e instanceof Error ? e.message : "Failed to load." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <>
      <Link href="/quiz" className="text-sm text-emerald-700 hover:underline">
        ← All quizzes
      </Link>

      {state.kind === "loading" && (
        <p className="mt-6 text-sm text-gray-500">Loading quiz from Supabase…</p>
      )}
      {state.kind === "error" && <p className="mt-6 text-sm text-rose-600">{state.message}</p>}
      {state.kind === "notfound" && (
        <p className="mt-6 text-sm text-gray-500">That quiz was not found.</p>
      )}

      {state.kind === "ready" && (
        <>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{state.quiz.title}</h1>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
              ☁ Supabase
            </span>
          </div>
          {state.quiz.description && (
            <p className="mt-1 text-sm text-gray-600">{state.quiz.description}</p>
          )}
          <div className="mt-6">
            <QuizSession topicId={`db-${state.quiz.slug}`} questions={state.questions} />
          </div>
        </>
      )}
    </>
  );
}

export default function DbQuizPage() {
  return (
    <PageContainer>
      <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
        <DbQuizInner />
      </Suspense>
    </PageContainer>
  );
}
