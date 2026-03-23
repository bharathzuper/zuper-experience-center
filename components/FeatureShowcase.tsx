"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LaptopFrame from "./LaptopFrame";
import PhoneFrame from "./PhoneFrame";
import type { Feature } from "@/lib/features";

export default function FeatureShowcase({
  features,
}: {
  features: Feature[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const active = features[activeIndex];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") newIndex = (index + 1) % features.length;
    if (e.key === "ArrowLeft")
      newIndex = (index - 1 + features.length) % features.length;
    if (newIndex !== index) {
      e.preventDefault();
      setActiveIndex(newIndex);
      const tabs =
        tabsRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
      tabs?.[newIndex]?.focus();
    }
  };

  return (
    <section
      id="features"
      className="relative"
      style={{
        paddingTop: "var(--space-xl)",
        paddingBottom: "var(--space-3xl)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="mb-3 font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
            }}
          >
            Explore Our Features
          </h2>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            Interactive prototypes you can experience right now.
          </p>
        </motion.div>

        {/* ── Tab bar ── */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Features"
          className="hide-scrollbar mb-10 flex gap-2 overflow-x-auto"
        >
          {features.map((f, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${f.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="relative flex shrink-0 items-center rounded-full px-5 py-3 text-sm font-medium outline-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {/* Animated background pill */}
                {isActive && (
                  <motion.span
                    layoutId="active-tab-bg"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "var(--color-accent-subtle)",
                      border: "1px solid oklch(0.68 0.19 275 / 0.35)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-full transition-colors duration-200"
                    style={{ border: "1px solid var(--color-border)" }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2.5">
                  <span
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        f.status === "available"
                          ? "var(--color-status-live)"
                          : "var(--color-status-soon)",
                      boxShadow:
                        f.status === "available" && isActive
                          ? "0 0 6px var(--color-status-live)"
                          : "none",
                    }}
                  />
                  <span
                    className="transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                    }}
                  >
                    {f.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Feature details + laptop ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <h3
                className="font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h1)",
                  lineHeight: 1.1,
                }}
              >
                {active.title}
              </h3>
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]"
                style={{
                  fontFamily: "var(--font-display)",
                  background:
                    active.status === "available"
                      ? "oklch(0.70 0.17 155 / 0.1)"
                      : "oklch(0.72 0.14 75 / 0.1)",
                  color:
                    active.status === "available"
                      ? "var(--color-status-live)"
                      : "var(--color-status-soon)",
                  border: `1px solid ${
                    active.status === "available"
                      ? "oklch(0.70 0.17 155 / 0.2)"
                      : "oklch(0.72 0.14 75 / 0.2)"
                  }`,
                }}
              >
                <span
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{
                    background:
                      active.status === "available"
                        ? "var(--color-status-live)"
                        : "var(--color-status-soon)",
                  }}
                />
                {active.status === "available"
                  ? "Available Now"
                  : "Coming March 2026"}
              </span>
            </div>

            <p
              className="mb-10 max-w-2xl leading-relaxed"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              {active.description}
            </p>

            <div
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={active.id}
            >
              {active.embedType === "audio" && active.audioUrl ? (
                <PhoneFrame
                  audioUrl={active.audioUrl}
                  title={active.title}
                />
              ) : (
                <LaptopFrame
                  src={active.figmaEmbedUrl}
                  title={active.title}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
