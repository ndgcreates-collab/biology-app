// Original labeled data chart (not a stock image) — safe to distribute.
// Deer population over time: stable, then a spike (overshoot) after clearing, then a crash below the original level.
export function PopulationCrashDiagram() {
  return (
    <svg viewBox="0 0 420 270" className="w-full max-w-lg" role="img"
      aria-label="Line graph of deer population over time: steady, then a sharp spike after clearing begins, then a crash to a level far below the original.">
      <title>Deer population after forest clearing</title>

      {/* axes */}
      <line x1="50" y1="20" x2="50" y2="220" stroke="#374151" strokeWidth="2" />
      <line x1="50" y1="220" x2="400" y2="220" stroke="#374151" strokeWidth="2" />
      <text x="16" y="130" fontSize="11" fill="#374151" transform="rotate(-90 16 130)">Deer population</text>
      <text x="200" y="248" fontSize="11" fill="#374151">Time →</text>

      {/* original carrying capacity */}
      <line x1="50" y1="90" x2="400" y2="90" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="250" y="84" fontSize="10" fill="#0369a1">Original carrying capacity</text>

      {/* new, lower carrying capacity */}
      <line x1="50" y1="165" x2="400" y2="165" stroke="#b45309" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="250" y="178" fontSize="10" fill="#b45309">New (lower) carrying capacity</text>

      {/* clearing-begins marker */}
      <line x1="170" y1="20" x2="170" y2="220" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
      <text x="120" y="34" fontSize="10" fill="#6b7280">Clearing begins</text>

      {/* population curve: stable ~90, spike to ~45 (higher = smaller y), crash to ~195 */}
      <path
        d="M50 92 L120 90 L170 90 C 195 60, 215 45, 240 48 C 270 52, 285 150, 320 200 C 345 205, 370 200, 400 200"
        fill="none"
        stroke="#059669"
        strokeWidth="3"
      />
      <circle cx="240" cy="48" r="4" fill="#059669" />
      <text x="205" y="40" fontSize="10" fill="#059669" fontWeight="bold">overshoot</text>
      <circle cx="360" cy="201" r="4" fill="#dc2626" />
      <text x="330" y="218" fontSize="10" fill="#dc2626" fontWeight="bold">crash</text>
    </svg>
  );
}
