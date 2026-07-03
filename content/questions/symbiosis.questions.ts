import { QuizQuestion, draftMeta, POINTS_BY_DIFFICULTY } from "../schema";

export const symbiosisQuestions: QuizQuestion[] = [
  {
    id: "symb-1",
    benchmarkId: "symbiosis",
    type: "multiple-choice",
    prompt:
      "A clownfish shelters among sea anemone tentacles, while the anemone is unaffected. This is an example of...",
    choices: ["Mutualism", "Commensalism", "Parasitism", "Competition"],
    correctIndex: 1,
    explanation:
      "The clownfish benefits (protection) while the anemone experiences neither benefit nor harm — that's commensalism.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "symb-2",
    benchmarkId: "symbiosis",
    type: "multiple-choice",
    prompt: "Two species of birds competing for the same limited nesting sites is an example of...",
    choices: ["Mutualism", "Predation", "Interspecific competition", "Parasitism"],
    correctIndex: 2,
    explanation:
      "When two different species vie for the same limited resource, that's interspecific competition — both are limited by the shared resource.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
  {
    id: "symb-3",
    benchmarkId: "symbiosis",
    type: "multiple-choice",
    prompt: "Bees pollinating flowers while collecting nectar is a classic example of...",
    choices: ["Parasitism", "Mutualism", "Commensalism", "Predation"],
    correctIndex: 1,
    explanation:
      "Both species benefit here — the flower gets pollinated and the bee gets food — which defines mutualism.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "symb-4",
    benchmarkId: "symbiosis",
    type: "multiple-choice",
    prompt: "A tapeworm living in and absorbing nutrients from a dog's intestine is an example of...",
    choices: ["Commensalism", "Mutualism", "Parasitism", "Competition"],
    correctIndex: 2,
    explanation:
      "The tapeworm benefits while actively harming its host by stealing nutrients — this is parasitism.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
];
