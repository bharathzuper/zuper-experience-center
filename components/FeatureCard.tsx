"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Feature, FeatureIcon } from "@/lib/features";

function FeatureIconSvg({ icon }: { icon: FeatureIcon }) {
  const props = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "phone":
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M12 2a6 6 0 0 0-6 6c0 1.66.68 3.16 1.76 4.24L12 16.49l4.24-4.25A5.98 5.98 0 0 0 18 8a6 6 0 0 0-6-6z" />
          <path d="M12 16.49V22" />
          <path d="M8 22h8" />
          <circle cx="12" cy="8" r="2" />
        </svg>
      );
    case "zap":
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
  }
}

export default function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const isLive = feature.status === "available";

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
              <FeatureIconSvg icon={feature.icon} />
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
