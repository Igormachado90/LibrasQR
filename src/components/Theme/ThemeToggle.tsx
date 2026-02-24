import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "1px solid var(--border-color)",
        fontSize: "18px",
        cursor: "pointer",
        width: "40px",
        height: "40px",
        padding: "0",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        color: "var(--text-primary)",
        backgroundColor: "var(--bg-secondary)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--hover-bg)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}