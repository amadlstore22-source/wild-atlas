"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { HTMLMotionProps, Variants } from "motion/react";

type Variant = "fade-up" | "fade-in" | "scale-in" | "fade-left" | "fade-right";

const VARIANTS: Record<Variant, Variants> = {
  "fade-up": {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden:  { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  "fade-left": {
    hidden:  { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden:  { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
};

interface Props extends HTMLMotionProps<"div"> {
  variant?: Variant;
  delay?: number;
  duration?: number;
  /** Pass "span", "section", "article", etc. to render a different element */
  as?: keyof typeof motion;
  once?: boolean;
  amount?: number | "some" | "all";
}

export default function AnimateInView({
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  as = "div",
  once = true,
  amount = 0.15,
  children,
  className,
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const Tag = motion[as] as typeof motion.div;
  const v = VARIANTS[variant];

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={v}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
