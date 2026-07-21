import { Benchmark, draftMeta } from "../schema";

export const biogeochemicalCycles: Benchmark = {
  id: "biogeochemical-cycles",
  code: "SC.912.L.17.10",
  bigIdeaId: "B",
  title: "Biogeochemical Cycles",
  summary:
    "Unlike energy, matter is recycled through ecosystems via biogeochemical cycles. The water cycle moves water between the atmosphere, land, and oceans; the carbon cycle moves carbon between the atmosphere, living organisms, oceans, and rock; the nitrogen cycle moves nitrogen between the atmosphere and living organisms with the help of bacteria, since most organisms can't use atmospheric nitrogen directly.",
  examples: [
    "Water evaporates from the ocean, condenses into clouds, falls as rain, and eventually runs back to the ocean.",
    "Carbon dioxide is absorbed by plants during photosynthesis, then released back to the atmosphere through respiration and decomposition.",
    "Nitrogen-fixing bacteria in soil and plant root nodules convert atmospheric nitrogen into a form plants can actually use.",
  ],
  analogy:
    "Unlike energy (which flows through an ecosystem once and is lost as heat), matter is more like a library book — it gets passed around and reused over and over, never actually leaving the system.",
  vocabulary: [
    { term: "Biogeochemical cycle", definition: "The movement of a chemical element or molecule between living organisms and the non-living environment." },
    { term: "Carbon cycle", definition: "The movement of carbon between the atmosphere (as CO₂), plants (via photosynthesis), animals (via feeding), and back to the atmosphere (via respiration and decomposition)." },
    { term: "Nitrogen fixation", definition: "The process by which certain bacteria convert atmospheric nitrogen gas into a usable form for plants." },
    { term: "Respiration", definition: "The process by which organisms release stored energy, releasing CO₂ as a byproduct." },
  ],
  diagramKeys: ["carbon-cycle"],
  meta: draftMeta(),
};
