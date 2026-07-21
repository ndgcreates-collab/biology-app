// Original labeled diagram (not a stock image) — safe to distribute.
export function LogisticGrowthDiagram() {
  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-md" role="img"
      aria-label="Logistic growth curve: an S-shaped curve rising and leveling off at the dashed carrying capacity line, contrasted with an exponential J-curve.">
      <title>Logistic growth curve with carrying capacity</title>
      {/* axes */}
      <line x1="45" y1="20" x2="45" y2="220" stroke="#374151" strokeWidth="2" />
      <line x1="45" y1="220" x2="380" y2="220" stroke="#374151" strokeWidth="2" />
      <text x="18" y="120" fontSize="11" fill="#374151" transform="rotate(-90 18 120)">Population size</text>
      <text x="180" y="245" fontSize="11" fill="#374151">Time</text>

      {/* carrying capacity line */}
      <line x1="45" y1="60" x2="380" y2="60" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" />
      <text x="250" y="52" fontSize="12" fill="#dc2626" fontWeight="bold">Carrying capacity (K)</text>

      {/* exponential (J) curve for contrast */}
      <path d="M45 220 C 150 215, 210 190, 250 40" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 3" />
      <text x="255" y="35" fontSize="11" fill="#6b7280">Exponential (J)</text>

      {/* logistic (S) curve */}
      <path d="M45 218 C 130 216, 150 200, 185 130 C 215 70, 260 62, 380 61"
        fill="none" stroke="#059669" strokeWidth="3" />
      <text x="300" y="80" fontSize="12" fill="#059669" fontWeight="bold">Logistic (S)</text>
    </svg>
  );
}
