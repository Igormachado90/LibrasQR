import { createContext, useContext, useEffect, useState, useCallback } from "react";
import supabase from "../lib/supabase";
import type { User, UserRole } from "./authTypes";
import { ROLE_ROUTES } from "./roles";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getUserDashboardRoute: () => string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    console.log("🏗️ [AuthProvider] Instância criada");
    // 🔥 lock contra duplicação
    // const processingRef = useRef(false);

    // =========================
    // PROFILE
    // =========================

    const loadUserProfile = useCallback(async (userId: string) => {
        console.log("=== INICIO LOAD PROFILE ===");
        console.log("userId:", userId);


        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("auth_uid", userId)
            .single();

        console.log("PROFILE DATA:", data);
        console.log("PROFILE ERROR:", error);

        if (error || !data) {
            throw new Error("Perfil não encontrado");
        }

        const role = String(data.tipo).toLowerCase();
        console.log("ROLE FINAL:", role);

        if (!ROLE_ROUTES[role as UserRole]) {
            throw new Error("Role inválida no banco");
        }

        return {
            id: data.id,
            name: data.nome,
            email: data.email,
            role: role.toLowerCase() as UserRole
        };
    }, []);

    // =========================
    // SESSION CENTRAL
    // =========================
    const handleSession = useCallback(async (session: any) => {
        try {
            setLoading(true);

            if (!session) {
                setUser(null);
                return;
            }
            const profile = await loadUserProfile(session.user.id);
            setUser(profile);
        } catch (err) {
            console.error("SESSION ERROR:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // =========================
    // INIT
    // =========================

    useEffect(() => {
        const init = async () => {
            console.log("🔍 [Auth] Inicializando autenticação...");
            const { data } = await supabase.auth.getSession();
            await handleSession(data.session);
        };

        init();

        const { data: sub } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                console.log("🔄 [Auth] Auth state changed:", _event, session?.user?.email);
                handleSession(session);
            }
        );

        return () => {
            console.log("🧹 [Auth] Limpando subscription");
            sub.subscription.unsubscribe();
        };
    }, [handleSession]);

    // =========================
    // LOGIN (SEM DUPLICAÇÃO)
    // =========================
    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            console.log("Tentando login com:", email);

            if (!email || !password) {
                throw new Error("Email e senha são obrigatórios");
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password
            });

            if (error) {
                const message = String(error.message || "").toLowerCase();
                if (message.includes("rate limit") || message.includes("too many requests") || message.includes("429")) {
                    throw new Error("Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.");
                }
                throw error;
            }

            if (!data.session) {
                throw new Error("Não foi possível iniciar a sessão.");
            }

            await handleSession(data.session);
        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleSession]);

    // =========================
    // LOGOUT
    // =========================
    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem("user");
    };

    // =========================
    // ROUTE
    // =========================
    const getUserDashboardRoute = (): string => {
        if (!user) return "/login";
        return ROLE_ROUTES[user.role] || "/login";
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, getUserDashboardRoute }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

