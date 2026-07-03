"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { BadgeGrid } from "@/components/rewards/BadgeGrid";
import { rewardCatalog } from "@/content/rewards/catalog";
import { useProgressStore } from "@/lib/store/useProgressStore";

export default function InventoryPage() {
  const ownedRewardIds = useProgressStore((s) => s.ownedRewardIds);
  const ownedRewards = rewardCatalog.filter((r) => ownedRewardIds.includes(r.id));

  return (
    <PageContainer>
      <Link href="/rewards" className="text-sm text-emerald-700 hover:underline">
        ← Rewards shop
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">My Inventory</h1>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-500">Badges</h2>
      <div className="mt-3">
        <BadgeGrid />
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Owned rewards
      </h2>
      {ownedRewards.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">You haven&apos;t redeemed any rewards yet.</p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {ownedRewards.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
              <div className="text-2xl">{r.icon}</div>
              <span className="font-medium text-gray-900">{r.name}</span>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
