// Original labeled diagram (not a stock image) — safe to distribute.
export function DeforestationDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="w-full max-w-lg" role="img"
      aria-label="Deforestation: a before panel shows a dense forest of many trees; an after panel shows the same land cleared with tree stumps and reduced habitat.">
      <title>Deforestation: before and after</title>

      {/* BEFORE panel */}
      <rect x="10" y="30" width="185" height="160" rx="8" fill="#dcfce7" stroke="#166534" strokeWidth="1.5" />
      <text x="102" y="22" fontSize="12" fill="#166534" fontWeight="bold" textAnchor="middle">Before: dense forest</text>
      {[30, 60, 90, 120, 150, 45, 75, 105, 135, 165].map((x, i) => (
        <g key={i}>
          <rect x={x + 4} y={i < 5 ? 120 : 150} width="6" height="20" fill="#7c4a1e" />
          <circle cx={x + 7} cy={i < 5 ? 118 : 148} r="13" fill="#22c55e" />
        </g>
      ))}

      {/* arrow */}
      <defs>
        <marker id="darrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
        </marker>
      </defs>
      <line x1="200" y1="110" x2="222" y2="110" stroke="#374151" strokeWidth="3" markerEnd="url(#darrow)" />

      {/* AFTER panel */}
      <rect x="228" y="30" width="185" height="160" rx="8" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
      <text x="320" y="22" fontSize="12" fill="#92400e" fontWeight="bold" textAnchor="middle">After: land cleared</text>
      {/* stumps */}
      {[250, 285, 320, 355, 385].map((x) => (
        <g key={x}>
          <rect x={x} y="150" width="8" height="8" fill="#7c4a1e" />
        </g>
      ))}
      <text x="320" y="180" fontSize="10" fill="#92400e" textAnchor="middle">habitat & biodiversity lost</text>
    </svg>
  );
}
