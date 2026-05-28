// import DashboardLayout from "../layouts/DashboardLayout";
// import UsuariosTable from "../components/Usuarios/UsuariosTable";
// import UsuariosHeader from "../components/Usuarios/UsuariosHeader";
// import { useState, useCallback } from "react";

// export default function UsuariosPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState<{ status?: string; tipo?: string }>({});
//   const [stats, setStats] = useState({
//     totalUsuarios: 0,
//     usuariosAtivos: 0,
//     usuariosPorTipo: {
//       GESTOR: 0,
//       PROFISSIONAL: 0,
//       FAMILIA: 0
//     }
//   });

//   // Esta função será chamada pelo UsuariosTable quando os dados forem carregados
//   const handleStatsUpdate = useCallback((newStats: {
//     totalUsuarios: number;
//     usuariosAtivos: number;
//     usuariosPorTipo: {
//       GESTOR: number;
//       PROFISSIONAL: number;
//       FAMILIA: number;
//     };
//   }) => {
//     setStats(newStats);
//   }, []);

//   // Funções de busca e filtro
//   const handleSearch = useCallback((term: string) => {
//     setSearchTerm(term);
//   }, []);

//   const handleFilterChange = useCallback((filter: { status?: string; tipo?: string }) => {
//     setFilters(filter);
//   }, []);

//   return (
//     <DashboardLayout>
//       <UsuariosHeader
//         totalUsuarios={stats.totalUsuarios}
//         usuariosAtivos={stats.usuariosAtivos}
//         usuariosPorTipo={stats.usuariosPorTipo}
//         onSearch={handleSearch}
//         onFilterChange={handleFilterChange}
//       />
//       <UsuariosTable
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
  FaUsers,
  FaSearch,
  FaFilter,
  FaEdit,
  FaBan,
  FaTrash,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaUserPlus,
  FaUserCog,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserTie,
  FaUserFriends,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaUpload,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaKey,
  FaFileAlt,
  FaVideo,
  FaSpinner,
  FaBuilding,
  FaMapMarkerAlt,
  FaStar,
  FaRegStar
} from "react-icons/fa";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: "admin" | "professor" | "interprete" | "aluno";
  status: "ativo" | "inativo" | "bloqueado" | "pendente";
  dataCadastro: string;
  ultimoAcesso: string;
  termosCriados: number;
  termosAssinados: number;
  videosEnviados: number;
  telefone?: string;
  instituicao?: string;
  cidade?: string;
  estado?: string;
  avatar?: string;
  permissoes: string[];
}

interface Filtros {
  tipo: string;
  status: string;
  busca: string;
}

interface Stats {
  total: number;
  ativos: number;
  pendentes: number;
  bloqueados: number;
  totalTermos: number;
  totalVideos: number;
}

