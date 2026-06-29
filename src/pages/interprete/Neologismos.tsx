import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    FaPlus,
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaEye,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaVoteYea,
    FaChartBar,
    FaHandPaper,
    FaArrowsAlt,
    FaMapMarkerAlt,
    FaRegHandPeace,
    FaUsers,
    FaThumbsUp,
    FaThumbsDown,
    FaBalanceScale,
    FaHistory,
    FaQrcode,
    FaVideo,
    FaBook,
    FaTag,
    FaCalendarAlt,
    FaUserTie,
    FaChevronLeft,
    FaChevronRight,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaInfoCircle,
    FaExclamationTriangle,
    FaSpinner
} from "react-icons/fa";
import toast from "react-hot-toast";

interface Neologismo {
    id: string;
    termo: string;
    descricao: string;
    categoria: string;
    parametros: {
        configuracaoMao: string;
        movimento: string;
        pontoArticulacao: string;
        orientacao: string;
        expressaoFacial: string;
    };
    videoUrl?: string;
    imagemReferencia?: string;
    propositor: {
        id: string;
        nome: string;
        tipo: "professor" | "interprete" | "aluno" | "pesquisador";
        instituicao: string;
    };
    dataProposicao: string;
    status: "proposto" | "em-votacao" | "aprovado" | "rejeitado" | "em-revisao";
    votos: {
        favor: number;
        contra: number;
        total: number;
    };
    votacao: Voto[];
    comentarios: Comentario[];
    historico: HistoricoStatus[];
    tags: string[];
}

interface Voto {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    tipo: "favor" | "contra";
    justificativa?: string;
    data: string;
}

interface Comentario {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    texto: string;
    data: string;
}

interface HistoricoStatus {
    id: string;
    status: string;
    usuarioId: string;
    usuarioNome: string;
    observacao?: string;
    data: string;
}

interface FiltrosNeologismo {
    categoria: string;
    status: string;
    propositor: string;
    dataInicio: string;
    dataFim: string;
}

