"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled
            ? "oklch(0.12 0.01 265 / 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled
            ? "blur(16px) saturate(1.4)"
            : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-border-subtle)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            <Image
              src="/zuper-logo.png"
              alt="Zuper"
              width={100}
              height={28}
              priority
            />
          </a>

          <a
            href="#features"
            className="nav-link text-sm font-medium transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Features
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
