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
  FaQrcode,
  FaHistory,
  FaMobile
} from "react-icons/fa";

interface Notificacao {
  id: string;
  tipo: "aprovacao" | "recusa" | "alteracao" | "info" | "sistema";
  subtipo?: string;
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
  canaisEnvio: {
    interno: boolean;
    email: boolean;
  };
  metadata?: {
    termoId?: string;
    termoTitulo?: string;
    versao?: string;
    revisor?: string;
    justificativa?: string;
    alteracoes?: string[];
  };
}

interface FiltrosNotificacao {
  tipo: string;
  lida: string;
  prioridade: string;
  dataInicio: string;
  dataFim: string;
  canal: string;
}

interface ConfiguracoesNotificacao {
  receberAprovacoes: boolean;
  receberRecusas: boolean;
  receberAlteracoes: boolean;
  notificacaoInterna: boolean;
  notificacaoEmail: boolean;
  emailDiario: boolean;
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
    dataFim: "",
    canal: ""
  });
  const [sortConfig, setSortConfig] = useState({
    key: "data",
    direction: "desc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesNotificacao>({
    receberAprovacoes: true,
    receberRecusas: true,
    receberAlteracoes: true,
    notificacaoInterna: true,
    notificacaoEmail: true,
    emailDiario: false
  });
  const [stats, setStats] = useState({
    total: 0,
    naoLidas: 0,
    lidas: 0,
    porTipo: {
      aprovacao: 0,
      recusa: 0,
      alteracao: 0
    }
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
        // Notificações de APROVAÇÃO
        {
          id: "1",
          tipo: "aprovacao",
          titulo: "✅ Termo aprovado",
          mensagem: "Seu termo 'Sinais básicos de emergência' foi aprovado pela equipe de revisão",
          lida: false,
          data: "2024-02-20 14:30",
          link: "/termos/1",
          acao: {
            texto: "Ver termo publicado",
            url: "/termos/1"
          },
          remetente: {
            nome: "Comitê de Aprovação"
          },
          prioridade: "alta",
          canaisEnvio: {
            interno: true,
            email: true
          },
          metadata: {
            termoId: "1",
            termoTitulo: "Sinais básicos de emergência",
            versao: "2.0",
            revisor: "Carlos Santos"
          }
        },
        {
          id: "6",
          tipo: "aprovacao",
          titulo: "✅ QR Code gerado",
          mensagem: "QR Code para o termo 'Saudações em Libras' foi gerado automaticamente após aprovação",
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
          prioridade: "media",
          canaisEnvio: {
            interno: true,
            email: false
          },
          metadata: {
            termoId: "4",
            termoTitulo: "Saudações em Libras"
          }
        },

        // Notificações de RECUSA
        {
          id: "2",
          tipo: "recusa",
          subtipo: "qualidade",
          titulo: "❌ Termo recusado",
          mensagem: "O termo 'Direitos do paciente' foi recusado. Motivo: Vídeo com baixa qualidade e definições incompletas",
          lida: true,
          data: "2024-02-20 10:15",
          link: "/termos/3",
          acao: {
            texto: "Ver feedback completo",
            url: "/termos/3/feedback"
          },
          remetente: {
            nome: "Comitê de Revisão"
          },
          prioridade: "alta",
          canaisEnvio: {
            interno: true,
            email: true
          },
          metadata: {
            termoId: "3",
            termoTitulo: "Direitos do paciente",
            versao: "1.2",
            revisor: "Ana Oliveira",
            justificativa: "Vídeo com baixa qualidade e definições incompletas"
          }
        },

        // Notificações de ALTERAÇÃO
        {
          id: "5",
          tipo: "alteracao",
          titulo: "📝 Termo alterado",
          mensagem: "O termo 'Termo de Consentimento' foi atualizado para versão 2.1",
          lida: true,
          data: "2024-02-19 09:30",
          link: "/termos/2",
          acao: {
            texto: "Ver alterações",
            url: "/termos/2/historico"
          },
          remetente: {
            nome: "João Silva"
          },
          prioridade: "media",
          canaisEnvio: {
            interno: true,
            email: true
          },
          metadata: {
            termoId: "2",
            termoTitulo: "Termo de Consentimento",
            versao: "2.1",
            alteracoes: ["Cláusula 3 revisada", "Novas definições adicionadas"]
          }
        },
        {
          id: "8",
          tipo: "alteracao",
          titulo: "📝 Alteração solicitada",
          mensagem: "Foram solicitadas alterações no termo 'Procedimentos de Segurança'",
          lida: false,
          data: "2024-02-17 16:20",
          link: "/termos/7/editar",
          acao: {
            texto: "Fazer alterações",
            url: "/termos/7/editar"
          },
          remetente: {
            nome: "Revisor"
          },
          prioridade: "alta",
          canaisEnvio: {
            interno: true,
            email: true
          },
          metadata: {
            termoId: "7",
            termoTitulo: "Procedimentos de Segurança",
            versao: "1.0"
          }
        },
        {
          id: "9",
          tipo: "alteracao",
          titulo: "📝 Nova versão disponível",
          mensagem: "Uma nova versão do termo 'Política de Privacidade' foi publicada",
          lida: false,
          data: "2024-02-16 11:45",
          link: "/termos/8",
          acao: {
            texto: "Visualizar nova versão",
            url: "/termos/8"
          },
          remetente: {
            nome: "Sistema"
          },
          prioridade: "baixa",
          canaisEnvio: {
            interno: true,
            email: false
          },
          metadata: {
            termoId: "8",
            termoTitulo: "Política de Privacidade",
            versao: "3.0"
          }
        },

        // Outras notificações
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
          prioridade: "media",
          canaisEnvio: {
            interno: true,
            email: false
          }
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
          },
          canaisEnvio: {
            interno: true,
            email: true
          }
        }
      ];
      
      setNotificacoes(mockNotificacoes);
      
      // Calcular estatísticas
      setStats({
        total: mockNotificacoes.length,
        naoLidas: mockNotificacoes.filter(n => !n.lida).length,
        lidas: mockNotificacoes.filter(n => n.lida).length,
        porTipo: {
          aprovacao: mockNotificacoes.filter(n => n.tipo === "aprovacao").length,
          recusa: mockNotificacoes.filter(n => n.tipo === "recusa").length,
          alteracao: mockNotificacoes.filter(n => n.tipo === "alteracao").length
        }
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
      const matchesCanal = !filtros.canal || 
        (filtros.canal === "interno" && notif.canaisEnvio.interno) ||
        (filtros.canal === "email" && notif.canaisEnvio.email);
      
      const matchesData = (!filtros.dataInicio || notif.data.split(" ")[0] >= filtros.dataInicio) &&
                         (!filtros.dataFim || notif.data.split(" ")[0] <= filtros.dataFim);
      
      return matchesTipo && matchesLida && matchesPrioridade && matchesData && matchesCanal;
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

  const handleReenviarEmail = (notificacao: Notificacao) => {
    alert(`E-mail reenviado para: ${notificacao.titulo}`);
  };

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case "aprovacao": return <FaCheckCircle style={{ color: "var(--success)" }} />;
      case "recusa": return <FaTimesCircle style={{ color: "var(--danger)" }} />;
      case "alteracao": return <FaHistory style={{ color: "var(--info)" }} />;
      case "info": return <FaInfoCircle style={{ color: "var(--info)" }} />;
      case "sistema": return <FaCog style={{ color: "var(--primary)" }} />;
      default: return <FaBell />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      aprovacao: "Aprovação",
      recusa: "Recusa",
      alteracao: "Alteração",
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

  const getCanaisIcons = (canais: { interno: boolean; email: boolean }) => {
    return (
      <div style={styles.canaisIcons}>
        {canais.interno && <FaBell size={10} style={{ color: "var(--primary)" }} title="Notificação interna" />}
        {canais.email && <FaEnvelope size={10} style={{ color: "var(--info)" }} title="E-mail enviado" />}
      </div>
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
              Acompanhe aprovações, recusas e alterações dos termos
            </p>
          </div>

          <div style={styles.headerStats}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Aprovações</span>
              <span style={{...styles.statValue, color: "var(--success)"}}>
                {stats.porTipo.aprovacao}
              </span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Recusas</span>
              <span style={{...styles.statValue, color: "var(--danger)"}}>
                {stats.porTipo.recusa}
              </span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Alterações</span>
              <span style={{...styles.statValue, color: "var(--info)"}}>
                {stats.porTipo.alteracao}
              </span>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Não lidas</span>
              <span style={{...styles.statValue, color: "var(--primary)"}}>
                {stats.naoLidas}
              </span>
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
              onClick={() => setShowConfig(!showConfig)}
              style={styles.filterButton}
            >
              <FaCog /> Configurações
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

        {/* Configurações */}
        {showConfig && (
          <div style={styles.configPanel}>
            <h4 style={styles.configTitle}>Configurações de Notificações</h4>
            
            <div style={styles.configGroup}>
              <h5 style={styles.configSubtitle}>Receber notificações de:</h5>
              <div style={styles.configOptions}>
                <label style={styles.configLabel}>
                  <input
                    type="checkbox"
                    checked={configuracoes.receberAprovacoes}
                    onChange={(e) => setConfiguracoes({...configuracoes, receberAprovacoes: e.target.checked})}
                  />
                  Aprovações
                </label>
                <label style={styles.configLabel}>
                  <input
                    type="checkbox"
                    checked={configuracoes.receberRecusas}
                    onChange={(e) => setConfiguracoes({...configuracoes, receberRecusas: e.target.checked})}
                  />
                  Recusas
                </label>
                <label style={styles.configLabel}>
                  <input
                    type="checkbox"
                    checked={configuracoes.receberAlteracoes}
                    onChange={(e) => setConfiguracoes({...configuracoes, receberAlteracoes: e.target.checked})}
                  />
                  Alterações
                </label>
              </div>
            </div>

            <div style={styles.configGroup}>
              <h5 style={styles.configSubtitle}>Canais de envio:</h5>
              <div style={styles.configOptions}>
                <label style={styles.configLabel}>
                  <input
                    type="checkbox"
                    checked={configuracoes.notificacaoInterna}
                    onChange={(e) => setConfiguracoes({...configuracoes, notificacaoInterna: e.target.checked})}
                  />
                  Notificação interna (no sistema)
                </label>
                <label style={styles.configLabel}>
                  <input
                    type="checkbox"
                    checked={configuracoes.notificacaoEmail}
                    onChange={(e) => setConfiguracoes({...configuracoes, notificacaoEmail: e.target.checked})}
                  />
                  E-mail
                </label>
                <label style={styles.configLabel}>
                  <input
                    type="checkbox"
                    checked={configuracoes.emailDiario}
                    onChange={(e) => setConfiguracoes({...configuracoes, emailDiario: e.target.checked})}
                  />
                  Resumo diário por e-mail
                </label>
              </div>
            </div>

            <div style={styles.configActions}>
              <button
                onClick={() => setShowConfig(false)}
                style={styles.configSaveButton}
              >
                Salvar configurações
              </button>
            </div>
          </div>
        )}

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
                  <option value="alteracao">Alteração</option>
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
                <label style={styles.filterLabel}>Canal</label>
                <select
                  value={filtros.canal}
                  onChange={(e) => setFiltros({ ...filtros, canal: e.target.value })}
                  style={styles.filterSelect}
                >
                  <option value="">Todos</option>
                  <option value="interno">Interno</option>
                  <option value="email">E-mail</option>
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
                onClick={() => setFiltros({ tipo: "", lida: "", prioridade: "", dataInicio: "", dataFim: "", canal: "" })}
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
                    borderLeft: notif.lida ? "none" : `3px solid ${
                      notif.tipo === "aprovacao" ? "var(--success)" :
                      notif.tipo === "recusa" ? "var(--danger)" :
                      notif.tipo === "alteracao" ? "var(--info)" :
                      "var(--primary)"
                    }`
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
                        {getCanaisIcons(notif.canaisEnvio)}
                      </div>
                      <div style={styles.notificacaoDate}>
                        <span style={styles.notificacaoData}>{date}</span>
                        <span style={styles.notificacaoHora}>{time}</span>
                      </div>
                    </div>
                    
                    <p style={styles.notificacaoMensagem}>{notif.mensagem}</p>
                    
                    {/* Metadata específico por tipo */}
                    {notif.metadata && (
                      <div style={styles.notificacaoMetadata}>
                        {notif.metadata.termoTitulo && (
                          <div style={styles.metadataItem}>
                            <FaFileAlt size={11} />
                            <span>{notif.metadata.termoTitulo}</span>
                          </div>
                        )}
                        {notif.metadata.versao && (
                          <div style={styles.metadataItem}>
                            <span>v{notif.metadata.versao}</span>
                          </div>
                        )}
                        {notif.metadata.revisor && notif.tipo === "recusa" && (
                          <div style={styles.metadataItem}>
                            <FaUserCheck size={11} />
                            <span>Revisor: {notif.metadata.revisor}</span>
                          </div>
                        )}
                        {notif.metadata.justificativa && notif.tipo === "recusa" && (
                          <div style={styles.metadataJustificativa}>
                            <strong>Motivo:</strong> {notif.metadata.justificativa}
                          </div>
                        )}
                        {notif.metadata.alteracoes && notif.tipo === "alteracao" && (
                          <div style={styles.metadataAlteracoes}>
                            <strong>Alterações:</strong>
                            <ul style={styles.alteracoesList}>
                              {notif.metadata.alteracoes.map((alt, idx) => (
                                <li key={idx}>{alt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
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

                        {notif.canaisEnvio.email && (
                          <button
                            onClick={() => handleReenviarEmail(notif)}
                            style={styles.notificacaoAction}
                            title="Reenviar e-mail"
                          >
                            <FaEnvelope />
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

// Estilos adicionais
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
    gap: "20px",
    alignItems: "center"
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
  statDivider: {
    width: "1px",
    height: "30px",
    background: "var(--border-color)"
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
  configPanel: {
    background: "var(--bg-tertiary)",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px"
  },
  configTitle: {
    margin: "0 0 16px",
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary)"
  },
  configGroup: {
    marginBottom: "16px"
  },
  configSubtitle: {
    margin: "0 0 8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-secondary)"
  },
  configOptions: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  configLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "var(--text-primary)",
    cursor: "pointer"
  },
  configActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "12px"
  },
  configSaveButton: {
    padding: "8px 20px",
    background: "var(--primary)",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500",
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
  canaisIcons: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
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
    margin: "0 0 8px",
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: "1.5"
  },
  notificacaoMetadata: {
    marginBottom: "12px",
    padding: "8px",
    background: "var(--bg-tertiary)",
    borderRadius: "6px"
  },
  metadataItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: "var(--text-secondary)",
    marginBottom: "4px"
  },
  metadataJustificativa: {
    fontSize: "12px",
    color: "var(--danger)",
    marginTop: "4px",
    padding: "4px",
    background: "var(--danger-light)",
    borderRadius: "4px"
  },
  metadataAlteracoes: {
    marginTop: "4px"
  },
  alteracoesList: {
    margin: "4px 0 0",
    paddingLeft: "20px",
    fontSize: "12px",
    color: "var(--text-secondary)"
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