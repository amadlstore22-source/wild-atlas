"use client";

/* ─────────────────────────────────────────────
   Trekking — mountain with snowflakes falling
───────────────────────────────────────────── */
function SnowMountain() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Mountain body */}
      <polygon points="50,12 8,82 92,82" fill="white" opacity="0.22" />
      {/* Snow cap */}
      <polygon points="50,12 36,38 64,38" fill="white" opacity="0.75" />
      {/* Ridge line */}
      <polyline points="8,82 50,12 92,82" stroke="white" strokeWidth="1.5" opacity="0.40" fill="none" />

      {/* Snowflakes */}
      {[
        { x: 20, startY: -8, dur: "2.8s", delay: "0s",   size: 3 },
        { x: 38, startY: -5, dur: "3.3s", delay: "0.7s", size: 2 },
        { x: 55, startY: -10,dur: "2.6s", delay: "0.2s", size: 2.5 },
        { x: 70, startY: -6, dur: "3.0s", delay: "1.2s", size: 2 },
        { x: 82, startY: -9, dur: "2.9s", delay: "0.5s", size: 3 },
        { x: 30, startY: -4, dur: "3.4s", delay: "1.8s", size: 1.8 },
        { x: 62, startY: -7, dur: "2.7s", delay: "1.0s", size: 2.2 },
        { x: 45, startY: -3, dur: "3.1s", delay: "2.2s", size: 1.5 },
      ].map(({ x, startY, dur, delay, size }, i) => (
        <g key={i}>
          {/* 6-pointed snowflake */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.05;0.85;1" dur={dur} begin={delay} repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" from={`${x} ${startY}`} to={`${x + (i % 2 === 0 ? 3 : -3)} 105`} dur={dur} begin={delay} repeatCount="indefinite" calcMode="linear" />
            <line x1="0" y1={-size} x2="0" y2={size} stroke="white" strokeWidth="1" />
            <line x1={-size * 0.866} y1={-size * 0.5} x2={size * 0.866} y2={size * 0.5} stroke="white" strokeWidth="1" />
            <line x1={size * 0.866} y1={-size * 0.5} x2={-size * 0.866} y2={size * 0.5} stroke="white" strokeWidth="1" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Desert — camel walking past a cactus on dunes
───────────────────────────────────────────── */
function DesertCamel() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Sun */}
      <circle cx="95" cy="22" r="9" fill="#fbbf24" opacity="0.80" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={i}
            x1={95 + 12 * Math.cos(rad)} y1={22 + 12 * Math.sin(rad)}
            x2={95 + 17 * Math.cos(rad)} y2={22 + 17 * Math.sin(rad)}
            stroke="#fbbf24" strokeWidth="1.5" opacity="0.60"
          >
            <animate attributeName="opacity" values="0.60;0.15;0.60" dur="2s" begin={`${i * 0.33}s`} repeatCount="indefinite" />
          </line>
        );
      })}

      {/* Dune hills */}
      <ellipse cx="30" cy="78" rx="38" ry="14" fill="white" opacity="0.15" />
      <ellipse cx="90" cy="76" rx="32" ry="11" fill="white" opacity="0.12" />
      {/* Ground line */}
      <line x1="0" y1="76" x2="120" y2="76" stroke="white" strokeWidth="1" opacity="0.25" />

      {/* Cactus (static, left side) */}
      <line x1="18" y1="76" x2="18" y2="44" stroke="white" strokeWidth="3" opacity="0.70" strokeLinecap="round" />
      <line x1="18" y1="56" x2="10" y2="50" stroke="white" strokeWidth="2.5" opacity="0.70" strokeLinecap="round" />
      <line x1="10" y1="50" x2="10" y2="44" stroke="white" strokeWidth="2.5" opacity="0.70" strokeLinecap="round" />
      <line x1="18" y1="62" x2="28" y2="56" stroke="white" strokeWidth="2.5" opacity="0.70" strokeLinecap="round" />
      <line x1="28" y1="56" x2="28" y2="50" stroke="white" strokeWidth="2.5" opacity="0.70" strokeLinecap="round" />

      {/* Camel walking right-to-left, looping */}
      <g>
        <animateTransform attributeName="transform" type="translate" from="130 0" to="-40 0" dur="7s" repeatCount="indefinite" calcMode="linear" />

        {/* Body */}
        <ellipse cx="60" cy="60" rx="14" ry="7" fill="white" opacity="0.82" />
        {/* Hump */}
        <ellipse cx="60" cy="51" rx="6" ry="5" fill="white" opacity="0.82" />
        {/* Neck */}
        <path d="M70 56 Q74 50 72 46" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.82" />
        {/* Head */}
        <ellipse cx="72" cy="44" rx="4.5" ry="3.5" fill="white" opacity="0.82" />
        {/* Snout */}
        <ellipse cx="76" cy="45.5" rx="2.5" ry="1.5" fill="white" opacity="0.82" />
        {/* Eye */}
        <circle cx="74" cy="42.5" r="0.8" fill="#1a1a1a" opacity="0.60" />
        {/* Tail */}
        <path d="M46 58 Q42 54 44 50" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.60" />

        {/* Legs — front pair and back pair, alternating stride */}
        <line x1="53" y1="67" x2="50" y2="78" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.82">
          <animateTransform attributeName="transform" type="rotate" from="-14 53 67" to="14 53 67" dur="0.55s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="57" y1="67" x2="54" y2="78" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.82">
          <animateTransform attributeName="transform" type="rotate" from="14 57 67" to="-14 57 67" dur="0.55s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="64" y1="67" x2="61" y2="78" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.82">
          <animateTransform attributeName="transform" type="rotate" from="14 64 67" to="-14 64 67" dur="0.55s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="68" y1="67" x2="65" y2="78" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.82">
          <animateTransform attributeName="transform" type="rotate" from="-14 68 67" to="14 68 67" dur="0.55s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Day Tours — sun rising from behind mountains
