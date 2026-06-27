"use client";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Trekking — snowflakes drifting down a peak
───────────────────────────────────────────── */
function SnowMountain() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Mountain silhouette */}
      <polygon points="60,8 10,78 110,78" fill="white" opacity="0.18" />
      <polygon points="60,8 35,45 85,45" fill="white" opacity="0.30" />
      {/* Snow cap */}
      <polygon points="60,8 47,32 73,32" fill="white" opacity="0.70" />

      {/* Snowflakes — staggered fall */}
      {[
        { cx: 25, cy: 12, r: 2, delay: "0s",    dur: "2.8s" },
        { cx: 50, cy: 5,  r: 1.5, delay: "0.6s", dur: "3.2s" },
        { cx: 75, cy: 10, r: 2,   delay: "1.1s", dur: "2.6s" },
        { cx: 38, cy: 18, r: 1.2, delay: "0.3s", dur: "3.5s" },
        { cx: 88, cy: 15, r: 1.8, delay: "1.8s", dur: "2.9s" },
        { cx: 15, cy: 22, r: 1.3, delay: "2.2s", dur: "3.1s" },
        { cx: 62, cy: 3,  r: 1.6, delay: "0.9s", dur: "2.7s" },
        { cx: 100,cy: 20, r: 1.4, delay: "1.5s", dur: "3.3s" },
      ].map(({ cx, cy, r, delay, dur }, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity="0.85">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`${(i % 3) - 1} 72`}
            dur={dur}
            begin={delay}
            repeatCount="indefinite"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;0.85;0.85;0"
            keyTimes="0;0.1;0.85;1"
            dur={dur}
            begin={delay}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Desert — camel walking loop over dunes
───────────────────────────────────────────── */
function DesertCamel() {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Dune shapes */}
      <ellipse cx="30" cy="72" rx="38" ry="12" fill="white" opacity="0.12" />
      <ellipse cx="90" cy="70" rx="30" ry="10" fill="white" opacity="0.10" />

      {/* Sun */}
      <circle cx="95" cy="18" r="8" fill="#f59e0b" opacity="0.75" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 95 + 11 * Math.cos(rad);
        const y1 = 18 + 11 * Math.sin(rad);
        const x2 = 95 + 15 * Math.cos(rad);
        const y2 = 18 + 15 * Math.sin(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="1.5" opacity="0.60">
            <animate attributeName="opacity" values="0.60;0.20;0.60" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </line>
        );
      })}

      {/* Camel — walks from right to left then loops */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          from="120 0"
          to="-30 0"
          dur="6s"
          repeatCount="indefinite"
          calcMode="linear"
        />
        {/* Body */}
        <ellipse cx="18" cy="55" rx="12" ry="6" fill="white" opacity="0.80" />
        {/* Hump */}
        <ellipse cx="18" cy="46" rx="5" ry="4" fill="white" opacity="0.80" />
        {/* Head */}
        <circle cx="26" cy="48" r="3.5" fill="white" opacity="0.80" />
        {/* Snout */}
        <ellipse cx="29.5" cy="49.5" rx="2" ry="1.2" fill="white" opacity="0.80" />
        {/* Neck */}
        <line x1="24" y1="50" x2="22" y2="54" stroke="white" strokeWidth="2.5" opacity="0.80" />
        {/* Legs — animate stride */}
        <line x1="13" y1="61" x2="11" y2="70" stroke="white" strokeWidth="1.8" opacity="0.80">
          <animateTransform attributeName="transform" type="rotate" from="-12 13 61" to="12 13 61" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="16" y1="61" x2="14" y2="70" stroke="white" strokeWidth="1.8" opacity="0.80">
          <animateTransform attributeName="transform" type="rotate" from="12 16 61" to="-12 16 61" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="21" y1="61" x2="19" y2="70" stroke="white" strokeWidth="1.8" opacity="0.80">
          <animateTransform attributeName="transform" type="rotate" from="-12 21 61" to="12 21 61" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        <line x1="24" y1="61" x2="22" y2="70" stroke="white" strokeWidth="1.8" opacity="0.80">
          <animateTransform attributeName="transform" type="rotate" from="12 24 61" to="-12 24 61" dur="0.5s" repeatCount="indefinite" calcMode="linear" additive="sum" />
        </line>
        {/* Tail */}
        <path d="M6 54 Q2 50 4 46" stroke="white" strokeWidth="1.5" opacity="0.70" fill="none" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Day Tours — sun rising from behind mountains
───────────────────────────────────────────── */
function SunriseMountain() {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Background sky glow */}
      <circle cx="60" cy="80" r="40" fill="#f97316" opacity="0.18" />

      {/* Sun — rises upward, pulses glow */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 22"
          to="0 0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1"
          keyTimes="0;1"
        />
        {/* Glow halo */}
        <circle cx="60" cy="58" r="18" fill="#fbbf24" opacity="0.18">
          <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.18;0.08;0.18" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Sun disk */}
        <circle cx="60" cy="58" r="10" fill="#fbbf24" opacity="0.85">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 60 + 13 * Math.cos(rad);
          const y1 = 58 + 13 * Math.sin(rad);
          const x2 = 60 + 18 * Math.cos(rad);
          const y2 = 58 + 18 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="2" opacity="0.70">
              <animate attributeName="opacity" values="0.70;0.20;0.70" dur="1.8s" begin={`${i * 0.225}s`} repeatCount="indefinite" />
            </line>
          );
        })}
      </g>

      {/* Mountains — in front of sun */}
      <polygon points="0,80 42,28 84,80" fill="white" opacity="0.25" />
      <polygon points="36,80 70,18 104,80" fill="white" opacity="0.30" />
      <polygon points="80,80 105,42 130,80" fill="white" opacity="0.22" />
      {/* Horizon line */}
      <line x1="0" y1="80" x2="120" y2="80" stroke="white" strokeWidth="1" opacity="0.20" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Imperial Cities — tourists photographing
