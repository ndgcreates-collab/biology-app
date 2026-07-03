import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { BenchmarkCard } from "@/components/review/BenchmarkCard";
import { getBigIdea } from "@/content/bigIdeas";
import { getBenchmarksByBigIdea } from "@/content/benchmarks";

export default async function BigIdeaReviewPage({
  params,
}: {
  params: Promise<{ bigIdeaId: string }>;
}) {
  const { bigIdeaId } = await params;
  const bigIdea = getBigIdea(bigIdeaId);
  if (!bigIdea) notFound();

  const benchmarks = getBenchmarksByBigIdea(bigIdeaId);

  return (
    <PageContainer>
      <Link href="/review" className="text-sm text-emerald-700 hover:underline">
        ← All big ideas
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">
        Big Idea {bigIdea.id}: {bigIdea.title}
      </h1>
      <p className="mt-1 text-sm text-gray-600">{bigIdea.description}</p>

      <div className="mt-6 space-y-3">
        {benchmarks.length === 0 && (
          <p className="text-sm text-gray-500">
            No topics have been added under this big idea yet — check back soon.
          </p>
        )}
        {benchmarks.map((benchmark) => (
          <BenchmarkCard key={benchmark.id} benchmark={benchmark} />
        ))}
      </div>
    </PageContainer>
  );
}
