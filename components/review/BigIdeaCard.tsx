import Link from "next/link";
import { BigIdea } from "@/content/schema";
import { bigIdeaTheme } from "./theme";

export function BigIdeaCard({ bigIdea, benchmarkCount }: { bigIdea: BigIdea; benchmarkCount: number }) {
  const theme = bigIdeaTheme[bigIdea.colorTheme];
  return (
    <Link
      href={`/review/${bigIdea.id}`}
      className={`block rounded-xl ${theme.bg} p-5 ring-1 ring-inset ${theme.ring} transition hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-wide ${theme.text}`}>
          Big Idea {bigIdea.id}
        </span>
        <span className="text-xs text-gray-500">
          {benchmarkCount} topic{benchmarkCount === 1 ? "" : "s"}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-bold text-gray-900">{bigIdea.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{bigIdea.description}</p>
    </Link>
  );
}
