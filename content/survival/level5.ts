import { SurvivalLevel } from "./schema";
import { draftMeta } from "@/content/schema";

// EOC Achievement Level 5: analyze / synthesize; short- and long-term prediction.
// Primary: Human Impact synthesis (SC.912.L.17.16/.20). Ecosystem near collapse — HEALTH mode, hardest.
export const level5: SurvivalLevel = {
  id: "final-synthesis",
  order: 5,
  achievementLevel: 5,
  title: "Last Stand",
  emoji: "🌍",
  setting: "Collapsed ecosystem",
  primaryBenchmarkId: "biodiversity-human-impact",
  alsoAssesses: ["biogeochemical-cycles", "energy-flow-food-webs", "population-dynamics"],
  intro:
    "The forest is nearly gone. To make it out, you must connect everything you've learned — carbon, energy, biodiversity, and human impact — and reason about both the immediate crisis and the decades to come.",
  mechanic: "health",
  startingHp: 100,
  rewardAccessory: { id: "survivor-crown", name: "Survivor's Crown", icon: "👑" },
  meta: draftMeta(),
  steps: [
    {
      id: "l5-s1",
      narrative:
        "A researcher hands you population data: after clearing, the deer count spiked, then crashed far below its original number. You must analyze why.",
      hazard: { name: "Exhaustion", icon: "💥", passiveDamage: 16, wrongPenalty: 40 },
      question: {
        prompt:
          "Analyze the data: what best explains the deer spiking and then crashing below the original level?",
        choices: [
          "Loss of habitat lowered carrying capacity; the herd briefly overshot it, then died off past the new, lower limit",
          "Deforestation permanently raised the carrying capacity",
          "The deer evolved to need no food within days",
          "Predators alone caused the change, unrelated to habitat",
        ],
        correctIndex: 0,
        explanation:
          "Analyzing population dynamics: the degraded habitat has a much lower carrying capacity. A population that overshoots a reduced capacity crashes and settles below where it started.",
        benchmarkId: "population-dynamics",
        achievementLevel: 5,
      },
    },
    {
      id: "l5-s2",
      narrative:
        "You synthesize the whole picture: fewer trees, more atmospheric carbon, a broken food web, and lost species. A council asks you to predict the long-term outcome.",
      hazard: { name: "Toxic runoff", icon: "☣️", passiveDamage: 16, wrongPenalty: 40 },
      question: {
        prompt:
          "Predict the short- AND long-term impact of continued large-scale deforestation on this environment's sustainability.",
        choices: [
          "Short term: more atmospheric CO₂, collapsing food webs, lost biodiversity. Long term: degraded soil and reduced ability to support life — low sustainability",
          "Short and long term: the ecosystem fully recovers on its own within days",
          "No impact in the short term and improved biodiversity long term",
          "Only the atmosphere changes; the living community is unaffected long term",
        ],
        correctIndex: 0,
        explanation:
          "Synthesizing carbon, energy, biodiversity, and human impact: deforestation raises atmospheric CO₂ and collapses food webs now, and degrades soil and life-support capacity for the long term — unsustainable on both timescales.",
        benchmarkId: "biodiversity-human-impact",
        achievementLevel: 5,
      },
    },
    {
      id: "l5-s3",
      narrative:
        "You reach the last stand of trees. To protect it, you must justify one action that best restores the interdependent systems you've studied.",
      hazard: { name: "Final collapse", icon: "🔥", passiveDamage: 18, wrongPenalty: 40 },
      question: {
        prompt:
          "Which action would most effectively restore this ecosystem's interdependence, and why?",
        choices: [
          "Reforestation — it renews carbon uptake, rebuilds habitat and food webs, and restores biodiversity together",
          "Introducing one non-native predator to control remaining animals",
          "Paving the cleared land to stop erosion permanently",
          "Removing the last trees to 'reset' the ecosystem",
        ],
        correctIndex: 0,
        explanation:
          "Reforestation simultaneously restores carbon uptake (carbon cycle), rebuilds habitat and food webs (energy flow), and recovers biodiversity — reconnecting the interdependent systems. Introducing non-native species or paving would cause further harm.",
        benchmarkId: "biodiversity-human-impact",
        achievementLevel: 5,
      },
    },
  ],
};
