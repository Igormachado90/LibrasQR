// import DashboardLayout from "../layouts/DashboardLayout";
// import EscolasTable from "../components/Escolas/EscolasTable";
// import EscolasHeader from "../components/Escolas/EscolasHeader";
// import { useState, useCallback } from "react";

// export default function EscolasPage() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filters, setFilters] = useState<{ status?: string; tipo?: string }>({});
//     const [stats, setStats] = useState({
//         totalEscolas: 0,
//         escolasAtivas: 0,

//     });

//     // Esta função será chamada pelo UsuariosTable quando os dados forem carregados
//     const handleStatsUpdate = useCallback((newStats: {
//         totalEscolas: number;
//         escolasAtivas: number;
//     }) => {
//         setStats(newStats);
//     }, []);

//     // Funções de busca e filtro
//     const handleSearch = useCallback((term: string) => {
//         setSearchTerm(term);
//     }, []);

//     const handleFilterChange = useCallback((filter: { status?: string; tipo?: string }) => {
//         setFilters(filter);
//     }, []);

//     return (
//         <DashboardLayout>
//             <EscolasHeader
//                 totalEscolas={stats.totalEscolas}
//                 escolasAtivas={stats.escolasAtivas}
//                 onSearch={handleSearch}
//                 onFilterChange={handleFilterChange}
//             />
//             <EscolasTable
//                 onStatsUpdate={handleStatsUpdate}
//                 externalSearchTerm={searchTerm}
//                 externalFilters={filters}
//             />
//         </DashboardLayout>
//     );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    FaFileAlt,
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaEye,
    FaDownload,
    FaPlus,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaChevronLeft,
    FaChevronRight,
    FaFilePdf,
    FaQrcode,
    FaShare
} from "react-icons/fa";
import supabase from "../lib/supabase";

interface Termo {
    id: string;
    titulo: string;
    definicao: string;
    categoria: string;
    status: "pendente" | "aprovado" | "recusado" | "arquivado";
    versao: string;
    autor: {
        id: string;
        nome: string;
        tipo: string;
    };
    dataCriacao: string;
    dataPublicacao?: string;
    dataArquivamento?: string;
    visualizacoes: number;
    assinaturas: number;
    tags: string[];
}

