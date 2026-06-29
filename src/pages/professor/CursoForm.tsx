import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import Input from "../../components/Form/Input";
import Section from "../../components/Form/Section";
import Select from "../../components/Form/Select";
// Ícones essenciais apenas
import { 
    FaBook, FaClock, FaCalendarAlt, FaMapMarkerAlt, 
    FaUserTie, FaChalkboardTeacher, FaPlus, FaTrash,
    FaSave, FaTimes, FaSpinner, FaInfoCircle, FaLayerGroup,
    FaArrowLeft, FaEdit, FaEye,
    FaCheckCircle
} from "react-icons/fa";
import React from "react";

// Interfaces permanecem iguais
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

// Componente memoizado para Instrutor
const InstrutorItem = React.memo(({ 
    instrutor, 
    index, 
    onRemove, 
    onChange,
    canRemove 
}: { 
    instrutor: Instrutor; 
    index: number; 
    onRemove: (index: number) => void; 
    onChange: (index: number, field: keyof Instrutor, value: string) => void;
    canRemove: boolean;
}) => (
    <div style={styles.instrutorItem}>
        <div style={{ flex: 1 }}>
            <Input
                label={`Instrutor ${index + 1}`}
                value={instrutor.nome}
                onChange={(e) => onChange(index, 'nome', e.target.value)}
            />
        </div>
        {canRemove && (
            <button
                type="button"
                onClick={() => onRemove(index)}
                style={styles.removeButton}
                title="Remover instrutor"
            >
                <FaTrash />
            </button>
        )}
    </div>
));

