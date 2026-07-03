export function ProgressBar({
  value,
  max,
  colorClassName = "bg-emerald-500",
}: {
  value: number;
  max: number;
  colorClassName?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className={`h-full rounded-full ${colorClassName} transition-all`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
