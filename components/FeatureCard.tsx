"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Sparkles, Zap, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import type { Feature, FeatureIcon } from "@/lib/features";

const iconMap: Record<FeatureIcon, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  phone: Phone,
  sparkles: Sparkles,
  zap: Zap,
};

export default function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const isLive = feature.status === "available";
  const Icon = iconMap[feature.icon];
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (resolvedTheme !== "light" && glowRef.current) {
      glowRef.current.style.setProperty("--glow-x", `${x}px`);
      glowRef.current.style.setProperty("--glow-y", `${y}px`);
      glowRef.current.style.opacity = "1";
    }
    if (resolvedTheme === "light" && shineRef.current) {
      shineRef.current.style.setProperty("--shine-x", `${x}px`);
      shineRef.current.style.setProperty("--shine-y", `${y}px`);
      shineRef.current.style.opacity = "1";
    }
  }, [resolvedTheme]);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/features/${feature.id}`}
        className="feature-card group block"
      >
        <div
          ref={cardRef}
          className="feature-card__inner"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={glowRef}
            className="feature-card__glow"
            aria-hidden="true"
          />
          <div
            ref={shineRef}
            className="feature-card__shine"
            aria-hidden="true"
          />
          <div className="feature-card__header">
            <div className="feature-card__icon">
              <Icon size={22} strokeWidth={1.6} />
            </div>
            <span
              className="feature-card__badge"
              data-status={feature.status}
            >
              <span className="feature-card__badge-dot" data-status={feature.status} />
              {isLive ? "Live" : "Coming Soon"}
            </span>
          </div>

          <h3 className="feature-card__title">{feature.title}</h3>
          <p className="feature-card__desc">{feature.description}</p>

          <div className="feature-card__cta">
            <span>Experience</span>
            <ArrowRight size={16} strokeWidth={2} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
