import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    FaGraduationCap,
    FaUsers,
    FaChartLine,
    FaQrcode,
    FaEdit,
    FaTrash,
    FaEye,
    FaDownload,
    FaCopy,
    FaShare,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaClock,
    FaCalendarAlt,
    FaBook,
    FaVideo,
    FaFileAlt,
    FaArrowLeft,
    FaUserTie,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaMapMarkerAlt,
    FaGlobe,
    FaMobile,
    FaLaptop,
    FaPrint,
    FaStar,
    FaRegStar,
    FaHeart,
    FaRegHeart,
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFilePowerpoint,
    FaFileImage,
    FaLink
} from "react-icons/fa";

// Types e Interfaces
interface Curso {
    id: string;
    nome: string;
    descricao: string;
    categoria: string;
    nivel: "iniciante" | "intermediario" | "avancado" | "livre";
    modalidade: "presencial" | "online" | "hibrido";
    cargaHoraria: number;
    duracao: {
        valor: number;
        unidade: string;
    };
    coordenador: {
        id: string;
        nome: string;
        email: string;
    };
    instrutores: {
        id: string;
        nome: string;
    }[];
    estudantes: {
        total: number;
        ativos: number;
        concluintes: number;
    };
    progresso: {
        medio: number;
        porModulo: {
            modulo: string;
            progresso: number;
        }[];
    };
    status: "ativo" | "inativo" | "em-breve" | "encerrado";
    dataInicio: string;
    dataFim?: string;
    materiais: {
        total: number;
        comVideo: number;
        qrCodes: number;
    };
    qrCode: {
        id: string;
        url: string;
        imagem?: string;
        dataGeracao: string;
        scans: number;
    };
    turmas: Turma[];
    modulos: Modulo[];
    local?: string;
    vagas: number;
    imagem?: string;
}

interface Turma {
    id: string;
    nome: string;
    periodo: string;
    vagas: number;
    inscritos: number;
    status: "aberta" | "em-andamento" | "encerrada";
    horarios: string[];
    local?: string;
}

interface Modulo {
    id: string;
    nome: string;
    ordem: number;
    cargaHoraria: number;
    materiais: number;
    videos: number;
    progresso: number;
    descricao?: string;
}

type TabType = 'info' | 'modulos' | 'turmas' | 'estatisticas';

