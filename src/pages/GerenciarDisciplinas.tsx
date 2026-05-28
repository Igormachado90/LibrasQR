import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import supabase from "../lib/supabase";
import {
    FaBook,
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaEye,
    FaPlus,
    FaGraduationCap,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaCalculator,
    FaAtom,
    FaLanguage,
    FaHistory,
    FaMap,
    FaMusic,
    FaPalette,
    FaLaptopCode,
    FaChalkboardTeacher,
    FaUsers,
    FaClock as FaClockIcon,
    FaCalendarAlt,
    FaSchool,
    FaTag,
    FaChevronLeft,
    FaChevronRight,
    FaList
} from "react-icons/fa";

interface Disciplina {
    id: string;
    nome: string;
    codigo: string;
    descricao: string;
    area: "linguagens" | "matematica" | "ciencias" | "humanas" | "tecnologia" | "artes" | "educacao_fisica";
    nivel: "fundamental2" | "medio";
    anos: string[];
    cargaHorariaSemanal: number;
    cargaHorariaAnual: number;
    escolasAtendidas: string[];
    totalTurmas: number;
    totalProfessores: number;
    status: "ativa" | "inativa" | "em_implantacao";
    dataCriacao: string;
    ementa?: string;
    objetivos?: string[];
    habilidades?: string[];
}

const areasConhecimento = [
    { value: "linguagens", label: "Linguagens e Códigos", icon: <FaLanguage />, cor: "var(--primary)" },
    { value: "matematica", label: "Matemática", icon: <FaCalculator />, cor: "var(--success)" },
    { value: "ciencias", label: "Ciências da Natureza", icon: <FaAtom />, cor: "var(--info)" },
    { value: "humanas", label: "Ciências Humanas", icon: <FaHistory />, cor: "var(--warning)" },
    { value: "tecnologia", label: "Tecnologia e Inovação", icon: <FaLaptopCode />, cor: "var(--purple)" },
    { value: "artes", label: "Artes", icon: <FaPalette />, cor: "var(--pink)" },
    { value: "educacao_fisica", label: "Educação Física", icon: <FaChalkboardTeacher />, cor: "var(--teal)" }
];

const niveisEnsino = [
    { value: "fundamental2", label: "Ensino Fundamental II", anos: ["6º ano", "7º ano", "8º ano", "9º ano"] },
    { value: "medio", label: "Ensino Médio", anos: ["1ª série", "2ª série", "3ª série"] }
];

