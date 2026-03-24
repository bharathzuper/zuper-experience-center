"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import DotGrid from "./DotGrid";

const ACCENT_TEXT = "Experience Center";
const SPLIT_DELAY_BASE = 0.55;
const CHAR_STAGGER = 0.03;

function GradientSplitText({
  text,
  colors,
  animationSpeed = 6,
  charBaseDelay = 0,
}: {
  text: string;
  colors: string[];
  animationSpeed?: number;
  charBaseDelay?: number;
}) {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const dur = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    elapsedRef.current += time - lastTimeRef.current;
    lastTimeRef.current = time;
    const cycle = dur * 2;
    const t = elapsedRef.current % cycle;
    progress.set(
      t < dur ? (t / dur) * 100 : 100 - ((t - dur) / dur) * 100
    );
  });

  const bgPos = useTransform(progress, (p) => `${p}% 50%`);
  const gradientColors = [...colors, colors[0]].join(", ");

  return (
    <span style={{ display: "inline" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
          }}
        >
          <motion.span
            style={{
              display: "inline-block",
              backgroundImage: `linear-gradient(to right, ${gradientColors})`,
              backgroundSize: `${text.length * 0.6}em 100%`,
              backgroundPosition: bgPos,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              willChange: "transform",
            }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.7,
              delay: charBaseDelay + i * CHAR_STAGGER,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  const gradientColors = isLight
    ? ["#F75B31", "#E8553D", "#FF8C42", "#F75B31"]
    : ["#c44a90", "#a855f7", "#ff6b9d", "#c44a90"];

  return (
    <section className="hero-noise relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        <div className="gradient-blob gradient-blob-3" />
      </div>

      <DotGrid
        dotSize={5}
        gap={20}
        baseColor={isLight ? "#E4DCD3" : "#2a1525"}
        activeColor={isLight ? "#F75B31" : "#c44a90"}
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        returnDuration={1.5}
        className="!absolute inset-0"
        style={{ zIndex: 1, pointerEvents: "auto" }}
      />

      <div className="relative z-10 px-6 text-center">
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em]"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-secondary)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Welcome to
        </motion.p>

        <h1
          className="mx-auto max-w-4xl font-bold leading-[0.92] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display)",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Zuper AI
          </motion.span>
          <br />
          <GradientSplitText
            text={ACCENT_TEXT}
            colors={gradientColors}
            animationSpeed={6}
            charBaseDelay={SPLIT_DELAY_BASE}
          />
        </h1>

        <motion.p
          className="mx-auto mt-6 max-w-lg leading-relaxed"
          style={{
            fontSize: "var(--text-body)",
            color: "var(--color-text-secondary)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Explore the latest AI-powered features transforming field service
          management. Interact with live prototypes below.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full p-1.5"
          style={{ border: "1.5px solid var(--color-border)" }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-accent)" }}
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
