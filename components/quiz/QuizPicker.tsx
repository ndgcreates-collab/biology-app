import Link from "next/link";
import { benchmarks } from "@/content/benchmarks";
import { getQuestionsForBenchmark } from "@/content/questions";
import { DraftBadge } from "@/components/shared/DraftBadge";

export function QuizPicker() {
  return (
    <div className="space-y-6">
      <Link
        href="/quiz/mixed"
        className="block rounded-xl bg-emerald-600 p-5 text-white transition hover:bg-emerald-700"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
          Cumulative
        </p>
        <h3 className="mt-1 text-lg font-bold">Mixed Quiz — All Topics</h3>
        <p className="mt-1 text-sm text-emerald-50">
          A random mix of questions sampled across every SC.912.L.17 topic.
        </p>
      </Link>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          By topic
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {benchmarks.map((benchmark) => {
            const count = getQuestionsForBenchmark(benchmark.id).length;
            return (
              <Link
                key={benchmark.id}
                href={`/quiz/${benchmark.id}`}
                className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-gray-900">{benchmark.title}</h4>
                  <DraftBadge meta={benchmark.meta} />
                </div>
                <p className="mt-1 text-xs text-gray-500">{count} questions</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
