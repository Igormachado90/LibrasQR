// import DashboardLayout from "../layouts/DashboardLayout";
// import FolhasRegistroHeader from "../components/FolhasRegistro/FolhasRegistroHeader";
// import FolhasRegistroTable from "../components/FolhasRegistro/FolhasRegistroTable";

// export default function FolhasDeRegistro() {
//   return (
//     <DashboardLayout>
//       <FolhasRegistroHeader />
//       <FolhasRegistroTable />
//     </DashboardLayout>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
  FaInfoCircle,
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaCheck,
  FaEye,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaUserCheck,
  FaVideo,
  FaFileAlt,
  FaQrcode
} from "react-icons/fa";

interface Notificacao {
  id: string;
  tipo: "aprovacao" | "recusa" | "alerta" | "info" | "sistema";
  titulo: string;
  mensagem: string;
  lida: boolean;
  data: string;
  link?: string;
  acao?: {
    texto: string;
    url: string;
  };
  remetente: {
    nome: string;
    avatar?: string;
  };
  prioridade: "alta" | "media" | "baixa";
}

interface FiltrosNotificacao {
  tipo: string;
  lida: string;
  prioridade: string;
  dataInicio: string;
  dataFim: string;
}

export default function Notificacoes() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [filtros, setFiltros] = useState<FiltrosNotificacao>({
    tipo: "",
    lida: "",
    prioridade: "",
    dataInicio: "",
    dataFim: ""
  });
  const [sortConfig, setSortConfig] = useState({
    key: "data",
    direction: "desc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    naoLidas: 0,
    lidas: 0
  });
  const itemsPerPage = 15;

  useEffect(() => {
    fetchNotificacoes();
  }, []);

  const fetchNotificacoes = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockNotificacoes: Notificacao[] = [
        {
          id: "1",
          tipo: "aprovacao",
          titulo: "Termo aprovado",
          mensagem: "Seu termo 'Sinais básicos de emergência' foi aprovado",
          lida: false,
          data: "2024-02-20 14:30",
          link: "/termos/1",
          acao: {
            texto: "Ver termo",
            url: "/termos/1"
          },
          remetente: {
            nome: "Admin"
          },
          prioridade: "alta"
        },
        {
          id: "2",
          tipo: "recusa",
          titulo: "Termo recusado",
          mensagem: "O termo 'Direitos do paciente' foi recusado. Motivo: Vídeo com baixa qualidade",
          lida: true,
          data: "2024-02-20 10:15",
          link: "/termos/3",
          acao: {
            texto: "Ver feedback",
            url: "/termos/3"
          },
          remetente: {
            nome: "Admin"
          },
          prioridade: "alta"
        },
        {
          id: "3",
          tipo: "info",
          titulo: "Novo vídeo disponível",
          mensagem: "Um novo vídeo foi adicionado à categoria 'Educação'",
          lida: false,
          data: "2024-02-19 16:45",
          link: "/videos/5",
          acao: {
            texto: "Assistir",
            url: "/videos/5"
          },
          remetente: {
            nome: "Sistema"
          },
          prioridade: "media"
        },
        {
          id: "4",
          tipo: "sistema",
          titulo: "Manutenção programada",
          mensagem: "O sistema passará por manutenção no domingo às 22h",
          lida: false,
          data: "2024-02-19 09:20",
          prioridade: "baixa",
          remetente: {
            nome: "Sistema"
          }
        },
        {
          id: "5",
          tipo: "alerta",
          titulo: "Termos pendentes",
          mensagem: "Existem 5 termos aguardando sua aprovação",
          lida: true,
          data: "2024-02-18 11:30",
          link: "/admin/termos/pendentes",
          acao: {
            texto: "Revisar",
            url: "/admin/termos/pendentes"
          },
          remetente: {
            nome: "Sistema"
          },
          prioridade: "alta"
        },
        {
          id: "6",
          tipo: "aprovacao",
          titulo: "QR Code gerado",
          mensagem: "QR Code para o termo 'Saudações em Libras' foi gerado",
          lida: false,
          data: "2024-02-18 10:00",
          link: "/termos/4/qrcode",
          acao: {
            texto: "Baixar QR Code",
            url: "/termos/4/qrcode"
          },
          remetente: {
            nome: "Sistema"
          },
          prioridade: "media"
        }
      ];
      
      setNotificacoes(mockNotificacoes);
      
      // Calcular estatísticas
      setStats({
        total: mockNotificacoes.length,
        naoLidas: mockNotificacoes.filter(n => !n.lida).length,
        lidas: mockNotificacoes.filter(n => n.lida).length
      });
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
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

  const filteredNotificacoes = notificacoes
    .filter(notif => {
      const matchesTipo = !filtros.tipo || notif.tipo === filtros.tipo;
      const matchesLida = filtros.lida === "" || 
        (filtros.lida === "lida" && notif.lida) ||
        (filtros.lida === "nao_lida" && !notif.lida);
      const matchesPrioridade = !filtros.prioridade || notif.prioridade === filtros.prioridade;
      
      const matchesData = (!filtros.dataInicio || notif.data.split(" ")[0] >= filtros.dataInicio) &&
                         (!filtros.dataFim || notif.data.split(" ")[0] <= filtros.dataFim);
      
      return matchesTipo && matchesLida && matchesPrioridade && matchesData;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Notificacao];
      const bValue = b[sortConfig.key as keyof Notificacao];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

  const totalPages = Math.ceil(filteredNotificacoes.length / itemsPerPage);
  const paginatedNotificacoes = filteredNotificacoes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleMarkAsRead = (id: string) => {
    setNotificacoes(prev =>
      prev.map(n => n.id === id ? { ...n, lida: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotificacoes(prev =>
      prev.map(n => ({ ...n, lida: true }))
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Excluir esta notificação?")) {
      setNotificacoes(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Excluir todas as notificações?")) {
      setNotificacoes([]);
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case "aprovacao": return <FaCheckCircle style={{ color: "var(--success)" }} />;
      case "recusa": return <FaTimesCircle style={{ color: "var(--danger)" }} />;
      case "alerta": return <FaExclamationTriangle style={{ color: "var(--warning)" }} />;
      case "info": return <FaInfoCircle style={{ color: "var(--info)" }} />;
      case "sistema": return <FaCog style={{ color: "var(--primary)" }} />;
      default: return <FaBell />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      aprovacao: "Aprovação",
      recusa: "Recusa",
      alerta: "Alerta",
      info: "Informação",
      sistema: "Sistema"
    };
    return labels[tipo] || tipo;
  };

  const getPrioridadeBadge = (prioridade: string) => {
    const styles = {
      alta: { bg: "var(--danger-light)", color: "var(--danger)" },
      media: { bg: "var(--warning-light)", color: "var(--warning)" },
      baixa: { bg: "var(--info-light)", color: "var(--info)" }
    };
    
    const style = styles[prioridade as keyof typeof styles];
    
    return (
      <span style={{
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "10px",
        fontWeight: "600",
        background: style.bg,
        color: style.color
      }}>
        {prioridade}
      </span>
    );
  };

  const formatDate = (dateStr: string) => {
    const [date, time] = dateStr.split(" ");
    return { date, time };
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Carregando notificações...</p>
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
            <h1 style={styles.title}>Central de Notificações</h1>
            <p style={styles.subtitle}>
              Acompanhe todas as atualizações do sistema
            </p>
          </div>

          <div style={styles.headerStats}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Não lidas</span>
              <span style={{
                ...styles.statValue,
                color: "var(--primary)"
              }}>{stats.naoLidas}</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Lidas</span>
              <span style={styles.statValue}>{stats.lidas}</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Total</span>
              <span style={styles.statValue}>{stats.total}</span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div style={styles.actionsBar}>
          <div style={styles.actionsLeft}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={styles.filterButton}
            >
              <FaFilter /> Filtros
            </button>
            <button
              onClick={handleMarkAllAsRead}
              style={styles.secondaryButton}
              disabled={stats.naoLidas === 0}
            >
              <FaCheck /> Marcar todas como lidas
            </button>
          </div>
          <div style={styles.actionsRight}>
            <button
              onClick={handleDeleteAll}
              style={{ ...styles.dangerButton }}
              disabled={notificacoes.length === 0}
            >
              <FaTrash /> Limpar todas
            </button>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div style={styles.filtersPanel}>
            <div style={styles.filtersGrid}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Tipo</label>
                <select
                  value={filtros.tipo}
                  onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">Todos</option>
                  <option value="aprovacao">Aprovação</option>
                  <option value="recusa">Recusa</option>
                  <option value="alerta">Alerta</option>
                  <option value="info">Informação</option>
                  <option value="sistema">Sistema</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Status</label>
                <select
                  value={filtros.lida}
                  onChange={(e) => setFiltros({ ...filtros, lida: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">Todas</option>
                  <option value="nao_lida">Não lidas</option>
                  <option value="lida">Lidas</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Prioridade</label>
                <select
                  value={filtros.prioridade}
                  onChange={(e) => setFiltros({ ...filtros, prioridade: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">Todas</option>
                  <option value="alta">Alta</option>
                  <option value="media">Média</option>
                  <option value="baixa">Baixa</option>
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
                onClick={() => setFiltros({ tipo: "", lida: "", prioridade: "", dataInicio: "", dataFim: "" })}
                style={styles.clearButton}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Lista de Notificações */}
        <div style={styles.notificacoesList}>
          {paginatedNotificacoes.length === 0 ? (
            <div style={styles.emptyState}>
              <FaBell size={48} style={{ color: "var(--text-tertiary)", marginBottom: "16px" }} />
              <h3 style={styles.emptyTitle}>Nenhuma notificação</h3>
              <p style={styles.emptyText}>
                Você não tem notificações no momento.
              </p>
            </div>
          ) : (
            paginatedNotificacoes.map((notif) => {
              const { date, time } = formatDate(notif.data);
              
              return (
                <div
                  key={notif.id}
                  style={{
                    ...styles.notificacaoItem,
                    background: notif.lida ? "transparent" : "var(--primary-soft)",
                    borderLeft: notif.lida ? "none" : `3px solid var(--primary)`
                  }}
                >
                  <div style={styles.notificacaoIcon}>
                    {getTipoIcon(notif.tipo)}
                  </div>
                  
                  <div style={styles.notificacaoContent}>
                    <div style={styles.notificacaoHeader}>
                      <div style={styles.notificacaoTitleSection}>
                        <h4 style={styles.notificacaoTitulo}>{notif.titulo}</h4>
                        <span style={styles.notificacaoTipo}>
                          {getTipoLabel(notif.tipo)}
                        </span>
                        {getPrioridadeBadge(notif.prioridade)}
                      </div>
                      <div style={styles.notificacaoDate}>
                        <span style={styles.notificacaoData}>{date}</span>
                        <span style={styles.notificacaoHora}>{time}</span>
                      </div>
                    </div>
                    
                    <p style={styles.notificacaoMensagem}>{notif.mensagem}</p>
                    
                    <div style={styles.notificacaoFooter}>
                      <div style={styles.notificacaoRemetente}>
                        <span style={styles.remetenteLabel}>De:</span>
                        <span style={styles.remetenteNome}>{notif.remetente.nome}</span>
                      </div>
                      
                      <div style={styles.notificacaoActions}>
                        {!notif.lida && (
                          <button
                            onClick={() => handleMarkAsRead(notif.id)}
                            style={styles.notificacaoAction}
                            title="Marcar como lida"
                          >
                            <FaEnvelopeOpen />
                          </button>
                        )}
                        
                        {notif.acao && (
                          <button
                            onClick={() => navigate(notif.acao!.url)}
                            style={styles.notificacaoAction}
                            title={notif.acao.texto}
                          >
                            <FaEye />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDelete(notif.id)}
                          style={{ ...styles.notificacaoAction, color: "var(--danger)" }}
                          title="Excluir"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
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
    </DashboardLayout>
  );
}

// Estilos (reutilizar os mesmos patterns dos componentes anteriores)
const styles: any = {
  container: { animation: "fadeIn 0.5s ease-out" },
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
  headerStats: {
    display: "flex",
    gap: "24px"
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  statLabel: {
    fontSize: "12px",
    color: "var(--text-tertiary)"
  },
  statValue: {
    fontSize: "20px",
    fontWeight: "600",
    color: "var(--text-primary)"
  },
  actionsBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  actionsLeft: {
    display: "flex",
    gap: "12px"
  },
  actionsRight: {
    display: "flex",
    gap: "12px"
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
    fontSize: "13px"
  },
  secondaryButton: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid var(--border-color)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "13px"
  },
  dangerButton: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid var(--danger)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "13px",
    color: "var(--danger)"
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
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  filterLabel: {
    fontSize: "12px",
    color: "var(--text-tertiary)"
  },
  filterSelect: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)"
  },
  filterDate: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)"
  },
  filterActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  clearButton: {
    padding: "6px 12px",
    background: "transparent",
    border: "none",
    color: "var(--primary)",
    cursor: "pointer",
    fontSize: "13px"
  },
  notificacoesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px"
  },
  notificacaoItem: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    transition: "background-color 0.2s"
  },
  notificacaoIcon: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px"
  },
  notificacaoContent: {
    flex: 1
  },
  notificacaoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "8px"
  },
  notificacaoTitleSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap"
  },
  notificacaoTitulo: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-primary)"
  },
  notificacaoTipo: {
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  notificacaoDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "2px"
  },
  notificacaoData: {
    fontSize: "12px",
    fontWeight: "500",
    color: "var(--text-secondary)"
  },
  notificacaoHora: {
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  notificacaoMensagem: {
    margin: "0 0 12px",
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: "1.5"
  },
  notificacaoFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  notificacaoRemetente: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px"
  },
  remetenteLabel: {
    color: "var(--text-tertiary)"
  },
  remetenteNome: {
    fontWeight: "500",
    color: "var(--text-primary)"
  },
  notificacaoActions: {
    display: "flex",
    gap: "8px"
  },
  notificacaoAction: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--text-secondary)",
    fontSize: "14px",
    padding: "4px"
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
    borderRadius: "6px",
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-secondary)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};