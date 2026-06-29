import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../Theme/ThemeToggle";
import { useAuth } from "../../auth/AuthContext";
import {
  FaHome,
  // FaCamera,
  // FaVideo,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaBell,
  // FaStar,
  // FaHistory,
  FaChevronRight,
  FaChevronLeft,
  FaFileAlt,
  FaBookOpen,
  FaAd
} from 'react-icons/fa';
import { IoQrCode } from "react-icons/io5";
import { FaGraduationCap, FaSchool } from "react-icons/fa6";
import { BsTranslate } from "react-icons/bs";
import { ROLES, ROLE_NAMES } from "../../auth/roles";


interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  // Função para construir paths com a role
  const getPath = (basePath: string) => {
    if (!user) return "/login";
    return `/${user.role}${basePath}`;
  };

  const menuItems = [
    { name: "Dashboard", path: `/dashboard`, icon: <FaHome />, roles: [ROLES.ADMIN, ROLES.PROFESSOR, ROLES.INTERPRETE, ROLES.ALUNO] },
    { name: "Neologismos", path: `/neologismos`, icon: <BsTranslate />, roles: [ROLES.INTERPRETE, ROLES.ADMIN] },
    { name: "Termos Técnicos", path: `/termos`, icon: <FaAd />, roles: [ROLES.ADMIN, ROLES.PROFESSOR, ROLES.INTERPRETE, ROLES.ALUNO] },
    { name: "Aprovar/Recusar Termos", path: `/aprovar-recusar`, icon: <FaFileAlt />, roles: [ROLES.ADMIN] },
    { name: "Gerar QR Code", path: `/gerar-qr`, icon: <IoQrCode />, roles: [ROLES.INTERPRETE] },
    { name: "Cursos", path: `/cursos`, icon: <FaGraduationCap />, roles: [ROLES.PROFESSOR, ROLES.ALUNO]  },
    { name: "Gestão de Escolas", path: `/escolas`, icon: <FaSchool />, roles: [ROLES.ADMIN] },
    { name: "Gestão de Disciplinas", path: `/disciplinas`, icon: <FaBook />, roles: [ROLES.ADMIN] },
    { name: "Materiais Didaticos", path: `/materiais-didaticos`, icon: <FaBookOpen />, roles: [ROLES.PROFESSOR, ROLES.ADMIN, ROLES.ALUNO] },
    { name: "Usuários", path: `/usuarios`, icon: <FaUsers />, roles: [ROLES.ADMIN] },
    { name: "Categorias", path: `/categorias`, icon: <FaBook />, roles: [ROLES.PROFESSOR]  },
    { name: "Notificações", path: `/notificacoes`, icon: <FaBell />, roles: [ROLES.ADMIN, ROLES.PROFESSOR, ROLES.INTERPRETE, ROLES.ALUNO] },
    { name: "Configurações", path: `/configuracoes`, icon: <FaCog />, roles: [ROLES.ADMIN] }
  ];

  // Filtrar menus baseado na role do usuário
  const filteredMenuItems = menuItems.filter(item => {
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  const handleLogout = async () => {
    try {
      await logout(); // Usando o logout do AuthContext
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Se não tem usuário, não renderiza a sidebar
  if (!user) return null;

  return (
    <aside
      style={{
        width: collapsed ? "80px" : "260px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        transition: "width 0.3s ease, background-color 0.3s ease",
        overflow: "hidden",
        boxShadow: collapsed
          ? "2px 0 8px rgba(0,0,0,0.05)"
          : "4px 0 12px rgba(0,0,0,0.08)"
      }}
    >
      {/* Logo e Botão de Colapso */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: collapsed ? "20px 0" : "24px 16px 16px",
        borderBottom: "1px solid var(--border-color)",
        position: "relative"
      }}>
        {/* Logo */}
        {collapsed ? (
          <img
            src={theme === "dark" ? "/logoQR.png" : "/logoQR-dark.png"}
            alt="LibrasQR"
            style={{
              width: "40px",
              height: "51px",
              marginBottom: "5px"
            }}
          />
        ) : (
          <>
            <img
              src={theme === "dark" ? "/logoLibrasQR.png" : "/logoLibrasQR-dark.png"}
              alt="LibrasQR"
              style={{
                width: "140px",
                height: "auto",
                marginBottom: "5px"
              }}
            />
            <div style={{
              fontSize: "11px",
              color: "var(--text-tertiary)",
              fontWeight: "500",
              textAlign: "center",
              lineHeight: "1.4",
              padding: "0 8px"
            }}>
              Glossário de Libras para Informática do Pará - GLIPa
            </div>
          </>
        )}

        {/* Botão de Colapso */}
        {onToggle && (
          <button
            onClick={onToggle}
            style={{
              position: "absolute",
              right: collapsed ? "50%" : "-15px",
              bottom: "-12px",
              transform: collapsed ? "translateX(50%)" : "none",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontSize: "11px",
              transition: "all 0.2s",
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-hover)";
              e.currentTarget.style.color = "var(--primary)";
              e.currentTarget.style.borderColor = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: collapsed ? "16px 0" : "16px 12px",
        scrollbarWidth: "thin",
        scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)"
      }}>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "0px 5px",
          display: "flex",
          flexDirection: "column",
          gap: "2px"
        }}>
          {filteredMenuItems.map((item) => (
            <li key={item.name} style={{ position: "relative" }}>
              <NavLink
                to={getPath(item.path)}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  padding: collapsed ? "12px 0" : "10px 16px",
                  borderRadius: "8px",
                  fontSize: collapsed ? "0" : "14px",
                  fontWeight: isActive ? "600" : "500",
                  textDecoration: "none",
                  color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--primary-soft)" : "transparent",
                  transition: "all 0.2s",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: "12px",
                  position: "relative",
                  margin: "2px 0",
                  border: "none",
                  cursor: "pointer"
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.classList.contains("active")) {
                    e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                  }
                  // Mostrar tooltip
                  const tooltip = e.currentTarget.parentElement?.querySelector('.tooltip');
                  if (tooltip) {
                    (tooltip as HTMLElement).style.opacity = '1';
                    (tooltip as HTMLElement).style.visibility = 'visible';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.classList.contains("active")) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                  // Esconder tooltip
                  const tooltip = e.currentTarget.parentElement?.querySelector('.tooltip');
                  if (tooltip) {
                    (tooltip as HTMLElement).style.opacity = '0';
                    (tooltip as HTMLElement).style.visibility = 'hidden';
                  }
                }}
              >
                <span style={{
                  fontSize: collapsed ? "20px" : "18px",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  minWidth: collapsed ? "auto" : "24px"
                }}>
                  {item.icon}
                </span>

                {!collapsed && item.name}

                {/* Tooltip para modo colapsado */}

                {collapsed && (
                  <span
                    className="tooltip"
                    style={{
                      position: "absolute",
                      left: "100%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginLeft: "8px",
                      padding: "4px 8px",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "12px",
                      fontWeight: "500",
                      borderRadius: "4px",
                      boxShadow: "var(--card-shadow)",
                      border: "1px solid var(--border-color)",
                      whiteSpace: "nowrap",
                      zIndex: 1000,
                      opacity: 0,
                      visibility: "hidden",
                      transition: "all 0.2s ease",
                      pointerEvents: "none"
                    }}
                  >
                    {item.name}
                    <span style={{
                      position: "absolute",
                      right: "100%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 0,
                      height: 0,
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      borderRight: "6px solid var(--bg-secondary)"
                    }} />
                  </span>
                )}

                {/* Badge de admin (opcional) */}
                {!collapsed && item.name === "Usuários" && user?.role === ROLES.ADMIN && (
                  <span style={{
                    marginLeft: "auto",
                    fontSize: "10px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: "var(--primary-soft)",
                    color: "var(--primary)"
                  }}>
                    Admin
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Informações do Usuário - NOVO */}
      <div style={{
        padding: collapsed ? "12px" : "16px",
        borderTop: "1px solid var(--border-color)",
        marginBottom: "8px"
      }}>
        {!collapsed && user && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
            padding: "8px",
            borderRadius: "8px",
            background: "var(--bg-hover)"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px"
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "var(--text-primary)"
              }}>
                {user.name}
              </div>
              <div style={{
                fontSize: "12px",
                color: "var(--text-tertiary)",
                textTransform: "capitalize"
              }}>
                {ROLE_NAMES[user.role] || user.role}
              </div>
            </div>
          </div>
        )}

        {collapsed && user && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px"
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Footer com ThemeToggle e Logout */}
      <div style={{
        padding: collapsed ? "16px 0" : "16px",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: collapsed ? "column" : "row",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        gap: collapsed ? "12px" : "8px"
      }}>
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            flex: collapsed ? "0" : "1",
            width: collapsed ? "40px" : "auto",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: collapsed ? "0" : "8px",
            padding: collapsed ? "0" : "0 12px",
            border: "1px solid var(--border-color)",
            background: "transparent",
            color: "#ef4444",
            fontSize: collapsed ? "18px" : "14px",
            fontWeight: "500",
            cursor: "pointer",
            borderRadius: "8px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fee2e2";
            e.currentTarget.style.borderColor = "#fecaca";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
          title={collapsed ? "Sair" : ""}
        >
          <FaSignOutAlt />
          {!collapsed && "Sair"}
        </button>
      </div>

      {/* Estilos adicionais */}
      <style>
        {`
          /* Tooltip styles */
          .tooltip {
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            z-index: 1000;
            margin-left: 8px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border: 1px solid var(--border-color);
          }

          .tooltip-arrow {
            position: absolute;
            left: -4px;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            width: 8px;
            height: 8px;
            background: var(--bg-secondary);
            border-left: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
          }

          li:hover .tooltip {
            opacity: 1;
          }

          /* Scrollbar styles */
          ::-webkit-scrollbar {
            width: 4px;
          }

          ::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
          }

          ::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover);
          }

          /* Active link styles */
          .active {
            position: relative;
          }

          .active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 20px;
            background: var(--primary);
            border-radius: 0 3px 3px 0;
          }
        `}
      </style>
    </aside >
  );
}