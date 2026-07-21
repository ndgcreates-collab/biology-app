// Original labeled diagram (not a stock image) — safe to distribute.
export function BiomagnificationDiagram() {
  return (
    <svg viewBox="0 0 420 260" className="w-full max-w-lg" role="img"
      aria-label="Biomagnification: a food chain from water to small fish to large fish to bird, with dots showing toxin concentration increasing at each higher trophic level.">
      <title>Biomagnification up a food chain</title>

      {/* trophic levels with increasing toxin dots */}
      {[
        { x: 20, label: "Water /", label2: "plankton", n: 2, color: "#93c5fd" },
        { x: 120, label: "Small", label2: "fish", n: 5, color: "#6ee7b7" },
        { x: 220, label: "Large", label2: "fish", n: 12, color: "#fcd34d" },
        { x: 320, label: "Bird", label2: "(top)", n: 24, color: "#fca5a5" },
      ].map((lvl, i) => (
        <g key={i}>
          <rect x={lvl.x} y="120" width="80" height="90" rx="8" fill={lvl.color} stroke="#374151" strokeWidth="1" />
          <text x={lvl.x + 40} y="145" fontSize="11" fill="#1f2937" fontWeight="bold" textAnchor="middle">{lvl.label}</text>
          <text x={lvl.x + 40} y="158" fontSize="11" fill="#1f2937" textAnchor="middle">{lvl.label2}</text>
          {Array.from({ length: lvl.n }).map((_, d) => (
            <circle key={d} cx={lvl.x + 12 + (d % 7) * 9} cy={172 + Math.floor(d / 7) * 9} r="2.6" fill="#7f1d1d" />
          ))}
        </g>
      ))}

      <defs>
        <marker id="bmarrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
        </marker>
      </defs>
      {[100, 200, 300].map((x) => (
        <line key={x} x1={x} y1="165" x2={x + 18} y2="165" stroke="#374151" strokeWidth="2" markerEnd="url(#bmarrow)" />
      ))}

      <text x="210" y="35" fontSize="14" fill="#7f1d1d" fontWeight="bold" textAnchor="middle">Toxin concentration increases up the food chain</text>
      <text x="210" y="60" fontSize="11" fill="#374151" textAnchor="middle">(each red dot = accumulated toxin)</text>
      <line x1="40" y1="90" x2="380" y2="90" stroke="#7f1d1d" strokeWidth="2" markerEnd="url(#bmarrow)" />
      <text x="200" y="83" fontSize="10" fill="#7f1d1d" textAnchor="middle">increasing concentration →</text>
    </svg>
  );
}