export default function GerenciarUsuarios() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    tipo: "",
    status: "",
    busca: ""
  });
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
    key: "nome",
    direction: "asc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    ativos: 0,
    pendentes: 0,
    bloqueados: 0,
    totalTermos: 0,
    totalVideos: 0
  });
  
  const itemsPerPage = 12;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsuarios: Usuario[] = [
        {
          id: "1",
          nome: "Dr. João Silva",
          email: "joao.silva@email.com",
          tipo: "professor",
          status: "ativo",
          dataCadastro: "2024-01-15",
          ultimoAcesso: "2024-02-20 10:15",
          termosCriados: 23,
          termosAssinados: 8,
          videosEnviados: 15,
          telefone: "(11) 98765-4321",
          instituicao: "Universidade Federal do Pará",
          cidade: "Belém",
          estado: "PA",
          permissoes: ["criar_termos", "editar_termos", "enviar_videos"]
        },
        {
          id: "2",
          nome: "Maria Oliveira",
          email: "maria.oliveira@email.com",
          tipo: "interprete",
          status: "ativo",
          dataCadastro: "2024-01-20",
          ultimoAcesso: "2024-02-19 16:45",
          termosCriados: 12,
          termosAssinados: 34,
          videosEnviados: 28,
          telefone: "(11) 97654-3210",
          instituicao: "Universidade do Estado do Pará",
          cidade: "Belém",
          estado: "PA",
          permissoes: ["enviar_videos", "comentar_termos"]
        },
        {
          id: "3",
          nome: "Pedro Santos",
          email: "pedro.santos@email.com",
          tipo: "aluno",
          status: "pendente",
          dataCadastro: "2024-02-01",
          ultimoAcesso: "2024-02-18 09:20",
          termosCriados: 0,
          termosAssinados: 5,
          videosEnviados: 0,
          telefone: "(11) 96543-2109",
          instituicao: "Instituto Federal do Pará",
          cidade: "Tucuruí",
          estado: "PA",
          permissoes: ["visualizar_termos"]
        },
        {
          id: "4",
          nome: "Ana Costa",
          email: "ana.costa@email.com",
          tipo: "professor",
          status: "bloqueado",
          dataCadastro: "2024-01-10",
          ultimoAcesso: "2024-02-15 11:30",
          termosCriados: 8,
          termosAssinados: 15,
          videosEnviados: 12,
          telefone: "(11) 95432-1098",
          instituicao: "Universidade Federal Rural da Amazônia",
          cidade: "Belém",
          estado: "PA",
          permissoes: ["criar_termos", "editar_termos"]
        },
        {
          id: "5",
          nome: "Carlos Ferreira",
          email: "carlos.ferreira@email.com",
          tipo: "aluno",
          status: "inativo",
          dataCadastro: "2024-01-05",
          ultimoAcesso: "2024-02-10 13:45",
          termosCriados: 0,
          termosAssinados: 3,
          videosEnviados: 0,
          telefone: "(11) 94321-0987",
          instituicao: "Universidade Federal do Pará",
          cidade: "Santarém",
          estado: "PA",
          permissoes: ["visualizar_termos"]
        },
        {
          id: "6",
          nome: "Admin Sistema",
          email: "admin@sistema.com",
          tipo: "admin",
          status: "ativo",
          dataCadastro: "2024-01-01",
          ultimoAcesso: "2024-02-20 14:30",
          termosCriados: 45,
          termosAssinados: 12,
          videosEnviados: 30,
          instituicao: "LibrasQR",
          cidade: "Belém",
          estado: "PA",
          permissoes: ["*"]
        },
        {
          id: "7",
          nome: "Patrícia Lima",
          email: "patricia.lima@email.com",
          tipo: "interprete",
          status: "ativo",
          dataCadastro: "2024-01-25",
          ultimoAcesso: "2024-02-19 08:30",
          termosCriados: 5,
          termosAssinados: 28,
          videosEnviados: 22,
          telefone: "(91) 98765-1234",
          instituicao: "IFPA - Campus Belém",
          cidade: "Belém",
          estado: "PA",
          permissoes: ["enviar_videos", "comentar_termos"]
        },
        {
          id: "8",
          nome: "Roberto Alves",
          email: "roberto.alves@email.com",
          tipo: "professor",
          status: "ativo",
          dataCadastro: "2024-01-18",
          ultimoAcesso: "2024-02-18 15:20",
          termosCriados: 18,
          termosAssinados: 22,
          videosEnviados: 10,
          telefone: "(94) 98765-4321",
          instituicao: "UFPA - Campus Tucuruí",
          cidade: "Tucuruí",
          estado: "PA",
          permissoes: ["criar_termos", "editar_termos", "enviar_videos"]
        }
      ];
      
      setUsuarios(mockUsuarios);
      
      setStats({
        total: mockUsuarios.length,
        ativos: mockUsuarios.filter(u => u.status === "ativo").length,
        pendentes: mockUsuarios.filter(u => u.status === "pendente").length,
        bloqueados: mockUsuarios.filter(u => u.status === "bloqueado").length,
        totalTermos: mockUsuarios.reduce((acc, u) => acc + u.termosCriados + u.termosAssinados, 0),
        totalVideos: mockUsuarios.reduce((acc, u) => acc + u.videosEnviados, 0)
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
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

  const filteredUsers = usuarios
    .filter(user => {
      const matchesBusca = !filtros.busca || 
        user.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        user.email.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        user.instituicao?.toLowerCase().includes(filtros.busca.toLowerCase());
      
      const matchesTipo = !filtros.tipo || user.tipo === filtros.tipo;
      const matchesStatus = !filtros.status || user.status === filtros.status;
      
      return matchesBusca && matchesTipo && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Usuario];
      const bValue = b[sortConfig.key as keyof Usuario];
      
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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTipoIcon = (tipo: string) => {
    const icons = {
      admin: <FaUserCog />,
      professor: <FaChalkboardTeacher />,
      interprete: <FaUserTie />,
      aluno: <FaUserGraduate />
    };
    return icons[tipo as keyof typeof icons] || <FaUserFriends />;
  };

  const getTipoLabel = (tipo: string): string => {
    const labels: Record<string, string> = {
      admin: "Administrador",
      professor: "Professor",
      interprete: "Intérprete",
      aluno: "Aluno"
    };
    return labels[tipo] || tipo;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      ativo: { bg: "var(--success-light)", color: "var(--success)", icon: <FaUserCheck />, label: "Ativo" },
      inativo: { bg: "var(--text-tertiary)20", color: "var(--text-tertiary)", icon: <FaUserClock />, label: "Inativo" },
      bloqueado: { bg: "var(--danger-light)", color: "var(--danger)", icon: <FaUserTimes />, label: "Bloqueado" },
      pendente: { bg: "var(--warning-light)", color: "var(--warning)", icon: <FaClock />, label: "Pendente" }
    };
    
    const style = styles[status as keyof typeof styles] || styles.pendente;
    
    return (
      <span style={{
        background: style.bg,
        color: style.color,
        padding: '4px 8px',
        borderRadius: 12,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12
      }}>
        {style.icon} {style.label}
      </span>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Carregando usuários...</p>
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
            <h1 style={styles.title}>Gerenciar Usuários</h1>
            <p style={styles.subtitle}>
              Gerencie todos os usuários da plataforma e acompanhe suas contribuições
            </p>
          </div>

          <div style={styles.headerActions}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={styles.filterButton}
            >
              <FaFilter /> Filtros
            </button>
            <button
              onClick={() => navigate("/usuarios/novo")}
              style={styles.primaryButton}
            >
              <FaUserPlus /> Novo Usuário
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <FaUsers size={24} color="var(--primary)" />
            <div><span style={styles.statValue}>{stats.total}</span><span style={styles.statLabel}>Usuários</span></div>
          </div>
          <div style={styles.statCard}>
            <FaUserCheck size={24} color="var(--success)" />
            <div><span style={styles.statValue}>{stats.ativos}</span><span style={styles.statLabel}>Ativos</span></div>
          </div>
          <div style={styles.statCard}>
            <FaFileAlt size={24} color="var(--info)" />
            <div><span style={styles.statValue}>{stats.totalTermos}</span><span style={styles.statLabel}>Termos</span></div>
          </div>
          <div style={styles.statCard}>
            <FaVideo size={24} color="var(--warning)" />
            <div><span style={styles.statValue}>{stats.totalVideos}</span><span style={styles.statLabel}>Vídeos</span></div>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div style={styles.filtersPanel}>
            <div style={styles.filtersGrid}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Buscar</label>
                <div style={styles.searchBox}>
                  <FaSearch style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Nome, email ou instituição..."
                    value={filtros.busca}
                    onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                    style={styles.searchInput}
                  />
                </div>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Tipo</label>
                <select
                  value={filtros.tipo}
                  onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">Todos</option>
                  <option value="admin">Administrador</option>
                  <option value="professor">Professor</option>
                  <option value="interprete">Intérprete</option>
                  <option value="aluno">Aluno</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Status</label>
                <select
                  value={filtros.status}
                  onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="bloqueado">Bloqueado</option>
                  <option value="pendente">Pendente</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Ordenar por</label>
                <div style={styles.sortButtons}>
                  <button onClick={() => handleSort("nome")} style={{ ...styles.sortButton, background: sortConfig.key === "nome" ? "var(--primary-soft)" : "transparent" }}>
                    Nome {getSortIcon("nome")}
                  </button>
                  <button onClick={() => handleSort("termosCriados")} style={{ ...styles.sortButton, background: sortConfig.key === "termosCriados" ? "var(--primary-soft)" : "transparent" }}>
                    Termos {getSortIcon("termosCriados")}
                  </button>
                  <button onClick={() => handleSort("videosEnviados")} style={{ ...styles.sortButton, background: sortConfig.key === "videosEnviados" ? "var(--primary-soft)" : "transparent" }}>
                    Vídeos {getSortIcon("videosEnviados")}
                  </button>
                </div>
              </div>
            </div>

            <div style={styles.filterActions}>
              <button
                onClick={() => setFiltros({ tipo: "", status: "", busca: "" })}
                style={styles.clearButton}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Grid de Cards */}
        <div style={styles.cardsGrid}>
          {paginatedUsers.map((user) => (
            <div key={user.id} style={styles.userCard}>
              {/* Card Header */}
              <div style={styles.cardHeader}>
                <div style={styles.userAvatar}>
                  <div style={styles.avatarPlaceholder(user.tipo)}>
                    {user.nome.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div style={styles.userHeaderInfo}>
                  <h3 style={styles.userName}>{user.nome}</h3>
                  <div style={styles.userType}>
                    {getTipoIcon(user.tipo)}
                    <span>{getTipoLabel(user.tipo)}</span>
                  </div>
                </div>
                {getStatusBadge(user.status)}
              </div>

              {/* Informações de Contato */}
              <div style={styles.cardSection}>
                <div style={styles.infoRow}>
                  <FaEnvelope size={12} color="var(--text-tertiary)" />
                  <span>{user.email}</span>
                </div>
                {user.telefone && (
                  <div style={styles.infoRow}>
                    <FaPhone size={12} color="var(--text-tertiary)" />
                    <span>{user.telefone}</span>
                  </div>
                )}
                {user.instituicao && (
                  <div style={styles.infoRow}>
                    <FaBuilding size={12} color="var(--text-tertiary)" />
                    <span>{user.instituicao}</span>
                  </div>
                )}
                {user.cidade && (
                  <div style={styles.infoRow}>
                    <FaMapMarkerAlt size={12} color="var(--text-tertiary)" />
                    <span>{user.cidade}/{user.estado}</span>
                  </div>
                )}
              </div>

              {/* Estatísticas de Contribuições */}
              <div style={styles.cardStats}>
                <div style={styles.statItem}>
                  <FaFileAlt size={16} color="var(--primary)" />
                  <div>
                    <span style={styles.statNumber}>{user.termosCriados}</span>
                    <span style={styles.statText}>Termos Criados</span>
                  </div>
                </div>
                <div style={styles.statItem}>
                  <FaCheckCircle size={16} color="var(--success)" />
                  <div>
                    <span style={styles.statNumber}>{user.termosAssinados}</span>
                    <span style={styles.statText}>Termos Assinados</span>
                  </div>
                </div>
                <div style={styles.statItem}>
                  <FaVideo size={16} color="var(--warning)" />
                  <div>
                    <span style={styles.statNumber}>{user.videosEnviados}</span>
                    <span style={styles.statText}>Vídeos Enviados</span>
                  </div>
                </div>
              </div>

              {/* Último Acesso */}
              <div style={styles.lastAccessSection}>
                <FaClock size={12} color="var(--text-tertiary)" />
                <span>Último acesso: {user.ultimoAcesso}</span>
              </div>

              {/* Card Actions */}
              <div style={styles.cardActions}>
                <button
                  onClick={() => navigate(`/usuarios/${user.id}`)}
                  style={styles.actionButton}
                  title="Visualizar"
                >
                  <FaEye /> Ver
                </button>
                <button
                  onClick={() => navigate(`/usuarios/${user.id}/editar`)}
                  style={styles.actionButton}
                  title="Editar"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => {/* Resetar senha */}}
                  style={styles.actionButton}
                  title="Resetar Senha"
                >
                  <FaKey /> Senha
                </button>
                <button
                  onClick={() => {/* Bloquear/Desbloquear */}}
                  style={{ ...styles.actionButton, color: user.status === "bloqueado" ? "var(--success)" : "var(--warning)" }}
                  title={user.status === "bloqueado" ? "Desbloquear" : "Bloquear"}
                >
                  {user.status === "bloqueado" ? <FaUserCheck /> : <FaBan />} {user.status === "bloqueado" ? "Desbloquear" : "Bloquear"}
                </button>
                <button
                  onClick={() => {/* Excluir */}}
                  style={{ ...styles.actionButton, color: "var(--danger)" }}
                  title="Excluir"
                >
                  <FaTrash /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {paginatedUsers.length === 0 && (
          <div style={styles.emptyState}>
            <FaUsers size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
            <h3 style={styles.emptyTitle}>Nenhum usuário encontrado</h3>
            <p style={styles.emptyText}>Tente ajustar seus filtros ou criar um novo usuário.</p>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={styles.paginationButton(currentPage === 1)}
            >
              <FaChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={styles.paginationButton(false, currentPage === page)}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={styles.paginationButton(currentPage === totalPages)}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

const styles: Record<string, any> = {
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
    cursor: "pointer"
  },
  filterButton: {
    padding: "10px 20px",
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
  filtersPanel: {
    background: "var(--bg-tertiary)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px"
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "16px"
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  filterLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "var(--text-tertiary)"
  },
  searchBox: {
    position: "relative"
  },
  searchIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-tertiary)",
    fontSize: "14px"
  },
  searchInput: {
    width: "100%",
    padding: "10px 10px 10px 32px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none"
  },
  filterSelect: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "13px"
  },
  sortButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  sortButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  filterActions: {
    display: "flex",
    justifyContent: "flex-end",
    borderTop: "1px solid var(--border-color)",
    paddingTop: "16px"
  },
  clearButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "13px",
    cursor: "pointer"
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
  },
  userCard: {
    background: "var(--card-bg)",
    borderRadius: "16px",
    border: "1px solid var(--border-color)",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  cardHeader: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: "1px solid var(--border-color)",
    background: "var(--bg-tertiary)"
  },
  userAvatar: {
    flexShrink: 0
  },
  avatarPlaceholder: (tipo: string) => ({
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "600",
    background: `var(--${tipo}-light)`,
    color: `var(--${tipo})`
  }),
  userHeaderInfo: {
    flex: 1
  },
  userName: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "4px"
  },
  userType: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 8px",
    borderRadius: "20px",
    background: "var(--bg-secondary)",
    fontSize: "11px",
    fontWeight: "500",
    color: "var(--text-secondary)"
  },
  statusBadge: (bg: string, color: string) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    background: bg,
    color: color
  }),
  cardSection: {
    padding: "12px 16px",
    borderBottom: "1px solid var(--border-color)",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "var(--text-secondary)"
  },
  cardStats: {
    padding: "12px 16px",
    borderBottom: "1px solid var(--border-color)",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px"
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textAlign: "center"
  },
  statNumber: {
    display: "block",
    fontSize: "16px",
    fontWeight: "700",
    color: "var(--text-primary)"
  },
  statText: {
    display: "block",
    fontSize: "10px",
    color: "var(--text-tertiary)"
  },
  lastAccessSection: {
    padding: "10px 16px",
    borderBottom: "1px solid var(--border-color)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  cardActions: {
    padding: "12px 16px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "8px"
  },
  actionButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s"
  },
  emptyState: {
    textAlign: "center",
    padding: "48px",
    color: "var(--text-tertiary)"
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
    gap: "8px",
    marginTop: "24px"
  },
  paginationButton: (disabled: boolean = false, active: boolean = false) => ({
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: active ? "var(--primary)" : "transparent",
    color: active ? "#fff" : disabled ? "var(--text-tertiary)" : "var(--text-secondary)",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1
  })
};

// Adicionar keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .action-button:hover { background: var(--primary-soft); color: var(--primary); border-color: var(--primary); }
  .user-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
`;
document.head.appendChild(style);