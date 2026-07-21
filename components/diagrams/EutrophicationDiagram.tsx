// Original labeled diagram (not a stock image) — safe to distribute.
export function EutrophicationDiagram() {
  return (
    <svg viewBox="0 0 420 260" className="w-full max-w-lg" role="img"
      aria-label="Eutrophication: fertilizer runoff from land enters a pond, causing an algal bloom that blocks light and leads to low oxygen and dead fish.">
      <title>Eutrophication of a pond</title>

      {/* land + field */}
      <rect x="0" y="20" width="150" height="90" fill="#d9f99d" />
      <text x="75" y="45" fontSize="11" fill="#3f6212" fontWeight="bold" textAnchor="middle">Farm field</text>
      {/* fertilizer dots */}
      {[30, 55, 80, 105].map((x) => (
        <circle key={x} cx={x} cy="60" r="3" fill="#a16207" />
      ))}
      <text x="75" y="80" fontSize="9" fill="#713f12" textAnchor="middle">fertilizer</text>

      {/* runoff arrow */}
      <defs>
        <marker id="earrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#a16207" />
        </marker>
      </defs>
      <path d="M120 95 C 150 120, 165 130, 185 140" fill="none" stroke="#a16207" strokeWidth="2.5" markerEnd="url(#earrow)" />
      <text x="120" y="120" fontSize="10" fill="#a16207" fontWeight="bold">runoff</text>

      {/* pond water */}
      <rect x="150" y="120" width="270" height="120" fill="#7dd3fc" />
      {/* algal bloom layer */}
      <rect x="150" y="120" width="270" height="26" fill="#4d7c0f" opacity="0.85" />
      <text x="285" y="137" fontSize="11" fill="#ecfccb" fontWeight="bold" textAnchor="middle">Algal bloom (blocks light)</text>

      {/* low oxygen label */}
      <text x="285" y="185" fontSize="12" fill="#0c4a6e" fontWeight="bold" textAnchor="middle">Low oxygen (hypoxia)</text>
      {/* dead fish */}
      <text x="250" y="215" fontSize="18" textAnchor="middle">🐟</text>
      <text x="320" y="220" fontSize="18" textAnchor="middle">🐟</text>
      <text x="285" y="235" fontSize="10" fill="#7f1d1d" textAnchor="middle">fish die from lack of oxygen</text>
    </svg>
  );
}
