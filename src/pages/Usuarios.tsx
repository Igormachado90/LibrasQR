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
  FaVideo
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
  avatar?: string;
  permissoes: string[];
}

interface Filtros {
  tipo: string;
  status: string;
  dataInicio: string;
  dataFim: string;
  busca: string;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface Stats {
  total: number;
  ativos: number;
  pendentes: number;
  bloqueados: number;
}

export default function GerenciarUsuarios() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    tipo: "",
    status: "",
    dataInicio: "",
    dataFim: "",
    busca: ""
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "nome",
    direction: "asc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    ativos: 0,
    pendentes: 0,
    bloqueados: 0
  });
  
  const itemsPerPage = 10;

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
          instituicao: "Universidade Federal de Pará",
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
          instituicao: "Universidade Estado de Pará",
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
          instituicao: "Universidade Estado do Pará",
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
          permissoes: ["*"]
        }
      ];
      
      setUsuarios(mockUsuarios);
      
      setStats({
        total: mockUsuarios.length,
        ativos: mockUsuarios.filter(u => u.status === "ativo").length,
        pendentes: mockUsuarios.filter(u => u.status === "pendente").length,
        bloqueados: mockUsuarios.filter(u => u.status === "bloqueado").length
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
        user.email.toLowerCase().includes(filtros.busca.toLowerCase());
      
      const matchesTipo = !filtros.tipo || user.tipo === filtros.tipo;
      const matchesStatus = !filtros.status || user.status === filtros.status;
      
      const matchesData = (!filtros.dataInicio || user.dataCadastro >= filtros.dataInicio) &&
                         (!filtros.dataFim || user.dataCadastro <= filtros.dataFim);
      
      return matchesBusca && matchesTipo && matchesStatus && matchesData;
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

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    }
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;
    
    const confirmMessages = {
      ativar: `Ativar ${selectedUsers.length} usuário(s)?`,
      bloquear: `Bloquear ${selectedUsers.length} usuário(s)?`,
      excluir: `Tem certeza que deseja excluir ${selectedUsers.length} usuário(s)?`
    };
    
    if (window.confirm(confirmMessages[action as keyof typeof confirmMessages])) {
      console.log(`${action} usuários:`, selectedUsers);
    }
  };

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
      <span style={statusBadgeStyle(style.bg, style.color)}>
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
              Gerencie todos os usuários da plataforma
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
          <StatCard
            icon={<FaUsers />}
            label="Total de Usuários"
            value={stats.total}
            color="var(--primary)"
            bgColor="var(--primary-soft)"
          />
          <StatCard
            icon={<FaUserCheck />}
            label="Ativos"
            value={stats.ativos}
            color="var(--success)"
            bgColor="var(--success-light)"
          />
          <StatCard
            icon={<FaClock />}
            label="Pendentes"
            value={stats.pendentes}
            color="var(--warning)"
            bgColor="var(--warning-light)"
          />
          <StatCard
            icon={<FaUserTimes />}
            label="Bloqueados"
            value={stats.bloqueados}
            color="var(--danger)"
            bgColor="var(--danger-light)"
          />
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
                    placeholder="Nome ou email..."
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
                <label style={styles.filterLabel}>Data Início</label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                  style={styles.filterDate}
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Data Fim</label>
                <input
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                  style={styles.filterDate}
                />
              </div>
            </div>

            <div style={styles.filterActions}>
              <button
                onClick={() => setFiltros({ tipo: "", status: "", dataInicio: "", dataFim: "", busca: "" })}
                style={styles.clearButton}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Ações em Massa */}
        {selectedUsers.length > 0 && (
          <div style={styles.bulkActions}>
            <span style={styles.bulkSelected}>
              {selectedUsers.length} usuário(s) selecionado(s)
            </span>
            <div style={styles.bulkButtons}>
              <button
                onClick={() => handleBulkAction("ativar")}
                style={styles.bulkButton}
              >
                <FaUserCheck /> Ativar
              </button>
              <button
                onClick={() => handleBulkAction("bloquear")}
                style={{ ...styles.bulkButton, color: "var(--warning)" }}
              >
                <FaBan /> Bloquear
              </button>
              <button
                onClick={() => handleBulkAction("excluir")}
                style={{ ...styles.bulkButton, color: "var(--danger)" }}
              >
                <FaTrash /> Excluir
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                style={styles.bulkButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Tabela */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort("nome")}>
                  <div style={styles.sortableHeader}>
                    Usuário {getSortIcon("nome")}
                  </div>
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort("tipo")}>
                  <div style={styles.sortableHeader}>
                    Tipo {getSortIcon("tipo")}
                  </div>
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort("status")}>
                  <div style={styles.sortableHeader}>
                    Status {getSortIcon("status")}
                  </div>
                </th>
                <th style={styles.tableHeaderCell}>Contato</th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort("termosCriados")}>
                  <div style={styles.sortableHeader}>
                    Termos {getSortIcon("termosCriados")}
                  </div>
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort("videosEnviados")}>
                  <div style={styles.sortableHeader}>
                    Vídeos {getSortIcon("videosEnviados")}
                  </div>
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort("ultimoAcesso")}>
                  <div style={styles.sortableHeader}>
                    Último Acesso {getSortIcon("ultimoAcesso")}
                  </div>
                </th>
                <th style={styles.tableHeaderCell}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  style={styles.tableRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.userInfo}>
                      <div style={styles.userAvatar}>
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.nome} style={styles.avatarImage} />
                        ) : (
                          <div style={avatarPlaceholderStyle(user.tipo)}>
                            {user.nome.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={styles.userName}>{user.nome}</div>
                        <div style={styles.userEmail}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.tipoBadge}>
                      {getTipoIcon(user.tipo)}
                      <span>{getTipoLabel(user.tipo)}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{getStatusBadge(user.status)}</td>
                  <td style={styles.tableCell}>
                    {user.telefone ? (
                      <div style={styles.contactInfo}>
                        <FaPhone size={10} />
                        <span>{user.telefone}</span>
                      </div>
                    ) : (
                      <span style={{ color: "var(--text-tertiary)" }}>Não informado</span>
                    )}
                    {user.instituicao && (
                      <div style={styles.instituicao}>{user.instituicao}</div>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.counts}>
                      <span style={styles.countBadge}>
                        <FaFileAlt /> {user.termosCriados}
                      </span>
                      <span style={styles.countBadge}>
                        <FaCheckCircle /> {user.termosAssinados}
                      </span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={styles.countBadge}>
                      <FaVideo /> {user.videosEnviados}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.lastAccess}>
                      <FaClock size={10} />
                      <span>{user.ultimoAcesso}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => navigate(`/usuarios/${user.id}`)}
                        style={styles.actionButton}
                        title="Visualizar"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => navigate(`/usuarios/${user.id}/editar`)}
                        style={styles.actionButton}
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {/* Resetar senha */}}
                        style={styles.actionButton}
                        title="Resetar Senha"
                      >
                        <FaKey />
                      </button>
                      <button
                        onClick={() => handleUserBlock(user)}
                        style={{
                          ...styles.actionButton,
                          color: user.status === "bloqueado" ? "var(--success)" : "var(--warning)"
                        }}
                        title={user.status === "bloqueado" ? "Desbloquear" : "Bloquear"}
                      >
                        {user.status === "bloqueado" ? <FaUserCheck /> : <FaBan />}
                      </button>
                      <button
                        onClick={() => handleUserDelete(user)}
                        style={{ ...styles.actionButton, color: "var(--danger)" }}
                        title="Excluir"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedUsers.length === 0 && (
            <div style={styles.emptyState}>
              <FaUsers size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
              <h3 style={styles.emptyTitle}>Nenhum usuário encontrado</h3>
              <p style={styles.emptyText}>
                Tente ajustar seus filtros ou criar um novo usuário.
              </p>
            </div>
          )}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={paginationButtonStyle(currentPage === 1)}
            >
              <FaChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={paginationButtonStyle(false, currentPage === page)}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={paginationButtonStyle(currentPage === totalPages)}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );

  // Funções auxiliares
  function handleUserBlock(user: Usuario) {
    const action = user.status === "bloqueado" ? "desbloquear" : "bloquear";
    if (window.confirm(`${action} usuário ${user.nome}?`)) {
      console.log(`${action}:`, user.id);
    }
  }

  function handleUserDelete(user: Usuario) {
    if (window.confirm(`Excluir usuário ${user.nome}?`)) {
      console.log("Excluir:", user.id);
    }
  }
}

