"use client";
import { motion } from "motion/react";
import Link from "next/link";
import AnimateInView from "@/components/ui/AnimateInView";
import type { Locale } from "@/app/[lang]/dictionaries";

// ─────────────────────────────────────────────────────────────
// SCENE 1 — High Atlas Trekking
// Layered mountain silhouettes, snow peaks, group of 3 hikers
// reaching the summit at dawn with stars still visible
// ─────────────────────────────────────────────────────────────
function TrekScene() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Stars */}
      {[[20,18],[48,8],[72,22],[102,6],[138,16],[172,9],[208,21],[244,12],[280,18],[312,8],
        [28,34],[90,28],[158,32],[225,26],[295,30]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%4===0?1.5:1} fill="white">
          <animate attributeName="opacity" values="0.85;0.1;0.85" dur={`${1.8+i*0.22}s`} begin={`${i*0.35}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Dawn glow behind main peak */}
      <ellipse cx="148" cy="115" rx="70" ry="26" fill="#F97316" opacity="0.22">
        <animate attributeName="opacity" values="0.22;0.38;0.22" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="26;34;26" dur="5s" repeatCount="indefinite"/>
      </ellipse>

      {/* Mountains — back to front */}
      <path d="M0,165 L28,112 L58,150 L90,88 L124,134 L162,100 L196,140 L230,105 L264,142 L290,112 L320,130 L320,200 L0,200Z" fill="#1C2E3E"/>
      <path d="M0,174 L36,124 L68,160 L110,96 L148,138 L182,108 L215,144 L248,118 L278,150 L305,122 L320,138 L320,200 L0,200Z" fill="#152415"/>
      <path d="M0,200 L0,158 L34,175 L66,152 L102,104 L136,142 L170,112 L205,148 L238,122 L268,154 L298,130 L320,144 L320,200Z" fill="#0C180C"/>

      {/* Snow cap main peak */}
      <polygon points="102,104 90,128 114,128" fill="white" opacity="0.84"/>
      <ellipse cx="102" cy="112" rx="8" ry="3.5" fill="white" opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.60;0.35" dur="4s" repeatCount="indefinite"/>
      </ellipse>
      {/* Secondary peak snow */}
      <polygon points="170,112 162,130 178,130" fill="white" opacity="0.66"/>

      {/* Pine trees on slope */}
      {[[64,158],[75,165],[84,172],[232,134],[244,142]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`}>
          <polygon points="0,-22 -7,0 7,0" fill="#081508"/>
          <polygon points="0,-30 -9,-9 9,-9" fill="#081508"/>
          <rect x="-2.5" y="0" width="5" height="6" fill="#081508"/>
        </g>
      ))}

      {/* Trail */}
      <path d="M74,198 Q82,180 88,166 Q93,150 97,136 Q100,122 102,112" stroke="#C9852A" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.38" fill="none"/>

      {/* ── HIKER 1 — summit, arms raised ── */}
      <g transform="translate(89,105)">
        {/* Backpack */}
        <rect x="-7" y="-18" width="6" height="12" rx="2" fill="#243D18"/>
        {/* Torso */}
        <path d="M-5,-15 C-5,-8 -4,2 -4,6 L4,6 C4,2 5,-8 5,-15Z" fill="#4B5D3A"/>
        {/* Head */}
        <circle cx="0" cy="-21" r="5" fill="#4B5D3A"/>
        {/* Hat brim */}
        <ellipse cx="0" cy="-25" rx="6.5" ry="1.5" fill="#2D4A20"/>
        {/* Hat crown */}
        <rect x="-4" y="-30" width="8" height="6" rx="3" fill="#2D4A20"/>
        {/* Arms raised — V for victory */}
        <path d="M-5,-10 Q-13,-18 -15,-26" stroke="#4B5D3A" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <animateTransform attributeName="transform" type="rotate" values="0 -5 -10;-5 -5 -10;0 -5 -10;5 -5 -10;0 -5 -10" dur="3s" repeatCount="indefinite" additive="sum"/>
        </path>
        <path d="M5,-10 Q13,-18 15,-26" stroke="#4B5D3A" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <animateTransform attributeName="transform" type="rotate" values="0 5 -10;5 5 -10;0 5 -10;-5 5 -10;0 5 -10" dur="3s" repeatCount="indefinite" additive="sum"/>
        </path>
        {/* Legs */}
        <path d="M-3,6 Q-5,16 -6,25" stroke="#4B5D3A" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M3,6 Q5,16 6,25" stroke="#4B5D3A" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <ellipse cx="-6" cy="25" rx="4.5" ry="2" fill="#1A140A"/>
        <ellipse cx="6" cy="25" rx="4.5" ry="2" fill="#1A140A"/>
      </g>

      {/* ── HIKER 2 — striding with pole ── */}
      <g transform="translate(108,110)">
        <rect x="-7" y="-16" width="6" height="11" rx="2" fill="#2A4020"/>
        <path d="M-4.5,-13 C-4,-7 -3.5,1 -3.5,5 L3.5,5 C3.5,1 4,-7 4.5,-13Z" fill="#3D5A30"/>
        <circle cx="0" cy="-19" r="4.5" fill="#3D5A30"/>
        <ellipse cx="0" cy="-22.5" rx="5.5" ry="1.2" fill="#243520"/>
        <path d="M-4.5,-8 Q-10,-2 -11,6" stroke="#3D5A30" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
        <path d="M4.5,-8 Q10,-2 11,5" stroke="#3D5A30" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
        <line x1="11" y1="5" x2="13" y2="22" stroke="#7A6035" strokeWidth="1.5"/>
        <path d="M-2,5 Q-5,13 -7,22" stroke="#3D5A30" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M2,5 Q5,14 4,21" stroke="#3D5A30" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <ellipse cx="-7" cy="22" rx="4" ry="1.8" fill="#1A140A"/>
        <ellipse cx="4" cy="21" rx="4" ry="1.8" fill="#1A140A"/>
      </g>

      {/* ── HIKER 3 — following ── */}
      <g transform="translate(124,115)">
        <path d="M-4,-12 C-4,-7 -3.5,0 -3.5,4 L3.5,4 C3.5,0 4,-7 4,-12Z" fill="#556B3A"/>
        <circle cx="0" cy="-17" r="4" fill="#556B3A"/>
        <path d="M-4,-8 Q-9,-3 -10,5" stroke="#556B3A" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <line x1="-10" y1="5" x2="-12" y2="18" stroke="#7A6035" strokeWidth="1.5"/>
        <path d="M4,-8 Q8,-3 9,4" stroke="#556B3A" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M-2,4 Q-4,11 -5,19" stroke="#556B3A" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M2,4 Q4,11 5,19" stroke="#556B3A" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <ellipse cx="-5" cy="19" rx="3.5" ry="1.6" fill="#1A140A"/>
        <ellipse cx="5" cy="19" rx="3.5" ry="1.6" fill="#1A140A"/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENE 2 — Sahara Desert Night
