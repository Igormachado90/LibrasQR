// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout";
// import StatCard from "../components/Card/StatCard";
// import LineChart from "../components/Charts/LineChart";
// import DataTable from "../components/Table/DataTable";
// import RelatorioAcompanhamento from "../components/Table/RelatorioAcompanhamento";
// import OrientacoesEscola from "../components/Table/OrientacoesEscola";
// import { supabase } from "../lib/supabase";
// import {
//   FaChalkboardTeacher,
//   FaBook,
//   FaUsers,
//   FaCheck,
//   FaCalendarAlt,
//   FaHourglass,
//   FaStar,
//   FaClock,
//   FaDollarSign,
//   FaArrowUp,
//   FaArrowDown,
//   FaEye,
//   FaDownload
// } from "react-icons/fa";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalAlunos: 0,
//     totalDisciplinas: 0,
//     alunosAtivos: 0,
//     atendimentosHoje: 0,
//     proximosAtendimentos: 0,
//     totalProfessores: 0,
//     totalAulas: 0,
//     mediaAvaliacoes: 0
//   });

//   // Buscar dados reais do Supabase
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   async function fetchDashboardData() {
//     try {
//       setLoading(true);

//       // Buscar total de alunos
//       const { count: totalAlunos, error: errorAlunos } = await supabase
//         .from("Alunos")
//         .select("*", { count: 'exact', head: true });

//       if (errorAlunos) throw errorAlunos;

//       // Buscar alunos ativos (com alguma aula nos últimos 30 dias)
//       const trintaDiasAtras = new Date();
//       trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

//       const { count: alunosAtivos, error: errorAtivos } = await supabase
//         .from("Alunos")
//         .select(`
//           *,
//           Aulas_Alunos!inner(
//             Aulas!inner(
//               Data_hora_inicio
//             )
//           )
//         `, { count: 'exact', head: true })
//         .gte("Aulas_Alunos.Aulas.Data_hora_inicio", trintaDiasAtras.toISOString());

//       // Buscar atendimentos de hoje
//       const hoje = new Date();
//       const inicioHoje = new Date(hoje.setHours(0, 0, 0, 0)).toISOString();
//       const fimHoje = new Date(hoje.setHours(23, 59, 59, 999)).toISOString();

//       const { count: atendimentosHoje, error: errorHoje } = await supabase
//         .from("Aulas")
//         .select("*", { count: 'exact', head: true })
//         .gte("Data_hora_inicio", inicioHoje)
//         .lte("Data_hora_inicio", fimHoje)
//         .in("Status", ["agendada", "em_andamento"]);

//       // Buscar próximos atendimentos (próximos 7 dias)
//       const proximaSemana = new Date();
//       proximaSemana.setDate(proximaSemana.getDate() + 7);

//       const { count: proximosAtendimentos, error: errorProximos } = await supabase
//         .from("Aulas")
//         .select("*", { count: 'exact', head: true })
//         .gte("Data_hora_inicio", new Date().toISOString())
//         .lte("Data_hora_inicio", proximaSemana.toISOString())
//         .eq("Status", "agendada");

//       setStats({
//         totalDisciplinas: 0,
//         totalAlunos: totalAlunos || 0,
//         alunosAtivos: alunosAtivos || 0,
//         atendimentosHoje: atendimentosHoje || 0,
//         proximosAtendimentos: proximosAtendimentos || 0,
//         totalProfessores: 0,
//         totalAulas: 0,
//         mediaAvaliacoes: 0
//       });

//     } catch (error) {
//       console.error("Erro ao buscar dados do dashboard:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "60vh"
//         }}>
//           <div style={{
//             width: "50px",
//             height: "50px",
//             border: "3px solid #e5e7eb",
//             borderTopColor: "#4F46E5",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "24px"
//       }}>
//         <div>
//           <h1 style={{
//             fontSize: "40px",
//             fontWeight: "600",
//             color: "#1f2937",
//             margin: 0
//           }}>
//             Dashboard
//           </h1>
//           <p style={{
//             fontSize: "14px",
//             color: "#6b7280",
//             marginTop: "4px"
//           }}>
//             Visão geral do sistema de acompanhamento
//           </p>
//         </div>

//         <div style={{ display: "flex", gap: "12px" }}>
//           <button
//             onClick={() => window.location.reload()}
//             style={{
//               padding: "10px 16px",
//               borderRadius: "8px",
//               border: "1px solid #d1d5db",
//               backgroundColor: "#fff",
//               color: "#374151",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               transition: "all 0.2s"
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = "#f9fafb";
//               e.currentTarget.style.borderColor = "#9ca3af";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = "#fff";
//               e.currentTarget.style.borderColor = "#d1d5db";
//             }}
//           >
//             <span>🔄</span>
//             Atualizar
//           </button>
//           <button
//             onClick={() => navigate("/relatorios")}
//             style={{
//               padding: "10px 16px",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#4F46E5",
//               color: "#fff",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               transition: "all 0.2s"
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = "#4338CA";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = "#4F46E5";
//             }}
//           >
//             <span>📊</span>
//             Ver Relatórios
//           </button>
//         </div>
//       </div>

//       {/* Cards de Estatísticas */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: "20px",
//           marginBottom: "24px"
//         }}
//       >
//         <StatCard
//           title="Total de Alunos"
//           value={stats.totalAlunos.toString()}
//           subtitle="Cadastrados no sistema"
//           icon={<FaUsers size={24} color="#4F46E5" />}
//           bgColor="linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)"
//           borderColor="#C4B5FD"
//           onClick={() => navigate("/alunos")}
//         />
//         <StatCard
//           title="Alunos Ativos"
//           value={stats.alunosAtivos.toString()}
//           subtitle="Em acompanhamento (30 dias)"
//           icon={<FaCheck size={24} color="#16A34A" />}
//           bgColor="linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
//           borderColor="#86EFAC"
//           onClick={() => navigate("/alunos?status=ativo")}
//         />
//         <StatCard
//           title="Atendimentos Hoje"
//           value={stats.atendimentosHoje.toString()}
//           subtitle="Sessões registradas"
//           icon={<FaCalendarAlt size={24} color="#F97316" />}
//           bgColor="linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
//           borderColor="#FDBA74"
//           onClick={() => navigate("/aulas?data=hoje")}
//         />
//         <StatCard
//           title="Próximos Atendimentos"
//           value={stats.proximosAtendimentos.toString()}
//           subtitle="Agendados (7 dias)"
//           icon={<FaHourglass size={24} color="#0EA5E9" />}
//           bgColor="linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
//           borderColor="#7DD3FC"
//           onClick={() => navigate("/aulas?status=agendada")}
//         />
//       </div>

//       {/* Gráficos e Relatórios */}
//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr",
//         gap: "20px",
//         marginBottom: "24px"
//       }}>
//         <RelatorioAcompanhamento />
//         <LineChart

//           title="Evolução de Atendimentos"
//           height={300}
//         />
//       </div>

//       {/* Tabela de Dados */}
//       <div style={{ marginBottom: "24px" }}>
//         <DataTable />
//       </div>

//       {/* Orientações da Escola */}
//       <OrientacoesEscola />

//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </DashboardLayout>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useTheme } from "../components/contexts/ThemeContext";
import { 
  FaQrcode, 
  FaVideo, 
  FaEye, 
  FaStar,
  FaCalendarAlt,
  FaChartLine,
  FaDownload,
  FaShare,
  FaHeart,
  FaTrash,
  FaEdit,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaMapMarkerAlt,
  FaMobile,
  FaTablet,
  FaLaptop
} from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";

interface DashboardStats {
  totalQRCodes: number;
  totalVideos: number;
  totalScans: number;
  favoritesCount: number;
  scansToday: number;
  scansWeek: number;
  scansMonth: number;
  scansGrowth: number;
  topCategories: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

interface RecentQRCode {
  id: string;
  title: string;
  type: "video" | "texto" | "link";
  scans: number;
  createdAt: string;
  thumbnail?: string;
  category: string;
}

interface TopVideo {
  id: string;
  title: string;
  views: number;
  duration: number;
  thumbnail: string;
  category: string;
}

interface Scan {
  id: string;
  location: string;
  device: "Mobile" | "Desktop" | "Tablet";
  time: string;
  qrCode: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalQRCodes: 0,
    totalVideos: 0,
    totalScans: 0,
    favoritesCount: 0,
    scansToday: 0,
    scansWeek: 0,
    scansMonth: 0,
    scansGrowth: 12.5,
    topCategories: []
  });
  
  const [recentQRCodes, setRecentQRCodes] = useState<RecentQRCode[]>([]);
  const [topVideos, setTopVideos] = useState<TopVideo[]>([]);
  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simular chamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados mockados
      setStats({
        totalQRCodes: 156,
        totalVideos: 89,
        totalScans: 12453,
        favoritesCount: 342,
        scansToday: 127,
        scansWeek: 892,
        scansMonth: 3456,
        scansGrowth: 12.5,
        topCategories: [
          { category: "Educação", count: 45, percentage: 38 },
          { category: "Saúde", count: 28, percentage: 24 },
          { category: "Direitos", count: 22, percentage: 19 },
          { category: "Serviços", count: 12, percentage: 10 },
          { category: "Cultura", count: 10, percentage: 9 }
        ]
      });

      setRecentQRCodes([
        {
          id: "1",
          title: "Sinais básicos de emergência",
          type: "video",
          scans: 234,
          createdAt: "2024-02-20",
          thumbnail: "/thumbnails/emergencia.jpg",
          category: "Emergência"
        },
        {
          id: "2",
          title: "Vocabulário escolar",
          type: "video",
          scans: 189,
          createdAt: "2024-02-19",
          thumbnail: "/thumbnails/escola.jpg",
          category: "Educação"
        },
        {
          id: "3",
          title: "Direitos do paciente",
          type: "texto",
          scans: 156,
          createdAt: "2024-02-18",
          category: "Saúde"
        },
        {
          id: "4",
          title: "Saudações em Libras",
          type: "video",
          scans: 145,
          createdAt: "2024-02-17",
          thumbnail: "/thumbnails/saudacoes.jpg",
          category: "Cultura"
        },
        {
          id: "5",
          title: "Como pedir ajuda",
          type: "video",
          scans: 98,
          createdAt: "2024-02-16",
          thumbnail: "/thumbnails/ajuda.jpg",
          category: "Emergência"
        }
      ]);

      setTopVideos([
        {
          id: "1",
          title: "Sinais básicos de emergência",
          views: 1234,
          duration: 185,
          thumbnail: "/thumbnails/emergencia.jpg",
          category: "Emergência"
        },
        {
          id: "2",
          title: "Vocabulário escolar completo",
          views: 987,
          duration: 320,
          thumbnail: "/thumbnails/escola.jpg",
          category: "Educação"
        },
        {
          id: "3",
          title: "Direitos do paciente",
          views: 876,
          duration: 245,
          thumbnail: "/thumbnails/direitos.jpg",
          category: "Saúde"
        },
        {
          id: "4",
          title: "Saudações em Libras",
          views: 654,
          duration: 120,
          thumbnail: "/thumbnails/saudacoes.jpg",
          category: "Cultura"
        }
      ]);

      setRecentScans([
        {
          id: "1",
          location: "São Paulo, SP",
          device: "Mobile",
          time: "há 5 minutos",
          qrCode: "Emergência Médica"
        },
        {
          id: "2",
          location: "Rio de Janeiro, RJ",
          device: "Desktop",
          time: "há 15 minutos",
          qrCode: "Vocabulário Escolar"
        },
        {
          id: "3",
          location: "Belo Horizonte, MG",
          device: "Mobile",
          time: "há 32 minutos",
          qrCode: "Direitos do Paciente"
        },
        {
          id: "4",
          location: "Curitiba, PR",
          device: "Tablet",
          time: "há 1 hora",
          qrCode: "Saudações"
        }
      ]);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Educação": "#2563eb",
      "Saúde": "#10b981",
      "Direitos": "#8b5cf6",
      "Serviços": "#f59e0b",
      "Cultura": "#ec4899",
      "Emergência": "#ef4444",
      "default": "var(--text-tertiary)"
    };
    return colors[category] || colors.default;
  };

  const getDeviceIcon = (device: string) => {
    switch(device) {
      case "Mobile": return <FaMobile />;
      case "Tablet": return <FaTablet />;
      default: return <FaLaptop />;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "50px",
              height: "50px",
              border: "3px solid var(--border-color)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px"
            }}></div>
            <p style={{ color: "var(--text-tertiary)" }}>Carregando dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{
        animation: "fadeIn 0.5s ease-out"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "600",
              color: "var(--text-primary)"
            }}>
              Dashboard LibrasQR
            </h1>
            <p style={{
              margin: "4px 0 0",
              fontSize: "14px",
              color: "var(--text-tertiary)"
            }}>
              Bem-vindo de volta! Aqui está o resumo da sua plataforma.
            </p>
          </div>

          {/* Time Range Selector */}
          <div style={{
            display: "flex",
            gap: "8px",
            background: "var(--bg-tertiary)",
            padding: "4px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)"
          }}>
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  background: timeRange === range ? "var(--primary)" : "transparent",
                  color: timeRange === range ? "#fff" : "var(--text-secondary)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {range === "week" ? "Semana" : range === "month" ? "Mês" : "Ano"}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "32px"
        }}>
          <StatCard
            icon={<IoQrCode size={24} />}
            label="Total QR Codes"
            value={formatNumber(stats.totalQRCodes)}
            change="+12%"
            changeType="positive"
            color="var(--primary)"
            bgColor="var(--primary-soft)"
          />
          <StatCard
            icon={<FaVideo size={24} />}
            label="Vídeos em Libras"
            value={formatNumber(stats.totalVideos)}
            change="+8%"
            changeType="positive"
            color="var(--success)"
            bgColor="var(--success-light)"
          />
          <StatCard
            icon={<FaEye size={24} />}
            label="Total de Scans"
            value={formatNumber(stats.totalScans)}
            change="+23%"
            changeType="positive"
            color="var(--info)"
            bgColor="var(--info-light)"
          />
          <StatCard
            icon={<FaStar size={24} />}
            label="Favoritos"
            value={formatNumber(stats.favoritesCount)}
            change="+15%"
            changeType="positive"
            color="var(--warning)"
            bgColor="var(--warning-light)"
          />
        </div>

        {/* Scans Today/Week/Month */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "32px"
        }}>
          <TimeStatCard
            label="Hoje"
            value={stats.scansToday}
            icon="📅"
            description="scans hoje"
            color="var(--primary)"
          />
          <TimeStatCard
            label="Esta semana"
            value={stats.scansWeek}
            icon="📅"
            description="scans na semana"
            color="var(--success)"
          />
          <TimeStatCard
            label="Este mês"
            value={stats.scansMonth}
            icon="📅"
            description="scans no mês"
            color="var(--info)"
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "32px"
        }}>
          {/* Gráfico de Categorias */}
          <div style={{
            background: "var(--card-bg)",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--card-shadow)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>
                Categorias mais acessadas
              </h3>
              <FaChartLine style={{ color: "var(--text-tertiary)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {stats.topCategories.map((cat, index) => (
                <div key={cat.category}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginBottom: "6px"
                  }}>
                    <span style={{ color: "var(--text-secondary)" }}>{cat.category}</span>
                    <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>{cat.count}</span>
                  </div>
                  <div style={{
                    width: "100%",
                    height: "8px",
                    background: "var(--border-color)",
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${cat.percentage}%`,
                      height: "100%",
                      background: getCategoryColor(cat.category),
                      borderRadius: "4px",
                      transition: "width 0.3s ease"
                    }}></div>
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    marginTop: "4px"
                  }}>
                    {cat.percentage}% do total
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scans Recentes */}
          <div style={{
           background: "var(--card-bg)",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--card-shadow)"
          }}>
            <h3 style={{
              margin: "0 0 16px",
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--text-primary)"
            }}>
              Scans Recentes
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    borderRadius: "8px",
                    transition: "background-color 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "var(--primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    fontSize: "16px"
                  }}>
                    {getDeviceIcon(scan.device)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "500", fontSize: "14px", color: "var(--text-primary)" }}>
                      {scan.qrCode}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      color: "var(--text-tertiary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px" 
                      }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <FaMapMarkerAlt size={10} />
                        {scan.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <FaClock size={10} />
                        {scan.time}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    background: "var(--bg-tertiary)",
                    padding: "4px 8px",
                    borderRadius: "4px"
                  }}>
                    {scan.device}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/scans")}
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "10px",
                background: "none",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                color: "var(--text-tertiary)",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              Ver todos os scans
            </button>
          </div>
        </div>

        {/* QR Codes Recentes */}
        <div style={{
          background: "var(--card-bg)",
          borderRadius: "12px",
          padding: "20px",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--card-shadow)",
          marginBottom: "32px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "12px"
          }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>
              QR Codes Recentes
            </h3>
            <button
              onClick={() => navigate("/gerar-qr")}
              style={{
                padding: "8px 16px",
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary-dar)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary)";
              }}
            >
              <FaPlus size={12} />
              Novo QR Code
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th style={tableHeaderStyle}>Título</th>
                  <th style={tableHeaderStyle}>Categoria</th>
                  <th style={tableHeaderStyle}>Tipo</th>
                  <th style={tableHeaderStyle}>Scans</th>
                  <th style={tableHeaderStyle}>Criado em</th>
                  <th style={tableHeaderStyle}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {recentQRCodes.map((qr) => (
                  <tr
                    key={qr.id}
                    style={{
                      borderBottom: "1px solid var(--border-light)",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={tableCellStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {qr.thumbnail ? (
                          <img
                            src={qr.thumbnail}
                            alt=""
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "4px",
                              objectFit: "cover"
                            }}
                          />
                        ) : (
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "4px",
                            background: "var(--bg-tertiary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#9ca3af"
                          }}>
                            📄
                          </div>
                        )}
                        <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>
                          {qr.title}
                        </span>
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: "600",
                        background: `${getCategoryColor(qr.category)}20`,
                        color: getCategoryColor(qr.category)
                      }}>
                        {qr.category}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{ color: "var(--text-secondary)" }}>
                        {qr.type === "video" ? "🎥 Vídeo" : "📝 Texto"}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FaEye size={12} style={{ color: "var(--text-tertiary)" }} />
                        <span style={{ color: "var(--text-secondary)" }}>{qr.scans}</span>
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FaCalendarAlt size={12} style={{ color: "var(--text-tertiary)" }} />
                        <span style={{ color: "var(--text-secondary)" }}>{qr.createdAt}</span>
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <ActionButton
                          icon={<FaEdit />}
                          label="Editar"
                          color="var(--primary)"
                        />
                        <ActionButton
                          icon={<FaDownload />}
                          label="Download"
                          color="var(--success)"
                        />
                        <ActionButton
                          icon={<FaShare />}
                          label="Compartilhar"
                          color="var(--info)"
                        />
                        <ActionButton
                          icon={<FaTrash />}
                          label="Excluir"
                          color="var(--danger)"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vídeos em Destaque */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          {topVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              formatDuration={formatDuration}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </DashboardLayout>
  );
}

// Componentes Auxiliares
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  color: string;
  bgColor: string;
}

function StatCard({ icon, label, value, change, changeType, color, bgColor }: StatCardProps) {
  return (
    <div style={{
      background: "var(--card-bg)",
      borderRadius: "12px",
      padding: "20px",
      border: "1px solid var(--border-color)",
      boxShadow: "var(--card-shadow)",
      transition: "transform 0.2s, box-shadow 0.2s"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "var(--card-shadow)";
    }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "8px" }}>
            {label}
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)" }}>
            {value}
          </div>
          <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
            {changeType === "positive" ? (
              <FaArrowUp size={12} style={{ color: "var(--success)" }} />
            ) : (
              <FaArrowDown size={12} style={{ color: "var(--danger)" }} />
            )}
            <span style={{
              color: changeType === "positive" ? "var(--success)" : "var(--danger)",
              fontSize: "13px",
              fontWeight: "600"
            }}>
              {change}
            </span>
            <span style={{ color: "var(--text-tertiary)", fontSize: "13px", marginLeft: "4px" }}>
              vs período anterior
            </span>
          </div>
        </div>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface TimeStatCardProps {
  label: string;
  value: number;
  icon: string;
  description: string;
  color: string;
}

function TimeStatCard({ label, value, icon, description, color }: TimeStatCardProps) {
  const { theme } = useTheme();

  // Mapeamento de cores para cada tema
  const getStyles = () => {
    if (theme === "dark") {
      return {
        background: "var(--bg-secondary)",
        textColor: "var(--text-primary)",

        border: "1px solid var(--border-color)",
        boxShadow: "var(--card-shadow)"
      };
    }
    
    // No tema claro, usa as cores sólidas com gradiente
    let bgColor = "#2563eb"; // padrão
    if (color === "var(--primary)") bgColor = "#2563eb";
    if (color === "var(--success)") bgColor = "#10b981";
    if (color === "var(--info)") bgColor = "#8b5cf6";
    
    return {
      background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
      textColor: "#ffffff",
      
      border: "none",
      boxShadow: `0 4px 12px ${bgColor}40`
    };
  };

  const styles = getStyles();

  return (
    <div style={{
      background: styles.background,
      borderRadius: "12px",
      padding: "20px",
      color: styles.textColor,
      boxShadow: styles.boxShadow,
      border: styles.border,
      transition: "all 0.3s ease"
    }}>
      <div style={{ 
        fontSize: "14px", 
        opacity: 0.9, 
        marginBottom: "8px" 
      }}>
        {label}
      </div>
      <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>
        {value.toLocaleString()}
      </div>
      <div style={{ fontSize: "13px", opacity: 0.9, display: "flex", alignItems: "center", gap: "4px" }}>
        <span>{icon}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

function ActionButton({ icon, label, color }: ActionButtonProps) {
  return (
    <button
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "6px",
        borderRadius: "4px",
        color: "var(--text-tertiary)",
        transition: "all 0.2s",
        fontSize: "14px"
      }}
      title={label}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = color;
        e.currentTarget.style.backgroundColor = `${color}20`;
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-tertiary)";
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {icon}
    </button>
  );
}

interface VideoCardProps {
  video: TopVideo;
  formatDuration: (seconds: number) => string;
  getCategoryColor: (category: string) => string;
}

function VideoCard({ video, formatDuration, getCategoryColor }: VideoCardProps) {
  const navigate = useNavigate();

  return (
    <div style={{
      background: "var(--card-bg)",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid var(--border-color)",
      boxShadow: "var(--card-shadow)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer"
    }}
    onClick={() => navigate(`/video/${video.id}`)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "var(--card-shadow)";
    }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--bg-tertiary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{ fontSize: "48px" }}>🎥</span>
        </div>
        <div style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px"
        }}>
          {formatDuration(video.duration)}
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px"
        }}>
          <h4 style={{ 
            margin: 0, 
            fontSize: "14px", 
            fontWeight: "600", 
            color: "var(--text-primary)" 
          }}>
            {video.title}
          </h4>
          <span style={{
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            fontWeight: "600",
            background: `${getCategoryColor(video.category)}20`,
            color: getCategoryColor(video.category)
          }}>
            {video.category}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <FaEye size={12} style={{ color: "var(--text-tertiary)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              {video.views.toLocaleString()} visualizações
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <FaHeart size={12} style={{ color: "var(--text-tertiary)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              {Math.floor(video.views * 0.15)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: "600",
  color: "var(--text-tertiary)",
  textTransform: "uppercase",
  letterSpacing: "0.05em"
};

const tableCellStyle: React.CSSProperties = {
  padding: "16px",
  fontSize: "13px",
  color: "var(--text-secondary)"
};