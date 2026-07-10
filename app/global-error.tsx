"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f7f8fb",
          color: "#052268",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Something went wrong
        </h1>
        <p style={{ color: "#556998", marginBottom: "1.5rem", maxWidth: "28rem" }}>
          The page failed to load. Please try again, or call +92 321 7295474 if it
          keeps happening.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            height: "2.75rem",
            padding: "0 1.5rem",
            borderRadius: "999px",
            background: "#fc0100",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