───────────────────────────────────────────── */
function ImperialTourists() {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Arch / doorway */}
      <path d="M30 75 L30 30 Q30 15 50 15 Q70 15 70 30 L70 75" stroke="white" strokeWidth="2" opacity="0.45" fill="none" />
      <line x1="22" y1="75" x2="78" y2="75" stroke="white" strokeWidth="2" opacity="0.35" />
      {/* Decoration on arch */}
      <circle cx="50" cy="22" r="3" fill="white" opacity="0.40" />

      {/* Person 1 — left, holds camera up */}
      <g>
        {/* Body */}
        <circle cx="15" cy="50" r="4" fill="white" opacity="0.75" />
        <line x1="15" y1="54" x2="15" y2="68" stroke="white" strokeWidth="2.5" opacity="0.75" />
        {/* Arm holding camera */}
        <line x1="15" y1="58" x2="21" y2="52" stroke="white" strokeWidth="2" opacity="0.75">
          <animateTransform attributeName="transform" type="rotate" from="0 15 58" to="-10 15 58" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1" additive="sum" />
        </line>
        {/* Camera */}
        <rect x="20" y="49" width="6" height="4" rx="1" fill="white" opacity="0.80">
          <animateTransform attributeName="transform" type="rotate" from="0 23 51" to="-10 23 51" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1" additive="sum" />
        </rect>
        {/* Flash blink */}
        <circle cx="27" cy="47" r="2" fill="#fbbf24" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0.9;0" keyTimes="0;0.7;0.75;0.8;1" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;2;2;4;2" keyTimes="0;0.7;0.75;0.8;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {/* Legs */}
        <line x1="15" y1="68" x2="11" y2="78" stroke="white" strokeWidth="2" opacity="0.70" />
        <line x1="15" y1="68" x2="19" y2="78" stroke="white" strokeWidth="2" opacity="0.70" />
      </g>

      {/* Person 2 — right, slightly taller, raises phone */}
      <g>
        <circle cx="100" cy="46" r="4" fill="white" opacity="0.75" />
        <line x1="100" y1="50" x2="100" y2="64" stroke="white" strokeWidth="2.5" opacity="0.75" />
        {/* Arm with phone */}
        <line x1="100" y1="54" x2="93" y2="46" stroke="white" strokeWidth="2" opacity="0.75">
          <animateTransform attributeName="transform" type="rotate" from="0 100 54" to="8 100 54" dur="2s" begin="0.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1" additive="sum" />
        </line>
        {/* Phone */}
        <rect x="88" y="43" width="4" height="6" rx="0.8" fill="white" opacity="0.80">
          <animateTransform attributeName="transform" type="rotate" from="0 90 46" to="8 90 46" dur="2s" begin="0.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1" additive="sum" />
        </rect>
        {/* Flash */}
        <circle cx="88" cy="41" r="2" fill="#fbbf24" opacity="0">
          <animate attributeName="opacity" values="0;0;0.9;0" keyTimes="0;0.8;0.85;1" dur="3s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;2;4;2" keyTimes="0;0.8;0.85;1" dur="3s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        {/* Legs */}
        <line x1="100" y1="64" x2="96" y2="78" stroke="white" strokeWidth="2" opacity="0.70" />
        <line x1="100" y1="64" x2="104" y2="78" stroke="white" strokeWidth="2" opacity="0.70" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Cultural Tours — Moroccan lantern swaying
