import { Benchmark, draftMeta } from "../schema";

export const energyFlowFoodWebs: Benchmark = {
  id: "energy-flow-food-webs",
  code: "SC.912.L.17.B.1 (DRAFT — verify code on CPALMS)",
  bigIdeaId: "B",
  title: "Energy Flow & Food Webs",
  summary:
    "Energy enters ecosystems as sunlight, is captured by producers through photosynthesis, and flows one-directionally through trophic levels: producers to primary consumers to secondary (and tertiary) consumers, with decomposers breaking down remains at every level. Only about 10% of energy transfers to the next level — the rest is lost as heat.",
  examples: [
    "Grass (producer) is eaten by a grasshopper (primary consumer), which is eaten by a frog (secondary consumer), which is eaten by a snake (tertiary consumer).",
    "Only about 10% of the energy a rabbit gets from eating plants is available to the fox that eats the rabbit — the rest is lost as metabolic heat.",
    "Fungi and bacteria (decomposers) break down a fallen log, returning nutrients — but not usable energy — to the soil.",
  ],
  analogy:
    "Think of energy moving up a food chain like passing a nearly-empty water bottle up a line of people — each person only gets to keep about 10% of what's left, so by the fourth or fifth person there's almost nothing left to pass on.",
  vocabulary: [
    { term: "Trophic level", definition: "An organism's position in a food chain (producer, primary consumer, etc.)." },
    { term: "10% rule", definition: "Roughly only 10% of energy at one trophic level is available to the next level up." },
    { term: "Decomposer", definition: "An organism that breaks down dead organic material, recycling nutrients (not energy) back into the ecosystem." },
  ],
  meta: draftMeta(),
};
