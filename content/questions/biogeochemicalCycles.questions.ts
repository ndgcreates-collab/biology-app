import { QuizQuestion, draftMeta, POINTS_BY_DIFFICULTY } from "../schema";

export const biogeochemicalCyclesQuestions: QuizQuestion[] = [
  {
    id: "biogeo-1",
    benchmarkId: "biogeochemical-cycles",
    type: "multiple-choice",
    prompt: "Unlike energy, matter in an ecosystem is...",
    choices: [
      "Lost as heat at every transfer",
      "Recycled through biogeochemical cycles",
      "Created new by decomposers",
      "Only found in producers",
    ],
    correctIndex: 1,
    explanation:
      "Matter (like water, carbon, and nitrogen) cycles repeatedly through living and non-living parts of an ecosystem rather than being lost like energy is.",
    difficulty: "easy",
    points: POINTS_BY_DIFFICULTY.easy,
    meta: draftMeta(),
  },
  {
    id: "biogeo-2",
    benchmarkId: "biogeochemical-cycles",
    type: "multiple-choice",
    prompt: "What role do nitrogen-fixing bacteria play in the nitrogen cycle?",
    choices: [
      "They release nitrogen gas from plant roots into the atmosphere",
      "They convert atmospheric nitrogen into a form plants can use",
      "They consume nitrogen and remove it from the ecosystem permanently",
      "They convert carbon dioxide into nitrogen",
    ],
    correctIndex: 1,
    explanation:
      "Most organisms can't use nitrogen gas directly — nitrogen-fixing bacteria convert it into usable compounds for plants.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
  {
    id: "biogeo-3",
    benchmarkId: "biogeochemical-cycles",
    type: "multiple-choice",
    prompt: "Which process returns carbon dioxide to the atmosphere from living organisms?",
    choices: ["Photosynthesis", "Respiration", "Nitrogen fixation", "Evaporation"],
    correctIndex: 1,
    explanation:
      "Respiration releases CO2 as organisms break down food for energy, returning carbon to the atmosphere.",
    difficulty: "medium",
    points: POINTS_BY_DIFFICULTY.medium,
    meta: draftMeta(),
  },
];
