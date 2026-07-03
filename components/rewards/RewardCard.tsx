"use client";

import { useState } from "react";
import { RewardItem } from "@/content/rewards/catalog";
import { useProgressStore } from "@/lib/store/useProgressStore";

const categoryLabel: Record<RewardItem["category"], string> = {
  badge: "Badge",
  cosmetic: "Cosmetic",
  unlock: "Unlock",
  powerup: "Power-up",
};

export function RewardCard({ reward }: { reward: RewardItem }) {
  const spendablePoints = useProgressStore((s) => s.spendablePoints);
  const owned = useProgressStore((s) => s.ownedRewardIds.includes(reward.id));
  const redeemReward = useProgressStore((s) => s.redeemReward);
  const [justRedeemed, setJustRedeemed] = useState(false);

  const canAfford = spendablePoints >= reward.cost;

  function handleRedeem() {
    const success = redeemReward(reward.id);
    if (success) {
      setJustRedeemed(true);
      setTimeout(() => setJustRedeemed(false), 2000);
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="text-3xl">{reward.icon}</div>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {categoryLabel[reward.category]}
        </span>
      </div>
      <h4 className="mt-2 font-semibold text-gray-900">{reward.name}</h4>
      <p className="mt-1 text-sm text-gray-600">{reward.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-emerald-700">{reward.cost} pts</span>
        {owned ? (
          <span className="text-xs font-medium text-gray-500">Owned ✓</span>
        ) : (
          <button
            type="button"
            disabled={!canAfford}
            onClick={handleRedeem}
            className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-emerald-700"
          >
            {justRedeemed ? "Redeemed!" : "Redeem"}
          </button>
        )}
      </div>
    </div>
  );
}
