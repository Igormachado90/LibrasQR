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
import DashboardLayout from "../../layouts/DashboardLayout";
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
    FaFileImage,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaCopy,
    FaBookOpen,
    FaChartLine
} from "react-icons/fa";
import { BsFiletypePdf } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";

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
    const itemsPerPage = 12;

    const cursos = [
        "Libras Básico",
        "Libras Intermediário",
        "Libras Avançado",
        "Tradução e Interpretação",
        "Docência em Libras",
        "Cultura Surda",
        "Lógica de Programação",
        "Linguagens de Programação",
        "Estrutura de Dados"
    ];

    const tiposMateriais = [
        { value: "pdf", label: "PDF", icon: <BsFiletypePdf /> },
        { value: "Livro", label: "Livro", icon: <IoBookOutline /> },
        { value: "imagem", label: "Imagem", icon: <FaFileImage /> },
        { value: "texto", label: "Texto", icon: <FaFileAlt /> },
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
                    descricao: "Fundamentos da lógica de programação, pseudocódigo e fluxogramas para iniciantes",
                    curso: {
                        id: "curso1",
                        nome: "Lógica de Programação",
                        modulo: "Módulo 1 - Conceitos Básicos"
                    },
                    tipo: "pdf",
                    arquivo: {
                        nome: "logica_programacao_mod1.pdf",
                        tamanho: 3.2 * 1024 * 1024,
                        url: "/arquivos/logica_mod1.pdf"
                    },
                    termosAssociados: [
                        { id: "t1", termo: "Algoritmo", definicao: "Sequência lógica", categoria: "Conceitos", videoLibras: { disponivel: true } },
                        { id: "t2", termo: "Variável", definicao: "Espaço na memória", categoria: "Conceitos", videoLibras: { disponivel: true } },
                        { id: "t3", termo: "Constante", definicao: "Valor fixo", categoria: "Conceitos", videoLibras: { disponivel: true } }
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
                        dataGeracao: "2024-02-16",
                        scans: 45
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-10",
                    dataPublicacao: "2024-02-16",
                    autor: { id: "a1", nome: "Maria Oliveira" },
                    tags: ["algoritmos", "variáveis", "iniciante"],
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
                        modulo: "Módulo 2 - Estruturas de Controle"
                    },
                    tipo: "pdf",
                    arquivo: {
                        nome: "estruturas_controle.pdf",
                        tamanho: 4.5 * 1024 * 1024,
                        url: "/arquivos/estruturas_controle.pdf"
                    },
                    termosAssociados: [
                        { id: "t4", termo: "Condicional", definicao: "Estrutura condicional", categoria: "Estruturas", videoLibras: { disponivel: true } },
                        { id: "t5", termo: "Repetição", definicao: "Estrutura de repetição", categoria: "Estruturas", videoLibras: { disponivel: true } }
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
                        dataGeracao: "2024-02-15",
                        scans: 38
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-12",
                    dataPublicacao: "2024-02-15",
                    autor: { id: "a2", nome: "João Silva" },
                    tags: ["if-else", "while", "for"],
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
                        modulo: "Módulo 3 - Estruturas de Dados"
                    },
                    tipo: "pdf",
                    arquivo: {
                        nome: "vetores_matrizes_funcoes.pdf",
                        tamanho: 3.8 * 1024 * 1024,
                        url: "/arquivos/vetores_matrizes.pdf"
                    },
                    termosAssociados: [
                        { id: "t7", termo: "Vetor", definicao: "Array unidimensional", categoria: "Estruturas", videoLibras: { disponivel: true } },
                        { id: "t8", termo: "Matriz", definicao: "Array bidimensional", categoria: "Estruturas", videoLibras: { disponivel: true } },
                        { id: "t9", termo: "Função", definicao: "Bloco reutilizável", categoria: "Modularização", videoLibras: { disponivel: true } }
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
                        dataGeracao: "2024-02-14",
                        scans: 52
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-11",
                    dataPublicacao: "2024-02-14",
                    autor: { id: "a3", nome: "Carlos Santos" },
                    tags: ["vetores", "matrizes", "funções"],
                    visualizacoes: 312,
                    downloads: 67
                },
                {
                    id: "4",
                    titulo: "Introdução à Libras - Primeiros Sinais",
                    descricao: "Aprenda os primeiros sinais básicos da Língua Brasileira de Sinais",
                    curso: {
                        id: "curso4",
                        nome: "Libras Básico",
                        modulo: "Módulo 1 - Primeiros Sinais"
                    },
                    tipo: "Livro",
                    arquivo: {
                        nome: "introducao_libras.pdf",
                        tamanho: 2.1 * 1024 * 1024,
                        url: "/arquivos/introducao_libras.pdf"
                    },
                    termosAssociados: [
                        { id: "t10", termo: "Olá", definicao: "Saudação", categoria: "Saudações", videoLibras: { disponivel: true } },
                        { id: "t11", termo: "Bom dia", definicao: "Saudação matinal", categoria: "Saudações", videoLibras: { disponivel: true } }
                    ],
                    videoLibras: {
                        disponivel: true,
                        url: "/videos/introducao_libras.mp4",
                        duracao: 180,
                        dataUpload: "2024-02-12"
                    },
                    qrCode: {
                        id: "qr4",
                        url: "https://librasqr.com/material/4",
                        dataGeracao: "2024-02-12",
                        scans: 23
                    },
                    status: "rascunho",
                    dataCriacao: "2024-02-10",
                    autor: { id: "a1", nome: "Maria Oliveira" },
                    tags: ["libras", "sinais", "iniciante"],
                    visualizacoes: 89,
                    downloads: 18
                },
                {
                    id: "5",
                    titulo: "Cultura Surda e Identidade",
                    descricao: "Compreenda a cultura, história e identidade da comunidade surda",
                    curso: {
                        id: "curso5",
                        nome: "Cultura Surda",
                        modulo: "Módulo 1 - Introdução"
                    },
                    tipo: "Livro",
                    arquivo: {
                        nome: "cultura_surda.pdf",
                        tamanho: 5.2 * 1024 * 1024,
                        url: "/arquivos/cultura_surda.pdf"
                    },
                    termosAssociados: [
                        { id: "t12", termo: "Identidade Surda", definicao: "Reconhecimento cultural", categoria: "Cultura", videoLibras: { disponivel: false } },
                        { id: "t13", termo: "Comunidade Surda", definicao: "Grupo de pessoas surdas", categoria: "Cultura", videoLibras: { disponivel: true } }
                    ],
                    videoLibras: {
                        disponivel: false
                    },
                    qrCode: {
                        id: "qr5",
                        url: "https://librasqr.com/material/5",
                        dataGeracao: "2024-02-13",
                        scans: 67
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-09",
                    dataPublicacao: "2024-02-13",
                    autor: { id: "a2", nome: "João Silva" },
                    tags: ["cultura", "identidade", "comunidade"],
                    visualizacoes: 405,
                    downloads: 92
                },
                {
                    id: "6",
                    titulo: "Glossário de Termos Técnicos em Libras",
                    descricao: "Termos técnicos da área de programação traduzidos para Libras",
                    curso: {
                        id: "curso6",
                        nome: "Libras Avançado",
                        modulo: "Termos Técnicos"
                    },
                    tipo: "pdf",
                    arquivo: {
                        nome: "glossario_tecnico.pdf",
                        tamanho: 1.8 * 1024 * 1024,
                        url: "/arquivos/glossario_tecnico.pdf"
                    },
                    termosAssociados: [
                        { id: "t14", termo: "Programação", definicao: "Arte de programar", categoria: "Tecnologia", videoLibras: { disponivel: true } },
                        { id: "t15", termo: "Software", definicao: "Programas de computador", categoria: "Tecnologia", videoLibras: { disponivel: true } }
                    ],
                    videoLibras: {
                        disponivel: true,
                        url: "/videos/glossario_libras.mp4",
                        duracao: 350,
                        dataUpload: "2024-02-11"
                    },
                    qrCode: {
                        id: "qr6",
                        url: "https://librasqr.com/material/6",
                        dataGeracao: "2024-02-12",
                        scans: 91
                    },
                    status: "publicado",
                    dataCriacao: "2024-02-08",
                    dataPublicacao: "2024-02-12",
                    autor: { id: "a3", nome: "Carlos Santos" },
                    tags: ["glossário", "termos técnicos", "libras"],
                    visualizacoes: 521,
                    downloads: 134
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
                { id: "t1", termo: "Olá", definicao: "Saudação inicial", categoria: "Saudações", videoLibras: { disponivel: true } },
                { id: "t2", termo: "Adeus", definicao: "Despedida", categoria: "Saudações", videoLibras: { disponivel: true } },
                { id: "t3", termo: "Bom dia", definicao: "Saudação matinal", categoria: "Saudações", videoLibras: { disponivel: true } },
                { id: "t4", termo: "Escola", definicao: "Instituição de ensino", categoria: "Educação", videoLibras: { disponivel: true } },
                { id: "t5", termo: "Professor", definicao: "Profissional de ensino", categoria: "Educação", videoLibras: { disponivel: true } },
                { id: "t6", termo: "Aluno", definicao: "Estudante", categoria: "Educação", videoLibras: { disponivel: false } },
                { id: "t7", termo: "Algoritmo", definicao: "Sequência lógica", categoria: "Conceitos", videoLibras: { disponivel: true } },
                { id: "t8", termo: "Variável", definicao: "Espaço na memória", categoria: "Conceitos", videoLibras: { disponivel: true } },
                { id: "t9", termo: "Função", definicao: "Bloco reutilizável", categoria: "Conceitos", videoLibras: { disponivel: true } },
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

    const getSortedMateriais = () => {
        return [...materiais].sort((a, b) => {
            let aValue: any = a[sortConfig.key as keyof MaterialDidatico];
            let bValue: any = b[sortConfig.key as keyof MaterialDidatico];

            if (sortConfig.key === "visualizacoes" || sortConfig.key === "downloads") {
                return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            return 0;
        });
    };

    const filteredMateriais = getSortedMateriais()
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

    const getTipoIcon = (tipo: string) => {
        const tipoConfig = tiposMateriais.find(t => t.value === tipo);
        return tipoConfig?.icon || <FaFileAlt />;
    };

    const getTipoLabel = (tipo: string) => {
        return tiposMateriais.find(t => t.value === tipo)?.label || tipo;
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            rascunho: { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", text: "Rascunho", icon: <FaExclamationTriangle size={12} /> },
            publicado: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", text: "Publicado", icon: <FaCheckCircle size={12} /> },
            arquivado: { bg: "rgba(107, 114, 128, 0.1)", color: "#6b7280", text: "Arquivado", icon: <FaTimesCircle size={12} /> }
        };
        const style = statusStyles[status as keyof typeof statusStyles];

        return (
            <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                background: style.bg,
                color: style.color
            }}>
                {style.icon}
                {style.text}
            </span>
        );
    };

    const handleNovoMaterial = () => {
        navigate("/materiais/novo");
    };

    const handleVisualizarMaterial = (id: string) => {
        window.open(`/materiais/${id}`, '_blank');
    };

    const handleEditarMaterial = (id: string) => {
        navigate(`/materiais/${id}/editar`);
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

    const handleArquivarMaterial = (id: string) => {
        if (window.confirm("Deseja arquivar este material?")) {
            setMateriais(prev => prev.map(m =>
                m.id === id ? { ...m, status: "arquivado" } : m
            ));
        }
    };

    const MaterialCard = ({ material }: { material: MaterialDidatico }) => (
        <div style={{
            background: "var(--card-bg)",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            overflow: "hidden",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
        }}>
            <div style={{ padding: "16px 16px 0 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    color: "var(--primary)"
                }}>
                    {getTipoIcon(material.tipo)}
                </div>
                <div>{getStatusBadge(material.status)}</div>
            </div>

            <div style={{ padding: "16px", flex: 1 }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600", color: "var(--text-primary)", lineHeight: "1.3" }}>
                    {material.titulo}
                </h3>
                <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                    {material.descricao.substring(0, 100)}...
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                    <FaGraduationCap size={12} style={{ color: "var(--text-tertiary)" }} />
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{material.curso.nome}</span>
                    {material.curso.modulo && (
                        <span style={{ fontSize: "11px", color: "var(--text-tertiary)", background: "var(--bg-tertiary)", padding: "2px 6px", borderRadius: "4px" }}>
                            {material.curso.modulo}
                        </span>
                    )}
                </div>

                <div style={{ display: "flex", gap: "12px", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-tertiary)" }}>
                        <FaFileAlt size={10} /> {getTipoLabel(material.tipo)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-tertiary)" }}>
                        <FaClock size={10} /> {new Date(material.dataCriacao).toLocaleDateString('pt-BR')}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-tertiary)" }}>
                        <FaChartLine size={10} /> {material.visualizacoes} views
                    </div>
                </div>

                {material.termosAssociados.length > 0 && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "12px" }}>
                        <FaTag size={10} style={{ color: "var(--primary)", marginTop: "2px" }} />
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", flex: 1 }}>
                            {material.termosAssociados.slice(0, 3).map(termo => (
                                <span key={termo.id} style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "10px", background: "var(--primary-soft)", color: "var(--primary)" }}>
                                    {termo.termo}
                                </span>
                            ))}
                            {material.termosAssociados.length > 3 && (
                                <span style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "10px", background: "var(--bg-tertiary)", color: "var(--text-tertiary)" }}>
                                    +{material.termosAssociados.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {material.videoLibras.disponivel ? (
                        <div style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                            <FaVideo size={10} /> Vídeo Libras
                        </div>
                    ) : (
                        <div style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
                            <FaTimesCircle size={10} /> Sem Libras
                        </div>
                    )}
                    <div style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px", background: "var(--primary-soft)", color: "var(--primary)" }}>
                        <FaQrcode size={10} /> {material.qrCode.scans} scans
                    </div>
                </div>
            </div>

            <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "12px", background: "var(--bg-tertiary)" }}>
                <button onClick={() => handleVisualizarMaterial(material.id)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }} title="Visualizar">
                    <FaEye />
                </button>
                <button onClick={() => handleEditarMaterial(material.id)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }} title="Editar">
                    <FaEdit />
                </button>
                <button onClick={() => handleAssociarTermos(material)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }} title="Associar Termos">
                    <FaLink />
                </button>
                <button onClick={() => handleNavegarParaGerarQR(material)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }} title="Gerar QR Code">
                    <FaQrcode />
                </button>
                <button onClick={() => handleArquivarMaterial(material.id)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "#ef4444", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }} title="Arquivar">
                    <FaTrash />
                </button>
            </div>
        </div>
    );

    if (loading) {
        return (
            // <DashboardLayout>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
                    <div style={{ width: "50px", height: "50px", border: "3px solid var(--border-color)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "16px" }}></div>
                    <p>Carregando materiais didáticos...</p>
                </div>
            // </DashboardLayout>
        );
    }

    return (
        <>
            <div style={{ animation: "fadeIn 0.5s ease-out" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "600", color: "var(--text-primary)" }}>Materiais Didáticos</h1>
                        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--text-tertiary)" }}>Gerencie conteúdos educacionais, associe termos do glossário e verifique vídeos em Libras</p>
                    </div>
                    <button onClick={handleNovoMaterial} style={{ padding: "10px 20px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <FaPlus /> Novo Material
                    </button>
                </div>

                {/* Estatísticas */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "var(--card-bg)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                        <FaBook size={24} color="var(--primary)" />
                        <div><span style={{ fontSize: "20px", fontWeight: "600", color: "var(--text-primary)", marginRight: "4px" }}>{materiais.length}</span><span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Total de Materiais</span></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "var(--card-bg)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                        <FaVideo size={24} color="#10b981" />
                        <div><span style={{ fontSize: "20px", fontWeight: "600", color: "var(--text-primary)", marginRight: "4px" }}>{materiais.filter(m => m.videoLibras.disponivel).length}</span><span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Com Vídeo em Libras</span></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "var(--card-bg)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                        <FaTag size={24} color="#3b82f6" />
                        <div><span style={{ fontSize: "20px", fontWeight: "600", color: "var(--text-primary)", marginRight: "4px" }}>{materiais.reduce((acc, m) => acc + m.termosAssociados.length, 0)}</span><span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Termos Associados</span></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "var(--card-bg)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                        <FaQrcode size={24} color="#f59e0b" />
                        <div><span style={{ fontSize: "20px", fontWeight: "600", color: "var(--text-primary)", marginRight: "4px" }}>{materiais.reduce((acc, m) => acc + m.qrCode.scans, 0)}</span><span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Total de Scans</span></div>
                    </div>
                </div>

                {/* Busca */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "12px", padding: "0.5rem", background: "var(--bg-secondary)", borderRadius: "12px" }}>
                    <div style={{ flex: 1, position: "relative" }}>
                        <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
                        <input type="text" placeholder="Buscar por título, descrição ou curso..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "100%", padding: "12px 12px 12px 36px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--input-bg)", color: "var(--text-primary)", fontSize: "14px", outline: "none" }} />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} style={{ padding: "12px 20px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-secondary)", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><FaFilter /> Filtros</button>
                </div>

                {/* Filtros */}
                {showFilters && (
                    <div style={{ background: "var(--bg-tertiary)", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "12px" }}>
                            <select value={filtros.curso} onChange={(e) => setFiltros({ ...filtros, curso: e.target.value })} style={{ padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--input-bg)", color: "var(--text-primary)" }}>
                                <option value="">Todos os cursos</option>
                                {cursos.map(curso => <option key={curso} value={curso}>{curso}</option>)}
                            </select>
                            <select value={filtros.tipo} onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })} style={{ padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--input-bg)", color: "var(--text-primary)" }}>
                                <option value="">Todos os tipos</option>
                                {tiposMateriais.map(tipo => <option key={tipo.value} value={tipo.value}>{tipo.label}</option>)}
                            </select>
                            <select value={filtros.status} onChange={(e) => setFiltros({ ...filtros, status: e.target.value })} style={{ padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--input-bg)", color: "var(--text-primary)" }}>
                                <option value="">Todos os status</option>
                                <option value="rascunho">Rascunho</option>
                                <option value="publicado">Publicado</option>
                                <option value="arquivado">Arquivado</option>
                            </select>
                            <select value={filtros.videoLibras} onChange={(e) => setFiltros({ ...filtros, videoLibras: e.target.value })} style={{ padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--input-bg)", color: "var(--text-primary)" }}>
                                <option value="">Vídeo em Libras</option>
                                <option value="disponivel">Disponível</option>
                                <option value="indisponivel">Indisponível</option>
                            </select>
                        </div>
                        <button onClick={() => setFiltros({ curso: "", tipo: "", status: "", videoLibras: "", termo: "", dataInicio: "", dataFim: "" })} style={{ padding: "6px 12px", background: "transparent", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: "13px" }}>Limpar Filtros</button>
                    </div>
                )}

                {/* Ordenação */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", padding: "12px 16px", background: "var(--bg-tertiary)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Ordenar por:</span>
                    <button onClick={() => handleSort("titulo")} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>Título {getSortIcon("titulo")}</button>
                    <button onClick={() => handleSort("dataCriacao")} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>Data {getSortIcon("dataCriacao")}</button>
                    <button onClick={() => handleSort("visualizacoes")} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>Visualizações {getSortIcon("visualizacoes")}</button>
                </div>

                {/* Grid de Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "24px", marginBottom: "32px" }}>
                    {paginatedMateriais.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>

                {paginatedMateriais.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", color: "var(--text-tertiary)" }}>
                        <FaBook size={48} style={{ color: "var(--text-tertiary)" }} />
                        <h3>Nenhum material encontrado</h3>
                        <p>Tente ajustar seus filtros ou crie um novo material</p>
                    </div>
                )}

                {/* Paginação */}
                {totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FaChevronLeft /></button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button key={page} onClick={() => setCurrentPage(page)} style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border-color)", background: currentPage === page ? "var(--primary)" : "transparent", color: currentPage === page ? "#fff" : "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{page}</button>
                        ))}
                        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FaChevronRight /></button>
                    </div>
                )}

                {/* Modal Associar Termos */}
                {showAssociarTermos && selectedMaterial && (
                    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
                        <div style={{ background: "var(--card-bg)", borderRadius: "12px", width: "90%", maxWidth: "500px", maxHeight: "80vh", overflow: "auto" }}>
                            <div style={{ padding: "20px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h3>Associar Termos do Glossário</h3>
                                <button onClick={() => setShowAssociarTermos(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "var(--text-tertiary)" }}>×</button>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <p style={{ margin: "0 0 16px", fontSize: "14px", color: "var(--text-secondary)" }}>Material: <strong>{selectedMaterial.titulo}</strong></p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "300px", overflow: "auto" }}>
                                    {termosGlossario.map(termo => (
                                        <label key={termo.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px", borderRadius: "4px", cursor: "pointer", background: "var(--bg-tertiary)" }}>
                                            <input type="checkbox" checked={termosSelecionados.includes(termo.id)} onChange={(e) => {
                                                if (e.target.checked) setTermosSelecionados([...termosSelecionados, termo.id]);
                                                else setTermosSelecionados(termosSelecionados.filter(id => id !== termo.id));
                                            }} />
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                                                <span style={{ fontWeight: "500", color: "var(--text-primary)", fontSize: "13px" }}>{termo.termo}</span>
                                                <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{termo.categoria}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div style={{ padding: "20px", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                                <button onClick={() => setShowAssociarTermos(false)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-secondary)", fontSize: "13px", cursor: "pointer" }}>Cancelar</button>
                                <button onClick={handleSalvarAssociacoes} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "var(--primary)", color: "#fff", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}><FaCheckCircle size={12} /> Salvar Associações</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}