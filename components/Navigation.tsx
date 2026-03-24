"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const isLight = mounted && resolvedTheme === "light";

  const scrolledBg = isLight
    ? "rgba(250, 250, 250, 0.88)"
    : "oklch(0.09 0.012 340 / 0.88)";

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
          background: scrolled ? scrolledBg : "transparent",
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
              src={isLight ? "/zuper-logo-dark.png" : "/zuper-logo.png"}
              alt="Zuper"
              width={100}
              height={28}
              priority
              style={{ height: "auto" }}
            />
          </a>

          <div className="flex items-center gap-5">
            <a
              href="/#features"
              className="nav-link text-sm font-medium transition-colors duration-200"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Features
            </a>

            {mounted && (
              <button
                onClick={() => setTheme(isLight ? "dark" : "light")}
                className="theme-toggle"
                aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
              >
                {isLight ? <Moon size={16} strokeWidth={1.8} /> : <Sun size={16} strokeWidth={1.8} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
