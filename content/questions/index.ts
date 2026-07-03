import { QuizQuestion } from "../schema";
import { populationDynamicsQuestions } from "./populationDynamics.questions";
import { symbiosisQuestions } from "./symbiosis.questions";
import { energyFlowFoodWebsQuestions } from "./energyFlowFoodWebs.questions";
import { biogeochemicalCyclesQuestions } from "./biogeochemicalCycles.questions";
import { biodiversityHumanImpactQuestions } from "./biodiversityHumanImpact.questions";

export const allQuestions: QuizQuestion[] = [
  ...populationDynamicsQuestions,
  ...symbiosisQuestions,
  ...energyFlowFoodWebsQuestions,
  ...biogeochemicalCyclesQuestions,
  ...biodiversityHumanImpactQuestions,
];

export const getQuestionsForBenchmark = (benchmarkId: string) =>
  allQuestions.filter((q) => q.benchmarkId === benchmarkId);

export const getMixedQuizQuestions = (count = 10): QuizQuestion[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
