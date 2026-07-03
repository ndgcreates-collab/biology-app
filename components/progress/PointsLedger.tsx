"use client";

import { useProgressStore } from "@/lib/store/useProgressStore";

export function PointsLedger() {
  const transactions = useProgressStore((s) => s.transactions);
  const recent = [...transactions].reverse().slice(0, 15);

  if (recent.length === 0) {
    return <p className="text-sm text-gray-500">No activity yet — take a quiz to start earning points.</p>;
  }

  return (
    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
      {recent.map((t) => (
        <li key={t.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
          <span className="text-gray-700">{t.reason}</span>
          <span className={`font-semibold ${t.amount >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
            {t.amount >= 0 ? "+" : ""}
            {t.amount}
          </span>
        </li>
      ))}
    </ul>
  );
}
