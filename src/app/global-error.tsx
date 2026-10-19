"use client";

/**
 * Last-resort boundary for errors thrown in the root layout itself.
 * Keeps the brand and gives the user a way forward.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0c", color: "#e4e4e7", fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "30rem" }}>
            <p style={{ color: "#dc2626", letterSpacing: "0.3em", fontSize: "0.7rem" }}>RBX BANGLADESH</p>
            <h1 style={{ fontSize: "1.75rem", textTransform: "uppercase", margin: "0.75rem 0" }}>
              Spun out of the arena
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: 1.6 }}>
              The app hit an unexpected error. If you just installed the project, connect your database
              first (see <code>SETUP.md</code>), then reload.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
              <button
                onClick={reset}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: 0,
                  borderRadius: "0.5rem",
                  padding: "0.7rem 1.2rem",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Reload
              </button>
              <a
                href="/setup"
                style={{
                  border: "1px solid #3f3f46",
                  color: "#e4e4e7",
                  borderRadius: "0.5rem",
                  padding: "0.7rem 1.2rem",
                  textDecoration: "none",
                }}
              >
                Setup guide
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
