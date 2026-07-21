// Original labeled diagram (not a stock image) — safe to distribute.
export function CarbonCycleDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full max-w-lg" role="img"
      aria-label="Carbon cycle: arrows show CO2 moving from the atmosphere into plants by photosynthesis, from plants to animals by feeding, and from animals back to the atmosphere by respiration.">
      <title>Carbon cycle</title>

      {/* atmosphere */}
      <rect x="120" y="10" width="180" height="45" rx="22" fill="#bae6fd" stroke="#0369a1" strokeWidth="1.5" />
      <text x="210" y="32" fontSize="13" fill="#0c4a6e" fontWeight="bold" textAnchor="middle">Atmosphere</text>
      <text x="210" y="47" fontSize="11" fill="#0c4a6e" textAnchor="middle">CO₂</text>

      {/* plant */}
      <rect x="30" y="200" width="140" height="55" rx="10" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5" />
      <text x="100" y="223" fontSize="13" fill="#14532d" fontWeight="bold" textAnchor="middle">Plants</text>
      <text x="100" y="240" fontSize="10" fill="#14532d" textAnchor="middle">(producers)</text>

      {/* animal */}
      <rect x="250" y="200" width="140" height="55" rx="10" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
      <text x="320" y="223" fontSize="13" fill="#78350f" fontWeight="bold" textAnchor="middle">Animals</text>
      <text x="320" y="240" fontSize="10" fill="#78350f" textAnchor="middle">(consumers)</text>

      <defs>
        <marker id="arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
        </marker>
      </defs>

      {/* atmosphere -> plant (photosynthesis) */}
      <path d="M120 45 C 70 90, 70 150, 90 195" fill="none" stroke="#15803d" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <text x="20" y="120" fontSize="11" fill="#15803d" fontWeight="bold">Photosynthesis</text>

      {/* plant -> animal (feeding) */}
      <path d="M172 228 L246 228" fill="none" stroke="#374151" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <text x="180" y="220" fontSize="10" fill="#374151">feeding</text>

      {/* animal -> atmosphere (respiration) */}
      <path d="M330 195 C 350 150, 350 90, 300 48" fill="none" stroke="#b45309" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <text x="345" y="130" fontSize="11" fill="#b45309" fontWeight="bold">Respiration</text>
    </svg>
  );
}
