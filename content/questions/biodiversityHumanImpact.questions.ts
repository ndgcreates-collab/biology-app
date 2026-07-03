import { QuizQuestion, draftMeta, POINTS_BY_DIFFICULTY } from "../schema";

export const biodiversityHumanImpactQuestions: QuizQuestion[] = [
  {
    id: "biodiv-1",
    benchmarkId: "biodiversity-human-impact",
    type: "multiple-choice",
    prompt:
      "Burmese pythons released into the Everglades, where they have no natural predators, are an example of...",
    choices: ["A keystone species", "An invasive species", "A decomposer", "A producer"],
    correctIndex: 1,
    explanation:
      "An invasive species is a non-native organism introduced to an ecosystem that causes ecological or economic harm — pythons in the Everglades are a textbook case.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "biodiv-2",
    benchmarkId: "biodiversity-human-impact",
    type: "multiple-choice",
    prompt: "Which of these is a nonrenewable resource?",
    choices: ["Solar energy", "Wind", "Coal", "Timber from a managed forest"],
    correctIndex: 2,
    explanation:
      "Coal exists in a fixed supply and isn't replenished on a human timescale, making it nonrenewable — unlike solar, wind, or sustainably managed timber.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "biodiv-3",
    benchmarkId: "biodiversity-human-impact",
    type: "multiple-choice",
    prompt: "Overfishing a coastal fish population faster than it can reproduce primarily threatens...",
    choices: [
      "The carbon cycle directly",
      "Biodiversity and the stability of that ecosystem",
      "Only the fishing industry's profits, with no ecological effect",
      "The nitrogen cycle directly",
    ],
    correctIndex: 1,
    explanation:
      "Removing a population faster than it can recover reduces biodiversity and can destabilize the food web that depends on it.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
];
