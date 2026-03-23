"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Sparkles, Zap, ArrowRight } from "lucide-react";
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
        <div className="feature-card__inner">
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