───────────────────────────────────────────── */
function CulturalLantern() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Lantern group — sways gently */}
      <g style={{ transformOrigin: "60px 8px" }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="-8 60 8"
          to="8 60 8"
          dur="2.4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          keyTimes="0;0.5;1"
          values="-8 60 8;8 60 8;-8 60 8"
        />
        {/* Chain */}
        <line x1="60" y1="4" x2="60" y2="14" stroke="white" strokeWidth="1.5" opacity="0.60" />

        {/* Top cap */}
        <path d="M50 18 Q60 12 70 18" stroke="white" strokeWidth="1.5" fill="white" opacity="0.55" />
        <rect x="53" y="16" width="14" height="4" rx="2" fill="white" opacity="0.55" />

        {/* Lantern body */}
        <path d="M52 22 Q45 35 48 50 Q60 56 72 50 Q75 35 68 22 Z" fill="white" opacity="0.18" stroke="white" strokeWidth="1.2" />

        {/* Geometric lattice */}
        <line x1="60" y1="22" x2="60" y2="50" stroke="white" strokeWidth="0.8" opacity="0.45" />
        <line x1="48" y1="36" x2="72" y2="36" stroke="white" strokeWidth="0.8" opacity="0.45" />
        <line x1="52" y1="26" x2="68" y2="46" stroke="white" strokeWidth="0.8" opacity="0.30" />
        <line x1="68" y1="26" x2="52" y2="46" stroke="white" strokeWidth="0.8" opacity="0.30" />

        {/* Glow inside */}
        <ellipse cx="60" cy="37" rx="7" ry="8" fill="#fbbf24" opacity="0.40">
          <animate attributeName="opacity" values="0.40;0.70;0.40" dur="1.6s" repeatCount="indefinite" />
        </ellipse>

        {/* Bottom fringe */}
        {[-8, -4, 0, 4, 8].map((dx, i) => (
          <line
            key={i}
            x1={60 + dx}
            y1={52}
            x2={60 + dx}
            y2={60}
            stroke="white"
            strokeWidth="1.2"
            opacity="0.55"
          >
            <animate attributeName="y2" values={`${60};${62};${60}`} dur={`${1.2 + i * 0.15}s`} repeatCount="indefinite" />
          </line>
        ))}
      </g>

      {/* Ambient light spots on floor */}
      {[
        { cx: 40, cy: 78, delay: "0s" },
        { cx: 60, cy: 82, delay: "0.4s" },
        { cx: 80, cy: 76, delay: "0.8s" },
      ].map(({ cx, cy, delay }, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="6" ry="2" fill="#fbbf24" opacity="0.20">
          <animate attributeName="opacity" values="0.20;0.35;0.20" dur="1.6s" begin={delay} repeatCount="indefinite" />
        </ellipse>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Public switch
───────────────────────────────────────────── */
type CategoryId = "trekking" | "desert" | "day-tours" | "cultural";

export default function CategoryAnimation({ id }: { id: CategoryId | string }) {
  switch (id) {
    case "trekking":   return <SnowMountain />;
    case "desert":     return <DesertCamel />;
    case "day-tours":  return <SunriseMountain />;
    case "cultural":   return <CulturalLantern />;
    default:           return null;
  }
}
