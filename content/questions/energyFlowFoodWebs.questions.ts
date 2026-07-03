import { QuizQuestion, draftMeta, POINTS_BY_DIFFICULTY } from "../schema";

export const energyFlowFoodWebsQuestions: QuizQuestion[] = [
  {
    id: "energy-1",
    benchmarkId: "energy-flow-food-webs",
    type: "multiple-choice",
    prompt: "Roughly what percentage of energy transfers from one trophic level to the next?",
    choices: ["90%", "50%", "10%", "100%"],
    correctIndex: 2,
    explanation:
      "The 10% rule: only about 10% of energy at one trophic level is available to organisms at the next level up — the rest is lost mostly as metabolic heat.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "energy-2",
    benchmarkId: "energy-flow-food-webs",
    type: "multiple-choice",
    prompt: "Why are there rarely more than 4-5 trophic levels in a food chain?",
    choices: [
      "Predators run out of prey species to hunt",
      "Energy loss at each level limits how much is available higher up",
      "Decomposers block energy from moving further",
      "Herbivores tend to go extinct quickly",
    ],
    correctIndex: 1,
    explanation:
      "Because so much energy is lost as heat at every transfer, there's eventually not enough energy left to support another trophic level.",
    difficulty: "hard",
    points: POINTS_BY_DIFFICULTY.hard,
    meta: draftMeta(),
  },
  {
    id: "energy-3",
    benchmarkId: "energy-flow-food-webs",
    type: "multiple-choice",
    prompt: "In a food web, decomposers primarily...",
    choices: [
      "Capture sunlight to produce their own food",
      "Break down dead organisms and recycle nutrients back into the ecosystem",
      "Hunt live prey exclusively",
      "Convert nitrogen gas directly into protein",
    ],
    correctIndex: 1,
    explanation:
      "Decomposers like fungi and bacteria break down dead material, returning nutrients (not energy) to the ecosystem for reuse.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
  {
    id: "energy-4",
    benchmarkId: "energy-flow-food-webs",
    type: "multiple-choice",
    prompt: "Which organism would be classified as a producer?",
    choices: ["A grasshopper", "A grass plant", "A frog", "A snake"],
    correctIndex: 1,
    explanation:
      "Producers make their own food from sunlight via photosynthesis — grass plants are a classic producer.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
];
