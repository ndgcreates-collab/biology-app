export interface RewardItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "badge" | "cosmetic" | "unlock" | "powerup";
  icon: string;
}

export const rewardCatalog: RewardItem[] = [
  {
    id: "reward-bronze-owl",
    name: "Bronze Owl Avatar Frame",
    description: "A bronze owl frame around your profile — the first cosmetic unlock.",
    cost: 50,
    category: "cosmetic",
    icon: "🦉",
  },
  {
    id: "reward-silver-leaf",
    name: "Silver Leaf Avatar Frame",
    description: "A shimmering silver leaf frame for dedicated ecologists.",
    cost: 120,
    category: "cosmetic",
    icon: "🍃",
  },
  {
    id: "reward-gold-tree",
    name: "Gold Tree Avatar Frame",
    description: "The rarest cosmetic — a golden ecosystem in miniature.",
    cost: 250,
    category: "cosmetic",
    icon: "🌳",
  },
  {
    id: "reward-hint-token",
    name: "Hint Token",
    description: "Unlocks one extra hint on your next quiz attempt.",
    cost: 30,
    category: "powerup",
    icon: "💡",
  },
  {
    id: "reward-retry-token",
    name: "Extra Quiz Attempt",
    description: "Unlocks an additional attempt on a quiz you've already completed.",
    cost: 40,
    category: "unlock",
    icon: "🔁",
  },
];
