// import DashboardLayout from "../layouts/DashboardLayout";
// import FamiliasTable from "../components/Familias/FamiliasTable";
// import FamiliasHeader from "../components/Familias/FamiliasHeader";
// import { useState, useCallback } from "react";

// export default function FamiliasPage() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filters, setFilters] = useState<{ telefone?: boolean; email?: boolean }>({});
//     const [stats, setStats] = useState({
//         totalFamilias: 0,
//         familiasComTelefone: 0,
//         familiasComEmail: 0
//     });

//     // Função para atualizar estatísticas (chamada pelo FamiliasTable)
//     const handleStatsUpdate = useCallback((newStats: {
//         totalFamilias: number;
//         familiasComTelefone: number;
//         familiasComEmail: number;
//     }) => {
//         setStats(newStats);
//     }, []);

//     // Funções de busca e filtro
//     const handleSearch = useCallback((term: string) => {
//         setSearchTerm(term);
//     }, []);

//     const handleFilterChange = useCallback((filter: { telefone?: boolean; email?: boolean }) => {
//         setFilters(filter);
//     }, []);

//     return (
//         <DashboardLayout>
//             <FamiliasHeader
//                 totalFamilias={stats.totalFamilias}
//                 familiasComTelefone={stats.familiasComTelefone}
//                 familiasComEmail={stats.familiasComEmail}
//                 onSearch={handleSearch}
//                 onFilterChange={handleFilterChange}
//             />
//             <FamiliasTable
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
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaEye,
    FaDownload,
    FaComment,
    FaHistory,
    FaUserCheck,
    FaUserClock,
    FaUserTimes,
    FaSearch,
    FaFilter,
    FaChevronLeft,
    FaChevronRight,
    FaExclamationTriangle,
    FaQrcode,
    FaVideo,
    FaBook,
    FaBan,
    FaBell
} from "react-icons/fa";
// import html2canvas from "html2canvas";
import QRCode from "qrcode";

interface TermoPendente {
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    versao: string;
    autor: {
        id: string;
        nome: string;
        tipo: string;
        avatar?: string;
    };
    dataEnvio: string;
    dataLimite?: string;
    prioridade: "baixa" | "media" | "alta" | "urgente";
    comentarios: Comentario[];
    anexos: number;
    tags: string[];
    status: "pendente" | "publicado" | "recusado";
    conteudo?: string;
    videoExplicativo?: string;
    definicoes?: Definicao[];
    qrCode?: string;
}

interface Definicao {
    termo: string;
    definicao: string;
}

interface Comentario {
    id: string;
    autor: string;
    texto: string;
    data: string;
    tipo: "revisor" | "autor";
}

interface HistoricoAprovacao {
    id: string;
    termoId: string;
    termoTitulo: string;
    acao: "aprovado" | "recusado" | "revisao";
    revisor: {
        id: string;
        nome: string;
    };
    data: string;
    justificativa?: string;
    versao: string;
}