export default function CursoView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [curso, setCurso] = useState<Curso | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCurso();
        }
    }, [id]);

    const fetchCurso = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockCurso: Curso = {
                id: id || '1',
                nome: "Lógica de Programação - Fundamentos",
                descricao: "Introdução aos algoritmos, variáveis, tipos de dados e estruturas básicas. Este curso é ideal para iniciantes que desejam aprender os conceitos fundamentais da programação de forma acessível e prática.",
                categoria: "programacao",
                nivel: "iniciante",
                modalidade: "hibrido",
                cargaHoraria: 60,
                duracao: {
                    valor: 12,
                    unidade: "semanas"
                },
                coordenador: {
                    id: "c1",
                    nome: "Maria Silva",
                    email: "maria.silva@programacaoqr.com"
                },
                instrutores: [
                    { id: "i1", nome: "João Santos" },
                    { id: "i2", nome: "Ana Oliveira" }
                ],
                estudantes: {
                    total: 52,
                    ativos: 45,
                    concluintes: 38
                },
                progresso: {
                    medio: 82,
                    porModulo: [
                        { modulo: "Introdução à Lógica", progresso: 100 },
                        { modulo: "Variáveis e Tipos", progresso: 100 },
                        { modulo: "Operadores", progresso: 95 },
                        { modulo: "Entrada/Saída", progresso: 88 },
                        { modulo: "Estruturas Sequenciais", progresso: 72 }
                    ]
                },
                status: "ativo",
                dataInicio: "2024-02-01",
                dataFim: "2024-04-30",
                materiais: {
                    total: 28,
                    comVideo: 22,
                    qrCodes: 28
                },
                qrCode: {
                    id: "qrc1",
                    url: "https://programacaoqr.com/curso/1",
                    imagem: "/qrcodes/curso1.png",
                    dataGeracao: "2024-01-15",
                    scans: 187
                },
                turmas: [
                    {
                        id: "t1",
                        nome: "Turma A - Matutino",
                        periodo: "matutino",
                        vagas: 25,
                        inscritos: 22,
                        status: "em-andamento",
                        horarios: ["Segunda e Quarta - 08:00 às 10:00"],
                        local: "Lab 101"
                    },
                    {
                        id: "t2",
                        nome: "Turma B - Noturno",
                        periodo: "noturno",
                        vagas: 25,
                        inscritos: 25,
                        status: "em-andamento",
                        horarios: ["Terça e Quinta - 19:00 às 21:00"],
                        local: "Lab 102"
                    }
                ],
                modulos: [
                    {
                        id: "m1",
                        nome: "Introdução à Lógica",
                        ordem: 1,
                        cargaHoraria: 8,
                        materiais: 4,
                        videos: 3,
                        progresso: 100,
                        descricao: "Conceitos fundamentais de lógica, algoritmos e pensamento computacional."
                    },
                    {
                        id: "m2",
                        nome: "Variáveis e Tipos de Dados",
                        ordem: 2,
                        cargaHoraria: 12,
                        materiais: 6,
                        videos: 5,
                        progresso: 100,
                        descricao: "Declaração e uso de variáveis, tipos primitivos e constantes."
                    },
                    {
                        id: "m3",
                        nome: "Operadores",
                        ordem: 3,
                        cargaHoraria: 10,
                        materiais: 5,
                        videos: 4,
                        progresso: 95,
                        descricao: "Operadores aritméticos, relacionais, lógicos e de atribuição."
                    },
                    {
                        id: "m4",
                        nome: "Entrada e Saída de Dados",
                        ordem: 4,
                        cargaHoraria: 10,
                        materiais: 5,
                        videos: 4,
                        progresso: 88,
                        descricao: "Comandos para leitura de dados do usuário e exibição de resultados."
                    },
                    {
                        id: "m5",
                        nome: "Estruturas Sequenciais",
                        ordem: 5,
                        cargaHoraria: 20,
                        materiais: 8,
                        videos: 6,
                        progresso: 72,
                        descricao: "Desenvolvimento de algoritmos com estruturas sequenciais."
                    }
                ],
                local: "Lab 101 - Campus IFPA",
                vagas: 25
            };

            setCurso(mockCurso);
        } catch (error) {
            console.error("Erro ao carregar curso:", error);
            toast.error("Erro ao carregar dados do curso");
        } finally {
            setLoading(false);
        }
    };

    // Função para ícone do tipo de material
    const getTipoIcon = (tipo: string) => {
        switch(tipo) {
            case 'pdf': return <FaFilePdf size={20} color="var(--danger)" />;
            case 'word': return <FaFileWord size={20} color="var(--primary)" />;
            case 'excel': return <FaFileExcel size={20} color="var(--success)" />;
            case 'powerpoint': return <FaFilePowerpoint size={20} color="var(--warning)" />;
            case 'imagem': return <FaFileImage size={20} color="var(--info)" />;
            case 'video': return <FaVideo size={20} color="var(--danger)" />;
            case 'link': return <FaLink size={20} color="var(--text-tertiary)" />;
            default: return <FaFileAlt size={20} color="var(--text-tertiary)" />;
        }
    };

    const getStatusBadge = (status: Curso['status']) => {
        const config = {
            "ativo": { bg: "var(--success-light)", color: "var(--success)", icon: <FaCheckCircle />, text: "Ativo" },
            "inativo": { bg: "var(--bg-tertiary)", color: "var(--text-tertiary)", icon: <FaTimesCircle />, text: "Inativo" },
            "em-breve": { bg: "var(--info-light)", color: "var(--info)", icon: <FaClock />, text: "Em breve" },
            "encerrado": { bg: "var(--danger-light)", color: "var(--danger)", icon: <FaExclamationTriangle />, text: "Encerrado" }
        };
        const style = config[status];

        return (
            <span style={{
                ...styles.statusBadge,
                background: style.bg,
                color: style.color
            }}>
                {style.icon} {style.text}
            </span>
        );
    };

    const getNivelBadge = (nivel: Curso['nivel']) => {
        const config = {
            "iniciante": { bg: "var(--success-light)", color: "var(--success)", label: "Iniciante" },
            "intermediario": { bg: "var(--warning-light)", color: "var(--warning)", label: "Intermediário" },
            "avancado": { bg: "var(--danger-light)", color: "var(--danger)", label: "Avançado" },
            "livre": { bg: "var(--info-light)", color: "var(--info)", label: "Livre" }
        };
        const style = config[nivel];

        return (
            <span style={{
                ...styles.nivelBadge,
                background: style.bg,
                color: style.color
            }}>
                {style.label}
            </span>
        );
    };

    const getModalidadeIcon = (modalidade: Curso['modalidade']) => {
        switch(modalidade) {
            case "presencial": return <FaMapMarkerAlt />;
            case "online": return <FaLaptop />;
            case "hibrido": return <FaGlobe />;
            default: return <FaGlobe />;
        }
    };

    const handleVoltar = () => {
        navigate('/curso');
    };

    const handleEditar = () => {
        navigate(`/curso/${id}/editar`);
    };

    const handleGerarQRCode = () => {
        navigate(`/gerar-qr?curso=${id}&titulo=${encodeURIComponent(curso?.nome || '')}`);
    };

    const handleArquivar = () => {
        if (window.confirm("Deseja arquivar este curso?")) {
            toast.success("Curso arquivado com sucesso!");
            navigate('/curso');
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p style={{ color: 'var(--text-secondary)' }}>Carregando detalhes do curso...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (!curso) {
        return (
            <DashboardLayout>
                <div style={styles.notFound}>
                    <FaExclamationTriangle size={48} color="var(--danger)" />
                    <h2 style={{ margin: '16px 0', color: 'var(--text-primary)' }}>Curso não encontrado</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                        O curso que você está procurando não existe ou foi removido.
                    </p>
                    <button onClick={handleVoltar} style={styles.backButton}>
                        <FaArrowLeft /> Voltar para lista
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={styles.container}>
                {/* Header com navegação */}
                <div style={styles.header}>
                    <button onClick={handleVoltar} style={styles.backButton} aria-label="Voltar">
                        <FaArrowLeft /> Voltar
                    </button>
                </div>

                {/* Cabeçalho do Curso */}
                <div style={styles.cursoHeader}>
                    <div style={styles.cursoHeaderLeft}>
                        <h1 style={styles.cursoTitulo}>{curso.nome}</h1>
                        <div style={styles.cursoBadges}>
                            {getStatusBadge(curso.status)}
                            {getNivelBadge(curso.nivel)}
                            <span style={styles.modalidadeBadge}>
                                {getModalidadeIcon(curso.modalidade)} {curso.modalidade}
                            </span>
                        </div>
                    </div>
                    <div style={styles.cursoHeaderActions}>
                        <button onClick={handleEditar} style={styles.editButton}>
                            <FaEdit /> Editar
                        </button>
                        <button onClick={handleGerarQRCode} style={styles.qrButton}>
                            <FaQrcode /> QR Code
                        </button>
                        <button onClick={handleArquivar} style={styles.archiveButton}>
                            <FaTrash /> Arquivar
                        </button>
                    </div>
                </div>

                {/* Descrição */}
                <div style={styles.descriptionCard}>
                    <p style={styles.description}>{curso.descricao}</p>
                </div>

                {/* Métricas Rápidas */}
                <div style={styles.metricsGrid}>
                    <div style={styles.metricCard}>
                        <FaUsers size={24} color="var(--primary)" />
                        <div>
                            <span style={styles.metricValue}>{curso.estudantes.ativos}</span>
                            <span style={styles.metricLabel}>Alunos ativos</span>
                        </div>
                    </div>
                    <div style={styles.metricCard}>
                        <FaChartLine size={24} color="var(--success)" />
                        <div>
                            <span style={styles.metricValue}>{curso.progresso.medio}%</span>
                            <span style={styles.metricLabel}>Progresso médio</span>
                        </div>
                    </div>
                    <div style={styles.metricCard}>
                        <FaBook size={24} color="var(--warning)" />
                        <div>
                            <span style={styles.metricValue}>{curso.materiais.total}</span>
                            <span style={styles.metricLabel}>Materiais</span>
                        </div>
                    </div>
                    <div style={styles.metricCard}>
                        <FaVideo size={24} color="var(--danger)" />
                        <div>
                            <span style={styles.metricValue}>{curso.materiais.comVideo}</span>
                            <span style={styles.metricLabel}>Vídeos em Libras</span>
                        </div>
                    </div>
                    <div style={styles.metricCard}>
                        <FaQrcode size={24} color="var(--info)" />
                        <div>
                            <span style={styles.metricValue}>{curso.qrCode.scans}</span>
                            <span style={styles.metricLabel}>Scans QR Code</span>
                        </div>
                    </div>
                    <div style={styles.metricCard}>
                        <FaClock size={24} color="var(--text-tertiary)" />
                        <div>
                            <span style={styles.metricValue}>{curso.cargaHoraria}h</span>
                            <span style={styles.metricLabel}>Carga horária</span>
                        </div>
                    </div>
                </div>

                {/* Abas de navegação */}
                <div style={styles.tabsContainer} role="tablist">
                    {(['info', 'modulos', 'turmas', 'estatisticas'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                ...styles.tabButton,
                                borderBottomColor: activeTab === tab ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab ? 'var(--primary)' : 'var(--text-tertiary)'
                            }}
                            role="tab"
                            aria-selected={activeTab === tab}
                            aria-label={tab}
                        >
                            {tab === 'info' && <FaFileAlt />}
                            {tab === 'modulos' && <FaBook />}
                            {tab === 'turmas' && <FaUsers />}
                            {tab === 'estatisticas' && <FaChartLine />}
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Conteúdo das abas */}
                <div style={styles.tabContent} role="tabpanel">
                    {activeTab === 'info' && (
                        <div style={styles.infoTab}>
                            {/* Informações Básicas */}
                            <div style={styles.infoSection}>
                                <h3 style={styles.sectionTitle}>📋 Informações Básicas</h3>
                                <div style={styles.infoGrid}>
                                    <div style={styles.infoItem}>
                                        <strong>Categoria:</strong>
                                        <span>{curso.categoria}</span>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <strong>Nível:</strong>
                                        <span>{curso.nivel}</span>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <strong>Modalidade:</strong>
                                        <span>{curso.modalidade}</span>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <strong>Duração:</strong>
                                        <span>{curso.duracao.valor} {curso.duracao.unidade}</span>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <strong>Data de Início:</strong>
                                        <span>{new Date(curso.dataInicio).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    {curso.dataFim && (
                                        <div style={styles.infoItem}>
                                            <strong>Data de Término:</strong>
                                            <span>{new Date(curso.dataFim).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    )}
                                    <div style={styles.infoItem}>
                                        <strong>Vagas:</strong>
                                        <span>{curso.vagas}</span>
                                    </div>
                                    {curso.local && (
                                        <div style={styles.infoItem}>
                                            <strong>Local:</strong>
                                            <span>{curso.local}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Coordenador */}
                            <div style={styles.infoSection}>
                                <h3 style={styles.sectionTitle}>👨‍🏫 Coordenador</h3>
                                <div style={styles.coordenadorCard}>
                                    <FaUserTie size={32} color="var(--primary)" />
                                    <div>
                                        <h4 style={styles.coordenadorNome}>{curso.coordenador.nome}</h4>
                                        <p style={styles.coordenadorEmail}>{curso.coordenador.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Instrutores */}
                            <div style={styles.infoSection}>
                                <h3 style={styles.sectionTitle}>👥 Instrutores</h3>
                                <div style={styles.instrutoresGrid}>
                                    {curso.instrutores.map(instrutor => (
                                        <div key={instrutor.id} style={styles.instrutorCard}>
                                            <FaChalkboardTeacher size={20} color="var(--success)" />
                                            <span>{instrutor.nome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* QR Code */}
                            <div style={styles.infoSection}>
                                <h3 style={styles.sectionTitle}>📱 QR Code do Curso</h3>
                                <div style={styles.qrCodeCard}>
                                    {curso.qrCode.imagem ? (
                                        <img 
                                            src={curso.qrCode.imagem} 
                                            alt="QR Code do curso"
                                            style={styles.qrCodeImage}
                                        />
                                    ) : (
                                        <div style={{
                                            ...styles.qrCodeImage,
                                            background: 'var(--bg-tertiary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--text-tertiary)'
                                        }}>
                                            <FaQrcode size={40} />
                                        </div>
                                    )}
                                    <div style={styles.qrCodeInfo}>
                                        <p><strong>URL:</strong> {curso.qrCode.url}</p>
                                        <p><strong>Gerado em:</strong> {new Date(curso.qrCode.dataGeracao).toLocaleDateString('pt-BR')}</p>
                                        <p><strong>Scans:</strong> {curso.qrCode.scans}</p>
                                        <div style={styles.qrCodeActions}>
                                            <button style={styles.qrSmallButton}>
                                                <FaDownload /> Baixar
                                            </button>
                                            <button style={styles.qrSmallButton}>
                                                <FaCopy /> Copiar Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'modulos' && (
                        <div style={styles.modulosTab}>
                            {curso.modulos
                                .sort((a, b) => a.ordem - b.ordem)
                                .map(modulo => (
                                    <div key={modulo.id} style={styles.moduloCard}>
                                        <div style={styles.moduloHeader}>
                                            <span style={styles.moduloOrdem}>Módulo {modulo.ordem}</span>
                                            <h4 style={styles.moduloNome}>{modulo.nome}</h4>
                                        </div>
                                        
                                        {modulo.descricao && (
                                            <p style={styles.moduloDescricao}>{modulo.descricao}</p>
                                        )}

                                        <div style={styles.moduloStats}>
                                            <span><FaClock /> {modulo.cargaHoraria}h</span>
                                            <span><FaBook /> {modulo.materiais} materiais</span>
                                            <span><FaVideo /> {modulo.videos} vídeos</span>
                                        </div>

                                        <div style={styles.moduloProgresso}>
                                            <div style={styles.progressoBar}>
                                                <div style={{
                                                    ...styles.progressoFill,
                                                    width: `${modulo.progresso}%`,
                                                    background: modulo.progresso === 100 ? 'var(--success)' :
                                                               modulo.progresso > 50 ? 'var(--warning)' : 'var(--danger)'
                                                }} />
                                            </div>
                                            <span style={styles.progressoText}>{modulo.progresso}%</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    {activeTab === 'turmas' && (
                        <div style={styles.turmasTab}>
                            {curso.turmas.map(turma => (
                                <div key={turma.id} style={styles.turmaCard}>
                                    <div style={styles.turmaHeader}>
                                        <h4 style={styles.turmaNome}>{turma.nome}</h4>
                                        <span style={{
                                            ...styles.turmaStatus,
                                            background: turma.status === 'aberta' ? 'var(--success-light)' :
                                                       turma.status === 'em-andamento' ? 'var(--info-light)' : 'var(--danger-light)',
                                            color: turma.status === 'aberta' ? 'var(--success)' :
                                                   turma.status === 'em-andamento' ? 'var(--info)' : 'var(--danger)'
                                        }}>
                                            {turma.status === 'aberta' ? 'Aberta' :
                                             turma.status === 'em-andamento' ? 'Em Andamento' : 'Encerrada'}
                                        </span>
                                    </div>

                                    <div style={styles.turmaInfo}>
                                        <div style={styles.turmaInfoRow}>
                                            <FaClock />
                                            <span>{turma.periodo}</span>
                                        </div>
                                        <div style={styles.turmaInfoRow}>
                                            <FaUsers />
                                            <span>{turma.inscritos}/{turma.vagas} inscritos</span>
                                        </div>
                                        {turma.local && (
                                            <div style={styles.turmaInfoRow}>
                                                <FaMapMarkerAlt />
                                                <span>{turma.local}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div style={styles.turmaHorarios}>
                                        {turma.horarios.map((horario, idx) => (
                                            <span key={idx} style={styles.horarioBadge}>
                                                {horario}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'estatisticas' && (
                        <div style={styles.estatisticasTab}>
                            <div style={styles.estatisticasGrid}>
                                <div style={styles.estatisticaCard}>
                                    <FaUsers size={24} color="var(--primary)" />
                                    <div>
                                        <span style={styles.estatisticaValor}>{curso.estudantes.total}</span>
                                        <span style={styles.estatisticaLabel}>Total de estudantes</span>
                                    </div>
                                </div>
                                <div style={styles.estatisticaCard}>
                                    <FaUserGraduate size={24} color="var(--success)" />
                                    <div>
                                        <span style={styles.estatisticaValor}>{curso.estudantes.ativos}</span>
                                        <span style={styles.estatisticaLabel}>Ativos</span>
                                    </div>
                                </div>
                                <div style={styles.estatisticaCard}>
                                    <FaStar size={24} color="var(--warning)" />
                                    <div>
                                        <span style={styles.estatisticaValor}>{curso.estudantes.concluintes}</span>
                                        <span style={styles.estatisticaLabel}>Concluintes</span>
                                    </div>
                                </div>
                                <div style={styles.estatisticaCard}>
                                    <FaChartLine size={24} color="var(--danger)" />
                                    <div>
                                        <span style={styles.estatisticaValor}>{curso.progresso.medio}%</span>
                                        <span style={styles.estatisticaLabel}>Progresso médio</span>
                                    </div>
                                </div>
                            </div>

                            <h4 style={styles.progressoModulosTitle}>Progresso por Módulo</h4>
                            {curso.progresso.porModulo.map((item, index) => (
                                <div key={`${item.modulo}-${index}`} style={styles.progressoModulo}>
                                    <div style={styles.progressoModuloHeader}>
                                        <span>{item.modulo}</span>
                                        <span style={{ fontWeight: '600' }}>{item.progresso}%</span>
                                    </div>
                                    <div style={styles.progressoModuloBar}>
                                        <div style={{
                                            ...styles.progressoModuloFill,
                                            width: `${item.progresso}%`,
                                            background: item.progresso === 100 ? 'var(--success)' :
                                                       item.progresso > 66 ? 'var(--warning)' : 'var(--danger)'
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </DashboardLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        animation: 'fadeIn 0.5s ease-out',
        maxWidth: '1200px',
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
    notFound: {
        textAlign: 'center',
        padding: '60px',
        background: 'var(--card-bg)',
        borderRadius: '16px',
        boxShadow: 'var(--card-shadow)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    backButton: {
        padding: '10px 20px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease'
    },
    headerActions: {
        display: 'flex',
        gap: '8px'
    },
    iconButton: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        transition: 'all 0.2s ease'
    },
    cursoHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '16px'
    },
    cursoHeaderLeft: {
        flex: 1
    },
    cursoTitulo: {
        margin: '0 0 12px',
        fontSize: '32px',
        fontWeight: '700',
        color: 'var(--text-primary)'
    },
    cursoBadges: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    nivelBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600'
    },
    modalidadeBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '13px',
        background: 'var(--bg-tertiary)',
        color: 'var(--text-secondary)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    cursoHeaderActions: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    editButton: {
        padding: '10px 16px',
        borderRadius: '8px',
        border: 'none',
        background: 'var(--primary)',
        color: 'var(--text-inverse)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease'
    },
    qrButton: {
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease'
    },
    duplicateButton: {
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease'
    },
    archiveButton: {
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid var(--danger)',
        background: 'var(--bg-secondary)',
        color: 'var(--danger)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease'
    },
    descriptionCard: {
        background: 'var(--bg-tertiary)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        border: '1px solid var(--border-color)'
    },
    description: {
        margin: 0,
        fontSize: '15px',
        lineHeight: '1.7',
        color: 'var(--text-secondary)'
    },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
    },
    metricCard: {
        background: 'var(--card-bg)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.2s ease',
        boxShadow: 'var(--card-shadow)'
    },
    metricValue: {
        fontSize: '20px',
        fontWeight: '700',
        color: 'var(--text-primary)',
        display: 'block',
        lineHeight: 1.2
    },
    metricLabel: {
        fontSize: '12px',
        color: 'var(--text-tertiary)'
    },
    tabsContainer: {
        display: 'flex',
        gap: '4px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '24px'
    },
    tabButton: {
        padding: '12px 20px',
        background: 'none',
        border: 'none',
        borderBottom: '3px solid transparent',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
        color: 'var(--text-tertiary)'
    },
    tabContent: {
        minHeight: '400px',
        animation: 'slideIn 0.3s ease-out'
    },
    infoTab: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    infoSection: {
        background: 'var(--card-bg)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)'
    },
    sectionTitle: {
        margin: '0 0 16px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)'
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontSize: '14px',
        color: 'var(--text-secondary)'
    },
    coordenadorCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        background: 'var(--bg-tertiary)',
        borderRadius: '8px'
    },
    coordenadorNome: {
        margin: '0 0 4px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)'
    },
    coordenadorEmail: {
        margin: 0,
        fontSize: '14px',
        color: 'var(--text-tertiary)'
    },
    instrutoresGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px'
    },
    instrutorCard: {
        padding: '8px 12px',
        background: 'var(--bg-tertiary)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: 'var(--text-primary)'
    },
    qrCodeCard: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    qrCodeImage: {
        width: '150px',
        height: '150px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        objectFit: 'cover' as const
    },
    qrCodeInfo: {
        flex: 1,
        color: 'var(--text-secondary)'
    },
    qrCodeActions: {
        display: 'flex',
        gap: '8px',
        marginTop: '12px'
    },
    qrSmallButton: {
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'all 0.2s ease'
    },
    modulosTab: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    moduloCard: {
        background: 'var(--card-bg)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid var(--border-color)',
        transition: 'all 0.2s ease',
        boxShadow: 'var(--card-shadow)'
    },
    moduloHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px'
    },
    moduloOrdem: {
        padding: '4px 8px',
        borderRadius: '4px',
        background: 'var(--primary-light)',
        color: 'var(--primary)',
        fontSize: '11px',
        fontWeight: '600'
    },
    moduloNome: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)'
    },
    moduloDescricao: {
        fontSize: '14px',
        color: 'var(--text-tertiary)',
        lineHeight: '1.6',
        marginBottom: '12px'
    },
    moduloStats: {
        display: 'flex',
        gap: '16px',
        marginBottom: '12px',
        fontSize: '12px',
        color: 'var(--text-tertiary)'
    },
    moduloProgresso: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    progressoBar: {
        flex: 1,
        height: '6px',
        background: 'var(--border-color)',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    progressoFill: {
        height: '100%',
        borderRadius: '3px',
        transition: 'width 0.3s ease'
    },
    progressoText: {
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        minWidth: '40px'
    },
    turmasTab: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
    },
    turmaCard: {
        background: 'var(--card-bg)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid var(--border-color)',
        transition: 'all 0.2s ease',
        boxShadow: 'var(--card-shadow)'
    },
    turmaHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    turmaNome: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)'
    },
    turmaStatus: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600'
    },
    turmaInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '12px',
        fontSize: '13px',
        color: 'var(--text-tertiary)'
    },
    turmaInfoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    turmaHorarios: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
    },
    horarioBadge: {
        padding: '4px 8px',
        borderRadius: '4px',
        background: 'var(--bg-tertiary)',
        fontSize: '11px',
        color: 'var(--text-secondary)'
    },
    estatisticasTab: {
        padding: '20px',
        background: 'var(--card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)'
    },
    estatisticasGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
    },
    estatisticaCard: {
        background: 'var(--bg-tertiary)',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    estatisticaValor: {
        fontSize: '20px',
        fontWeight: '700',
        color: 'var(--text-primary)',
        display: 'block',
        lineHeight: 1.2
    },
    estatisticaLabel: {
        fontSize: '12px',
        color: 'var(--text-tertiary)'
    },
    progressoModulosTitle: {
        margin: '0 0 16px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)'
    },
    progressoModulo: {
        marginBottom: '12px'
    },
    progressoModuloHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px',
        fontSize: '13px',
        color: 'var(--text-secondary)'
    },
    progressoModuloBar: {
        width: '100%',
        height: '8px',
        background: 'var(--border-color)',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    progressoModuloFill: {
        height: '100%',
        borderRadius: '4px',
        transition: 'width 0.3s ease'
    }
};