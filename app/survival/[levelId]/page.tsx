import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { SurvivalPlayer } from "@/components/survival/SurvivalPlayer";
import { survivalLevels, getSurvivalLevel } from "@/content/survival";

export function generateStaticParams() {
  return survivalLevels.map((l) => ({ levelId: l.id }));
}

export default async function SurvivalLevelPage({
  params,
}: {
  params: Promise<{ levelId: string }>;
}) {
  const { levelId } = await params;
  const level = getSurvivalLevel(levelId);
  if (!level) notFound();

  return (
    <PageContainer>
      <Link href="/survival" className="text-sm text-emerald-700 hover:underline">
        ← Level map
      </Link>
      <div className="mt-4">
        <SurvivalPlayer level={level} />
      </div>
    </PageContainer>
  );
}
