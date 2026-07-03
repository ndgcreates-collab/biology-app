import { Benchmark, draftMeta } from "../schema";

export const biodiversityHumanImpact: Benchmark = {
  id: "biodiversity-human-impact",
  code: "SC.912.L.17.C.1 (DRAFT — verify code on CPALMS)",
  bigIdeaId: "C",
  title: "Biodiversity & Human Impact",
  summary:
    "Human activity — habitat destruction, pollution, resource overuse, and introducing invasive species — along with natural events like storms and climate shifts, can sharply reduce biodiversity and disrupt ecosystem processes. Resource use is often evaluated as renewable (regrows/replenishes, like forests or solar energy) versus nonrenewable (finite, like fossil fuels).",
  examples: [
    "Burmese pythons released into the Everglades have no natural predators there and have sharply reduced native mammal populations.",
    "Overfishing a coastal region can collapse a fish population faster than it can reproduce and recover.",
    "Switching from coal (nonrenewable) to solar and wind (renewable) reduces long-term strain on finite resources.",
    "A hurricane can flatten a coastal ecosystem's vegetation, temporarily collapsing habitat for many species at once.",
  ],
  analogy:
    "Think of biodiversity like a safety net woven from many different threads — losing a few threads barely weakens it, but losing enough threads (species) at once causes the whole net to fail.",
  vocabulary: [
    { term: "Invasive species", definition: "A non-native species introduced to an ecosystem that causes ecological or economic harm." },
    { term: "Biodiversity", definition: "The variety of species living within an ecosystem." },
    { term: "Renewable resource", definition: "A resource that naturally replenishes over a human timescale (solar, wind, timber)." },
    { term: "Nonrenewable resource", definition: "A resource that exists in a fixed supply and is not replenished on a human timescale (coal, oil, natural gas)." },
  ],
  meta: draftMeta(),
};
