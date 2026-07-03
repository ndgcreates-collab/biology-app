import { PageContainer } from "@/components/layout/PageContainer";
import { MasteryGrid } from "@/components/progress/MasteryGrid";
import { StreakDisplay } from "@/components/progress/StreakDisplay";
import { PointsLedger } from "@/components/progress/PointsLedger";

export default function ProgressPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>

      <div className="mt-4">
        <StreakDisplay />
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Benchmark mastery
      </h2>
      <div className="mt-3">
        <MasteryGrid />
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Points history
      </h2>
      <div className="mt-3">
        <PointsLedger />
      </div>
    </PageContainer>
  );
}
