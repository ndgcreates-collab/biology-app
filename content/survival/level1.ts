import { SurvivalLevel } from "./schema";
import { draftMeta } from "@/content/schema";

// EOC Achievement Level 1→2: identify / recognize. Primary: Population Dynamics (SC.912.L.17.5).
export const level1: SurvivalLevel = {
  id: "forest-arrival",
  order: 1,
  achievementLevel: 2,
  title: "Into the Forest",
  emoji: "🌲",
  setting: "Healthy pine forest",
  primaryBenchmarkId: "population-dynamics",
  alsoAssesses: ["symbiosis"],
  intro:
    "You wake at the edge of a healthy Florida pine forest with only a backpack. To survive, you'll need to read the land like a biologist — spotting what keeps living things alive here, and what limits them.",
  mechanic: "hearts",
  startingHearts: 3,
  rewardAccessory: { id: "compass", name: "Field Compass", icon: "🧭" },
  meta: draftMeta(),
  steps: [
    {
      id: "l1-s1",
      narrative:
        "A herd of deer grazes in a clearing. You remember that no population can grow forever — something in the environment always holds it in check.",
      question: {
        prompt:
          "Which of these is a limiting factor that could keep the deer population from growing without end?",
        choices: [
          "The available supply of food and water",
          "The color of the deer's fur",
          "The number of hours you sleep",
          "The deer's species name",
        ],
        correctIndex: 0,
        explanation:
          "A limiting factor is a resource or condition (food, water, space, disease) that restricts how large a population can grow.",
        benchmarkId: "population-dynamics",
        achievementLevel: 2,
      },
    },
    {
      id: "l1-s2",
      narrative:
        "You find a spring. The forest can only support so many animals with this much water and food.",
      question: {
        prompt:
          "The largest population size this environment can support over time is called its...",
        choices: ["Carrying capacity", "Food web", "Trophic level", "Biome"],
        correctIndex: 0,
        explanation:
          "Carrying capacity is the maximum population an environment can sustain long-term, set by its limiting factors.",
        benchmarkId: "population-dynamics",
        achievementLevel: 2,
      },
    },
    {
      id: "l1-s3",
      narrative:
        "You notice birds nesting safely in a thorny shrub that keeps predators away. The shrub is unaffected by the birds.",
      question: {
        prompt: "This relationship — the bird benefits and the shrub is unaffected — is an example of...",
        choices: ["Commensalism", "Predation", "Parasitism", "A limiting factor"],
        correctIndex: 0,
        explanation:
          "Commensalism is a relationship in which one organism benefits and the other is neither helped nor harmed.",
        benchmarkId: "symbiosis",
        achievementLevel: 2,
      },
    },
  ],
};
