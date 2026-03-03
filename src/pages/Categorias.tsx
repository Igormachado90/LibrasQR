// import DashboardLayout from "../layouts/DashboardLayout";
// import AvaliacoesTable from "../components/Avaliacoes/AvaliacoesTable";
// import AvaliacoesHeader from "../components/Avaliacoes/AvaliacoesHeader";
// import { useState } from "react";

// export default function AvaliacoesPage() {
//     const [aulas, setAulas] = useState<any[]>([]);
//     const [totalAvaliacoes, setTotalAvaliacoes] = useState<number>(0);
//     const [mediaGeral, setMediaGeral] = useState<number>(0);
//     const [avaliacoesPorStatus, setAvaliacoesPorStatus] = useState({
//         positivas: 0,
//         neutras: 0,
//         negativas: 0
//     });
//     const [professoresAvaliados, setProfessoresAvaliados] = useState<number>(0);
//     const [aulasAvaliadas, setAulasAvaliadas] = useState<number>(0);
//     const [professores, setProfessores] = useState<any[]>([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filters, setFilters] = useState<any>({});

//     const handleSearch = (term: string) => {
//         setSearchTerm(term);
//     };

//     const handleFilterChange = (filter: any) => {
//         setFilters((prev: any) => ({ ...prev, ...filter }));
//     };

//     return (
//         <DashboardLayout>
//             <AvaliacoesHeader
//                 totalAvaliacoes={totalAvaliacoes}
//                 mediaGeral={mediaGeral}
//                 avaliacoesPorStatus={avaliacoesPorStatus}
//                 professoresAvaliados={professoresAvaliados}
//                 aulasAvaliadas={aulasAvaliadas}
//                 onSearch={handleSearch}
//                 onFilterChange={handleFilterChange}
//                 professores={professores}
//                 aulas={aulas}
//             />
//             <AvaliacoesTable 
//                 searchTerm={searchTerm}
//                 filters={filters}
//                 onUpdateStats={(stats) => {
//                     setTotalAvaliacoes(stats.totalAvaliacoes);
//                     setMediaGeral(stats.mediaGeral);
//                     setAvaliacoesPorStatus(stats.avaliacoesPorStatus);
//                     setProfessoresAvaliados(stats.professoresAvaliados);
//                     setAulasAvaliadas(stats.aulasAvaliadas);
//                 }}
//                 onUpdateProfessores={setProfessores}
//                 onUpdateAulas={setAulas}
//             />
//         </DashboardLayout>
//     );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaFolder,
  FaFolderOpen,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaVideo,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from "react-icons/fa";

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  icone: string;
  termosCount: number;
  videosCount: number;
  visualizacoes: number;
  status: "ativo" | "inativo" | "rascunho";
  dataCriacao: string;
  ultimaAtualizacao: string;
  criadoPor: string;
}

interface FormCategoria {
  nome: string;
  descricao: string;
  cor: string;
  icone: string;
  status: "ativo" | "inativo" | "rascunho";
}

interface FormErrors {
  nome?: string;
  descricao?: string;
}

