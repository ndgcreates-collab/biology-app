import { Benchmark, draftMeta } from "../schema";

export const populationDynamics: Benchmark = {
  id: "population-dynamics",
  code: "SC.912.L.17.A.1 (DRAFT — verify code on CPALMS)",
  bigIdeaId: "A",
  title: "Population Dynamics & Limiting Factors",
  summary:
    "A population's size changes based on births, deaths, immigration, and emigration. Every environment has a carrying capacity — the maximum population size it can sustain — set by limiting factors such as food, water, space, disease, and predation.",
  examples: [
    "A deer population crashes after a harsh winter reduces the food supply below what the herd needs.",
    "Disease spreads faster through a crowded rabbit population than a sparse one (a density-dependent limiting factor).",
    "A lake's fish population levels off once it reaches the carrying capacity set by available oxygen and food.",
  ],
  analogy:
    "Think of a population like water filling a bathtub: births and immigration are the faucet adding water, deaths and emigration are the drain removing it. Carrying capacity is where the tub overflows.",
  vocabulary: [
    { term: "Carrying capacity", definition: "The maximum population size an environment can sustain long-term." },
    { term: "Limiting factor", definition: "Any resource or condition that restricts population growth (e.g. food, space, disease)." },
    { term: "Density-dependent factor", definition: "A limiting factor whose effect grows stronger as population density increases, like disease or competition." },
  ],
  meta: draftMeta(),
};
