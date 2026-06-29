import { useState } from "react";
import supabase from "../../lib/supabase";

type RegisterModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: { email: string }) => void;
    onSwitchToLogin?: () => void;
};

const getAuthErrorMessage = (err: any) => {
    const message = String(err?.message || "").toLowerCase();

    if (message.includes("rate limit") || message.includes("too many requests") || message.includes("429")) {
        return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.";
    }

    if (message.includes("already registered") || message.includes("user already registered")) {
        return "Este e-mail já está cadastrado.";
    }

    if (message.includes("password") && message.includes("weak")) {
        return "A senha não atende aos requisitos de segurança.";
    }

    return err?.message || "Não foi possível concluir o cadastro.";
};

export default function RegisterModal({ isOpen, onClose, onSuccess, onSwitchToLogin }: RegisterModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<"aluno" | "professor" | "interprete" | "admin">("aluno");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("aluno");
        setMessage("");
        setError("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Preencha todos os campos.");
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
            const cleanEmail = email.trim().toLowerCase();
            const { data: existingUser } = await supabase
                .from("usuarios")
                .select("id")
                .eq("email", cleanEmail)
                .maybeSingle();

            if (existingUser) {
                setError("Este e-mail já está cadastrado.");
                setLoading(false);
                return;
            }

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: cleanEmail,
                password,
                options: {
                    data: {
                        nome: name.trim(),
                        tipo: role
                    }
                }
            });

            if (authError) {
                throw authError;
            }

            const authUserId = authData?.user?.id ?? authData?.session?.user?.id;

            if (!authUserId) {
                throw new Error("Não foi possível criar o usuário de autenticação.");
            }

            const { error: insertError } = await supabase.from("usuarios").insert({
                auth_uid: authUserId,
                nome: name.trim(),
                email: cleanEmail,
                tipo: role,
                status: "ativo",
                data_cadastro: new Date().toISOString()
            });

            if (insertError) {
                await supabase.auth.admin.deleteUser(authUserId).catch(() => undefined);
                throw insertError;
            }

            setMessage("Cadastro realizado com sucesso! Você pode entrar agora.");
            onSuccess?.({ email: cleanEmail });
            handleClose();
        } catch (err: any) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Criar conta</h3>
                    <button type="button" onClick={handleClose} style={styles.closeButton}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        Nome
                        <input value={name} onChange={(e) => setName(e.target.value)} style={styles.input} placeholder="Seu nome" />
                    </label>

                    <label style={styles.label}>
                        E-mail
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} placeholder="seu@email.com" />
                    </label>

                    <label style={styles.label}>
                        Tipo de acesso
                        <select value={role} onChange={(e) => setRole(e.target.value as any)} style={styles.input}>
                            <option value="aluno">Aluno</option>
                            <option value="professor">Professor</option>
                            <option value="interprete">Intérprete</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>

                    <label style={styles.label}>
                        Senha
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} placeholder="Mínimo 6 caracteres" />
                    </label>

                    <label style={styles.label}>
                        Confirmar senha
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} placeholder="Repita a senha" />
                    </label>

                    {error ? <div style={styles.error}>{error}</div> : null}
                    {message ? <div style={styles.success}>{message}</div> : null}

                    <button type="submit" disabled={loading} style={styles.submitButton}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Já tem conta?{' '}
                    <button type="button" onClick={() => { handleClose(); onSwitchToLogin?.(); }} style={styles.linkButton}>
                        Entrar
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
        maxWidth: "440px",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.2)"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
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
        color: "#374151",
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
