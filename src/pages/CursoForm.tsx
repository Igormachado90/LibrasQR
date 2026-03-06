import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import Input from "../components/Form/Input";
import Section from "../components/Form/Section";
import Select from "../components/Form/Select";
import { supabase } from "../lib/supabase";
import {
    FaBook,
    FaClock,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUserTie,
    FaUsers,
    FaChalkboardTeacher,
    FaPlus,
    FaTrash,
    FaSave,
    FaTimes,
    FaSpinner,
    FaInfoCircle,
    FaLayerGroup,
    FaTag,
    FaGlobe,
    FaLaptop,
    FaUserGraduate,
    FaExclamationTriangle,
    FaCheckCircle,
    FaArrowLeft,
    FaEdit,
    FaCopy,
    FaQrcode,
    FaCode,
    FaDatabase,
    FaEye,
    FaRocket,
    FaTimesCircle
} from "react-icons/fa";

interface CursoFormData {
    nome: string;
    descricao: string;
    categoria: string;
    nivel: "iniciante" | "intermediario" | "avancado" | "livre";
    modalidade: "presencial" | "online" | "hibrido";
    cargaHoraria: number;
    duracaoValor: number;
    duracaoUnidade: string;
    coordenadorId: string;
    coordenadorNome: string;
    coordenadorEmail: string;
    status: "ativo" | "inativo" | "em-breve" | "encerrado";
    dataInicio: string;
    dataFim: string;
    vagas: number;
    local?: string;
    imagem?: string;
}

interface Instrutor {
    id: string;
    nome: string;
}

interface Modulo {
    id: string;
    nome: string;
    ordem: number;
    cargaHoraria: number;
    descricao: string;
}

