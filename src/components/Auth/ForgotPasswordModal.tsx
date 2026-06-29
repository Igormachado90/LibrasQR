import { useState } from "react";
import supabase from "../../lib/supabase";

type ForgotPasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin?: () => void;
    onSwitchToReset?: (token: string, email: string) => void;
};

export default function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin, onSwitchToReset }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleClose = () => {
        setEmail("");
        setMessage("");
        setError("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Informe seu e-mail.");
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
                redirectTo: `${window.location.origin}/login`
            });

            if (error) throw error;

            setMessage("Se o e-mail estiver cadastrado, enviaremos instruções para redefinir a senha.");
            onSwitchToReset?.("", email.trim());
        } catch (err: any) {
            setError(err?.message || "Não foi possível enviar a recuperação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Recuperar senha</h3>
                    <button type="button" onClick={handleClose} style={styles.closeButton}>×</button>
                </div>

                <p style={styles.description}>Informe o e-mail da sua conta para receber as instruções de recuperação.</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        E-mail
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} placeholder="seu@email.com" />
                    </label>

                    {error ? <div style={styles.error}>{error}</div> : null}
                    {message ? <div style={styles.success}>{message}</div> : null}

                    <button type="submit" disabled={loading} style={styles.submitButton}>
                        {loading ? "Enviando..." : "Enviar instruções"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Lembrou a senha?{' '}
                    <button type="button" onClick={() => { handleClose(); onSwitchToLogin?.(); }} style={styles.linkButton}>
                        Voltar ao login
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
