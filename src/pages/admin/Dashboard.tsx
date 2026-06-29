import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../layouts/DashboardLayout";
import { useTheme } from "../../components/contexts/ThemeContext";
import {
    FaUsers,
    FaFileAlt,
    FaClock,
    FaCheckCircle,
    FaVideo,
    FaChartPie,
    FaArrowUp,
    FaArrowDown,
    FaEye,
    FaQrcode,
    FaExclamationTriangle,
    FaCalendarAlt,
    FaDownload,
    FaShare,
    FaHeart,
    FaTrash,
    FaEdit,
    FaPlus,
    FaMapMarkerAlt,
    FaMobile,
    FaTablet,
    FaLaptop,
    FaGlobe,
    FaChartLine,
    FaStar,
    FaUserCheck,
    FaUserClock,
    FaUserTimes,
    FaBell,
    FaSearch,
    FaFilter,
    FaChevronLeft,
    FaChevronRight,
    FaInfoCircle,
    FaTimesCircle,
    FaRegClock,
    FaGraduationCap,
    FaCloudUploadAlt,
    FaChrome,
    FaBookOpen
} from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";

interface DashboardStats {
    // Métricas principais
    totalUsuarios: number;
    totalTermos: number;
    termosEmAnalise: number;
    termosPublicados: number;
    totalVideos: number;

    // Métricas de QR Code
    totalQRCodes: number;
    totalScans: number;
    favoritesCount: number;
    scansToday: number;
    scansWeek: number;
    scansMonth: number;
    scansGrowth: number;

    // Estatísticas de dispositivos
    scansPorDispositivo: {
        mobile: number;
        desktop: number;
        tablet: number;
    };

    // Relatório por categoria
    categorias: {
        nome: string;
        totalTermos: number;
        totalVideos: number;
        porcentagem: number;
        cor: string;
    }[];
}

interface TermoRecente {
    id: string;
    titulo: string;
    tipo: "termo" | "video" | "artigo";
    status: "analise" | "publicado" | "recusado";
    autor: string;
    dataCriacao: string;
    categoria: string;
    visualizacoes?: number;
}

interface AtividadeRecente {
    id: string;
    tipo: "novo_termo" | "aprovacao" | "recusa" | "novo_video" | "scan" | "novo_artigo" | "conclusao" | "upload";
    descricao: string;
    usuario: string;
    data: string;
    icone: React.ReactNode;
    cor: string;
}

interface ScanRecente {
    id: string;
    qrCode: string;
    localizacao: string;
    dispositivo: string;
    navegador: string;
    data: string;
    hora: string;
    termoId: string;
    termoTitulo: string;
}

// Função auxiliar para determinar o dispositivo mais usado (movida para antes do componente)
const getMostUsedDevice = (scansPorDispositivo: { mobile: number; desktop: number; tablet: number }) => {
    if (!scansPorDispositivo) return 'N/A';

    const devices = [
        { name: 'Mobile', count: scansPorDispositivo.mobile || 0 },
        { name: 'Desktop', count: scansPorDispositivo.desktop || 0 },
        { name: 'Tablet', count: scansPorDispositivo.tablet || 0 }
    ];

    const mostUsed = devices.reduce((max, device) =>
        device.count > max.count ? device : max
    );

    return mostUsed.count > 0 ? mostUsed.name : 'N/A';
};

