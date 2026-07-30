// A themed scene that places the student's avatar in the environment.
// The forest visibly degrades (fewer trees, more stumps, hazier sky) as the level rises.
export function SurvivalScene({ order, avatarEmoji }: { order: number; avatarEmoji: string }) {
  const d = Math.min(4, Math.max(0, order - 1)); // devastation 0..4

  const skyTop = ["#bae6fd", "#c7ddf5", "#dfe3e8", "#ecd9c4", "#d8c2ab"][d];
  const skyBottom = ["#dcfce7", "#dbf0cf", "#e6e2d2", "#ece0cd", "#cdb79c"][d];
  const ground = ["#4d7c0f", "#588017", "#6f7a30", "#8a7638", "#8a6a40"][d];
  const treeCount = [6, 5, 3, 2, 1][d];

  // Fixed slots for scenery; the avatar stands in the gap near the middle.
  const slots = [30, 78, 126, 268, 316, 364];

  return (
    <svg viewBox="0 0 400 160" className="w-full rounded-lg" role="img"
      aria-label={`Scene: your avatar in a ${["healthy forest", "forest", "forest being logged", "damaged, thinning forest", "collapsed, barren landscape"][d]}.`}>
      <defs>
        <linearGradient id={`sky-${order}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="160" fill={`url(#sky-${order})`} />
      {/* sun, dimming with devastation */}
      <circle cx="350" cy="30" r="16" fill="#fde68a" opacity={1 - d * 0.18} />
      {/* ground */}
      <rect x="0" y="120" width="400" height="40" fill={ground} />

      {/* trees and stumps */}
      {slots.map((x, i) => {
        if (i < treeCount) {
          return (
            <g key={i}>
              <rect x={x + 8} y="86" width="8" height="36" fill="#7c4a1e" />
              <circle cx={x + 12} cy="82" r="18" fill={d >= 3 ? "#6b8f3a" : "#22a34a"} />
            </g>
          );
        }
        return <rect key={i} x={x + 6} y="112" width="12" height="10" fill="#7c4a1e" />;
      })}

      {/* hazards at higher devastation */}
      {d >= 2 && (
        <g opacity="0.6">
          <circle cx="150" cy="70" r="12" fill="#d1d5db" />
          <circle cx="168" cy="64" r="14" fill="#e5e7eb" />
          <circle cx="185" cy="72" r="11" fill="#d1d5db" />
        </g>
      )}
      {d >= 4 && <text x="60" y="70" fontSize="22">🔥</text>}

      {/* the avatar, standing in the scene */}
      <text x="200" y="128" fontSize="40" textAnchor="middle">{avatarEmoji}</text>
    </svg>
  );
}
