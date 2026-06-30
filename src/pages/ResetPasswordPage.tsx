import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import supabase from "../lib/supabase";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [tokenValid, setTokenValid] = useState<boolean | null>(null);
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            // PEGA OS PARÂMETROS DA URL (incluindo os de erro no hash)
            const token = searchParams.get("token");
            
            // IMPORTANTE: Captura os parâmetros do hash (#error=access_denied...)
            const hashParams = new URLSearchParams(location.hash.substring(1));
            const errorParam = hashParams.get("error") || searchParams.get("error");
            const errorCode = hashParams.get("error_code") || searchParams.get("error_code");
            const errorDescription = hashParams.get("error_description") || searchParams.get("error_description");

            console.log("🔍 Parâmetros da URL:", {
                token,
                errorParam,
                errorCode,
                errorDescription,
                hash: location.hash,
                search: location.search,
                hashParams: Object.fromEntries(hashParams)
            });

            // VERIFICA SE TEM ERRO NA URL
            if (errorParam || errorCode) {
                let mensagemErro = "Link inválido ou expirado.";
                
                if (errorCode === "otp_expired") {
                    mensagemErro = "⏰ O link de redefinição expirou. Solicite uma nova redefinição.";
                } else if (errorCode === "access_denied") {
                    mensagemErro = "🔒 Link inválido. Solicite uma nova redefinição.";
                } else if (errorDescription) {
                    mensagemErro = decodeURIComponent(errorDescription);
                }

                setError(mensagemErro);
                setTokenValid(false);
                setIsVerifying(false);
                return;
            }

            // VERIFICA SE TEM TOKEN
            if (!token) {
                setError("Token de recuperação não encontrado. Solicite uma nova redefinição.");
                setTokenValid(false);
                setIsVerifying(false);
                return;
            }

            // VALIDA O TOKEN
            try {
                const { error } = await supabase.auth.exchangeCodeForSession(token);
                
                if (error) {
                    console.error("Erro ao validar token:", error);
                    
                    if (error.message?.includes("expired")) {
                        setError("⏰ O link de redefinição expirou. Solicite uma nova redefinição.");
                    } else if (error.message?.includes("invalid")) {
                        setError("🔒 Link inválido. Solicite uma nova redefinição.");
                    } else {
                        setError(error.message || "Link inválido ou expirado.");
                    }
                    setTokenValid(false);
                } else {
                    setTokenValid(true);
                    setError("");
                }
            } catch (err: any) {
                console.error("Erro ao validar token:", err);
                setError("Erro ao validar o link. Solicite uma nova redefinição.");
                setTokenValid(false);
            } finally {
                setIsVerifying(false);
            }
        };

        validateToken();
    }, [searchParams, location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        setError("");
        setMessage("");

        const token = searchParams.get("token");

        if (!token) {
            setError("Token inválido. Solicite uma nova redefinição.");
            return;
        }

        if (!password || !confirmPassword) {
            setError("Preencha a nova senha.");
            return;
        }

        if (password.length < 6) {
            setError("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não conferem.");
            return;
        }

        setLoading(true);

        try {
            // Troca o token por uma sessão
            const { error: sessionError } = await supabase.auth.exchangeCodeForSession(token);
            
            if (sessionError) {
                if (sessionError.message?.includes("expired")) {
                    throw new Error("O link expirou. Solicite uma nova redefinição.");
                }
                throw sessionError;
            }

            // Atualiza a senha
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;

            setMessage("✅ Senha atualizada com sucesso!");

            // Redireciona para login após 2 segundos
            setTimeout(() => {
                navigate("/login", { 
                    state: { message: "Senha redefinida com sucesso! Faça login com sua nova senha." }
                });
            }, 2000);
        } catch (err: any) {
            console.error("Erro ao redefinir senha:", err);
            
            if (err.message?.includes("expired")) {
                setError("⏰ O link expirou. Solicite uma nova redefinição.");
            } else if (err.message?.includes("invalid")) {
                setError("🔒 Link inválido. Solicite uma nova redefinição.");
            } else {
                setError(err?.message || "Não foi possível atualizar a senha.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Estado: Validando token
    if (isVerifying) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <img
                            src="/logoLibrasQR-dark.png"
                            alt="LibrasQR"
                            style={styles.logo}
                            onError={(e) => {
                                e.currentTarget.src = "https://libras-qr.vercel.app/logoLibrasQR-dark.png";
                            }}
                        />
                        <h2 style={styles.title}>Validando link...</h2>
                        <p style={styles.description}>
                            Por favor, aguarde enquanto validamos seu link de redefinição.
                        </p>
                    </div>
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <div style={styles.spinner}></div>
                    </div>
                </div>
            </div>
        );
    }

    // Estado: Token inválido ou expirado
    if (tokenValid === false) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <img
                            src="/logoLibrasQR-dark.png"
                            alt="LibrasQR"
                            style={styles.logo}
                            onError={(e) => {
                                e.currentTarget.src = "https://libras-qr.vercel.app/logoLibrasQR-dark.png";
                            }}
                        />
                        <h2 style={styles.title}>🔗 Link Inválido ou Expirado</h2>
                        <p style={styles.description}>
                            O link de redefinição de senha não é mais válido.
                        </p>
                    </div>

                    <div style={styles.errorBox}>
                        <p style={{ margin: 0, color: "#b91c1c" }}>
                            {error || "Solicite uma nova redefinição de senha."}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/login")}
                        style={styles.submitButton}
                    >
                        Voltar ao Login
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        style={styles.linkButton}
                    >
                        Solicitar nova redefinição
                    </button>
                </div>
            </div>
        );
    }

    // Estado: Token válido - mostra o formulário
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <img
                        src="/logoLibrasQR-dark.png"
                        alt="LibrasQR"
                        style={styles.logo}
                        onError={(e) => {
                            e.currentTarget.src = "https://libras-qr.vercel.app/logoLibrasQR-dark.png";
                        }}
                    />
                    <h2 style={styles.title}>Definir nova senha</h2>
                    <p style={styles.description}>
                        Crie uma nova senha para sua conta
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        Nova senha
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Nova senha (mínimo 6 caracteres)"
                            disabled={loading}
                        />
                    </label>

                    <label style={styles.label}>
                        Confirmar senha
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Confirme a nova senha"
                            disabled={loading}
                        />
                    </label>

                    {error && <div style={styles.error}>{error}</div>}
                    {message && <div style={styles.success}>{message}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.submitButton,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "Salvando..." : "Salvar senha"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        style={styles.linkButton}
                    >
                        ← Voltar ao login
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f9fafb"
    },
    card: {
        background: "#fff",
        width: "100%",
        maxWidth: "420px",
        borderRadius: "14px",
        padding: "32px 28px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb"
    },
    header: {
        textAlign: "center",
        marginBottom: "28px"
    },
    logo: {
        width: "120px",
        marginBottom: "16px"
    },
    title: {
        margin: "0 0 6px 0",
        color: "#111827",
        fontSize: "22px",
        fontWeight: 700
    },
    description: {
        margin: 0,
        fontSize: "14px",
        color: "#6b7280"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    label: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        fontSize: "14px",
        fontWeight: 600,
        color: "#374151"
    },
    input: {
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "10px 12px",
        fontSize: "14px",
        color: "#000",
        background: "#fff",
        transition: "border-color 0.2s, box-shadow 0.2s"
    },
    error: {
        padding: "10px 12px",
        background: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#b91c1c",
        borderRadius: "8px",
        fontSize: "14px"
    },
    errorBox: {
        padding: "16px",
        background: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: "8px",
        marginBottom: "20px"
    },
    success: {
        padding: "10px 12px",
        background: "#ecfdf5",
        border: "1px solid #a7f3d0",
        color: "#047857",
        borderRadius: "8px",
        fontSize: "14px"
    },
    submitButton: {
        marginTop: "4px",
        border: "none",
        borderRadius: "8px",
        padding: "12px",
        background: "#111827",
        color: "#fff",
        fontWeight: 600,
        fontSize: "15px",
        transition: "background 0.2s",
        cursor: "pointer"
    },
    linkButton: {
        border: "none",
        background: "transparent",
        color: "#2563eb",
        cursor: "pointer",
        fontWeight: 500,
        padding: "8px",
        fontSize: "14px"
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #4F46E5",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto"
    }
};
