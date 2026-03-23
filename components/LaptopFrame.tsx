"use client";

import { useState, useEffect, useCallback } from "react";

interface LaptopFrameProps {
  src: string;
  title: string;
}

export default function LaptopFrame({ src, title }: LaptopFrameProps) {
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const openFullscreen = useCallback(() => setFullscreen(true), []);
  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  useEffect(() => {
    if (!fullscreen) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFullscreen();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, closeFullscreen]);

  return (
    <>
      <div className="laptop-wrapper">
        <div className="laptop-lid">
          <div className="laptop-camera" />
          <div className="laptop-screen">
            {src ? (
              <>
                {!loaded && <div className="screen-shimmer" />}
                <iframe
                  src={src}
                  title={title}
                  loading="lazy"
                  allow="fullscreen"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    position: "relative",
                    zIndex: 1,
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.6s ease-out",
                  }}
                  onLoad={() => setLoaded(true)}
                />
              </>
            ) : (
              <div className="screen-placeholder">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span
                  className="text-xs font-medium uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Prototype coming soon
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="laptop-base-strip">
          <div className="laptop-indent" />
        </div>
        <div className="laptop-front-edge" />

        {src && (
          <button
            onClick={openFullscreen}
            className="fullscreen-trigger"
            aria-label="Experience in fullscreen"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            <span>Fullscreen</span>
          </button>
        )}
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && (
        <div
          className={`fullscreen-overlay ${fullscreen ? "fullscreen-overlay--open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} fullscreen experience`}
        >
          <div className="fullscreen-header">
            <span className="fullscreen-title">{title}</span>
            <button
              onClick={closeFullscreen}
              className="fullscreen-close"
              aria-label="Close fullscreen"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>Close</span>
            </button>
          </div>

          <iframe
            src={src}
            title={`${title} — fullscreen`}
            allow="fullscreen"
            className="fullscreen-iframe"
          />
        </div>
      )}
    </>
  );
}
