import { Benchmark, draftMeta } from "../schema";

export const symbiosis: Benchmark = {
  id: "symbiosis",
  code: "SC.912.L.17.A.2 (DRAFT — verify code on CPALMS)",
  bigIdeaId: "A",
  title: "Symbiosis & Species Interactions",
  summary:
    "Organisms interact with each other in patterns that shape where and how abundantly they live: mutualism (both benefit), commensalism (one benefits, the other unaffected), parasitism (one benefits, one harmed), predation (one eats the other), and competition (both are limited by sharing a resource).",
  examples: [
    "A clownfish shelters among sea anemone tentacles (protected) while the anemone is unaffected — commensalism.",
    "Bees pollinate flowers while collecting nectar — mutualism, both species benefit.",
    "A tapeworm absorbs nutrients from its host's intestine, harming the host — parasitism.",
    "Two bird species competing for the same limited nesting holes in a forest — interspecific competition.",
  ],
  analogy:
    "Picture each relationship as a two-person transaction: mutualism is both people paying each other, commensalism is one person handing out free coffee, parasitism is a pickpocket, and competition is two people reaching for the last seat on a bus.",
  vocabulary: [
    { term: "Mutualism", definition: "A relationship where both species benefit." },
    { term: "Commensalism", definition: "A relationship where one species benefits and the other is unaffected." },
    { term: "Parasitism", definition: "A relationship where one species benefits at the direct expense of the other." },
    { term: "Interspecific competition", definition: "Competition for the same limited resource between different species." },
  ],
  meta: draftMeta(),
};