export default function CursoForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(true);
    const [instrutores, setInstrutores] = useState<Instrutor[]>([{ id: '', nome: '' }]);
    const [modulos, setModulos] = useState<Modulo[]>([
        { id: '1', nome: '', ordem: 1, cargaHoraria: 0, descricao: '' }
    ]);

    const [formData, setFormData] = useState<CursoFormData>({
        nome: '',
        descricao: '',
        categoria: 'programacao',
        nivel: 'iniciante',
        modalidade: 'online',
        cargaHoraria: 40,
        duracaoValor: 8,
        duracaoUnidade: 'semanas',
        coordenadorId: '',
        coordenadorNome: '',
        coordenadorEmail: '',
        status: 'ativo',
        dataInicio: '',
        dataFim: '',
        vagas: 30,
        local: '',
        imagem: ''
    });

    const categoriaOptions = [
        { value: 'programacao', label: 'Programação Básica', icon: <FaCode /> },
        { value: 'algoritmos', label: 'Algoritmos', icon: <FaLayerGroup /> },
        { value: 'estruturas-dados', label: 'Estruturas de Dados', icon: <FaDatabase /> },
        { value: 'programacao-avancada', label: 'Programação Avançada', icon: <FaRocket /> },
        { value: 'bancos-dados', label: 'Banco de Dados', icon: <FaDatabase /> },
        { value: 'outros', label: 'Outros', icon: <FaTag /> }
    ];

    const nivelOptions = [
        { value: 'iniciante', label: 'Iniciante', color: '#10b981' },
        { value: 'intermediario', label: 'Intermediário', color: '#f59e0b' },
        { value: 'avancado', label: 'Avançado', color: '#ef4444' },
        { value: 'livre', label: 'Livre', color: '#8b5cf6' }
    ];

    const modalidadeOptions = [
        { value: 'presencial', label: 'Presencial', icon: <FaMapMarkerAlt /> },
        { value: 'online', label: 'Online', icon: <FaLaptop /> },
        { value: 'hibrido', label: 'Híbrido', icon: <FaGlobe /> }
    ];

    const duracaoUnidadeOptions = [
        { value: 'semanas', label: 'Semanas' },
        { value: 'meses', label: 'Meses' },
        { value: 'anos', label: 'Anos' }
    ];

    const statusOptions = [
        { value: 'ativo', label: 'Ativo', icon: <FaCheckCircle />, color: '#10b981' },
        { value: 'inativo', label: 'Inativo', icon: <FaTimesCircle />, color: '#6b7280' },
        { value: 'em-breve', label: 'Em Breve', icon: <FaClock />, color: '#f59e0b' },
        { value: 'encerrado', label: 'Encerrado', icon: <FaExclamationTriangle />, color: '#ef4444' }
    ];

    useEffect(() => {
        if (isEditing) {
            fetchCurso();
        }
    }, [id]);

    const fetchCurso = async () => {
        setLoading(true);
        try {
            // Simular busca de dados
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Dados mockados para edição
            const mockData = {
                nome: 'Lógica de Programação - Fundamentos',
                descricao: 'Introdução aos algoritmos, variáveis, tipos de dados e estruturas básicas',
                categoria: 'programacao',
                nivel: 'iniciante' as const,
                modalidade: 'hibrido' as const,
                cargaHoraria: 60,
                duracaoValor: 12,
                duracaoUnidade: 'semanas',
                coordenadorId: 'c1',
                coordenadorNome: 'Maria Silva',
                coordenadorEmail: 'maria.silva@programacaoqr.com',
                status: 'ativo' as const,
                dataInicio: '2024-02-01',
                dataFim: '2024-04-30',
                vagas: 25,
                local: 'Lab 101'
            };

            setFormData(mockData);

            // Mock de instrutores
            setInstrutores([
                { id: 'i1', nome: 'João Santos' },
                { id: 'i2', nome: 'Ana Oliveira' }
            ]);

            // Mock de módulos
            setModulos([
                { id: '1', nome: 'Introdução à Lógica', ordem: 1, cargaHoraria: 8, descricao: 'Conceitos fundamentais de lógica e algoritmos' },
                { id: '2', nome: 'Variáveis e Tipos de Dados', ordem: 2, cargaHoraria: 12, descricao: 'Declaração e uso de variáveis, tipos primitivos' },
                { id: '3', nome: 'Operadores', ordem: 3, cargaHoraria: 10, descricao: 'Operadores aritméticos, relacionais e lógicos' }
            ]);

        } catch (error) {
            console.error("Erro ao carregar curso:", error);
            toast.error("Erro ao carregar dados do curso");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInstrutorChange = (index: number, field: keyof Instrutor, value: string) => {
        const updated = [...instrutores];
        updated[index] = { ...updated[index], [field]: value };
        setInstrutores(updated);
    };

    const addInstrutor = () => {
        setInstrutores([...instrutores, { id: Date.now().toString(), nome: '' }]);
    };

    const removeInstrutor = (index: number) => {
        if (instrutores.length > 1) {
            setInstrutores(instrutores.filter((_, i) => i !== index));
        }
    };

    const handleModuloChange = (index: number, field: keyof Modulo, value: any) => {
        const updated = [...modulos];
        updated[index] = { ...updated[index], [field]: value };
        setModulos(updated);
    };

    const addModulo = () => {
        const newOrdem = modulos.length + 1;
        setModulos([...modulos, { 
            id: Date.now().toString(), 
            nome: '', 
            ordem: newOrdem, 
            cargaHoraria: 0, 
            descricao: '' 
        }]);
    };

    const removeModulo = (index: number) => {
        if (modulos.length > 1) {
            const filtered = modulos.filter((_, i) => i !== index);
            // Reordenar módulos
            const reordered = filtered.map((mod, idx) => ({ ...mod, ordem: idx + 1 }));
            setModulos(reordered);
        }
    };

    const validateForm = () => {
        if (!formData.nome.trim()) {
            toast.error("O nome do curso é obrigatório");
            return false;
        }

        if (!formData.descricao.trim()) {
            toast.error("A descrição do curso é obrigatória");
            return false;
        }

        if (formData.cargaHoraria <= 0) {
            toast.error("A carga horária deve ser maior que zero");
            return false;
        }

        if (!formData.coordenadorNome.trim()) {
            toast.error("O nome do coordenador é obrigatório");
            return false;
        }

        if (!formData.dataInicio) {
            toast.error("A data de início é obrigatória");
            return false;
        }

        // Validar módulos
        for (const modulo of modulos) {
            if (!modulo.nome.trim()) {
                toast.error("Todos os módulos devem ter um nome");
                return false;
            }
            if (modulo.cargaHoraria <= 0) {
                toast.error("Todos os módulos devem ter carga horária maior que zero");
                return false;
            }
        }

        // Validar instrutores
        for (const instrutor of instrutores) {
            if (!instrutor.nome.trim()) {
                toast.error("Todos os instrutores devem ter um nome");
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Preparar payload
            const payload = {
                ...formData,
                duracao: {
                    valor: formData.duracaoValor,
                    unidade: formData.duracaoUnidade
                },
                coordenador: {
                    id: formData.coordenadorId || Date.now().toString(),
                    nome: formData.coordenadorNome,
                    email: formData.coordenadorEmail
                },
                instrutores: instrutores.filter(i => i.nome.trim()),
                modulos: modulos.filter(m => m.nome.trim()),
                dataAtualizacao: new Date().toISOString()
            };

            // Simular envio
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log("Salvando curso:", payload);

            toast.success(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaCheckCircle size={20} />
                    <span>{isEditing ? "Curso atualizado com sucesso!" : "Curso criado com sucesso!"}</span>
                </div>
            );
            
            navigate('/curso');

        } catch (error) {
            console.error("Erro ao salvar curso:", error);
            toast.error(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaExclamationTriangle size={20} />
                    <span>Erro ao salvar curso</span>
                </div>
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p style={{ color: 'var(--text-secondary)' }}>Carregando dados do curso...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={styles.container}>
                {/* Header com botão voltar */}
                <div style={styles.header}>
                    <button 
                        onClick={() => navigate('/curso')} 
                        style={styles.backButton}
                        title="Voltar para lista de cursos"
                    >
                        <FaArrowLeft /> Voltar
                    </button>
                    <div>
                        <h1 style={styles.title}>
                            {isEditing ? <><FaEdit /> Editar Curso</> : <><FaPlus /> Novo Curso</>}
                        </h1>
                        <p style={styles.subtitle}>
                            {isEditing 
                                ? "Atualize as informações do curso abaixo" 
                                : "Preencha o formulário para criar um novo curso"}
                        </p>
                    </div>
                    {isEditing && (
                        <button 
                            onClick={() => navigate(`/curso/${id}`)} 
                            style={styles.viewButton}
                            title="Visualizar curso"
                        >
                            <FaEye /> Visualizar
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Dados Básicos */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                            <FaBook /> Dados Básicos
                        </span>
                    }>
                        <Input
                            label="Nome do Curso *"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Lógica de Programação - Fundamentos"
                        />

                        <div style={styles.fullWidth}>
                            <label style={styles.label}>Descrição *</label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                                rows={4}
                                style={styles.textarea}
                                placeholder="Descreva os objetivos e conteúdo do curso..."
                            />
                        </div>

                        <Select
                            label="Categoria *"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            required
                        >
                            {categoriaOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </Select>

                        <Select
                            label="Nível *"
                            name="nivel"
                            value={formData.nivel}
                            onChange={handleChange}
                            required
                        >
                            {nivelOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </Select>

                        <Select
                            label="Modalidade *"
                            name="modalidade"
                            value={formData.modalidade}
                            onChange={handleChange}
                            required
                        >
                            {modalidadeOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </Select>

                        <Input
                            label="Carga Horária Total (horas) *"
                            name="cargaHoraria"
                            type="number"
                            value={formData.cargaHoraria}
                            onChange={handleChange}
                            required
                            min={1}
                        />

                        <div style={styles.duracaoGroup}>
                            <Input
                                label="Duração *"
                                name="duracaoValor"
                                type="number"
                                value={formData.duracaoValor}
                                onChange={handleChange}
                                required
                                min={1}
                                style={{ flex: 1 }}
                            />
                            <Select
                                label="&nbsp;"
                                name="duracaoUnidade"
                                value={formData.duracaoUnidade}
                                onChange={handleChange}
                                style={{ flex: 1 }}
                            >
                                {duracaoUnidadeOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </Select>
                        </div>

                        <Select
                            label="Status *"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            {statusOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </Select>
                    </Section>

                    {/* Datas e Local */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                            <FaCalendarAlt /> Datas e Local
                        </span>
                    }>
                        <Input
                            label="Data de Início *"
                            name="dataInicio"
                            type="date"
                            value={formData.dataInicio}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Data de Término"
                            name="dataFim"
                            type="date"
                            value={formData.dataFim}
                            onChange={handleChange}
                        />

                        <Input
                            label="Número de Vagas"
                            name="vagas"
                            type="number"
                            value={formData.vagas}
                            onChange={handleChange}
                            min={1}
                        />

                        <Input
                            label="Local (para aulas presenciais)"
                            name="local"
                            value={formData.local}
                            onChange={handleChange}
                            placeholder="Ex: Lab 101, Campus IFPA"
                        />
                    </Section>

                    {/* Coordenador */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                            <FaUserTie /> Coordenador do Curso
                        </span>
                    }>
                        <Input
                            label="Nome do Coordenador *"
                            name="coordenadorNome"
                            value={formData.coordenadorNome}
                            onChange={handleChange}
                            required
                            placeholder="Nome completo"
                        />

                        <Input
                            label="Email do Coordenador"
                            name="coordenadorEmail"
                            type="email"
                            value={formData.coordenadorEmail}
                            onChange={handleChange}
                            placeholder="email@exemplo.com"
                        />
                    </Section>

                    {/* Instrutores */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                            <FaChalkboardTeacher /> Instrutores
                        </span>
                    }>
                        {instrutores.map((instrutor, index) => (
                            <div key={instrutor.id} style={styles.instrutorItem}>
                                <Input
                                    label={`Instrutor ${index + 1}`}
                                    value={instrutor.nome}
                                    onChange={(e) => handleInstrutorChange(index, 'nome', e.target.value)}
                                    placeholder="Nome do instrutor"
                                    style={{ flex: 1 }}
                                />
                                {instrutores.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeInstrutor(index)}
                                        style={styles.removeButton}
                                        title="Remover instrutor"
                                    >
                                        <FaTrash />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addInstrutor}
                            style={styles.addButton}
                        >
                            <FaPlus /> Adicionar Instrutor
                        </button>
                    </Section>

                    {/* Módulos */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                            <FaLayerGroup /> Módulos do Curso
                        </span>
                    }>
                        {modulos.map((modulo, index) => (
                            <div key={modulo.id} style={styles.moduloCard}>
                                <div style={styles.moduloHeader}>
                                    <h4 style={styles.moduloTitle}>
                                        <FaBook /> Módulo {modulo.ordem}
                                    </h4>
                                    {modulos.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeModulo(index)}
                                            style={styles.removeModuloButton}
                                            title="Remover módulo"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>

                                <Input
                                    label="Nome do Módulo *"
                                    value={modulo.nome}
                                    onChange={(e) => handleModuloChange(index, 'nome', e.target.value)}
                                    placeholder="Ex: Introdução à Lógica"
                                />

                                <div style={styles.moduloRow}>
                                    <Input
                                        label="Carga Horária *"
                                        type="number"
                                        value={modulo.cargaHoraria}
                                        onChange={(e) => handleModuloChange(index, 'cargaHoraria', parseInt(e.target.value) || 0)}
                                        min={1}
                                        style={{ flex: 1 }}
                                    />
                                </div>

                                <div style={styles.fullWidth}>
                                    <label style={styles.label}>Descrição do Módulo</label>
                                    <textarea
                                        value={modulo.descricao}
                                        onChange={(e) => handleModuloChange(index, 'descricao', e.target.value)}
                                        rows={2}
                                        style={styles.textarea}
                                        placeholder="Descreva o conteúdo deste módulo..."
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addModulo}
                            style={styles.addButton}
                        >
                            <FaPlus /> Adicionar Módulo
                        </button>
                    </Section>

                    {/* Informações adicionais */}
                    <div style={styles.infoBox}>
                        <FaInfoCircle style={{ color: 'var(--info)', fontSize: '20px' }} />
                        <div style={styles.infoContent}>
                            <strong>Campos obrigatórios</strong> são marcados com *.
                            {isEditing && (
                                <span> Os QR Codes serão gerados automaticamente após a criação do curso.</span>
                            )}
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div style={styles.actions}>
                        <button
                            type="button"
                            onClick={() => navigate('/curso')}
                            style={styles.cancelButton}
                            disabled={loading}
                        >
                            <FaTimes /> Cancelar
                        </button>
                        <button
                            type="submit"
                            style={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner style={styles.buttonSpinner} />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <FaSave /> {isEditing ? 'Atualizar Curso' : 'Criar Curso'}
                                </>
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
                button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                button:active {
                    transform: translateY(0);
                }
            `}</style>
        </DashboardLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        animation: 'fadeIn 0.5s ease-out',
        padding: '20px'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '3px solid var(--border-color)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
    },
    backButton: {
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    viewButton: {
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid var(--primary)',
        background: 'transparent',
        color: 'var(--primary)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    title: {
        margin: 0,
        fontSize: '28px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    subtitle: {
        margin: '4px 0 0',
        fontSize: '14px',
        color: 'var(--text-tertiary)'
    },
    form: {
        background: 'var(--card-bg)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid var(--border-color)'
    },
    fullWidth: {
        gridColumn: 'span 2'
    },
    label: {
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '500',
        color: 'var(--text-primary)'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid var(--input-border)',
        background: 'var(--input-bg)',
        color: 'var(--text-primary)',
        fontSize: '14px',
        fontFamily: 'inherit',
        resize: 'vertical' as const,
        transition: 'border-color 0.2s ease',
        outline: 'none'
    },
    duracaoGroup: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        gridColumn: 'span 2'
    },
    instrutorItem: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
    },
    removeButton: {
        // width: '36px',
        height: '36px',
        borderRadius: '8px',
        border: '1px solid var(--danger)',
        background: 'var(--bg-secondary)',
        color: 'var(--danger)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '24px',
        transition: 'all 0.2s ease'
    },
    addButton: {
        padding: '10px 16px',
        background: 'var(--bg-tertiary)',
        border: '1px dashed var(--border-color)',
        borderRadius: '8px',
        color: 'var(--text-secondary)',
        fontSize: '14px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '12px',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    moduloCard: {
        background: 'var(--bg-tertiary)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        border: '1px solid var(--border-color)'
    },
    moduloHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    moduloTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    removeModuloButton: {
        // width: '32px',
        height: '32px',
        borderRadius: '6px',
        border: '1px solid var(--danger)',
        background: 'var(--bg-secondary)',
        color: 'var(--danger)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
    },
    moduloRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '12px'
    },
    infoBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: 'var(--info-light)',
        borderRadius: '8px',
        marginTop: '24px',
        border: '1px solid var(--info)'
    },
    infoContent: {
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: '1.5'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-color)'
    },
    cancelButton: {
        padding: '12px 24px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    submitButton: {
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        background: 'var(--primary)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    buttonSpinner: {
        animation: 'spin 1s linear infinite',
        fontSize: '16px'
    }
};