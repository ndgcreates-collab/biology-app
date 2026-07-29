import { SurvivalLevel } from "./schema";
import { draftMeta } from "@/content/schema";

// EOC Achievement Level 3: trace energy/matter; relate human actions to sustainability.
// Primary: Biogeochemical Cycles (SC.912.L.17.10). Deforestation begins — HEALTH mode.
export const level3: SurvivalLevel = {
  id: "the-clearing-begins",
  order: 3,
  achievementLevel: 3,
  title: "The Chainsaws Arrive",
  emoji: "🪓",
  setting: "Forest being logged",
  primaryBenchmarkId: "biogeochemical-cycles",
  alsoAssesses: ["energy-flow-food-webs", "biodiversity-human-impact"],
  intro:
    "The air fills with the growl of chainsaws. Loggers are clearing the forest around you. As the trees fall, the cycles that keep this place alive begin to break — and so does your safety. Stay sharp: every wrong move now costs real health.",
  mechanic: "health",
  startingHp: 100,
  rewardAccessory: { id: "mask", name: "Dust Mask", icon: "😷" },
  meta: draftMeta(),
  steps: [
    {
      id: "l3-s1",
      narrative:
        "Falling trees kick up choking dust. Fewer trees means less photosynthesis pulling carbon dioxide from the air.",
      hazard: { name: "Choking dust", icon: "🌫️", passiveDamage: 10, wrongPenalty: 30 },
      question: {
        prompt:
          "As trees are removed, how does the carbon cycle change in the short term?",
        choices: [
          "Less CO₂ is pulled from the air, so more carbon stays in the atmosphere",
          "More CO₂ is pulled from the air by the missing trees",
          "The carbon cycle stops completely and instantly",
          "Carbon is destroyed and permanently removed from Earth",
        ],
        correctIndex: 0,
        explanation:
          "Trees remove CO₂ through photosynthesis. Removing them means less CO₂ is taken up, so more carbon remains in the atmosphere — tracing matter through the disrupted carbon cycle.",
        benchmarkId: "biogeochemical-cycles",
        achievementLevel: 3,
        diagramKey: "carbon-cycle",
      },
    },
    {
      id: "l3-s2",
      narrative:
        "The grasshoppers, frogs, and snakes you counted yesterday are vanishing as their plants disappear. Your food web is unraveling.",
      hazard: { name: "Falling limbs", icon: "🪵", passiveDamage: 12, wrongPenalty: 30 },
      question: {
        prompt:
          "Trace the energy: if the producers (plants) are removed, what happens to the consumers above them in the food web?",
        choices: [
          "They lose their energy source and their numbers drop",
          "They gain more energy and increase in number",
          "They begin to photosynthesize instead",
          "They are unaffected because energy is recycled",
        ],
        correctIndex: 0,
        explanation:
          "Energy flows one way from producers upward. Remove the producers and every consumer level loses its energy supply, so populations fall.",
        benchmarkId: "energy-flow-food-webs",
        achievementLevel: 3,
      },
    },
    {
      id: "l3-s3",
      narrative:
        "A logger says the cleared land will be replanted for lumber. You weigh whether this human activity can be sustainable.",
      hazard: { name: "Exposure", icon: "☀️", passiveDamage: 12, wrongPenalty: 30 },
      question: {
        prompt:
          "How does replanting harvested trees relate to sustainability, compared with clearing forest and never replanting?",
        choices: [
          "Replanting can make timber a renewable resource, supporting long-term sustainability",
          "Replanting makes no difference to sustainability",
          "Clearing without replanting is the more sustainable choice",
          "Trees are a nonrenewable resource no matter what",
        ],
        correctIndex: 0,
        explanation:
          "When forests are replanted and allowed to regrow, timber behaves as a renewable resource. Clearing without replanting degrades the ecosystem and is not sustainable.",
        benchmarkId: "biodiversity-human-impact",
        achievementLevel: 3,
      },
    },
  ],
};