export default function AprovarRecusarTermos() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<"pendentes" | "historico">("pendentes");
    const [termosPendentes, setTermosPendentes] = useState<TermoPendente[]>([]);
    const [historico, setHistorico] = useState<HistoricoAprovacao[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        categoria: "",
        prioridade: "",
        revisor: ""
    });
    const [selectedTermo, setSelectedTermo] = useState<TermoPendente | null>(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewAction, setReviewAction] = useState<"aprovar" | "recusar" | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showTermoModal, setShowTermoModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showDefinicoesModal, setShowDefinicoesModal] = useState(false);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [qrCodeImage, setQrCodeImage] = useState<string>("");
    const [notificacoes, setNotificacoes] = useState<Array<{ id: string; mensagem: string; tipo: string }>>([]);
    const itemsPerPage = 5;

    const categorias = [
        "Consentimento",
        "Responsabilidade",
        "Confidencialidade",
        "Adesão",
        "Compromisso",
        "Autorização",
        "Declaração"
    ];

    const prioridades = {
        baixa: { color: "var(--success)", label: "Baixa" },
        media: { color: "var(--info)", label: "Média" },
        alta: { color: "var(--warning)", label: "Alta" },
        urgente: { color: "var(--danger)", label: "Urgente" }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Dados mockados - Termos Pendentes
            const mockPendentes: TermoPendente[] = [
                {
                    id: "1",
                    titulo: "Termo de Responsabilidade - Uso de Equipamentos",
                    descricao: "Termo para responsabilidade sobre uso de equipamentos da instituição",
                    categoria: "Responsabilidade",
                    versao: "1.0",
                    autor: {
                        id: "2",
                        nome: "João Silva",
                        tipo: "gestor"
                    },
                    dataEnvio: "2024-02-20T10:30:00",
                    dataLimite: "2024-02-27",
                    prioridade: "alta",
                    comentarios: [
                        {
                            id: "c1",
                            autor: "Revisor",
                            texto: "Favor revisar cláusula 3 sobre responsabilidades",
                            data: "2024-02-21T09:15:00",
                            tipo: "revisor"
                        }
                    ],
                    anexos: 2,
                    tags: ["equipamentos", "responsabilidade"],
                    status: "pendente",
                    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    videoExplicativo: "https://www.youtube.com/watch?v=example",
                    definicoes: [
                        { termo: "Equipamento", definicao: "Qualquer dispositivo eletrônico fornecido pela instituição" },
                        { termo: "Responsabilidade", definicao: "Obrigação de responder pelos atos praticados" }
                    ]
                },
                {
                    id: "2",
                    titulo: "Termo de Compromisso - Estágio",
                    descricao: "Termo de compromisso para estágio curricular obrigatório",
                    categoria: "Compromisso",
                    versao: "1.5",
                    autor: {
                        id: "3",
                        nome: "Maria Oliveira",
                        tipo: "profissional"
                    },
                    dataEnvio: "2024-02-19T14:20:00",
                    dataLimite: "2024-02-26",
                    prioridade: "media",
                    comentarios: [],
                    anexos: 1,
                    tags: ["estágio", "compromisso"],
                    status: "pendente"
                },
                {
                    id: "3",
                    titulo: "Termo de Consentimento - Pesquisa Acadêmica",
                    descricao: "Termo para consentimento de participação em pesquisa",
                    categoria: "Consentimento",
                    versao: "2.1",
                    autor: {
                        id: "4",
                        nome: "Pedro Costa",
                        tipo: "profissional"
                    },
                    dataEnvio: "2024-02-18T09:45:00",
                    dataLimite: "2024-02-25",
                    prioridade: "urgente",
                    comentarios: [
                        {
                            id: "c2",
                            autor: "Autor",
                            texto: "Documento revisado conforme solicitado",
                            data: "2024-02-19T11:30:00",
                            tipo: "autor"
                        },
                        {
                            id: "c3",
                            autor: "Revisor",
                            texto: "Aguardando aprovação final",
                            data: "2024-02-20T08:15:00",
                            tipo: "revisor"
                        }
                    ],
                    anexos: 3,
                    tags: ["pesquisa", "consentimento"],
                    status: "pendente"
                },
                {
                    id: "4",
                    titulo: "Termo de Confidencialidade - Dados Sensíveis",
                    descricao: "Termo para garantia de sigilo de informações confidenciais",
                    categoria: "Confidencialidade",
                    versao: "3.0",
                    autor: {
                        id: "1",
                        nome: "Admin Sistema",
                        tipo: "admin"
                    },
                    dataEnvio: "2024-02-17T16:10:00",
                    prioridade: "baixa",
                    comentarios: [],
                    anexos: 0,
                    tags: ["confidencialidade", "dados"],
                    status: "pendente"
                }
            ];

            // Dados mockados - Histórico
            const mockHistorico: HistoricoAprovacao[] = [
                {
                    id: "h1",
                    termoId: "101",
                    termoTitulo: "Termo de Autorização - Uso de Imagem",
                    acao: "aprovado",
                    revisor: {
                        id: "1",
                        nome: "Admin Sistema"
                    },
                    data: "2024-02-19T15:30:00",
                    justificativa: "Documento atende todos os requisitos legais",
                    versao: "2.0"
                },
                {
                    id: "h2",
                    termoId: "102",
                    termoTitulo: "Termo de Responsabilidade - Eventos",
                    acao: "recusado",
                    revisor: {
                        id: "5",
                        nome: "Carlos Santos"
                    },
                    data: "2024-02-18T11:20:00",
                    justificativa: "Cláusulas 4 e 7 precisam ser revisadas conforme legislação vigente",
                    versao: "1.0"
                },
                {
                    id: "h3",
                    termoId: "103",
                    termoTitulo: "Termo de Adesão - Programa de Benefícios",
                    acao: "revisao",
                    revisor: {
                        id: "1",
                        nome: "Admin Sistema"
                    },
                    data: "2024-02-17T09:45:00",
                    justificativa: "Solicitada revisão do item 3.2 sobre elegibilidade",
                    versao: "1.2"
                }
            ];

            setTermosPendentes(mockPendentes);
            setHistorico(mockHistorico);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPendentes = termosPendentes
        .filter(termo => termo.status === "pendente")
        .filter(termo => {
            const matchesSearch = termo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                termo.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                termo.autor.nome.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategoria = !filters.categoria || termo.categoria === filters.categoria;
            const matchesPrioridade = !filters.prioridade || termo.prioridade === filters.prioridade;

            return matchesSearch && matchesCategoria && matchesPrioridade;
        })
        .sort((a, b) => {
            const prioridadeOrder = { urgente: 0, alta: 1, media: 2, baixa: 3 };
            return prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade];
        });

    const filteredHistorico = historico
        .filter(item => {
            const matchesSearch = item.termoTitulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.revisor.nome.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRevisor = !filters.revisor || item.revisor.nome.includes(filters.revisor);
            return matchesSearch && matchesRevisor;
        })
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    const totalPages = activeSection === "pendentes"
        ? Math.ceil(filteredPendentes.length / itemsPerPage)
        : Math.ceil(filteredHistorico.length / itemsPerPage);

    const paginatedData = activeSection === "pendentes"
        ? filteredPendentes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : filteredHistorico.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleReview = (termo: TermoPendente) => {
        setSelectedTermo(termo);
        setShowReviewModal(true);
    };

    const gerarQRCode = async (texto: string): Promise<string> => {
        try {
            return await QRCode.toDataURL(texto);
        } catch (error) {
            console.error("Erro ao gerar QR Code:", error);
            return "";
        }
    };

    const enviarNotificacao = (usuarioId: string, mensagem: string, tipo: string) => {
        const novaNotificacao = {
            id: Date.now().toString(),
            mensagem,
            tipo
        };
        setNotificacoes(prev => [novaNotificacao, ...prev]);
        console.log(`Notificação enviada para usuário ${usuarioId}: ${mensagem}`);
    };

    const submitReview = async () => {
        if (!reviewAction || !selectedTermo) return;

        try {
            if (reviewAction === "aprovar") {
                // Gerar QR Code automaticamente
                const qrCodeData = `https://sistema-termos.com/termo/${selectedTermo.id}`;
                const qrCode = await gerarQRCode(qrCodeData);

                // Atualizar status do termo para publicado
                const termoAtualizado = {
                    ...selectedTermo,
                    status: "publicado" as const,
                    qrCode: qrCode,
                    dataPublicacao: new Date().toISOString()
                };

                setTermosPendentes(prev => prev.map(t => 
                    t.id === selectedTermo.id ? termoAtualizado : t
                ));

                setHistorico(prev => [
                    {
                        id: `h${Date.now()}`,
                        termoId: selectedTermo.id,
                        termoTitulo: selectedTermo.titulo,
                        acao: "aprovado",
                        revisor: { id: "1", nome: "Admin Sistema" },
                        data: new Date().toISOString(),
                        justificativa: reviewComment,
                        versao: selectedTermo.versao
                    },
                    ...prev
                ]);

                // Mostrar QR Code
                setQrCodeImage(qrCode);
                setShowQRCodeModal(true);
            } else {
                // Recusar termo
                const termoAtualizado = {
                    ...selectedTermo,
                    status: "recusado" as const,
                    justificativaRecusa: reviewComment
                };

                setTermosPendentes(prev => prev.map(t => 
                    t.id === selectedTermo.id ? termoAtualizado : t
                ));

                setHistorico(prev => [
                    {
                        id: `h${Date.now()}`,
                        termoId: selectedTermo.id,
                        termoTitulo: selectedTermo.titulo,
                        acao: "recusado",
                        revisor: { id: "1", nome: "Admin Sistema" },
                        data: new Date().toISOString(),
                        justificativa: reviewComment,
                        versao: selectedTermo.versao
                    },
                    ...prev
                ]);

                // Enviar notificação
                enviarNotificacao(
                    selectedTermo.autor.id,
                    `Seu termo "${selectedTermo.titulo}" foi recusado. Motivo: ${reviewComment}`,
                    "recusa"
                );
            }

            setShowReviewModal(false);
            setReviewAction(null);
            setReviewComment("");
            setSelectedTermo(null);
        } catch (error) {
            console.error("Erro ao processar revisão:", error);
        }
    };

    const getTimeRemaining = (dataLimite?: string) => {
        if (!dataLimite) return null;

        const hoje = new Date();
        const limite = new Date(dataLimite);
        const diffTime = limite.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Expirado";
        if (diffDays === 0) return "Hoje";
        if (diffDays === 1) return "Amanhã";
        return `${diffDays} dias`;
    };

    const getTimeRemainingColor = (dataLimite?: string) => {
        if (!dataLimite) return "var(--text-tertiary)";

        const hoje = new Date();
        const limite = new Date(dataLimite);
        const diffTime = limite.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "var(--danger)";
        if (diffDays <= 2) return "var(--warning)";
        return "var(--success)";
    };

    const getAcaoIcon = (acao: string) => {
        switch (acao) {
            case "aprovado": return <FaCheckCircle style={{ color: "var(--success)" }} />;
            case "recusado": return <FaTimesCircle style={{ color: "var(--danger)" }} />;
            case "revisao": return <FaClock style={{ color: "var(--warning)" }} />;
            default: return <FaHistory />;
        }
    };

    const getAcaoLabel = (acao: string) => {
        switch (acao) {
            case "aprovado": return "Aprovado";
            case "recusado": return "Recusado";
            case "revisao": return "Revisão solicitada";
            default: return acao;
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p style={{ color: "var(--text-tertiary)" }}>Carregando...</p>
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
                        <h1 style={styles.title}>Aprovar/Recusar Termos</h1>
                        <p style={styles.subtitle}>
                            Revise e aprove os termos enviados pelos usuários
                        </p>
                    </div>
                </div>

                {/* Seções */}
                <div style={styles.sectionsContainer}>
                    <button
                        onClick={() => {
                            setActiveSection("pendentes");
                            setCurrentPage(1);
                        }}
                        style={{
                            ...styles.sectionButton,
                            background: activeSection === "pendentes" ? "var(--primary)" : "transparent",
                            color: activeSection === "pendentes" ? "#fff" : "var(--text-secondary)",
                            borderColor: activeSection === "pendentes" ? "var(--primary)" : "var(--border-color)"
                        }}
                    >
                        <FaClock /> Pendentes ({termosPendentes.filter(t => t.status === "pendente").length})
                    </button>
                    <button
                        onClick={() => {
                            setActiveSection("historico");
                            setCurrentPage(1);
                        }}
                        style={{
                            ...styles.sectionButton,
                            background: activeSection === "historico" ? "var(--primary)" : "transparent",
                            color: activeSection === "historico" ? "#fff" : "var(--text-secondary)",
                            borderColor: activeSection === "historico" ? "var(--primary)" : "var(--border-color)"
                        }}
                    >
                        <FaHistory /> Histórico ({historico.length})
                    </button>
                </div>

                {/* Busca e Filtros */}
                <div style={styles.searchSection}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder={activeSection === "pendentes"
                                ? "Buscar por título, descrição ou autor..."
                                : "Buscar por termo ou revisor..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    {activeSection === "pendentes" && (
                        <div style={styles.filterGroup}>
                            <select
                                value={filters.categoria}
                                onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todas categorias</option>
                                {categorias.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                value={filters.prioridade}
                                onChange={(e) => setFilters({ ...filters, prioridade: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todas prioridades</option>
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                                <option value="urgente">Urgente</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Lista de Itens */}
                <div style={styles.listContainer}>
                    {activeSection === "pendentes" ? (
                        // Termos Pendentes
                        paginatedData.map((item) => {
                            const termo = item as TermoPendente;
                            const timeRemaining = getTimeRemaining(termo.dataLimite);
                            const timeColor = getTimeRemainingColor(termo.dataLimite);

                            return (
                                <div key={termo.id} style={styles.card}>
                                    <div style={styles.cardHeader}>
                                        <div style={styles.cardTitleSection}>
                                            <FaFileAlt style={{ color: "var(--primary)", fontSize: "20px" }} />
                                            <div>
                                                <h3 style={styles.cardTitle}>{termo.titulo}</h3>
                                                <p style={styles.cardSubtitle}>{termo.descricao}</p>
                                            </div>
                                        </div>

                                        <div style={styles.cardBadges}>
                                            <span style={{
                                                ...styles.priorityBadge,
                                                background: `${prioridades[termo.prioridade].color}20`,
                                                color: prioridades[termo.prioridade].color
                                            }}>
                                                {prioridades[termo.prioridade].label}
                                            </span>
                                            <span style={styles.categoryBadge}>{termo.categoria}</span>
                                            <span style={styles.versionBadge}>v{termo.versao}</span>
                                        </div>
                                    </div>

                                    <div style={styles.cardBody}>
                                        <div style={styles.cardInfo}>
                                            <div style={styles.authorInfo}>
                                                <div style={styles.authorAvatar}>
                                                    {termo.autor.nome.charAt(0)}
                                                </div>
                                                <div>
                                                    <span style={styles.authorName}>{termo.autor.nome}</span>
                                                    <span style={styles.authorType}>({termo.autor.tipo})</span>
                                                </div>
                                            </div>

                                            <div style={styles.cardMeta}>
                                                <span style={styles.metaItem}>
                                                    <FaClock /> Enviado: {new Date(termo.dataEnvio).toLocaleString()}
                                                </span>
                                                {termo.dataLimite && (
                                                    <span style={{
                                                        ...styles.metaItem,
                                                        color: timeColor,
                                                        fontWeight: timeRemaining === "Expirado" ? "600" : "400"
                                                    }}>
                                                        <FaExclamationTriangle /> Prazo: {timeRemaining}
                                                    </span>
                                                )}
                                                <span style={styles.metaItem}>
                                                    <FaComment /> {termo.comentarios.length} comentários
                                                </span>
                                            </div>
                                        </div>

                                        {termo.comentarios.length > 0 && (
                                            <div style={styles.commentsPreview}>
                                                <div style={styles.commentsHeader}>
                                                    <FaComment /> Último comentário:
                                                </div>
                                                <div style={styles.commentItem}>
                                                    <span style={styles.commentAuthor}>
                                                        {termo.comentarios[termo.comentarios.length - 1].autor}:
                                                    </span>
                                                    <span style={styles.commentText}>
                                                        {termo.comentarios[termo.comentarios.length - 1].texto}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div style={styles.cardActions}>
                                            <button
                                                onClick={() => {
                                                    setSelectedTermo(termo);
                                                    setShowTermoModal(true);
                                                }}
                                                style={styles.actionButton}
                                                title="Visualizar termo"
                                            >
                                                <FaEye /> Termo
                                            </button>
                                            {termo.videoExplicativo && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedTermo(termo);
                                                        setShowVideoModal(true);
                                                    }}
                                                    style={styles.actionButton}
                                                    title="Assistir vídeo explicativo"
                                                >
                                                    <FaVideo /> Vídeo
                                                </button>
                                            )}
                                            {termo.definicoes && termo.definicoes.length > 0 && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedTermo(termo);
                                                        setShowDefinicoesModal(true);
                                                    }}
                                                    style={styles.actionButton}
                                                    title="Ver definições"
                                                >
                                                    <FaBook /> Definições
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleReview(termo)}
                                                style={{ ...styles.actionButton, background: "var(--primary)", color: "#fff" }}
                                            >
                                                <FaCheckCircle /> Revisar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        // Histórico de Aprovações
                        paginatedData.map((item) => {
                            const historicoItem = item as HistoricoAprovacao;

                            return (
                                <div key={historicoItem.id} style={styles.historicoCard}>
                                    <div style={styles.historicoIcon}>
                                        {getAcaoIcon(historicoItem.acao)}
                                    </div>

                                    <div style={styles.historicoContent}>
                                        <div style={styles.historicoHeader}>
                                            <div>
                                                <h4 style={styles.historicoTitle}>{historicoItem.termoTitulo}</h4>
                                                <div style={styles.historicoMeta}>
                                                    <span>v{historicoItem.versao}</span>
                                                    <span>•</span>
                                                    <span>{new Date(historicoItem.data).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <span style={{
                                                ...styles.historicoBadge,
                                                background: historicoItem.acao === "aprovado" ? "var(--success-light)" :
                                                    historicoItem.acao === "recusado" ? "var(--danger-light)" :
                                                        "var(--warning-light)",
                                                color: historicoItem.acao === "aprovado" ? "var(--success)" :
                                                    historicoItem.acao === "recusado" ? "var(--danger)" :
                                                        "var(--warning)"
                                            }}>
                                                {getAcaoLabel(historicoItem.acao)}
                                            </span>
                                        </div>

                                        <div style={styles.historicoRevisor}>
                                            <FaUserCheck /> Revisor: {historicoItem.revisor.nome}
                                        </div>

                                        {historicoItem.justificativa && (
                                            <div style={styles.historicoJustificativa}>
                                                <strong>Justificativa:</strong> {historicoItem.justificativa}
                                            </div>
                                        )}

                                        <div style={styles.historicoActions}>
                                            <button
                                                onClick={() => navigate(`/termos/${historicoItem.termoId}`)}
                                                style={styles.historicoButton}
                                            >
                                                <FaEye /> Ver termo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {paginatedData.length === 0 && (
                        <div style={styles.emptyState}>
                            {activeSection === "pendentes" ? (
                                <>
                                    <FaFileAlt size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
                                    <h3 style={styles.emptyTitle}>Nenhum termo pendente</h3>
                                    <p style={styles.emptyText}>
                                        Todos os termos foram revisados. Volte mais tarde.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <FaHistory size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
                                    <h3 style={styles.emptyTitle}>Nenhum registro no histórico</h3>
                                    <p style={styles.emptyText}>
                                        O histórico de aprovações aparecerá aqui.
                                    </p>
                                </>
                            )}
                        </div>
                    )}
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

                {/* Modal de Revisão */}
                {showReviewModal && selectedTermo && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>Revisar Termo</h3>
                                <button
                                    onClick={() => {
                                        setShowReviewModal(false);
                                        setReviewAction(null);
                                        setReviewComment("");
                                    }}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={styles.modalBody}>
                                <p style={styles.modalTermoInfo}>
                                    <strong>{selectedTermo.titulo}</strong>
                                    <br />
                                    <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                                        v{selectedTermo.versao} • {selectedTermo.categoria} • Autor: {selectedTermo.autor.nome}
                                    </span>
                                </p>

                                <div style={styles.modalActions}>
                                    <button
                                        onClick={() => setReviewAction("aprovar")}
                                        style={{
                                            ...styles.modalActionButton,
                                            background: reviewAction === "aprovar" ? "var(--success)" : "transparent",
                                            color: reviewAction === "aprovar" ? "#fff" : "var(--success)",
                                            borderColor: "var(--success)"
                                        }}
                                    >
                                        <FaCheckCircle /> Aprovar
                                    </button>
                                    <button
                                        onClick={() => setReviewAction("recusar")}
                                        style={{
                                            ...styles.modalActionButton,
                                            background: reviewAction === "recusar" ? "var(--danger)" : "transparent",
                                            color: reviewAction === "recusar" ? "#fff" : "var(--danger)",
                                            borderColor: "var(--danger)"
                                        }}
                                    >
                                        <FaTimesCircle /> Recusar
                                    </button>
                                </div>

                                <div style={styles.modalComment}>
                                    <label style={styles.modalCommentLabel}>
                                        Justificativa {reviewAction === "recusar" && <span style={{color: "var(--danger)"}}>*</span>}
                                    </label>
                                    <textarea
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder={reviewAction === "recusar" 
                                            ? "Digite o motivo da recusa (obrigatório)" 
                                            : "Digite sua justificativa (opcional)"}
                                        rows={4}
                                        style={styles.modalTextarea}
                                    />
                                </div>

                                {selectedTermo.comentarios.length > 0 && (
                                    <div style={styles.modalComments}>
                                        <h4 style={styles.modalCommentsTitle}>Comentários anteriores:</h4>
                                        {selectedTermo.comentarios.map(comment => (
                                            <div key={comment.id} style={styles.modalCommentItem}>
                                                <span style={styles.modalCommentAuthor}>{comment.autor}:</span>
                                                <span style={styles.modalCommentText}>{comment.texto}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => {
                                        setShowReviewModal(false);
                                        setReviewAction(null);
                                        setReviewComment("");
                                    }}
                                    style={styles.modalCancelButton}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={submitReview}
                                    disabled={!reviewAction || (reviewAction === "recusar" && !reviewComment.trim())}
                                    style={{
                                        ...styles.modalSubmitButton,
                                        background: !reviewAction || (reviewAction === "recusar" && !reviewComment.trim())
                                            ? "var(--text-tertiary)"
                                            : reviewAction === "aprovar" ? "var(--success)" : "var(--danger)",
                                        cursor: !reviewAction || (reviewAction === "recusar" && !reviewComment.trim())
                                            ? "not-allowed"
                                            : "pointer"
                                    }}
                                >
                                    {reviewAction === "aprovar" ? "Confirmar Aprovação" : "Confirmar Recusa"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Visualização do Termo */}
                {showTermoModal && selectedTermo && (
                    <div style={styles.modalOverlay}>
                        <div style={{...styles.modal, maxWidth: "800px"}}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>Visualizar Termo</h3>
                                <button
                                    onClick={() => setShowTermoModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                <h4>{selectedTermo.titulo}</h4>
                                <p style={styles.modalTermoInfo}>
                                    <strong>Versão:</strong> {selectedTermo.versao}<br />
                                    <strong>Categoria:</strong> {selectedTermo.categoria}<br />
                                    <strong>Autor:</strong> {selectedTermo.autor.nome} ({selectedTermo.autor.tipo})<br />
                                    <strong>Data de envio:</strong> {new Date(selectedTermo.dataEnvio).toLocaleString()}
                                </p>
                                <div style={styles.termoConteudo}>
                                    <h5>Conteúdo do Termo:</h5>
                                    <p>{selectedTermo.conteudo || "Conteúdo não disponível"}</p>
                                </div>
                            </div>
                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => setShowTermoModal(false)}
                                    style={styles.modalCancelButton}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Vídeo */}
                {showVideoModal && selectedTermo && selectedTermo.videoExplicativo && (
                    <div style={styles.modalOverlay}>
                        <div style={{...styles.modal, maxWidth: "800px"}}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>Vídeo Explicativo</h3>
                                <button
                                    onClick={() => setShowVideoModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                <h4>{selectedTermo.titulo}</h4>
                                <div style={styles.videoContainer}>
                                    <iframe
                                        src={selectedTermo.videoExplicativo.replace("watch?v=", "embed/")}
                                        title="Vídeo explicativo"
                                        width="100%"
                                        height="400"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => setShowVideoModal(false)}
                                    style={styles.modalCancelButton}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Definições */}
                {showDefinicoesModal && selectedTermo && selectedTermo.definicoes && (
                    <div style={styles.modalOverlay}>
                        <div style={{...styles.modal, maxWidth: "600px"}}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>Definições do Termo</h3>
                                <button
                                    onClick={() => setShowDefinicoesModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                <h4>{selectedTermo.titulo}</h4>
                                <div style={styles.definicoesList}>
                                    {selectedTermo.definicoes.map((def, index) => (
                                        <div key={index} style={styles.definicaoItem}>
                                            <strong>{def.termo}:</strong>
                                            <p>{def.definicao}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => setShowDefinicoesModal(false)}
                                    style={styles.modalCancelButton}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de QR Code */}
                {showQRCodeModal && qrCodeImage && (
                    <div style={styles.modalOverlay}>
                        <div style={{...styles.modal, maxWidth: "400px"}}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>QR Code Gerado</h3>
                                <button
                                    onClick={() => setShowQRCodeModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={{...styles.modalBody, textAlign: "center"}}>
                                <img 
                                    src={qrCodeImage} 
                                    alt="QR Code do termo" 
                                    style={styles.qrCodeImage}
                                />
                                <p style={styles.qrCodeInfo}>
                                    QR Code gerado automaticamente para o termo aprovado.
                                </p>
                                <p style={styles.qrCodeInfo}>
                                    Status: <strong style={{color: "var(--success)"}}>Publicado</strong>
                                </p>
                            </div>
                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.download = `qrcode-termo-${selectedTermo?.id}.png`;
                                        link.href = qrCodeImage;
                                        link.click();
                                    }}
                                    style={{...styles.modalSubmitButton, background: "var(--primary)"}}
                                >
                                    <FaDownload /> Baixar QR Code
                                </button>
                                <button
                                    onClick={() => setShowQRCodeModal(false)}
                                    style={styles.modalCancelButton}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

// Estilos atualizados
const styles: Record<string, React.CSSProperties> = {
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        flexDirection: "column"
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
    sectionsContainer: {
        display: "flex",
        gap: "12px",
        marginBottom: "24px"
    },
    sectionButton: {
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid",
        fontSize: "14px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    searchSection: {
        display: "flex",
        gap: "16px",
        marginBottom: "24px",
        flexWrap: "wrap"
    },
    searchBox: {
        flex: 1,
        position: "relative",
        minWidth: "280px"
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
    filterGroup: {
        display: "flex",
        gap: "12px"
    },
    filterSelect: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        minWidth: "150px",
        cursor: "pointer"
    },
    listContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "24px"
    },
    card: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s"
    },
    cardHeader: {
        padding: "16px",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "12px"
    },
    cardTitleSection: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flex: 1
    },
    cardTitle: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    cardSubtitle: {
        margin: "4px 0 0",
        fontSize: "13px",
        color: "var(--text-tertiary)"
    },
    cardBadges: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
    },
    priorityBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600"
    },
    categoryBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        background: "var(--primary-soft)",
        color: "var(--primary)"
    },
    versionBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        background: "var(--bg-tertiary)",
        color: "var(--text-tertiary)"
    },
    cardBody: {
        padding: "16px"
    },
    cardInfo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "12px"
    },
    authorInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    authorAvatar: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "var(--primary-soft)",
        color: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "600"
    },
    authorName: {
        fontSize: "13px",
        fontWeight: "500",
        color: "var(--text-primary)",
        marginRight: "4px"
    },
    authorType: {
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    cardMeta: {
        display: "flex",
        gap: "16px",
        flexWrap: "wrap"
    },
    metaItem: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    commentsPreview: {
        background: "var(--bg-tertiary)",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "12px"
    },
    commentsHeader: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
        fontWeight: "600",
        color: "var(--text-secondary)",
        marginBottom: "8px"
    },
    commentItem: {
        fontSize: "13px",
        color: "var(--text-primary)"
    },
    commentAuthor: {
        fontWeight: "600",
        marginRight: "4px"
    },
    commentText: {
        color: "var(--text-secondary)"
    },
    cardActions: {
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end",
        flexWrap: "wrap"
    },
    actionButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    historicoCard: {
        display: "flex",
        gap: "16px",
        padding: "16px",
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)"
    },
    historicoIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        background: "var(--bg-tertiary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px"
    },
    historicoContent: {
        flex: 1
    },
    historicoHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "8px"
    },
    historicoTitle: {
        margin: 0,
        fontSize: "15px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    historicoMeta: {
        display: "flex",
        gap: "8px",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        marginTop: "4px"
    },
    historicoBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600"
    },
    historicoRevisor: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "13px",
        color: "var(--text-secondary)",
        marginBottom: "8px"
    },
    historicoJustificativa: {
        padding: "12px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        fontSize: "13px",
        color: "var(--text-secondary)",
        marginBottom: "12px"
    },
    historicoActions: {
        display: "flex",
        justifyContent: "flex-end"
    },
    historicoButton: {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer"
    },
    emptyState: {
        textAlign: "center",
        padding: "48px"
    },
    emptyTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "8px"
    },
    emptyText: {
        fontSize: "14px",
        color: "var(--text-tertiary)"
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
        maxWidth: "600px",
        maxHeight: "90vh",
        overflow: "auto"
    },
    modalHeader: {
        padding: "20px",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    modalTitle: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)"
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
    modalTermoInfo: {
        margin: "0 0 20px",
        lineHeight: "1.6"
    },
    modalActions: {
        display: "flex",
        gap: "12px",
        marginBottom: "20px"
    },
    modalActionButton: {
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid",
        background: "transparent",
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer"
    },
    modalComment: {
        marginBottom: "20px"
    },
    modalCommentLabel: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)",
        marginBottom: "8px"
    },
    modalTextarea: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        resize: "vertical"
    },
    modalComments: {
        borderTop: "1px solid var(--border-color)",
        paddingTop: "16px"
    },
    modalCommentsTitle: {
        margin: "0 0 12px",
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    modalCommentItem: {
        padding: "8px",
        background: "var(--bg-tertiary)",
        borderRadius: "6px",
        marginBottom: "8px",
        fontSize: "13px"
    },
    modalCommentAuthor: {
        fontWeight: "600",
        marginRight: "4px"
    },
    modalCommentText: {
        color: "var(--text-secondary)"
    },
    modalFooter: {
        padding: "20px",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px"
    },
    modalCancelButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        cursor: "pointer"
    },
    modalSubmitButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s"
    },
    videoContainer: {
        marginTop: "16px",
        borderRadius: "8px",
        overflow: "hidden"
    },
    definicoesList: {
        marginTop: "16px"
    },
    definicaoItem: {
        padding: "12px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        marginBottom: "8px"
    },
    termoConteudo: {
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        marginTop: "16px"
    },
    qrCodeImage: {
        maxWidth: "250px",
        width: "100%",
        height: "auto",
        margin: "20px auto",
        display: "block"
    },
    qrCodeInfo: {
        fontSize: "14px",
        color: "var(--text-secondary)",
        margin: "8px 0"
    }
};

// Adicionar keyframes para animações
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);