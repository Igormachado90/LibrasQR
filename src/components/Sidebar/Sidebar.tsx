// import { NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../../auth/AuthContext";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaUserMd,
//   FaBook,
//   FaSchool,
//   FaHome,
//   FaClipboardList,
//   FaCalendarAlt,
//   FaFileAlt,
//   FaChartBar,
//   FaChalkboardTeacher,
//   FaSignOutAlt,
//   FaUserFriends
// } from 'react-icons/fa';
// // import type { UserRole } from "../../auth/roles";
// import type { JSX } from "react";

// export interface MenuItem {
//   name: string;
//   path: string;
//   icon: JSX.Element;
//   // roles: UserRole[];
// }

// interface SidebarProps {
//   collapsed?: boolean;
//   // onToggle?: () => void;
// }

// export default function Sidebar({ collapsed = false }: SidebarProps) {
//   const navigate = useNavigate();
//   // const { user, logout } = useAuth();

//   // async function handleLogout() {
//   //   await logout();
//   //   navigate("/login", { replace: true });
//   // }

//   // if (!user) return null;
//   // if (user?.role === "FAMILIA") return null;

//   const menuCategories = [
//     {
//       title: "Dashboard",
//       items: [
//         { name: "Dashboard", path: "/dashboard", roles: ["GESTOR", "PROFISSIONAL"], icon: <FaTachometerAlt /> }
//       ]
//     },
//     {
//       title: "Dados Master",
//       items: [
//         { name: "Plataformas", path: "/plataformas", roles: ["GESTOR"], icon: <FaHome /> },
//         { name: "Usuários", path: "/usuarios", roles: ["GESTOR"], icon: <FaUserFriends /> },
//         { name: "Escolas", path: "/escolas", roles: ["GESTOR"], icon: <FaSchool /> }
//       ]
//     },
//     {
//       title: "Gestão de Pessoas",
//       items: [
//         { name: "Alunos", path: "/alunos", roles: ["GESTOR", "PROFISSIONAL"], icon: <FaUsers /> },
//         { name: "Famílias", path: "/familias", roles: ["GESTOR"], icon: <FaUserFriends /> },
//         { name: "Professores", path: "/profissionais", roles: ["GESTOR"], icon: <FaUserMd /> },
//         { name: "Turmas", path: "/turmas", roles: ["GESTOR"], icon: <FaChalkboardTeacher /> }
//       ]
//     },
//     {
//       title: "Gestão Acadêmica",
//       items: [
//         { name: "Disciplinas", path: "/disciplina", roles: ["GESTOR"], icon: <FaBook /> },
//         { name: "Aulas", path: "/aulas", roles: ["GESTOR", "PROFISSIONAL"], icon: <FaCalendarAlt /> },
//         { name: "Avaliações", path: "/avaliacoes", roles: ["GESTOR", "PROFISSIONAL"], icon: <FaClipboardList /> },
//         { name: "Disponibilidade", path: "/disponibilidade", roles: ["GESTOR", "PROFISSIONAL"], icon: <FaCalendarAlt /> }
//       ]
//     },
//     {
//       title: "Gestão Pedagógica",
//       items: [
//         { name: "Relatórios PEI", path: "/pei", roles: ["GESTOR", "PROFISSIONAL"], icon: <FaFileAlt /> },
//         { name: "Relatórios", path: "/relatorios", roles: ["GESTOR"], icon: <FaChartBar /> }
//       ]
//     }
//   ];

//   const sidebarWidth = collapsed ? "80px" : "260px";

//   return (
//     <aside
//       style={{
//         width: sidebarWidth,
//         background: "#ffffff",
//         borderRight: "1px solid #eee",
//         color: "#333",
//         height: "100vh",
//         boxSizing: "border-box",
//         display: "flex",
//         flexDirection: "column",
//         position: "fixed",
//         left: 0,
//         top: 0,
//         zIndex: 1000,
//         transition: "width 0.3s ease",
//         overflow: "hidden"
//       }}
//     >
//       {/* Logo */}
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "8px",
//         padding: "20px 16px 16px",
//         borderBottom: collapsed ? "none" : "1px solid #eee"
//       }}>
//         {collapsed ? (
//           <img
//             src="/logoTEA.png"
//             alt="VinculoTEA"
//             style={{ width: "50px", height: "auto", borderRadius: "8px" }}
//           />
//         ) : (
//           <>
//             <img
//               src="/logoTEA.png"
//               alt="VinculoTEA"
//               style={{ width: "80px", height: "auto" }}
//             />
//             <div style={{
//               fontSize: "11px",
//               color: "#666",
//               fontWeight: "500",
//               marginTop: "5px"
//             }}>
//               Plataforma Gestão
//             </div>
//           </>
//         )}
//       </div>



