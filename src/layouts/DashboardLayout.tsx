import { Outlet } from "react-router-dom";
import { useState, type ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

interface Props {
  children?: ReactNode; // Torna opcional
}

export default function DashboardLayout({ children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      overflow: "hidden", 
      background: "var(--bg-secondary)", 
      }}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        minWidth: 0, 
        marginLeft: sidebarCollapsed ? "80px" : "260px",
        transition: "margin-left 0.3s ease",
        background: "transparent",
      }}>
        <Header 
          onMenuClick={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main style={{ 
          flex: 1, 
          padding: "24px", 
          overflowY: "auto", 
          transition: "padding 0.3s ease",
          background: "transparent", 
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}