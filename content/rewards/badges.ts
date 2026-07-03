export type BadgeCriteria =
  | { kind: "streak"; days: number }
  | { kind: "topicMastery"; benchmarkId: string; accuracyThreshold: number }
  | { kind: "totalPoints"; threshold: number }
  | { kind: "quizzesCompleted"; count: number };

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: BadgeCriteria;
}

export const badges: Badge[] = [
  {
    id: "badge-first-quiz",
    name: "First Steps",
    description: "Complete your first quiz.",
    icon: "🌱",
    criteria: { kind: "quizzesCompleted", count: 1 },
  },
  {
    id: "badge-five-quizzes",
    name: "Getting the Hang of It",
    description: "Complete 5 quizzes.",
    icon: "📚",
    criteria: { kind: "quizzesCompleted", count: 5 },
  },
  {
    id: "badge-streak-3",
    name: "On a Roll",
    description: "Study 3 days in a row.",
    icon: "🔥",
    criteria: { kind: "streak", days: 3 },
  },
  {
    id: "badge-streak-7",
    name: "Week-Long Ecologist",
    description: "Study 7 days in a row.",
    icon: "🔥",
    criteria: { kind: "streak", days: 7 },
  },
  {
    id: "badge-points-100",
    name: "Century Club",
    description: "Earn 100 total points.",
    icon: "💯",
    criteria: { kind: "totalPoints", threshold: 100 },
  },
  {
    id: "badge-mastery-population",
    name: "Population Pro",
    description: "Reach 90%+ accuracy on Population Dynamics.",
    icon: "🦌",
    criteria: { kind: "topicMastery", benchmarkId: "population-dynamics", accuracyThreshold: 0.9 },
  },
];
