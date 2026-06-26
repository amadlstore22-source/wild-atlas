"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

export default function AnimatedNumber({ to, suffix = "", prefix = "", decimals = 0, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const ms = duration * 1000;

    function tick(now: number) {
      const t = Math.min((now - startTime) / ms, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(to * eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, to, duration]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : String(Math.floor(display));

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
