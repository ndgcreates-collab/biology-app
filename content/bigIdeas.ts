import { BigIdea, draftMeta } from "./schema";

export const bigIdeas: BigIdea[] = [
  {
    id: "A",
    title: "Distribution & Abundance of Organisms",
    shortLabel: "Populations & Interactions",
    description:
      "The distribution and abundance of organisms is determined by interactions between organisms, and between organisms and the non-living environment.",
    colorTheme: "emerald",
    meta: draftMeta(),
  },
  {
    id: "B",
    title: "Energy & Nutrient Flow",
    shortLabel: "Food Webs & Cycles",
    description:
      "Energy and nutrients move within and between the biotic and abiotic components of ecosystems via physical, chemical, and biological processes.",
    colorTheme: "sky",
    meta: draftMeta(),
  },
  {
    id: "C",
    title: "Human & Environmental Impact",
    shortLabel: "Biodiversity & Human Activity",
    description:
      "Human activities and natural events can have profound effects on populations, biodiversity, and ecosystem processes.",
    colorTheme: "amber",
    meta: draftMeta(),
  },
];

export const getBigIdea = (id: string) =>
  bigIdeas.find((b) => b.id === id);