export default function GerenciarTermos() {
    const navigate = useNavigate();
    const [termos, setTermos] = useState<Termo[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"todos" | "pendente" | "aprovado" | "recusado" | "arquivado">("todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<{ categoria?: string; dataInicio?: string; dataFim?: string }>({
        categoria: "",
        dataInicio: "",
        dataFim: ""
    });
    // const [sortConfig, setSortConfig] = useState({
    //     key: "dataCriacao",
    //     direction: "desc"
    // });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTermos, setSelectedTermos] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>(
        { key: "dataCriacao", direction: "desc" }
    );

    const categorias: string[] = [
        "Conceitos Básicos",
        "Estruturas de Controle",
        "Estruturas de Dados",
        "Programação Orientada a Objetos",
        "Algoritmos",
        "Banco de Dados",
        "Funções",
        "Linguagens de Programação"
    ];

    const itemsPerPage = 10;
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTermos();
    }, [activeTab]);

    const fetchTermos = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // const mockTermos: Termo[] = [
            //     {
            //         id: "1",
            //         titulo: "Algoritmos de Ordenação - Quick Sort",
            //         definicao: "Implementação e análise do algoritmo de ordenação Quick Sort em diferentes linguagens",
            //         categoria: "Algoritmos",
            //         status: "aprovado",
            //         versao: "2.1",
            //         autor: {
            //             id: "1",
            //             nome: "Admin Sistema",
            //             tipo: "admin"
            //         },
            //         dataCriacao: "2024-02-15",
            //         dataPublicacao: "2024-02-20",
            //         visualizacoes: 234,
            //         assinaturas: 45,
            //         tags: ["quick sort", "ordenação", "algoritmos", "complexidade"]
            //     },
            //     {
            //         id: "2",
            //         titulo: "Estruturas Condicionais em Python",
            //         definicao: "Guia completo sobre if/else, elif e estruturas de decisão em Python",
            //         categoria: "Estruturas de Controle",
            //         status: "pendente",
            //         versao: "1.0",
            //         autor: {
            //             id: "2",
            //             nome: "João Silva",
            //             tipo: "gestor"
            //         },
            //         dataCriacao: "2024-02-18",
            //         visualizacoes: 56,
            //         assinaturas: 0,
            //         tags: ["python", "if-else", "condicionais", "estruturas de controle"]
            //     },
            //     {
            //         id: "3",
            //         titulo: "Manipulação de Arrays em JavaScript",
            //         definicao: "Métodos avançados para manipulação de arrays: map, filter, reduce, forEach",
            //         categoria: "Estruturas de Dados",
            //         status: "aprovado",
            //         versao: "3.0",
            //         autor: {
            //             id: "1",
            //             nome: "Admin Sistema",
            //             tipo: "admin"
            //         },
            //         dataCriacao: "2024-02-10",
            //         dataPublicacao: "2024-02-12",
            //         visualizacoes: 567,
            //         assinaturas: 189,
            //         tags: ["javascript", "arrays", "métodos", "estruturas de dados"]
            //     },
            //     {
            //         id: "4",
            //         titulo: "Classes e Herança em Java",
            //         definicao: "Fundamentos de Programação Orientada a Objetos com Java: classes, herança, polimorfismo",
            //         categoria: "Programação Orientada a Objetos",
            //         status: "recusado",
            //         versao: "1.2",
            //         autor: {
            //             id: "3",
            //             nome: "Maria Oliveira",
            //             tipo: "profissional"
            //         },
            //         dataCriacao: "2024-02-05",
            //         dataArquivamento: "2024-02-08",
            //         visualizacoes: 123,
            //         assinaturas: 0,
            //         tags: ["java", "poo", "classes", "herança", "polimorfismo"]
            //     },
            //     {
            //         id: "5",
            //         titulo: "Consultas SQL com JOIN",
            //         definicao: "Tutorial avançado de consultas SQL utilizando INNER JOIN, LEFT JOIN e RIGHT JOIN",
            //         categoria: "Banco de Dados",
            //         status: "pendente",
            //         versao: "1.5",
            //         autor: {
            //             id: "2",
            //             nome: "João Silva",
            //             tipo: "gestor"
            //         },
            //         dataCriacao: "2024-02-19",
            //         visualizacoes: 89,
            //         assinaturas: 0,
            //         tags: ["sql", "banco de dados", "joins", "consultas"]
            //     },
            //     {
            //         id: "6",
            //         titulo: "Funções Recursivas",
            //         definicao: "Conceitos e exemplos de recursividade em diferentes linguagens de programação",
            //         categoria: "Funções",
            //         status: "aprovado",
            //         versao: "2.0",
            //         autor: {
            //             id: "1",
            //             nome: "Admin Sistema",
            //             tipo: "admin"
            //         },
            //         dataCriacao: "2024-02-01",
            //         dataPublicacao: "2024-02-03",
            //         visualizacoes: 892,
            //         assinaturas: 234,
            //         tags: ["recursividade", "funções", "algoritmos"]
            //     },
            //     {
            //         id: "7",
            //         titulo: "Variáveis e Tipos de Dados",
            //         definicao: "Introdução aos tipos primitivos, variáveis e constantes em programação",
            //         categoria: "Conceitos Básicos",
            //         status: "arquivado",
            //         versao: "1.0",
            //         autor: {
            //             id: "3",
            //             nome: "Maria Oliveira",
            //             tipo: "profissional"
            //         },
            //         dataCriacao: "2024-01-15",
            //         dataArquivamento: "2024-02-01",
            //         visualizacoes: 45,
            //         assinaturas: 12,
            //         tags: ["variáveis", "tipos de dados", "constantes", "iniciante"]
            //     },
            //     {
            //         id: "8",
            //         titulo: "TypeScript: Tipagem Estática",
            //         definicao: "Guia completo sobre os benefícios e uso da tipagem estática com TypeScript",
            //         categoria: "Linguagens de Programação",
            //         status: "aprovado",
            //         versao: "1.3",
            //         autor: {
            //             id: "2",
            //             nome: "João Silva",
            //             tipo: "gestor"
            //         },
            //         dataCriacao: "2024-02-14",
            //         dataPublicacao: "2024-02-16",
            //         visualizacoes: 445,
            //         assinaturas: 78,
            //         tags: ["typescript", "tipagem", "javascript", "frontend"]
            //     },
            //     {
            //         id: "9",
            //         titulo: "Estruturas de Repetição: While e For",
            //         definicao: "Diferenças entre while, do-while e for, com exemplos práticos",
            //         categoria: "Estruturas de Controle",
            //         status: "pendente",
            //         versao: "2.2",
            //         autor: {
            //             id: "1",
            //             nome: "Admin Sistema",
            //             tipo: "admin"
            //         },
            //         dataCriacao: "2024-02-17",
            //         visualizacoes: 167,
            //         assinaturas: 0,
            //         tags: ["loops", "while", "for", "repetição"]
            //     },
            //     {
            //         id: "10",
            //         titulo: "Listas Encadeadas",
            //         definicao: "Implementação de listas simplesmente e duplamente encadeadas",
            //         categoria: "Estruturas de Dados",
            //         status: "aprovado",
            //         versao: "2.5",
            //         autor: {
            //             id: "3",
            //             nome: "Maria Oliveira",
            //             tipo: "profissional"
            //         },
            //         dataCriacao: "2024-02-08",
            //         dataPublicacao: "2024-02-11",
            //         visualizacoes: 678,
            //         assinaturas: 145,
            //         tags: ["listas encadeadas", "ponteiros", "estruturas dinâmicas"]
            //     }
            // ];

            let query = supabase.from("termos")
                .select("*")
                .order("dataCriacao", { ascending: false });

            if (activeTab !== "todos") {
                query = query.eq("status", activeTab);
            }

            const { data, error } = await query;
            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            setTermos(data as Termo[]);
            // setLoading(false);

            // const filteredByStatus = activeTab === "todos"
            // ? mockTermos
            // : mockTermos.filter(t => t.status === activeTab);

        // setTermos(filteredByStatus);
    } catch (error) {
        console.error("Erro ao buscar termos:", error);
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

const filteredTermos = termos
    .filter(termo => {
        const matchesSearch = termo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            termo.definicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            termo.tags.some(tag => tag.includes(searchTerm.toLowerCase()));

        const matchesCategoria = !filters.categoria || termo.categoria === filters.categoria;

        const matchesDataInicio = !filters.dataInicio ||
            new Date(termo.dataCriacao) >= new Date(filters.dataInicio);

        const matchesDataFim = !filters.dataFim ||
            new Date(termo.dataCriacao) <= new Date(filters.dataFim);

        return matchesSearch && matchesCategoria && matchesDataInicio && matchesDataFim;
    })
    .sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Termo];
        const bValue = b[sortConfig.key as keyof Termo];

        if (sortConfig.key === "autor") {
            return sortConfig.direction === "asc"
                ? a.autor.nome.localeCompare(b.autor.nome)
                : b.autor.nome.localeCompare(a.autor.nome);
        }

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

