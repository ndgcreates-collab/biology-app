import { HEARTS_START } from "@/content/survival/schema";

export function HeartsHud({ hearts, max = HEARTS_START }: { hearts: number; max?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${hearts} of ${max} hearts`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < hearts ? "" : "opacity-25 grayscale"}>
          ❤️
        </span>
      ))}
    </div>
  );
}

export function HealthHud({ hp, max = 100 }: { hp: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, Math.round((hp / max) * 100)));
  const color = pct > 50 ? "bg-emerald-500" : pct > 25 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="flex flex-col items-end gap-0.5">
      <div className="flex items-center gap-2" aria-label={`${pct} percent health`}>
        <span className="text-sm">🩸</span>
        <div className="h-3 w-36 overflow-hidden rounded-full bg-gray-200">
          <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-semibold text-gray-600">{Math.max(0, hp)} HP</span>
      </div>
      <span className="text-[10px] text-gray-400">HP = Health Points</span>
    </div>
  );
}
