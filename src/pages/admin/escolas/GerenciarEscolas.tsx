import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import supabase from "../../../lib/supabase";
import {
    FaSchool,
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaEye,
    FaPlus,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaGlobe,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaChevronLeft,
    FaChevronRight,
    FaUsers,
    FaBook,
    FaGraduationCap
} from "react-icons/fa";

interface Escola {
    id: string;
    nome: string;
    codigo: string;
    endereco: string;
    cidade: string;
    estado: string;
    cep: string;
    telefone: string;
    email: string;
    site?: string;
    diretor: string;
    tipo: "publica" | "privada" | "municipal" | "estadual" | "federal";
    niveisEnsino: string[];
    totalAlunos: number;
    totalProfessores: number;
    totalTurmas: number;
    status: "ativa" | "inativa" | "em_implantacao";
    dataCriacao: string;
    observacoes?: string;
}

export default function GerenciarEscolas() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [escolas, setEscolas] = useState<Escola[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<{ tipo?: string; status?: string; cidade?: string }>({});
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "nome",
        direction: "asc"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 10;

    const tiposEscola = [
        { value: "publica", label: "Pública", icon: "🏛️" },
        { value: "privada", label: "Privada", icon: "🏢" },
        { value: "municipal", label: "Municipal", icon: "🏙️" },
        { value: "estadual", label: "Estadual", icon: "🏛️" },
        { value: "federal", label: "Federal", icon: "🏛️" }
    ];

    const statusOptions = [
        { value: "ativa", label: "Ativa", color: "var(--success)" },
        { value: "inativa", label: "Inativa", color: "var(--danger)" },
        { value: "em_implantacao", label: "Em Implantação", color: "var(--warning)" }
    ];

    const niveisEnsino = [
        "Ensino Fundamental I (1º ao 5º ano)",
        "Ensino Fundamental II (6º ao 9º ano)",
        "Ensino Médio (1ª à 3ª série)",
        "EJA - Educação de Jovens e Adultos",
        "Educação Profissional Técnica",
        "Educação Especial"
    ];

    useEffect(() => {
        fetchEscolas();
    }, []);

    const fetchEscolas = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("escolas")
                .select("*")
                .order("nome", { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                const escolasFormatadas = data.map((item: any) => ({
                    id: item.id,
                    nome: item.nome || "",
                    codigo: item.codigo || "",
                    endereco: item.endereco || "",
                    cidade: item.cidade || "",
                    estado: item.estado || "",
                    cep: item.cep || "",
                    telefone: item.telefone || "",
                    email: item.email || "",
                    site: item.site || "",
                    diretor: item.diretor || "",
                    tipo: item.tipo || "municipal",
                    niveisEnsino: item.niveis_ensino || [], // ← Garantir que é um array
                    totalAlunos: item.total_alunos || 0,
                    totalProfessores: item.total_professores || 0,
                    totalTurmas: item.total_turmas || 0,
                    status: item.status || "ativa",
                    dataCriacao: item.data_criacao || new Date().toISOString(),
                    observacoes: item.observacoes || ""
                }));
                setEscolas(escolasFormatadas);
            }
        } catch (error) {
            console.error("Erro ao buscar escolas:", error);
            // Dados mockados para demonstração

            // setEscolas(data);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key: string) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
        });
    };

    const getSortIcon = (key: string) => {
        if (sortConfig.key !== key) return <FaSort style={{ opacity: 0.3 }} />;
        return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    const filteredEscolas = escolas
        .filter(escola => {
            const matchesSearch = escola.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                escola.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                escola.diretor.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesTipo = !filters.tipo || escola.tipo === filters.tipo;
            const matchesStatus = !filters.status || escola.status === filters.status;
            const matchesCidade = !filters.cidade || escola.cidade.toLowerCase().includes(filters.cidade.toLowerCase());

            return matchesSearch && matchesTipo && matchesStatus && matchesCidade;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Escola];
            const bValue = b[sortConfig.key as keyof Escola];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });

    const totalPages = Math.ceil(filteredEscolas.length / itemsPerPage);
    const paginatedEscolas = filteredEscolas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusBadge = (status: string) => {
        const config = {
            ativa: { bg: "var(--success-light)", color: "var(--success)", icon: <FaCheckCircle />, label: "Ativa" },
            inativa: { bg: "var(--danger-light)", color: "var(--danger)", icon: <FaTimesCircle />, label: "Inativa" },
            em_implantacao: { bg: "var(--warning-light)", color: "var(--warning)", icon: <FaClock />, label: "Em Implantação" }
        };
        const style = config[status as keyof typeof config];
        return (
            <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: "600",
                background: style.bg,
                color: style.color
            }}>
                {style.icon} {style.label}
            </span>
        );
    };

    const getTipoIcon = (tipo: string) => {
        const tipoConfig = tiposEscola.find(t => t.value === tipo);
        return tipoConfig?.icon || "🏛️";
    };

    const handleDelete = async (id: string) => {
        if (confirm("Deseja realmente excluir esta escola?")) {
            // Implementar delete
            setEscolas(escolas.filter(e => e.id !== id));
        }
    };

    if (loading) {
        return (
            // <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Carregando escolas...</p>
                </div>
            // </DashboardLayout>
        );
    }

    return (
        <>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>
                            <FaSchool /> Gestão Escolar
                        </h1>
                        <p style={styles.subtitle}>
                            Gerencie todas as escolas cadastradas na plataforma
                        </p>
                    </div>
                    <button onClick={() => navigate("/escolas/novo")} style={styles.primaryButton}>
                        <FaPlus /> Nova Escola
                    </button>
                </div>

                {/* Estatísticas Rápidas */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaSchool size={24} color="var(--primary)" />
                        <div>
                            <span style={styles.statValue}>{escolas.length}</span>
                            <span style={styles.statLabel}>Total de Escolas</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaUsers size={24} color="var(--success)" />
                        <div>
                            <span style={styles.statValue}>
                                {escolas.reduce((acc, e) => acc + e.totalAlunos, 0).toLocaleString()}
                            </span>
                            <span style={styles.statLabel}>Total de Alunos</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaGraduationCap size={24} color="var(--info)" />
                        <div>
                            <span style={styles.statValue}>
                                {escolas.reduce((acc, e) => acc + e.totalProfessores, 0).toLocaleString()}
                            </span>
                            <span style={styles.statLabel}>Professores</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaBook size={24} color="var(--warning)" />
                        <div>
                            <span style={styles.statValue}>
                                {escolas.reduce((acc, e) => acc + e.totalTurmas, 0).toLocaleString()}
                            </span>
                            <span style={styles.statLabel}>Turmas</span>
                        </div>
                    </div>
                </div>

                {/* Busca e Filtros */}
                <div style={styles.searchSection}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por nome, cidade ou diretor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} style={styles.filterButton}>
                        <FaFilter /> Filtros
                    </button>
                </div>

                {/* Painel de Filtros */}
                {showFilters && (
                    <div style={styles.filtersPanel}>
                        <select
                            value={filters.tipo}
                            onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todos os tipos</option>
                            {tiposEscola.map(tipo => (
                                <option key={tipo.value} value={tipo.value}>{tipo.icon} {tipo.label}</option>
                            ))}
                        </select>

                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todos os status</option>
                            {statusOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Cidade"
                            value={filters.cidade}
                            onChange={(e) => setFilters({ ...filters, cidade: e.target.value })}
                            style={styles.filterInput}
                        />

                        <button onClick={() => setFilters({})} style={styles.clearFilters}>
                            Limpar filtros
                        </button>
                    </div>
                )}

                {/* Tabela de Escolas */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.tableHeaderCell} onClick={() => handleSort("nome")}>
                                    <div style={styles.sortableHeader}>Escola {getSortIcon("nome")}</div>
                                </th>
                                <th style={styles.tableHeaderCell} onClick={() => handleSort("cidade")}>
                                    <div style={styles.sortableHeader}>Localização {getSortIcon("cidade")}</div>
                                </th>
                                <th style={styles.tableHeaderCell}>Tipo</th>
                                <th style={styles.tableHeaderCell}>Níveis de Ensino</th>
                                <th style={styles.tableHeaderCell}>Status</th>
                                <th style={styles.tableHeaderCell}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEscolas.map((escola) => (
                                <tr key={escola.id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>
                                        <div style={styles.escolaInfo}>
                                            <FaSchool style={{ color: "var(--primary)" }} />
                                            <div>
                                                <div style={styles.escolaNome}>{escola.nome}</div>
                                                <div style={styles.escolaDetalhes}>
                                                    <span><FaUsers size={10} /> {escola.totalAlunos} alunos</span>
                                                    <span><FaGraduationCap size={10} /> {escola.totalProfessores} profs</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.localizacao}>
                                            <FaMapMarkerAlt size={12} />
                                            <span>{escola.cidade}/{escola.estado}</span>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <span style={styles.tipoBadge}>
                                            {getTipoIcon(escola.tipo)} {tiposEscola.find(t => t.value === escola.tipo)?.label}
                                        </span>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.niveisList}>
                                            {escola.niveisEnsino && escola.niveisEnsino.length > 0 ? (
                                                <>
                                                    {escola.niveisEnsino.slice(0, 2).map(nivel => (
                                                        <span key={nivel} style={styles.nivelChip}>
                                                            {nivel}
                                                        </span>
                                                    ))}
                                                    {escola.niveisEnsino.length > 2 && (
                                                        <span style={styles.nivelMais}>
                                                            +{escola.niveisEnsino.length - 2}
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span style={styles.nivelChip}>Não informado</span>
                                            )}
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        {getStatusBadge(escola.status)}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.actionButtons}>
                                            <button onClick={() => navigate(`/escolas/${escola.id}`)} style={styles.actionButton} title="Visualizar">
                                                <FaEye />
                                            </button>
                                            <button onClick={() => navigate(`/escolas/${escola.id}/editar`)} style={styles.actionButton} title="Editar">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(escola.id)} style={{ ...styles.actionButton, color: "var(--danger)" }} title="Excluir">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {paginatedEscolas.length === 0 && (
                        <div style={styles.emptyState}>
                            <FaSchool size={48} style={{ color: "var(--text-tertiary)" }} />
                            <h3>Nenhuma escola encontrada</h3>
                            <p>Cadastre uma nova escola clicando em "Nova Escola"</p>
                        </div>
                    )}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                    <div style={styles.pagination}>
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={styles.paginationButton}>
                            <FaChevronLeft />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button key={page} onClick={() => setCurrentPage(page)} style={{ ...styles.paginationButton, background: currentPage === page ? "var(--primary)" : "transparent", color: currentPage === page ? "#fff" : "var(--text-secondary)" }}>
                                {page}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={styles.paginationButton}>
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    niveisList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "4px"
    },
    nivelChip: {
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "10px",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)"
    },
    nivelMais: {
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "10px",
        background: "var(--primary-soft)",
        color: "var(--primary)"
    },
    escolaInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    escolaNome: {
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    escolaDetalhes: {
        fontSize: "11px",
        color: "var(--text-tertiary)",
        display: "flex",
        gap: "12px",
        marginTop: "4px"
    },
    localizacao: {
        display: "flex",
        alignItems: "center",
        gap: "6px"
    },
    tipoBadge: {
        padding: "4px 8px",
        borderRadius: "20px",
        fontSize: "11px",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)"
    },
    filterInput: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px"
    },
    container: {
        animation: "fadeIn 0.5s ease-out"
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh"
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "3px solid var(--border-color)",
        borderTopColor: "var(--primary)",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "16px"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px"
    },
    title: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "600",
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    subtitle: {
        margin: "4px 0 0",
        fontSize: "14px",
        color: "var(--text-tertiary)"
    },
    primaryButton: {
        padding: "10px 20px",
        background: "var(--primary)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
    },
    statCard: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px",
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)"
    },
    statValue: {
        fontSize: "24px",
        fontWeight: "700",
        color: "var(--text-primary)",
        display: "block",
        lineHeight: 1.2
    },
    statLabel: {
        fontSize: "13px",
        color: "var(--text-tertiary)"
    },
    searchSection: {
        display: "flex",
        gap: "12px",
        marginBottom: "16px"
    },
    searchBox: {
        flex: 1,
        position: "relative"
    },
    searchIcon: {
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-tertiary)"
    },
    searchInput: {
        width: "100%",
        padding: "12px 12px 12px 36px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none"
    },
    filterButton: {
        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
    },
    filtersPanel: {
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "20px"
    },
    filtersGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "12px",
        marginBottom: "12px"
    },
    filterSelect: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px"
    },
    clearFilters: {
        padding: "6px 12px",
        background: "transparent",
        border: "none",
        color: "var(--primary)",
        cursor: "pointer",
        fontSize: "13px"
    },
    tableContainer: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        overflow: "auto",
        marginBottom: "24px"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "1000px"
    },
    tableHeader: {
        background: "var(--bg-tertiary)",
        borderBottom: "1px solid var(--border-color)"
    },
    tableHeaderCell: {
        padding: "16px",
        textAlign: "left",
        fontSize: "12px",
        fontWeight: "600",
        color: "var(--text-tertiary)",
        textTransform: "uppercase",
        cursor: "pointer"
    },
    sortableHeader: {
        display: "flex",
        alignItems: "center",
        gap: "4px"
    },
    tableRow: {
        borderBottom: "1px solid var(--border-light)",
        transition: "background-color 0.2s"
    },
    tableCell: {
        padding: "16px",
        fontSize: "13px",
        color: "var(--text-secondary)"
    },
    termoInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },
    termoDesc: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    categoriaBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        background: "var(--primary-soft)",
        color: "var(--primary)"
    },
    statusBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px"
    },
    propositorInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "2px"
    },
    propositorTipo: {
        fontSize: "10px",
        color: "var(--text-tertiary)"
    },
    votacaoInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },
    totalVotos: {
        fontSize: "10px",
        color: "var(--text-tertiary)"
    },
    actionButtons: {
        display: "flex",
        gap: "8px"
    },
    actionButton: {
        padding: "6px",
        borderRadius: "4px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        gap: "8px"
    },
    paginationButton: {
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000
    },
    modal: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "80vh",
        overflow: "auto"
    },
    modalHeader: {
        padding: "20px",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    modalClose: {
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "var(--text-tertiary)"
    },
    modalBody: {
        padding: "20px"
    },
    modalFooter: {
        padding: "20px",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px"
    },
    modalCancelButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        cursor: "pointer"
    },
    modalConfirmButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        background: "var(--primary)",
        color: "#fff",
        fontSize: "13px",
        cursor: "pointer"
    },
    votacaoOpcoes: {
        display: "flex",
        gap: "12px",
        marginBottom: "20px"
    },
    votoButton: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid",
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer"
    },
    formGroup: {
        marginBottom: "20px"
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    textarea: {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        resize: "vertical"
    },
    parametrosResumo: {
        background: "var(--bg-tertiary)",
        padding: "16px",
        borderRadius: "8px"
    },
    parametrosGrid: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "20px"
    },
    parametroItem: {
        display: "flex",
        gap: "12px",
        padding: "12px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px"
    },
    videoContainer: {
        marginTop: "20px"
    },
    videoPlayer: {
        width: "100%",
        maxHeight: "300px",
        borderRadius: "8px"
    },
    historicoItem: {
        position: "relative",
        padding: "12px",
        marginBottom: "8px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px"
    },
    historicoStatus: {
        marginBottom: "8px"
    },
    historicoInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontSize: "12px"
    },
    historicoObs: {
        margin: "4px 0 0",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        fontStyle: "italic"
    },
    historicoLine: {
        position: "absolute",
        left: "20px",
        bottom: "-16px",
        width: "2px",
        height: "16px",
        background: "var(--border-color)"
    }
};