import Link from "next/link";
import { Benchmark } from "@/content/schema";
import { DraftBadge } from "@/components/shared/DraftBadge";

export function BenchmarkDetail({ benchmark }: { benchmark: Benchmark }) {
  return (
    <article>
      <p className="font-mono text-xs text-gray-500">{benchmark.code}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900">{benchmark.title}</h1>
        <DraftBadge meta={benchmark.meta} />
      </div>

      <p className="mt-4 text-gray-700 leading-relaxed">{benchmark.summary}</p>

      {benchmark.analogy && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-inset ring-emerald-200">
          <span className="font-semibold">Think of it like this: </span>
          {benchmark.analogy}
        </div>
      )}

      <h2 className="mt-6 text-lg font-semibold text-gray-900">Examples</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
        {benchmark.examples.map((ex, i) => (
          <li key={i}>{ex}</li>
        ))}
      </ul>

      {benchmark.vocabulary && benchmark.vocabulary.length > 0 && (
        <>
          <h2 className="mt-6 text-lg font-semibold text-gray-900">Key vocabulary</h2>
          <dl className="mt-2 space-y-2">
            {benchmark.vocabulary.map((v) => (
              <div key={v.term} className="rounded-md border border-gray-200 bg-white p-3">
                <dt className="text-sm font-semibold text-gray-900">{v.term}</dt>
                <dd className="text-sm text-gray-600">{v.definition}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      <div className="mt-8">
        <Link
          href={`/quiz/${benchmark.id}`}
          className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Take this topic&apos;s quiz →
        </Link>
      </div>
    </article>
  );
}
