// import DashboardLayout from "../layouts/DashboardLayout";
// import DisciplinasHeader from "../components/Disciplinas/DisciplinasHeader";
// import DisciplinasTable from "../components/Disciplinas/DisciplinasTable";
// import { useState, useCallback } from "react";

// export default function Disciplinas() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState<{ status?: string; categoria?: string }>({});
//   const [stats, setStats] = useState({
//     totalDisciplinas: 0,
//     disciplinasAtivas: 0,
//     disciplinasInativas: 0,
//     categoriasCount: 0
//   });
//   const [categorias, setCategorias] = useState<string[]>([]);

//   // Função para atualizar estatísticas (chamada pelo DisciplinasTable)
//   const handleStatsUpdate = useCallback((newStats: {
//     totalDisciplinas: number;
//     disciplinasAtivas: number;
//     disciplinasInativas: number;
//     categoriasCount: number;
//     categoriasDisponiveis: string[];
//   }) => {
//     setStats({
//       totalDisciplinas: newStats.totalDisciplinas,
//       disciplinasAtivas: newStats.disciplinasAtivas,
//       disciplinasInativas: newStats.disciplinasInativas,
//       categoriasCount: newStats.categoriasCount
//     });
//     setCategorias(newStats.categoriasDisponiveis);
//   }, []);

//   // Funções de busca e filtro
//   const handleSearch = useCallback((term: string) => {
//     setSearchTerm(term);
//   }, []);

//   const handleFilterChange = useCallback((filter: { status?: string; categoria?: string }) => {
//     setFilters(filter);
//   }, []);

//   return (
//     <DashboardLayout>
//       <DisciplinasHeader
//         totalDisciplinas={stats.totalDisciplinas}
//         disciplinasAtivas={stats.disciplinasAtivas}
//         disciplinasInativas={stats.disciplinasInativas}
//         categoriasCount={stats.categoriasCount}
//         categoriasDisponiveis={categorias}
//         onSearch={handleSearch}
//         onFilterChange={handleFilterChange}
//       />
//       <DisciplinasTable
//         onStatsUpdate={handleStatsUpdate}
//         externalSearchTerm={searchTerm}
//         externalFilters={filters}
//       />
//     </DashboardLayout>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    FaBook,
    FaFileAlt,
    FaVideo,
    FaQrcode,
    FaPlus,
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaEye,
    FaDownload,
    FaLink,
    FaTag,
    FaGraduationCap,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaChevronLeft,
    FaChevronRight,
    FaFilePdf,
    FaFileWord,
    FaFilePowerpoint,
    FaFileExcel,
    FaFileImage,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaCopy,
    FaShare,
    FaPrint,
    FaCheck,
    FaTimes,
    FaBookOpen
} from "react-icons/fa";

interface MaterialDidatico {
    id: string;
    titulo: string;
    descricao: string;
    curso: {
        id: string;
        nome: string;
        modulo?: string;
    };
    tipo: "pdf" | "Livro" | "imagem" | "texto";
    arquivo: {
        nome: string;
        tamanho: number;
        url: string;
    };
    termosAssociados: TermoGlossario[];
    videoLibras: {
        disponivel: boolean;
        url?: string;
        duracao?: number;
        dataUpload?: string;
    };
    qrCode: {
        id: string;
        url: string;
        imagem?: string;
        dataGeracao: string;
        scans: number;
    };
    status: "publicado" | "rascunho" | "arquivado";
    dataCriacao: string;
    dataPublicacao?: string;
    autor: {
        id: string;
        nome: string;
    };
    tags: string[];
    visualizacoes: number;
    downloads: number;
}

interface TermoGlossario {
    id: string;
    termo: string;
    definicao: string;
    categoria: string;
    videoLibras?: {
        disponivel: boolean;
        url?: string;
    };
}

interface FiltrosMateriais {
    curso: string;
    tipo: string;
    status: string;
    videoLibras: string;
    termo: string;
    dataInicio: string;
    dataFim: string;
}

