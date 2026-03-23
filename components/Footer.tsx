export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        borderTop: "1px solid var(--color-border-subtle)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6"
        style={{
          paddingTop: "var(--space-lg)",
          paddingBottom: "var(--space-lg)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/zuper-logo.png"
            alt="Zuper"
            className="h-5 w-auto"
          />
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            AI Experience Center
          </span>
        </div>

        <p
          className="text-xs"
          style={{ color: "var(--color-text-muted)" }}
        >
          &copy; {new Date().getFullYear()} Zuper Inc.
        </p>
      </div>
    </footer>
  );
}
