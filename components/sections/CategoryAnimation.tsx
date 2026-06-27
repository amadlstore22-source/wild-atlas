"use client";

/* ─────────────────────────────────────────────
   Trekking — lone climber ascending Atlas peaks
   Stars reference the Atlas myth: bearer of the heavens
───────────────────────────────────────────── */
function AtlasTrek() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Twinkling stars */}
      {[
        [15, 12, "2.1s", "0s"],
        [40,  6, "1.7s", "0.4s"],
        [68, 10, "2.5s", "0.8s"],
        [85, 18, "1.9s", "1.2s"],
        [52,  4, "2.3s", "0.6s"],
      ].map(([cx, cy, dur, begin], i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r="1.3" fill="white">
          <animate attributeName="opacity" values="0.85;0.1;0.85" dur={dur as string} begin={begin as string} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Mountain layers */}
      <polygon points="5,85 38,30 71,85" fill="white" opacity="0.10" />
      <polygon points="28,85 65,18 100,85" fill="white" opacity="0.22" />
      {/* Snow cap */}
      <polygon points="65,18 55,42 75,42" fill="white" opacity="0.65" />

      {/* Dotted trail up the peak */}
      <path
        d="M52,82 C54,68 57,56 60,46 C62,38 63,28 65,20"
        stroke="white" strokeWidth="1.2" strokeDasharray="2.5,3" opacity="0.38" fill="none"
      />

      {/* Climber — animates up the trail */}
      <circle r="2.8" fill="white" opacity="0">
        <animate attributeName="cx" values="52;55;58;61;63;65" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        <animate attributeName="cy" values="82;68;55;44;33;20" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        <animate attributeName="opacity" values="0;0.92;0.92;0.92;0.92;0" keyTimes="0;0.05;0.5;0.85;0.95;1" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Hiking — winding path through rolling hills
   with warm Moroccan sun and moving hiker
───────────────────────────────────────────── */
function HikingTrail() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Sun */}
      <circle cx="78" cy="22" r="9" fill="white" opacity="0.82">
        <animate attributeName="opacity" values="0.82;0.95;0.82" dur="2.8s" repeatCount="indefinite" />
      </circle>
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 78 + 12 * Math.cos(rad), y1 = 22 + 12 * Math.sin(rad);
        const x2 = 78 + 17 * Math.cos(rad), y2 = 22 + 17 * Math.sin(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1.5" opacity="0.50">
            <animate attributeName="opacity" values="0.50;0.12;0.50" dur={`${1.6 + i * 0.22}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </line>
        );
      })}

      {/* Rolling hills */}
      <path d="M0,72 Q25,55 50,68 Q75,81 100,66 L100,100 L0,100 Z" fill="white" opacity="0.13" />
      <path d="M0,80 Q20,67 45,75 Q70,83 100,74 L100,100 L0,100 Z" fill="white" opacity="0.22" />

      {/* Winding trail */}
      <path
        d="M12,92 Q28,80 44,83 Q60,86 70,74 Q78,64 85,58"
        stroke="white" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.38" fill="none"
      />

      {/* Hiker dot moving along trail */}
      <circle r="2.8" fill="white" opacity="0">
        <animate attributeName="cx" values="12;28;44;60;70;85" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        <animate attributeName="cy" values="92;80;83;86;74;58" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        <animate attributeName="opacity" values="0;0.92;0.92;0.92;0.92;0" keyTimes="0;0.05;0.5;0.85;0.95;1" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Desert — Saharan night with Moroccan crescent
   and star, camel caravan crossing the dunes
───────────────────────────────────────────── */
function SaharaNight() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Distant stars */}
      {[[12, 10], [28, 6], [42, 14], [18, 20]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1" fill="white">
          <animate attributeName="opacity" values="0.7;0.1;0.7" dur={`${1.4 + i * 0.35}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Crescent moon — C-shape bezier, opens right */}
      <path
        d="M82,10 C70,10 64,17 64,24 C64,31 70,38 82,38 C74,33 72,24 74,17 C76,13 79,10 82,10 Z"
        fill="white" opacity="0.88"
      >
        <animate attributeName="opacity" values="0.88;0.98;0.88" dur="3.5s" repeatCount="indefinite" />
      </path>

      {/* 5-pointed Moroccan star beside crescent */}
      <polygon
        points="55,14 57,19 63,20 58,23 60,29 55,25 50,29 52,23 47,20 53,19"
        fill="white" opacity="0.80"
      >
        <animate attributeName="opacity" values="0.80;0.96;0.80" dur="2.6s" begin="0.5s" repeatCount="indefinite" />
      </polygon>

      {/* Dune shapes */}
      <path d="M0,74 Q25,57 50,70 Q75,83 100,67 L100,100 L0,100 Z" fill="white" opacity="0.14" />
      <path d="M0,82 Q30,70 55,78 Q80,86 100,76 L100,100 L0,100 Z" fill="white" opacity="0.22" />

      {/* Camel with rider — walks right to left */}
      <g>
        <animateTransform attributeName="transform" type="translate" from="110 0" to="-25 0" dur="7s" repeatCount="indefinite" calcMode="linear" />
        {/* Body */}
        <ellipse cx="18" cy="62" rx="10" ry="5.5" fill="white" opacity="0.78" />
        {/* Hump */}
        <ellipse cx="16" cy="54" rx="5" ry="4" fill="white" opacity="0.78" />
        {/* Neck + head */}
        <line x1="25" y1="60" x2="23" y2="55" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.78" />
        <circle cx="25" cy="53" r="3.5" fill="white" opacity="0.78" />
        {/* Rider */}
        <ellipse cx="16" cy="47" rx="4" ry="5" fill="white" opacity="0.55" />
        <circle cx="16" cy="42" r="3" fill="white" opacity="0.55" />
        {/* Legs alternating */}
        <line x1="12" y1="67" x2="10" y2="76" stroke="white" strokeWidth="2" opacity="0.70">
          <animateTransform attributeName="transform" type="rotate" from="-12 12 67" to="12 12 67" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="17" y1="67" x2="15" y2="76" stroke="white" strokeWidth="2" opacity="0.70">
          <animateTransform attributeName="transform" type="rotate" from="12 17 67" to="-12 17 67" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="22" y1="67" x2="20" y2="76" stroke="white" strokeWidth="2" opacity="0.70">
          <animateTransform attributeName="transform" type="rotate" from="-12 22 67" to="12 22 67" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="27" y1="67" x2="25" y2="76" stroke="white" strokeWidth="2" opacity="0.70">
          <animateTransform attributeName="transform" type="rotate" from="12 27 67" to="-12 27 67" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
      </g>

      {/* Sand particles drifting */}
      {[
        { y: 72, dur: "3.2s", begin: "0s" },
        { y: 66, dur: "4.0s", begin: "1.3s" },
        { y: 78, dur: "2.8s", begin: "2.1s" },
      ].map(({ y, dur, begin }, i) => (
        <circle key={i} cx={0} cy={y} r="1.2" fill="white" opacity="0">
          <animateTransform attributeName="transform" type="translate" from="-5 0" to="110 0" dur={dur} begin={begin} repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.50;0.50;0" keyTimes="0;0.12;0.88;1" dur={dur} begin={begin} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Cultural — Moroccan 8-pointed zellige star
   Zellige tilework is Morocco's finest craft tradition
───────────────────────────────────────────── */
function ZelligeStar() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Ambient candle glow */}
      <circle cx="50" cy="50" r="24" fill="#fbbf24" opacity="0.14">
        <animate attributeName="r" values="24;30;24" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.14;0.24;0.14" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* 8-pointed star — slow rotation */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="18s" repeatCount="indefinite" calcMode="linear" />

        {/* Main 8-pointed star */}
        <polygon
          points="50,22 55,39 70,30 61,45 78,50 61,55 70,70 55,61 50,78 45,61 30,70 39,55 22,50 39,45 30,30 45,39"
          fill="white" opacity="0.72"
        />

        {/* Inner zellige octagon outline */}
        <polygon
          points="50,34 58,42 66,50 58,58 50,66 42,58 34,50 42,42"
          fill="none" stroke="white" strokeWidth="0.9" opacity="0.30"
        />

        {/* Lattice lines — cross + diagonals */}
        <line x1="50" y1="22" x2="50" y2="78" stroke="white" strokeWidth="0.7" opacity="0.18" />
        <line x1="22" y1="50" x2="78" y2="50" stroke="white" strokeWidth="0.7" opacity="0.18" />
        <line x1="30" y1="30" x2="70" y2="70" stroke="white" strokeWidth="0.7" opacity="0.18" />
        <line x1="70" y1="30" x2="30" y2="70" stroke="white" strokeWidth="0.7" opacity="0.18" />
      </g>

      {/* Center flame / golden light */}
      <circle cx="50" cy="50" r="6" fill="#fbbf24" opacity="0.92">
        <animate attributeName="r" values="6;8;6" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.92;1;0.92" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Day Tours — Moroccan mint tea glass
   The ritual of Moroccan tea is the heart of any day out
───────────────────────────────────────────── */
function MintTea() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Floor glow */}
      <ellipse cx="50" cy="84" rx="16" ry="4" fill="#fbbf24" opacity="0.18">
        <animate attributeName="opacity" values="0.18;0.10;0.18" dur="2.2s" repeatCount="indefinite" />
      </ellipse>

      {/* Glass body — Moroccan istikane (slightly tapered) */}
      <path d="M38,32 L35,76 L65,76 L62,32 Z" fill="white" opacity="0.18" stroke="white" strokeWidth="1.5" strokeOpacity="0.62" />

      {/* Amber tea fill */}
      <path d="M38.5,44 L36,76 L64,76 L61.5,44 Z" fill="#fbbf24" opacity="0.42">
        <animate attributeName="opacity" values="0.42;0.56;0.42" dur="2.2s" repeatCount="indefinite" />
      </path>

      {/* Gold top rim */}
      <line x1="38" y1="32" x2="62" y2="32" stroke="#fbbf24" strokeWidth="2.5" opacity="0.72" />

      {/* Tea surface */}
      <path d="M38.5,44 Q50,46.5 61.5,44" stroke="white" strokeWidth="1" opacity="0.42" fill="none" />

      {/* Decorative Moroccan band — dashed */}
      <path d="M36.5,60 Q50,62 63.5,60" stroke="white" strokeWidth="0.9" strokeDasharray="4,3" opacity="0.25" fill="none" />

      {/* Base curve */}
      <path d="M35,76 Q50,80 65,76" stroke="white" strokeWidth="2" opacity="0.62" fill="none" />

      {/* Mint sprig resting on rim */}
      <path d="M47,36 Q50,31 53,36" stroke="white" strokeWidth="1.3" fill="white" fillOpacity="0.18" opacity="0.55" />
      <line x1="50" y1="34" x2="50" y2="29" stroke="white" strokeWidth="0.9" opacity="0.38" />

      {/* Steam wisps rising */}
      {[
        { sx: 44, c1x: 41, c2x: 47, ex: 42, dur: "2.3s", begin: "0s" },
        { sx: 50, c1x: 54, c2x: 46, ex: 51, dur: "2.7s", begin: "0.8s" },
        { sx: 56, c1x: 59, c2x: 53, ex: 57, dur: "2.1s", begin: "1.5s" },
      ].map(({ sx, c1x, c2x, ex, dur, begin }, i) => (
        <path
          key={i}
          d={`M${sx},30 Q${c1x},22 ${c2x},16 Q${ex},10 ${ex + 1},5`}
          stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0"
        >
          <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.15;0.75;1" dur={dur} begin={begin} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" from="0 2" to="0 -7" dur={dur} begin={begin} repeatCount="indefinite" additive="sum" />
        </path>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Public switch
───────────────────────────────────────────── */
type CategoryId = "trekking" | "hiking" | "desert" | "day-tours" | "cultural";

export default function CategoryAnimation({ id }: { id: CategoryId | string }) {
  switch (id) {
    case "trekking":   return <AtlasTrek />;
    case "hiking":     return <HikingTrail />;
    case "desert":     return <SaharaNight />;
    case "day-tours":  return <MintTea />;
    case "cultural":   return <ZelligeStar />;
    default:           return null;
  }
}