export default function GerenciarMateriaisDidaticos() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [materiais, setMateriais] = useState<MaterialDidatico[]>([]);
    const [termosGlossario, setTermosGlossario] = useState<TermoGlossario[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtros, setFiltros] = useState<FiltrosMateriais>({
        curso: "",
        tipo: "",
        status: "",
        videoLibras: "",
        termo: "",
        dataInicio: "",
        dataFim: ""
    });
    const [sortConfig, setSortConfig] = useState({
        key: "dataCriacao",
        direction: "desc"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<MaterialDidatico | null>(null);
    const [showAssociarTermos, setShowAssociarTermos] = useState(false);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [termosSelecionados, setTermosSelecionados] = useState<string[]>([]);
    const itemsPerPage = 10;

    const cursos = [
        "Libras Básico",
        "Libras Intermediário",
        "Libras Avançado",
        "Tradução e Interpretação",
        "Docência em Libras",
        "Cultura Surda"
    ];

    const tiposMateriais = [
        { value: "pdf", label: "PDF", icon: <FaFilePdf /> },
        { value: "Livro", label: "Livro", icon: <FaBookOpen /> },
        // { value: "apresentacao", label: "Apresentação", icon: <FaFilePowerpoint /> },
        { value: "imagem", label: "Imagem", icon: <FaFileImage /> },
        { value: "video", label: "Vídeo", icon: <FaVideo /> },
    ];

    useEffect(() => {
        fetchMateriais();
        fetchTermosGlossario();
    }, []);

    const fetchMateriais = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockMateriais: MaterialDidatico[] = [
                {
                    id: "1",
                    titulo: "Lógica de Programação - Introdução aos Algoritmos",
                    descricao: "Fundamentos da lógica de programação, pseudocódigo e fluxogramas",
                    curso: {
                        id: "curso1",
                        nome: "Lógica de Programação",
                        modulo: "Módulo 1 - Conceitos Básicos (15 páginas)"
                    },
                    tipo: "pdf",
                    arquivo: {
                        nome: "logica_programacao_mod1.pdf",
                        tamanho: 3.2 * 1024 * 1024,
                        url: "/arquivos/logica_mod1.pdf"
                    },
                    termosAssociados: [
                        { id: "t1", termo: "Algoritmo", definicao: "Sequência lógica de passos para resolver um problema", categoria: "Conceitos", videoLibras: { disponivel: true, url: "/videos/algoritmo.mp4" } },
                        { id: "t2", termo: "Variável", definicao: "Espaço na memória para armazenar dados", categoria: "Conceitos", videoLibras: { disponivel: true, url: "/videos/variavel.mp4" } },
                        { id: "t3", termo: "Constante", definicao: "Valor que não se altera durante a execução", categoria: "Conceitos", videoLibras: { disponivel: true, url: "/videos/constante.mp4" } }
                    ],
                    videoLibras: {
                        disponivel: true,
                        url: "/videos/logica_mod1_libras.mp4",
                        duracao: 245,
                        dataUpload: "2024-02-15"
                    },
                    qrCode: {
                        id: "qr1",
                        url: "https://librasqr.com/material/1",
                        imagem: "/qrcodes/material1.png",
                        dataGeracao: "2024-02-16",
                        scans: 45
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-10",
                    dataPublicacao: "2024-02-16",
                    autor: {
                        id: "a1",
                        nome: "Maria Oliveira"
                    },
                    tags: ["algoritmos", "variáveis", "iniciante", "pseudocódigo"],
                    visualizacoes: 234,
                    downloads: 56
                },
                {
                    id: "2",
                    titulo: "Estruturas de Controle e Decisão",
                    descricao: "Comandos condicionais (if-else, switch) e estruturas de repetição",
                    curso: {
                        id: "curso2",
                        nome: "Lógica de Programação",
                        modulo: "Módulo 2 - Estruturas de Controle (20 páginas)"
                    },
                    tipo: "pdf",
                    arquivo: {
                        nome: "estruturas_controle.pdf",
                        tamanho: 4.5 * 1024 * 1024,
                        url: "/arquivos/estruturas_controle.pdf"
                    },
                    termosAssociados: [
                        { id: "t4", termo: "Condicional", definicao: "Estrutura que executa código baseado em uma condição", categoria: "Estruturas", videoLibras: { disponivel: true, url: "/videos/condicional.mp4" } },
                        { id: "t5", termo: "Repetição", definicao: "Estrutura que executa código múltiplas vezes", categoria: "Estruturas", videoLibras: { disponivel: true, url: "/videos/repeticao.mp4" } },
                        { id: "t6", termo: "Loop", definicao: "Sequência que se repete até uma condição ser atendida", categoria: "Estruturas", videoLibras: { disponivel: true, url: "/videos/loop.mp4" } }
                    ],
                    videoLibras: {
                        disponivel: true,
                        url: "/videos/estruturas_controle_libras.mp4",
                        duracao: 280,
                        dataUpload: "2024-02-14"
                    },
                    qrCode: {
                        id: "qr2",
                        url: "https://librasqr.com/material/2",
                        imagem: "/qrcodes/material2.png",
                        dataGeracao: "2024-02-15",
                        scans: 38
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-12",
                    dataPublicacao: "2024-02-15",
                    autor: {
                        id: "a2",
                        nome: "João Silva"
                    },
                    tags: ["if-else", "switch", "while", "for", "condicionais"],
                    visualizacoes: 189,
                    downloads: 43
                },
                {
                    id: "3",
                    titulo: "Vetores, Matrizes e Funções",
                    descricao: "Estruturas de dados homogêneas e modularização de código",
                    curso: {
                        id: "curso3",
                        nome: "Lógica de Programação",
                        modulo: "Módulo 3 - Estruturas de Dados (25 páginas)"
                    },
                    tipo: "pdf",
                    arquivo: {
                        nome: "vetores_matrizes_funcoes.pdf",
                        tamanho: 3.8 * 1024 * 1024,
                        url: "/arquivos/vetores_matrizes.pdf"
                    },
                    termosAssociados: [
                        { id: "t7", termo: "Vetor", definicao: "Coleção de elementos do mesmo tipo com índice único", categoria: "Estruturas de Dados", videoLibras: { disponivel: true, url: "/videos/vetor.mp4" } },
                        { id: "t8", termo: "Matriz", definicao: "Estrutura bidimensional de dados", categoria: "Estruturas de Dados", videoLibras: { disponivel: true, url: "/videos/matriz.mp4" } },
                        { id: "t9", termo: "Função", definicao: "Bloco de código reutilizável", categoria: "Modularização", videoLibras: { disponivel: true, url: "/videos/funcao.mp4" } }
                    ],
                    videoLibras: {
                        disponivel: true,
                        url: "/videos/vetores_funcoes_libras.mp4",
                        duracao: 320,
                        dataUpload: "2024-02-13"
                    },
                    qrCode: {
                        id: "qr3",
                        url: "https://librasqr.com/material/3",
                        imagem: "/qrcodes/material3.png",
                        dataGeracao: "2024-02-14",
                        scans: 52
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-11",
                    dataPublicacao: "2024-02-14",
                    autor: {
                        id: "a3",
                        nome: "Carlos Santos"
                    },
                    tags: ["vetores", "matrizes", "funções", "arrays", "modularização"],
                    visualizacoes: 312,
                    downloads: 67
                },
                {
                    id: "4",
                    titulo: "Linguagens de Programação - Paradigmas",
                    descricao: "Introdução aos diferentes paradigmas: imperativo, orientado a objetos, funcional",
                    curso: {
                        id: "curso4",
                        nome: "Linguagens de Programação",
                        modulo: "Módulo 1 - Paradigmas (30 páginas)"
                    },
                    tipo: "Livro",
                    arquivo: {
                        nome: "paradigmas_programacao.docx",
                        tamanho: 2.1 * 1024 * 1024,
                        url: "/arquivos/paradigmas.docx"
                    },
                    termosAssociados: [
                        { id: "t10", termo: "Paradigma", definicao: "Modelo ou estilo de programação", categoria: "Conceitos", videoLibras: { disponivel: true, url: "/videos/paradigma.mp4" } },
                        { id: "t11", termo: "Orientação a Objetos", definicao: "Paradigma baseado em objetos e classes", categoria: "Paradigmas", videoLibras: { disponivel: false } }
                    ],
                    videoLibras: {
                        disponivel: false
                    },
                    qrCode: {
                        id: "qr4",
                        url: "https://librasqr.com/material/4",
                        imagem: "/qrcodes/material4.png",
                        dataGeracao: "2024-02-12",
                        scans: 23
                    },
                    status: "rascunho",
                    dataCriacao: "2024-02-10",
                    autor: {
                        id: "a1",
                        nome: "Maria Oliveira"
                    },
                    tags: ["paradigmas", "orientação a objetos", "funcional", "imperativo"],
                    visualizacoes: 89,
                    downloads: 18
                },
                {
                    id: "5",
                    titulo: "Algoritmos de Ordenação e Busca",
                    descricao: "Implementação de algoritmos clássicos: bubble sort, busca binária, quick sort",
                    curso: {
                        id: "curso5",
                        nome: "Estrutura de Dados",
                        modulo: "Módulo 4 - Algoritmos (35 páginas)"
                    },
                    tipo: "Livro",
                    arquivo: {
                        nome: "algoritmos_ordenacao.mp4",
                        tamanho: 52 * 1024 * 1024,
                        url: "/arquivos/algoritmos_ordenacao.mp4"
                    },
                    termosAssociados: [
                        { id: "t12", termo: "Ordenação", definicao: "Processo de organizar elementos em sequência", categoria: "Algoritmos", videoLibras: { disponivel: true, url: "/videos/ordenacao.mp4" } },
                        { id: "t13", termo: "Busca Binária", definicao: "Algoritmo eficiente para buscar em dados ordenados", categoria: "Algoritmos", videoLibras: { disponivel: true, url: "/videos/busca_binaria.mp4" } },
                        { id: "t14", termo: "Recursividade", definicao: "Técnica onde uma função chama a si mesma", categoria: "Técnicas", videoLibras: { disponivel: true, url: "/videos/recursividade.mp4" } }
                    ],
                    videoLibras: {
                        disponivel: true,
                        url: "/videos/algoritmos_ordenacao_libras.mp4",
                        duracao: 410,
                        dataUpload: "2024-02-12"
                    },
                    qrCode: {
                        id: "qr5",
                        url: "https://librasqr.com/material/5",
                        imagem: "/qrcodes/material5.png",
                        dataGeracao: "2024-02-13",
                        scans: 67
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-09",
                    dataPublicacao: "2024-02-13",
                    autor: {
                        id: "a2",
                        nome: "João Silva"
                    },
                    tags: ["bubble sort", "busca binária", "recursividade", "complexidade"],
                    visualizacoes: 405,
                    downloads: 92
                }
            ];

            setMateriais(mockMateriais);
        } catch (error) {
            console.error("Erro ao buscar materiais:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTermosGlossario = async () => {
        try {
            const mockTermos: TermoGlossario[] = [
                { id: "t1", termo: "Olá", definicao: "Saudação inicial", categoria: "Saudações", videoLibras: { disponivel: true, url: "/videos/ola.mp4" } },
                { id: "t2", termo: "Adeus", definicao: "Despedida", categoria: "Saudações", videoLibras: { disponivel: true, url: "/videos/adeus.mp4" } },
                { id: "t3", termo: "Bom dia", definicao: "Saudação matinal", categoria: "Saudações", videoLibras: { disponivel: true, url: "/videos/bomdia.mp4" } },
                { id: "t4", termo: "Escola", definicao: "Instituição de ensino", categoria: "Educação", videoLibras: { disponivel: true, url: "/videos/escola.mp4" } },
                { id: "t5", termo: "Professor", definicao: "Profissional de ensino", categoria: "Educação", videoLibras: { disponivel: true, url: "/videos/professor.mp4" } },
                { id: "t6", termo: "Aluno", definicao: "Estudante", categoria: "Educação", videoLibras: { disponivel: false } },
                { id: "t7", termo: "Hospital", definicao: "Estabelecimento de saúde", categoria: "Saúde", videoLibras: { disponivel: true, url: "/videos/hospital.mp4" } },
                { id: "t8", termo: "Emergência", definicao: "Situação de urgência", categoria: "Saúde", videoLibras: { disponivel: true, url: "/videos/emergencia.mp4" } },
                { id: "t9", termo: "Médico", definicao: "Profissional de saúde", categoria: "Saúde", videoLibras: { disponivel: true, url: "/videos/medico.mp4" } },
                { id: "t10", termo: "Identidade Surda", definicao: "Reconhecimento da cultura surda", categoria: "Cultura", videoLibras: { disponivel: false } },
                { id: "t11", termo: "Comunidade Surda", definicao: "Grupo de pessoas surdas", categoria: "Cultura", videoLibras: { disponivel: true, url: "/videos/comunidade.mp4" } },
                { id: "t12", termo: "Intérprete", definicao: "Profissional que traduz Libras", categoria: "Profissões", videoLibras: { disponivel: true, url: "/videos/interprete.mp4" } }
            ];
            setTermosGlossario(mockTermos);
        } catch (error) {
            console.error("Erro ao buscar termos:", error);
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

    const filteredMateriais = materiais
        .filter(material => {
            const matchesSearch = material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.curso.nome.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCurso = !filtros.curso || material.curso.nome === filtros.curso;
            const matchesTipo = !filtros.tipo || material.tipo === filtros.tipo;
            const matchesStatus = !filtros.status || material.status === filtros.status;
            const matchesVideo = !filtros.videoLibras ||
                (filtros.videoLibras === "disponivel" && material.videoLibras.disponivel) ||
                (filtros.videoLibras === "indisponivel" && !material.videoLibras.disponivel);

            return matchesSearch && matchesCurso && matchesTipo && matchesStatus && matchesVideo;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key as keyof MaterialDidatico];
            const bValue = b[sortConfig.key as keyof MaterialDidatico];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            return 0;
        });

    const totalPages = Math.ceil(filteredMateriais.length / itemsPerPage);
    const paginatedMateriais = filteredMateriais.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const formatDuration = (seconds?: number) => {
        if (!seconds) return "--:--";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTipoIcon = (tipo: string) => {
        const tipoConfig = tiposMateriais.find(t => t.value === tipo);
        return tipoConfig?.icon || <FaFileAlt />;
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            rascunho: { bg: "var(--warning-light)", color: "var(--warning)", text: "Rascunho" },
            publicado: { bg: "var(--success-light)", color: "var(--success)", text: "Publicado" },
            arquivado: { bg: "var(--text-tertiary)20", color: "var(--text-tertiary)", text: "Arquivado" }
        };
        const style = statusStyles[status as keyof typeof statusStyles];

        return (
            <span style={{
                ...styles.statusBadge,
                background: style.bg,
                color: style.color
            }}>
                {style.text}
            </span>
        );
    };

    const handleAssociarTermos = (material: MaterialDidatico) => {
        setSelectedMaterial(material);
        setTermosSelecionados(material.termosAssociados.map(t => t.id));
        setShowAssociarTermos(true);
    };

    const handleSalvarAssociacoes = () => {
        if (!selectedMaterial) return;

        const termosAssociados = termosGlossario.filter(t => termosSelecionados.includes(t.id));

        setMateriais(prev => prev.map(m =>
            m.id === selectedMaterial.id
                ? { ...m, termosAssociados }
                : m
        ));

        setShowAssociarTermos(false);
        setSelectedMaterial(null);
        setTermosSelecionados([]);
    };

    const handleNavegarParaGerarQR = (material: MaterialDidatico) => {
            navigate(`/gerar-qr?termo=${material.id}&titulo=${encodeURIComponent(material.titulo)}`);
    };

    const handleAbrirModalQR = (material: MaterialDidatico) => {
        setSelectedMaterial(material);
        setShowQRCodeModal(true);
    };

    const handleDownloadQRCode = () => {
        console.log("Download QR Code");
        setShowQRCodeModal(false);
    };

    const handleNovoMaterial = () => {
        navigate("/materiais/novo");
    };

    const handleEditarMaterial = (id: string) => {
        navigate(`/materiais/${id}/editar`);
    };

    const handleVisualizarMaterial = (id: string) => {
        window.open(`/materiais/${id}`, '_blank');
    };

    const handleDuplicarMaterial = (material: MaterialDidatico) => {
        console.log("Duplicar material:", material.id);
    };

    const handleArquivarMaterial = (id: string) => {
        if (window.confirm("Deseja arquivar este material?")) {
            setMateriais(prev => prev.map(m =>
                m.id === id ? { ...m, status: "arquivado" } : m
            ));
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Carregando materiais didáticos...</p>
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
                        <h1 style={styles.title}>Materiais Didáticos</h1>
                        <p style={styles.subtitle}>
                            Gerencie conteúdos educacionais, associe termos do glossário e verifique vídeos em Libras
                        </p>
                    </div>

                    <button onClick={handleNovoMaterial} style={styles.primaryButton}>
                        <FaPlus /> Novo Material
                    </button>
                </div>

                {/* Estatísticas Rápidas */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaBook size={24} color="var(--primary)" />
                        <div>
                            <span style={styles.statValue}>{materiais.length}</span>
                            <span style={styles.statLabel}>Total de Materiais</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaVideo size={24} color="var(--success)" />
                        <div>
                            <span style={styles.statValue}>
                                {materiais.filter(m => m.videoLibras.disponivel).length}
                            </span>
                            <span style={styles.statLabel}>Com Vídeo em Libras</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaTag size={24} color="var(--info)" />
                        <div>
                            <span style={styles.statValue}>
                                {materiais.reduce((acc, m) => acc + m.termosAssociados.length, 0)}
                            </span>
                            <span style={styles.statLabel}>Termos Associados</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaQrcode size={24} color="var(--warning)" />
                        <div>
                            <span style={styles.statValue}>
                                {materiais.reduce((acc, m) => acc + m.qrCode.scans, 0)}
                            </span>
                            <span style={styles.statLabel}>Total de Scans</span>
                        </div>
                    </div>
                </div>

                {/* Busca e Filtros */}
                <div style={styles.searchSection}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por título, descrição ou curso..."
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
                                value={filtros.curso}
                                onChange={(e) => setFiltros({ ...filtros, curso: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todos os cursos</option>
                                {cursos.map(curso => (
                                    <option key={curso} value={curso}>{curso}</option>
                                ))}
                            </select>

                            <select
                                value={filtros.tipo}
                                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todos os tipos</option>
                                {tiposMateriais.map(tipo => (
                                    <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                                ))}
                            </select>

                            <select
                                value={filtros.status}
                                onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todos os status</option>
                                <option value="rascunho">Rascunho</option>
                                <option value="publicado">Publicado</option>
                                <option value="arquivado">Arquivado</option>
                            </select>

                            <select
                                value={filtros.videoLibras}
                                onChange={(e) => setFiltros({ ...filtros, videoLibras: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Vídeo em Libras</option>
                                <option value="disponivel">Disponível</option>
                                <option value="indisponivel">Indisponível</option>
                            </select>
                        </div>

                        <button
                            onClick={() => setFiltros({ curso: "", tipo: "", status: "", videoLibras: "", termo: "", dataInicio: "", dataFim: "" })}
                            style={styles.clearFilters}
                        >
                            Limpar Filtros
                        </button>
                    </div>
                )}

                {/* Tabela de Materiais */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.tableHeaderCell} onClick={() => handleSort("titulo")}>
                                    <div style={styles.sortableHeader}>
                                        Material {getSortIcon("titulo")}
                                    </div>
                                </th>
                                <th style={styles.tableHeaderCell}>Curso</th>
                                <th style={styles.tableHeaderCell}>Tipo</th>
                                <th style={styles.tableHeaderCell}>Termos Associados</th>
                                <th style={styles.tableHeaderCell}>Vídeo Libras</th>
                                <th style={styles.tableHeaderCell}>QR Code</th>
                                <th style={styles.tableHeaderCell}>Status</th>
                                <th style={styles.tableHeaderCell}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedMateriais.map((material) => (
                                <tr key={material.id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>
                                        <div style={styles.materialInfo}>
                                            <span style={{...styles.materialIcon, fontSize: '24px'}}>{getTipoIcon(material.tipo)}</span>
                                            <div>
                                                <div style={styles.materialTitulo}>{material.titulo}</div>
                                                <div style={styles.materialDesc}>{material.descricao.substring(0, 60)}...</div>
                                                <div style={styles.materialMeta}>
                                                    <span>{formatFileSize(material.arquivo.tamanho)}</span>
                                                    <span>•</span>
                                                    <span>{material.visualizacoes} visualizações</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div>
                                            <div style={styles.cursoNome}>{material.curso.nome}</div>
                                            {material.curso.modulo && (
                                                <div style={styles.cursoModulo}>{material.curso.modulo}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <span style={styles.tipoBadge}>
                                            {tiposMateriais.find(t => t.value === material.tipo)?.label || material.tipo}
                                        </span>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.termosList}>
                                            {material.termosAssociados.slice(0, 3).map(termo => (
                                                <span key={termo.id} style={styles.termoChip}>
                                                    {termo.termo}
                                                </span>
                                            ))}
                                            {material.termosAssociados.length > 3 && (
                                                <span style={styles.termosMais}>
                                                    +{material.termosAssociados.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleAssociarTermos(material)}
                                            style={styles.associarButton}
                                        >
                                            <FaLink /> Associar termos
                                        </button>
                                    </td>
                                    <td style={styles.tableCell}>
                                        {material.videoLibras.disponivel ? (
                                            <div style={styles.videoDisponivel}>
                                                <FaCheckCircle style={{ color: "var(--success)" }} />
                                                <span>Disponível</span>
                                                {material.videoLibras.duracao && (
                                                    <span style={styles.videoDuracao}>
                                                        {formatDuration(material.videoLibras.duracao)}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div style={styles.videoIndisponivel}>
                                                <FaTimesCircle style={{ color: "var(--danger)" }} />
                                                <span>Indisponível</span>
                                                <button style={styles.uploadButton}>
                                                    Upload
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.qrCodeInfo}>
                                            {/* {!material.qrCode.imagem ? (
                                                <img
                                                    src={material.qrCode.imagem}
                                                    alt="QR Code"
                                                    style={styles.qrCodeThumb}
                                                />
                                            ) : (
                                                <div style={styles.qrCodeIcon}>
                                                    <FaQrcode size={32} />
                                                </div>
                                            )} */}
                                            <div>
                                                <div style={styles.qrCodeScans}>
                                                    <FaEye size={10} />
                                                    {material.qrCode.scans} scans
                                                </div>
                                                <button
                                                    onClick={() => handleAbrirModalQR(material)}
                                                    style={styles.qrCodeButton}
                                                >
                                                    Ver QR Code
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        {getStatusBadge(material.status)}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.actionButtons}>
                                            <button
                                                onClick={() => handleVisualizarMaterial(material.id)}
                                                style={styles.actionButton}
                                                title="Visualizar"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleEditarMaterial(material.id)}
                                                style={styles.actionButton}
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>
                                            {/* <button
                                                onClick={() => window.open(material.arquivo.url, '_blank')}
                                                style={styles.actionButton}
                                                title="Download"
                                            >
                                                <FaDownload />
                                            </button> */}
                                            <button
                                                onClick={() => handleNavegarParaGerarQR(material)}
                                                style={styles.actionButton}
                                                title="Gerar QR Code"
                                            >
                                                <FaQrcode />
                                            </button>
                                            <button
                                                onClick={() => handleArquivarMaterial(material.id)}
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

                    {paginatedMateriais.length === 0 && (
                        <div style={styles.emptyState}>
                            <FaBook size={48} style={{ color: "var(--text-tertiary)" }} />
                            <h3>Nenhum material encontrado</h3>
                            <p>Tente ajustar seus filtros ou crie um novo material</p>
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

                {/* Modal de Associação de Termos */}
                {showAssociarTermos && selectedMaterial && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <div style={styles.modalHeader}>
                                <h3>Associar Termos do Glossário</h3>
                                <button
                                    onClick={() => setShowAssociarTermos(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={styles.modalBody}>
                                <p style={styles.modalSubtitle}>
                                    Material: <strong>{selectedMaterial.titulo}</strong>
                                </p>

                                <div style={styles.termosSearch}>
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Buscar termos..."
                                        style={styles.termosSearchInput}
                                    />
                                </div>

                                <div style={styles.termosGrid}>
                                    {termosGlossario.map(termo => (
                                        <label key={termo.id} style={styles.termoCheckbox}>
                                            <input
                                                type="checkbox"
                                                checked={termosSelecionados.includes(termo.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setTermosSelecionados([...termosSelecionados, termo.id]);
                                                    } else {
                                                        setTermosSelecionados(termosSelecionados.filter(id => id !== termo.id));
                                                    }
                                                }}
                                            />
                                            <div style={styles.termoInfo}>
                                                <span style={styles.termoNome}>{termo.termo}</span>
                                                <span style={styles.termoCategoria}>{termo.categoria}</span>
                                                {termo.videoLibras?.disponivel && (
                                                    <FaVideo size={12} style={{ color: "var(--success)" }} />
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => setShowAssociarTermos(false)}
                                    style={styles.modalCancelButton}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSalvarAssociacoes}
                                    style={styles.modalConfirmButton}
                                >
                                    <FaCheck /> Salvar Associações
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de QR Code */}
                {showQRCodeModal && selectedMaterial && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "400px" }}>
                            <div style={styles.modalHeader}>
                                <h3>QR Code do Material</h3>
                                <button
                                    onClick={() => setShowQRCodeModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={styles.modalBody}>
                                <div style={styles.qrCodeLarge}>
                                    <img
                                        src={selectedMaterial.qrCode.imagem}
                                        alt="QR Code"
                                        style={{ width: "200px", height: "200px" }}
                                    />
                                </div>

                                <div style={styles.qrCodeDetails}>
                                    <p><strong>Material:</strong> {selectedMaterial.titulo}</p>
                                    <p><strong>URL:</strong> {selectedMaterial.qrCode.url}</p>
                                    <p><strong>Gerado em:</strong> {selectedMaterial.qrCode.dataGeracao}</p>
                                    <p><strong>Total de scans:</strong> {selectedMaterial.qrCode.scans}</p>
                                </div>

                                <div style={styles.qrCodeActions}>
                                    <button
                                        onClick={handleDownloadQRCode}
                                        style={styles.qrCodeDownloadButton}
                                    >
                                        <FaDownload /> Download PNG
                                    </button>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(selectedMaterial.qrCode.url)}
                                        style={styles.qrCodeCopyButton}
                                    >
                                        <FaCopy /> Copiar Link
                                    </button>
                                </div>
                            </div>

                            <div style={styles.modalFooter}>
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

// Estilos
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
        borderRadius: "8px",
        border: "1px solid var(--border-color)"
    },
    statValue: {
        fontSize: "20px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginRight: "4px"
    },
    statLabel: {
        fontSize: "13px",
        color: "var(--text-tertiary)"
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
        padding: "12px 12px 12px 36px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s",
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
        color: "var(--text-primary)"
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
    materialInfo: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    materialIcon: {
        width: "2rem",
        height: "2rem",
    },
    materialTitulo: {
        fontWeight: "500",
        color: "var(--text-primary)",
        marginBottom: "4px"
    },
    materialDesc: {
        fontSize: "12px",
        color: "var(--text-tertiary)",
        marginBottom: "4px"
    },
    materialMeta: {
        display: "flex",
        gap: "8px",
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    cursoNome: {
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    cursoModulo: {
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginTop: "2px"
    },
    tipoBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)"
    },
    termosList: {
        display: "flex",
        gap: "4px",
        flexWrap: "wrap",
        marginBottom: "4px"
    },
    termoChip: {
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "10px",
        background: "var(--primary-soft)",
        color: "var(--primary)"
    },
    termosMais: {
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "10px",
        background: "var(--bg-tertiary)",
        color: "var(--text-tertiary)"
    },
    associarButton: {
        background: "none",
        border: "none",
        color: "var(--primary)",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer",
        padding: "4px 0"
    },
    videoDisponivel: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "var(--success)",
        fontSize: "12px"
    },
    videoDuracao: {
        fontSize: "10px",
        color: "var(--text-tertiary)"
    },
    videoIndisponivel: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "var(--danger)",
        fontSize: "12px"
    },
    uploadButton: {
        padding: "2px 8px",
        borderRadius: "4px",
        border: "1px solid var(--primary)",
        background: "transparent",
        color: "var(--primary)",
        fontSize: "10px",
        cursor: "pointer"
    },
    qrCodeIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        // backgroundColor: "var(--primary-soft)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    qrCodeInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    qrCodeThumb: {
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        border: "1px solid var(--border-color)"
    },
    qrCodeScans: {
        display: "flex",
        alignItems: "center",
        gap: "2px",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginBottom: "4px"
    },
    qrCodeButton: {
        background: "var(--primary-soft)",
        border: "none",
        color: "var(--primary)",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        // gap: "4px",
        cursor: "pointer"
    },
    statusBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        display: "inline-block"
    },
    actionButtons: {
        display: "flex",
        gap: "8px"
    },
    actionButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-secondary)",
        fontSize: "14px",
        padding: "4px",
        borderRadius: "4px",
        transition: "all 0.2s"
    },
    emptyState: {
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
    modalSubtitle: {
        margin: "0 0 16px",
        fontSize: "14px",
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
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer"
    },
    termosSearch: {
        position: "relative",
        marginBottom: "16px"
    },
    termosSearchInput: {
        width: "100%",
        padding: "8px 8px 8px 32px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px"
    },
    termosGrid: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        maxHeight: "300px",
        overflow: "auto"
    },
    termoCheckbox: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
        borderRadius: "4px",
        cursor: "pointer",
        background: "var(--bg-tertiary)"
    },
    termoInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flex: 1
    },
    termoNome: {
        fontWeight: "500",
        color: "var(--text-primary)",
        fontSize: "13px"
    },
    termoCategoria: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    qrCodeLarge: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px"
    },
    qrCodeDetails: {
        background: "var(--bg-tertiary)",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "16px"
    },
    qrCodeActions: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px"
    },
    qrCodeDownloadButton: {
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        background: "var(--primary)",
        color: "#fff",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        cursor: "pointer"
    },
    qrCodeCopyButton: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        cursor: "pointer"
    }
};

// Adicionar keyframes
const globalStyles = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);