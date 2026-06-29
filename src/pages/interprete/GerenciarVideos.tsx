import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    FaVideo,
    FaUpload,
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
    FaUserTie,
    FaTag,
    FaPlay,
    FaPause,
    FaExpand,
    FaCompress,
    FaVolumeUp,
    FaVolumeMute,
    FaClosedCaptioning,
    FaSignLanguage,
    FaUserCheck,
    FaUserClock,
    FaSpinner,
    FaExclamationTriangle,
    FaInfoCircle,
    FaLink,
    FaCopy,
    FaShare,
    FaQrcode,
    FaCalendarAlt,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaFileAlt,
    FaArrowLeft
} from "react-icons/fa";

interface Video {
    id: string;
    titulo: string;
    descricao: string;
    termoAssociado: {
        id: string;
        termo: string;
        categoria: string;
    };
    interprete: {
        id: string;
        nome: string;
        email: string;
        instituicao: string;
    };
    url: string;
    thumbnail?: string;
    duracao: number;
    tamanho: number;
    formato: string;
    dataUpload: string;
    dataAprovacao?: string;
    status: "pendente" | "aprovado" | "recusado" | "em-analise";
    visualizacoes: number;
    curtidas: number;
    compartilhamentos: number;
    acessibilidade: {
        legendas: boolean;
        transcricao: boolean;
        descricaoAudio: boolean;
    };
    tags: string[];
    observacoes?: string;
}

interface FiltrosVideo {
    status: string;
    interprete: string;
    termo: string;
    dataInicio: string;
    dataFim: string;
}

