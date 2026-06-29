import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import RegisterModal from "../../components/Auth/RegisterModal";
import ForgotPasswordModal from "../../components/Auth/ForgotPasswordModal";
import ResetPasswordModal from "../../components/Auth/ResetPasswordModal";

type ModalType = "register" | "forgotPassword" | "resetPassword" | null;

export default function Login() {
    const { user, login, loading: authLoading, getUserDashboardRoute } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados para os modais
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [resetToken, setResetToken] = useState("");
    const [resetEmail, setResetEmail] = useState("");

    const redirected = useRef(false);

    // Log para debug - CORRIGIDO (sem user.email)
    console.log("🔍 [Login] Renderizando - user:", user ? `${user.name} (${user.role})` : 'null', "authLoading:", authLoading, "isSubmitting:", isSubmitting);

    // Redirecionar quando o usuário fizer login
    useEffect(() => {
        console.log("🔄 [Login] useEffect - user:", user, "authLoading:", authLoading);

        // Aguarda o loading terminar e o usuário estar definido
        if (!authLoading && user && !redirected.current) {
            redirected.current = true;
            console.log("✅ [Login] Usuário autenticado, redirecionando para:");
            navigate(getUserDashboardRoute(), { replace: true });
        }
    }, [user, authLoading, navigate, getUserDashboardRoute]);

    // Funções para controlar modais
    const openModal = (modal: ModalType, token?: string, email?: string) => {
        setActiveModal(modal);
        if (token) setResetToken(token);
        if (email) setResetEmail(email);
    };

    const closeModal = () => {
        setActiveModal(null);
        setResetToken("");
        setResetEmail("");
    };

    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("🖱️ [Login] Click no botão - email:", email);

        if (isSubmitting || authLoading) {
            console.log("⚠️ [Login] Submissão já em progresso, ignorando novo clique");
            return;
        }

        // Validações melhoradas
        if (!email || !password) {
            setError("Por favor, preencha todos os campos");
            return;
        }

        if (!validateEmail(email)) {
            setError("Por favor, insira um email válido");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            console.log("📡 [Login] Chamando login()...");
            await login(email, password);
            console.log("✅ [Login] Login bem sucedido! Aguardando redirecionamento...");
        } catch (err: any) {
            setError(err.message || "Email ou senha inválidos. Por favor, tente novamente.");
            console.error("❌ [Login] Erro no login:", err);
            setIsSubmitting(false);
        }
    }

    const handleRegisterSuccess = (user: any) => {
        closeModal();
        setEmail(user.email);
        // Mostrar mensagem de sucesso
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        marginTop: "6px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
        background: "#fff",
        color: "#252525",
        boxSizing: "border-box" as const,
        transition: "border-color 0.2s, box-shadow 0.2s"
    };

    const labelStyle = {
        display: "block",
        width: "100%",
        marginTop: "6px",
        fontSize: "15px",
        fontWeight: "500",
        color: "#000"
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#fff"
        }}>
            <div style={{
                textAlign: "center",
                marginBottom: "32px",
                animation: "fadeIn 0.6s ease-out"
            }}>
                <img
                    src={"/logoLibrasQR-dark.png"}
                    alt="LibrasQR"
                    style={{
                        width: "160px",
                        marginBottom: "8px",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                    }}
                />
                <p style={{ fontSize: "14px", color: "#777", margin: "0", fontWeight: "400" }}>
                    Gestão Multidisciplinar
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{
                    width: "360px",
                    background: "#fff",
                    border: "1px solid #cccc",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    animation: "slideUp 0.5s ease-out"
                }}
            >
                <h2 style={{ margin: 0, fontSize: "18px", color: "#000" }}>Entrar</h2>
                <span style={{ fontSize: "14px", color: "#777", display: "block", marginBlock: "16px" }}>
                    Área para profissionais ou gestão
                </span>

                {error && (
                    <div style={{
                        padding: "12px 16px",
                        marginBottom: "20px",
                        backgroundColor: "#fee",
                        border: "1px solid #fcc",
                        borderRadius: "8px",
                        color: "#c00",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}>
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <label style={labelStyle}>
                    Email
                </label>
                <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                        if (error) setError("");
                    }}
                    onFocus={e => {
                        e.currentTarget.style.borderColor = "#2563eb";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={e => {
                        e.currentTarget.style.borderColor = "#ddd";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                    style={inputStyle}
                    disabled={isSubmitting}
                    required
                />

                <label style={labelStyle}>
                    Senha
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                        if (error) setError("");
                    }}
                    onFocus={e => {
                        e.currentTarget.style.borderColor = "#2563eb";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={e => {
                        e.currentTarget.style.borderColor = "#ddd";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                    style={inputStyle}
                    disabled={isSubmitting}
                    required
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: "100%",
                        marginTop: "20px",
                        padding: "12px",
                        background: isSubmitting ? "#999" : "#222",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "all 0.2s"
                    }}
                >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </button>

                {/* Links para Recuperar Senha e Cadastro */}
                <div style={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    textAlign: "center",
                    color: "#666"
                }}>
                    {/* Esqueceu a senha */}
                    <div>
                        <span style={{ display: "block", marginBottom: "8px" }}>
                            Esqueceu sua senha?
                        </span>
                        <a
                            onClick={() => openModal("forgotPassword")}
                            style={{
                                background: "transparent",
                                border: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#2563eb",
                                cursor: "pointer",
                                transition: "color 0.2s"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#2563eb"}
                        >
                            Recuperar senha
                        </a>
                    </div>

                    {/* Cadastre-se */}
                    <div>
                        <span style={{ fontSize: "13px", color: "#666" }}>
                            Não tem uma conta?{" "}
                        </span>
                        <a
                            onClick={() => openModal("register")}
                            style={{
                                background: "transparent",
                                border: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#2563eb",
                                cursor: "pointer",
                                transition: "color 0.2s"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#2563eb"}
                        >
                            Cadastre-se
                        </a>
                    </div>
                </div>
            </form>

            {/* <div style={{
                marginTop: "20px",
                textAlign: "center",
                animation: "fadeIn 0.8s ease-out"
            }}>
                <span style={{ display: "block", fontSize: "13px", color: "#777" }}>
                    É família ou escola?
                </span>
                <a
                    href="/familia/pei"
                    style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#1a1a1a",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        transition: "color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#2563eb"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#1a1a1a"}
                >
                    Acessar Portal da Família/Escola
                    <span style={{ fontSize: "18px" }}>→</span>
                </a>
            </div> */}

            {/* Modais */}
            <RegisterModal
                isOpen={activeModal === "register"}
                onClose={closeModal}
                onSuccess={handleRegisterSuccess}
                onSwitchToLogin={() => {
                    closeModal();
                }}
            />

            <ForgotPasswordModal
                isOpen={activeModal === "forgotPassword"}
                onClose={closeModal}
                onSwitchToLogin={() => {
                    closeModal();
                }}
                onSwitchToReset={(token, email) => {
                    openModal("resetPassword", token, email);
                }}
            />

            <ResetPasswordModal
                isOpen={activeModal === "resetPassword"}
                onClose={closeModal}
                token={resetToken}
                email={resetEmail}
                onSwitchToLogin={() => {
                    closeModal();
                }}
            />

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
        </div>
    );
}

