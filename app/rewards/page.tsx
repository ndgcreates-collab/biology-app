import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { RewardCard } from "@/components/rewards/RewardCard";
import { rewardCatalog } from "@/content/rewards/catalog";

export default function RewardsPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Rewards Shop</h1>
        <Link href="/rewards/inventory" className="text-sm text-emerald-700 hover:underline">
          View my badges & inventory →
        </Link>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Redeem points you&apos;ve earned from quizzes for cosmetics and power-ups.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rewardCatalog.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </PageContainer>
  );
}