───────────────────────────────────────────── */
function SunriseMountain() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Horizon glow */}
      <ellipse cx="60" cy="76" rx="55" ry="18" fill="#f97316" opacity="0.20" />

      {/* Sun — animates upward in a loop */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 28; 0 0; 0 28"
          keyTimes="0;0.45;1"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        />
        {/* Glow ring */}
        <circle cx="60" cy="62" r="20" fill="#fbbf24" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.28;0.15" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Sun disk */}
        <circle cx="60" cy="62" r="11" fill="#fbbf24" opacity="0.90" />
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={i}
              x1={60 + 14 * Math.cos(rad)} y1={62 + 14 * Math.sin(rad)}
              x2={60 + 20 * Math.cos(rad)} y2={62 + 20 * Math.sin(rad)}
              stroke="#fbbf24" strokeWidth="2" opacity="0.65"
            >
              <animate attributeName="opacity" values="0.65;0.20;0.65" dur="1.6s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </line>
          );
        })}
      </g>

      {/* Mountains (in front of sun) */}
      <polygon points="0,90 38,30 76,90" fill="white" opacity="0.28" />
      <polygon points="44,90 74,20 104,90" fill="white" opacity="0.34" />
      <polygon points="85,90 108,46 131,90" fill="white" opacity="0.22" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Imperial Cities — figures photographing arch
───────────────────────────────────────────── */
function ImperialTourists() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Ornate arch */}
      <path d="M35 98 L35 42 Q35 18 60 18 Q85 18 85 42 L85 98" stroke="white" strokeWidth="2" opacity="0.50" fill="none" />
      {/* Arch inner detail */}
      <path d="M42 98 L42 44 Q42 26 60 26 Q78 26 78 44 L78 98" stroke="white" strokeWidth="1" opacity="0.25" fill="none" />
      {/* Keystone */}
      <circle cx="60" cy="20" r="4" fill="white" opacity="0.40" />
      {/* Arch base line */}
      <line x1="25" y1="98" x2="95" y2="98" stroke="white" strokeWidth="1.5" opacity="0.30" />

      {/* Person 1 — left, camera raised */}
      <g>
        {/* Head */}
        <circle cx="16" cy="55" r="4.5" fill="white" opacity="0.78" />
        {/* Body */}
        <line x1="16" y1="60" x2="16" y2="76" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.78" />
        {/* Arm holding camera — animates up/down slightly */}
        <line x1="16" y1="65" x2="24" y2="58" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.78">
          <animateTransform attributeName="transform" type="rotate" from="0 16 65" to="-8 16 65" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" values="0 16 65;-8 16 65;0 16 65" additive="sum" />
        </line>
        {/* Camera body */}
        <rect x="23" y="55" width="7" height="5" rx="1" fill="white" opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" from="0 26 57" to="-8 26 57" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" values="0 26 57;-8 26 57;0 26 57" additive="sum" />
        </rect>
        {/* Camera lens */}
        <circle cx="24" cy="57" r="1.5" fill="#1a1a1a" opacity="0.50">
          <animateTransform attributeName="transform" type="rotate" from="0 26 57" to="-8 26 57" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" values="0 26 57;-8 26 57;0 26 57" additive="sum" />
        </circle>
        {/* Camera flash */}
        <circle cx="31" cy="53" r="3" fill="#fbbf24" opacity="0">
          <animate attributeName="opacity" values="0;0;0;1;0" keyTimes="0;0.65;0.70;0.75;1" dur="3s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;3;3;6;3" keyTimes="0;0.65;0.70;0.75;1" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Legs */}
        <line x1="16" y1="76" x2="12" y2="90" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.70" />
        <line x1="16" y1="76" x2="20" y2="90" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.70" />
      </g>

      {/* Person 2 — right, phone raised */}
      <g>
        <circle cx="104" cy="52" r="4.5" fill="white" opacity="0.78" />
        <line x1="104" y1="57" x2="104" y2="73" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.78" />
        {/* Arm with phone */}
        <line x1="104" y1="62" x2="96" y2="54" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.78">
          <animateTransform attributeName="transform" type="rotate" from="0 104 62" to="8 104 62" dur="2.2s" begin="0.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" values="0 104 62;8 104 62;0 104 62" additive="sum" />
        </line>
        {/* Phone */}
        <rect x="91" y="50" width="5" height="8" rx="1" fill="white" opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" from="0 93 54" to="8 93 54" dur="2.2s" begin="0.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" values="0 93 54;8 93 54;0 93 54" additive="sum" />
        </rect>
        {/* Flash */}
        <circle cx="91" cy="48" r="3" fill="#fbbf24" opacity="0">
          <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.80;0.85;1" dur="3.5s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;3;6;3" keyTimes="0;0.80;0.85;1" dur="3.5s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        <line x1="104" y1="73" x2="100" y2="90" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.70" />
        <line x1="104" y1="73" x2="108" y2="90" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.70" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Cultural Tours — Moroccan lantern swaying
