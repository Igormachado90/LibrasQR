import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  onClick?: () => void;
}

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  bgColor = "#FFFFFF", 
  borderColor = "#E5E7EB", 
  onClick
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: bgColor,
        borderRadius: "16px",
        padding: "20px",
        border: `1px solid ${borderColor}`,
        boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minHeight: "120px",
        cursor: onClick ? "pointer" : "default"
      }}
    >
      {/* Top */}
    <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "16px"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#1f2937"
        }}>
          {value}
        </span>
      </div>
      <h3 style={{
        fontSize: "16px",
        fontWeight: "600",
        margin: "0",
        color: "#1f2937"
      }}>
        {title}
      </h3>
      {subtitle && (
        <p
          style={{
            fontSize: "13px",
            color: "#6b7280",
            margin: 0
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
