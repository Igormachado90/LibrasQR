import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../Theme/ThemeToggle";
import { FaSearch, FaBell, FaUserCircle, FaAddressCard, FaCog, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

export default function Header() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const hasUnreadNotifications = true;

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
        boxShadow: theme === "dark"
          ? "0 1px 4px rgba(0,0,0,0.3)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "margin-left 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease"
      }}
    >
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
              color: "var(--text-primary)"
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
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Ações direita */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Botão de tema */}
        <ThemeToggle />

        {/* Notificações */}
        <div ref={notificationRef} style={{ position: "relative" }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            style={{
              background: "none",
              border: `1px solid var(--border-color)`,
              fontSize: "18px",
              cursor: "pointer",
              width: "40px",
              height: "40px",
              padding: "0",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              color: "var(--text-primary)",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-hover)";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.borderColor = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            {/* Indicador de notificação não lida */}
            {hasUnreadNotifications && (
              <span
                style={{
                  position: "absolute",
                  top: "-3px",
                  right: "-2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "var(--danger)",
                  border: `2px solid var(--bg-secondary)`,
                  animation: theme === "dark" ? "pulse 1.5s infinite" : "none"
                }}
              />
            )}
            <FaBell />
          </button>

          {/* Dropdown de notificações */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "0",
                width: "320px",
                backgroundColor: "var(--card-bg)",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                boxShadow: theme === "dark"
                  ? "0 8px 24px rgba(0,0,0,0.4)"
                  : "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 1000,
                padding: "16px",
                animation: "fadeIn 0.2s ease-out"
              }}
            >
              <h4 style={{ margin: 0, color: "var(--text-primary)", fontSize: "16px" }}>
                Notificações
              </h4>

              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <FaBell size={32} style={{ color: "var(--text-tertiary)", marginBottom: "12px", opacity: 0.5 }} />
                <p style={{ color: "var(--text-tertiary)", fontSize: "14px", textAlign: "center" }}>
                  Nenhuma notificação no momento
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Perfil com Dropdown */}
        <div ref={userMenuRef} style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "30px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              if (!showUserMenu) {
                e.currentTarget.style.backgroundColor = "var(--bg-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (!showUserMenu) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
          >
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>
                Igor Machado
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "flex-end"
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--success)"
                  }}
                />
                Administrador
              </div>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              IM
            </div>
          </div>

          {/* Dropdown Menu do Perfil */}
          {showUserMenu && (
            <div
              style={{
                position: "absolute",
                top: "55px",
                right: "0",
                width: "280px",
                backgroundColor: "var(--card-bg)",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                boxShadow: theme === "dark"
                  ? "0 8px 24px rgba(0,0,0,0.4)"
                  : "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 1000,
                overflow: "hidden",
                animation: "fadeIn 0.2s ease-out"
              }}
            >
              {/* Header do perfil */}
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  borderBottom: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-tertiary)"
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0 auto 12px"
                  }}
                >
                  IM
                </div>
                <div style={{ fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" }}>
                  Igor Machado
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                  igor.machado@email.com
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding: "8px 0" }}>
                <button
                  onClick={() => {
                    navigate("/perfil");
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    transition: "all 0.2s",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <FaUserCircle size={18} style={{ color: "var(--primary)" }} />
                  Meu Perfil
                </button>

                <button
                  onClick={() => {
                    navigate("/meus-dados");
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    transition: "all 0.2s",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <FaAddressCard size={18} style={{ color: "var(--primary)" }} />
                  Meus Dados
                </button>

                <button
                  onClick={() => {
                    navigate("/configuracoes");
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    transition: "all 0.2s",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <FaCog size={18} style={{ color: "var(--primary)" }} />
                  Configurações
                </button>

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--border-color)",
                    margin: "8px 0"
                  }}
                />

                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--danger)",
                    fontSize: "14px",
                    transition: "all 0.2s",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--danger-light)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <FaSignOutAlt size={18} />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Estilos globais */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </header >
  );
}