const totalPages = Math.ceil(filteredTermos.length / itemsPerPage);
const paginatedTermos = filteredTermos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
);

const getStatusBadge = (status: string) => {
    const styles = {
        aprovado: { bg: "var(--success-light)", color: "var(--success)", icon: <FaCheckCircle />, label: "Aprovado" },
        pendente: { bg: "var(--warning-light)", color: "var(--warning)", icon: <FaClock />, label: "Pendente" },
        recusado: { bg: "var(--danger-light)", color: "var(--danger)", icon: <FaTimesCircle />, label: "Recusado" },
        arquivado: { bg: "var(--text-tertiary)20", color: "var(--text-tertiary)", icon: <FaFileAlt />, label: "Arquivado" }
    };

    const style = styles[status as keyof typeof styles] || styles.pendente;

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
            {style.icon}
            {style.label}
        </span>
    );
};

const handleDeleteTermo = async (id: string) => {
    if (!confirm("Arquivar termo?")) return;

    const { error } =
        await supabase
            .from("termos")
            .update({ status: "arquivado" })
            .eq("id", id);

    if (error) {
        console.error(error);
        return;
    }

    fetchTermos();
};

if (loading) {
    return (
        <DashboardLayout>
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p style={{ color: "var(--text-tertiary)" }}>Carregando termos...</p>
            </div>
        </DashboardLayout>
    );
}

