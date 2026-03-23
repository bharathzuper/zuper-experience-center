"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface PhoneFrameProps {
  audioUrl: string;
  title: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PhoneFrame({ audioUrl, title }: PhoneFrameProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [isPlaying]);

  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => handleEnd();

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [handleEnd]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = isMuted;
  }, [isMuted]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="phone-frame-container">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="phone-frame">
        {/* Side buttons */}
        <div className="phone-side-btn phone-side-btn--silent" />
        <div className="phone-side-btn phone-side-btn--vol-up" />
        <div className="phone-side-btn phone-side-btn--vol-down" />
        <div className="phone-side-btn phone-side-btn--power" />

        <div className="phone-screen">
          {/* Dynamic Island */}
          <div className="phone-dynamic-island">
            <div className="phone-island-camera" />
          </div>

          {/* Call UI */}
          <div className="phone-call-ui">
            {/* Status bar */}
            <div className="phone-status-bar">
              <span className="phone-status-time">9:41</span>
              <div className="phone-status-icons">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                  <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.4" />
                  <rect x="4.5" y="4" width="3" height="8" rx="0.5" opacity="0.6" />
                  <rect x="9" y="1.5" width="3" height="10.5" rx="0.5" opacity="0.8" />
                  <rect x="13" y="0" width="3" height="12" rx="0.5" />
                </svg>
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="0.6" y="1" width="14" height="10" rx="2" />
                  <rect x="15.5" y="4" width="2" height="4" rx="0.5" fill="currentColor" stroke="none" />
                  <rect x="2" y="2.5" width="8" height="7" rx="1" fill="currentColor" stroke="none" opacity="0.7" />
                </svg>
              </div>
            </div>

            {/* Contact section */}
            <div className="phone-contact">
              <div className="phone-avatar">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="phone-caller-name">Zuper AI</h3>
              <p className="phone-call-status">
                {isPlaying
                  ? formatTime(currentTime)
                  : currentTime > 0
                    ? `Call ended · ${formatTime(currentTime)}`
                    : "Tap play to hear the call"}
              </p>
            </div>

            {/* Waveform visualization */}
            <div className="phone-waveform-section">
              <button
                onClick={togglePlay}
                className="phone-play-btn"
                aria-label={isPlaying ? "Pause call recording" : "Play call recording"}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                )}
              </button>

              <div className="phone-waveform">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className={`phone-waveform-bar ${isPlaying ? "phone-waveform-bar--active" : ""}`}
                    style={{
                      animationDelay: `${i * 0.06}s`,
                      height: isPlaying ? undefined : "3px",
                    }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="phone-progress-track">
                <div
                  className="phone-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="phone-time-labels">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
              </div>
            </div>

            {/* Call controls */}
            <div className="phone-controls">
              <button
                className={`phone-control-btn ${isMuted ? "phone-control-btn--active" : ""}`}
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23" style={{ display: isMuted ? "block" : "none" }} />
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" style={{ display: isMuted ? "block" : "none" }} />
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" style={{ display: isMuted ? "none" : "block" }} />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
                <span className="phone-control-label">mute</span>
              </button>

              <button className="phone-control-btn" aria-label="Keypad">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="19" cy="5" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="19" cy="19" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                <span className="phone-control-label">keypad</span>
              </button>

              <button
                className={`phone-control-btn ${isSpeaker ? "phone-control-btn--active" : ""}`}
                onClick={() => setIsSpeaker(!isSpeaker)}
                aria-label={isSpeaker ? "Speaker off" : "Speaker on"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                <span className="phone-control-label">speaker</span>
              </button>
            </div>

            {/* End call button */}
            <div className="phone-end-call-row">
              <button
                className="phone-end-call-btn"
                onClick={() => {
                  const audio = audioRef.current;
                  if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                  }
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
                aria-label="End call"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.956.956 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.27 11.27 0 0 0-2.67-1.85.996.996 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
                </svg>
              </button>
            </div>

            {/* Home indicator */}
            <div className="phone-home-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
}
