import Link from "next/link";

export default function FeatureNotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--color-bg-deep)" }}
    >
      <p
        className="mb-2 text-sm font-medium uppercase tracking-[0.2em]"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-text-muted)",
        }}
      >
        404
      </p>
      <h1
        className="mb-4 text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Feature not found
      </h1>
      <p
        className="mb-8"
        style={{
          fontSize: "var(--text-body)",
          color: "var(--color-text-secondary)",
        }}
      >
        The feature you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/#features"
        className="feature-back-link"
        style={{ marginBottom: 0 }}
      >
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
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Back to all features</span>
      </Link>
    </div>
  );
}
