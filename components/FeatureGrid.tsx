"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import type { Feature } from "@/lib/features";

export default function FeatureGrid({
  features,
}: {
  features: Feature[];
}) {
  return (
    <section
      id="features"
      className="relative"
      style={{
        paddingTop: "var(--space-xl)",
        paddingBottom: "var(--space-3xl)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12"
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