export default function GerenciarNeologismos() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [neologismos, setNeologismos] = useState<Neologismo[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtros, setFiltros] = useState<FiltrosNeologismo>({
        categoria: "",
        status: "",
        propositor: "",
        dataInicio: "",
        dataFim: ""
    });
    const [sortConfig, setSortConfig] = useState({
        key: "dataProposicao",
        direction: "desc"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedNeologismo, setSelectedNeologismo] = useState<Neologismo | null>(null);
    const [showVotacaoModal, setShowVotacaoModal] = useState(false);
    const [showParametrosModal, setShowParametrosModal] = useState(false);
    const [showHistoricoModal, setShowHistoricoModal] = useState(false);
    const [votoUsuario, setVotoUsuario] = useState<"favor" | "contra" | null>(null);
    const [justificativaVoto, setJustificativaVoto] = useState("");
    const itemsPerPage = 10;

    const categorias = [
        "Lógica de Programação",
        "Estruturas de Dados",
        "Banco de Dados",
        "Redes de Computadores",
        "Hardware",
        "Engenharia de Software",
        "Termos Gerais"
    ];

    const statusOptions = [
        { value: "proposto", label: "Proposto", icon: <FaClock />, color: "var(--info)" },
        { value: "em-votacao", label: "Em Votação", icon: <FaVoteYea />, color: "var(--warning)" },
        { value: "aprovado", label: "Aprovado", icon: <FaCheckCircle />, color: "var(--success)" },
        { value: "rejeitado", label: "Rejeitado", icon: <FaTimesCircle />, color: "var(--danger)" },
        { value: "em-revisao", label: "Em Revisão", icon: <FaHistory />, color: "var(--purple)" }
    ];

    useEffect(() => {
        fetchNeologismos();
    }, []);

    const fetchNeologismos = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockNeologismos: Neologismo[] = [
                {
                    id: "1",
                    termo: "Algoritmo",
                    descricao: "Sequência lógica de instruções para resolver um problema",
                    categoria: "Lógica de Programação",
                    parametros: {
                        configuracaoMao: "Mão em formato de 'A', dedos fechados",
                        movimento: "Movimento circular no sentido horário",
                        pontoArticulacao: "Espaço neutro à frente do corpo",
                        orientacao: "Palma da mão para baixo",
                        expressaoFacial: "Neutra, com foco"
                    },
                    videoUrl: "/videos/algoritmo.mp4",
                    propositor: {
                        id: "p1",
                        nome: "João Silva",
                        tipo: "professor",
                        instituicao: "IFPA - Campus Tucuruí"
                    },
                    dataProposicao: "2024-02-15T10:30:00",
                    status: "aprovado",
                    votos: {
                        favor: 15,
                        contra: 2,
                        total: 17
                    },
                    votacao: [
                        {
                            id: "v1",
                            usuarioId: "u1",
                            usuarioNome: "Maria Oliveira",
                            tipo: "favor",
                            justificativa: "Sinal intuitivo e fácil de executar",
                            data: "2024-02-16T14:20:00"
                        },
                        {
                            id: "v2",
                            usuarioId: "u2",
                            usuarioNome: "Carlos Santos",
                            tipo: "favor",
                            data: "2024-02-16T15:45:00"
                        },
                        {
                            id: "v3",
                            usuarioId: "u3",
                            usuarioNome: "Ana Pereira",
                            tipo: "contra",
                            justificativa: "Pode ser confundido com outro sinal existente",
                            data: "2024-02-17T09:30:00"
                        }
                    ],
                    comentarios: [
                        {
                            id: "c1",
                            usuarioId: "u4",
                            usuarioNome: "Pedro Costa",
                            texto: "Excelente proposta! Representa bem o conceito.",
                            data: "2024-02-16T10:15:00"
                        }
                    ],
                    historico: [
                        {
                            id: "h1",
                            status: "proposto",
                            usuarioId: "p1",
                            usuarioNome: "João Silva",
                            data: "2024-02-15T10:30:00"
                        },
                        {
                            id: "h2",
                            status: "em-votacao",
                            usuarioId: "admin1",
                            usuarioNome: "Admin Sistema",
                            observacao: "Iniciada votação pública",
                            data: "2024-02-15T14:00:00"
                        },
                        {
                            id: "h3",
                            status: "aprovado",
                            usuarioId: "admin1",
                            usuarioNome: "Admin Sistema",
                            observacao: "Aprovado por maioria simples",
                            data: "2024-02-20T09:00:00"
                        }
                    ],
                    tags: ["algoritmo", "lógica", "programação"]
                },
                {
                    id: "2",
                    termo: "Loop Infinito",
                    descricao: "Estrutura de repetição que nunca termina",
                    categoria: "Lógica de Programação",
                    parametros: {
                        configuracaoMao: "Mão em 'L', indicador e polegar estendidos",
                        movimento: "Movimento circular contínuo e acelerado",
                        pontoArticulacao: "Altura do ombro",
                        orientacao: "Palma para frente",
                        expressaoFacial: "Expressão de surpresa/alerta"
                    },
                    propositor: {
                        id: "p2",
                        nome: "Maria Oliveira",
                        tipo: "interprete",
                        instituicao: "UFPA"
                    },
                    dataProposicao: "2024-02-18T14:20:00",
                    status: "em-votacao",
                    votos: {
                        favor: 8,
                        contra: 4,
                        total: 12
                    },
                    votacao: [
                        {
                            id: "v4",
                            usuarioId: "u5",
                            usuarioNome: "Roberto Alves",
                            tipo: "favor",
                            data: "2024-02-19T11:30:00"
                        },
                        {
                            id: "v5",
                            usuarioId: "u6",
                            usuarioNome: "Carla Souza",
                            tipo: "contra",
                            justificativa: "Movimento muito complexo",
                            data: "2024-02-19T14:15:00"
                        }
                    ],
                    comentarios: [],
                    historico: [
                        {
                            id: "h4",
                            status: "proposto",
                            usuarioId: "p2",
                            usuarioNome: "Maria Oliveira",
                            data: "2024-02-18T14:20:00"
                        },
                        {
                            id: "h5",
                            status: "em-votacao",
                            usuarioId: "admin1",
                            usuarioNome: "Admin Sistema",
                            data: "2024-02-18T16:00:00"
                        }
                    ],
                    tags: ["loop", "infinito", "repetição"]
                },
                {
                    id: "3",
                    termo: "Banco de Dados",
                    descricao: "Conjunto estruturado de informações armazenadas eletronicamente",
                    categoria: "Banco de Dados",
                    parametros: {
                        configuracaoMao: "Mão em 'B', dedos estendidos e unidos",
                        movimento: "Movimento de empilhar, repetido duas vezes",
                        pontoArticulacao: "Espaço neutro",
                        orientacao: "Palmas para cima",
                        expressaoFacial: "Neutra"
                    },
                    propositor: {
                        id: "p3",
                        nome: "Carlos Santos",
                        tipo: "professor",
                        instituicao: "UEPA"
                    },
                    dataProposicao: "2024-02-10T09:45:00",
                    status: "proposto",
                    votos: {
                        favor: 0,
                        contra: 0,
                        total: 0
                    },
                    votacao: [],
                    comentarios: [
                        {
                            id: "c2",
                            usuarioId: "u7",
                            usuarioNome: "Fernanda Lima",
                            texto: "Sugiro um movimento diferente para não confundir com 'livro'",
                            data: "2024-02-11T08:30:00"
                        }
                    ],
                    historico: [
                        {
                            id: "h6",
                            status: "proposto",
                            usuarioId: "p3",
                            usuarioNome: "Carlos Santos",
                            data: "2024-02-10T09:45:00"
                        }
                    ],
                    tags: ["banco", "dados", "sql"]
                }
            ];

            setNeologismos(mockNeologismos);
        } catch (error) {
            console.error("Erro ao buscar neologismos:", error);
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

    const filteredNeologismos = neologismos
        .filter(item => {
            const matchesSearch = item.termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.propositor.nome.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategoria = !filtros.categoria || item.categoria === filtros.categoria;
            const matchesStatus = !filtros.status || item.status === filtros.status;

            return matchesSearch && matchesCategoria && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Neologismo];
            const bValue = b[sortConfig.key as keyof Neologismo];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            return 0;
        });

    const totalPages = Math.ceil(filteredNeologismos.length / itemsPerPage);
    const paginatedNeologismos = filteredNeologismos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusBadge = (status: string) => {
        const config: Record<string, any> = {
            "proposto": { bg: "var(--info-light)", color: "var(--info)", icon: <FaClock />, label: "Proposto" },
            "em-votacao": { bg: "var(--warning-light)", color: "var(--warning)", icon: <FaVoteYea />, label: "Em Votação" },
            "aprovado": { bg: "var(--success-light)", color: "var(--success)", icon: <FaCheckCircle />, label: "Aprovado" },
            "rejeitado": { bg: "var(--danger-light)", color: "var(--danger)", icon: <FaTimesCircle />, label: "Rejeitado" },
            "em-revisao": { bg: "var(--purple-light)", color: "var(--purple)", icon: <FaHistory />, label: "Em Revisão" }
        };
        const style = config[status];

        return (
            <span style={{
                ...styles.statusBadge,
                background: style.bg,
                color: style.color
            }}>
                {style.icon} {style.label}
            </span>
        );
    };

    const handleVotar = (neologismo: Neologismo) => {
        setSelectedNeologismo(neologismo);
        setVotoUsuario(null);
        setJustificativaVoto("");
        setShowVotacaoModal(true);
    };

    const handleSubmitVoto = () => {
        if (!selectedNeologismo || !votoUsuario) return;

        // Simular envio de voto
        console.log("Voto registrado:", {
            neologismoId: selectedNeologismo.id,
            voto: votoUsuario,
            justificativa: justificativaVoto
        });

        toast.success("Voto registrado com sucesso!");
        setShowVotacaoModal(false);
    };

    const handleVerParametros = (neologismo: Neologismo) => {
        setSelectedNeologismo(neologismo);
        setShowParametrosModal(true);
    };

    const handleVerHistorico = (neologismo: Neologismo) => {
        setSelectedNeologismo(neologismo);
        setShowHistoricoModal(true);
    };

    const handleNovoNeologismo = () => {
        navigate("/neologismos/novo");
    };

    const handleEditar = (id: string) => {
        navigate(`/neologismos/${id}/editar`);
    };

    if (loading) {
        return (
            // <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Carregando neologismos...</p>
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
                            Neologismos em Libras
                        </h1>
                        <p style={styles.subtitle}>
                            Proposição e validação colaborativa de novos sinais para termos técnicos
                        </p>
                    </div>
                    <button onClick={handleNovoNeologismo} style={styles.primaryButton}>
                        <FaPlus /> Propor Novo Sinal
                    </button>
                </div>

                {/* Cards de Estatísticas */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaClock size={24} color="var(--info)" />
                        <div>
                            <span style={styles.statValue}>
                                {neologismos.filter(n => n.status === "proposto").length}
                            </span>
                            <span style={styles.statLabel}>Propostos</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaVoteYea size={24} color="var(--warning)" />
                        <div>
                            <span style={styles.statValue}>
                                {neologismos.filter(n => n.status === "em-votacao").length}
                            </span>
                            <span style={styles.statLabel}>Em Votação</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaCheckCircle size={24} color="var(--success)" />
                        <div>
                            <span style={styles.statValue}>
                                {neologismos.filter(n => n.status === "aprovado").length}
                            </span>
                            <span style={styles.statLabel}>Aprovados</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaUsers size={24} color="var(--primary)" />
                        <div>
                            <span style={styles.statValue}>
                                {neologismos.reduce((acc, n) => acc + n.votos.total, 0)}
                            </span>
                            <span style={styles.statLabel}>Total de Votos</span>
                        </div>
                    </div>
                </div>

                {/* Busca e Filtros */}
                <div style={styles.searchSection}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por termo, descrição ou propositor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={styles.filterButton}
                    >
                        <FaFilter /> Filtros
                    </button>
                </div>

                {/* Painel de Filtros */}
                {showFilters && (
                    <div style={styles.filtersPanel}>
                        <div style={styles.filtersGrid}>
                            <select
                                value={filtros.categoria}
                                onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todas as categorias</option>
                                {categorias.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                value={filtros.status}
                                onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todos os status</option>
                                {statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => setFiltros({ categoria: "", status: "", propositor: "", dataInicio: "", dataFim: "" })}
                            style={styles.clearFilters}
                        >
                            Limpar Filtros
                        </button>
                    </div>
                )}

                {/* Lista de Neologismos */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.tableHeaderCell} onClick={() => handleSort("termo")}>
                                    <div style={styles.sortableHeader}>
                                        Termo {getSortIcon("termo")}
                                    </div>
                                </th>
                                <th style={styles.tableHeaderCell}>Categoria</th>
                                <th style={styles.tableHeaderCell}>Status</th>
                                <th style={styles.tableHeaderCell}>Propositor</th>
                                <th style={styles.tableHeaderCell} onClick={() => handleSort("dataProposicao")}>
                                    <div style={styles.sortableHeader}>
                                        Data {getSortIcon("dataProposicao")}
                                    </div>
                                </th>
                                <th style={styles.tableHeaderCell}>Votação</th>
                                <th style={styles.tableHeaderCell}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedNeologismos.map((item) => (
                                <tr key={item.id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>
                                        <div style={styles.termoInfo}>
                                            <strong>{item.termo}</strong>
                                            <span style={styles.termoDesc}>{item.descricao.substring(0, 60)}...</span>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <span style={styles.categoriaBadge}>{item.categoria}</span>
                                    </td>
                                    <td style={styles.tableCell}>
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.propositorInfo}>
                                            <span>{item.propositor.nome}</span>
                                            <span style={styles.propositorTipo}>({item.propositor.tipo})</span>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        {new Date(item.dataProposicao).toLocaleDateString()}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.votacaoInfo}>
                                            <span style={{ color: "var(--success)" }}>
                                                <FaThumbsUp /> {item.votos.favor}
                                            </span>
                                            <span style={{ color: "var(--danger)" }}>
                                                <FaThumbsDown /> {item.votos.contra}
                                            </span>
                                            <span style={styles.totalVotos}>
                                                Total: {item.votos.total}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.actionButtons}>
                                            <button
                                                onClick={() => handleVerParametros(item)}
                                                style={styles.actionButton}
                                                title="Ver parâmetros linguísticos"
                                            >
                                                <FaHandPaper />
                                            </button>
                                            <button
                                                onClick={() => handleVotar(item)}
                                                style={styles.actionButton}
                                                title="Votar"
                                                disabled={item.status !== "em-votacao"}
                                            >
                                                <FaVoteYea />
                                            </button>
                                            <button
                                                onClick={() => handleVerHistorico(item)}
                                                style={styles.actionButton}
                                                title="Ver histórico"
                                            >
                                                <FaHistory />
                                            </button>
                                            <button
                                                onClick={() => handleEditar(item.id)}
                                                style={styles.actionButton}
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                    <div style={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            style={styles.paginationButton}
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
                                    color: currentPage === page ? "#fff" : "var(--text-secondary)"
                                }}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            style={styles.paginationButton}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}

                {/* Modal de Votação */}
                {showVotacaoModal && selectedNeologismo && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <div style={styles.modalHeader}>
                                <h3>Votar em: {selectedNeologismo.termo}</h3>
                                <button
                                    onClick={() => setShowVotacaoModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                <div style={styles.votacaoInfo}>
                                    <p><strong>Descrição:</strong> {selectedNeologismo.descricao}</p>
                                    <p><strong>Votos atuais:</strong> {selectedNeologismo.votos.favor} favor / {selectedNeologismo.votos.contra} contra</p>
                                </div>

                                <div style={styles.votacaoOpcoes}>
                                    <button
                                        onClick={() => setVotoUsuario("favor")}
                                        style={{
                                            ...styles.votoButton,
                                            background: votoUsuario === "favor" ? "var(--success)" : "transparent",
                                            color: votoUsuario === "favor" ? "#fff" : "var(--success)",
                                            borderColor: "var(--success)"
                                        }}
                                    >
                                        <FaThumbsUp /> Aprovar Sinal
                                    </button>
                                    <button
                                        onClick={() => setVotoUsuario("contra")}
                                        style={{
                                            ...styles.votoButton,
                                            background: votoUsuario === "contra" ? "var(--danger)" : "transparent",
                                            color: votoUsuario === "contra" ? "#fff" : "var(--danger)",
                                            borderColor: "var(--danger)"
                                        }}
                                    >
                                        <FaThumbsDown /> Rejeitar Sinal
                                    </button>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Justificativa (opcional)</label>
                                    <textarea
                                        value={justificativaVoto}
                                        onChange={(e) => setJustificativaVoto(e.target.value)}
                                        rows={3}
                                        style={styles.textarea}
                                        placeholder="Explique o motivo do seu voto..."
                                    />
                                </div>

                                <div style={styles.parametrosResumo}>
                                    <h4>Parâmetros Linguísticos:</h4>
                                    <ul>
                                        <li><strong>Configuração de mão:</strong> {selectedNeologismo.parametros.configuracaoMao}</li>
                                        <li><strong>Movimento:</strong> {selectedNeologismo.parametros.movimento}</li>
                                        <li><strong>Ponto de articulação:</strong> {selectedNeologismo.parametros.pontoArticulacao}</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => setShowVotacaoModal(false)}
                                    style={styles.modalCancelButton}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmitVoto}
                                    disabled={!votoUsuario}
                                    style={{
                                        ...styles.modalConfirmButton,
                                        background: !votoUsuario ? "var(--text-tertiary)" : "var(--primary)",
                                        cursor: !votoUsuario ? "not-allowed" : "pointer"
                                    }}
                                >
                                    Confirmar Voto
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Parâmetros */}
                {showParametrosModal && selectedNeologismo && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "600px" }}>
                            <div style={styles.modalHeader}>
                                <h3>Parâmetros Linguísticos - {selectedNeologismo.termo}</h3>
                                <button
                                    onClick={() => setShowParametrosModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                <div style={styles.parametrosGrid}>
                                    <div style={styles.parametroItem}>
                                        <FaHandPaper size={24} color="var(--primary)" />
                                        <div>
                                            <strong>Configuração de Mão:</strong>
                                            <p>{selectedNeologismo.parametros.configuracaoMao}</p>
                                        </div>
                                    </div>
                                    <div style={styles.parametroItem}>
                                        <FaArrowsAlt size={24} color="var(--success)" />
                                        <div>
                                            <strong>Movimento:</strong>
                                            <p>{selectedNeologismo.parametros.movimento}</p>
                                        </div>
                                    </div>
                                    <div style={styles.parametroItem}>
                                        <FaMapMarkerAlt size={24} color="var(--warning)" />
                                        <div>
                                            <strong>Ponto de Articulação:</strong>
                                            <p>{selectedNeologismo.parametros.pontoArticulacao}</p>
                                        </div>
                                    </div>
                                    <div style={styles.parametroItem}>
                                        <FaRegHandPeace size={24} color="var(--info)" />
                                        <div>
                                            <strong>Orientação:</strong>
                                            <p>{selectedNeologismo.parametros.orientacao}</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedNeologismo.videoUrl && (
                                    <div style={styles.videoContainer}>
                                        <h4>Vídeo de Referência</h4>
                                        <video controls style={styles.videoPlayer}>
                                            <source src={selectedNeologismo.videoUrl} type="video/mp4" />
                                        </video>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Histórico */}
                {showHistoricoModal && selectedNeologismo && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "500px" }}>
                            <div style={styles.modalHeader}>
                                <h3>Histórico - {selectedNeologismo.termo}</h3>
                                <button
                                    onClick={() => setShowHistoricoModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                {selectedNeologismo.historico.map((item, index) => (
                                    <div key={item.id} style={styles.historicoItem}>
                                        <div style={styles.historicoStatus}>
                                            {getStatusBadge(item.status)}
                                        </div>
                                        <div style={styles.historicoInfo}>
                                            <span><strong>{item.usuarioNome}</strong></span>
                                            <span>{new Date(item.data).toLocaleString()}</span>
                                            {item.observacao && (
                                                <p style={styles.historicoObs}>{item.observacao}</p>
                                            )}
                                        </div>
                                        {index < selectedNeologismo.historico.length - 1 && (
                                            <div style={styles.historicoLine} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
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