export default function GerenciarDisciplinas() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<{ area?: string; nivel?: string; status?: string }>({});
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "nome",
        direction: "asc"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const itemsPerPage = 9;

    useEffect(() => {
        fetchDisciplinas();
    }, []);

    const fetchDisciplinas = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("disciplinas")
                .select("*")
                .order("nome", { ascending: true });

            if (error) throw error;
            setDisciplinas(data || []);
        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);
            // Dados mockados
            const mockDisciplinas: Disciplina[] = [
                // Ensino Fundamental II
                {
                    id: "1",
                    nome: "Língua Portuguesa",
                    codigo: "LP-EF2-01",
                    descricao: "Estudo da língua portuguesa: gramática, interpretação textual, produção de texto e literatura",
                    area: "linguagens",
                    nivel: "fundamental2",
                    anos: ["6º ano", "7º ano", "8º ano", "9º ano"],
                    cargaHorariaSemanal: 4,
                    cargaHorariaAnual: 160,
                    escolasAtendidas: ["EMEF Profª Maria José", "EEEM Dom Pedro II", "Colégio Santa Luzia"],
                    totalTurmas: 12,
                    totalProfessores: 8,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "2",
                    nome: "Matemática",
                    codigo: "MAT-EF2-02",
                    descricao: "Números, operações, álgebra, geometria, grandezas e medidas",
                    area: "matematica",
                    nivel: "fundamental2",
                    anos: ["6º ano", "7º ano", "8º ano", "9º ano"],
                    cargaHorariaSemanal: 4,
                    cargaHorariaAnual: 160,
                    escolasAtendidas: ["EMEF Profª Maria José", "EEEM Dom Pedro II", "Colégio Santa Luzia"],
                    totalTurmas: 12,
                    totalProfessores: 8,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "3",
                    nome: "Ciências",
                    codigo: "CIE-EF2-03",
                    descricao: "Matéria e energia, vida e evolução, terra e universo",
                    area: "ciencias",
                    nivel: "fundamental2",
                    anos: ["6º ano", "7º ano", "8º ano", "9º ano"],
                    cargaHorariaSemanal: 3,
                    cargaHorariaAnual: 120,
                    escolasAtendidas: ["EMEF Profª Maria José", "EEEM Dom Pedro II", "Colégio Santa Luzia"],
                    totalTurmas: 12,
                    totalProfessores: 6,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "4",
                    nome: "História",
                    codigo: "HIS-EF2-04",
                    descricao: "Estudo do tempo, sociedades humanas e transformações históricas",
                    area: "humanas",
                    nivel: "fundamental2",
                    anos: ["6º ano", "7º ano", "8º ano", "9º ano"],
                    cargaHorariaSemanal: 2,
                    cargaHorariaAnual: 80,
                    escolasAtendidas: ["EMEF Profª Maria José", "EEEM Dom Pedro II", "Colégio Santa Luzia"],
                    totalTurmas: 12,
                    totalProfessores: 4,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "5",
                    nome: "Geografia",
                    codigo: "GEO-EF2-05",
                    descricao: "Estudo do espaço geográfico, relações sociedade-natureza e globalização",
                    area: "humanas",
                    nivel: "fundamental2",
                    anos: ["6º ano", "7º ano", "8º ano", "9º ano"],
                    cargaHorariaSemanal: 2,
                    cargaHorariaAnual: 80,
                    escolasAtendidas: ["EMEF Profª Maria José", "EEEM Dom Pedro II", "Colégio Santa Luzia"],
                    totalTurmas: 12,
                    totalProfessores: 4,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "6",
                    nome: "Inglês",
                    codigo: "ING-EF2-06",
                    descricao: "Estudo da língua inglesa: vocabulário, gramática, leitura e conversação",
                    area: "linguagens",
                    nivel: "fundamental2",
                    anos: ["6º ano", "7º ano", "8º ano", "9º ano"],
                    cargaHorariaSemanal: 2,
                    cargaHorariaAnual: 80,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia"],
                    totalTurmas: 8,
                    totalProfessores: 4,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                // Ensino Médio
                {
                    id: "7",
                    nome: "Língua Portuguesa e Literatura",
                    codigo: "LP-EM-07",
                    descricao: "Estudo aprofundado da língua portuguesa, gramática avançada e literatura brasileira",
                    area: "linguagens",
                    nivel: "medio",
                    anos: ["1ª série", "2ª série", "3ª série"],
                    cargaHorariaSemanal: 3,
                    cargaHorariaAnual: 120,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia", "EEFM Prof. João Batista"],
                    totalTurmas: 8,
                    totalProfessores: 6,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "8",
                    nome: "Matemática",
                    codigo: "MAT-EM-08",
                    descricao: "Matemática avançada: funções, trigonometria, geometria analítica, probabilidade",
                    area: "matematica",
                    nivel: "medio",
                    anos: ["1ª série", "2ª série", "3ª série"],
                    cargaHorariaSemanal: 3,
                    cargaHorariaAnual: 120,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia", "EEFM Prof. João Batista"],
                    totalTurmas: 8,
                    totalProfessores: 6,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "9",
                    nome: "Física",
                    codigo: "FIS-EM-09",
                    descricao: "Estudo da mecânica, termologia, ondulatória, eletricidade e física moderna",
                    area: "ciencias",
                    nivel: "medio",
                    anos: ["1ª série", "2ª série", "3ª série"],
                    cargaHorariaSemanal: 2,
                    cargaHorariaAnual: 80,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia", "EEFM Prof. João Batista"],
                    totalTurmas: 8,
                    totalProfessores: 4,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "10",
                    nome: "Química",
                    codigo: "QUI-EM-10",
                    descricao: "Estudo da matéria, transformações químicas, química orgânica e inorgânica",
                    area: "ciencias",
                    nivel: "medio",
                    anos: ["1ª série", "2ª série", "3ª série"],
                    cargaHorariaSemanal: 2,
                    cargaHorariaAnual: 80,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia", "EEFM Prof. João Batista"],
                    totalTurmas: 8,
                    totalProfessores: 4,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "11",
                    nome: "Biologia",
                    codigo: "BIO-EM-11",
                    descricao: "Estudo da vida: citologia, genética, ecologia, evolução e fisiologia",
                    area: "ciencias",
                    nivel: "medio",
                    anos: ["1ª série", "2ª série", "3ª série"],
                    cargaHorariaSemanal: 2,
                    cargaHorariaAnual: 80,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia", "EEFM Prof. João Batista"],
                    totalTurmas: 8,
                    totalProfessores: 4,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "12",
                    nome: "Sociologia",
                    codigo: "SOC-EM-12",
                    descricao: "Estudo da sociedade, cultura, desigualdades sociais e movimentos sociais",
                    area: "humanas",
                    nivel: "medio",
                    anos: ["1ª série", "2ª série", "3ª série"],
                    cargaHorariaSemanal: 1,
                    cargaHorariaAnual: 40,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia", "EEFM Prof. João Batista"],
                    totalTurmas: 8,
                    totalProfessores: 3,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                },
                {
                    id: "13",
                    nome: "Filosofia",
                    codigo: "FIL-EM-13",
                    descricao: "Introdução ao pensamento filosófico, ética, política e estética",
                    area: "humanas",
                    nivel: "medio",
                    anos: ["1ª série", "2ª série", "3ª série"],
                    cargaHorariaSemanal: 1,
                    cargaHorariaAnual: 40,
                    escolasAtendidas: ["EEEM Dom Pedro II", "Colégio Santa Luzia", "EEFM Prof. João Batista"],
                    totalTurmas: 8,
                    totalProfessores: 3,
                    status: "ativa",
                    dataCriacao: "2024-01-15"
                }
            ];
            setDisciplinas(mockDisciplinas);
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

    const filteredDisciplinas = disciplinas
        .filter(disciplina => {
            const matchesSearch = disciplina.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                disciplina.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                disciplina.codigo.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesArea = !filters.area || disciplina.area === filters.area;
            const matchesNivel = !filters.nivel || disciplina.nivel === filters.nivel;
            const matchesStatus = !filters.status || disciplina.status === filters.status;

            return matchesSearch && matchesArea && matchesNivel && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Disciplina];
            const bValue = b[sortConfig.key as keyof Disciplina];

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

    const totalPages = Math.ceil(filteredDisciplinas.length / itemsPerPage);
    const paginatedDisciplinas = filteredDisciplinas.slice(
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
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: "600",
                background: style.bg,
                color: style.color
            }}>
                {style.icon} {style.label}
            </span>
        );
    };

    const getAreaInfo = (area: string) => {
        return areasConhecimento.find(a => a.value === area) || areasConhecimento[0];
    };

    const getNivelLabel = (nivel: string) => {
        return nivel === "fundamental2" ? "Ensino Fundamental II" : "Ensino Médio";
    };

    const getNivelIcon = (nivel: string) => {
        return nivel === "fundamental2" ? <FaGraduationCap /> : <FaSchool />;
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Carregando disciplinas...</p>
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
                        <h1 style={styles.title}>
                            <FaBook /> Disciplinas
                        </h1>
                        <p style={styles.subtitle}>
                            Gerencie as disciplinas do Ensino Fundamental II e Ensino Médio
                        </p>
                    </div>
                    <div style={styles.headerActions}>
                        <div style={styles.viewToggle}>
                            <button
                                onClick={() => setViewMode("grid")}
                                style={{
                                    ...styles.viewButton,
                                    background: viewMode === "grid" ? "var(--primary)" : "transparent",
                                    color: viewMode === "grid" ? "#fff" : "var(--text-secondary)"
                                }}
                            >
                                <FaBook /> Grid
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                style={{
                                    ...styles.viewButton,
                                    background: viewMode === "list" ? "var(--primary)" : "transparent",
                                    color: viewMode === "list" ? "#fff" : "var(--text-secondary)"
                                }}
                            >
                                <FaList /> Lista
                            </button>
                        </div>
                        <button onClick={() => navigate("/disciplinas/novo")} style={styles.primaryButton}>
                            <FaPlus /> Nova Disciplina
                        </button>
                    </div>
                </div>

                {/* Estatísticas Rápidas */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaBook size={24} color="var(--primary)" />
                        <div>
                            <span style={styles.statValue}>{disciplinas.length}</span>
                            <span style={styles.statLabel}>Total de Disciplinas</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaGraduationCap size={24} color="var(--success)" />
                        <div>
                            <span style={styles.statValue}>
                                {disciplinas.filter(d => d.nivel === "fundamental2").length}
                            </span>
                            <span style={styles.statLabel}>Ensino Fundamental II</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaSchool size={24} color="var(--info)" />
                        <div>
                            <span style={styles.statValue}>
                                {disciplinas.filter(d => d.nivel === "medio").length}
                            </span>
                            <span style={styles.statLabel}>Ensino Médio</span>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <FaUsers size={24} color="var(--warning)" />
                        <div>
                            <span style={styles.statValue}>
                                {disciplinas.reduce((acc, d) => acc + d.totalTurmas, 0)}
                            </span>
                            <span style={styles.statLabel}>Total de Turmas</span>
                        </div>
                    </div>
                </div>

                {/* Busca e Filtros */}
                <div style={styles.searchSection}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por nome, código ou descrição..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} style={styles.filterButton}>
                        <FaFilter /> Filtros
                    </button>
                    <div style={styles.sortButtons}>
                        <button onClick={() => handleSort("nome")} style={styles.sortButton}>
                            Nome {getSortIcon("nome")}
                        </button>
                        <button onClick={() => handleSort("cargaHorariaSemanal")} style={styles.sortButton}>
                            Carga Horária {getSortIcon("cargaHorariaSemanal")}
                        </button>
                    </div>
                </div>

                {/* Painel de Filtros */}
                {showFilters && (
                    <div style={styles.filtersPanel}>
                        <select
                            value={filters.area}
                            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todas as áreas</option>
                            {areasConhecimento.map(area => (
                                <option key={area.value} value={area.value}>{area.label}</option>
                            ))}
                        </select>

                        <select
                            value={filters.nivel}
                            onChange={(e) => setFilters({ ...filters, nivel: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todos os níveis</option>
                            <option value="fundamental2">Ensino Fundamental II</option>
                            <option value="medio">Ensino Médio</option>
                        </select>

                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">Todos os status</option>
                            <option value="ativa">Ativa</option>
                            <option value="inativa">Inativa</option>
                            <option value="em_implantacao">Em Implantação</option>
                        </select>

                        <button onClick={() => setFilters({})} style={styles.clearFilters}>
                            Limpar filtros
                        </button>
                    </div>
                )}

                {/* Grid de Cards */}
                <div style={styles.cardsGrid}>
                    {paginatedDisciplinas.map((disciplina) => {
                        const areaInfo = getAreaInfo(disciplina.area);
                        return (
                            <div key={disciplina.id} style={styles.card}>
                                {/* Header do Card */}
                                <div style={styles.cardHeader}>
                                    <div style={{ ...styles.areaIcon, color: areaInfo.cor, background: `${areaInfo.cor}20` }}>
                                        {areaInfo.icon}
                                    </div>
                                    <div style={styles.cardHeaderInfo}>
                                        <h3 style={styles.cardTitle}>{disciplina.nome}</h3>
                                        <span style={styles.cardCode}>{disciplina.codigo}</span>
                                    </div>
                                    {getStatusBadge(disciplina.status)}
                                </div>

                                {/* Descrição */}
                                <p style={styles.cardDesc}>{disciplina.descricao.substring(0, 100)}...</p>

                                {/* Área e Nível */}
                                <div style={styles.cardTags}>
                                    <span style={{ ...styles.tag, background: `${areaInfo.cor}20`, color: areaInfo.cor }}>
                                        {areaInfo.icon} {areaInfo.label}
                                    </span>
                                    <span style={styles.tag}>
                                        {getNivelIcon(disciplina.nivel)} {getNivelLabel(disciplina.nivel)}
                                    </span>
                                </div>

                                {/* Anos de ensino */}
                                <div style={styles.cardAnos}>
                                    <FaCalendarAlt size={12} />
                                    <span>{disciplina.anos.join(" • ")}</span>
                                </div>

                                {/* Carga Horária */}
                                <div style={styles.cardHorario}>
                                    <div style={styles.horarioItem}>
                                        <FaClockIcon size={12} />
                                        <span><strong>{disciplina.cargaHorariaSemanal}h</strong> / semana</span>
                                    </div>
                                    <div style={styles.horarioItem}>
                                        <FaCalendarAlt size={12} />
                                        <span>{disciplina.cargaHorariaAnual}h / ano</span>
                                    </div>
                                </div>

                                {/* Escolas atendidas */}
                                <div style={styles.cardEscolas}>
                                    <FaSchool size={12} />
                                    <span>
                                        {disciplina.escolasAtendidas.length} escola(s): {disciplina.escolasAtendidas.slice(0, 2).join(", ")}
                                        {disciplina.escolasAtendidas.length > 2 && ` +${disciplina.escolasAtendidas.length - 2}`}
                                    </span>
                                </div>

                                {/* Estatísticas */}
                                <div style={styles.cardStats}>
                                    <div style={styles.stat}>
                                        <FaUsers size={14} />
                                        <span>{disciplina.totalTurmas} turmas</span>
                                    </div>
                                    <div style={styles.stat}>
                                        <FaChalkboardTeacher size={14} />
                                        <span>{disciplina.totalProfessores} professores</span>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div style={styles.cardActions}>
                                    <button
                                        onClick={() => navigate(`/disciplinas/${disciplina.id}`)}
                                        style={styles.actionButton}
                                        title="Visualizar"
                                    >
                                        <FaEye /> Ver
                                    </button>
                                    <button
                                        onClick={() => navigate(`/disciplinas/${disciplina.id}/editar`)}
                                        style={styles.actionButton}
                                        title="Editar"
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        style={{ ...styles.actionButton, color: "var(--danger)" }}
                                        title="Excluir"
                                    >
                                        <FaTrash /> Excluir
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {paginatedDisciplinas.length === 0 && (
                    <div style={styles.emptyState}>
                        <FaBook size={48} style={{ color: "var(--text-tertiary)" }} />
                        <h3>Nenhuma disciplina encontrada</h3>
                        <p>Cadastre uma nova disciplina clicando em "Nova Disciplina"</p>
                    </div>
                )}

                {/* Paginação */}
                {totalPages > 1 && (
                    <div style={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            style={styles.paginationButton}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

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
        marginBottom: "16px"
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
        gap: "12px",
        alignItems: "center"
    },
    viewToggle: {
        display: "flex",
        gap: "4px",
        background: "var(--bg-tertiary)",
        padding: "4px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)"
    },
    viewButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s"
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
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
        flexWrap: "wrap"
    },
    searchBox: {
        flex: 1,
        position: "relative",
        minWidth: "250px"
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
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
    },
    sortButtons: {
        display: "flex",
        gap: "8px"
    },
    sortButton: {
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px"
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
        minWidth: "180px"
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
    cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "20px",
        marginBottom: "24px"
    },
    card: {
        background: "var(--card-bg)",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        padding: "20px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer"
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px"
    },
    areaIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px"
    },
    cardHeaderInfo: {
        flex: 1
    },
    cardTitle: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    cardCode: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    cardDesc: {
        fontSize: "13px",
        color: "var(--text-secondary)",
        lineHeight: "1.5",
        marginBottom: "12px"
    },
    cardTags: {
        display: "flex",
        gap: "8px",
        marginBottom: "12px",
        flexWrap: "wrap"
    },
    tag: {
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "500",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px"
    },
    cardAnos: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        marginBottom: "12px",
        padding: "8px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px"
    },
    cardHorario: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        padding: "8px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px"
    },
    horarioItem: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: "var(--text-secondary)"
    },
    cardEscolas: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        marginBottom: "12px"
    },
    cardStats: {
        display: "flex",
        gap: "16px",
        marginBottom: "16px",
        paddingTop: "12px",
        borderTop: "1px solid var(--border-color)"
    },
    stat: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: "var(--text-secondary)"
    },
    cardActions: {
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end",
        paddingTop: "12px",
        borderTop: "1px solid var(--border-color)"
    },
    actionButton: {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
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
        justifyContent: "center"
    }
};