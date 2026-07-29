import { SurvivalLevel } from "./schema";
import { level1 } from "./level1";
import { level2 } from "./level2";
import { level3 } from "./level3";
import { level4 } from "./level4";
import { level5 } from "./level5";

export const survivalLevels: SurvivalLevel[] = [level1, level2, level3, level4, level5];

export const getSurvivalLevel = (id: string) => survivalLevels.find((l) => l.id === id);

export const getSurvivalLevelByOrder = (order: number) =>
  survivalLevels.find((l) => l.order === order);
