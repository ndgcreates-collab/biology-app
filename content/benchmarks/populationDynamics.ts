import { Benchmark, draftMeta } from "../schema";

export const populationDynamics: Benchmark = {
  id: "population-dynamics",
  code: "SC.912.L.17.5",
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
    { term: "Births", definition: "New individuals added to a population; increases population size." },
    { term: "Deaths", definition: "Individuals lost from a population; decreases population size." },
    { term: "Immigration", definition: "Individuals moving into a population from elsewhere; increases population size." },
    { term: "Emigration", definition: "Individuals moving out of a population to elsewhere; decreases population size." },
    { term: "Exponential growth curve", definition: "A J-shaped curve showing a population growing faster and faster with unlimited resources." },
    { term: "Logistic growth curve", definition: "An S-shaped curve showing growth that slows and levels off as the population nears carrying capacity." },
    { term: "Carrying capacity", definition: "The maximum population size an environment can sustain long-term." },
    { term: "Limiting factor", definition: "Any resource or condition that restricts population growth (e.g. food, space, disease)." },
    { term: "Density-dependent factor", definition: "A limiting factor whose effect grows stronger as population density increases, like disease or competition." },
    { term: "Density-independent factor", definition: "A factor that affects a population regardless of its density, such as a flood, fire, or hard freeze." },
  ],
  diagramKeys: ["logistic-growth"],
  meta: draftMeta(),
};
