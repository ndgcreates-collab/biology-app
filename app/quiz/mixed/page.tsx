"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

const MixedQuizLoader = dynamic(() => import("@/components/quiz/MixedQuizLoader"), {
  ssr: false,
  loading: () => <p className="text-sm text-gray-500">Loading questions…</p>,
});

export default function MixedQuizPage() {
  return (
    <PageContainer>
      <Link href="/quiz" className="text-sm text-emerald-700 hover:underline">
        ← All quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">Mixed Quiz — All Topics</h1>
      <div className="mt-6">
        <MixedQuizLoader />
      </div>
    </PageContainer>
  );
}