───────────────────────────────────────────── */
function CulturalLantern() {
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Lantern swings from top center */}
      <g style={{ transformOrigin: "50px 6px" }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-10 50 6; 10 50 6; -10 50 6"
          keyTimes="0;0.5;1"
          dur="2.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />

        {/* Hanging chain */}
        <line x1="50" y1="4" x2="50" y2="16" stroke="white" strokeWidth="1.5" opacity="0.55" />

        {/* Top cap */}
        <path d="M40 20 Q50 13 60 20 L62 24 L38 24 Z" fill="white" opacity="0.60" />

        {/* Lantern body */}
        <path d="M40 24 Q32 40 35 62 Q50 70 65 62 Q68 40 60 24 Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5" opacity="0.55" />

        {/* Geometric lattice lines */}
        <line x1="50" y1="24" x2="50" y2="62" stroke="white" strokeWidth="0.8" opacity="0.45" />
        <line x1="36" y1="43" x2="64" y2="43" stroke="white" strokeWidth="0.8" opacity="0.45" />
        <line x1="40" y1="30" x2="62" y2="56" stroke="white" strokeWidth="0.8" opacity="0.28" />
        <line x1="60" y1="30" x2="38" y2="56" stroke="white" strokeWidth="0.8" opacity="0.28" />
        {/* Star centre */}
        <circle cx="50" cy="43" r="3" fill="white" opacity="0.35" />

        {/* Warm glow inside */}
        <ellipse cx="50" cy="44" rx="10" ry="12" fill="#fbbf24" opacity="0.35">
          <animate attributeName="opacity" values="0.35;0.65;0.35" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="ry" values="12;14;12" dur="1.5s" repeatCount="indefinite" />
        </ellipse>

        {/* Bottom cap */}
        <path d="M38 62 L62 62 Q60 66 50 68 Q40 66 38 62 Z" fill="white" opacity="0.50" />

        {/* Hanging fringe tassels */}
        {[-8, -4, 0, 4, 8].map((dx, i) => (
          <g key={i}>
            <line x1={50 + dx} y1="68" x2={50 + dx} y2="80" stroke="white" strokeWidth="1.2" opacity="0.55">
              <animate attributeName="y2" values="80;84;80" dur={`${1.1 + i * 0.12}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
            </line>
            <circle cx={50 + dx} cy="80" r="1.5" fill="white" opacity="0.55">
              <animate attributeName="cy" values="80;84;80" dur={`${1.1 + i * 0.12}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
            </circle>
          </g>
        ))}
      </g>

      {/* Floor light pools */}
      {[{ cx: 32, cy: 98 }, { cx: 50, cy: 104 }, { cx: 68, cy: 98 }].map(({ cx, cy }, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="8" ry="2.5" fill="#fbbf24" opacity="0.22">
          <animate attributeName="opacity" values="0.22;0.40;0.22" dur="1.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Public switch
───────────────────────────────────────────── */
export default function CategoryAnimation({ id }: { id: string }) {
  switch (id) {
    case "trekking":  return <SnowMountain />;
    case "desert":    return <DesertCamel />;
    case "day-tours": return <SunriseMountain />;
    case "imperial":  return <ImperialTourists />;
    case "cultural":  return <CulturalLantern />;
    default:          return null;
  }
}
