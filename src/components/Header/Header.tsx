// interface HeaderProps {
//   onMenuClick?: () => void;
// }

// export default function Header({ onMenuClick }: HeaderProps) {
//   return (
//     <header
//       style={{
//         height: "64px",
//         background: "#ffffff",
//         borderBottom: "1px solid #eee",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 24px",
//         position: "sticky",
//         top: 0,
//         zIndex: 100
//       }}
//     >

//       <button
//         onClick={onMenuClick}
//         style={{
//           background: "none",
//           border: "1px solid #eee",
//           fontSize: "20px",
//           cursor: "pointer",
//           width: "40px", 
//           height: "40px", 
//           padding: "0", 
//           borderRadius: "50%", 
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           transition: "background-color 0.2s",
//           color: "#333"
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.backgroundColor = "#f5f5f5";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.backgroundColor = "transparent";
//           e.currentTarget.style.transform = "scale(1)";
//         }}
//       >
//         {onMenuClick ? "☰" : "←"}
//       </button>

//       {/* Busca */}
//       <div style={{ flex: 1, maxWidth: "400px", margin: "0 24px" }}>
//         <input
//           type="text"
//           placeholder="Buscar..."
//           style={{
//             width: "100%",
//             padding: "8px 12px",
//             borderRadius: "8px",
//             border: "1px solid #ddd",
//             backgroundColor: "#f9f9f9",
//             fontSize: "14px",
//             outline: "none",
//             transition: "border-color 0.2s"
//           }}
//           onFocus={(e) => {
//             e.currentTarget.style.borderColor = "#2563eb";
//           }}
//           onBlur={(e) => {
//             e.currentTarget.style.borderColor = "#ddd";
//           }}
//         />
//       </div>

//       {/* Ações */}
//       <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//         <button
//           style={{
//             background: "none",
//             border: "none",
//             fontSize: "20px",
//             cursor: "pointer",
//             padding: "8px",
//             borderRadius: "4px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             transition: "background-color 0.2s"
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = "#f5f5f5";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = "transparent";
//           }}
//         >
//           🔔
//         </button>

//         <div style={{
//           textAlign: "right",
//           color: "#374151",
//           paddingRight: "8px"
//         }}>
//           <strong style={{ fontSize: "14px" }}>TERLYS</strong>
//           <div style={{ fontSize: "12px", color: "#4CAF50" }}>
//             Gestor Principal
//           </div>
//         </div>

//         <div style={{
//           width: "40px",
//           height: "40px",
//           borderRadius: "50%",
//           backgroundColor: "#2563eb",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: "16px",
//           fontWeight: "bold"
//         }}>
//           T
//         </div>
//       </div>
//     </header>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../Theme/ThemeToggle";


export default function Header() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <header
      style={{
        height: "72px",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        // marginLeft: sidebarCollapsed ? "80px" : "260px",
        transition: "margin-left 0.3s ease, background-color 0.3s ease"
      }}
    >
      {/* Botão Menu */}
      {/* <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuClick}
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
            color: "var(--text-primary)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-hover)";
            e.currentTarget.style.borderColor = "var(--primary-color)";
            e.currentTarget.style.color = "var(--primary-color)";

          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          {onMenuClick ? "☰" : "←"}
        </button>
      </div> */}

      {/* Busca */}
      <div style={{ flex: 1, maxWidth: "400px", margin: "0 24px" }}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Buscar QR Codes, vídeos..."
            style={{
              width: "100%",
              padding: "10px 16px 10px 44px",
              borderRadius: "30px",
              border: "1px solid var(--input-border)",
              backgroundColor: "var(--input-bg)",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s",
              color: "var(--text-primary)"
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              e.currentTarget.style.borderColor = "var(--input-focus)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-soft)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = "var(--input-bg)";
              e.currentTarget.style.borderColor = "var(--input-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <span style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-tertiary)",
            fontSize: "16px"
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* Ações direita */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Botão de tema */}
        <ThemeToggle />

        {/* Notificações */}
        <button
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s",
            color: "var(--text-primary)",
            position: "relative"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          🔔
          <span style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--danger)",
            border: "2px solid var(--bg-secondary)"
          }}></span>
        </button>

        {/* Perfil */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          padding: "6px 12px",
          borderRadius: "30px",
          transition: "background-color 0.2s"
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={() => navigate("/perfil")}
        >
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>
              Ana Silva
            </div>
            <div style={{
              fontSize: "12px",
              color: "var(--success)",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--success)"
              }}></span>
              Admin
            </div>
          </div>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
            color: "var(--text-inverse)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold"
          }}>
            AS
          </div>
        </div>
      </div>
    </header>
  );
}