export default function DashboardPage() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats>({
        totalUsuarios: 0,
        totalTermos: 0,
        termosEmAnalise: 0,
        termosPublicados: 0,
        totalVideos: 0,
        totalQRCodes: 0,
        totalScans: 0,
        favoritesCount: 0,
        scansToday: 0,
        scansWeek: 0,
        scansMonth: 0,
        scansGrowth: 0,
        scansPorDispositivo: {
            mobile: 0,
            desktop: 0,
            tablet: 0
        },
        categorias: []
    });

    const [termosRecentes, setTermosRecentes] = useState<TermoRecente[]>([]);
    const [atividadesRecentes, setAtividadesRecentes] = useState<AtividadeRecente[]>([]);
    const [scansRecentes, setScansRecentes] = useState<ScanRecente[]>([]);
    const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedScan, setSelectedScan] = useState<ScanRecente | null>(null);
    const [showScanModal, setShowScanModal] = useState(false);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchDashboardData();
    }, [timeRange]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Dados mockados
            setStats({
                // Métricas principais
                totalUsuarios: 245,
                totalTermos: 189,
                termosEmAnalise: 23,
                termosPublicados: 142,
                totalVideos: 67,

                // Métricas de QR Code
                totalQRCodes: 156,
                totalScans: 12453,
                favoritesCount: 342,
                scansToday: 127,
                scansWeek: 892,
                scansMonth: 3456,
                scansGrowth: 12.5,

                // Estatísticas de dispositivos
                scansPorDispositivo: {
                    mobile: 8452,
                    desktop: 2989,
                    tablet: 1012
                },

                // Relatório por categoria
                categorias: [
                    {
                        nome: "Conceitos Básicos",
                        totalTermos: 52,
                        totalVideos: 24,
                        porcentagem: 22,
                        cor: "#2563eb"
                    },
                    {
                        nome: "Estruturas de Controle",
                        totalTermos: 45,
                        totalVideos: 20,
                        porcentagem: 19,
                        cor: "#10b981"
                    },
                    {
                        nome: "Estruturas de Dados",
                        totalTermos: 38,
                        totalVideos: 18,
                        porcentagem: 16,
                        cor: "#8b5cf6"
                    },
                    {
                        nome: "POO",
                        totalTermos: 35,
                        totalVideos: 16,
                        porcentagem: 15,
                        cor: "#f59e0b"
                    },
                    {
                        nome: "Algoritmos",
                        totalTermos: 32,
                        totalVideos: 14,
                        porcentagem: 14,
                        cor: "#ec4899"
                    },
                    {
                        nome: "Banco de Dados",
                        totalTermos: 28,
                        totalVideos: 12,
                        porcentagem: 12,
                        cor: "#6b7280"
                    },
                    {
                        nome: "Funções",
                        totalTermos: 24,
                        totalVideos: 10,
                        porcentagem: 10,
                        cor: "#14b8a6"
                    }
                ]
            });

            setTermosRecentes([
                {
                    id: "1",
                    titulo: "Algoritmo de Ordenação Quick Sort",
                    tipo: "video",
                    status: "analise",
                    autor: "João Silva",
                    dataCriacao: "2024-02-20",
                    categoria: "Algoritmos",
                    visualizacoes: 0
                },
                {
                    id: "2",
                    titulo: "Estruturas Condicionais em Python",
                    tipo: "video",
                    status: "publicado",
                    autor: "Maria Oliveira",
                    dataCriacao: "2024-02-19",
                    categoria: "Estruturas de Controle",
                    visualizacoes: 1234
                },
                {
                    id: "3",
                    titulo: "Introdução a Variáveis e Tipos",
                    tipo: "artigo",
                    status: "publicado",
                    autor: "Admin Sistema",
                    dataCriacao: "2024-02-18",
                    categoria: "Conceitos Básicos",
                    visualizacoes: 567
                },
                {
                    id: "4",
                    titulo: "Manipulação de Arrays em JavaScript",
                    tipo: "video",
                    status: "analise",
                    autor: "Pedro Costa",
                    dataCriacao: "2024-02-17",
                    categoria: "Estruturas de Dados",
                    visualizacoes: 0
                },
                {
                    id: "5",
                    titulo: "Classes e Objetos em Java",
                    tipo: "artigo",
                    status: "recusado",
                    autor: "Ana Santos",
                    dataCriacao: "2024-02-16",
                    categoria: "POO",
                    visualizacoes: 0
                },
                {
                    id: "6",
                    titulo: "Consultas SQL com JOIN",
                    tipo: "video",
                    status: "publicado",
                    autor: "Carlos Lima",
                    dataCriacao: "2024-02-15",
                    categoria: "Banco de Dados",
                    visualizacoes: 892
                },
                {
                    id: "7",
                    titulo: "Funções Recursivas",
                    tipo: "artigo",
                    status: "publicado",
                    autor: "Fernanda Souza",
                    dataCriacao: "2024-02-14",
                    categoria: "Funções",
                    visualizacoes: 445
                }
            ]);

            setAtividadesRecentes([
                {
                    id: "1",
                    tipo: "novo_video",
                    descricao: "Novo vídeo sobre Quick Sort enviado para análise",
                    usuario: "João Silva",
                    data: "há 10 minutos",
                    icone: <FaVideo />,
                    cor: "var(--info)"
                },
                {
                    id: "2",
                    tipo: "aprovacao",
                    descricao: "Artigo sobre Variáveis aprovado e publicado",
                    usuario: "Maria Oliveira",
                    data: "há 25 minutos",
                    icone: <FaCheckCircle />,
                    cor: "var(--success)"
                },
                {
                    id: "3",
                    tipo: "scan",
                    descricao: "QR Code do curso de Python escaneado - São Paulo",
                    usuario: "Usuário anônimo",
                    data: "há 32 minutos",
                    icone: <FaEye />,
                    cor: "var(--warning)"
                },
                {
                    id: "4",
                    tipo: "novo_artigo",
                    descricao: "Novo artigo sobre POO adicionado",
                    usuario: "Pedro Costa",
                    data: "há 1 hora",
                    icone: <FaFileAlt />,
                    cor: "var(--primary)"
                },
                {
                    id: "5",
                    tipo: "recusa",
                    descricao: "Tutorial de Classes em Java recusado - justificativa enviada",
                    usuario: "Ana Santos",
                    data: "há 2 horas",
                    icone: <FaExclamationTriangle />,
                    cor: "var(--danger)"
                },
                {
                    id: "6",
                    tipo: "scan",
                    descricao: "QR Code do material de Banco de Dados - Rio de Janeiro",
                    usuario: "Usuário anônimo",
                    data: "há 3 horas",
                    icone: <FaEye />,
                    cor: "var(--warning)"
                },
                {
                    id: "7",
                    tipo: "conclusao",
                    descricao: "Módulo de Estruturas de Dados concluído por 15 alunos",
                    usuario: "Sistema",
                    data: "há 5 horas",
                    icone: <FaGraduationCap />,
                    cor: "var(--success)"
                },
                {
                    id: "8",
                    tipo: "upload",
                    descricao: "Novo material sobre SQL adicionado à biblioteca",
                    usuario: "Carlos Lima",
                    data: "há 6 horas",
                    icone: <FaCloudUploadAlt />,
                    cor: "var(--info)"
                }
            ]);

            setScansRecentes([
                {
                    id: "1",
                    qrCode: "Curso de Python - Módulo 1",
                    localizacao: "São Paulo, SP",
                    dispositivo: "Mobile",
                    navegador: "Chrome",
                    data: "2024-02-20",
                    hora: "14:32",
                    termoId: "curso1",
                    termoTitulo: "Introdução ao Python"
                },
                {
                    id: "2",
                    qrCode: "Algoritmos de Ordenação",
                    localizacao: "Rio de Janeiro, RJ",
                    dispositivo: "Desktop",
                    navegador: "Firefox",
                    data: "2024-02-20",
                    hora: "13:45",
                    termoId: "algo1",
                    termoTitulo: "Quick Sort e Merge Sort"
                },
                {
                    id: "3",
                    qrCode: "JavaScript para Iniciantes",
                    localizacao: "Belo Horizonte, MG",
                    dispositivo: "Mobile",
                    navegador: "Safari",
                    data: "2024-02-20",
                    hora: "11:20",
                    termoId: "js1",
                    termoTitulo: "Manipulação de Arrays em JS"
                },
                {
                    id: "4",
                    qrCode: "Banco de Dados SQL",
                    localizacao: "Curitiba, PR",
                    dispositivo: "Tablet",
                    navegador: "Chrome",
                    data: "2024-02-20",
                    hora: "10:05",
                    termoId: "sql1",
                    termoTitulo: "Consultas SQL Avançadas"
                },
                {
                    id: "5",
                    qrCode: "POO em Java",
                    localizacao: "Salvador, BA",
                    dispositivo: "Mobile",
                    navegador: "Instagram",
                    data: "2024-02-20",
                    hora: "09:30",
                    termoId: "java1",
                    termoTitulo: "Classes e Herança em Java"
                },
                {
                    id: "6",
                    qrCode: "Estruturas de Dados",
                    localizacao: "Brasília, DF",
                    dispositivo: "Desktop",
                    navegador: "Edge",
                    data: "2024-02-19",
                    hora: "22:15",
                    termoId: "ed1",
                    termoTitulo: "Listas Encadeadas"
                },
                {
                    id: "7",
                    qrCode: "Lógica de Programação",
                    localizacao: "Fortaleza, CE",
                    dispositivo: "Mobile",
                    navegador: "Chrome",
                    data: "2024-02-19",
                    hora: "20:40",
                    termoId: "logica1",
                    termoTitulo: "Estruturas Condicionais"
                },
                {
                    id: "8",
                    qrCode: "Funções em JavaScript",
                    localizacao: "Manaus, AM",
                    dispositivo: "Mobile",
                    navegador: "Samsung Internet",
                    data: "2024-02-19",
                    hora: "18:15",
                    termoId: "func1",
                    termoTitulo: "Arrow Functions e Callbacks"
                },
                {
                    id: "9",
                    qrCode: "TypeScript Fundamentos",
                    localizacao: "Recife, PE",
                    dispositivo: "Desktop",
                    navegador: "Chrome",
                    data: "2024-02-19",
                    hora: "16:30",
                    termoId: "ts1",
                    termoTitulo: "Tipagem Estática"
                },
                {
                    id: "10",
                    qrCode: "React Hooks",
                    localizacao: "Porto Alegre, RS",
                    dispositivo: "Mobile",
                    navegador: "Firefox",
                    data: "2024-02-19",
                    hora: "14:50",
                    termoId: "react1",
                    termoTitulo: "useState e useEffect"
                }
            ]);

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            analise: { bg: "var(--warning-light)", color: "var(--warning)", text: "Em análise", icon: <FaClock /> },
            publicado: { bg: "var(--success-light)", color: "var(--success)", text: "Publicado", icon: <FaCheckCircle /> },
            recusado: { bg: "var(--danger-light)", color: "var(--danger)", text: "Recusado", icon: <FaTimesCircle /> }
        };
        const style = styles[status as keyof typeof styles];

        return (
            <span style={{
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: "600",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: style.bg,
                color: style.color
            }}>
                {style.icon} {style.text}
            </span>
        );
    };

    const getDispositivoIcon = (dispositivo: string) => {
        switch (dispositivo.toLowerCase()) {
            case "mobile": return <FaMobile />;
            case "tablet": return <FaTablet />;
            default: return <FaLaptop />;
        }
    };

    const filteredScans = scansRecentes
        .filter(scan =>
            scan.qrCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scan.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scan.termoTitulo.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dataA = new Date(`${a.data} ${a.hora}`).getTime();
            const dataB = new Date(`${b.data} ${b.hora}`).getTime();
            return dataB - dataA;
        });

    const totalPages = Math.ceil(filteredScans.length / itemsPerPage);
    const paginatedScans = filteredScans.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p style={{ color: "var(--text-tertiary)" }}>
                    Carregando dashboard...
                </p>
            </div>
        );
    }

    return (
        <>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>Dashboard Administrativo</h1>
                        <p style={styles.subtitle}>
                            Bem-vindo de volta! Aqui está o resumo da sua plataforma LibrasQR
                        </p>
                    </div>

                    {/* Seletor de período */}
                    <div style={styles.timeRangeSelector}>
                        {["week", "month", "year"].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range as any)}
                                style={{
                                    ...styles.timeRangeButton,
                                    background: timeRange === range ? "var(--primary)" : "transparent",
                                    color: timeRange === range ? "#fff" : "var(--text-secondary)",
                                    borderColor: timeRange === range ? "var(--primary)" : "var(--border-color)"
                                }}
                            >
                                {range === "week" ? "Semana" : range === "month" ? "Mês" : "Ano"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards de Métricas Principais */}
                <div style={styles.statsGrid}>
                    <StatCard
                        icon={<FaUsers size={24} />}
                        label="Total de Usuários"
                        value={formatNumber(stats.totalUsuarios)}
                        change="+8%"
                        changeType="positive"
                        color="var(--primary)"
                        bgColor="var(--primary-soft)"
                    />
                    <StatCard
                        icon={<FaFileAlt size={24} />}
                        label="Total de Termos no Glossário"
                        value={formatNumber(stats.totalTermos)}
                        change="+12%"
                        changeType="positive"
                        color="var(--success)"
                        bgColor="var(--success-light)"
                    />
                    <StatCard
                        icon={<FaClock size={24} />}
                        label="Em Análise"
                        value={formatNumber(stats.termosEmAnalise)}
                        change="+3"
                        changeType="positive"
                        color="var(--warning)"
                        bgColor="var(--warning-light)"
                    />
                    <StatCard
                        icon={<FaCheckCircle size={24} />}
                        label="Publicados"
                        value={formatNumber(stats.termosPublicados)}
                        change="+15%"
                        changeType="positive"
                        color="var(--info)"
                        bgColor="var(--info-light)"
                    />
                    <StatCard
                        icon={<FaVideo size={24} />}
                        label="Vídeos em Libras"
                        value={formatNumber(stats.totalVideos)}
                        change="+5"
                        changeType="positive"
                        color="#8b5cf6" // Cor roxa fixa em vez de var(--purple)
                        bgColor="rgba(139, 92, 246, 0.1)" // Versão light da roxa
                    />
                </div>

                {/* Métricas de QR Code e Scans por Dispositivo */}
                <div style={styles.qrMetricsContainer}>
                    {/* Coluna da Esquerda - Métricas de QR Code */}
                    <div style={styles.qrMetricsLeft}>
                        <h2 style={styles.sectionTitle}>
                            <IoQrCode /> Métricas de QR Code
                        </h2>

                        <div style={styles.qrMetricsGrid}>
                            <div style={styles.qrMetricCard}>
                                <div style={styles.qrMetricHeader}>
                                    <IoQrCode size={20} color="var(--primary)" />
                                    <span>Total de QR Codes</span>
                                </div>
                                <div style={styles.qrMetricValue}>{formatNumber(stats.totalQRCodes)}</div>
                            </div>

                            <div style={styles.qrMetricCard}>
                                <div style={styles.qrMetricHeader}>
                                    <FaEye size={20} color="var(--success)" />
                                    <span>Total de Scans</span>
                                </div>
                                <div style={styles.qrMetricValue}>{formatNumber(stats.totalScans)}</div>
                                <div style={styles.qrMetricGrowth}>
                                    <FaArrowUp size={12} style={{ color: "var(--success)" }} />
                                    <span style={{ color: "var(--success)" }}>{stats.scansGrowth}%</span>
                                    <span style={{ color: "var(--text-tertiary)", marginLeft: "4px" }}>vs período anterior</span>
                                </div>
                            </div>

                            {/* <div style={styles.qrMetricCard}>
                                <div style={styles.qrMetricHeader}>
                                    <FaHeart size={20} color="var(--danger)" />
                                    <span>Favoritos</span>
                                </div>
                                <div style={styles.qrMetricValue}>{formatNumber(stats.favoritesCount)}</div>
                            </div> */}

                            <div style={styles.qrMetricCard}>
                                <div style={styles.qrMetricHeader}>
                                    <FaBookOpen size={20} color="var(--warning)" />
                                    <span>Cursos e Livros Ativos</span>
                                </div>
                                <div style={styles.qrMetricValue}>{formatNumber(stats.scansToday)}</div>
                            </div>

                            <div style={styles.qrMetricCard}>
                                <div style={styles.qrMetricHeader}>
                                    <FaRegClock size={20} color="var(--info)" />
                                    <span>Scans Esta Semana</span>
                                </div>
                                <div style={styles.qrMetricValue}>{formatNumber(stats.scansWeek)}</div>
                            </div>

                            <div style={styles.qrMetricCard}>
                                <div style={styles.qrMetricHeader}>
                                    <FaChartLine size={20} color="#8b5cf6" /> {/* Cor roxa fixa */}
                                    <span>Scans Este Mês</span>
                                </div>
                                <div style={styles.qrMetricValue}>{formatNumber(stats.scansMonth)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna da Direita - Scans por Dispositivo */}
                    <div style={styles.qrMetricsRight}>
                        <div style={styles.deviceStats}>
                            <h3 style={styles.deviceTitle}>
                                <FaChartPie size={16} /> Scans por Dispositivo
                            </h3>

                            <div style={styles.deviceGrid}>
                                <div style={styles.deviceItem}>
                                    <FaMobile size={16} color="var(--primary)" />
                                    <div style={styles.deviceInfo}>
                                        <span style={styles.deviceLabel}>Mobile</span>
                                        <span style={styles.deviceValue}>{formatNumber(stats?.scansPorDispositivo?.mobile || 0)}</span>
                                    </div>
                                    <div style={styles.deviceBar}>
                                        <div style={{
                                            ...styles.deviceBarFill,
                                            width: `${stats?.totalScans ? (stats.scansPorDispositivo.mobile / stats.totalScans) * 100 : 0}%`,
                                            background: "var(--primary)"
                                        }} />
                                    </div>
                                    <span style={styles.devicePercentage}>
                                        {stats?.totalScans ? Math.round((stats.scansPorDispositivo.mobile / stats.totalScans) * 100) : 0}%
                                    </span>
                                </div>

                                <div style={styles.deviceItem}>
                                    <FaLaptop size={16} color="var(--success)" />
                                    <div style={styles.deviceInfo}>
                                        <span style={styles.deviceLabel}>Desktop</span>
                                        <span style={styles.deviceValue}>{formatNumber(stats?.scansPorDispositivo?.desktop || 0)}</span>
                                    </div>
                                    <div style={styles.deviceBar}>
                                        <div style={{
                                            ...styles.deviceBarFill,
                                            width: `${stats?.totalScans ? (stats.scansPorDispositivo.desktop / stats.totalScans) * 100 : 0}%`,
                                            background: "var(--success)"
                                        }} />
                                    </div>
                                    <span style={styles.devicePercentage}>
                                        {stats?.totalScans ? Math.round((stats.scansPorDispositivo.desktop / stats.totalScans) * 100) : 0}%
                                    </span>
                                </div>

                                <div style={styles.deviceItem}>
                                    <FaTablet size={16} color="var(--warning)" />
                                    <div style={styles.deviceInfo}>
                                        <span style={styles.deviceLabel}>Tablet</span>
                                        <span style={styles.deviceValue}>{formatNumber(stats?.scansPorDispositivo?.tablet || 0)}</span>
                                    </div>
                                    <div style={styles.deviceBar}>
                                        <div style={{
                                            ...styles.deviceBarFill,
                                            width: `${stats?.totalScans ? (stats.scansPorDispositivo.tablet / stats.totalScans) * 100 : 0}%`,
                                            background: "var(--warning)"
                                        }} />
                                    </div>
                                    <span style={styles.devicePercentage}>
                                        {stats?.totalScans ? Math.round((stats.scansPorDispositivo.tablet / stats.totalScans) * 100) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Resumo adicional de dispositivos */}
                            <div style={styles.deviceSummary}>
                                <div style={styles.deviceSummaryItem}>
                                    <span style={styles.deviceSummaryLabel}>Dispositivo mais usado:</span>
                                    <span style={styles.deviceSummaryValue}>
                                        {getMostUsedDevice(stats?.scansPorDispositivo)}
                                    </span>
                                </div>
                                <div style={styles.deviceSummaryItem}>
                                    <span style={styles.deviceSummaryLabel}>Média de scans por dispositivo:</span>
                                    <span style={styles.deviceSummaryValue}>
                                        {formatNumber(Math.round(
                                            (stats?.scansPorDispositivo?.mobile +
                                                stats?.scansPorDispositivo?.desktop +
                                                stats?.scansPorDispositivo?.tablet) / 3
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Relatório por Categoria */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>
                            <FaChartPie /> Relatório por Categoria
                        </h2>
                    </div>

                    <div style={styles.categoriasGrid}>
                        {stats.categorias.map((cat) => (
                            <div key={cat.nome} style={styles.categoriaCard}>
                                <div style={styles.categoriaHeader}>
                                    <span style={styles.categoriaNome}>{cat.nome}</span>
                                    <span style={styles.categoriaPorcentagem}>{cat.porcentagem}%</span>
                                </div>

                                <div style={styles.categoriaBar}>
                                    <div style={{
                                        ...styles.categoriaBarFill,
                                        width: `${cat.porcentagem}%`,
                                        background: cat.cor
                                    }} />
                                </div>

                                <div style={styles.categoriaStats}>
                                    <div style={styles.categoriaStat}>
                                        <FaFileAlt size={12} />
                                        <span>{cat.totalTermos} termos</span>
                                    </div>
                                    <div style={styles.categoriaStat}>
                                        <FaVideo size={12} />
                                        <span>{cat.totalVideos} vídeos</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Duas Colunas: Termos Recentes e Atividades */}
                <div style={styles.twoColumnGrid}>
                    {/* Termos Recentes */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Termos Recentes</h3>
                            <button
                                onClick={() => navigate("/termos/gerenciar")}
                                style={styles.viewAllButton}
                            >
                                Ver todos
                            </button>
                        </div>

                        <div style={styles.termosList}>
                            {termosRecentes.map((termo) => (
                                <div
                                    key={termo.id}
                                    style={styles.termoItem}
                                    onClick={() => navigate(`/termos/${termo.id}`)}
                                >
                                    <div style={styles.termoIcon}>
                                        {termo.tipo === "termo" ? <FaFileAlt /> : <FaVideo />}
                                    </div>
                                    <div style={styles.termoInfo}>
                                        <div style={styles.termoHeader}>
                                            <span style={styles.termoTitulo}>{termo.titulo}</span>
                                            {getStatusBadge(termo.status)}
                                        </div>
                                        <div style={styles.termoMeta}>
                                            <span>{termo.autor}</span>
                                            <span>•</span>
                                            <span>{termo.categoria}</span>
                                            <span>•</span>
                                            <span style={styles.termoData}>
                                                <FaCalendarAlt size={10} />
                                                {termo.dataCriacao}
                                            </span>
                                        </div>
                                        {termo.visualizacoes !== undefined && (
                                            <div style={styles.termoVisualizacoes}>
                                                <FaEye size={10} />
                                                {termo.visualizacoes} visualizações
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Atividades Recentes */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Atividades Recentes</h3>
                        </div>

                        <div style={styles.atividadesList}>
                            {atividadesRecentes.map((atividade) => (
                                <div key={atividade.id} style={styles.atividadeItem}>
                                    <div style={{
                                        ...styles.atividadeIcon,
                                        background: `${atividade.cor}20`,
                                        color: atividade.cor
                                    }}>
                                        {atividade.icone}
                                    </div>
                                    <div style={styles.atividadeInfo}>
                                        <div style={styles.atividadeDescricao}>
                                            {atividade.descricao}
                                        </div>
                                        <div style={styles.atividadeMeta}>
                                            <span>{atividade.usuario}</span>
                                            <span>•</span>
                                            <span>{atividade.data}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scans Recentes */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>
                            <FaEye /> Scans Recentes
                        </h2>

                        <div style={styles.scansControls}>
                            <div style={styles.searchBox}>
                                <FaSearch style={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Buscar scans..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={styles.searchInput}
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                style={styles.filterButton}
                            >
                                <FaFilter />
                            </button>
                        </div>
                    </div>

                    <div style={styles.scansTable}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.tableHeaderCell}>QR Code</th>
                                    <th style={styles.tableHeaderCell}>Localização</th>
                                    <th style={styles.tableHeaderCell}>Dispositivo</th>
                                    <th style={styles.tableHeaderCell}>Data/Hora</th>
                                    <th style={styles.tableHeaderCell}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedScans.map((scan) => (
                                    <tr key={scan.id} style={styles.tableRow}>
                                        <td style={styles.tableCell}>
                                            <div style={styles.scanQrInfo}>
                                                <strong>{scan.qrCode}</strong>
                                                <span style={styles.scanTermo}>{scan.termoTitulo}</span>
                                            </div>
                                        </td>
                                        <td style={styles.tableCell}>
                                            <div style={styles.scanLocalizacao}>
                                                <FaMapMarkerAlt size={10} />
                                                {scan.localizacao}
                                            </div>
                                        </td>
                                        <td style={styles.tableCell}>
                                            <div style={styles.scanDispositivo}>
                                                {getDispositivoIcon(scan.dispositivo)}
                                                <span>{scan.dispositivo}</span>
                                                <span style={styles.scanNavegador}>({scan.navegador})</span>
                                            </div>
                                        </td>
                                        <td style={styles.tableCell}>
                                            <div style={styles.scanData}>
                                                <div>{scan.data}</div>
                                                <span style={styles.scanHora}>{scan.hora}</span>
                                            </div>
                                        </td>
                                        <td style={styles.tableCell}>
                                            <button
                                                onClick={() => {
                                                    setSelectedScan(scan);
                                                    setShowScanModal(true);
                                                }}
                                                style={styles.scanActionButton}
                                            >
                                                <FaInfoCircle /> Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {paginatedScans.length === 0 && (
                            <div style={styles.emptyScans}>
                                <FaEye size={48} style={{ color: "var(--text-tertiary)" }} />
                                <h4>Nenhum scan encontrado</h4>
                                <p>Tente ajustar sua busca</p>
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
                </div>
            </div>

            {/* Modal de Detalhes do Scan */}
            {showScanModal && selectedScan && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h3>Detalhes do Scan</h3>
                            <button
                                onClick={() => setShowScanModal(false)}
                                style={styles.modalClose}
                            >
                                ×
                            </button>
                        </div>

                        <div style={styles.modalBody}>
                            <div style={styles.modalInfo}>
                                <div style={styles.modalInfoRow}>
                                    <strong>QR Code:</strong>
                                    <span>{selectedScan.qrCode}</span>
                                </div>
                                <div style={styles.modalInfoRow}>
                                    <strong>Termo:</strong>
                                    <span>{selectedScan.termoTitulo}</span>
                                </div>
                                <div style={styles.modalInfoRow}>
                                    <strong>Localização:</strong>
                                    <span>{selectedScan.localizacao}</span>
                                </div>
                                <div style={styles.modalInfoRow}>
                                    <strong>Dispositivo:</strong>
                                    <span>{selectedScan.dispositivo}</span>
                                </div>
                                <div style={styles.modalInfoRow}>
                                    <strong>Navegador:</strong>
                                    <span>{selectedScan.navegador}</span>
                                </div>
                                <div style={styles.modalInfoRow}>
                                    <strong>Data:</strong>
                                    <span>{selectedScan.data}</span>
                                </div>
                                <div style={styles.modalInfoRow}>
                                    <strong>Hora:</strong>
                                    <span>{selectedScan.hora}</span>
                                </div>
                            </div>

                            <div style={styles.modalActions}>
                                <button
                                    onClick={() => navigate(`/termos/${selectedScan.termoId}`)}
                                    style={styles.modalButton}
                                >
                                    <FaFileAlt /> Ver Termo
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(selectedScan.termoId)}
                                    style={styles.modalButton}
                                >
                                    Copiar ID
                                </button>
                            </div>
                        </div>

                        <div style={styles.modalFooter}>
                            <button
                                onClick={() => setShowScanModal(false)}
                                style={styles.modalCancelButton}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </>
    );
}

// Componente StatCard
interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    change: string;
    changeType: "positive" | "negative";
    color: string;
    bgColor: string;
}

function StatCard({ icon, label, value, change, changeType, color, bgColor }: StatCardProps) {
    return (
        <div style={{
            ...styles.statCard,
            borderLeft: `4px solid ${color}`
        }}>
            <div style={styles.statCardContent}>
                <div>
                    <div style={styles.statLabel}>{label}</div>
                    <div style={styles.statValue}>{value}</div>
                    <div style={styles.statChange}>
                        {changeType === "positive" ? (
                            <FaArrowUp size={12} style={{ color: "var(--success)" }} />
                        ) : (
                            <FaArrowDown size={12} style={{ color: "var(--danger)" }} />
                        )}
                        <span style={{
                            color: changeType === "positive" ? "var(--success)" : "var(--danger)",
                            fontWeight: "600"
                        }}>
                            {change}
                        </span>
                    </div>
                </div>
                <div style={{
                    ...styles.statIcon,
                    background: bgColor,
                    color: color
                }}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

// Estilos
const styles: Record<string, React.CSSProperties> = {
    leftColumn: {
        // backgroundColor: '#ffffff',
        background: "transparent",
        borderRadius: 12,
        // padding: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    rightColumn: {
        // backgroundColor: '#ffffff',
        background: "transparent",
        borderRadius: 12,
        // padding: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },

    deviceSummary: {
        marginTop: 20,
        padding: '16px 0 0 0',
        borderTop: '1px solid #e5e7eb'
    },

    deviceSummaryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        fontSize: 13
    },

    deviceSummaryLabel: {
        color: '#6b7280'
    },

    deviceSummaryValue: {
        color: '#1f2937',
        fontWeight: 500
    },
    container: {
        background: "transparent",
        // animation removida pois não funciona em objetos style
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
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "16px"
    },
    title: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "700",
        color: "var(--text-primary)"
    },
    subtitle: {
        margin: "4px 0 0",
        fontSize: "14px",
        color: "var(--text-tertiary)"
    },
    timeRangeSelector: {
        display: "flex",
        gap: "8px",
        background: "var(--bg-tertiary)",
        padding: "4px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)"
    },
    timeRangeButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "32px"
    },
    statCard: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--card-shadow)",
        transition: "transform 0.2s, box-shadow 0.2s"
    },
    statCardContent: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    statLabel: {
        fontSize: "13px",
        color: "var(--text-tertiary)",
        marginBottom: "8px"
    },
    statValue: {
        fontSize: "24px",
        fontWeight: "700",
        color: "var(--text-primary)",
        marginBottom: "8px"
    },
    statChange: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px"
    },
    statIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    qrMetricsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
        marginBottom: 24
    },
    qrMetricsLeft: {
        // backgroundColor: '#fff',
        borderRadius: 12,
        // padding: 20,
        // boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    qrMetricsRight: {
        // backgroundColor: '#fff',
        borderRadius: 12,
        // padding: 20,
        // boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    qrMetricsSection: {
        marginBottom: "32px"
    },
    sectionTitle: {
        margin: "0 0 20px",
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    qrMetricsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
    },
    qrMetricCard: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        padding: "16px",
        border: "1px solid var(--border-color)"
    },
    qrMetricHeader: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "12px",
        fontSize: "13px",
        color: "var(--text-tertiary)"
    },
    qrMetricValue: {
        fontSize: "24px",
        fontWeight: "700",
        color: "var(--text-primary)"
    },
    qrMetricGrowth: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginTop: "8px",
        fontSize: "12px"
    },
    deviceStats: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "46px",
        border: "1px solid var(--border-color)"
    },
    deviceTitle: {
        margin: "0 0 16px",
        fontSize: "15px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    deviceGrid: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    deviceItem: {
        display: "grid",
        gridTemplateColumns: "24px 1fr 1fr 50px",
        alignItems: "center",
        gap: "12px"
    },
    deviceInfo: {
        display: "flex",
        alignItems: 'center',
        gap: 8,
        minWidth: 100
        // justifyContent: "space-between",
        // alignItems: "center"
    },
    deviceLabel: {
        fontSize: "14px",
        color: "var(--text-secondary)"
    },
    deviceValue: {
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    deviceBar: {
        flex: "1px",
        height: "8px",
        background: "var(--border-color)",
        borderRadius: "4px",
        overflow: "hidden"
    },
    deviceBarFill: {
        height: "100%",
        borderRadius: "4px",
        transition: "width 0.3s ease"
    },
    devicePercentage: {
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-secondary)",
        minWidth: 45,
        textAlign: 'right'
    },
    section: {
        marginBottom: "32px"
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "16px"
    },
    categoriasGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px"
    },
    categoriaCard: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        padding: "16px",
        border: "1px solid var(--border-color)"
    },
    categoriaHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
    },
    categoriaNome: {
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    categoriaPorcentagem: {
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-secondary)"
    },
    categoriaBar: {
        width: "100%",
        height: "8px",
        background: "var(--border-color)",
        borderRadius: "4px",
        marginBottom: "12px",
        overflow: "hidden"
    },
    categoriaBarFill: {
        height: "100%",
        borderRadius: "4px",
        transition: "width 0.3s ease"
    },
    categoriaStats: {
        display: "flex",
        gap: "16px"
    },
    categoriaStat: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    twoColumnGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        marginBottom: "32px"
    },
    card: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        padding: "20px"
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
    },
    cardTitle: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    viewAllButton: {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    termosList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    termoItem: {
        display: "flex",
        gap: "12px",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.2s"
    },
    termoIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        background: "var(--bg-tertiary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-secondary)"
    },
    termoInfo: {
        flex: 1
    },
    termoHeader: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "4px",
        flexWrap: "wrap"
    },
    termoTitulo: {
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
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
    termoMeta: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        flexWrap: "wrap"
    },
    termoData: {
        display: "flex",
        alignItems: "center",
        gap: "4px"
    },
    termoVisualizacoes: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "4px"
    },
    atividadesList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    atividadeItem: {
        display: "flex",
        gap: "12px",
        padding: "12px",
        borderRadius: "8px",
        background: "var(--bg-tertiary)"
    },
    atividadeIcon: {
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px"
    },
    atividadeInfo: {
        flex: 1
    },
    atividadeDescricao: {
        fontSize: "13px",
        fontWeight: "500",
        color: "var(--text-primary)",
        marginBottom: "4px"
    },
    atividadeMeta: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    scansControls: {
        display: "flex",
        gap: "12px"
    },
    searchBox: {
        position: "relative",
        width: "300px"
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
        padding: "10px 10px 10px 36px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px",
        outline: "none"
    },
    filterButton: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    scansTable: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        overflow: "auto",
        marginBottom: "20px"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "800px"
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
        textTransform: "uppercase"
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
    scanQrInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },
    scanTermo: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    scanLocalizacao: {
        display: "flex",
        alignItems: "center",
        gap: "6px"
    },
    scanDispositivo: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        flexWrap: "wrap"
    },
    scanNavegador: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    scanData: {
        display: "flex",
        flexDirection: "column",
        gap: "2px"
    },
    scanHora: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    scanActionButton: {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    emptyScans: {
        textAlign: "center",
        padding: "48px",
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
        maxWidth: "500px",
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
    modalInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "20px"
    },
    modalInfoRow: {
        display: "flex",
        gap: "8px",
        fontSize: "14px"
    },
    modalActions: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
    },
    modalButton: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    modalFooter: {
        padding: "20px",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "flex-end"
    },
    modalCancelButton: {
        padding: "10px 20px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        cursor: "pointer"
    }
};