//       {/* Menu Categories */}
//       <div style={{
//         flex: 1,
//         overflowY: "auto",
//         padding: "16px 8px"
//       }}>
//         {menuCategories.map((category, index) => {
//           //// Filtrar itens baseados na role do usuário
//           // const filteredItems = category.items.filter(item => 
//           //   item.roles.includes(user!.role)
//           // );

//           // Não mostrar categoria se não houver itens visíveis para o usuário
//           // if (filteredItems.length === 0) return null;

//           return (
//             <div key={index} style={{ marginBottom: collapsed ? "16px" : "24px" }}>
//               {/* Título da Categoria (só mostra se não estiver collapsed) */}
//               {!collapsed && category.title !== "Dashboard" && (
//                 <div style={{
//                   fontSize: "11px",
//                   fontWeight: "600",
//                   color: "#888",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.5px",
//                   marginBottom: "8px",
//                   paddingLeft: collapsed ? "0" : "8px",
//                   textAlign: collapsed ? "center" : "left"
//                 }}>
//                   {category.title}
//                 </div>
//               )}

//               {/* Itens do Menu */}
//               <ul style={{
//                 listStyle: "none",
//                 padding: 0,
//                 margin: 0
//               }}>
//                 {/* {filteredItems.map((item) => (
//                   <li key={item.name}>
//                     <NavLink
//                       to={item.path}
//                       style={({ isActive }) => ({
//                         display: "flex",
//                         alignItems: "center",
//                         padding: collapsed ? "12px" : "12px 16px",
//                         marginBottom: "4px",
//                         borderRadius: "8px",
//                         fontSize: collapsed ? "12px" : "14px",
//                         fontWeight: "500",
//                         textDecoration: "none",
//                         color: isActive ? "#2563eb" : "#333",
//                         backgroundColor: isActive ? "#f0f7ff" : "transparent",
//                         transition: "background-color 0.2s, color 0.2s",
//                         justifyContent: collapsed ? "center" : "flex-start",
//                         flexDirection: collapsed ? "column" : "row",
//                         gap: collapsed ? "4px" : "12px",
//                         textAlign: collapsed ? "center" : "left"
//                       })}
//                       onMouseEnter={(e) => {
//                         if (!e.currentTarget.className.includes("active")) {
//                           e.currentTarget.style.backgroundColor = "#f8fafc";
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (!e.currentTarget.className.includes("active")) {
//                           e.currentTarget.style.backgroundColor = "transparent";
//                         }
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontSize: collapsed ? "18px" : "16px",
//                           color: "inherit",
//                           display: "flex",
//                           alignItems: "center"
//                         }}
//                       >
//                         {item.icon}
//                       </span>
//                       {!collapsed && item.name}
//                       {collapsed && (
//                         <span style={{
//                           fontSize: "10px",
//                           fontWeight: "500",
//                           marginTop: "2px"
//                         }}>
//                           {item.name.split(' ')[0]}
//                         </span>
//                       )}
//                     </NavLink>
//                   </li>
//                 ))} */}
//               </ul>
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer - Logout e Perfil */}
//       {!collapsed && (
//         <div
//           style={{
//             padding: "16px",
//             borderTop: "1px solid #eee",
//             marginTop: "auto"
//           }}
//         >
//           {/* Informações do Usuário */}
//           <div style={{
//             padding: "12px 16px",
//             marginBottom: "12px",
//             backgroundColor: "#f8fafc",
//             borderRadius: "8px",
//             fontSize: "13px"
//           }}>
//             <div style={{ fontWeight: "600", color: "#333", marginBottom: "4px" }}>
//               {/* {user.name} */}
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", color: "#666" }}>
//               {/* <span>{user.role === "GESTOR" ? "Gestor" : "Profissional"}</span> */}
//               <span style={{
//                 backgroundColor: "#f0f7ff",
//                 color: "#2563eb",
//                 padding: "2px 8px",
//                 borderRadius: "12px",
//                 fontSize: "11px",
//                 fontWeight: "600"
//               }}>
//                 {/* {user.role === "GESTOR" ? "Admin" : "Prof"} */}
//               </span>
//             </div>
//           </div>

