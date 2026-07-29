import { SurvivalLevel } from "./schema";
import { draftMeta } from "@/content/schema";

// EOC Achievement Level 2: identify energy source; trace matter through the carbon cycle.
// Primary: Energy Flow & Food Webs (SC.912.L.17.9), with carbon-cycle recognition (17.10).
export const level2: SurvivalLevel = {
  id: "finding-food",
  order: 2,
  achievementLevel: 2,
  title: "Finding Food & Energy",
  emoji: "🍃",
  setting: "Forest interior, morning",
  primaryBenchmarkId: "energy-flow-food-webs",
  alsoAssesses: ["biogeochemical-cycles"],
  intro:
    "Hunger sets in. To eat wisely you need to understand where energy in this forest actually comes from — and how the very air you breathe cycles through the living things around you.",
  mechanic: "hearts",
  startingHearts: 3,
  rewardAccessory: { id: "canteen", name: "Canteen", icon: "🥤" },
  meta: draftMeta(),
  steps: [
    {
      id: "l2-s1",
      narrative:
        "You spot grasshoppers eating grass, and a frog eating the grasshoppers. You're deciding where in this chain to look for reliable energy.",
      question: {
        prompt: "Where does a primary consumer, like the grasshopper, get its energy?",
        choices: [
          "By eating producers, such as grass",
          "Directly from sunlight",
          "By eating other consumers",
          "From decomposers in the soil",
        ],
        correctIndex: 0,
        explanation:
          "Primary consumers are herbivores — they get energy by eating producers (plants), which captured the sun's energy through photosynthesis.",
        benchmarkId: "energy-flow-food-webs",
        achievementLevel: 2,
      },
    },
    {
      id: "l2-s2",
      narrative:
        "Only a fraction of the energy in the grass ever reaches the frog. You want to hunt where the most energy is available.",
      question: {
        prompt:
          "Roughly how much of the energy at one trophic level is passed on to the next level up?",
        choices: ["About 10%", "About 50%", "About 90%", "All of it"],
        correctIndex: 0,
        explanation:
          "Only about 10% of energy transfers to the next trophic level; the rest is lost as heat. That's why lower levels (plants) can feed more organisms.",
        benchmarkId: "energy-flow-food-webs",
        achievementLevel: 2,
      },
    },
    {
      id: "l2-s3",
      narrative:
        "You exhale, and a nearby tree's leaves quietly take in the gas you release. Matter is moving through the carbon cycle all around you.",
      question: {
        prompt:
          "Trace the carbon: which process moves carbon from you (an animal) into the air, and which moves it from the air into the tree?",
        choices: [
          "Respiration puts CO₂ into the air; photosynthesis pulls it into the tree",
          "Photosynthesis puts CO₂ into the air; respiration pulls it into the tree",
          "Decomposition puts CO₂ into the air; digestion pulls it into the tree",
          "Evaporation puts CO₂ into the air; condensation pulls it into the tree",
        ],
        correctIndex: 0,
        explanation:
          "You release CO₂ by respiration; plants take CO₂ from the air during photosynthesis. This is the carbon cycle moving matter between organisms and the atmosphere.",
        benchmarkId: "biogeochemical-cycles",
        achievementLevel: 2,
        diagramKey: "carbon-cycle",
      },
    },
  ],
};
