import { PageContainer } from "@/components/layout/PageContainer";
import { BigIdeaCard } from "@/components/review/BigIdeaCard";
import { bigIdeas } from "@/content/bigIdeas";
import { getBenchmarksByBigIdea } from "@/content/benchmarks";

export default function ReviewIndexPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900">Review SC.912.L.17: Interdependence</h1>
      <p className="mt-1 text-sm text-gray-600">
        Browse each big idea to review its benchmarks before quizzing yourself.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {bigIdeas.map((bigIdea) => (
          <BigIdeaCard
            key={bigIdea.id}
            bigIdea={bigIdea}
            benchmarkCount={getBenchmarksByBigIdea(bigIdea.id).length}
          />
        ))}
      </div>
    </PageContainer>
  );
}