export default function GerenciarCategorias() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormCategoria>({
    nome: "",
    descricao: "",
    cor: "#2563eb",
    icone: "📁",
    status: "ativo"
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "nome",
    direction: "asc" as "asc" | "desc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const cores = [
    "#2563eb", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", 
    "#ef4444", "#14b8a6", "#f97316", "#6b7280", "#8b5cf6"
  ];

  const icones = [
    "📁", "📂", "📚", "🎓", "🏥", "⚖️", "💻", "🎨", "🚑", "📝"
  ];

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockCategorias: Categoria[] = [
    {
        id: "1",
        nome: "Conceitos Fundamentais",
        descricao: "Termos básicos da programação: algoritmos, variáveis, constantes, tipos de dados",
        cor: "#2563eb",
        icone: "🧠",
        termosCount: 38,
        videosCount: 28,
        visualizacoes: 1542,
        status: "ativo",
        dataCriacao: "2024-01-15",
        ultimaAtualizacao: "2024-02-20",
        criadoPor: "Admin"
    },
    {
        id: "2",
        nome: "Estruturas de Controle",
        descricao: "Comandos condicionais (if/else, switch) e estruturas de repetição (for, while)",
        cor: "#10b981",
        icone: "⚙️",
        termosCount: 32,
        videosCount: 24,
        visualizacoes: 1243,
        status: "ativo",
        dataCriacao: "2024-01-15",
        ultimaAtualizacao: "2024-02-19",
        criadoPor: "Admin"
    },
    {
        id: "3",
        nome: "Estruturas de Dados",
        descricao: "Vetores, matrizes, listas, pilhas, filas e árvores",
        cor: "#8b5cf6",
        icone: "📊",
        termosCount: 28,
        videosCount: 22,
        visualizacoes: 1120,
        status: "ativo",
        dataCriacao: "2024-01-16",
        ultimaAtualizacao: "2024-02-18",
        criadoPor: "Admin"
    },
    {
        id: "4",
        nome: "Programação Orientada a Objetos",
        descricao: "Classes, objetos, herança, polimorfismo, encapsulamento e abstração",
        cor: "#f59e0b",
        icone: "🔷",
        termosCount: 35,
        videosCount: 30,
        visualizacoes: 1876,
        status: "ativo",
        dataCriacao: "2024-01-20",
        ultimaAtualizacao: "2024-02-17",
        criadoPor: "Admin"
    },
    {
        id: "5",
        nome: "Funções e Modularização",
        descricao: "Procedimentos, funções, parâmetros, retorno, escopo e recursividade",
        cor: "#ec4899",
        icone: "🔄",
        termosCount: 25,
        videosCount: 20,
        visualizacoes: 987,
        status: "ativo",
        dataCriacao: "2024-01-22",
        ultimaAtualizacao: "2024-02-16",
        criadoPor: "Admin"
    },
    {
        id: "6",
        nome: "Algoritmos de Ordenação",
        descricao: "Bubble sort, insertion sort, selection sort, merge sort, quick sort",
        cor: "#ef4444",
        icone: "📋",
        termosCount: 18,
        videosCount: 16,
        visualizacoes: 876,
        status: "ativo",
        dataCriacao: "2024-01-24",
        ultimaAtualizacao: "2024-02-15",
        criadoPor: "Admin"
    },
    {
        id: "7",
        nome: "Algoritmos de Busca",
        descricao: "Busca linear, busca binária, busca em profundidade, busca em largura",
        cor: "#14b8a6",
        icone: "🔍",
        termosCount: 16,
        videosCount: 14,
        visualizacoes: 765,
        status: "ativo",
        dataCriacao: "2024-01-26",
        ultimaAtualizacao: "2024-02-14",
        criadoPor: "Admin"
    },
    {
        id: "8",
        nome: "Linguagens de Programação",
        descricao: "Sintaxe, compiladores, interpretadores, paradigmas: imperativo, funcional, declarativo",
        cor: "#a855f7",
        icone: "💻",
        termosCount: 22,
        videosCount: 18,
        visualizacoes: 934,
        status: "ativo",
        dataCriacao: "2024-01-28",
        ultimaAtualizacao: "2024-02-13",
        criadoPor: "Admin"
    },
    {
        id: "9",
        nome: "Banco de Dados",
        descricao: "SQL, consultas, tabelas, relacionamentos, chaves, índices e normalização",
        cor: "#06b6d4",
        icone: "🗄️",
        termosCount: 30,
        videosCount: 24,
        visualizacoes: 1102,
        status: "rascunho",
        dataCriacao: "2024-01-30",
        ultimaAtualizacao: "2024-02-12",
        criadoPor: "Admin"
    },
    {
        id: "10",
        nome: "Boas Práticas",
        descricao: "Clean code, refatoração, padrões de projeto, testes, documentação",
        cor: "#f97316",
        icone: "✅",
        termosCount: 27,
        videosCount: 19,
        visualizacoes: 843,
        status: "inativo",
        dataCriacao: "2024-02-01",
        ultimaAtualizacao: "2024-02-11",
        criadoPor: "Admin"
    }
];
      
      setCategorias(mockCategorias);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
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

  const filteredCategorias = categorias
    .filter(cat => {
      const matchesSearch = cat.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cat.descricao.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filtroStatus || cat.status === filtroStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Categoria];
      const bValue = b[sortConfig.key as keyof Categoria];
      
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

  const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);
  const paginatedCategorias = filteredCategorias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (categoria?: Categoria) => {
    if (categoria) {
      setEditingId(categoria.id);
      setFormData({
        nome: categoria.nome,
        descricao: categoria.descricao,
        cor: categoria.cor,
        icone: categoria.icone,
        status: categoria.status
      });
    } else {
      setEditingId(null);
      setFormData({
        nome: "",
        descricao: "",
        cor: "#2563eb",
        icone: "📁",
        status: "ativo"
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleSave = () => {
    const errors: FormErrors = {};
    
    if (!formData.nome.trim()) {
      errors.nome = "Nome é obrigatório";
    }
    if (!formData.descricao.trim()) {
      errors.descricao = "Descrição é obrigatória";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    console.log("Salvando categoria:", editingId ? "editando" : "nova", formData);
    
    // Simular salvamento
    setTimeout(() => {
      setShowModal(false);
      // Aqui faria a chamada API
    }, 500);
  };

  const handleDelete = (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${nome}"?`)) {
      console.log("Excluir categoria:", id);
      // Aqui faria a chamada API
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFiltroStatus("");
    setSortConfig({ key: "nome", direction: "asc" });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={{ color: "var(--text-tertiary)" }}>Carregando categorias...</p>
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
            <h1 style={styles.title}>Gerenciar Categorias</h1>
            <p style={styles.subtitle}>
              Organize os termos em categorias para facilitar a busca
            </p>
          </div>

          <div style={styles.headerActions}>
            <div style={styles.searchBox}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={styles.searchInput}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={styles.filterButton}
            >
              <FaFilter /> Filtros
            </button>
            <button
              onClick={() => handleOpenModal()}
              style={styles.primaryButton}
            >
              <FaPlus /> Nova Categoria
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <StatCard
            icon={<FaFolder />}
            label="Total de Categorias"
            value={categorias.length}
            color="var(--primary)"
            bgColor="var(--primary-soft)"
          />
          <StatCard
            icon={<FaCheckCircle />}
            label="Categorias Ativas"
            value={categorias.filter(c => c.status === "ativo").length}
            color="var(--success)"
            bgColor="var(--success-light)"
          />
          <StatCard
            icon={<FaExclamationTriangle />}
            label="Categorias Inativas"
            value={categorias.filter(c => c.status === "inativo").length}
            color="var(--warning)"
            bgColor="var(--warning-light)"
          />
          <StatCard
            icon={<FaFileAlt />}
            label="Total de Termos"
            value={categorias.reduce((acc, cat) => acc + cat.termosCount, 0)}
            color="var(--info)"
            bgColor="var(--info-light)"
          />
        </div>

        {/* Painel de Filtros */}
        {showFilters && (
          <div style={styles.filtersPanel}>
            <div style={styles.filtersGrid}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Status</label>
                <select
                  value={filtroStatus}
                  onChange={(e) => {
                    setFiltroStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={styles.filterSelect}
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Ordenar por</label>
                <select
                  value={sortConfig.key}
                  onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })}
                  style={styles.filterSelect}
                >
                  <option value="nome">Nome</option>
                  <option value="termosCount">Termos</option>
                  <option value="videosCount">Vídeos</option>
                  <option value="visualizacoes">Visualizações</option>
                  <option value="dataCriacao">Data de criação</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Direção</label>
                <select
                  value={sortConfig.direction}
                  onChange={(e) => setSortConfig({ key: sortConfig.key, direction: e.target.value as "asc" | "desc" })}
                  style={styles.filterSelect}
                >
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>
            </div>

            <div style={styles.filterActions}>
              <button
                onClick={handleClearFilters}
                style={styles.clearButton}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Grid de Categorias */}
        {paginatedCategorias.length === 0 ? (
          <div style={styles.emptyState}>
            <FaFolder size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
            <h3 style={styles.emptyTitle}>Nenhuma categoria encontrada</h3>
            <p style={styles.emptyText}>
              {searchTerm || filtroStatus 
                ? "Tente ajustar seus filtros" 
                : "Clique em 'Nova Categoria' para começar"}
            </p>
          </div>
        ) : (
          <div style={styles.categoriasGrid}>
            {paginatedCategorias.map((categoria) => (
              <div
                key={categoria.id}
                style={styles.categoriaCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--card-shadow)";
                }}
              >
                <div style={{
                  ...styles.categoriaHeader,
                  borderBottomColor: categoria.cor
                }}>
                  <div style={styles.categoriaIconWrapper}>
                    <span style={styles.categoriaIcon}>{categoria.icone}</span>
                  </div>
                  <div style={styles.categoriaTitleSection}>
                    <h3 style={styles.categoriaNome}>{categoria.nome}</h3>
                    <span style={{
                      ...styles.statusBadge,
                      background: categoria.status === "ativo" ? "var(--success-light)" : "var(--text-tertiary)20",
                      color: categoria.status === "ativo" ? "var(--success)" : "var(--text-tertiary)"
                    }}>
                      {categoria.status}
                    </span>
                  </div>
                </div>

                <div style={styles.categoriaBody}>
                  <p style={styles.categoriaDescricao}>{categoria.descricao}</p>
                  
                  <div style={styles.categoriaStats}>
                    <div style={styles.statRow}>
                      <FaFileAlt size={12} />
                      <span>{categoria.termosCount} termos</span>
                    </div>
                    <div style={styles.statRow}>
                      <FaVideo size={12} />
                      <span>{categoria.videosCount} vídeos</span>
                    </div>
                    <div style={styles.statRow}>
                      <FaEye size={12} />
                      <span>{categoria.visualizacoes} visualizações</span>
                    </div>
                  </div>

                  <div style={styles.categoriaMeta}>
                    <span>Criado em: {categoria.dataCriacao}</span>
                    <span>por {categoria.criadoPor}</span>
                  </div>
                </div>

                <div style={styles.categoriaActions}>
                  <button
                    onClick={() => navigate(`/categorias/${categoria.id}/termos`)}
                    style={styles.actionButton}
                    title="Ver termos"
                  >
                    <FaFolderOpen />
                  </button>
                  <button
                    onClick={() => handleOpenModal(categoria)}
                    style={styles.actionButton}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id, categoria.nome)}
                    style={{ ...styles.actionButton, color: "var(--danger)" }}
                    title="Excluir"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
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

        {/* Modal de Categoria */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>
                  {editingId ? "Editar Categoria" : "Nova Categoria"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  style={styles.closeButton}
                >
                  <FaTimes />
                </button>
              </div>

              <div style={styles.modalBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nome da Categoria *</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => {
                      setFormData({ ...formData, nome: e.target.value });
                      if (formErrors.nome) {
                        setFormErrors({ ...formErrors, nome: undefined });
                      }
                    }}
                    placeholder="Ex: Educação"
                    style={{
                      ...styles.input,
                      borderColor: formErrors.nome ? "var(--danger)" : "var(--border-color)"
                    }}
                  />
                  {formErrors.nome && (
                    <span style={styles.errorText}>{formErrors.nome}</span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Descrição *</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => {
                      setFormData({ ...formData, descricao: e.target.value });
                      if (formErrors.descricao) {
                        setFormErrors({ ...formErrors, descricao: undefined });
                      }
                    }}
                    placeholder="Descreva o propósito desta categoria"
                    rows={3}
                    style={{
                      ...styles.textarea,
                      borderColor: formErrors.descricao ? "var(--danger)" : "var(--border-color)"
                    }}
                  />
                  {formErrors.descricao && (
                    <span style={styles.errorText}>{formErrors.descricao}</span>
                  )}
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Cor</label>
                    <div style={styles.colorPicker}>
                      {cores.map(cor => (
                        <button
                          key={cor}
                          onClick={() => setFormData({ ...formData, cor })}
                          style={{
                            ...styles.colorOption,
                            background: cor,
                            border: formData.cor === cor ? "3px solid var(--primary)" : "none"
                          }}
                          title={cor}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Ícone</label>
                    <div style={styles.iconPicker}>
                      {icones.map(icone => (
                        <button
                          key={icone}
                          onClick={() => setFormData({ ...formData, icone })}
                          style={{
                            ...styles.iconOption,
                            background: formData.icone === icone ? "var(--primary-soft)" : "transparent",
                            border: formData.icone === icone ? "2px solid var(--primary)" : "1px solid var(--border-color)"
                          }}
                        >
                          {icone}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "ativo" | "inativo" })}
                    style={styles.select}
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  onClick={() => setShowModal(false)}
                  style={styles.secondaryButton}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  style={styles.primaryButton}
                  disabled={!formData.nome.trim() || !formData.descricao.trim()}
                >
                  <FaSave /> Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animações CSS */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </DashboardLayout>
  );
}

// Componente StatCard
function StatCard({ icon, label, value, color, bgColor }: any) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statCardContent}>
        <div>
          <div style={styles.statLabel}>{label}</div>
          <div style={styles.statValue}>{value}</div>
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
  container: {
    animation: "fadeIn 0.5s ease-out",
    padding: "0 24px"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column" as const,
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
    flexWrap: "wrap" as const,
    gap: "16px"
  },
  headerActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
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
    alignItems: "center"
  },
  statLabel: {
    fontSize: "14px",
    color: "var(--text-tertiary)",
    marginBottom: "8px"
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "var(--text-primary)"
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px"
  },
  filterButton: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "var(--text-secondary)",
    transition: "all 0.2s"
  },
  primaryButton: {
    padding: "8px 16px",
    background: "var(--primary)",
    border: "none",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#fff",
    transition: "background-color 0.2s"
  },
  secondaryButton: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "var(--text-secondary)",
    transition: "all 0.2s"
  },
  filtersPanel: {
    background: "var(--card-bg)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px",
    border: "1px solid var(--border-color)",
    boxShadow: "var(--card-shadow)"
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "16px"
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px"
  },
  filterLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "var(--text-tertiary)"
  },
  searchBox: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    minWidth: "250px"
  },
  searchIcon: {
    position: "absolute" as const,
    left: "10px",
    color: "var(--text-tertiary)",
    fontSize: "14px"
  },
  searchInput: {
    width: "100%",
    padding: "8px 8px 8px 32px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none"
  },
  filterSelect: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none"
  },
  filterDate: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "14px"
  },
  filterActions: {
    display: "flex",
    justifyContent: "flex-end",
    borderTop: "1px solid var(--border-color)",
    paddingTop: "16px"
  },
  clearButton: {
    padding: "6px 12px",
    background: "transparent",
    border: "none",
    color: "var(--primary)",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  categoriasGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
  },
  categoriaCard: {
    background: "var(--card-bg)",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
    overflow: "hidden",
    transition: "all 0.2s",
    cursor: "pointer"
  },
  categoriaHeader: {
    padding: "16px",
    borderBottom: "3px solid",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  categoriaIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "var(--bg-tertiary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px"
  },
  categoriaTitleSection: {
    flex: 1
  },
  categoriaNome: {
    margin: "0 0 4px",
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary)"
  },
  statusBadge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "capitalize" as const
  },
  categoriaBody: {
    padding: "16px"
  },
  categoriaDescricao: {
    margin: "0 0 12px",
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: "1.5"
  },
  categoriaStats: {
    display: "flex",
    gap: "16px",
    marginBottom: "12px",
    fontSize: "12px",
    color: "var(--text-tertiary)"
  },
  statRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  categoriaMeta: {
    fontSize: "11px",
    color: "var(--text-tertiary)",
    display: "flex",
    justifyContent: "space-between"
  },
  categoriaActions: {
    display: "flex",
    gap: "8px",
    padding: "12px 16px",
    borderTop: "1px solid var(--border-color)",
    background: "var(--bg-tertiary)"
  },
  actionButton: {
    padding: "6px",
    background: "transparent",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "var(--text-secondary)",
    fontSize: "14px",
    transition: "all 0.2s"
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "48px 24px",
    background: "var(--card-bg)",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
    marginBottom: "24px"
  },
  emptyTitle: {
    fontSize: "18px",
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
    transition: "all 0.2s"
  },
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "var(--card-bg)",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "var(--card-shadow-hover)"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid var(--border-color)"
  },
  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "var(--text-primary)"
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "var(--text-tertiary)"
  },
  modalBody: {
    padding: "24px"
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "20px 24px",
    borderTop: "1px solid var(--border-color)"
  },
  formGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-primary)",
    marginBottom: "6px"
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "14px",
    resize: "vertical" as const,
    outline: "none",
    fontFamily: "inherit"
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  colorPicker: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    marginTop: "4px"
  },
  colorOption: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s"
  },
  iconPicker: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    marginTop: "4px"
  },
  iconOption: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    background: "transparent"
  },
  errorText: {
    color: "var(--danger)",
    fontSize: "12px",
    marginTop: "4px",
    display: "block"
  }
};