function StatCard({ icon, label, value, color, bgColor }: any) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statCardContent}>
        <div>
          <div style={styles.statLabel}>{label}</div>
          <div style={styles.statValue}>{value}</div>
        </div>
        <div style={statIconStyle(bgColor, color)}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Estilos
const styles: Record<string, React.CSSProperties> = {
  container: {
    animation: "fadeIn 0.5s ease-out"
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
    gap: "12px"
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
    background: "var(--bg-secondary)",
    borderRadius: "12px",
    padding: "20px"
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
    fontWeight: "600",
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
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "13px",
    color: "var(--text-secondary)"
  },
  primaryButton: {
    padding: "8px 16px",
    background: "var(--primary)",
    border: "none",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#fff"
  },
  filtersPanel: {
    background: "var(--bg-secondary)",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "24px"
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
    alignItems: "center"
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
    borderRadius: "4px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "13px"
  },
  filterSelect: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "13px"
  },
  filterDate: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "13px"
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
    fontSize: "13px"
  },
  bulkActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "var(--primary-soft)",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  bulkSelected: {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--primary)"
  },
  bulkButtons: {
    display: "flex",
    gap: "8px"
  },
  bulkButton: {
    padding: "6px 12px",
    background: "transparent",
    border: "1px solid var(--border-color)",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    fontSize: "12px",
    color: "var(--text-secondary)"
  },
  tableContainer: {
    background: "var(--bg-secondary)",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "24px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const
  },
  tableHeader: {
    background: "var(--bg-tertiary)",
    borderBottom: "1px solid var(--border-color)"
  },
  tableHeaderCell: {
    padding: "12px 16px",
    textAlign: "left" as const,
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-tertiary)",
    cursor: "pointer"
  },
  sortableHeader: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  checkboxCell: {
    width: "40px",
    padding: "12px 16px",
    textAlign: "center" as const
  },
  tableRow: {
    borderBottom: "1px solid var(--border-color)",
    transition: "background-color 0.2s"
  },
  tableCell: {
    padding: "12px 16px",
    fontSize: "13px",
    color: "var(--text-secondary)"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  userAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    overflow: "hidden"
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const
  },
  avatarPlaceholder: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600"
  },
  userName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-primary)",
    marginBottom: "2px"
  },
  userEmail: {
    fontSize: "12px",
    color: "var(--text-tertiary)"
  },
  tipoBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 8px",
    borderRadius: "4px",
    background: "var(--bg-tertiary)",
    fontSize: "11px",
    color: "var(--text-secondary)"
  },
  contactInfo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    marginBottom: "4px"
  },
  instituicao: {
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  counts: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px"
  },
  countBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "var(--text-secondary)"
  },
  lastAccess: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  actionButtons: {
    display: "flex",
    gap: "6px"
  },
  actionButton: {
    padding: "4px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--text-secondary)",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s"
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "48px 24px"
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
    gap: "4px"
  }
};

// Funções auxiliares de estilo
function statusBadgeStyle(bg: string, color: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    background: bg,
    color: color
  };
}

function avatarPlaceholderStyle(tipo: string): React.CSSProperties {
  return {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    background: `var(--${tipo}-light)`,
    color: `var(--${tipo})`
  };
}

function statIconStyle(bgColor: string, color: string): React.CSSProperties {
  return {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    background: bgColor,
    color: color
  };
}

function paginationButtonStyle(disabled: boolean = false, active: boolean = false): React.CSSProperties {
  return {
    width: "36px",
    height: "36px",
    borderRadius: "6px",
    border: "1px solid var(--border-color)",
    background: active ? "var(--primary)" : "transparent",
    color: active ? "#fff" : disabled ? "var(--text-tertiary)" : "var(--text-secondary)",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1
  };
}