// Componente memoizado para Módulo
const ModuloCard = React.memo(({ 
    modulo, 
    index, 
    onRemove, 
    onChange,
    canRemove 
}: { 
    modulo: Modulo; 
    index: number; 
    onRemove: (index: number) => void; 
    onChange: (index: number, field: keyof Modulo, value: any) => void;
    canRemove: boolean;
}) => (
    <div style={styles.moduloCard}>
        <div style={styles.moduloHeader}>
            <h4 style={styles.moduloTitle}>
                <FaBook /> Módulo {modulo.ordem}
            </h4>
            {canRemove && (
                <button
                    type="button"
                    onClick={() => onRemove(index)}
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
            onChange={(e) => onChange(index, 'nome', e.target.value)}
        />

        <div style={styles.moduloRow}>
            <div style={{ flex: 1 }}>
                <Input
                    label="Carga Horária *"
                    type="number"
                    value={modulo.cargaHoraria}
                    onChange={(e) => onChange(index, 'cargaHoraria', parseInt(e.target.value) || 0)}
                />
            </div>
        </div>

        <div style={styles.fullWidth}>
            <label style={styles.label}>Descrição do Módulo</label>
            <textarea
                value={modulo.descricao}
                onChange={(e) => onChange(index, 'descricao', e.target.value)}
                rows={2}
                style={styles.textarea}
                placeholder="Descreva o conteúdo deste módulo..."
            />
        </div>
    </div>
));

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

    // Opções memoizadas - nunca mudam
    const categoriaOptions = useMemo(() => [
        { value: 'programacao', label: 'Programação Básica' },
        { value: 'algoritmos', label: 'Algoritmos' },
        { value: 'estruturas-dados', label: 'Estruturas de Dados' },
        { value: 'programacao-avancada', label: 'Programação Avançada' },
        { value: 'bancos-dados', label: 'Banco de Dados' },
        { value: 'outros', label: 'Outros' }
    ], []);

    const nivelOptions = useMemo(() => [
        { value: 'iniciante', label: 'Iniciante' },
        { value: 'intermediario', label: 'Intermediário' },
        { value: 'avancado', label: 'Avançado' },
        { value: 'livre', label: 'Livre' }
    ], []);

    const modalidadeOptions = useMemo(() => [
        { value: 'presencial', label: 'Presencial' },
        { value: 'online', label: 'Online' },
        { value: 'hibrido', label: 'Híbrido' }
    ], []);

    const duracaoUnidadeOptions = useMemo(() => [
        { value: 'semanas', label: 'Semanas' },
        { value: 'meses', label: 'Meses' },
        { value: 'anos', label: 'Anos' }
    ], []);

    const statusOptions = useMemo(() => [
        { value: 'ativo', label: 'Ativo' },
        { value: 'inativo', label: 'Inativo' },
        { value: 'em-breve', label: 'Em Breve' },
        { value: 'encerrado', label: 'Encerrado' }
    ], []);

    useEffect(() => {
        if (isEditing) {
            fetchCurso();
        } else {
            setLoading(false); // Se não for edição, já libera
        }
    }, [id]);

    const fetchCurso = async () => {
        setLoading(true);
        try {
            // Simular busca de dados
            await new Promise(resolve => setTimeout(resolve, 1200));

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

            // Batch updates para evitar múltiplas renderizações
            setFormData(mockData);
            setInstrutores([
                { id: 'i1', nome: 'João Santos' },
                { id: 'i2', nome: 'Ana Oliveira' }
            ]);
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

    // Handlers memoizados
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleInstrutorChange = useCallback((index: number, field: keyof Instrutor, value: string) => {
        setInstrutores(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const addInstrutor = useCallback(() => {
        setInstrutores(prev => [...prev, { id: Date.now().toString(), nome: '' }]);
    }, []);

    const removeInstrutor = useCallback((index: number) => {
        setInstrutores(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
    }, []);

    const handleModuloChange = useCallback((index: number, field: keyof Modulo, value: any) => {
        setModulos(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const addModulo = useCallback(() => {
        setModulos(prev => [...prev, { 
            id: Date.now().toString(), 
            nome: '', 
            ordem: prev.length + 1, 
            cargaHoraria: 0, 
            descricao: '' 
        }]);
    }, []);

    const removeModulo = useCallback((index: number) => {
        setModulos(prev => {
            if (prev.length <= 1) return prev;
            const filtered = prev.filter((_, i) => i !== index);
            // Reordenar módulos em uma única operação
            return filtered.map((mod, idx) => ({ ...mod, ordem: idx + 1 }));
        });
    }, []);

    const validateForm = useCallback(() => {
        const errors = [];
        
        if (!formData.nome.trim()) errors.push("O nome do curso é obrigatório");
        if (!formData.descricao.trim()) errors.push("A descrição do curso é obrigatória");
        if (formData.cargaHoraria <= 0) errors.push("A carga horária deve ser maior que zero");
        if (!formData.coordenadorNome.trim()) errors.push("O nome do coordenador é obrigatório");
        if (!formData.dataInicio) errors.push("A data de início é obrigatória");

        // Validar módulos
        for (const modulo of modulos) {
            if (!modulo.nome.trim()) {
                errors.push("Todos os módulos devem ter um nome");
                break;
            }
            if (modulo.cargaHoraria <= 0) {
                errors.push("Todos os módulos devem ter carga horária maior que zero");
                break;
            }
        }

        // Validar instrutores
        for (const instrutor of instrutores) {
            if (!instrutor.nome.trim()) {
                errors.push("Todos os instrutores devem ter um nome");
                break;
            }
        }

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return false;
        }

        return true;
    }, [formData, modulos, instrutores]);

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
            await new Promise(resolve => setTimeout(resolve, 800));

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
            toast.error("Erro ao salvar curso");
        } finally {
            setLoading(false);
        }
    };

    // Loading skeleton
    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner} />
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
                            {isEditing ? "Editar Curso" : "Novo Curso"}
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
                        />

                        <div style={styles.duracaoGroup}>
                            <div style={{ flex: 1 }}>
                                <Input
                                    label="Duração *"
                                    name="duracaoValor"
                                    type="number"
                                    value={formData.duracaoValor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Select
                                    label="&nbsp;"
                                    name="duracaoUnidade"
                                    value={formData.duracaoUnidade}
                                    onChange={handleChange}
                                >
                                    {duracaoUnidadeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </Select>
                            </div>
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
                        />

                        <Input
                            label="Local (para aulas presenciais)"
                            name="local"
                            value={formData.local}
                            onChange={handleChange}
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
                        />

                        <Input
                            label="Email do Coordenador"
                            name="coordenadorEmail"
                            type="email"
                            value={formData.coordenadorEmail}
                            onChange={handleChange}
                        />
                    </Section>

                    {/* Instrutores */}
                    <Section title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                            <FaChalkboardTeacher /> Instrutores
                        </span>
                    }>
                        {instrutores.map((instrutor, index) => (
                            <InstrutorItem
                                key={instrutor.id}
                                instrutor={instrutor}
                                index={index}
                                onRemove={removeInstrutor}
                                onChange={handleInstrutorChange}
                                canRemove={instrutores.length > 1}
                            />
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
                            <ModuloCard
                                key={modulo.id}
                                modulo={modulo}
                                index={index}
                                onRemove={removeModulo}
                                onChange={handleModuloChange}
                                canRemove={modulos.length > 1}
                            />
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
        </DashboardLayout>
    );
}

// Estilos movidos para fora e simplificados
const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
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
        gap: '8px'
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
        gap: '8px'
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
        marginTop: '24px'
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
        height: '32px',
        borderRadius: '6px',
        border: '1px solid var(--danger)',
        background: 'var(--bg-secondary)',
        color: 'var(--danger)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    buttonSpinner: {
        animation: 'spin 1s linear infinite',
        fontSize: '16px'
    }
};

// Adicione isso no seu arquivo CSS global
const globalStyles = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    button {
        transition: all 0.2s ease;
    }
    button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    button:active {
        transform: translateY(0);
    }
`;