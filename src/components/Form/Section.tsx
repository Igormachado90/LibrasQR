import type { ReactNode } from "react";

export default function Section({
  title,
  children
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: "32px" }}>
      <h3 style={{ marginBottom: "16px", color: "#333", display: "flex", alignItems: "center", gap: "8px" }}>
        {title}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px"
        }}
      >
        {children}
      </div>
    </section>
  );
}
