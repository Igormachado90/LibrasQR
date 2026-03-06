import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import Input from "../components/Form/Input";
import Section from "../components/Form/Section";
import Select from "../components/Form/Select";
import { supabase } from "../lib/supabase";
import bcrypt from 'bcryptjs';
import { useTheme } from "../components/contexts/ThemeContext";
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
    FaKey,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaArrowLeft,
    FaSave,
    FaEdit,
    FaPlus,
    FaSpinner,
    FaCopy,
    FaRandom
} from "react-icons/fa";

interface UsuarioFormData {
    Nome: string;
    Email: string;
    Telefone: string;
    Tipo: string;
    Status: string;
    DataCadastro?: string;
    Instituicao: string;
    Cidade: string;
    Estado: string;
    Endereco: string;
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
        Nome: '',
        Email: '',
        Telefone: '',
        Tipo: 'ALUNO_SURDO',
        Status: 'Ativo',
        Instituicao: '',
        Cidade: '',
        Estado: '',
        Endereco: ''
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
        { value: 'ADMINISTRADOR', label: 'Administrador', desc: 'Acesso total ao sistema' },
        { value: 'PROFESSOR', label: 'Professor', desc: 'Gerenciar cursos e materiais' },
        { value: 'INTERPRETE', label: 'Intérprete de LIBRAS', desc: 'Tradução e interpretação' },
        { value: 'ALUNO_SURDO', label: 'Aluno Surdo', desc: 'Acesso a conteúdos educacionais' },
        { value: 'SURDO_INSTRUTOR', label: 'Instrutor de surdo', desc: 'Criar e sinal de cursos para alunos surdos' }
    ];

    const statusOptions = [
        { value: 'Ativo', label: '✅ Ativo', icon: <FaCheckCircle />, color: 'var(--success)' },
        { value: 'Inativo', label: '❌ Inativo', icon: <FaTimesCircle />, color: 'var(--danger)' },
        { value: 'Pendente', label: '⏳ Pendente', icon: <FaExclamationTriangle />, color: 'var(--warning)' }
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
                .from("Usuarios")
                .select("*")
                .eq("Usuario_ID", id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    Nome: data.Nome || "",
                    Email: data.Email || "",
                    Telefone: data.Telefone || "",
                    Tipo: data.Tipo || "ALUNO_SURDO",
                    Status: data.Status || "Ativo",
                    DataCadastro: data.DataCadastro,
                    Instituicao: data.Instituicao || "",
                    Cidade: data.Cidade || "",
                    Estado: data.Estado || "",
                    Endereco: data.Endereco || ""
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

        // Comprimento mínimo
        if (pass.length >= 8) strength += 25;

        // Letras maiúsculas
        if (/[A-Z]/.test(pass)) strength += 25;

        // Letras minúsculas
        if (/[a-z]/.test(pass)) strength += 25;

        // Números
        if (/[0-9]/.test(pass)) strength += 15;

        // Caracteres especiais
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

        // Limpar erro do campo quando começar a digitar
        setErrors(prev => prev.filter(e => e.campo !== name));
    };

    const generatePassword = () => {
        const length = 12;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let newPassword = '';

        // Garantir pelo menos um caractere de cada tipo
        newPassword += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
        newPassword += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        newPassword += '0123456789'[Math.floor(Math.random() * 10)];
        newPassword += '!@#$%^&*'[Math.floor(Math.random() * 8)];

        // Completar o restante
        for (let i = 4; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        // Embaralhar a senha
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

    const hashPassword = async (plainPassword: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainPassword, salt);
    };

    const validateForm = () => {
        const newErrors: ValidationError[] = [];

        // Validação do nome
        if (!formData.Nome.trim()) {
            newErrors.push({ campo: 'Nome', mensagem: 'O nome do usuário é obrigatório' });
        } else if (formData.Nome.trim().length < 3) {
            newErrors.push({ campo: 'Nome', mensagem: 'O nome deve ter pelo menos 3 caracteres' });
        }

        // Validação do email
        if (!formData.Email.trim()) {
            newErrors.push({ campo: 'Email', mensagem: 'O email é obrigatório' });
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.Email)) {
                newErrors.push({ campo: 'Email', mensagem: 'Email inválido' });
            }
        }

        // Validação da senha (apenas para novo usuário)
        if (!isEditing) {
            if (!password) {
                newErrors.push({ campo: 'password', mensagem: 'A senha é obrigatória' });
            } else if (password.length < 8) {
                newErrors.push({ campo: 'password', mensagem: 'A senha deve ter pelo menos 8 caracteres' });
            } else if (password !== confirmPassword) {
                newErrors.push({ campo: 'confirmPassword', mensagem: 'As senhas não coincidem' });
            }
        }

        // Validação do telefone (opcional mas válido)
        if (formData.Telefone && !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.Telefone)) {
            newErrors.push({ campo: 'Telefone', mensagem: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX' });
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const getErrorMessage = (campo: string) => {
        return errors.find(e => e.campo === campo)?.mensagem;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Por favor, corrija os erros no formulário');
            return;
        }

        setSaving(true);

        try {
            let hashedPassword = '';

            if (!isEditing && password) {
                hashedPassword = await hashPassword(password);
            }

            const payload: any = {
                Nome: formData.Nome,
                Email: formData.Email,
                Telefone: formData.Telefone || null,
                Tipo: formData.Tipo,
                Status: formData.Status,
                Instituicao: formData.Instituicao || null,
                Cidade: formData.Cidade || null,
                Estado: formData.Estado || null,
                Endereco: formData.Endereco || null
            };

            if (!isEditing) {
                payload.Senha = hashedPassword;
                payload.DataCadastro = new Date().toISOString();
            }

            if (isEditing) {
                const { error } = await supabase
                    .from("Usuarios")
                    .update(payload)
                    .eq("Usuario_ID", id);

                if (error) throw error;
                toast.success(
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCheckCircle size={20} />
                        <span>✅ Usuário atualizado com sucesso!</span>
                    </div>
                );
            } else {
                const { error } = await supabase
                    .from("Usuarios")
                    .insert([payload]);

                if (error) throw error;

                toast.success(
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaCheckCircle size={20} />
                            <strong>✅ Usuário criado com sucesso!</strong>
                        </div>
                        <div style={{
                            background: 'var(--bg-tertiary)',
                            padding: '8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontFamily: 'monospace'
                        }}>
                            <strong>Senha gerada:</strong> {password}
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(password);
                                    toast.success('Senha copiada!');
                                }}
                                style={{
                                    marginLeft: '8px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--primary)'
                                }}
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>,
                    {
                        duration: 10000,
                        icon: '🔐'
                    }
                );
            }

            navigate('/usuarios');
        } catch (err: any) {
            console.error("Erro detalhado:", err);

            if (err.code === "23505") {
                toast.error('Este email já está cadastrado');
            } else if (err.code === "22P02") {
                toast.error('Dados inválidos. Verifique os campos preenchidos');
            } else {
                toast.error(err.message || "Erro ao salvar usuário");
            }
        } finally {
            setSaving(false);
        }
    };

    // Estilos baseados no tema
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
            <DashboardLayout>
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
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={styles.container}>
                {/* Header */}
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
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'dark' ? '#f3f4f6' : '#1f2937', }}>
                            <FaUser color="var(--primary)" />
                            Dados do Usuário
                        </span>
                    }>
                        <div>
                            <Input
                                label="Nome Completo *"
                                name="Nome"
                                value={formData.Nome}
                                onChange={handleChange}
                                icon={<FaUser />}
                                error={getErrorMessage('Nome')}
                                placeholder="Digite o nome completo"
                            />
                        </div>

                        <div>
                            <Input
                                label="Email *"
                                name="Email"
                                type="email"
                                value={formData.Email}
                                onChange={handleChange}
                                icon={<FaEnvelope />}
                                error={getErrorMessage('Email')}
                                placeholder="exemplo@email.com"
                            />
                        </div>

                        <div>
                            <Input
                                label="Telefone"
                                name="Telefone"
                                value={formData.Telefone}
                                onChange={handleChange}
                                icon={<FaPhone />}
                                error={getErrorMessage('Telefone')}
                                placeholder="(XX) XXXXX-XXXX"
                            />
                        </div>

                        <Select
                            label="Tipo de Perfil *"
                            name="Tipo"
                            value={formData.Tipo}
                            onChange={handleChange}
                            icon={<FaUserTag />}
                        >
                            {tipoOptions.map(tipo => (
                                <option key={tipo.value} value={tipo.value} title={tipo.desc}>
                                    {tipo.label}
                                </option>
                            ))}
                        </Select>

                        <Select
                            label="Status"
                            name="Status"
                            value={formData.Status}
                            onChange={handleChange}
                            icon={formData.Status === 'Ativo' ? <FaToggleOn /> : <FaToggleOff />}
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
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'dark' ? '#f3f4f6' : '#1f2937', }}>
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
                                            icon={<FaLock />}
                                            error={getErrorMessage('password')}
                                            placeholder="Digite a senha"
                                            onFocus={() => setShowPasswordRequirements(true)}
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
                                            icon={<FaCheckCircle />}
                                            error={getErrorMessage('confirmPassword')}
                                            placeholder="Confirme a senha"
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
                                            <FaRandom /> Gerar
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
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'dark' ? '#f3f4f6' : '#1f2937', }}>
                            <FaBuilding color="var(--info)" />
                            Instituição e Localização
                        </span>
                    }>
                        <Input
                            label="Instituição de Ensino"
                            name="Instituicao"
                            value={formData.Instituicao}
                            onChange={handleChange}
                            icon={<FaBuilding />}
                            placeholder="Ex: IFPA - Campus Tucuruí"
                        />

                        <Input
                            label="Endereço"
                            name="Endereco"
                            value={formData.Endereco}
                            onChange={handleChange}
                            icon={<FaMapMarkerAlt />}
                            placeholder="Rua, número, complemento"
                        />

                        <Input
                            label="Cidade"
                            name="Cidade"
                            value={formData.Cidade}
                            onChange={handleChange}
                            icon={<FaCity />}
                            placeholder="Digite a cidade"
                        />

                        <Select
                            label="Estado"
                            name="Estado"
                            value={formData.Estado}
                            onChange={handleChange}
                            icon={<FaFlag />}
                        >
                            {estadoOptions.map(estado => (
                                <option key={estado.value} value={estado.value}>
                                    {estado.label}
                                </option>
                            ))}
                        </Select>
                    </Section>

                    {/* Informações do Sistema (apenas edição) */}
                    {isEditing && formData.DataCadastro && (
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
                                    {new Date(formData.DataCadastro).toLocaleDateString('pt-BR', {
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
                            onClick={() => navigate('/usuarios')}
                            style={styles.cancelButton}
                            disabled={saving}
                            onMouseEnter={(e) => !saving && (e.currentTarget.style.background = theme === 'dark' ? '#4b5563' : '#f9fafb')}
                            onMouseLeave={(e) => !saving && (e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#ffffff')}
                        >
                            <FaTimesCircle /> Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{
                                ...styles.submitButton,
                                opacity: saving ? 0.7 : 1,
                                cursor: saving ? 'not-allowed' : 'pointer'
                            }}
                            disabled={saving}
                            onMouseEnter={(e) => !saving && (e.currentTarget.style.background = 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)')}
                            onMouseLeave={(e) => !saving && (e.currentTarget.style.background = 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)')}
                        >
                            {saving ? (
                                <>
                                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                                    Salvando...
                                </>
                            ) : (
                                isEditing ? <><FaSave /> Atualizar Usuário</> : <><FaCheckCircle /> Salvar Usuário</>
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

                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
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
        </DashboardLayout>
    );
}