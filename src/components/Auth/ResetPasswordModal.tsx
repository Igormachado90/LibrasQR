import { useState } from "react";
import supabase from "../../lib/supabase";

type ResetPasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    token?: string;
    email?: string;
    onSwitchToLogin?: () => void;
};

export default function ResetPasswordModal({ isOpen, onClose, token, email, onSwitchToLogin }: ResetPasswordModalProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleClose = () => {
        setPassword("");
        setConfirmPassword("");
        setMessage("");
        setError("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

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
            if (token) {
                const { error: sessionError } = await supabase.auth.exchangeCodeForSession(token);
                if (sessionError) {
                    throw sessionError;
                }
            }

            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;

            setMessage("Senha atualizada com sucesso!");
            setTimeout(() => handleClose(), 1000);
        } catch (err: any) {
            setError(err?.message || "Não foi possível atualizar a senha.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Definir nova senha</h3>
                    <button type="button" onClick={handleClose} style={styles.closeButton}>×</button>
                </div>

                <p style={styles.description}>{email ? `Atualize sua senha para ${email}` : "Atualize sua senha abaixo."}</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        Nova senha
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} placeholder="Nova senha" />
                    </label>

                    <label style={styles.label}>
                        Confirmar senha
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} placeholder="Confirme a nova senha" />
                    </label>

                    {error ? <div style={styles.error}>{error}</div> : null}
                    {message ? <div style={styles.success}>{message}</div> : null}

                    <button type="submit" disabled={loading} style={styles.submitButton}>
                        {loading ? "Salvando..." : "Salvar senha"}
                    </button>
                </form>

                <p style={styles.footerText}>
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
        fontSize: "14px"
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
