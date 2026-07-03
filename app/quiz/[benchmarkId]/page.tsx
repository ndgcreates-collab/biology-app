import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { QuizSession } from "@/components/quiz/QuizSession";
import { getBenchmark } from "@/content/benchmarks";
import { getQuestionsForBenchmark } from "@/content/questions";

export default async function BenchmarkQuizPage({
  params,
}: {
  params: Promise<{ benchmarkId: string }>;
}) {
  const { benchmarkId } = await params;
  const benchmark = getBenchmark(benchmarkId);
  if (!benchmark) notFound();

  const questions = getQuestionsForBenchmark(benchmarkId);

  return (
    <PageContainer>
      <Link href="/quiz" className="text-sm text-emerald-700 hover:underline">
        ← All quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">{benchmark.title} Quiz</h1>
      <div className="mt-6">
        <QuizSession key={benchmarkId} topicId={benchmarkId} questions={questions} />
      </div>
    </PageContainer>
  );
}
