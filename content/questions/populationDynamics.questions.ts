import { QuizQuestion, draftMeta, POINTS_BY_DIFFICULTY } from "../schema";

export const populationDynamicsQuestions: QuizQuestion[] = [
  {
    id: "pop-dyn-image-1",
    benchmarkId: "population-dynamics",
    type: "multiple-choice",
    prompt:
      "Look at the growth curves in the diagram. What does the red dashed line labeled K represent, and what is the green S-shaped curve doing as it approaches it?",
    diagramKey: "logistic-growth",
    choices: [
      "K is the carrying capacity; the logistic curve levels off as the population nears it",
      "K is the starting population; the curve grows exponentially forever",
      "K is the extinction point; the curve drops to zero",
      "K is the birth rate; the curve ignores it completely",
    ],
    correctIndex: 0,
    explanation:
      "The dashed line K is the carrying capacity — the maximum the environment can sustain. Logistic (S-shaped) growth slows and levels off near K, unlike the exponential (J-shaped) curve that keeps rising.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
  {
    id: "pop-dyn-1",
    benchmarkId: "population-dynamics",
    type: "multiple-choice",
    prompt: "A deer population that exceeds its habitat's food supply will most likely...",
    choices: [
      "Stabilize immediately with no losses",
      "Experience a population crash (die-off)",
      "Instantly migrate to a new habitat",
      "Evolve to require less food within one generation",
    ],
    correctIndex: 1,
    explanation:
      "When a population exceeds carrying capacity, limiting factors like food scarcity typically cause a sharp die-off until the population falls back within what the habitat can support.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "pop-dyn-2",
    benchmarkId: "population-dynamics",
    type: "multiple-choice",
    prompt: "Which of these is a density-dependent limiting factor?",
    choices: [
      "A sudden hard freeze",
      "Disease spreading faster through a crowded population",
      "A volcanic eruption",
      "An earthquake",
    ],
    correctIndex: 1,
    explanation:
      "Density-dependent factors have a stronger effect as population density rises — disease transmission is a classic example, since crowding increases contact rates.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
  {
    id: "pop-dyn-3",
    benchmarkId: "population-dynamics",
    type: "multiple-choice",
    prompt: "Carrying capacity is best described as...",
    choices: [
      "The fastest possible growth rate of a population",
      "The maximum population size an environment can sustain long-term",
      "The number of species living in one habitat",
      "The total birth rate of a population in one year",
    ],
    correctIndex: 1,
    explanation:
      "Carrying capacity is the population ceiling set by the available resources and conditions of an environment.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "pop-dyn-4",
    benchmarkId: "population-dynamics",
    type: "multiple-choice",
    prompt: "Which combination of factors directly determines whether a population grows or shrinks?",
    choices: [
      "Temperature and rainfall only",
      "Births, deaths, immigration, and emigration",
      "Predators and producers only",
      "Sunlight and soil pH",
    ],
    correctIndex: 1,
    explanation:
      "Population size is a direct function of births and immigration (additions) versus deaths and emigration (losses).",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
  {
    id: "pop-dyn-5",
    benchmarkId: "population-dynamics",
    type: "multiple-choice",
    prompt:
      "A population graphed over time shows rapid growth that levels off into a flat line near the environment's resource limit. This pattern is called...",
    choices: [
      "Exponential growth with no limit",
      "Logistic growth approaching carrying capacity",
      "A random walk",
      "Linear decay",
    ],
    correctIndex: 1,
    explanation:
      "Logistic growth starts fast and slows as the population nears carrying capacity, producing the classic S-shaped curve.",
    difficulty: "hard",
    points: POINTS_BY_DIFFICULTY.hard,
    meta: draftMeta(),
  },
];
