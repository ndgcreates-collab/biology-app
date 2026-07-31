export type SceneMood = "idle" | "cheer" | "hurt";

// A themed, game-style scene that places the student's ANIMATED avatar in the
// environment: parallax layers, drifting particles, a character shadow, and a
// vignette frame. The forest visibly degrades as the level rises.
export function SurvivalScene({
  order,
  avatarEmoji,
  mood = "idle",
}: {
  order: number;
  avatarEmoji: string;
  mood?: SceneMood;
}) {
  const d = Math.min(4, Math.max(0, order - 1)); // devastation 0..4

  const skyTop = ["#7dd3fc", "#93c5fd", "#cbd5e1", "#e7cba8", "#c9a982"][d];
  const skyBottom = ["#dcfce7", "#dbf0cf", "#e6e2d2", "#ead6bc", "#b89877"][d];
  const hills = ["#86efac", "#a7d99b", "#c3c9a3", "#cdb894", "#9c8262"][d];
  const treeline = ["#3f9142", "#4a8a3c", "#6f7a3a", "#7c6a38", "#5e4d2e"][d];
  const ground = ["#4d7c0f", "#588017", "#6f7a30", "#8a7638", "#7a5f38"][d];
  const canopy = d >= 3 ? "#6b8f3a" : "#22a34a";
  const treeCount = [6, 5, 3, 2, 1][d];
  const slots = [24, 74, 124, 270, 320, 366];

  const avatarAnim =
    mood === "cheer"
      ? { values: "0 0; 0 -24; 0 0; 0 -12; 0 0", dur: "0.8s" }
      : mood === "hurt"
        ? { values: "0 0; -5 0; 5 0; -4 0; 4 0; 0 0", dur: "0.45s" }
        : { values: "0 0; 0 -5; 0 0", dur: "2s" };

  // Drifting ambient particles: leaves early, ash/embers as it collapses.
  const isEmber = d >= 3;
  const particles = [
    { x: 60, delay: "0s", dur: "6s" },
    { x: 140, delay: "1.5s", dur: "7s" },
    { x: 230, delay: "3s", dur: "6.5s" },
    { x: 300, delay: "0.8s", dur: "7.5s" },
    { x: 360, delay: "2.2s", dur: "6.2s" },
  ];

  return (
    <svg viewBox="0 0 400 170" className="w-full rounded-xl" role="img"
      aria-label={`Scene: your avatar in a ${["healthy forest", "forest", "forest being logged", "damaged, thinning forest", "collapsed, barren landscape"][d]}.`}>
      <defs>
        <linearGradient id={`sky-${order}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
        <radialGradient id={`vig-${order}`} cx="50%" cy="45%" r="75%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="170" fill={`url(#sky-${order})`} />

      {/* sun/moon, dimming with devastation */}
      <circle cx="342" cy="30" r="16" fill={d >= 3 ? "#f59e0b" : "#fde68a"} opacity={1 - d * 0.15}>
        <animate attributeName="r" values="16;17.5;16" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* parallax far hills */}
      <path d="M0 120 Q 70 78 150 116 T 400 108 L400 130 L0 130 Z" fill={hills} opacity="0.7" />
      <path d="M0 128 Q 110 96 220 124 T 400 120 L400 140 L0 140 Z" fill={hills} opacity="0.5" />

      {/* mid treeline silhouette */}
      {Array.from({ length: 14 }).map((_, i) => (
        <circle key={i} cx={12 + i * 30} cy={124} r={10 + (i % 3) * 3} fill={treeline} opacity="0.55" />
      ))}

      {/* ground */}
      <rect x="0" y="128" width="400" height="42" fill={ground} />
      {/* grass tufts / cracked earth */}
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={8 + i * 20} y={d >= 3 ? 150 : 130} width="2" height={d >= 3 ? 2 : 6}
          fill={d >= 3 ? "#5a4428" : "#3f6212"} opacity="0.6" />
      ))}

      {/* foreground trees (swaying) and stumps */}
      {slots.map((x, i) => {
        if (i < treeCount) {
          return (
            <g key={i}>
              <rect x={x + 8} y="90" width="9" height="38" fill="#6b4423" />
              <g>
                <circle cx={x + 12} cy="84" r="20" fill={canopy} />
                <circle cx={x + 4} cy="90" r="13" fill={canopy} opacity="0.9" />
                <circle cx={x + 22} cy="90" r="13" fill={canopy} opacity="0.9" />
                <animateTransform attributeName="transform" type="rotate"
                  values={`-1.5 ${x + 12} 104; 1.5 ${x + 12} 104; -1.5 ${x + 12} 104`}
                  dur={`${3 + (i % 3) * 0.6}s`} repeatCount="indefinite" />
              </g>
            </g>
          );
        }
        return (
          <g key={i}>
            <rect x={x + 6} y="120" width="14" height="10" rx="2" fill="#6b4423" />
            <ellipse cx={x + 13} cy="120" rx="7" ry="2.5" fill="#8a5a30" />
          </g>
        );
      })}

      {/* drifting particles (leaves or embers) */}
      {particles.map((p, i) => (
        <g key={i} style={{ ["--pdx" as string]: `${(i % 2 === 0 ? 1 : -1) * 20}px` }}>
          <rect
            x={p.x}
            y="20"
            width={isEmber ? 3 : 5}
            height={isEmber ? 3 : 4}
            rx={isEmber ? 1.5 : 1}
            fill={isEmber ? "#f97316" : "#65a30d"}
            className="[animation:sv-particle_var(--d)_linear_infinite]"
            style={{ ["--d" as string]: p.dur, animationDelay: p.delay }}
          />
        </g>
      ))}

      {/* soft character shadow */}
      <ellipse cx="200" cy="132" rx="22" ry="5" fill="#000000" opacity="0.18">
        <animate attributeName="rx" values="22;18;22" dur={avatarAnim.dur} repeatCount="indefinite" />
      </ellipse>

      {/* the animated avatar */}
      <g key={mood}>
        <animateTransform attributeName="transform" type="translate"
          values={avatarAnim.values} dur={avatarAnim.dur} repeatCount="indefinite" />
        <text x="200" y="126" fontSize="42" textAnchor="middle">{avatarEmoji}</text>
      </g>

      {/* flickering fire when the ecosystem collapses */}
      {d >= 4 && (
        <text x="52" y="120" fontSize="24">
          🔥
          <animate attributeName="opacity" values="1;0.5;1" dur="0.6s" repeatCount="indefinite" />
        </text>
      )}

      {/* vignette frame for a game-screen look */}
      <rect x="0" y="0" width="400" height="170" fill={`url(#vig-${order})`} pointerEvents="none" />
    </svg>
  );
}
