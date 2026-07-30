// Original labeled diagram (not a stock image) — safe to distribute.
// Forest food chain with energy decreasing along the arrows.
export function FoodChainDiagram() {
  const links = [
    { icon: "🌱", label: "Grass", role: "Producer" },
    { icon: "🦗", label: "Grasshopper", role: "1° consumer" },
    { icon: "🐸", label: "Frog", role: "2° consumer" },
    { icon: "🐍", label: "Snake", role: "3° consumer" },
  ];
  return (
    <svg viewBox="0 0 460 170" className="w-full max-w-lg" role="img"
      aria-label="Forest food chain: grass to grasshopper to frog to snake, with available energy decreasing at each step.">
      <title>Forest food chain and energy transfer</title>

      <defs>
        <marker id="fcArrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
        </marker>
      </defs>

      {links.map((l, i) => {
        const x = 20 + i * 112;
        return (
          <g key={i}>
            <rect x={x} y="50" width="86" height="70" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x={x + 43} y="82" fontSize="26" textAnchor="middle">{l.icon}</text>
            <text x={x + 43} y="102" fontSize="11" fill="#065f46" fontWeight="bold" textAnchor="middle">{l.label}</text>
            <text x={x + 43} y="115" fontSize="9" fill="#047857" textAnchor="middle">{l.role}</text>
            {i < links.length - 1 && (
              <line x1={x + 88} y1="85" x2={x + 110} y2="85" stroke="#374151" strokeWidth="2" markerEnd="url(#fcArrow)" />
            )}
          </g>
        );
      })}

      <text x="230" y="24" fontSize="13" fill="#b45309" fontWeight="bold" textAnchor="middle">
        Available energy decreases →
      </text>
      <line x1="40" y1="36" x2="420" y2="36" stroke="#b45309" strokeWidth="2" markerEnd="url(#fcArrow)" />
    </svg>
  );
}