// Crescent moon, star field, Berber guide with camel crossing dunes
// ─────────────────────────────────────────────────────────────
function SaharaScene() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Star field */}
      {[[12,10],[28,6],[44,14],[18,22],[60,8],[85,18],[110,6],[140,14],[175,8],[210,18],[245,10],[280,16],[305,8],[240,26],[295,24],[55,28],[130,26],[200,28]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%5===0?1.6:i%3===0?1.2:0.9} fill="white">
          <animate attributeName="opacity" values="0.9;0.15;0.9" dur={`${1.4+i*0.28}s`} begin={`${i*0.38}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Crescent moon — C-shape bezier, opens right */}
      <path d="M288,12 C276,12 270,19 270,26 C270,33 276,40 288,40 C280,35 278,26 280,19 C282,15 285,12 288,12Z" fill="white" opacity="0.92">
        <animate attributeName="opacity" values="0.92;1;0.92" dur="4s" repeatCount="indefinite"/>
      </path>
      {/* 5-pointed star */}
      <polygon points="260,16 262,21 267,22 263,25 264,30 260,27 256,30 257,25 253,22 258,21" fill="white" opacity="0.82">
        <animate attributeName="opacity" values="0.82;0.96;0.82" dur="3.2s" begin="0.6s" repeatCount="indefinite"/>
      </polygon>

      {/* Dunes — back to front */}
      <path d="M0,148 Q50,130 110,142 Q170,155 230,140 Q275,130 320,145 L320,200 L0,200Z" fill="#1C0E04"/>
      <path d="M0,162 Q60,148 120,158 Q180,168 240,152 Q285,142 320,158 L320,200 L0,200Z" fill="#2A1408"/>
      <path d="M0,200 L0,174 Q40,162 80,170 Q130,180 175,168 Q220,158 265,168 Q295,175 320,170 L320,200Z" fill="#3A1C0A"/>

      {/* Sand ripple lines on foreground dune */}
      <path d="M20,188 Q70,182 120,186" stroke="#4A2810" strokeWidth="0.8" opacity="0.50" fill="none"/>
      <path d="M160,176 Q210,170 255,175" stroke="#4A2810" strokeWidth="0.8" opacity="0.50" fill="none"/>

      {/* ── Camel + guide group — slowly crossing ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" from="45 0" to="-15 0" dur="10s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1"/>

        {/* Berber guide in hooded djellaba */}
        <g transform="translate(148, 100)">
          {/* Head */}
          <circle cx="0" cy="0" r="5.5" fill="#120600"/>
          {/* Hood blending into robe */}
          <path d="M-7,3 C-9,8 -10,20 -12,40 C-13,52 -12,65 -10,68 L10,68 C12,65 13,52 12,40 C10,20 9,8 7,3Z" fill="#0D0500"/>
          {/* Robe shoulder drape */}
          <path d="M-7,3 C-12,6 -14,12 -13,18 L-8,18 C-8,12 -7,6 -7,3Z" fill="#0D0500"/>
          <path d="M7,3 C12,6 14,12 13,18 L8,18 C8,12 7,6 7,3Z" fill="#0D0500"/>
          {/* Arm extending toward camel */}
          <path d="M8,12 Q16,10 22,9" stroke="#0D0500" strokeWidth="4" strokeLinecap="round" fill="none"/>
          {/* Rope to camel */}
          <path d="M22,9 Q38,8 52,12" stroke="#6B4820" strokeWidth="1.5" fill="none" opacity="0.80"/>
        </g>

        {/* Camel body */}
        <g transform="translate(208, 115)">
          {/* Body — large horizontal ellipse */}
          <ellipse cx="0" cy="0" rx="22" ry="10" fill="#120600"/>
          {/* Hump */}
          <ellipse cx="-8" cy="-10" rx="9" ry="8" fill="#120600"/>
          {/* Neck curve up to head */}
          <path d="M14,-4 Q18,-14 20,-22" stroke="#120600" strokeWidth="8" strokeLinecap="round" fill="none"/>
          {/* Head */}
          <ellipse cx="20" cy="-26" rx="8" ry="6" fill="#120600"/>
          {/* Snout */}
          <ellipse cx="26" cy="-24" rx="4" ry="3" fill="#120600"/>
          {/* Camel eye */}
          <circle cx="22" cy="-28" r="1.5" fill="#fbbf24" opacity="0.55"/>
          {/* Tail */}
          <path d="M-22,-2 Q-27,-6 -26,-12" stroke="#120600" strokeWidth="3" strokeLinecap="round" fill="none"/>
          {/* Pack/saddle */}
          <ellipse cx="-4" cy="-14" rx="8" ry="5.5" fill="#2A1A08" opacity="0.90"/>
          {/* Legs — slightly staggered for walking pose */}
          <path d="M10,9 L8,26" stroke="#120600" strokeWidth="4.5" strokeLinecap="round"/>
          <path d="M16,9 L18,25" stroke="#120600" strokeWidth="4.5" strokeLinecap="round"/>
          <path d="M-10,9 L-12,26" stroke="#120600" strokeWidth="4.5" strokeLinecap="round"/>
          <path d="M-4,9 L-3,25" stroke="#120600" strokeWidth="4.5" strokeLinecap="round"/>
          {/* Hooves */}
          <ellipse cx="8" cy="26" rx="4" ry="1.8" fill="#120600"/>
          <ellipse cx="18" cy="25" rx="4" ry="1.8" fill="#120600"/>
          <ellipse cx="-12" cy="26" rx="4" ry="1.8" fill="#120600"/>
          <ellipse cx="-3" cy="25" rx="4" ry="1.8" fill="#120600"/>
        </g>
      </g>

      {/* Sand particles blowing */}
      {[[30,165,3.4,0],[85,172,4.2,1.2],[145,158,3.8,0.6],[200,168,2.9,1.8],[265,162,4.0,0.9]].map(([x,y,dur,begin],i)=>(
        <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity="0">
          <animateTransform attributeName="transform" type="translate" from="-8 0" to="100 0" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" calcMode="linear"/>
          <animate attributeName="opacity" values="0;0.45;0.45;0" keyTimes="0;0.1;0.9;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENE 3 — Marrakech Medina Walk
// Moroccan horseshoe archway, minaret, warm sunset,
// group of tourists guided through the arch
// ─────────────────────────────────────────────────────────────
function MedinaScene() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* City rooftop panorama */}
      <path d="M0,100 L0,90 L10,90 L10,80 L20,80 L20,90 L35,90 L35,70 L42,70 L42,90 L55,90 L55,82 L62,82 L62,90 L80,90 L80,78 L88,78 L88,90 L100,90 L100,100Z" fill="#1E0804"/>
      <path d="M218,100 L218,85 L228,85 L228,75 L236,75 L236,85 L250,85 L250,80 L258,80 L258,85 L270,85 L270,88 L282,88 L282,78 L292,78 L292,88 L305,88 L305,82 L312,82 L312,88 L320,88 L320,100Z" fill="#1E0804"/>

      {/* Minaret (right side) */}
      <rect x="268" y="30" width="18" height="70" fill="#2A0E04"/>
      <rect x="265" y="28" width="24" height="5" rx="1" fill="#3A1808"/>
      {/* Minaret balcony detail */}
      <rect x="263" y="55" width="28" height="4" rx="1" fill="#3A1808"/>
      {/* Minaret crown */}
      <rect x="270" y="20" width="14" height="10" rx="2" fill="#2A0E04"/>
      <polygon points="277,10 270,20 284,20" fill="#3A1808"/>
      {/* Crescent on minaret */}
      <path d="M277,7 C274,7 272,9 272,11 C272,13 274,15 277,15 C275,14 274,11 275,9 C276,8 277,7 277,7Z" fill="white" opacity="0.75"/>

      {/* Warm ambient glow through arch */}
      <ellipse cx="160" cy="155" rx="48" ry="30" fill="#F97316" opacity="0.18">
        <animate attributeName="opacity" values="0.18;0.28;0.18" dur="3s" repeatCount="indefinite"/>
      </ellipse>

      {/* Arch — Moroccan horseshoe (compound path with opening) */}
      <path
        fillRule="evenodd"
        d="M74,200 L74,90 C74,56 112,28 160,28 C208,28 246,56 246,90 L246,200 Z
           M100,200 L100,96 C100,74 128,54 160,54 C192,54 220,74 220,96 L220,200 Z"
        fill="#2A0E04"
      />

      {/* Arch decorative border — inner zellige line */}
      <path d="M100,96 C100,74 128,54 160,54 C192,54 220,74 220,96" stroke="#6B2A0A" strokeWidth="2.5" fill="none"/>
      {/* Decorative rosette dots on arch */}
      {[[-52,0],[-48,-20],[-38,-37],[-22,-50],[0,-56],[22,-50],[38,-37],[48,-20],[52,0]].map(([dx,dy],i)=>(
        <circle key={i} cx={160+dx} cy={82+dy} r="2" fill="#8B3A14" opacity="0.70"/>
      ))}

      {/* Hanging lantern inside arch */}
      <g style={{ transformOrigin: "160px 30px" }}>
        <animateTransform attributeName="transform" type="rotate" values="-5 160 30;5 160 30;-5 160 30" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/>
        <line x1="160" y1="29" x2="160" y2="42" stroke="#6B2A0A" strokeWidth="1.5"/>
        {/* Lantern body */}
        <path d="M153,46 Q148,52 150,60 Q160,65 170,60 Q172,52 167,46Z" fill="#3A1A04" stroke="#6B2A0A" strokeWidth="1"/>
        {/* Cap */}
        <path d="M152,46 Q160,42 168,46" fill="#4A2808" stroke="#6B2A0A" strokeWidth="1"/>
        {/* Amber glow */}
        <ellipse cx="160" cy="56" rx="6" ry="7" fill="#fbbf24" opacity="0.40">
          <animate attributeName="opacity" values="0.40;0.70;0.40" dur="1.8s" repeatCount="indefinite"/>
        </ellipse>
        {/* Fringe */}
        {[-5,-2.5,0,2.5,5].map((dx,i)=>(
          <line key={i} x1={160+dx} y1="64" x2={160+dx} y2="70" stroke="#6B2A0A" strokeWidth="1" opacity="0.70"/>
        ))}
      </g>

      {/* ── Tourist group — walking through arch, left to right ── */}
      <g>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="8s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" from="-55 0" to="55 0" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1"/>

        {/* Tourist 1 — guide, front */}
        <g transform="translate(126, 120)">
          <circle cx="0" cy="-20" r="5" fill="#1A0804"/>
          <path d="M-5,-15 C-5,-8 -4,2 -4,7 L4,7 C4,2 5,-8 5,-15Z" fill="#2A1008"/>
          <path d="M-5,-10 Q-10,-4 -11,4" stroke="#2A1008" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
          <path d="M5,-10 Q10,-4 11,5" stroke="#2A1008" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
          <path d="M-3,7 Q-5,16 -6,24" stroke="#2A1008" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M3,7 Q5,16 5,24" stroke="#2A1008" strokeWidth="4" strokeLinecap="round" fill="none"/>
        </g>
        {/* Tourist 2 */}
        <g transform="translate(143, 122)">
          <circle cx="0" cy="-18" r="4.5" fill="#1A0804"/>
          <path d="M-4.5,-14 C-4,-7 -3.5,2 -3.5,6 L3.5,6 C3.5,2 4,-7 4.5,-14Z" fill="#3A1A08"/>
          <rect x="-5.5" y="-14" width="5" height="10" rx="2" fill="#241008"/>
          <path d="M-4.5,-8 Q-10,-3 -11,5" stroke="#3A1A08" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M4.5,-8 Q8,-2 8,5" stroke="#3A1A08" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M-2,6 Q-4,15 -5,22" stroke="#3A1A08" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
          <path d="M2,6 Q5,14 5,22" stroke="#3A1A08" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
        </g>
        {/* Tourist 3 */}
        <g transform="translate(160, 124)">
          <circle cx="0" cy="-17" r="4.5" fill="#1A0804"/>
          <path d="M-4,-13 C-4,-7 -3.5,1 -3.5,5 L3.5,5 C3.5,1 4,-7 4,-13Z" fill="#2A1208"/>
          <path d="M-4,-8 Q-9,-4 -10,4" stroke="#2A1208" strokeWidth="3" strokeLinecap="round" fill="none"/>
          {/* Camera raised */}
          <path d="M4,-8 Q8,-12 9,-15" stroke="#2A1208" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <rect x="7" y="-18" width="6" height="4" rx="1" fill="#1A0804"/>
          <path d="M-2,5 Q-4,14 -5,22" stroke="#2A1208" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
          <path d="M2,5 Q4,13 4,21" stroke="#2A1208" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
        </g>
        {/* Tourist 4 — back */}
        <g transform="translate(176, 122)">
          <circle cx="0" cy="-18" r="4.5" fill="#1A0804"/>
          <path d="M-4,-14 C-4,-7 -3.5,2 -3.5,6 L3.5,6 C3.5,2 4,-7 4,-14Z" fill="#4A2208"/>
          <rect x="-5" y="-13" width="5" height="9" rx="2" fill="#2A1008"/>
          <path d="M-4.5,-8 Q-10,-3 -11,5" stroke="#4A2208" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M4.5,-8 Q9,-3 10,5" stroke="#4A2208" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M-2,6 Q-4,15 -5,22" stroke="#4A2208" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
          <path d="M2,6 Q4,14 5,22" stroke="#4A2208" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
        </g>
      </g>

      {/* Ground shadow inside arch */}
      <ellipse cx="160" cy="196" rx="58" ry="5" fill="#0A0400" opacity="0.40"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENE 4 — Atlantic Coast Surfing (Agadir)
// Ocean wave with surfer, palm tree on shore, seagulls
// ─────────────────────────────────────────────────────────────
function SurfScene() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Horizon + far ocean */}
      <path d="M0,95 L320,95 L320,200 L0,200Z" fill="#0A3A4A"/>
      <line x1="0" y1="95" x2="320" y2="95" stroke="white" strokeWidth="0.8" opacity="0.20"/>

      {/* Light clouds */}
      <ellipse cx="240" cy="40" rx="28" ry="12" fill="white" opacity="0.18">
        <animate attributeName="opacity" values="0.18;0.28;0.18" dur="5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="260" cy="38" rx="20" ry="9" fill="white" opacity="0.14"/>
      <ellipse cx="70" cy="30" rx="22" ry="9" fill="white" opacity="0.15"/>

      {/* Seagulls — fly across sky */}
      <g>
        <animateTransform attributeName="transform" type="translate" from="-40 0" to="380 0" dur="12s" repeatCount="indefinite" calcMode="linear"/>
        <path d="M0,55 Q5,50 10,55" stroke="white" strokeWidth="1.5" fill="none" opacity="0.75"/>
        <path d="M16,48 Q21,43 26,48" stroke="white" strokeWidth="1.5" fill="none" opacity="0.75"/>
        <path d="M8,62 Q12,58 16,62" stroke="white" strokeWidth="1.3" fill="none" opacity="0.55"/>
      </g>

      {/* Palm tree — left shore */}
      <path d="M42,200 Q38,172 36,152 Q34,132 40,110" stroke="#061808" strokeWidth="7" strokeLinecap="round" fill="none"/>
      {/* Fronds */}
      {[[-28,-18],[-20,-28],[-5,-32],[12,-30],[26,-22],[22,-12],[-22,-8]].map(([dx,dy],i)=>(
        <path key={i} d={`M40,110 Q${40+dx/2+3},${110+dy/2} ${40+dx},${110+dy}`} stroke="#081A04" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      ))}
      {/* Coconuts */}
      <circle cx="38" cy="112" r="3.5" fill="#1A0800" opacity="0.75"/>
      <circle cx="43" cy="115" r="3" fill="#1A0800" opacity="0.65"/>

      {/* Distant shore/headland */}
      <path d="M0,100 Q60,88 130,96 L130,200 L0,200Z" fill="#0A2830"/>

      {/* ── WAVE — main cresting wave ── */}
      {/* Wave body */}
      <path d="M80,140 Q120,128 145,118 Q160,110 168,98 Q172,90 168,82 Q164,74 156,76 Q146,80 142,92 Q138,106 140,120 Q145,132 165,138 Q200,148 270,142 L270,200 L80,200Z" fill="#0F5A6A"/>
      {/* Wave face highlight (lighter water) */}
      <path d="M145,118 Q158,108 165,96 Q168,88 165,80 Q160,76 155,80 Q148,86 145,96 Q142,108 145,118Z" fill="#1A7A8A" opacity="0.70"/>
      {/* Wave crest — white water curling over */}
      <path d="M156,76 Q165,66 170,76 Q174,86 168,82 Q162,78 156,76Z" fill="white" opacity="0.90"/>
      {/* Foam streaks on wave face */}
      <path d="M148,100 Q152,90 157,86" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.50" fill="none"/>
      <path d="M142,112 Q147,102 152,98" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" fill="none"/>
      {/* White water at base */}
      <path d="M140,125 Q152,132 168,135 Q184,138 210,136" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.45" fill="none"/>

      {/* Sea spray particles at base */}
      {[[148,138],[154,134],[160,136],[166,133],[172,136],[155,130],[163,128]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.8" fill="white" opacity="0">
          <animate attributeName="cy" values={`${y};${y-22};${y-32}`} dur={`${0.9+i*0.14}s`} begin={`${i*0.18}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.85;0" dur={`${0.9+i*0.14}s`} begin={`${i*0.18}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* ── SURFER — crouching on wave face ── */}
      <g transform="translate(152, 100)">
        {/* Surfboard */}
        <path d="M-16,16 Q0,19 16,16 Q14,14 0,12 Q-14,14 -16,16Z" fill="#C9852A"/>
        <ellipse cx="0" cy="15" rx="14" ry="1.5" fill="#A06820" opacity="0.60"/>
        {/* Lower legs — bent knees */}
        <path d="M-5,11 L-8,5 L-5,2" stroke="#0A0800" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M5,11 L8,5 L5,2" stroke="#0A0800" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Torso — leaning forward into wave */}
        <path d="M-5,2 C-4,-2 -2,-7 0,-9 C2,-7 4,-2 5,2Z" fill="#0A0800"/>
        {/* Head */}
        <circle cx="0" cy="-13" r="4.5" fill="#0A0800"/>
        {/* Hair/helmet detail */}
        <path d="M-4,-16 Q0,-18 4,-16" stroke="#1A0800" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Arms out for balance */}
        <path d="M-4,-4 Q-11,-6 -14,-4" stroke="#0A0800" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
        <path d="M4,-4 Q11,-6 14,-4" stroke="#0A0800" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
      </g>

      {/* Ocean foreground ripples */}
      <path d="M0,165 Q80,160 160,165 Q240,170 320,162" stroke="white" strokeWidth="0.8" opacity="0.18" fill="none"/>
      <path d="M0,178 Q100,172 200,178 Q270,182 320,176" stroke="white" strokeWidth="0.8" opacity="0.14" fill="none"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Card wrapper — entrance fade-up + perpetual float
// ─────────────────────────────────────────────────────────────
function SceneCard({
  children,
  label,
  sub,
  link,
  gradient,
  delay = 0,
  tilt = 0,
}: {
  children: React.ReactNode;
  label: string;
  sub: string;
  link: string;
  gradient: string;
  delay?: number;
  tilt?: number;
}) {
  return (
    // Entrance animation wrapper
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Perpetual float + hover */}
      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        style={{ aspectRatio: "16/10", rotate: tilt }}
        animate={{ y: [0, -13, 0] }}
        transition={{
          y: { duration: 5.5 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay: delay * 0.6 },
        }}
        whileHover={{ y: -20, rotate: 0, scale: 1.04, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      >
        <Link href={link} className="absolute inset-0 block">
          {/* Gradient background */}
          <div className="absolute inset-0" style={{ background: gradient }} />
          {/* Scene SVG */}
          <div className="absolute inset-0">{children}</div>
          {/* Bottom label overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/72 via-black/28 to-transparent p-5 pt-12">
            <p className="text-sunset text-[10px] font-bold uppercase tracking-[0.18em] mb-0.5">{sub}</p>
            <p className="text-white font-serif font-bold text-lg leading-tight">{label}</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
interface Props {
  lang: Locale;
}

export default function ActivityScenes({ lang }: Props) {
  const scenes = [
    {
      label: "High Atlas Trekking",
      sub: "Mountain Adventures",
      link: `/${lang}/categories/trekking`,
      gradient: "linear-gradient(160deg,#081428 0%,#0A1E0A 55%,#1C1000 100%)",
      delay: 0,
      tilt: -1.5,
      Scene: TrekScene,
    },
    {
      label: "Sahara Desert Tours",
      sub: "Desert Expeditions",
      link: `/${lang}/categories/desert`,
      gradient: "linear-gradient(180deg,#050C1C 0%,#0C0804 50%,#281200 100%)",
      delay: 0.15,
      tilt: 1.5,
      Scene: SaharaScene,
    },
    {
      label: "Marrakech Medina Walk",
      sub: "Cultural Experiences",
      link: `/${lang}/categories/cultural`,
      gradient: "linear-gradient(180deg,#0E0400 0%,#300E04 45%,#8B3010 100%)",
      delay: 0.3,
      tilt: 1,
      Scene: MedinaScene,
    },
    {
      label: "Atlantic Coast & Agadir",
      sub: "Day Tours & Excursions",
      link: `/${lang}/categories/day-tours`,
      gradient: "linear-gradient(180deg,#061020 0%,#0A2840 50%,#0A3848 100%)",
      delay: 0.45,
      tilt: -1,
      Scene: SurfScene,
    },
  ];

  return (
    <section className="py-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#0A120A 0%,#0C100A 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateInView variant="fade-up" className="text-center mb-16">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.22em] mb-4">
            From Atlas to Atlantic
          </p>
          <h2
            className="font-serif text-white font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Adventures That Move You
          </h2>
          <p className="text-white/45 text-sm max-w-sm mx-auto leading-relaxed">
            Every landscape. Every culture. Every season. Brought to life by guides who know Morocco from the inside.
          </p>
        </AnimateInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7">
          {scenes.map(({ label, sub, link, gradient, delay, tilt, Scene }) => (
            <SceneCard key={label} label={label} sub={sub} link={link} gradient={gradient} delay={delay} tilt={tilt}>
              <Scene />
            </SceneCard>
          ))}
        </div>
      </div>
    </section>
  );
}
