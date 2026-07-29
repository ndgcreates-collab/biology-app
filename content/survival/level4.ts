import { SurvivalLevel } from "./schema";
import { draftMeta } from "@/content/schema";

// EOC Achievement Level 4: predict / evaluate. Primary: Biodiversity & Human Impact (SC.912.L.17.8).
// Deforestation intensifies — HEALTH mode, harsher.
export const level4: SurvivalLevel = {
  id: "biodiversity-collapse",
  order: 4,
  achievementLevel: 4,
  title: "The Web Unravels",
  emoji: "🐾",
  setting: "Fragmented, drying habitat",
  primaryBenchmarkId: "biodiversity-human-impact",
  alsoAssesses: ["population-dynamics", "biogeochemical-cycles"],
  intro:
    "Most of the canopy is gone. Streams run muddy, species are disappearing, and the land can barely support life. Survival now means predicting what happens next — and being right.",
  mechanic: "health",
  startingHp: 100,
  rewardAccessory: { id: "filter", name: "Water Filter", icon: "💧" },
  meta: draftMeta(),
  steps: [
    {
      id: "l4-s1",
      narrative:
        "With habitat destroyed, the variety of species here is crashing. You need to predict what a lower-biodiversity ecosystem means for your survival.",
      hazard: { name: "Unstable ground", icon: "🕳️", passiveDamage: 15, wrongPenalty: 35 },
      question: {
        prompt:
          "Predict a likely negative consequence of this sharp reduction in biodiversity.",
        choices: [
          "The ecosystem becomes less stable and less able to recover from further disturbance",
          "The ecosystem becomes more stable and resistant to change",
          "Energy flow through the ecosystem increases",
          "Carrying capacity for every species rises",
        ],
        correctIndex: 0,
        explanation:
          "Lower biodiversity generally reduces ecosystem stability and resilience — fewer species means fewer backups when conditions change, so the system recovers poorly.",
        benchmarkId: "biodiversity-human-impact",
        achievementLevel: 4,
      },
    },
    {
      id: "l4-s2",
      narrative:
        "The cleared land now holds far less food, water, and shelter than the old forest did. You evaluate what this does to the animals that remain.",
      hazard: { name: "Scarcity", icon: "🍂", passiveDamage: 15, wrongPenalty: 35 },
      question: {
        prompt:
          "Evaluate the effect of deforestation on the carrying capacity of this habitat, and the resident populations.",
        choices: [
          "Carrying capacity drops, so populations that remain will shrink toward the new limit",
          "Carrying capacity rises, so populations will grow larger than before",
          "Carrying capacity is unchanged because animals can photosynthesize",
          "Carrying capacity only affects plants, not animals",
        ],
        correctIndex: 0,
        explanation:
          "Fewer resources lowers carrying capacity. Populations that exceed the new, lower capacity will decline until they fit what the degraded habitat can support.",
        benchmarkId: "population-dynamics",
        achievementLevel: 4,
        diagramKey: "logistic-growth",
      },
    },
    {
      id: "l4-s3",
      narrative:
        "The company must power its mill. It can burn coal from a nearby mine or install solar panels on the cleared land. Your long-term survival depends on the choice.",
      hazard: { name: "Polluted air", icon: "🏭", passiveDamage: 15, wrongPenalty: 35 },
      question: {
        prompt:
          "Evaluate the environmental impact of the two energy sources for this already-damaged ecosystem.",
        choices: [
          "Solar is renewable with lower ongoing impact; coal is nonrenewable and adds more CO₂ and pollution",
          "Coal is renewable and cleaner than solar here",
          "Both have identical environmental impacts",
          "Solar is nonrenewable and worsens the carbon cycle",
        ],
        correctIndex: 0,
        explanation:
          "Solar is a renewable resource with lower long-term environmental impact. Coal is nonrenewable and releases additional CO₂ and pollutants, compounding the damage from deforestation.",
        benchmarkId: "biodiversity-human-impact",
        achievementLevel: 4,
      },
    },
  ],
};
