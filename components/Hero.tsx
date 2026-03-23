"use client";

import { motion } from "framer-motion";
import ParticleField from "./ParticleField";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        <div className="gradient-blob gradient-blob-3" />
      </div>

      <ParticleField />

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

        <motion.h1
          className="mx-auto max-w-4xl font-bold leading-[0.92] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Zuper AI
          <br />
          <span style={{ color: "var(--color-accent)" }}>
            Experience Center
          </span>
        </motion.h1>

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
