import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { hasRole, type UserRole } from "../auth/roles";
// import type { JSX } from "react";

interface RequireAuthProps {
    // children: React.ReactNode;
    allowedRoles: UserRole[];
}

export function RequireAuth({
    // children,
    allowedRoles,
}: RequireAuthProps) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Mostra um indicador de loading melhor
    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                fontSize: "16px",
                color: "#666"
            }}>
                Carregando autenticação...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    if (!hasRole(user.role, allowedRoles)) {
        console.log(`🚫 [RequireAuth] Acesso negado para ${user.role}`);
        return <Navigate to="/acesso-negado" replace />;
    }

    return <Outlet />;
}