//           {/* Botão Logout */}
//           <button
//             // onClick={handleLogout}
//             style={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "12px 16px",
//               borderRadius: "8px",
//               border: "1px solid #eee",
//               background: "transparent",
//               color: "#666",
//               fontSize: "14px",
//               fontWeight: "500",
//               cursor: "pointer",
//               transition: "all 0.2s"
//             }}
//             onMouseEnter={e => {
//               e.currentTarget.style.background = "#fee2e2";
//               e.currentTarget.style.color = "#dc2626";
//               e.currentTarget.style.borderColor = "#fecaca";
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.background = "transparent";
//               e.currentTarget.style.color = "#666";
//               e.currentTarget.style.borderColor = "#eee";
//             }}
//           >
//             <FaSignOutAlt style={{ marginRight: "10px" }} />
//             Sair
//           </button>
//         </div>
//       )}

//       {/* Versão collapsed do footer */}
//       {collapsed && (
//         <div
//           style={{
//             padding: "16px 8px",
//             borderTop: "1px solid #eee",
//             marginTop: "auto"
//           }}
//         >
//           <button
//             // onClick={handleLogout}
//             style={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "12px",
//               borderRadius: "8px",
//               border: "1px solid #eee",
//               background: "transparent",
//               color: "#666",
//               fontSize: "20px",
//               cursor: "pointer",
//               transition: "all 0.2s"
//             }}
//             onMouseEnter={e => {
//               e.currentTarget.style.background = "#fee2e2";
//               e.currentTarget.style.color = "#dc2626";
//               e.currentTarget.style.borderColor = "#fecaca";
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.background = "transparent";
//               e.currentTarget.style.color = "#666";
//               e.currentTarget.style.borderColor = "#eee";
//             }}
//           >
//             <FaSignOutAlt />
//           </button>
//         </div>
//       )}
//     </aside>
//   );
// }

import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../Theme/ThemeToggle";
import {
  FaHome,
  FaCamera,
  FaVideo,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaBell,
  FaStar,
  FaHistory,
  FaChevronRight,
  FaChevronLeft,
  FaFileAlt,
  FaBookOpen,
  FaAd
} from 'react-icons/fa';
import { IoQrCode } from "react-icons/io5";
import { FaGraduationCap, FaSchool } from "react-icons/fa6";
import { BsTranslate } from "react-icons/bs";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Neologismos", path: "/neologismos", icon: <BsTranslate /> },
    { name: "Termos Técnicos", path: "/termos", icon: <FaAd /> },
    { name: "Aprovar/Recusar Termos", path: "/aprovarRecusar", icon: <FaFileAlt /> },
    { name: "Gerar QR Code", path: "/gerar-qr", icon: <IoQrCode /> },
    { name: "Cursos", path: "/curso", icon: <FaGraduationCap /> },
    { name: "Gestão de Escolas", path: "/escolas", icon: <FaSchool /> },
    { name: "Gestão de Disciplinas", path: "/disciplinas", icon: <FaBook /> }, 
    // { name: "Scanner", path: "/scanner", icon: <FaCamera /> },
    // { name: "Biblioteca", path: "/biblioteca", icon: <FaVideo /> },
    // { name: "Meus QR Codes", path: "/meus-qrcodes", icon: <FaBook /> },
    // { name: "Favoritos", path: "/favoritos", icon: <FaStar /> },
    { name: "Materiais Didaticos", path: "/materiais-didaticos", icon: <FaBookOpen /> },
    { name: "Usuários", path: "/usuarios", icon: <FaUsers />, admin: true },
    { name: "Categorias", path: "/categorias", icon: <FaBook /> },
    { name: "Notificações", path: "/notificacoes", icon: <FaBell /> },
    { name: "Configurações", path: "/configuracoes", icon: <FaCog /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          {menuItems.map((item) => (
            <li key={item.name} style={{ position: "relative" }}>
              <NavLink
                to={item.path}
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
                {item.admin && !collapsed && (
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