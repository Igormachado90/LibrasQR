import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    FaGraduationCap,
    FaUsers,
    FaChartLine,
    FaQrcode,
    FaPlus,
    FaSearch,
    FaFilter,
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
    FaChevronLeft,
    FaChevronRight,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaToggleOn,
    FaToggleOff,
    FaLink,
    FaPrint,
    FaStar,
    FaRegStar,
    FaMapMarkerAlt,
    FaUserGraduate,
    FaUserTie,
    FaChalkboardTeacher
} from "react-icons/fa";

interface Curso {
    id: string;
    nome: string;
    descricao: string;
    categoria: "algoritmos" | "estruturas-dados" | "programacao-avancada" | "programacao" | "bancos-dados" | "outros";
    nivel: "iniciante" | "intermediario" | "avancado" | "livre";
    modalidade: "presencial" | "online" | "hibrido";
    cargaHoraria: number;
    duracao: {
        valor: number;
        unidade: "semanas" | "meses" | "anos";
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
}

interface Turma {
    id: string;
    nome: string;
    periodo: "matutino" | "vespertino" | "noturno" | "integral" | "livre";
    vagas: number;
    inscritos: number;
    status: "aberta" | "em-andamento" | "concluida" | "cancelada";
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
}

interface FiltrosCursos {
    categoria: string;
    nivel: string;
    modalidade: string;
    status: string;
    dataInicio: string;
    dataFim: string;
}

export default function GerenciarCursos() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtros, setFiltros] = useState<FiltrosCursos>({
        categoria: "",
        nivel: "",
        modalidade: "",
        status: "",
        dataInicio: "",
        dataFim: ""
    });
    const [sortConfig, setSortConfig] = useState({
        key: "dataInicio",
        direction: "desc"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [showTurmasModal, setShowTurmasModal] = useState(false);
    const [showModulosModal, setShowModulosModal] = useState(false);
    const [showEstatisticasModal, setShowEstatisticasModal] = useState(false);
    const itemsPerPage = 8;

    const categorias = [
        { value: "libras", label: "Libras", icon: "🤟" },
        { value: "traducao", label: "Tradução e Interpretação", icon: "🔄" },
        { value: "docencia", label: "Docência", icon: "👩‍🏫" },
        { value: "cultura", label: "Cultura Surda", icon: "🌍" },
        { value: "outros", label: "Outros", icon: "📚" }
    ];

    const niveis = [
        { value: "iniciante", label: "Iniciante", color: "var(--success)" },
        { value: "intermediario", label: "Intermediário", color: "var(--warning)" },
        { value: "avancado", label: "Avançado", color: "var(--danger)" },
        { value: "livre", label: "Livre", color: "var(--info)" }
    ];

    useEffect(() => {
        fetchCursos();
    }, []);

    const fetchCursos = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1200));

            const mockCursos: Curso[] = [
                {
                    id: "1",
                    nome: "Lógica de Programação - Fundamentos",
                    descricao: "Introdução aos algoritmos, variáveis, tipos de dados e estruturas básicas",
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
                            progresso: 100
                        },
                        {
                            id: "m2",
                            nome: "Variáveis e Tipos de Dados",
                            ordem: 2,
                            cargaHoraria: 12,
                            materiais: 6,
                            videos: 5,
                            progresso: 100
                        },
                        {
                            id: "m3",
                            nome: "Operadores Aritméticos e Lógicos",
                            ordem: 3,
                            cargaHoraria: 10,
                            materiais: 5,
                            videos: 4,
                            progresso: 95
                        },
                        {
                            id: "m4",
                            nome: "Comandos de Entrada e Saída",
                            ordem: 4,
                            cargaHoraria: 10,
                            materiais: 5,
                            videos: 4,
                            progresso: 88
                        },
                        {
                            id: "m5",
                            nome: "Estruturas Sequenciais",
                            ordem: 5,
                            cargaHoraria: 20,
                            materiais: 8,
                            videos: 6,
                            progresso: 72
                        }
                    ]
                },
                {
                    id: "2",
                    nome: "Estruturas de Controle e Decisão",
                    descricao: "Aprofundamento em condicionais (if/else, switch) e estruturas de repetição",
                    categoria: "programacao",
                    nivel: "intermediario",
                    modalidade: "online",
                    cargaHoraria: 80,
                    duracao: {
                        valor: 16,
                        unidade: "semanas"
                    },
                    coordenador: {
                        id: "c2",
                        nome: "Carlos Mendes",
                        email: "carlos.mendes@programacaoqr.com"
                    },
                    instrutores: [
                        { id: "i3", nome: "Patrícia Lima" },
                        { id: "i4", nome: "Roberto Alves" }
                    ],
                    estudantes: {
                        total: 38,
                        ativos: 34,
                        concluintes: 0
                    },
                    progresso: {
                        medio: 52,
                        porModulo: [
                            { modulo: "Revisão", progresso: 100 },
                            { modulo: "If/Else e Switch", progresso: 70 },
                            { modulo: "While e For", progresso: 50 },
                            { modulo: "Do-While e Break", progresso: 30 }
                        ]
                    },
                    status: "ativo",
                    dataInicio: "2024-03-01",
                    materiais: {
                        total: 35,
                        comVideo: 30,
                        qrCodes: 35
                    },
                    qrCode: {
                        id: "qrc2",
                        url: "https://programacaoqr.com/curso/2",
                        imagem: "/qrcodes/curso2.png",
                        dataGeracao: "2024-02-01",
                        scans: 102
                    },
                    turmas: [
                        {
                            id: "t3",
                            nome: "Turma Única - Online",
                            periodo: "noturno",
                            vagas: 45,
                            inscritos: 38,
                            status: "em-andamento",
                            horarios: ["Segunda e Quarta - 19:00 às 21:00"]
                        }
                    ],
                    modulos: [
                        {
                            id: "m6",
                            nome: "Revisão de Fundamentos",
                            ordem: 1,
                            cargaHoraria: 12,
                            materiais: 6,
                            videos: 5,
                            progresso: 100
                        },
                        {
                            id: "m7",
                            nome: "Estruturas Condicionais",
                            ordem: 2,
                            cargaHoraria: 24,
                            materiais: 10,
                            videos: 8,
                            progresso: 70
                        },
                        {
                            id: "m8",
                            nome: "Estruturas de Repetição",
                            ordem: 3,
                            cargaHoraria: 24,
                            materiais: 10,
                            videos: 9,
                            progresso: 50
                        },
                        {
                            id: "m9",
                            nome: "Controle Avançado",
                            ordem: 4,
                            cargaHoraria: 20,
                            materiais: 9,
                            videos: 8,
                            progresso: 30
                        }
                    ]
                },
                {
                    id: "3",
                    nome: "Programação Orientada a Objetos",
                    descricao: "Fundamentos de POO: classes, objetos, herança, polimorfismo e encapsulamento",
                    categoria: "programacao-avancada",
                    nivel: "avancado",
                    modalidade: "presencial",
                    cargaHoraria: 120,
                    duracao: {
                        valor: 5,
                        unidade: "meses"
                    },
                    coordenador: {
                        id: "c3",
                        nome: "Fernanda Costa",
                        email: "fernanda.costa@programacaoqr.com"
                    },
                    instrutores: [
                        { id: "i5", nome: "Lúcia Ferreira" },
                        { id: "i6", nome: "Marcos Paulo" },
                        { id: "i7", nome: "Sofia Santos" }
                    ],
                    estudantes: {
                        total: 22,
                        ativos: 20,
                        concluintes: 0
                    },
                    progresso: {
                        medio: 35,
                        porModulo: [
                            { modulo: "Classes e Objetos", progresso: 85 },
                            { modulo: "Encapsulamento", progresso: 45 },
                            { modulo: "Herança", progresso: 25 },
                            { modulo: "Polimorfismo", progresso: 10 }
                        ]
                    },
                    status: "ativo",
                    dataInicio: "2024-02-15",
                    materiais: {
                        total: 48,
                        comVideo: 42,
                        qrCodes: 48
                    },
                    qrCode: {
                        id: "qrc3",
                        url: "https://programacaoqr.com/curso/3",
                        imagem: "/qrcodes/curso3.png",
                        dataGeracao: "2024-02-10",
                        scans: 78
                    },
                    turmas: [
                        {
                            id: "t4",
                            nome: "Turma Presencial - SP",
                            periodo: "integral",
                            vagas: 25,
                            inscritos: 22,
                            status: "em-andamento",
                            horarios: ["Sábados - 08:00 às 17:00"],
                            local: "Lab 305"
                        }
                    ],
                    modulos: [
                        {
                            id: "m10",
                            nome: "Classes e Objetos",
                            ordem: 1,
                            cargaHoraria: 25,
                            materiais: 10,
                            videos: 9,
                            progresso: 85
                        },
                        {
                            id: "m11",
                            nome: "Encapsulamento e Modificadores",
                            ordem: 2,
                            cargaHoraria: 30,
                            materiais: 12,
                            videos: 10,
                            progresso: 45
                        },
                        {
                            id: "m12",
                            nome: "Herança e Interfaces",
                            ordem: 3,
                            cargaHoraria: 35,
                            materiais: 14,
                            videos: 12,
                            progresso: 25
                        },
                        {
                            id: "m13",
                            nome: "Polimorfismo e Abstração",
                            ordem: 4,
                            cargaHoraria: 30,
                            materiais: 12,
                            videos: 11,
                            progresso: 10
                        }
                    ]
                },
                {
                    id: "4",
                    nome: "Estruturas de Dados",
                    descricao: "Vetores, matrizes, listas, pilhas, filas, árvores e algoritmos de busca",
                    categoria: "estruturas-dados",
                    nivel: "avancado",
                    modalidade: "hibrido",
                    cargaHoraria: 150,
                    duracao: {
                        valor: 6,
                        unidade: "meses"
                    },
                    coordenador: {
                        id: "c4",
                        nome: "Ricardo Nunes",
                        email: "ricardo.nunes@programacaoqr.com"
                    },
                    instrutores: [
                        { id: "i8", nome: "Amanda Ribeiro" },
                        { id: "i9", nome: "Thiago Souza" }
                    ],
                    estudantes: {
                        total: 18,
                        ativos: 18,
                        concluintes: 0
                    },
                    progresso: {
                        medio: 28,
                        porModulo: [
                            { modulo: "Arrays e Matrizes", progresso: 70 },
                            { modulo: "Listas Encadeadas", progresso: 35 },
                            { modulo: "Pilhas e Filas", progresso: 20 },
                            { modulo: "Árvores", progresso: 5 }
                        ]
                    },
                    status: "ativo",
                    dataInicio: "2024-03-15",
                    materiais: {
                        total: 60,
                        comVideo: 52,
                        qrCodes: 60
                    },
                    qrCode: {
                        id: "qrc4",
                        url: "https://programacaoqr.com/curso/4",
                        imagem: "/qrcodes/curso4.png",
                        dataGeracao: "2024-03-01",
                        scans: 42
                    },
                    turmas: [
                        {
                            id: "t5",
                            nome: "Turma Híbrida",
                            periodo: "noturno",
                            vagas: 20,
                            inscritos: 18,
                            status: "em-andamento",
                            horarios: ["Terça e Quinta - 19:00 às 22:00"],
                            local: "Online + Encontros mensais"
                        }
                    ],
                    modulos: [
                        {
                            id: "m14",
                            nome: "Arrays, Matrizes e Strings",
                            ordem: 1,
                            cargaHoraria: 30,
                            materiais: 14,
                            videos: 12,
                            progresso: 70
                        },
                        {
                            id: "m15",
                            nome: "Listas Encadeadas",
                            ordem: 2,
                            cargaHoraria: 35,
                            materiais: 15,
                            videos: 13,
                            progresso: 35
                        },
                        {
                            id: "m16",
                            nome: "Pilhas e Filas",
                            ordem: 3,
                            cargaHoraria: 35,
                            materiais: 15,
                            videos: 13,
                            progresso: 20
                        },
                        {
                            id: "m17",
                            nome: "Árvores e Grafos",
                            ordem: 4,
                            cargaHoraria: 50,
                            materiais: 16,
                            videos: 14,
                            progresso: 5
                        }
                    ]
                },
                {
                    id: "5",
                    nome: "Algoritmos de Ordenação e Busca",
                    descricao: "Estudo aprofundado de algoritmos: bubble sort, quick sort, merge sort, busca binária",
                    categoria: "algoritmos",
                    nivel: "avancado",
                    modalidade: "online",
                    cargaHoraria: 80,
                    duracao: {
                        valor: 12,
                        unidade: "semanas"
                    },
                    coordenador: {
                        id: "c5",
                        nome: "Luciana Mendes",
                        email: "luciana.mendes@programacaoqr.com"
                    },
                    instrutores: [
                        { id: "i10", nome: "Carla Souza" }
                    ],
                    estudantes: {
                        total: 45,
                        ativos: 38,
                        concluintes: 15
                    },
                    progresso: {
                        medio: 70,
                        porModulo: [
                            { modulo: "Bubble/Selection Sort", progresso: 100 },
                            { modulo: "Quick/Merge Sort", progresso: 85 },
                            { modulo: "Busca Linear/Binária", progresso: 60 },
                            { modulo: "Análise de Complexidade", progresso: 45 }
                        ]
                    },
                    status: "ativo",
                    dataInicio: "2024-01-10",
                    materiais: {
                        total: 32,
                        comVideo: 28,
                        qrCodes: 32
                    },
                    qrCode: {
                        id: "qrc5",
                        url: "https://programacaoqr.com/curso/5",
                        imagem: "/qrcodes/curso5.png",
                        dataGeracao: "2024-01-05",
                        scans: 185
                    },
                    turmas: [
                        {
                            id: "t6",
                            nome: "Turma Online - Algoritmos",
                            periodo: "livre",
                            vagas: 60,
                            inscritos: 45,
                            status: "em-andamento",
                            horarios: ["Autoguiado"]
                        }
                    ],
                    modulos: [
                        {
                            id: "m18",
                            nome: "Algoritmos Simples de Ordenação",
                            ordem: 1,
                            cargaHoraria: 20,
                            materiais: 9,
                            videos: 8,
                            progresso: 100
                        },
                        {
                            id: "m19",
                            nome: "Algoritmos Avançados de Ordenação",
                            ordem: 2,
                            cargaHoraria: 25,
                            materiais: 10,
                            videos: 9,
                            progresso: 85
                        },
                        {
                            id: "m20",
                            nome: "Algoritmos de Busca",
                            ordem: 3,
                            cargaHoraria: 20,
                            materiais: 8,
                            videos: 7,
                            progresso: 60
                        },
                        {
                            id: "m21",
                            nome: "Complexidade e Otimização",
                            ordem: 4,
                            cargaHoraria: 15,
                            materiais: 5,
                            videos: 4,
                            progresso: 45
                        }
                    ]
                },
                {
                    id: "6",
                    nome: "Banco de Dados e SQL",
                    descricao: "Fundamentos de bancos de dados relacionais, SQL, consultas e modelagem",
                    categoria: "bancos-dados",
                    nivel: "intermediario",
                    modalidade: "presencial",
                    cargaHoraria: 70,
                    duracao: {
                        valor: 14,
                        unidade: "semanas"
                    },
                    coordenador: {
                        id: "c6",
                        nome: "Dr. Pedro Almeida",
                        email: "pedro.almeida@programacaoqr.com"
                    },
                    instrutores: [
                        { id: "i11", nome: "Fernando Lima" },
                        { id: "i12", nome: "Beatriz Santos" }
                    ],
                    estudantes: {
                        total: 30,
                        ativos: 26,
                        concluintes: 0
                    },
                    progresso: {
                        medio: 45,
                        porModulo: [
                            { modulo: "Introdução a BD", progresso: 90 },
                            { modulo: "SQL Básico", progresso: 70 },
                            { modulo: "Consultas Complexas", progresso: 35 },
                            { modulo: "Modelagem", progresso: 15 }
                        ]
                    },
                    status: "ativo",
                    dataInicio: "2024-03-20",
                    materiais: {
                        total: 35,
                        comVideo: 30,
                        qrCodes: 35
                    },
                    qrCode: {
                        id: "qrc6",
                        url: "https://programacaoqr.com/curso/6",
                        imagem: "/qrcodes/curso6.png",
                        dataGeracao: "2024-03-10",
                        scans: 28
                    },
                    turmas: [
                        {
                            id: "t7",
                            nome: "Turma BD - Noturno",
                            periodo: "noturno",
                            vagas: 30,
                            inscritos: 26,
                            status: "em-andamento",
                            horarios: ["Quartas e Sextas - 19:00 às 21:30"],
                            local: "Lab 204"
                        }
                    ],
                    modulos: [
                        {
                            id: "m22",
                            nome: "Introdução a Banco de Dados",
                            ordem: 1,
                            cargaHoraria: 12,
                            materiais: 6,
                            videos: 5,
                            progresso: 90
                        },
                        {
                            id: "m23",
                            nome: "SQL Básico",
                            ordem: 2,
                            cargaHoraria: 20,
                            materiais: 10,
                            videos: 9,
                            progresso: 70
                        },
                        {
                            id: "m24",
                            nome: "Consultas Avançadas",
                            ordem: 3,
                            cargaHoraria: 20,
                            materiais: 10,
                            videos: 9,
                            progresso: 35
                        },
                        {
                            id: "m25",
                            nome: "Modelagem de Dados",
                            ordem: 4,
                            cargaHoraria: 18,
                            materiais: 9,
                            videos: 7,
                            progresso: 15
                        }
                    ]
                }
            ];

            setCursos(mockCursos);
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
        } finally {
            setLoading(false);
        }
    };


    const filteredCursos = cursos
        .filter(curso => {
            const matchesSearch = curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                curso.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                curso.coordenador.nome.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategoria = !filtros.categoria || curso.categoria === filtros.categoria;
            const matchesNivel = !filtros.nivel || curso.nivel === filtros.nivel;
            const matchesModalidade = !filtros.modalidade || curso.modalidade === filtros.modalidade;
            const matchesStatus = !filtros.status || curso.status === filtros.status;

            return matchesSearch && matchesCategoria && matchesNivel && matchesModalidade && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Curso];
            const bValue = b[sortConfig.key as keyof Curso];

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

    const totalPages = Math.ceil(filteredCursos.length / itemsPerPage);
    const paginatedCursos = filteredCursos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusBadge = (status: string) => {
        const config = {
            "ativo": { bg: "var(--success-light)", color: "var(--success)", icon: <FaCheckCircle />, text: "Ativo" },
            "inativo": { bg: "var(--text-tertiary)20", color: "var(--text-tertiary)", icon: <FaTimesCircle />, text: "Inativo" },
            "em-breve": { bg: "var(--info-light)", color: "var(--info)", icon: <FaClock />, text: "Em breve" },
            "encerrado": { bg: "var(--danger-light)", color: "var(--danger)", icon: <FaExclamationTriangle />, text: "Encerrado" }
        };
        const style = config[status as keyof typeof config];

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

    const getNivelBadge = (nivel: string) => {
        const config = {
            "iniciante": { color: "var(--success)", label: "Iniciante" },
            "intermediario": { color: "var(--warning)", label: "Intermediário" },
            "avancado": { color: "var(--danger)", label: "Avançado" },
            "livre": { color: "var(--info)", label: "Livre" }
        };
        const style = config[nivel as keyof typeof config];

        return (
            <span style={{
                ...styles.nivelBadge,
                background: `${style.color}20`,
                color: style.color
            }}>
                {style.label}
            </span>
        );
    };

    const getCategoriaIcon = (categoria: string) => {
        const cat = categorias.find(c => c.value === categoria);
        return cat?.icon || "📚";
    };

    const handleNovoCurso = () => {
        navigate("/curso/novo");
    };

    const handleEditarCurso = (id: string) => {
        navigate(`/curso/${id}/editar`);
    };

    const handleVisualizarCurso = (id: string) => {
        navigate(`/curso/${id}`);
    };

    const handleDownloadQRCode = () => {
        console.log("Download QR Code");
        setShowQRCodeModal(false);
    };

    const handleToggleStatus = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "ativo" ? "inativo" : "ativo";
        setCursos(prev => prev.map(c =>
            c.id === id ? { ...c, status: newStatus } : c
        ));
    };

    const handleVerTurmas = (curso: Curso) => {
        setSelectedCurso(curso);
        setShowTurmasModal(true);
    };

    const handleVerModulos = (curso: Curso) => {
        setSelectedCurso(curso);
        setShowModulosModal(true);
    };

    const handleVerEstatisticas = (curso: Curso) => {
        setSelectedCurso(curso);
        setShowEstatisticasModal(true);
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Carregando cursos...</p>
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
                        <h1 style={styles.title}>Gerenciar Cursos</h1>
                        <p style={styles.subtitle}>
                            Gerencie os cursos da plataforma, acompanhe métricas e gere QR Codes para integração físico-digital
                        </p>
                    </div>

                    <button onClick={handleNovoCurso} style={styles.primaryButton}>
                        <FaPlus /> Novo Curso
                    </button>
                </div>

                {/* Cards de Resumo */}
                <div style={styles.summaryCards}>
                    <div style={styles.summaryCard}>
                        <FaGraduationCap size={24} color="var(--primary)" />
                        <div>
                            <span style={styles.summaryValue}>{cursos.length}</span>
                            <span style={styles.summaryLabel}>Total de Cursos</span>
                        </div>
                    </div>
                    <div style={styles.summaryCard}>
                        <FaUsers size={24} color="var(--success)" />
                        <div>
                            <span style={styles.summaryValue}>
                                {cursos.reduce((acc, c) => acc + c.estudantes.ativos, 0)}
                            </span>
                            <span style={styles.summaryLabel}>Estudantes Ativos</span>
                        </div>
                    </div>
                    <div style={styles.summaryCard}>
                        <FaChartLine size={24} color="var(--info)" />
                        <div>
                            <span style={styles.summaryValue}>
                                {Math.round(cursos.reduce((acc, c) => acc + c.progresso.medio, 0) / cursos.length)}%
                            </span>
                            <span style={styles.summaryLabel}>Progresso Médio</span>
                        </div>
                    </div>
                    <div style={styles.summaryCard}>
                        <FaQrcode size={24} color="var(--warning)" />
                        <div>
                            <span style={styles.summaryValue}>
                                {cursos.reduce((acc, c) => acc + c.qrCode.scans, 0)}
                            </span>
                            <span style={styles.summaryLabel}>Total de Scans</span>
                        </div>
                    </div>
                </div>

                {/* Busca e Filtros */}
                <div style={styles.searchSection}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por nome do curso, descrição ou coordenador..."
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
                                    <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
                                ))}
                            </select>

                            <select
                                value={filtros.nivel}
                                onChange={(e) => setFiltros({ ...filtros, nivel: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todos os níveis</option>
                                {niveis.map(nivel => (
                                    <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                                ))}
                            </select>

                            <select
                                value={filtros.modalidade}
                                onChange={(e) => setFiltros({ ...filtros, modalidade: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todas as modalidades</option>
                                <option value="presencial">Presencial</option>
                                <option value="online">Online</option>
                                <option value="hibrido">Híbrido</option>
                            </select>

                            <select
                                value={filtros.status}
                                onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                                style={styles.filterSelect}
                            >
                                <option value="">Todos os status</option>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                <option value="em-breve">Em breve</option>
                                <option value="encerrado">Encerrado</option>
                            </select>
                        </div>

                        <button
                            onClick={() => setFiltros({ categoria: "", nivel: "", modalidade: "", status: "", dataInicio: "", dataFim: "" })}
                            style={styles.clearFilters}
                        >
                            Limpar Filtros
                        </button>
                    </div>
                )}

                {/* Grid de Cursos */}
                <div style={styles.cursosGrid}>
                    {paginatedCursos.map((curso) => (
                        <div key={curso.id} style={styles.cursoCard}>
                            {/* Card Header */}
                            <div style={styles.cardHeader}>
                                <div style={styles.cardHeaderLeft}>
                                    <span style={styles.categoriaIcon}>
                                        {getCategoriaIcon(curso.categoria)}
                                    </span>
                                    <div>
                                        <h3 style={styles.cursoNome}>{curso.nome}</h3>
                                        <p style={styles.cursoDescricao}>{curso.descricao.substring(0, 80)}...</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggleStatus(curso.id, curso.status)}
                                    style={styles.toggleButton}
                                    title={curso.status === "ativo" ? "Desativar curso" : "Ativar curso"}
                                >
                                    {curso.status === "ativo" ? <FaToggleOn color="var(--success)" /> : <FaToggleOff color="var(--text-tertiary)" />}
                                </button>
                            </div>

                            {/* Badges */}
                            <div style={styles.badges}>
                                {getStatusBadge(curso.status)}
                                {getNivelBadge(curso.nivel)}
                                <span style={styles.modalidadeBadge}>
                                    {curso.modalidade === "presencial" && "🏛️ Presencial"}
                                    {curso.modalidade === "online" && "💻 Online"}
                                    {curso.modalidade === "hibrido" && "🔄 Híbrido"}
                                </span>
                            </div>

                            {/* Métricas Principais */}
                            <div style={styles.metricsGrid}>
                                <div style={styles.metricItem}>
                                    <FaUsers size={14} color="var(--text-tertiary)" />
                                    <span style={styles.metricValue}>{curso.estudantes.ativos}</span>
                                    <span style={styles.metricLabel}>ativos</span>
                                </div>
                                <div style={styles.metricItem}>
                                    <FaChartLine size={14} color="var(--text-tertiary)" />
                                    <span style={styles.metricValue}>{curso.progresso.medio}%</span>
                                    <span style={styles.metricLabel}>progresso</span>
                                </div>
                                <div style={styles.metricItem}>
                                    <FaBook size={14} color="var(--text-tertiary)" />
                                    <span style={styles.metricValue}>{curso.materiais.total}</span>
                                    <span style={styles.metricLabel}>materiais</span>
                                </div>
                                <div style={styles.metricItem}>
                                    <FaVideo size={14} color="var(--text-tertiary)" />
                                    <span style={styles.metricValue}>{curso.materiais.comVideo}</span>
                                    <span style={styles.metricLabel}>vídeos</span>
                                </div>
                            </div>

                            {/* Informações do Curso */}
                            <div style={styles.cursoInfo}>
                                <div style={styles.infoRow}>
                                    <FaCalendarAlt size={12} color="var(--text-tertiary)" />
                                    <span>Início: {new Date(curso.dataInicio).toLocaleDateString()}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <FaClock size={12} color="var(--text-tertiary)" />
                                    <span>{curso.cargaHoraria}h • {curso.duracao.valor} {curso.duracao.unidade}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <FaUserTie size={12} color="var(--text-tertiary)" />
                                    <span>Coord.: {curso.coordenador.nome}</span>
                                </div>
                            </div>

                            {/* QR Code e Ações Rápidas */}
                            <div style={styles.cardFooter}>
                                <div style={styles.quickActions}>
                                    <button
                                        onClick={() => handleVerTurmas(curso)}
                                        style={styles.quickActionButton}
                                        title="Ver turmas"
                                    >
                                        <FaUsers />
                                    </button>
                                    <button
                                        onClick={() => handleVerModulos(curso)}
                                        style={styles.quickActionButton}
                                        title="Ver módulos"
                                    >
                                        <FaBook />
                                    </button>
                                    <button
                                        onClick={() => handleVerEstatisticas(curso)}
                                        style={styles.quickActionButton}
                                        title="Ver estatísticas"
                                    >
                                        <FaChartLine />
                                    </button>
                                </div>
                            </div>

                            {/* Ações Principais */}
                            <div style={styles.cardActions}>
                                <button
                                    onClick={() => handleVisualizarCurso(curso.id)}
                                    style={styles.actionButton}
                                    title="Visualizar"
                                >
                                    <FaEye /> Visualizar
                                </button>
                                <button
                                    onClick={() => handleEditarCurso(curso.id)}
                                    style={styles.actionButton}
                                    title="Editar"
                                >
                                    <FaEdit /> Editar
                                </button>
                            </div>
                        </div>
                    ))}
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

                {/* Modal de QR Code */}
                {showQRCodeModal && selectedCurso && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "400px" }}>
                            <div style={styles.modalHeader}>
                                <h3>QR Code do Curso</h3>
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
                                        src={selectedCurso.qrCode.imagem}
                                        alt="QR Code"
                                        style={{ width: "200px", height: "200px" }}
                                    />
                                </div>

                                <div style={styles.qrCodeDetails}>
                                    <p><strong>Curso:</strong> {selectedCurso.nome}</p>
                                    <p><strong>URL:</strong> {selectedCurso.qrCode.url}</p>
                                    <p><strong>Gerado em:</strong> {selectedCurso.qrCode.dataGeracao}</p>
                                    <p><strong>Total de scans:</strong> {selectedCurso.qrCode.scans}</p>
                                </div>

                                <div style={styles.qrCodeActions}>
                                    <button
                                        onClick={handleDownloadQRCode}
                                        style={styles.qrCodeDownloadButton}
                                    >
                                        <FaDownload /> Download PNG
                                    </button>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(selectedCurso.qrCode.url)}
                                        style={styles.qrCodeCopyButton}
                                    >
                                        <FaCopy /> Copiar Link
                                    </button>
                                    <button
                                        onClick={() => window.print()}
                                        style={styles.qrCodePrintButton}
                                    >
                                        <FaPrint /> Imprimir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Turmas */}
                {showTurmasModal && selectedCurso && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "600px" }}>
                            <div style={styles.modalHeader}>
                                <h3>Turmas - {selectedCurso.nome}</h3>
                                <button
                                    onClick={() => setShowTurmasModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={styles.modalBody}>
                                {selectedCurso.turmas.map(turma => (
                                    <div key={turma.id} style={styles.turmaItem}>
                                        <div style={styles.turmaHeader}>
                                            <h4>{turma.nome}</h4>
                                            <span style={{
                                                ...styles.turmaStatus,
                                                background: turma.status === "aberta" ? "var(--success-light)" :
                                                    turma.status === "em-andamento" ? "var(--info-light)" :
                                                        turma.status === "concluida" ? "var(--text-tertiary)20" :
                                                            "var(--danger-light)",
                                                color: turma.status === "aberta" ? "var(--success)" :
                                                    turma.status === "em-andamento" ? "var(--info)" :
                                                        turma.status === "concluida" ? "var(--text-tertiary)" :
                                                            "var(--danger)"
                                            }}>
                                                {turma.status === "aberta" && "Aberta"}
                                                {turma.status === "em-andamento" && "Em andamento"}
                                                {turma.status === "concluida" && "Concluída"}
                                                {turma.status === "cancelada" && "Cancelada"}
                                            </span>
                                        </div>

                                        <div style={styles.turmaInfo}>
                                            <div style={styles.turmaInfoRow}>
                                                <FaClock size={12} />
                                                <span>{turma.periodo}</span>
                                            </div>
                                            <div style={styles.turmaInfoRow}>
                                                <FaUsers size={12} />
                                                <span>{turma.inscritos}/{turma.vagas} inscritos</span>
                                            </div>
                                            {turma.local && (
                                                <div style={styles.turmaInfoRow}>
                                                    <FaMapMarkerAlt size={12} />
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

                            <div style={styles.modalFooter}>
                                <button
                                    onClick={() => setShowTurmasModal(false)}
                                    style={styles.modalCancelButton}
                                >
                                    Fechar
                                </button>
                                <button
                                    onClick={() => navigate(`/cursos/${selectedCurso.id}/turmas/nova`)}
                                    style={styles.modalConfirmButton}
                                >
                                    <FaPlus /> Nova Turma
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Módulos */}
                {showModulosModal && selectedCurso && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "500px" }}>
                            <div style={styles.modalHeader}>
                                <h3>Módulos - {selectedCurso.nome}</h3>
                                <button
                                    onClick={() => setShowModulosModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={styles.modalBody}>
                                {selectedCurso.modulos
                                    .sort((a, b) => a.ordem - b.ordem)
                                    .map(modulo => (
                                        <div key={modulo.id} style={styles.moduloItem}>
                                            <div style={styles.moduloHeader}>
                                                <span style={styles.moduloOrdem}>Módulo {modulo.ordem}</span>
                                                <span style={styles.moduloNome}>{modulo.nome}</span>
                                            </div>

                                            <div style={styles.moduloInfo}>
                                                <span><FaClock /> {modulo.cargaHoraria}h</span>
                                                <span><FaBook /> {modulo.materiais}</span>
                                                <span><FaVideo /> {modulo.videos}</span>
                                            </div>

                                            <div style={styles.moduloProgresso}>
                                                <div style={styles.progressoBar}>
                                                    <div style={{
                                                        ...styles.progressoFill,
                                                        width: `${modulo.progresso}%`,
                                                        background: modulo.progresso === 100 ? "var(--success)" :
                                                            modulo.progresso > 50 ? "var(--info)" :
                                                                "var(--warning)"
                                                    }} />
                                                </div>
                                                <span style={styles.progressoText}>{modulo.progresso}%</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Estatísticas */}
                {showEstatisticasModal && selectedCurso && (
                    <div style={styles.modalOverlay}>
                        <div style={{ ...styles.modal, maxWidth: "500px" }}>
                            <div style={styles.modalHeader}>
                                <h3>Estatísticas - {selectedCurso.nome}</h3>
                                <button
                                    onClick={() => setShowEstatisticasModal(false)}
                                    style={styles.modalClose}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={styles.modalBody}>
                                <div style={styles.estatisticasGrid}>
                                    <div style={styles.estatisticaCard}>
                                        <FaUsers size={24} color="var(--primary)" />
                                        <div>
                                            <span style={styles.estatisticaValue}>{selectedCurso.estudantes.total}</span>
                                            <span style={styles.estatisticaLabel}>Total de estudantes</span>
                                        </div>
                                    </div>

                                    <div style={styles.estatisticaCard}>
                                        <FaUserGraduate size={24} color="var(--success)" />
                                        <div>
                                            <span style={styles.estatisticaValue}>{selectedCurso.estudantes.ativos}</span>
                                            <span style={styles.estatisticaLabel}>Ativos</span>
                                        </div>
                                    </div>

                                    <div style={styles.estatisticaCard}>
                                        <FaChartLine size={24} color="var(--info)" />
                                        <div>
                                            <span style={styles.estatisticaValue}>{selectedCurso.progresso.medio}%</span>
                                            <span style={styles.estatisticaLabel}>Progresso médio</span>
                                        </div>
                                    </div>

                                    <div style={styles.estatisticaCard}>
                                        <FaQrcode size={24} color="var(--purple)" />
                                        <div>
                                            <span style={styles.estatisticaValue}>{selectedCurso.materiais.qrCodes}</span>
                                            <span style={styles.estatisticaLabel}>QR Codes</span>
                                        </div>
                                    </div>

                                    <div style={styles.estatisticaCard}>
                                        <FaEye size={24} color="var(--teal)" />
                                        <div>
                                            <span style={styles.estatisticaValue}>{selectedCurso.qrCode.scans}</span>
                                            <span style={styles.estatisticaLabel}>Scans</span>
                                        </div>
                                    </div>
                                </div>

                                <h4 style={styles.progressoModulosTitle}>Progresso por Módulo</h4>
                                {selectedCurso.progresso.porModulo.map(item => (
                                    <div key={item.modulo} style={styles.progressoModulo}>
                                        <div style={styles.progressoModuloHeader}>
                                            <span>{item.modulo}</span>
                                            <span style={{ fontWeight: "600" }}>{item.progresso}%</span>
                                        </div>
                                        <div style={styles.progressoModuloBar}>
                                            <div style={{
                                                ...styles.progressoModuloFill,
                                                width: `${item.progresso}%`,
                                                background: item.progresso === 100 ? "var(--success)" :
                                                    item.progresso > 66 ? "var(--info)" :
                                                        item.progresso > 33 ? "var(--warning)" :
                                                            "var(--danger)"
                                            }} />
                                        </div>
                                    </div>
                                ))}
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
    summaryCards: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
    },
    summaryCard: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px",
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)"
    },
    summaryValue: {
        fontSize: "24px",
        fontWeight: "700",
        color: "var(--text-primary)",
        display: "block",
        lineHeight: 1.2
    },
    summaryLabel: {
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
    cursosGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "20px",
        marginBottom: "24px"
    },
    cursoCard: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s"
    },
    cardHeader: {
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px"
    },
    cardHeaderLeft: {
        display: "flex",
        gap: "12px",
        flex: 1
    },
    categoriaIcon: {
        fontSize: "32px",
        lineHeight: 1
    },
    cursoNome: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "4px"
    },
    cursoDescricao: {
        margin: 0,
        fontSize: "12px",
        color: "var(--text-tertiary)",
        lineHeight: 1.4
    },
    toggleButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "24px",
        padding: "4px"
    },
    badges: {
        padding: "0 16px",
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "12px"
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
    nivelBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600"
    },
    modalidadeBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)"
    },
    metricsGrid: {
        padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px",
        marginBottom: "12px"
    },
    metricItem: {
        display: "flex",
        alignItems: "center",
        gap: "2px",
        fontSize: "11px",
        color: "var(--text-secondary)"
    },
    metricValue: {
        fontWeight: "600",
        color: "var(--text-primary)",
        marginRight: "2px"
    },
    metricLabel: {
        color: "var(--text-tertiary)"
    },
    cursoInfo: {
        padding: "0 16px",
        marginBottom: "12px"
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        marginBottom: "4px"
    },
    cardFooter: {
        padding: "12px 16px",
        background: "var(--bg-tertiary)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    qrCodeMini: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    qrCodeImage: {
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        border: "1px solid var(--border-color)"
    },
    qrCodeStats: {
        display: "flex",
        alignItems: "center",
        gap: "2px",
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    quickActions: {
        display: "flex",
        gap: "8px"
    },
    quickActionButton: {
        // width: "32px",
        // height: "32px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        transition: "all 0.2s"
    },
    cardActions: {
        padding: "12px 16px",
        display: "grid",
        textAlign: "center",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "8px"
    },
    actionButton: {
        padding: "6px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer",
        transition: "all 0.2s"
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
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer"
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
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px"
    },
    qrCodeDownloadButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "none",
        background: "var(--primary)",
        color: "#fff",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer"
    },
    qrCodeCopyButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer"
    },
    qrCodePrintButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer"
    },
    turmaItem: {
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px"
    },
    turmaHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px"
    },
    turmaStatus: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600"
    },
    turmaInfo: {
        display: "flex",
        gap: "16px",
        marginBottom: "8px",
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    turmaInfoRow: {
        display: "flex",
        alignItems: "center",
        gap: "4px"
    },
    turmaHorarios: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
    },
    horarioBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        background: "var(--bg-secondary)",
        fontSize: "11px",
        color: "var(--text-secondary)"
    },
    moduloItem: {
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px"
    },
    moduloHeader: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px"
    },
    moduloOrdem: {
        padding: "2px 6px",
        borderRadius: "4px",
        background: "var(--primary-soft)",
        color: "var(--primary)",
        fontSize: "10px",
        fontWeight: "600"
    },
    moduloNome: {
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    moduloInfo: {
        display: "flex",
        gap: "12px",
        fontSize: "11px",
        color: "var(--text-tertiary)",
        marginBottom: "8px"
    },
    moduloProgresso: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    progressoBar: {
        flex: 1,
        height: "6px",
        background: "var(--border-color)",
        borderRadius: "3px",
        overflow: "hidden"
    },
    progressoFill: {
        height: "100%",
        borderRadius: "3px",
        transition: "width 0.3s ease"
    },
    progressoText: {
        fontSize: "11px",
        fontWeight: "600",
        color: "var(--text-primary)",
        minWidth: "40px"
    },
    estatisticasGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        marginBottom: "20px"
    },
    estatisticaCard: {
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    estatisticaValue: {
        fontSize: "18px",
        fontWeight: "700",
        color: "var(--text-primary)",
        display: "block",
        lineHeight: 1.2
    },
    estatisticaLabel: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    progressoModulosTitle: {
        margin: "0 0 16px",
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    progressoModulo: {
        marginBottom: "12px"
    },
    progressoModuloHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "4px",
        fontSize: "12px",
        color: "var(--text-secondary)"
    },
    progressoModuloBar: {
        width: "100%",
        height: "6px",
        background: "var(--border-color)",
        borderRadius: "3px",
        overflow: "hidden"
    },
    progressoModuloFill: {
        height: "100%",
        borderRadius: "3px",
        transition: "width 0.3s ease"
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

    /* Hover effects */
    .curso-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }

    .quick-action-button:hover {
        background: var(--primary-soft);
        color: var(--primary);
        border-color: var(--primary);
    }

    .action-button:hover {
        background: var(--bg-hover);
        color: var(--primary);
    }
`;

const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);