return (
    <DashboardLayout>
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Gerenciar Termos Técnico</h1>
                    <p style={styles.subtitle}>
                        Gerencie todos os termos e documentos da plataforma
                    </p>
                </div>

                <button
                    onClick={() => navigate("/termos/novo")}
                    style={styles.primaryButton}
                >
                    <FaPlus /> Novo Termo
                </button>
            </div>

            {/* Abas de Status */}
            <div style={styles.tabsContainer}>
                <button
                    onClick={() => setActiveTab("todos")}
                    style={{
                        ...styles.tab,
                        background: activeTab === "todos" ? "var(--primary)" : "transparent",
                        color: activeTab === "todos" ? "#fff" : "var(--text-secondary)",
                        borderColor: activeTab === "todos" ? "var(--primary)" : "var(--border-color)"
                    }}
                >
                    Todos ({termos.length})
                </button>
                <button
                    onClick={() => setActiveTab("pendente")}
                    style={{
                        ...styles.tab,
                        background: activeTab === "pendente" ? "var(--warning)" : "transparent",
                        color: activeTab === "pendente" ? "#fff" : "var(--text-secondary)",
                        borderColor: activeTab === "pendente" ? "var(--warning)" : "var(--border-color)"
                    }}
                >
                    Pendentes ({termos.filter(t => t.status === "pendente").length})
                </button>
                <button
                    onClick={() => setActiveTab("aprovado")}
                    style={{
                        ...styles.tab,
                        background: activeTab === "aprovado" ? "var(--success)" : "transparent",
                        color: activeTab === "aprovado" ? "#fff" : "var(--text-secondary)",
                        borderColor: activeTab === "aprovado" ? "var(--success)" : "var(--border-color)"
                    }}
                >
                    Aprovados ({termos.filter(t => t.status === "aprovado").length})
                </button>
                <button
                    onClick={() => setActiveTab("recusado")}
                    style={{
                        ...styles.tab,
                        background: activeTab === "recusado" ? "var(--danger)" : "transparent",
                        color: activeTab === "recusado" ? "#fff" : "var(--text-secondary)",
                        borderColor: activeTab === "recusado" ? "var(--danger)" : "var(--border-color)"
                    }}
                >
                    Recusados ({termos.filter(t => t.status === "recusado").length})
                </button>
                <button
                    onClick={() => setActiveTab("arquivado")}
                    style={{
                        ...styles.tab,
                        background: activeTab === "arquivado" ? "var(--text-tertiary)" : "transparent",
                        color: activeTab === "arquivado" ? "#fff" : "var(--text-secondary)",
                        borderColor: activeTab === "arquivado" ? "var(--text-tertiary)" : "var(--border-color)"
                    }}
                >
                    Arquivados ({termos.filter(t => t.status === "arquivado").length})
                </button>
            </div>

            {/* Busca e Filtros */}
            <div style={styles.searchSection}>
                <div style={styles.searchBox}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar por título, descrição ou tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                        ...styles.filterToggle,
                        background: showFilters ? "var(--primary-soft)" : "transparent",
                        borderColor: showFilters ? "var(--primary)" : "var(--border-color)"
                    }}
                >
                    <FaFilter /> Filtros
                </button>
            </div>

            {/* Painel de Filtros */}
            {showFilters && (
                <div style={styles.filtersPanel}>
                    <select
                        value={filters.categoria}
                        onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
                        style={styles.filterSelect}
                    >
                        <option value="">Todas as categorias</option>
                        {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        placeholder="Data inicial"
                        value={filters.dataInicio}
                        onChange={(e) => setFilters({ ...filters, dataInicio: e.target.value })}
                        style={styles.filterDate}
                    />

                    <input
                        type="date"
                        placeholder="Data final"
                        value={filters.dataFim}
                        onChange={(e) => setFilters({ ...filters, dataFim: e.target.value })}
                        style={styles.filterDate}
                    />

                    <button
                        onClick={() => setFilters({ categoria: "", dataInicio: "", dataFim: "" })}
                        style={styles.clearFilters}
                    >
                        Limpar filtros
                    </button>
                </div>
            )}

            {/* Tabela */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.tableHeaderCell} onClick={() => handleSort("titulo")}>
                                <div style={styles.sortableHeader}>
                                    Título {getSortIcon("titulo")}
                                </div>
                            </th>
                            <th style={styles.tableHeaderCell} onClick={() => handleSort("categoria")}>
                                <div style={styles.sortableHeader}>
                                    Categoria {getSortIcon("categoria")}
                                </div>
                            </th>
                            <th style={styles.tableHeaderCell}>Status</th>
                            <th style={styles.tableHeaderCell} onClick={() => handleSort("autor")}>
                                <div style={styles.sortableHeader}>
                                    Autor {getSortIcon("autor")}
                                </div>
                            </th>
                            <th style={styles.tableHeaderCell} onClick={() => handleSort("dataCriacao")}>
                                <div style={styles.sortableHeader}>
                                    Data {getSortIcon("dataCriacao")}
                                </div>
                            </th>
                            <th style={styles.tableHeaderCell}>Versão</th>
                            <th style={styles.tableHeaderCell}>Visualizações</th>
                            <th style={styles.tableHeaderCell}>Assinaturas</th>
                            <th style={styles.tableHeaderCell}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTermos.map((termo) => (
                            <tr
                                key={termo.id}
                                style={styles.tableRow}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                }}
                            >
                                <td style={styles.tableCell}>
                                    <div style={styles.termoInfo}>
                                        <FaFileAlt style={{ color: "var(--primary)", width: "20px", height: "20px" }} />
                                        <div style={styles.termoContent}>
                                            <div style={styles.termoTitle}>{termo.titulo}</div>
                                            <div style={styles.termoDesc}>
                                                {termo.definicao?.substring(0, 60)}
                                                {termo.definicao?.length > 60 ? "..." : ""}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.tableCell}>
                                    <span style={styles.categoryBadge}>{termo.categoria}</span>
                                </td>
                                <td style={styles.tableCell}>
                                    {getStatusBadge(termo.status)}
                                </td>
                                <td style={styles.tableCell}>
                                    <div style={styles.authorInfo}>
                                        <div style={styles.authorAvatar}>
                                            {termo.autor?.nome?.charAt(0) || "?"}
                                        </div>
                                        <span>{termo.autor?.nome || "N/A"}</span>
                                    </div>
                                </td>
                                <td style={styles.tableCell}>
                                    <div>
                                        <div>{new Date(termo.dataCriacao).toLocaleDateString()}</div>
                                        {termo.dataPublicacao && (
                                            <div style={styles.publishDate}>
                                                Pub: {new Date(termo.dataPublicacao).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td style={styles.tableCell}>
                                    <span style={styles.versionBadge}>v{termo.versao}</span>
                                </td>
                                <td style={styles.tableCell}>
                                    <span style={styles.statBadge}>{termo.visualizacoes || 0}</span>
                                </td>
                                <td style={styles.tableCell}>
                                    <span style={styles.statBadge}>{termo.assinaturas || 0}</span>
                                </td>
                                <td style={styles.tableCell}>
                                    <div style={styles.actionButtons}>
                                        <button
                                            onClick={() => navigate(`/termos/${termo.id}`)}
                                            style={styles.actionButton}
                                            title="Visualizar"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/termos/${termo.id}/editar`)}
                                            style={styles.actionButton}
                                            title="Editar"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTermo(termo.id)}
                                            style={{ ...styles.actionButton, color: "var(--danger)" }}
                                            title="Arquivar"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {paginatedTermos.length === 0 && (
                    <div style={styles.emptyState}>
                        <FaFileAlt size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
                        <h3 style={styles.emptyTitle}>Nenhum termo encontrado</h3>
                        <p style={styles.emptyText}>
                            {searchTerm || filters.categoria
                                ? "Tente ajustar seus filtros."
                                : "Crie seu primeiro termo clicando em 'Novo Termo'."}
                        </p>
                    </div>
                )}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
                <div style={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        style={{
                            ...styles.paginationButton,
                            opacity: currentPage === 1 ? 0.5 : 1,
                            cursor: currentPage === 1 ? "not-allowed" : "pointer"
                        }}
                    >
                        <FaChevronLeft />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            style={{
                                ...styles.paginationButton,
                                background: currentPage === page ? "var(--primary)" : "transparent",
                                color: currentPage === page ? "#fff" : "var(--text-secondary)",
                                borderColor: currentPage === page ? "var(--primary)" : "var(--border-color)"
                            }}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                            ...styles.paginationButton,
                            opacity: currentPage === totalPages ? 0.5 : 1,
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                        }}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    </DashboardLayout>
);
}

// Estilos otimizados
const styles: Record<string, React.CSSProperties> = {
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh"
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "3px solid var(--border-color)",
        borderTopColor: "var(--primary)",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 16px"
    },
    container: {
        animation: "fadeIn 0.5s ease-out"
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
        color: "var(--text-primary)"
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
        cursor: "pointer",
        transition: "all 0.2s"
    },
    tabsContainer: {
        display: "flex",
        gap: "8px",
        marginBottom: "24px",
        flexWrap: "wrap"
    },
    tab: {
        padding: "8px 16px",
        borderRadius: "20px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s",
        color: "var(--text-secondary)"
    },
    activeTab: {
        background: "var(--primary)",
        color: "#fff",
        borderColor: "var(--primary)"
    },
    searchSection: {
        display: "flex",
        alignItems: 'center',
        gap: "1rem",
        marginBottom: "12px",
        padding: '0.5rem',
        background: 'var(--bg-secondary)',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        transition: 'box-shadow 0.3s ease',
    },
    searchBox: {
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center"
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
        padding: "12px 12px 12px 40px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s"
    },
    filterToggle: {
        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--bg-secondary)",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
        color: "var(--text-secondary)"
    },
    filtersPanel: {
        display: "flex",
        gap: "12px",
        marginBottom: "20px",
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        flexWrap: "wrap",
        alignItems: "center"
    },
    filterSelect: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px",
        minWidth: "150px",
        outline: "none"
    },
    filterDate: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px",
        outline: "none"
    },
    clearFilters: {
        padding: "10px 16px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center"
    },
    tableContainer: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        overflow: "auto",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "1200px"
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
        cursor: "pointer",
        transition: "color 0.2s"
    },
    sortableHeader: {
        display: "flex",
        alignItems: "center",
        gap: "4px"
    },
    tableRow: {
        borderBottom: "1px solid var(--border-color)",
        transition: "background-color 0.2s"
    },
    tableCell: {
        padding: "16px",
        fontSize: "13px",
        color: "var(--text-secondary)",
        textAlign: "left"
    },
    termoInfo: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    termoContent: {
        flex: 1
    },
    termoTitle: {
        fontWeight: "500",
        color: "var(--text-primary)",
        marginBottom: "4px",
        fontSize: "14px"
    },
    termoDesc: {
        fontSize: "12px",
        color: "var(--text-tertiary)",
        lineHeight: "1.4"
    },
    categoryBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        background: "var(--primary-soft)",
        color: "var(--primary)",
        display: "inline-block"
    },
    authorInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    authorAvatar: {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "var(--primary-soft)",
        color: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase"
    },
    publishDate: {
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "2px"
    },
    versionBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        background: "var(--bg-tertiary)",
        color: "var(--text-tertiary)",
        display: "inline-block"
    },
    statBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)",
        display: "inline-block"
    },
    actionButtons: {
        display: "flex",
        gap: "8px",
        justifyContent: "flex-start"
    },
    actionButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-secondary)",
        fontSize: "14px",
        padding: "6px",
        borderRadius: "4px",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    emptyState: {
        textAlign: "center",
        padding: "48px 24px"
    },
    emptyTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "8px"
    },
    emptyText: {
        fontSize: "14px",
        color: "var(--text-tertiary)",
        margin: 0
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginTop: "24px"
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
        justifyContent: "center",
        transition: "all 0.2s",
        fontSize: "14px"
    }
};

// Adicionar estilos globais se necessário
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);