export default function GerenciarVideos() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<Video[]>([]);
    const [activeTab, setActiveTab] = useState<"todos" | "pendente" | "aprovado" | "recusado" | "em-analise">("todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<FiltrosVideo>({
        status: "",
        interprete: "",
        termo: "",
        dataInicio: "",
        dataFim: ""
    });
    const [sortConfig, setSortConfig] = useState({
        key: "dataUpload",
        direction: "desc"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showAprovacaoModal, setShowAprovacaoModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [observacaoRejeicao, setObservacaoRejeicao] = useState("");
    const itemsPerPage = 10;

    const interpretes = [
        { id: "i1", nome: "João Silva" },
        { id: "i2", nome: "Maria Oliveira" },
        { id: "i3", nome: "Carlos Santos" },
        { id: "i4", nome: "Ana Pereira" }
    ];

    const termos = [
        { id: "t1", termo: "Algoritmo" },
        { id: "t2", termo: "Loop Infinito" },
        { id: "t3", termo: "Banco de Dados" },
        { id: "t4", termo: "Variável" },
        { id: "t5", termo: "Função Recursiva" }
    ];

    useEffect(() => {
        fetchVideos();
    }, [activeTab]);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockVideos: Video[] = [
                {
                    id: "2",
                    titulo: "Loop Infinito - Sinal em Libras",
                    descricao: "Representação do conceito de loop infinito na programação",
                    termoAssociado: {
                        id: "t2",
                        termo: "Loop Infinito",
                        categoria: "Estruturas de Controle"
                    },
                    interprete: {
                        id: "i2",
                        nome: "Maria Oliveira",
                        email: "maria.oliveira@ufpa.br",
                        instituicao: "UFPA"
                    },
                    url: "/videos/loop-infinito.mp4",
                    thumbnail: "/thumbnails/loop.jpg",
                    duracao: 98,
                    tamanho: 10.5 * 1024 * 1024,
                    formato: "mp4",
                    dataUpload: "2024-03-03T15:45:00",
                    status: "pendente",
                    visualizacoes: 0,
                    curtidas: 0,
                    compartilhamentos: 0,
                    acessibilidade: {
                        legendas: true,
                        transcricao: false,
                        descricaoAudio: false
                    },
                    tags: ["loop", "repetição", "infinito"]
                },
                {
                    id: "3",
                    titulo: "Banco de Dados em Libras",
                    descricao: "Sinal e explicação sobre banco de dados e SQL",
                    termoAssociado: {
                        id: "t3",
                        termo: "Banco de Dados",
                        categoria: "Banco de Dados"
                    },
                    interprete: {
                        id: "i3",
                        nome: "Carlos Santos",
                        email: "carlos.santos@uepa.br",
                        instituicao: "UEPA"
                    },
                    url: "/videos/banco-dados.mp4",
                    thumbnail: "/thumbnails/bd.jpg",
                    duracao: 156,
                    tamanho: 18.7 * 1024 * 1024,
                    formato: "mp4",
                    dataUpload: "2024-03-02T09:15:00",
                    status: "em-analise",
                    visualizacoes: 45,
                    curtidas: 8,
                    compartilhamentos: 2,
                    acessibilidade: {
                        legendas: true,
                        transcricao: true,
                        descricaoAudio: true
                    },
                    tags: ["banco de dados", "sql", "dados"]
                },
                {
                    id: "4",
                    titulo: "Variável em Programação",
                    descricao: "Sinal para variável e tipos de dados",
                    termoAssociado: {
                        id: "t4",
                        termo: "Variável",
                        categoria: "Conceitos Básicos"
                    },
                    interprete: {
                        id: "i4",
                        nome: "Ana Pereira",
                        email: "ana.pereira@ifpa.edu.br",
                        instituicao: "IFPA - Campus Tucuruí"
                    },
                    url: "/videos/variavel.mp4",
                    thumbnail: "/thumbnails/variavel.jpg",
                    duracao: 87,
                    tamanho: 9.8 * 1024 * 1024,
                    formato: "mp4",
                    dataUpload: "2024-02-28T11:20:00",
                    dataAprovacao: "2024-03-01T16:30:00",
                    status: "aprovado",
                    visualizacoes: 156,
                    curtidas: 23,
                    compartilhamentos: 5,
                    acessibilidade: {
                        legendas: true,
                        transcricao: true,
                        descricaoAudio: true
                    },
                    tags: ["variável", "tipo de dado", "constante"]
                },
                {
                    id: "5",
                    titulo: "Função Recursiva em Libras",
                    descricao: "Explicação do conceito de recursividade",
                    termoAssociado: {
                        id: "t5",
                        termo: "Função Recursiva",
                        categoria: "Funções"
                    },
                    interprete: {
                        id: "i1",
                        nome: "João Silva",
                        email: "joao.silva@ifpa.edu.br",
                        instituicao: "IFPA - Campus Belém"
                    },
                    url: "/videos/recursiva.mp4",
                    thumbnail: "/thumbnails/recursiva.jpg",
                    duracao: 134,
                    tamanho: 14.3 * 1024 * 1024,
                    formato: "mp4",
                    dataUpload: "2024-02-29T14:10:00",
                    status: "recusado",
                    observacoes: "O sinal não representa adequadamente o conceito de recursividade. Sugere-se revisar o movimento circular.",
                    visualizacoes: 67,
                    curtidas: 5,
                    compartilhamentos: 1,
                    acessibilidade: {
                        legendas: true,
                        transcricao: false,
                        descricaoAudio: false
                    },
                    tags: ["recursividade", "função", "pilha"]
                }
            ];

            const filteredByStatus = activeTab === "todos"
                ? mockVideos
                : mockVideos.filter(v => v.status === activeTab);

            setVideos(filteredByStatus);
        } catch (error) {
            console.error("Erro ao buscar vídeos:", error);
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

    const filteredVideos = videos
        .filter(video => {
            const matchesSearch = video.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                video.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                video.termoAssociado.termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                video.interprete.nome.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = !filters.status || video.status === filters.status;
            const matchesInterprete = !filters.interprete || video.interprete.id === filters.interprete;
            const matchesTermo = !filters.termo || video.termoAssociado.id === filters.termo;

            return matchesSearch && matchesStatus && matchesInterprete && matchesTermo;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Video];
            const bValue = b[sortConfig.key as keyof Video];

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

    const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
    const paginatedVideos = filteredVideos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusBadge = (status: string) => {
        const styles = {
            aprovado: {
                bg: "var(--success-light)",
                color: "var(--success)",
                icon: <FaCheckCircle />,
                label: "Aprovado"
            },
            pendente: {
                bg: "var(--warning-light)",
                color: "var(--warning)",
                icon: <FaClock />,
                label: "Pendente"
            },
            recusado: {
                bg: "var(--danger-light)",
                color: "var(--danger)",
                icon: <FaTimesCircle />,
                label: "Recusado"
            },
            "em-analise": {
                bg: "var(--info-light)",
                color: "var(--info)",
                icon: <FaUserClock />,
                label: "Em Análise"
            }
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

    const formatDuracao = (segundos: number) => {
        const mins = Math.floor(segundos / 60);
        const secs = segundos % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    // const handleUpload = () => {
    //     setIsUploading(true);
    //     setUploadProgress(0);
    //     const interval = setInterval(() => {
    //         setUploadProgress(prev => {
    //             if (prev >= 100) {
    //                 clearInterval(interval);
    //                 setIsUploading(false);
    //                 return 100;
    //             }
    //             return prev + 10;
    //         });
    //     }, 300);
    // };

    const handleAprovarVideo = (video: Video) => {
        setSelectedVideo(video);
        setShowAprovacaoModal(true);
    };

    const confirmarAprovacao = (aprovado: boolean) => {
        if (!selectedVideo) return;

        if (aprovado) {
            console.log("Vídeo aprovado:", selectedVideo.id);
        } else {
            if (!observacaoRejeicao.trim()) {
                alert("É necessário fornecer uma justificativa para rejeição");
                return;
            }
            console.log("Vídeo rejeitado:", selectedVideo.id, "Motivo:", observacaoRejeicao);
        }

        setShowAprovacaoModal(false);
        setSelectedVideo(null);
        setObservacaoRejeicao("");
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p style={{ color: "var(--text-tertiary)" }}>Carregando vídeos...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <button
                        onClick={() => navigate('/termos')}
                        style={styles.backButton}
                        title="Voltar para lista de cursos"
                    >
                        <FaArrowLeft /> Voltar
                    </button>
                    <div>
                        <h1 style={styles.title}>
                            <FaVideo /> Vídeos em Libras
                        </h1>
                        <p style={styles.subtitle}>
                            Gerencie os vídeos associados aos termos técnicos e controle o fluxo de aprovação
                        </p>
                    </div>

                    {/* <div style={styles.headerActions}>
                        <button
                            onClick={() => navigate("/videos/novo")}
                            style={styles.primaryButton}
                        >
                            <FaPlus /> Novo Vídeo
                        </button>
                        <button
                            onClick={handleUpload}
                            style={styles.uploadButton}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <FaSpinner style={styles.buttonSpinner} />
                                    Uploading... {uploadProgress}%
                                </>
                            ) : (
                                <>
                                    <FaUpload /> Upload de Vídeo
                                </>
                            )}
                        </button>
                    </div> */}
                </div>

                {isUploading && (
                    <div style={styles.progressContainer}>
                        <div style={styles.progressBar}>
                            <div style={{
                                ...styles.progressFill,
                                width: `${uploadProgress}%`
                            }} />
                        </div>
                        <span>{uploadProgress}% concluído</span>
                    </div>
                )}

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
                        Todos ({videos.length})
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
                        Pendentes ({videos.filter(v => v.status === "pendente").length})
                    </button>
                    <button
                        onClick={() => setActiveTab("em-analise")}
                        style={{
                            ...styles.tab,
                            background: activeTab === "em-analise" ? "var(--info)" : "transparent",
                            color: activeTab === "em-analise" ? "#fff" : "var(--text-secondary)",
                            borderColor: activeTab === "em-analise" ? "var(--info)" : "var(--border-color)"
                        }}
                    >
                        Em Análise ({videos.filter(v => v.status === "em-analise").length})
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
                        Aprovados ({videos.filter(v => v.status === "aprovado").length})
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
                        Recusados ({videos.filter(v => v.status === "recusado").length})
                    </button>
                </div>

                {/* Busca e Filtros */}
                <div style={styles.searchSection}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por título, termo ou intérprete..."
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
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todos os status</option>
                            <option value="pendente">Pendente</option>
                            <option value="em-analise">Em Análise</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="recusado">Recusado</option>
                        </select>

                        <select
                            value={filters.interprete}
                            onChange={(e) => setFilters({ ...filters, interprete: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todos os intérpretes</option>
                            {interpretes.map(i => (
                                <option key={i.id} value={i.id}>{i.nome}</option>
                            ))}
                        </select>

                        <select
                            value={filters.termo}
                            onChange={(e) => setFilters({ ...filters, termo: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todos os termos</option>
                            {termos.map(t => (
                                <option key={t.id} value={t.id}>{t.termo}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => setFilters({ status: "", interprete: "", termo: "", dataInicio: "", dataFim: "" })}
                            style={styles.clearFilters}
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}

                {/* Grid de Vídeos */}
                <div style={styles.videosGrid}>
                    {paginatedVideos.map((video) => (
                        <div key={video.id} style={styles.videoCard}>
                            <div style={styles.videoThumbnail}>
                                {video.thumbnail ? (
                                    <img
                                        src={video.thumbnail}
                                        alt={video.titulo}
                                        style={styles.thumbnailImage}
                                    />
                                ) : (
                                    <div style={styles.thumbnailPlaceholder}>
                                        <FaVideo size={32} />
                                    </div>
                                )}
                                <span style={styles.videoDuration}>
                                    {formatDuracao(video.duracao)}
                                </span>
                                {getStatusBadge(video.status)}
                            </div>

                            <div style={styles.videoInfo}>
                                <h3 style={styles.videoTitle}>{video.titulo}</h3>
                                <p style={styles.videoDesc}>{video.descricao.substring(0, 80)}...</p>

                                <div style={styles.videoMeta}>
                                    <div style={styles.metaItem}>
                                        <FaTag />
                                        <span>{video.termoAssociado.termo}</span>
                                    </div>
                                    <div style={styles.metaItem}>
                                        <FaUserTie />
                                        <span>{video.interprete.nome}</span>
                                    </div>
                                    <div style={styles.metaItem}>
                                        <FaCalendarAlt />
                                        <span>{new Date(video.dataUpload).toLocaleDateString()}</span>
                                    </div>
                                    <div style={styles.metaItem}>
                                        <FaEye />
                                        <span>{video.visualizacoes}</span>
                                    </div>
                                </div>

                                <div style={styles.acessibilidadeTags}>
                                    {video.acessibilidade.legendas && (
                                        <span style={styles.acessibilidadeTag} title="Legendas disponíveis">
                                            <FaClosedCaptioning />
                                        </span>
                                    )}
                                    {video.acessibilidade.transcricao && (
                                        <span style={styles.acessibilidadeTag} title="Transcrição disponível">
                                            <FaFileAlt />
                                        </span>
                                    )}
                                    {video.acessibilidade.descricaoAudio && (
                                        <span style={styles.acessibilidadeTag} title="Descrição em áudio">
                                            <FaVolumeUp />
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div style={styles.videoFooter}>
                                <div style={styles.videoActions}>
                                    <button
                                        onClick={() => {
                                            setSelectedVideo(video);
                                            setShowVideoModal(true);
                                        }}
                                        style={styles.actionButton}
                                        title="Visualizar vídeo"
                                    >
                                        <FaPlay />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/videos/${video.id}/editar`)}
                                        style={styles.actionButton}
                                        title="Editar"
                                    >
                                        <FaEdit />
                                    </button>
                                    {video.status !== "aprovado" && video.status !== "recusado" && (
                                        <button
                                            onClick={() => handleAprovarVideo(video)}
                                            style={styles.actionButton}
                                            title="Aprovar/Recusar"
                                        >
                                            <FaCheckCircle />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate(`/qrcodes/gerar?video=${video.id}`)}
                                        style={styles.actionButton}
                                        title="Gerar QR Code"
                                    >
                                        <FaQrcode />
                                    </button>
                                </div>
                            </div>

                            {video.observacoes && video.status === "recusado" && (
                                <div style={styles.observacoes}>
                                    <FaExclamationTriangle color="var(--danger)" />
                                    <span>{video.observacoes}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {paginatedVideos.length === 0 && (
                    <div style={styles.emptyState}>
                        <FaVideo size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
                        <h3 style={styles.emptyTitle}>Nenhum vídeo encontrado</h3>
                        <p style={styles.emptyText}>
                            {searchTerm || filters.status || filters.interprete || filters.termo
                                ? "Tente ajustar seus filtros."
                                : "Comece fazendo upload do primeiro vídeo."}
                        </p>
                    </div>
                )}

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

                {/* Modal de Visualização de Vídeo */}
                {showVideoModal && selectedVideo && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "800px" }}>
                            <div style={styles.modalHeader}>
                                <h3>{selectedVideo.titulo}</h3>
                                <button
                                    onClick={() => setShowVideoModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                <video controls style={styles.videoPlayer}>
                                    <source src={selectedVideo.url} type="video/mp4" />
                                </video>

                                <div style={styles.videoDetails}>
                                    <h4>Informações do Vídeo</h4>
                                    <div style={styles.detailsGrid}>
                                        <div><strong>Termo:</strong> {selectedVideo.termoAssociado.termo}</div>
                                        <div><strong>Categoria:</strong> {selectedVideo.termoAssociado.categoria}</div>
                                        <div><strong>Intérprete:</strong> {selectedVideo.interprete.nome}</div>
                                        <div><strong>Instituição:</strong> {selectedVideo.interprete.instituicao}</div>
                                        <div><strong>Duração:</strong> {formatDuracao(selectedVideo.duracao)}</div>
                                        <div><strong>Tamanho:</strong> {formatFileSize(selectedVideo.tamanho)}</div>
                                        <div><strong>Formato:</strong> {selectedVideo.formato}</div>
                                        <div><strong>Data Upload:</strong> {new Date(selectedVideo.dataUpload).toLocaleString()}</div>
                                    </div>

                                    <div style={styles.acessibilidadeInfo}>
                                        <h4>Recursos de Acessibilidade</h4>
                                        <div style={styles.acessibilidadeList}>
                                            <span style={selectedVideo.acessibilidade.legendas ? styles.disponivel : styles.indisponivel}>
                                                <FaClosedCaptioning /> Legendas
                                            </span>
                                            <span style={selectedVideo.acessibilidade.transcricao ? styles.disponivel : styles.indisponivel}>
                                                <FaFileAlt /> Transcrição
                                            </span>
                                            <span style={selectedVideo.acessibilidade.descricaoAudio ? styles.disponivel : styles.indisponivel}>
                                                <FaVolumeUp /> Descrição em Áudio
                                            </span>
                                        </div>
                                    </div>

                                    <div style={styles.tagsList}>
                                        {selectedVideo.tags.map(tag => (
                                            <span key={tag} style={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Aprovação/Rejeição */}
                {showAprovacaoModal && selectedVideo && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "500px" }}>
                            <div style={styles.modalHeader}>
                                <h3>Aprovar/Rejeitar Vídeo</h3>
                                <button
                                    onClick={() => setShowAprovacaoModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={styles.modalBody}>
                                <p><strong>Vídeo:</strong> {selectedVideo.titulo}</p>
                                <p><strong>Termo:</strong> {selectedVideo.termoAssociado.termo}</p>
                                <p><strong>Intérprete:</strong> {selectedVideo.interprete.nome}</p>

                                <div style={styles.aprovacaoActions}>
                                    <button
                                        onClick={() => confirmarAprovacao(true)}
                                        style={styles.aprovarButton}
                                    >
                                        <FaCheckCircle /> Aprovar Vídeo
                                    </button>
                                    <button
                                        onClick={() => confirmarAprovacao(false)}
                                        style={styles.rejeitarButton}
                                    >
                                        <FaTimesCircle /> Rejeitar Vídeo
                                    </button>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Justificativa (obrigatória para rejeição)</label>
                                    <textarea
                                        value={observacaoRejeicao}
                                        onChange={(e) => setObservacaoRejeicao(e.target.value)}
                                        rows={4}
                                        style={styles.textarea}
                                        placeholder="Descreva o motivo da rejeição ou observações para melhoria..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
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
        margin: "0 auto 16px"
    },
    buttonSpinner: {
        animation: "spin 1s linear infinite"
    },
    container: {
        animation: "fadeIn 0.5s ease-out"
    },
    header: {
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px"
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
    headerActions: {
        display: "flex",
        gap: "12px"
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
    uploadButton: {
        padding: "10px 20px",
        background: "var(--success)",
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
    progressContainer: {
        marginBottom: "20px",
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px"
    },
    progressBar: {
        width: "100%",
        height: "8px",
        background: "var(--border-color)",
        borderRadius: "4px",
        overflow: "hidden",
        marginBottom: "8px"
    },
    progressFill: {
        height: "100%",
        background: "var(--success)",
        transition: "width 0.3s ease"
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
        border: "1px solid",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s"
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
    filterToggle: {
        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    filtersPanel: {
        display: "flex",
        gap: "12px",
        marginBottom: "20px",
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        flexWrap: "wrap"
    },
    filterSelect: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px",
        minWidth: "150px"
    },
    clearFilters: {
        padding: "10px 16px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        cursor: "pointer"
    },
    videosGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        marginBottom: "24px"
    },
    videoCard: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s"
    },
    videoThumbnail: {
        position: "relative",
        height: "160px",
        background: "var(--bg-tertiary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    thumbnailPlaceholder: {
        color: "var(--text-tertiary)"
    },
    videoDuration: {
        position: "absolute",
        bottom: "8px",
        right: "8px",
        padding: "2px 6px",
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        borderRadius: "4px",
        fontSize: "11px"
    },
    videoInfo: {
        padding: "16px"
    },
    videoTitle: {
        margin: "0 0 8px",
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    videoDesc: {
        margin: "0 0 12px",
        fontSize: "13px",
        color: "var(--text-tertiary)",
        lineHeight: "1.5"
    },
    videoMeta: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "8px",
        marginBottom: "12px"
    },
    metaItem: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
        color: "var(--text-secondary)"
    },
    acessibilidadeTags: {
        display: "flex",
        gap: "8px",
        marginBottom: "12px"
    },
    acessibilidadeTag: {
        width: "28px",
        height: "28px",
        borderRadius: "14px",
        background: "var(--bg-tertiary)",
        color: "var(--success)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px"
    },
    videoFooter: {
        padding: "12px 16px",
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-tertiary)"
    },
    videoActions: {
        display: "flex",
        gap: "8px",
        justifyContent: "center"
    },
    actionButton: {
        // width: "36px",
        // height: "36px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
    },
    observacoes: {
        padding: "12px 16px",
        background: "var(--danger-light)",
        borderTop: "1px solid var(--danger)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "var(--danger)"
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
    videoPlayer: {
        width: "100%",
        maxHeight: "400px",
        borderRadius: "8px",
        marginBottom: "20px"
    },
    videoDetails: {
        marginBottom: "20px"
    },
    detailsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        marginBottom: "20px"
    },
    acessibilidadeInfo: {
        marginBottom: "20px"
    },
    acessibilidadeList: {
        display: "flex",
        gap: "16px",
        marginTop: "8px"
    },
    disponivel: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        color: "var(--success)",
        fontSize: "13px"
    },
    indisponivel: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        color: "var(--text-tertiary)",
        fontSize: "13px",
        opacity: 0.5
    },
    tagsList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
    },
    tag: {
        padding: "4px 8px",
        borderRadius: "4px",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)",
        fontSize: "11px"
    },
    aprovacaoActions: {
        display: "flex",
        gap: "12px",
        marginBottom: "20px"
    },
    aprovarButton: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        background: "var(--success)",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer"
    },
    rejeitarButton: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        background: "var(--danger)",
        color: "#fff",
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
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        resize: "vertical"
    }
};

// Adicionar keyframes para animações
const globalStyles = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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

    .video-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }

    .action-button:hover {
        background: var(--primary-soft);
        color: var(--primary);
        border-color: var(--primary);
    }
`;

const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);