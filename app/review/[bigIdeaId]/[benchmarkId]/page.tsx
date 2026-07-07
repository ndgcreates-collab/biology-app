import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { BenchmarkDetail } from "@/components/review/BenchmarkDetail";
import { benchmarks, getBenchmark } from "@/content/benchmarks";

export function generateStaticParams() {
  return benchmarks.map((b) => ({ bigIdeaId: b.bigIdeaId, benchmarkId: b.id }));
}

export default async function BenchmarkReviewPage({
  params,
}: {
  params: Promise<{ bigIdeaId: string; benchmarkId: string }>;
}) {
  const { bigIdeaId, benchmarkId } = await params;
  const benchmark = getBenchmark(benchmarkId);
  if (!benchmark || benchmark.bigIdeaId !== bigIdeaId) notFound();

  return (
    <PageContainer>
      <Link href={`/review/${bigIdeaId}`} className="text-sm text-emerald-700 hover:underline">
        ← Back to Big Idea {bigIdeaId}
      </Link>
      <div className="mt-4">
        <BenchmarkDetail benchmark={benchmark} />
      </div>
    </PageContainer>
  );
}
