import { Benchmark } from "../schema";
import { populationDynamics } from "./populationDynamics";
import { symbiosis } from "./symbiosis";
import { energyFlowFoodWebs } from "./energyFlowFoodWebs";
import { biogeochemicalCycles } from "./biogeochemicalCycles";
import { biodiversityHumanImpact } from "./biodiversityHumanImpact";

export const benchmarks: Benchmark[] = [
  populationDynamics,
  symbiosis,
  energyFlowFoodWebs,
  biogeochemicalCycles,
  biodiversityHumanImpact,
];

export const getBenchmark = (id: string) => benchmarks.find((b) => b.id === id);

export const getBenchmarksByBigIdea = (bigIdeaId: string) =>
  benchmarks.filter((b) => b.bigIdeaId === bigIdeaId);
