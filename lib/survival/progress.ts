import { survivalLevels } from "@/content/survival";
import { LevelOutcome } from "@/lib/store/useSurvivalStore";

/**
 * A level is unlocked if it's the first level or the previous level was survived.
 */
export function isLevelUnlocked(order: number, outcomes: Record<string, LevelOutcome>): boolean {
  if (order <= 1) return true;
  const prev = survivalLevels.find((l) => l.order === order - 1);
  if (!prev) return false;
  return outcomes[prev.id]?.survived === true;
}
