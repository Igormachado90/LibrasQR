import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Input from "../../../components/Form/Input";
import Section from "../../../components/Form/Section";
import Select from "../../../components/Form/Select";
import { useTheme } from "../../../components/contexts/ThemeContext";
import supabase from "../../../lib/supabase";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUserTag,
    FaToggleOn,
    FaToggleOff,
    FaBuilding,
    FaMapMarkerAlt,
    FaCity,
    FaFlag,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaSave,
    FaSpinner,
    FaCopy,
    FaArrowLeft
} from "react-icons/fa";


interface UsuarioFormData {
    nome: string;
    email: string;
    telefone: string;
    tipo: string;
    status: string;
    data_cadastro?: string;
    instituicao: string;
    cidade: string;
    estado: string;
    endereco: string;
}

interface ValidationError {
    campo: string;
    mensagem: string;
}

export default function UsuariosForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

    const [formData, setFormData] = useState<UsuarioFormData>({
        nome: '',
        email: '',
        telefone: '',
        tipo: 'aluno',
        status: 'ativo',
        instituicao: '',
        cidade: '',
        estado: '',
        endereco: ''
    });

    // Opções para selects
    const estadoOptions = [
        { value: '', label: 'Selecione um estado' },
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'TO', label: 'Tocantins' }
    ];

    const tipoOptions = [
        { value: 'admin', label: 'Administrador', desc: 'Acesso total ao sistema' },
        { value: 'professor', label: 'Professor', desc: 'Gerenciar cursos e materiais' },
        { value: 'interprete', label: 'Intérprete de LIBRAS', desc: 'Tradução e interpretação' },
        { value: 'aluno', label: 'Aluno', desc: 'Acesso a conteúdos educacionais' }
    ];

    const statusOptions = [
        { value: 'Ativo', label: '✅ Ativo' },
        { value: 'Inativo', label: '❌ Inativo' },
        { value: 'bloqueado', label: '🚫 Bloqueado' }, // ← mudou de 'Pendente' para 'bloqueado'
        { value: 'pendente', label: '⏳ Pendente' }
    ];

    // Efeito para carregar dados do usuário
    useEffect(() => {
        if (isEditing) {
            fetchUsuario();
        }
    }, [id]);

    // Efeito para calcular força da senha
    useEffect(() => {
        if (password) {
            calculatePasswordStrength(password);
        } else {
            setPasswordStrength(0);
        }
    }, [password]);

    const fetchUsuario = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("usuarios")  // ← Nome da tabela em minúsculo
                .select("*")
                .eq("id", id)      // ← Chave primária é 'id'
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    nome: data.nome || "",
                    email: data.email || "",
                    telefone: data.telefone || "",
                    tipo: data.tipo || "aluno",
                    status: data.status?.toLowerCase() || "ativo",
                    data_cadastro: data.data_cadastro,
                    instituicao: data.instituicao || "",
                    cidade: data.cidade || "",
                    estado: data.estado || "",
                    endereco: data.endereco || ""
                });
            }
        } catch (err: any) {
            console.error("Erro ao carregar usuário:", err);
            toast.error("Erro ao carregar usuário");
        } finally {
            setLoading(false);
        }
    };

    const calculatePasswordStrength = (pass: string) => {
        let strength = 0;

        if (pass.length >= 8) strength += 25;
        if (/[A-Z]/.test(pass)) strength += 25;
        if (/[a-z]/.test(pass)) strength += 25;
        if (/[0-9]/.test(pass)) strength += 15;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 10;

        setPasswordStrength(strength);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 30) return 'var(--danger)';
        if (passwordStrength < 60) return 'var(--warning)';
        if (passwordStrength < 80) return 'var(--info)';
        return 'var(--success)';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength < 30) return 'Muito fraca';
        if (passwordStrength < 60) return 'Fraca';
        if (passwordStrength < 80) return 'Boa';
        return 'Forte';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => prev.filter(e => e.campo !== name));
    };

    const generatePassword = () => {
        const length = 12;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let newPassword = '';

        newPassword += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
        newPassword += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        newPassword += '0123456789'[Math.floor(Math.random() * 10)];
        newPassword += '!@#$%^&*'[Math.floor(Math.random() * 8)];

        for (let i = 4; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');

        setPassword(newPassword);
        setConfirmPassword(newPassword);
        toast.success('✅ Senha forte gerada com sucesso!');
    };

    const copyPassword = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            toast.success('📋 Senha copiada para a área de transferência!');
        }
    };

    const validateForm = () => {
        const newErrors: ValidationError[] = [];

        if (!formData.nome.trim()) {
            newErrors.push({ campo: 'nome', mensagem: 'O nome do usuário é obrigatório' });
        } else if (formData.nome.trim().length < 3) {
            newErrors.push({ campo: 'nome', mensagem: 'O nome deve ter pelo menos 3 caracteres' });
        }

        if (!formData.email.trim()) {
            newErrors.push({ campo: 'email', mensagem: 'O email é obrigatório' });
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.push({ campo: 'email', mensagem: 'Email inválido' });
            }
        }

        if (!isEditing) {
            if (!password) {
                newErrors.push({ campo: 'password', mensagem: 'A senha é obrigatória' });
            } else if (password.length < 8) {
                newErrors.push({ campo: 'password', mensagem: 'A senha deve ter pelo menos 8 caracteres' });
            } else if (password !== confirmPassword) {
                newErrors.push({ campo: 'confirmPassword', mensagem: 'As senhas não coincidem' });
            }
        }

        if (formData.telefone && !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.telefone)) {
            newErrors.push({ campo: 'telefone', mensagem: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX' });
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("🎯 Botão SALVAR clicado!"); // Debug

        if (saving) return;

        if (!validateForm()) {
            toast.error('Por favor, corrija os erros no formulário');
            return;
        }

        setSaving(true);

        try {
            // 🔥 EMAIL PADRONIZADO (CORREÇÃO PRINCIPAL)
            const cleanEmail = formData.email.trim().toLowerCase();

            // =========================
            // 🔵 UPDATE USER
            // =========================
            if (isEditing) {
                const payload = {
                    nome: formData.nome,
                    email: cleanEmail,
                    telefone: formData.telefone || null,
                    tipo: formData.tipo,
                    status: formData.status?.toLowerCase() || null,
                    instituicao: formData.instituicao || null,
                    cidade: formData.cidade || null,
                    estado: formData.estado || null,
                    endereco: formData.endereco || null,
                    updated_at: new Date().toISOString()
                };

                console.log("📝 Atualizando usuário:", payload);

                const { error } = await supabase
                    .from("usuarios")
                    .update(payload)
                    .eq("id", id)
                    

                if (error) {
                    console.error("Erro ao atualizar:", error);
                    toast.error(`Erro ao atualizar: ${error.message}`);
                    return;
                }

                
                toast.success('✅ Usuário atualizado com sucesso!');
                navigate('/admin/usuarios');
                return;
            }

            // =========================
            // 🟢 CREATE USER (AUTH)
            // =========================

            // 🔥 VERIFICA SE O EMAIL JÁ EXISTE PRIMEIRO
            console.log("1. Verificando se o email já existe...");
            const { data: existingUser } = await supabase
                .from("usuarios")
                .select("email")
                .eq("email", cleanEmail)
                .maybeSingle();

            if (existingUser) {
                toast.error('Este email já está cadastrado no sistema');
                setSaving(false);
                return;
            }

            console.log("2. Criando conta auth para:", cleanEmail);

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: cleanEmail,
                password: password,
                options: {
                    data: {
                        nome: formData.nome,
                        tipo: formData.tipo
                    }
                }
            });

            if (authError) {
                console.error("Erro auth:", authError);

                // Tratamento específico para cada erro
                if (authError.message.includes('rate limit')) {
                    toast.error('🕐 Muitas tentativas. Aguarde alguns minutos.');
                } else if (authError.message.includes('already registered')) {
                    toast.error('📧 Este email já está cadastrado no sistema');
                } else if (authError.message.includes('User already registered')) {
                    toast.error('📧 Usuário já existe com este email');
                } else {
                    toast.error(`Erro de autenticação: ${authError.message}`);
                }
                setSaving(false);
                return;
            }

            if (!authData?.user?.id) {
                toast.error('❌ Falha ao criar usuário no sistema de autenticação');
                setSaving(false);
                return;
            }

            const authUserId = authData.user.id;
            console.log("✅ Auth criado! ID:", authUserId);

            console.log("3. Auth criado com sucesso! ID:", authUserId);

            // =========================
            // 🟡 INSERT TABELA USUARIOS
            // =========================
            const payload = {
                auth_uid: authUserId,
                nome: formData.nome,
                email: cleanEmail,
                telefone: formData.telefone || null,
                tipo: formData.tipo,
                status: formData.status?.toLowerCase() || 'ativo',
                instituicao: formData.instituicao || null,
                cidade: formData.cidade || null,
                estado: formData.estado || null,
                endereco: formData.endereco || null,
                data_cadastro: new Date().toISOString()
            };

            console.log("4. Inserindo na tabela usuarios:", payload);

            const { data: insertedData, error: dbError } = await supabase
                .from("usuarios")
                .insert([payload])
                .select();

            if (dbError) {
                console.error("Erro DB:", dbError);

                // ⚠️ rollback (melhor esforço)
                try {
                    await supabase.auth.admin.deleteUser(authUserId);
                } catch (e) {
                    console.error("Rollback falhou:", e);
                }

                if (dbError.code === '23505') {
                    toast.error('Email já existe no sistema');
                } else {
                    toast.error(dbError.message);
                }

                return;
            }

            console.log("5. ✅ Usuário criado com sucesso!", insertedData);

            // Mostra mensagem de sucesso com dados do usuário
            toast.success(
                <div>
                    <strong>✅ Usuário criado com sucesso!</strong>
                    <br />
                    <span style={{ fontSize: '14px' }}>
                        📧 Email: <strong>{cleanEmail}</strong>
                        <br />
                        🔑 Senha: <strong>{password}</strong>
                        <br />
                        👤 Tipo: <strong>{formData.tipo}</strong>
                    </span>
                    <br />
                    <span style={{ fontSize: '12px', color: '#666' }}>
                        ⚠️ Guarde esta senha em local seguro
                    </span>
                </div>,
                { duration: 10000 }
            );

            navigate('/admin/usuarios');

        } catch (err: any) {
            console.error("Erro geral:", err);
            toast.error(err.message || "Erro ao salvar usuário");
        } finally {
            setSaving(false);
        }
    };

    // Estilos (mantidos os mesmos do original)
    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            animation: 'fadeIn 0.5s ease-out'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
        },
        backButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#e5e7eb' : '#374151',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        titleContainer: {
            flex: 1
        },
        title: {
            margin: 0,
            fontSize: '28px',
            fontWeight: '700',
            color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        subtitle: {
            margin: '4px 0 0',
            fontSize: '14px',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
        },
        form: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: theme === 'dark'
                ? '0 10px 30px rgba(0,0,0,0.3)'
                : '0 10px 30px rgba(0,0,0,0.05)',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
        },
        passwordSection: {
            gridColumn: 'span 2',
            background: theme === 'dark' ? '#374151' : '#f9fafb',
            padding: '20px',
            borderRadius: '12px',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`
        },
        passwordContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            gap: '12px',
            marginBottom: '12px'
        },
        passwordField: {
            position: 'relative' as const
        },
        passwordToggle: {
            position: 'absolute' as const,
            right: '12px',
            top: '38px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            fontSize: '16px'
        },
        passwordStrength: {
            marginTop: '8px',
            padding: '8px',
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '6px',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`
        },
        passwordStrengthBar: {
            height: '6px',
            background: theme === 'dark' ? '#374151' : '#e5e7eb',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '4px'
        },
        passwordStrengthFill: {
            height: '100%',
            background: getPasswordStrengthColor(),
            width: `${passwordStrength}%`,
            transition: 'width 0.3s ease, background 0.3s ease'
        },
        passwordStrengthText: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
        },
        passwordHint: {
            fontSize: '12px',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            background: theme === 'dark' ? '#1f2937' : '#f3f4f6',
            padding: '12px',
            borderRadius: '8px',
            marginTop: '12px',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`
        },
        passwordRequirements: {
            marginTop: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            fontSize: '12px'
        },
        requirement: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
        },
        requirementMet: {
            color: 'var(--success)'
        },
        passwordActions: {
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end'
        },
        generateButton: {
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            height: '46px'
        },
        copyButton: {
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            height: '46px'
        },
        systemInfo: {
            gridColumn: 'span 2',
            background: theme === 'dark' ? '#374151' : '#f8fafc',
            padding: '16px',
            borderRadius: '8px',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e2e8f0'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        systemInfoBadge: {
            background: '#4F46E5',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
        },
        actionsContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
        },
        cancelButton: {
            padding: '12px 24px',
            borderRadius: '8px',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#e5e7eb' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        submitButton: {
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        errorText: {
            fontSize: '12px',
            color: 'var(--danger)',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        }
    };

    if (loading && isEditing) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh'
            }}>
                <FaSpinner style={{
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite',
                    color: 'var(--primary)'
                }} />
                <p style={{
                    marginTop: '16px',
                    color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                }}>
                    Carregando dados do usuário...
                </p>
            </div>
        );
    }

    return (
        <>
            <div style={styles.container}>
                <div style={styles.header}>

                    <div style={styles.titleContainer}>
                        <h1 style={styles.title}>
                            {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
                        </h1>
                        <p style={styles.subtitle}>
                            {isEditing
                                ? "Atualize as informações do usuário abaixo."
                                : "Preencha o formulário para adicionar um novo usuário."}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Seção: Dados do Usuário */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                            <FaUser color="var(--primary)" />
                            Dados do Usuário
                        </span>
                    }>
                        <div>
                            <Input
                                label="Nome Completo *"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Digite o nome completo"
                            // error={getErrorMessage('nome')}
                            />
                        </div>

                        <div>
                            <Input
                                label="Email *"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="exemplo@email.com"
                            // error={getErrorMessage('email')}
                            />
                        </div>

                        <div>
                            <Input
                                label="Telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder="(XX) XXXXX-XXXX"
                            // error={getErrorMessage('telefone')}
                            />
                        </div>

                        <Select
                            label="Tipo de Perfil *"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                        >
                            {tipoOptions.map(tipo => (
                                <option key={tipo.value} value={tipo.value} title={tipo.desc}>
                                    {tipo.label}
                                </option>
                            ))}
                        </Select>

                        <Select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statusOptions.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </Select>
                    </Section>

                    {/* Seção: Senha (apenas para novo usuário) */}
                    {!isEditing && (
                        <Section title={
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                <FaLock color="var(--warning)" />
                                Senha de Acesso
                            </span>
                        }>
                            <div style={styles.passwordSection}>
                                <div style={styles.passwordContainer}>
                                    <div style={styles.passwordField}>
                                        <Input
                                            label="Senha *"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setErrors(prev => prev.filter(e => e.campo !== 'password'));
                                            }}
                                            placeholder="Digite a senha"
                                            onFocus={() => setShowPasswordRequirements(true)}
                                        // error={getErrorMessage('password')}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={styles.passwordToggle}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>

                                    <div style={styles.passwordField}>
                                        <Input
                                            label="Confirmar Senha *"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setErrors(prev => prev.filter(e => e.campo !== 'confirmPassword'));
                                            }}
                                            placeholder="Confirme a senha"
                                        // error={getErrorMessage('confirmPassword')}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={styles.passwordToggle}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>

                                    <div style={styles.passwordActions}>
                                        <button
                                            type="button"
                                            onClick={generatePassword}
                                            style={styles.generateButton}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                        >
                                            🔑 Gerar
                                        </button>
                                        {password && (
                                            <button
                                                type="button"
                                                onClick={copyPassword}
                                                style={styles.copyButton}
                                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                            >
                                                <FaCopy /> Copiar
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Força da senha */}
                                {password && (
                                    <div style={styles.passwordStrength}>
                                        <div style={styles.passwordStrengthBar}>
                                            <div style={styles.passwordStrengthFill} />
                                        </div>
                                        <div style={styles.passwordStrengthText}>
                                            <span>Força da senha:</span>
                                            <span style={{
                                                color: getPasswordStrengthColor(),
                                                fontWeight: '600'
                                            }}>
                                                {getPasswordStrengthText()}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Requisitos da senha */}
                                {showPasswordRequirements && (
                                    <div style={styles.passwordRequirements}>
                                        <div style={{
                                            ...styles.requirement,
                                            ...(password && password.length >= 8 ? styles.requirementMet : {})
                                        }}>
                                            {password && password.length >= 8 ? <FaCheckCircle /> : <FaTimesCircle />}
                                            Mínimo 8 caracteres
                                        </div>
                                        <div style={{
                                            ...styles.requirement,
                                            ...(password && /[A-Z]/.test(password) ? styles.requirementMet : {})
                                        }}>
                                            {password && /[A-Z]/.test(password) ? <FaCheckCircle /> : <FaTimesCircle />}
                                            Letra maiúscula
                                        </div>
                                        <div style={{
                                            ...styles.requirement,
                                            ...(password && /[a-z]/.test(password) ? styles.requirementMet : {})
                                        }}>
                                            {password && /[a-z]/.test(password) ? <FaCheckCircle /> : <FaTimesCircle />}
                                            Letra minúscula
                                        </div>
                                        <div style={{
                                            ...styles.requirement,
                                            ...(password && /[0-9]/.test(password) ? styles.requirementMet : {})
                                        }}>
                                            {password && /[0-9]/.test(password) ? <FaCheckCircle /> : <FaTimesCircle />}
                                            Número
                                        </div>
                                        <div style={{
                                            ...styles.requirement,
                                            ...(password && /[^A-Za-z0-9]/.test(password) ? styles.requirementMet : {})
                                        }}>
                                            {password && /[^A-Za-z0-9]/.test(password) ? <FaCheckCircle /> : <FaTimesCircle />}
                                            Caractere especial
                                        </div>
                                    </div>
                                )}

                                <p style={styles.passwordHint}>
                                    <FaInfoCircle style={{ marginRight: '8px' }} />
                                    <strong>Importante:</strong> A senha será criptografada e usada para o primeiro acesso do usuário.
                                    Guarde esta senha em local seguro e compartilhe apenas com o usuário.
                                </p>
                            </div>
                        </Section>
                    )}

                    {/* Seção: Instituição e Localização */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                            <FaBuilding color="var(--info)" />
                            Instituição e Localização
                        </span>
                    }>
                        <Input
                            label="Instituição de Ensino"
                            name="instituicao"
                            value={formData.instituicao}
                            onChange={handleChange}
                            placeholder="Ex: IFPA - Campus Tucuruí"
                        />

                        <Input
                            label="Endereço"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            placeholder="Rua, número, complemento"
                        />

                        <Input
                            label="Cidade"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            placeholder="Digite a cidade"
                        />

                        <Select
                            label="Estado"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                        >
                            {estadoOptions.map(estado => (
                                <option key={estado.value} value={estado.value}>
                                    {estado.label}
                                </option>
                            ))}
                        </Select>
                    </Section>

                    {/* Informações do Sistema (apenas edição) */}
                    {isEditing && formData.data_cadastro && (
                        <Section title={
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FaInfoCircle color="var(--info)" />
                                ℹ️ Informações do Sistema
                            </span>
                        }>
                            <div style={styles.systemInfo}>
                                <span style={styles.systemInfoBadge}>
                                    <FaInfoCircle /> CADASTRO
                                </span>
                                <span>
                                    <strong>Data de cadastro:</strong>{' '}
                                    {new Date(formData.data_cadastro).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </Section>
                    )}

                    {/* Botões de ação */}
                    <div style={styles.actionsContainer}>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/usuarios')}
                            style={styles.cancelButton}
                            disabled={saving}
                        >
                            <FaTimesCircle /> Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            // onClick={(e) => {
                            //     if (saving) {
                            //         e.preventDefault();
                            //         return;
                            //     }
                            // }}
                            style={{
                                ...styles.submitButton,
                                opacity: saving ? 0.6 : 1,
                                cursor: saving ? 'not-allowed' : 'pointer',
                                pointerEvents: saving ? 'none' : 'auto'
                            }}
                        >
                            {saving ? (
                                <>
                                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                                    Salvando...
                                </>
                            ) : (
                                isEditing
                                    ? (<><FaSave /> Atualizar Usuário</>)
                                    : (<><FaCheckCircle /> Salvar Usuário</>)
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                input, select {
                    background-color: ${theme === 'dark' ? '#374151' : '#ffffff'} !important;
                    color: ${theme === 'dark' ? '#e5e7eb' : '#1f2937'} !important;
                    border-color: ${theme === 'dark' ? '#4b5563' : '#d1d5db'} !important;
                    transition: all 0.2s ease;
                }

                input:focus, select:focus {
                    border-color: #4F46E5 !important;
                    box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(79, 70, 229, 0.3)' : 'rgba(79, 70, 229, 0.1)'} !important;
                    outline: none;
                }

                input::placeholder {
                    color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'} !important;
                }

                select option {
                    background-color: ${theme === 'dark' ? '#1f2937' : '#ffffff'};
                    color: ${theme === 'dark' ? '#e5e7eb' : '#1f2937'};
                }

                button {
                    transition: all 0.2s ease;
                }

                button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                button:active:not(:disabled) {
                    transform: translateY(0);
                }
            `}</style>
        </>
    );

    // Função helper para getErrorMessage
    function getErrorMessage(campo: string): string | undefined {
        return errors.find(e => e.campo === campo)?.mensagem;
    }
}