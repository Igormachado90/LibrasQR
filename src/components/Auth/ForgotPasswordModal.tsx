import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";

type ForgotPasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin?: () => void;
};

// Constantes para controle de rate limit
const RATE_LIMIT = {
    MAX_ATTEMPTS: 3,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutos
    COOLDOWN_MS: 60 * 1000 // 1 minuto entre tentativas
};

export default function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }: ForgotPasswordModalProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const attemptCountRef = useRef<number>(0);
    const firstAttemptTimeRef = useRef<number | null>(null);
    const lastAttemptTimeRef = useRef<number | null>(null);
    const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleClose = () => {
        setEmail("");
        setMessage("");
        setError("");
        setCooldownRemaining(0);

        if (cooldownIntervalRef.current) {
            clearInterval(cooldownIntervalRef.current);
            cooldownIntervalRef.current = null;
        }

        onClose();
    };

     const handleSwitchToLogin = async () => {
        if (isLoggingOut) return; // Previne múltiplos cliques
        
        setIsLoggingOut(true);
        setError("");
        setMessage("");
        
        try {
            // Verifica se há sessão ativa
            const { data: { session } } = await supabase.auth.getSession();
            
            // Se tiver sessão, faz logout
            if (session) {
                const { error } = await supabase.auth.signOut();
                if (error) {
                    console.error('Erro ao fazer logout:', error);
                } else {
                    console.log('✅ Usuário deslogado com sucesso');
                }
            }
            
            // Fecha o modal
            handleClose();
            
            // Chama a função do pai ou navega diretamente
            if (onSwitchToLogin) {
                onSwitchToLogin();
            } else {
                navigate('/login', { replace: true });
            }
            
        } catch (error) {
            console.error('Erro ao voltar para login:', error);
            // Tenta navegar mesmo com erro
            handleClose();
            if (onSwitchToLogin) {
                onSwitchToLogin();
            } else {
                navigate('/login', { replace: true });
            }
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Limpeza do intervalo quando o modal é desmontado
    useEffect(() => {
        return () => {
            if (cooldownIntervalRef.current) {
                clearInterval(cooldownIntervalRef.current);
            }
        };
    }, []);

    // Verifica se o usuário excedeu o limite de tentativas
    const checkRateLimit = (): { allowed: boolean; message?: string } => {
        const now = Date.now();

        // Reset do contador se passou a janela de tempo
        if (firstAttemptTimeRef.current) {
            if (now - firstAttemptTimeRef.current > RATE_LIMIT.WINDOW_MS) {
                attemptCountRef.current = 0;
                firstAttemptTimeRef.current = null;
                lastAttemptTimeRef.current = null;
            }
        }

        // Verifica cooldown entre tentativas
        if (lastAttemptTimeRef.current) {
            const timeSinceLastAttempt = now - lastAttemptTimeRef.current;
            if (timeSinceLastAttempt < RATE_LIMIT.COOLDOWN_MS) {
                const remaining = Math.ceil((RATE_LIMIT.COOLDOWN_MS - timeSinceLastAttempt) / 1000);
                return {
                    allowed: false,
                    message: `Aguarde ${remaining} segundos antes de tentar novamente.`
                };
            }
        }

        // Verifica limite de tentativas
        if (attemptCountRef.current >= RATE_LIMIT.MAX_ATTEMPTS) {
            const remaining = Math.ceil(
                (RATE_LIMIT.WINDOW_MS - (now - firstAttemptTimeRef.current!)) / 60000
            );
            return {
                allowed: false,
                message: `Limite de tentativas excedido. Aguarde ${remaining} minutos.`
            };
        }

        return { allowed: true };
    };

    const startCooldownTimer = (seconds: number) => {
        setCooldownRemaining(seconds);

        if (cooldownIntervalRef.current) {
            clearInterval(cooldownIntervalRef.current);
        }

        cooldownIntervalRef.current = setInterval(() => {
            setCooldownRemaining((prev) => {
                if (prev <= 1) {
                    if (cooldownIntervalRef.current) {
                        clearInterval(cooldownIntervalRef.current!);
                        cooldownIntervalRef.current = null;
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Informe seu e-mail.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim().toLowerCase())) {
            setError("Por favor, insira um e-mail válido.");
            return;
        }

        const rateLimitCheck = checkRateLimit();
        if (!rateLimitCheck.allowed) {
            setError(rateLimitCheck.message || "Muitas tentativas. Aguarde um momento.");
            if (rateLimitCheck.message?.includes("segundos")) {
                const seconds = parseInt(rateLimitCheck.message.match(/\d+/)?.[0] || "60");
                startCooldownTimer(seconds);
            }
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
                redirectTo: `https://libras-qr.vercel.app/reset-password`
                // redirectTo: `${window.location.origin}/reset-password`
            });

            if (error) {
                // Tratamento específico para erro 429
                if (error.status === 429) {
                    const now = Date.now();
                    attemptCountRef.current += 1;

                    if (!firstAttemptTimeRef.current) {
                        firstAttemptTimeRef.current = now;
                    }
                    lastAttemptTimeRef.current = now;

                    // Inicia cooldown de 1 minuto
                    startCooldownTimer(60);

                    throw new Error("Muitas tentativas. Aguarde 1 minuto antes de tentar novamente.");
                }
                throw error;
            }

            // Sucesso - reset do contador
            attemptCountRef.current = 0;
            firstAttemptTimeRef.current = null;
            lastAttemptTimeRef.current = null;

            setMessage("Se o e-mail estiver cadastrado, enviaremos instruções para redefinir a senha.");
            setEmail("");

            // Fecha o modal após sucesso
            setTimeout(() => {
                handleClose();
            }, 3000);

        } catch (err: any) {
            console.error("Erro ao recuperar senha:", err);

            // Mensagens amigáveis para diferentes erros
            let errorMessage = err?.message || "Não foi possível enviar a recuperação.";

            if (err?.status === 400) {
                errorMessage = "E-mail inválido ou não cadastrado.";
            } else if (err?.status === 429) {
                errorMessage = "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
            } else if (err?.message?.includes("network")) {
                errorMessage = "Erro de conexão. Verifique sua internet.";
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Recuperar senha</h3>
                    <button type="button" onClick={handleClose} style={styles.closeButton} disabled={loading} >×</button>
                </div>

                <p style={styles.description}>Informe o e-mail da sua conta para receber as instruções de recuperação.</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        E-mail
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{
                            ...styles.input,
                            opacity: loading || cooldownRemaining > 0 ? 0.6 : 1,
                        }} placeholder="seu@email.com" disabled={loading || cooldownRemaining > 0}
                            autoFocus />
                    </label>

                    {error && <div style={styles.error}>{error}</div>}
                    {message && <div style={styles.success}>{message}</div>}

                    {cooldownRemaining > 0 && (
                        <div style={styles.cooldown}>
                            ⏳ Aguarde {cooldownRemaining}s para tentar novamente
                        </div>
                    )}

                    <button type="submit" disabled={loading || cooldownRemaining > 0 || !email.trim()} style={{
                        ...styles.submitButton,
                        opacity: (loading || cooldownRemaining > 0 || !email.trim()) ? 0.6 : 1,
                        cursor: (loading || cooldownRemaining > 0 || !email.trim()) ? "not-allowed" : "pointer"
                    }}>
                        {loading ? "Enviando..." : cooldownRemaining > 0 ? "Aguarde..." : "Enviar instruções"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Lembrou a senha?{' '}
                    <button
                        type="button"
                        onClick={handleSwitchToLogin}
                        style={{
                            ...styles.linkButton,
                            opacity: isLoggingOut ? 0.6 : 1,
                            cursor: isLoggingOut ? "not-allowed" : "pointer"
                        }}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? "Saindo..." : "Voltar ao login"}
                    </button>
                </p>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px"
    },
    modal: {
        background: "#fff",
        width: "100%",
        maxWidth: "420px",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.2)"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px"
    },
    title: {
        margin: 0,
        color: "#111827",
        fontSize: "20px"
    },
    closeButton: {
        border: "none",
        background: "transparent",
        fontSize: "24px",
        cursor: "pointer",
        color: "#6b7280"
    },
    description: {
        margin: "0 0 14px",
        fontSize: "14px",
        color: "#6b7280"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
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
        background: "#fff"
    },
    error: {
        padding: "10px 12px",
        background: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#b91c1c",
        borderRadius: "8px",
        fontSize: "14px"
    },
    success: {
        padding: "10px 12px",
        background: "#ecfdf5",
        border: "1px solid #a7f3d0",
        color: "#047857",
        borderRadius: "8px",
        fontSize: "14px"
    },
    cooldown: {
        padding: "10px 12px",
        background: "#fef3c7",
        border: "1px solid #fde68a",
        color: "#92400e",
        borderRadius: "8px",
        fontSize: "14px",
        textAlign: "center"
    },
    submitButton: {
        marginTop: "4px",
        border: "none",
        borderRadius: "8px",
        padding: "12px",
        background: "#111827",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600
    },
    footerText: {
        marginTop: "14px",
        textAlign: "center",
        color: "#6b7280",
        fontSize: "14px"
    },
    linkButton: {
        border: "none",
        background: "transparent",
        color: "#2563eb",
        cursor: "pointer",
        fontWeight: 600,
        padding: 0
    }
};
