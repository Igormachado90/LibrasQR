// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import DashboardLayout from "../layouts/DashboardLayout";
// // import StatCard from "../components/Card/StatCard";
// // import LineChart from "../components/Charts/LineChart";
// // import DataTable from "../components/Table/DataTable";
// // import RelatorioAcompanhamento from "../components/Table/RelatorioAcompanhamento";
// // import OrientacoesEscola from "../components/Table/OrientacoesEscola";
// // import { supabase } from "../lib/supabase";
// // import {
// //   FaChalkboardTeacher,
// //   FaBook,
// //   FaUsers,
// //   FaCheck,
// //   FaCalendarAlt,
// //   FaHourglass,
// //   FaStar,
// //   FaClock,
// //   FaDollarSign,
// //   FaArrowUp,
// //   FaArrowDown,
// //   FaEye,
// //   FaDownload
// // } from "react-icons/fa";

// // export default function Dashboard() {
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(true);
// //   const [stats, setStats] = useState({
// //     totalAlunos: 0,
// //     totalDisciplinas: 0,
// //     alunosAtivos: 0,
// //     atendimentosHoje: 0,
// //     proximosAtendimentos: 0,
// //     totalProfessores: 0,
// //     totalAulas: 0,
// //     mediaAvaliacoes: 0
// //   });

// //   // Buscar dados reais do Supabase
// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   async function fetchDashboardData() {
// //     try {
// //       setLoading(true);

// //       // Buscar total de alunos
// //       const { count: totalAlunos, error: errorAlunos } = await supabase
// //         .from("Alunos")
// //         .select("*", { count: 'exact', head: true });

// //       if (errorAlunos) throw errorAlunos;

// //       // Buscar alunos ativos (com alguma aula nos últimos 30 dias)
// //       const trintaDiasAtras = new Date();
// //       trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

// //       const { count: alunosAtivos, error: errorAtivos } = await supabase
// //         .from("Alunos")
// //         .select(`
// //           *,
// //           Aulas_Alunos!inner(
// //             Aulas!inner(
// //               Data_hora_inicio
// //             )
// //           )
// //         `, { count: 'exact', head: true })
// //         .gte("Aulas_Alunos.Aulas.Data_hora_inicio", trintaDiasAtras.toISOString());

// //       // Buscar atendimentos de hoje
// //       const hoje = new Date();
// //       const inicioHoje = new Date(hoje.setHours(0, 0, 0, 0)).toISOString();
// //       const fimHoje = new Date(hoje.setHours(23, 59, 59, 999)).toISOString();

// //       const { count: atendimentosHoje, error: errorHoje } = await supabase
// //         .from("Aulas")
// //         .select("*", { count: 'exact', head: true })
// //         .gte("Data_hora_inicio", inicioHoje)
// //         .lte("Data_hora_inicio", fimHoje)
// //         .in("Status", ["agendada", "em_andamento"]);

// //       // Buscar próximos atendimentos (próximos 7 dias)
// //       const proximaSemana = new Date();
// //       proximaSemana.setDate(proximaSemana.getDate() + 7);

// //       const { count: proximosAtendimentos, error: errorProximos } = await supabase
// //         .from("Aulas")
// //         .select("*", { count: 'exact', head: true })
// //         .gte("Data_hora_inicio", new Date().toISOString())
// //         .lte("Data_hora_inicio", proximaSemana.toISOString())
// //         .eq("Status", "agendada");

// //       setStats({
// //         totalDisciplinas: 0,
// //         totalAlunos: totalAlunos || 0,
// //         alunosAtivos: alunosAtivos || 0,
// //         atendimentosHoje: atendimentosHoje || 0,
// //         proximosAtendimentos: proximosAtendimentos || 0,
// //         totalProfessores: 0,
// //         totalAulas: 0,
// //         mediaAvaliacoes: 0
// //       });

// //     } catch (error) {
// //       console.error("Erro ao buscar dados do dashboard:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <DashboardLayout>
// //         <div style={{
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           height: "60vh"
// //         }}>
// //           <div style={{
// //             width: "50px",
// //             height: "50px",
// //             border: "3px solid #e5e7eb",
// //             borderTopColor: "#4F46E5",
// //             borderRadius: "50%",
// //             animation: "spin 1s linear infinite"
// //           }}></div>
// //         </div>
// //       </DashboardLayout>
// //     );
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div style={{
// //         display: "flex",
// //         justifyContent: "space-between",
// //         alignItems: "center",
// //         marginBottom: "24px"
// //       }}>
// //         <div>
// //           <h1 style={{
// //             fontSize: "40px",
// //             fontWeight: "600",
// //             color: "#1f2937",
// //             margin: 0
// //           }}>
// //             Dashboard
// //           </h1>
// //           <p style={{
// //             fontSize: "14px",
// //             color: "#6b7280",
// //             marginTop: "4px"
// //           }}>
// //             Visão geral do sistema de acompanhamento
// //           </p>
// //         </div>

// //         <div style={{ display: "flex", gap: "12px" }}>
// //           <button
// //             onClick={() => window.location.reload()}
// //             style={{
// //               padding: "10px 16px",
// //               borderRadius: "8px",
// //               border: "1px solid #d1d5db",
// //               backgroundColor: "#fff",
// //               color: "#374151",
// //               cursor: "pointer",
// //               fontSize: "14px",
// //               fontWeight: "500",
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "8px",
// //               transition: "all 0.2s"
// //             }}
// //             onMouseEnter={(e) => {
// //               e.currentTarget.style.backgroundColor = "#f9fafb";
// //               e.currentTarget.style.borderColor = "#9ca3af";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.currentTarget.style.backgroundColor = "#fff";
// //               e.currentTarget.style.borderColor = "#d1d5db";
// //             }}
// //           >
// //             <span>🔄</span>
// //             Atualizar
// //           </button>
// //           <button
// //             onClick={() => navigate("/relatorios")}
// //             style={{
// //               padding: "10px 16px",
// //               borderRadius: "8px",
// //               border: "none",
// //               backgroundColor: "#4F46E5",
// //               color: "#fff",
// //               cursor: "pointer",
// //               fontSize: "14px",
// //               fontWeight: "500",
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "8px",
// //               transition: "all 0.2s"
// //             }}
// //             onMouseEnter={(e) => {
// //               e.currentTarget.style.backgroundColor = "#4338CA";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.currentTarget.style.backgroundColor = "#4F46E5";
// //             }}
// //           >
// //             <span>📊</span>
// //             Ver Relatórios
// //           </button>
// //         </div>
// //       </div>

// //       {/* Cards de Estatísticas */}
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(4, 1fr)",
// //           gap: "20px",
// //           marginBottom: "24px"
// //         }}
// //       >
// //         <StatCard
// //           title="Total de Alunos"
// //           value={stats.totalAlunos.toString()}
// //           subtitle="Cadastrados no sistema"
// //           icon={<FaUsers size={24} color="#4F46E5" />}
// //           bgColor="linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)"
// //           borderColor="#C4B5FD"
// //           onClick={() => navigate("/alunos")}
// //         />
// //         <StatCard
// //           title="Alunos Ativos"
// //           value={stats.alunosAtivos.toString()}
// //           subtitle="Em acompanhamento (30 dias)"
// //           icon={<FaCheck size={24} color="#16A34A" />}
// //           bgColor="linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
// //           borderColor="#86EFAC"
// //           onClick={() => navigate("/alunos?status=ativo")}
// //         />
// //         <StatCard
// //           title="Atendimentos Hoje"
// //           value={stats.atendimentosHoje.toString()}
// //           subtitle="Sessões registradas"
// //           icon={<FaCalendarAlt size={24} color="#F97316" />}
// //           bgColor="linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
// //           borderColor="#FDBA74"
// //           onClick={() => navigate("/aulas?data=hoje")}
// //         />
// //         <StatCard
// //           title="Próximos Atendimentos"
// //           value={stats.proximosAtendimentos.toString()}
// //           subtitle="Agendados (7 dias)"
// //           icon={<FaHourglass size={24} color="#0EA5E9" />}
// //           bgColor="linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
// //           borderColor="#7DD3FC"
// //           onClick={() => navigate("/aulas?status=agendada")}
// //         />
// //       </div>

// //       {/* Gráficos e Relatórios */}
// //       <div style={{
// //         display: "grid",
// //         gridTemplateColumns: "1fr 1fr",
// //         gap: "20px",
// //         marginBottom: "24px"
// //       }}>
// //         <RelatorioAcompanhamento />
// //         <LineChart

// //           title="Evolução de Atendimentos"
// //           height={300}
// //         />
// //       </div>

// //       {/* Tabela de Dados */}
// //       <div style={{ marginBottom: "24px" }}>
// //         <DataTable />
// //       </div>

// //       {/* Orientações da Escola */}
// //       <OrientacoesEscola />

// //       <style>
// //         {`
// //           @keyframes spin {
// //             0% { transform: rotate(0deg); }
// //             100% { transform: rotate(360deg); }
// //           }
// //         `}
// //       </style>
// //     </DashboardLayout>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout";
// import { useTheme } from "../components/contexts/ThemeContext";
// import { 
//   FaQrcode, 
//   FaVideo, 
//   FaEye, 
//   FaStar,
//   FaCalendarAlt,
//   FaChartLine,
//   FaDownload,
//   FaShare,
//   FaHeart,
//   FaTrash,
//   FaEdit,
//   FaPlus,
//   FaArrowUp,
//   FaArrowDown,
//   FaClock,
//   FaMapMarkerAlt,
//   FaMobile,
//   FaTablet,
//   FaLaptop
// } from "react-icons/fa";
// import { IoQrCode } from "react-icons/io5";

// interface DashboardStats {
//   totalQRCodes: number;
//   totalVideos: number;
//   totalScans: number;
//   favoritesCount: number;
//   scansToday: number;
//   scansWeek: number;
//   scansMonth: number;
//   scansGrowth: number;
//   topCategories: {
//     category: string;
//     count: number;
//     percentage: number;
//   }[];
// }

// interface RecentQRCode {
//   id: string;
//   title: string;
//   type: "video" | "texto" | "link";
//   scans: number;
//   createdAt: string;
//   thumbnail?: string;
//   category: string;
// }

// interface TopVideo {
//   id: string;
//   title: string;
//   views: number;
//   duration: number;
//   thumbnail: string;
//   category: string;
// }

// interface Scan {
//   id: string;
//   location: string;
//   device: "Mobile" | "Desktop" | "Tablet";
//   time: string;
//   qrCode: string;
// }

// export default function DashboardPage() {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<DashboardStats>({
//     totalQRCodes: 0,
//     totalVideos: 0,
//     totalScans: 0,
//     favoritesCount: 0,
//     scansToday: 0,
//     scansWeek: 0,
//     scansMonth: 0,
//     scansGrowth: 12.5,
//     topCategories: []
//   });

//   const [recentQRCodes, setRecentQRCodes] = useState<RecentQRCode[]>([]);
//   const [topVideos, setTopVideos] = useState<TopVideo[]>([]);
//   const [recentScans, setRecentScans] = useState<Scan[]>([]);
//   const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

//   useEffect(() => {
//     fetchDashboardData();
//   }, [timeRange]);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       // Simular chamada API
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // Dados mockados
//       setStats({
//         totalQRCodes: 156,
//         totalVideos: 89,
//         totalScans: 12453,
//         favoritesCount: 342,
//         scansToday: 127,
//         scansWeek: 892,
//         scansMonth: 3456,
//         scansGrowth: 12.5,
//         topCategories: [
//           { category: "Educação", count: 45, percentage: 38 },
//           { category: "Saúde", count: 28, percentage: 24 },
//           { category: "Direitos", count: 22, percentage: 19 },
//           { category: "Serviços", count: 12, percentage: 10 },
//           { category: "Cultura", count: 10, percentage: 9 }
//         ]
//       });

//       setRecentQRCodes([
//         {
//           id: "1",
//           title: "Sinais básicos de emergência",
//           type: "video",
//           scans: 234,
//           createdAt: "2024-02-20",
//           thumbnail: "/thumbnails/emergencia.jpg",
//           category: "Emergência"
//         },
//         {
//           id: "2",
//           title: "Vocabulário escolar",
//           type: "video",
//           scans: 189,
//           createdAt: "2024-02-19",
//           thumbnail: "/thumbnails/escola.jpg",
//           category: "Educação"
//         },
//         {
//           id: "3",
//           title: "Direitos do paciente",
//           type: "texto",
//           scans: 156,
//           createdAt: "2024-02-18",
//           category: "Saúde"
//         },
//         {
//           id: "4",
//           title: "Saudações em Libras",
//           type: "video",
//           scans: 145,
//           createdAt: "2024-02-17",
//           thumbnail: "/thumbnails/saudacoes.jpg",
//           category: "Cultura"
//         },
//         {
//           id: "5",
//           title: "Como pedir ajuda",
//           type: "video",
//           scans: 98,
//           createdAt: "2024-02-16",
//           thumbnail: "/thumbnails/ajuda.jpg",
//           category: "Emergência"
//         }
//       ]);

//       setTopVideos([
//         {
//           id: "1",
//           title: "Sinais básicos de emergência",
//           views: 1234,
//           duration: 185,
//           thumbnail: "/thumbnails/emergencia.jpg",
//           category: "Emergência"
//         },
//         {
//           id: "2",
//           title: "Vocabulário escolar completo",
//           views: 987,
//           duration: 320,
//           thumbnail: "/thumbnails/escola.jpg",
//           category: "Educação"
//         },
//         {
//           id: "3",
//           title: "Direitos do paciente",
//           views: 876,
//           duration: 245,
//           thumbnail: "/thumbnails/direitos.jpg",
//           category: "Saúde"
//         },
//         {
//           id: "4",
//           title: "Saudações em Libras",
//           views: 654,
//           duration: 120,
//           thumbnail: "/thumbnails/saudacoes.jpg",
//           category: "Cultura"
//         }
//       ]);

//       setRecentScans([
//         {
//           id: "1",
//           location: "São Paulo, SP",
//           device: "Mobile",
//           time: "há 5 minutos",
//           qrCode: "Emergência Médica"
//         },
//         {
//           id: "2",
//           location: "Rio de Janeiro, RJ",
//           device: "Desktop",
//           time: "há 15 minutos",
//           qrCode: "Vocabulário Escolar"
//         },
//         {
//           id: "3",
//           location: "Belo Horizonte, MG",
//           device: "Mobile",
//           time: "há 32 minutos",
//           qrCode: "Direitos do Paciente"
//         },
//         {
//           id: "4",
//           location: "Curitiba, PR",
//           device: "Tablet",
//           time: "há 1 hora",
//           qrCode: "Saudações"
//         }
//       ]);

//     } catch (error) {
//       console.error("Erro ao buscar dados:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDuration = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatNumber = (num: number) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//   };

//   const getCategoryColor = (category: string) => {
//     const colors: Record<string, string> = {
//       "Educação": "#2563eb",
//       "Saúde": "#10b981",
//       "Direitos": "#8b5cf6",
//       "Serviços": "#f59e0b",
//       "Cultura": "#ec4899",
//       "Emergência": "#ef4444",
//       "default": "var(--text-tertiary)"
//     };
//     return colors[category] || colors.default;
//   };

//   const getDeviceIcon = (device: string) => {
//     switch(device) {
//       case "Mobile": return <FaMobile />;
//       case "Tablet": return <FaTablet />;
//       default: return <FaLaptop />;
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "60vh"
//         }}>
//           <div style={{ textAlign: "center" }}>
//             <div style={{
//               width: "50px",
//               height: "50px",
//               border: "3px solid var(--border-color)",
//               borderTopColor: "var(--primary)",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//               margin: "0 auto 16px"
//             }}></div>
//             <p style={{ color: "var(--text-tertiary)" }}>Carregando dashboard...</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div style={{
//         animation: "fadeIn 0.5s ease-out"
//       }}>
//         {/* Header */}
//         <div style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "24px",
//           flexWrap: "wrap",
//           gap: "16px"
//         }}>
//           <div>
//             <h1 style={{
//               margin: 0,
//               fontSize: "28px",
//               fontWeight: "600",
//               color: "var(--text-primary)"
//             }}>
//               Dashboard LibrasQR
//             </h1>
//             <p style={{
//               margin: "4px 0 0",
//               fontSize: "14px",
//               color: "var(--text-tertiary)"
//             }}>
//               Bem-vindo de volta! Aqui está o resumo da sua plataforma.
//             </p>
//           </div>

//           {/* Time Range Selector */}
//           <div style={{
//             display: "flex",
//             gap: "8px",
//             background: "var(--bg-tertiary)",
//             padding: "4px",
//             borderRadius: "8px",
//             border: "1px solid var(--border-color)"
//           }}>
//             {["week", "month", "year"].map((range) => (
//               <button
//                 key={range}
//                 onClick={() => setTimeRange(range as any)}
//                 style={{
//                   padding: "8px 16px",
//                   borderRadius: "6px",
//                   border: "none",
//                   background: timeRange === range ? "var(--primary)" : "transparent",
//                   color: timeRange === range ? "#fff" : "var(--text-secondary)",
//                   fontSize: "14px",
//                   fontWeight: "500",
//                   cursor: "pointer",
//                   transition: "all 0.2s"
//                 }}
//               >
//                 {range === "week" ? "Semana" : range === "month" ? "Mês" : "Ano"}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//           gap: "20px",
//           marginBottom: "32px"
//         }}>
//           <StatCard
//             icon={<IoQrCode size={24} />}
//             label="Total QR Codes"
//             value={formatNumber(stats.totalQRCodes)}
//             change="+12%"
//             changeType="positive"
//             color="var(--primary)"
//             bgColor="var(--primary-soft)"
//           />
//           <StatCard
//             icon={<FaVideo size={24} />}
//             label="Vídeos em Libras"
//             value={formatNumber(stats.totalVideos)}
//             change="+8%"
//             changeType="positive"
//             color="var(--success)"
//             bgColor="var(--success-light)"
//           />
//           <StatCard
//             icon={<FaEye size={24} />}
//             label="Total de Scans"
//             value={formatNumber(stats.totalScans)}
//             change="+23%"
//             changeType="positive"
//             color="var(--info)"
//             bgColor="var(--info-light)"
//           />
//           <StatCard
//             icon={<FaStar size={24} />}
//             label="Favoritos"
//             value={formatNumber(stats.favoritesCount)}
//             change="+15%"
//             changeType="positive"
//             color="var(--warning)"
//             bgColor="var(--warning-light)"
//           />
//         </div>

//         {/* Scans Today/Week/Month */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "16px",
//           marginBottom: "32px"
//         }}>
//           <TimeStatCard
//             label="Hoje"
//             value={stats.scansToday}
//             icon="📅"
//             description="scans hoje"
//             color="var(--primary)"
//           />
//           <TimeStatCard
//             label="Esta semana"
//             value={stats.scansWeek}
//             icon="📅"
//             description="scans na semana"
//             color="var(--success)"
//           />
//           <TimeStatCard
//             label="Este mês"
//             value={stats.scansMonth}
//             icon="📅"
//             description="scans no mês"
//             color="var(--info)"
//           />
//         </div>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "2fr 1fr",
//           gap: "24px",
//           marginBottom: "32px"
//         }}>
//           {/* Gráfico de Categorias */}
//           <div style={{
//             background: "var(--card-bg)",
//             borderRadius: "12px",
//             padding: "20px",
//             border: "1px solid var(--border-color)",
//             boxShadow: "var(--card-shadow)"
//           }}>
//             <div style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "16px"
//             }}>
//               <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>
//                 Categorias mais acessadas
//               </h3>
//               <FaChartLine style={{ color: "var(--text-tertiary)" }} />
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//               {stats.topCategories.map((cat, index) => (
//                 <div key={cat.category}>
//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "14px",
//                     marginBottom: "6px"
//                   }}>
//                     <span style={{ color: "var(--text-secondary)" }}>{cat.category}</span>
//                     <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>{cat.count}</span>
//                   </div>
//                   <div style={{
//                     width: "100%",
//                     height: "8px",
//                     background: "var(--border-color)",
//                     borderRadius: "4px",
//                     overflow: "hidden"
//                   }}>
//                     <div style={{
//                       width: `${cat.percentage}%`,
//                       height: "100%",
//                       background: getCategoryColor(cat.category),
//                       borderRadius: "4px",
//                       transition: "width 0.3s ease"
//                     }}></div>
//                   </div>
//                   <div style={{
//                     fontSize: "11px",
//                     color: "var(--text-tertiary)",
//                     marginTop: "4px"
//                   }}>
//                     {cat.percentage}% do total
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Scans Recentes */}
//           <div style={{
//            background: "var(--card-bg)",
//             borderRadius: "12px",
//             padding: "20px",
//             border: "1px solid var(--border-color)",
//             boxShadow: "var(--card-shadow)"
//           }}>
//             <h3 style={{
//               margin: "0 0 16px",
//               fontSize: "16px",
//               fontWeight: "600",
//               color: "var(--text-primary)"
//             }}>
//               Scans Recentes
//             </h3>

//             <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//               {recentScans.map((scan) => (
//                 <div
//                   key={scan.id}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                     padding: "8px",
//                     borderRadius: "8px",
//                     transition: "background-color 0.2s",
//                     cursor: "pointer"
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = "var(--bg-hover)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = "transparent";
//                   }}
//                 >
//                   <div style={{
//                     width: "32px",
//                     height: "32px",
//                     borderRadius: "8px",
//                     background: "var(--primary-soft)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "var(--primary)",
//                     fontSize: "16px"
//                   }}>
//                     {getDeviceIcon(scan.device)}
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontWeight: "500", fontSize: "14px", color: "var(--text-primary)" }}>
//                       {scan.qrCode}
//                     </div>
//                     <div style={{ 
//                       fontSize: "12px", 
//                       color: "var(--text-tertiary)",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px" 
//                       }}>
//                       <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
//                         <FaMapMarkerAlt size={10} />
//                         {scan.location}
//                       </span>
//                       <span>•</span>
//                       <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
//                         <FaClock size={10} />
//                         {scan.time}
//                       </span>
//                     </div>
//                   </div>
//                   <div style={{
//                     fontSize: "11px",
//                     color: "var(--text-tertiary)",
//                     background: "var(--bg-tertiary)",
//                     padding: "4px 8px",
//                     borderRadius: "4px"
//                   }}>
//                     {scan.device}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={() => navigate("/scans")}
//               style={{
//                 width: "100%",
//                 marginTop: "16px",
//                 padding: "10px",
//                 background: "none",
//                 border: "1px solid var(--border-color)",
//                 borderRadius: "8px",
//                 color: "var(--text-tertiary)",
//                 fontSize: "13px",
//                 cursor: "pointer",
//                 transition: "all 0.2s"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = "var(--bg-hover)";
//                 e.currentTarget.style.color = "var(--primary)";
//                 e.currentTarget.style.borderColor = "var(--primary)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = "transparent";
//                 e.currentTarget.style.color = "var(--text-secondary)";
//                 e.currentTarget.style.borderColor = "var(--border-color)";
//               }}
//             >
//               Ver todos os scans
//             </button>
//           </div>
//         </div>

//         {/* QR Codes Recentes */}
//         <div style={{
//           background: "var(--card-bg)",
//           borderRadius: "12px",
//           padding: "20px",
//           border: "1px solid var(--border-color)",
//           boxShadow: "var(--card-shadow)",
//           marginBottom: "32px"
//         }}>
//           <div style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "16px",
//             flexWrap: "wrap",
//             gap: "12px"
//           }}>
//             <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>
//               QR Codes Recentes
//             </h3>
//             <button
//               onClick={() => navigate("/gerar-qr")}
//               style={{
//                 padding: "8px 16px",
//                 background: "var(--primary)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontSize: "13px",
//                 fontWeight: "500",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 cursor: "pointer",
//                 transition: "background-color 0.2s"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = "var(--primary-dar)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = "var(--primary)";
//               }}
//             >
//               <FaPlus size={12} />
//               Novo QR Code
//             </button>
//           </div>

//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
//               <thead>
//                 <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
//                   <th style={tableHeaderStyle}>Título</th>
//                   <th style={tableHeaderStyle}>Categoria</th>
//                   <th style={tableHeaderStyle}>Tipo</th>
//                   <th style={tableHeaderStyle}>Scans</th>
//                   <th style={tableHeaderStyle}>Criado em</th>
//                   <th style={tableHeaderStyle}>Ações</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentQRCodes.map((qr) => (
//                   <tr
//                     key={qr.id}
//                     style={{
//                       borderBottom: "1px solid var(--border-light)",
//                       transition: "background-color 0.2s"
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "var(--bg-hover)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "transparent";
//                     }}
//                   >
//                     <td style={tableCellStyle}>
//                       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                         {qr.thumbnail ? (
//                           <img
//                             src={qr.thumbnail}
//                             alt=""
//                             style={{
//                               width: "32px",
//                               height: "32px",
//                               borderRadius: "4px",
//                               objectFit: "cover"
//                             }}
//                           />
//                         ) : (
//                           <div style={{
//                             width: "32px",
//                             height: "32px",
//                             borderRadius: "4px",
//                             background: "var(--bg-tertiary)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: "#9ca3af"
//                           }}>
//                             📄
//                           </div>
//                         )}
//                         <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>
//                           {qr.title}
//                         </span>
//                       </div>
//                     </td>
//                     <td style={tableCellStyle}>
//                       <span style={{
//                         padding: "4px 8px",
//                         borderRadius: "4px",
//                         fontSize: "11px",
//                         fontWeight: "600",
//                         background: `${getCategoryColor(qr.category)}20`,
//                         color: getCategoryColor(qr.category)
//                       }}>
//                         {qr.category}
//                       </span>
//                     </td>
//                     <td style={tableCellStyle}>
//                       <span style={{ color: "var(--text-secondary)" }}>
//                         {qr.type === "video" ? "🎥 Vídeo" : "📝 Texto"}
//                       </span>
//                     </td>
//                     <td style={tableCellStyle}>
//                       <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                         <FaEye size={12} style={{ color: "var(--text-tertiary)" }} />
//                         <span style={{ color: "var(--text-secondary)" }}>{qr.scans}</span>
//                       </div>
//                     </td>
//                     <td style={tableCellStyle}>
//                       <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                         <FaCalendarAlt size={12} style={{ color: "var(--text-tertiary)" }} />
//                         <span style={{ color: "var(--text-secondary)" }}>{qr.createdAt}</span>
//                       </div>
//                     </td>
//                     <td style={tableCellStyle}>
//                       <div style={{ display: "flex", gap: "8px" }}>
//                         <ActionButton
//                           icon={<FaEdit />}
//                           label="Editar"
//                           color="var(--primary)"
//                         />
//                         <ActionButton
//                           icon={<FaDownload />}
//                           label="Download"
//                           color="var(--success)"
//                         />
//                         <ActionButton
//                           icon={<FaShare />}
//                           label="Compartilhar"
//                           color="var(--info)"
//                         />
//                         <ActionButton
//                           icon={<FaTrash />}
//                           label="Excluir"
//                           color="var(--danger)"
//                         />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Vídeos em Destaque */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: "20px"
//         }}>
//           {topVideos.map((video) => (
//             <VideoCard
//               key={video.id}
//               video={video}
//               formatDuration={formatDuration}
//               getCategoryColor={getCategoryColor}
//             />
//           ))}
//         </div>

//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>
//     </DashboardLayout>
//   );
// }

// // Componentes Auxiliares
// interface StatCardProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   change: string;
//   changeType: "positive" | "negative";
//   color: string;
//   bgColor: string;
// }

// function StatCard({ icon, label, value, change, changeType, color, bgColor }: StatCardProps) {
//   return (
//     <div style={{
//       background: "var(--card-bg)",
//       borderRadius: "12px",
//       padding: "20px",
//       border: "1px solid var(--border-color)",
//       boxShadow: "var(--card-shadow)",
//       transition: "transform 0.2s, box-shadow 0.2s"
//     }}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.transform = "translateY(-2px)";
//       e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = "translateY(0)";
//       e.currentTarget.style.boxShadow = "var(--card-shadow)";
//     }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//         <div>
//           <div style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "8px" }}>
//             {label}
//           </div>
//           <div style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)" }}>
//             {value}
//           </div>
//           <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
//             {changeType === "positive" ? (
//               <FaArrowUp size={12} style={{ color: "var(--success)" }} />
//             ) : (
//               <FaArrowDown size={12} style={{ color: "var(--danger)" }} />
//             )}
//             <span style={{
//               color: changeType === "positive" ? "var(--success)" : "var(--danger)",
//               fontSize: "13px",
//               fontWeight: "600"
//             }}>
//               {change}
//             </span>
//             <span style={{ color: "var(--text-tertiary)", fontSize: "13px", marginLeft: "4px" }}>
//               vs período anterior
//             </span>
//           </div>
//         </div>
//         <div style={{
//           width: "48px",
//           height: "48px",
//           borderRadius: "12px",
//           background: bgColor,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: color
//         }}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface TimeStatCardProps {
//   label: string;
//   value: number;
//   icon: string;
//   description: string;
//   color: string;
// }

// function TimeStatCard({ label, value, icon, description, color }: TimeStatCardProps) {
//   const { theme } = useTheme();

//   // Mapeamento de cores para cada tema
//   const getStyles = () => {
//     if (theme === "dark") {
//       return {
//         background: "var(--bg-secondary)",
//         textColor: "var(--text-primary)",

//         border: "1px solid var(--border-color)",
//         boxShadow: "var(--card-shadow)"
//       };
//     }

//     // No tema claro, usa as cores sólidas com gradiente
//     let bgColor = "#2563eb"; // padrão
//     if (color === "var(--primary)") bgColor = "#2563eb";
//     if (color === "var(--success)") bgColor = "#10b981";
//     if (color === "var(--info)") bgColor = "#8b5cf6";

//     return {
//       background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
//       textColor: "#ffffff",

//       border: "none",
//       boxShadow: `0 4px 12px ${bgColor}40`
//     };
//   };

//   const styles = getStyles();

//   return (
//     <div style={{
//       background: styles.background,
//       borderRadius: "12px",
//       padding: "20px",
//       color: styles.textColor,
//       boxShadow: styles.boxShadow,
//       border: styles.border,
//       transition: "all 0.3s ease"
//     }}>
//       <div style={{ 
//         fontSize: "14px", 
//         opacity: 0.9, 
//         marginBottom: "8px" 
//       }}>
//         {label}
//       </div>
//       <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>
//         {value.toLocaleString()}
//       </div>
//       <div style={{ fontSize: "13px", opacity: 0.9, display: "flex", alignItems: "center", gap: "4px" }}>
//         <span>{icon}</span>
//         <span>{description}</span>
//       </div>
//     </div>
//   );
// }

// interface ActionButtonProps {
//   icon: React.ReactNode;
//   label: string;
//   color: string;
// }

// function ActionButton({ icon, label, color }: ActionButtonProps) {
//   return (
//     <button
//       style={{
//         background: "none",
//         border: "none",
//         cursor: "pointer",
//         padding: "6px",
//         borderRadius: "4px",
//         color: "var(--text-tertiary)",
//         transition: "all 0.2s",
//         fontSize: "14px"
//       }}
//       title={label}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.color = color;
//         e.currentTarget.style.backgroundColor = `${color}20`;
//         e.currentTarget.style.transform = "scale(1.1)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.color = "var(--text-tertiary)";
//         e.currentTarget.style.backgroundColor = "transparent";
//         e.currentTarget.style.transform = "scale(1)";
//       }}
//     >
//       {icon}
//     </button>
//   );
// }

// interface VideoCardProps {
//   video: TopVideo;
//   formatDuration: (seconds: number) => string;
//   getCategoryColor: (category: string) => string;
// }

// function VideoCard({ video, formatDuration, getCategoryColor }: VideoCardProps) {
//   const navigate = useNavigate();

//   return (
//     <div style={{
//       background: "var(--card-bg)",
//       borderRadius: "12px",
//       overflow: "hidden",
//       border: "1px solid var(--border-color)",
//       boxShadow: "var(--card-shadow)",
//       transition: "transform 0.2s, box-shadow 0.2s",
//       cursor: "pointer"
//     }}
//     onClick={() => navigate(`/video/${video.id}`)}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.transform = "translateY(-4px)";
//       e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = "translateY(0)";
//       e.currentTarget.style.boxShadow = "var(--card-shadow)";
//     }}
//     >
//       <div style={{ position: "relative", paddingTop: "56.25%" }}>
//         <div style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: "var(--bg-tertiary)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center"
//         }}>
//           <span style={{ fontSize: "48px" }}>🎥</span>
//         </div>
//         <div style={{
//           position: "absolute",
//           bottom: "8px",
//           right: "8px",
//           background: "rgba(0,0,0,0.7)",
//           color: "#fff",
//           padding: "4px 8px",
//           borderRadius: "4px",
//           fontSize: "12px"
//         }}>
//           {formatDuration(video.duration)}
//         </div>
//       </div>
//       <div style={{ padding: "16px" }}>
//         <div style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "8px"
//         }}>
//           <h4 style={{ 
//             margin: 0, 
//             fontSize: "14px", 
//             fontWeight: "600", 
//             color: "var(--text-primary)" 
//           }}>
//             {video.title}
//           </h4>
//           <span style={{
//             padding: "4px 8px",
//             borderRadius: "4px",
//             fontSize: "10px",
//             fontWeight: "600",
//             background: `${getCategoryColor(video.category)}20`,
//             color: getCategoryColor(video.category)
//           }}>
//             {video.category}
//           </span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//             <FaEye size={12} style={{ color: "var(--text-tertiary)" }} />
//             <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
//               {video.views.toLocaleString()} visualizações
//             </span>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//             <FaHeart size={12} style={{ color: "var(--text-tertiary)" }} />
//             <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
//               {Math.floor(video.views * 0.15)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const tableHeaderStyle: React.CSSProperties = {
//   padding: "12px 16px",
//   textAlign: "left",
//   fontSize: "12px",
//   fontWeight: "600",
//   color: "var(--text-tertiary)",
//   textTransform: "uppercase",
//   letterSpacing: "0.05em"
// };

// const tableCellStyle: React.CSSProperties = {
//   padding: "16px",
//   fontSize: "13px",
//   color: "var(--text-secondary)"
// };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useTheme } from "../components/contexts/ThemeContext";
import {
  FaUsers,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaVideo,
  FaChartPie,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaQrcode,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaDownload,
  FaShare,
  FaHeart,
  FaTrash,
  FaEdit,
  FaPlus,
  FaMapMarkerAlt,
  FaMobile,
  FaTablet,
  FaLaptop,
  FaGlobeAmericas
} from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";

// Interface para Scans Recentes
interface ScanRecente {
  id: string;
  qrCode: string;
  localizacao: string;
  dispositivo: "Mobile" | "Desktop" | "Tablet";
  navegador: string;
  data: string;
  hora: string;
  termoId?: string;
  termoTitulo?: string;
}

interface DashboardStats {
  // Métricas principais
  totalUsuarios: number;
  totalTermos: number;
  termosEmAnalise: number;
  termosPublicados: number;
  totalVideos: number;
  
  // Métricas de QR Code
  totalQRCodes: number;
  totalScans: number;
  favoritesCount: number;
  scansToday: number;
  scansWeek: number;
  scansMonth: number;
  scansGrowth: number;
  
  // Estatísticas de dispositivos
  scansPorDispositivo: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  
  // Relatório por categoria
  categorias: {
    nome: string;
    totalTermos: number;
    totalVideos: number;
    porcentagem: number;
    cor: string;
  }[];
}

interface RecentTermo {
  id: string;
  titulo: string;
  tipo: "termo" | "video";
  status: "analise" | "publicado" | "recusado";
  autor: string;
  dataCriacao: string;
  categoria: string;
  visualizacoes?: number;
}

interface AtividadeRecente {
  id: string;
  tipo: "novo_termo" | "aprovacao" | "recusa" | "novo_video" | "scan";
  descricao: string;
  usuario: string;
  data: string;
  icone: React.ReactNode;
  cor: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    // Métricas principais
    totalUsuarios: 0,
    totalTermos: 0,
    termosEmAnalise: 0,
    termosPublicados: 0,
    totalVideos: 0,
    
    // Métricas de QR Code
    totalQRCodes: 0,
    totalScans: 0,
    favoritesCount: 0,
    scansToday: 0,
    scansWeek: 0,
    scansMonth: 0,
    scansGrowth: 12.5,
    
    // Estatísticas de dispositivos
    scansPorDispositivo: {
      mobile: 0,
      desktop: 0,
      tablet: 0
    },
    
    // Categorias
    categorias: []
  });
  
  const [termosRecentes, setTermosRecentes] = useState<RecentTermo[]>([]);
  const [atividadesRecentes, setAtividadesRecentes] = useState<AtividadeRecente[]>([]);
  const [scansRecentes, setScansRecentes] = useState<ScanRecente[]>([]);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados mockados
      setStats({
        // Métricas principais
        totalUsuarios: 245,
        totalTermos: 189,
        termosEmAnalise: 23,
        termosPublicados: 142,
        totalVideos: 67,
        
        // Métricas de QR Code
        totalQRCodes: 156,
        totalScans: 12453,
        favoritesCount: 342,
        scansToday: 127,
        scansWeek: 892,
        scansMonth: 3456,
        scansGrowth: 12.5,
        
        // Estatísticas de dispositivos
        scansPorDispositivo: {
          mobile: 8452,
          desktop: 2989,
          tablet: 1012
        },
        
        // Relatório por categoria
        categorias: [
          { 
            nome: "Consentimento", 
            totalTermos: 45, 
            totalVideos: 18,
            porcentagem: 24,
            cor: "#2563eb"
          },
          { 
            nome: "Responsabilidade", 
            totalTermos: 38, 
            totalVideos: 12,
            porcentagem: 20,
            cor: "#10b981"
          },
          { 
            nome: "Confidencialidade", 
            totalTermos: 32, 
            totalVideos: 10,
            porcentagem: 17,
            cor: "#8b5cf6"
          },
          { 
            nome: "Adesão", 
            totalTermos: 28, 
            totalVideos: 9,
            porcentagem: 15,
            cor: "#f59e0b"
          },
          { 
            nome: "Autorização", 
            totalTermos: 25, 
            totalVideos: 8,
            porcentagem: 13,
            cor: "#ec4899"
          },
          { 
            nome: "Outros", 
            totalTermos: 21, 
            totalVideos: 10,
            porcentagem: 11,
            cor: "#6b7280"
          }
        ]
      });

      setTermosRecentes([
        {
          id: "1",
          titulo: "Termo de Consentimento - Pesquisa Acadêmica",
          tipo: "termo",
          status: "analise",
          autor: "João Silva",
          dataCriacao: "2024-02-20",
          categoria: "Consentimento"
        },
        {
          id: "2",
          titulo: "Sinais básicos de emergência",
          tipo: "video",
          status: "publicado",
          autor: "Maria Oliveira",
          dataCriacao: "2024-02-19",
          categoria: "Emergência",
          visualizacoes: 1234
        },
        {
          id: "3",
          titulo: "Termo de Responsabilidade - Equipamentos",
          tipo: "termo",
          status: "publicado",
          autor: "Admin Sistema",
          dataCriacao: "2024-02-18",
          categoria: "Responsabilidade"
        },
        {
          id: "4",
          titulo: "Vocabulário escolar em Libras",
          tipo: "video",
          status: "analise",
          autor: "Pedro Costa",
          dataCriacao: "2024-02-17",
          categoria: "Educação",
          visualizacoes: 0
        },
        {
          id: "5",
          titulo: "Termo de Confidencialidade - Dados",
          tipo: "termo",
          status: "recusado",
          autor: "Ana Santos",
          dataCriacao: "2024-02-16",
          categoria: "Confidencialidade"
        }
      ]);

      setAtividadesRecentes([
        {
          id: "1",
          tipo: "novo_termo",
          descricao: "Novo termo enviado para análise",
          usuario: "João Silva",
          data: "há 10 minutos",
          icone: <FaFileAlt />,
          cor: "var(--info)"
        },
        {
          id: "2",
          tipo: "aprovacao",
          descricao: "Termo aprovado e publicado",
          usuario: "Maria Oliveira",
          data: "há 25 minutos",
          icone: <FaCheckCircle />,
          cor: "var(--success)"
        },
        {
          id: "3",
          tipo: "scan",
          descricao: "QR Code escaneado - São Paulo",
          usuario: "Usuário anônimo",
          data: "há 32 minutos",
          icone: <FaEye />,
          cor: "var(--warning)"
        },
        {
          id: "4",
          tipo: "novo_video",
          descricao: "Novo vídeo adicionado",
          usuario: "Pedro Costa",
          data: "há 1 hora",
          icone: <FaVideo />,
          cor: "var(--primary)"
        },
        {
          id: "5",
          tipo: "recusa",
          descricao: "Termo recusado - justificativa enviada",
          usuario: "Ana Santos",
          data: "há 2 horas",
          icone: <FaExclamationTriangle />,
          cor: "var(--danger)"
        },
        {
          id: "6",
          tipo: "scan",
          descricao: "QR Code escaneado - Rio de Janeiro",
          usuario: "Usuário anônimo",
          data: "há 3 horas",
          icone: <FaEye />,
          cor: "var(--warning)"
        }
      ]);

      // Scans Recentes
      setScansRecentes([
        {
          id: "1",
          qrCode: "Termo de Consentimento",
          localizacao: "São Paulo, SP",
          dispositivo: "Mobile",
          navegador: "Chrome",
          data: "2024-02-20",
          hora: "14:32",
          termoId: "1",
          termoTitulo: "Termo de Consentimento"
        },
        {
          id: "2",
          qrCode: "Sinais de Emergência",
          localizacao: "Rio de Janeiro, RJ",
          dispositivo: "Desktop",
          navegador: "Firefox",
          data: "2024-02-20",
          hora: "13:45",
          termoId: "2",
          termoTitulo: "Sinais básicos de emergência"
        },
        {
          id: "3",
          qrCode: "Vocabulário Escolar",
          localizacao: "Belo Horizonte, MG",
          dispositivo: "Mobile",
          navegador: "Safari",
          data: "2024-02-20",
          hora: "11:20",
          termoId: "4",
          termoTitulo: "Vocabulário escolar em Libras"
        },
        {
          id: "4",
          qrCode: "Direitos do Paciente",
          localizacao: "Curitiba, PR",
          dispositivo: "Tablet",
          navegador: "Chrome",
          data: "2024-02-20",
          hora: "10:05",
          termoId: "3",
          termoTitulo: "Direitos do Paciente"
        },
        {
          id: "5",
          qrCode: "Saudações em Libras",
          localizacao: "Salvador, BA",
          dispositivo: "Mobile",
          navegador: "Instagram",
          data: "2024-02-20",
          hora: "09:30",
          termoId: "5",
          termoTitulo: "Saudações em Libras"
        },
        {
          id: "6",
          qrCode: "Termo de Responsabilidade",
          localizacao: "Brasília, DF",
          dispositivo: "Desktop",
          navegador: "Edge",
          data: "2024-02-19",
          hora: "22:15",
          termoId: "6",
          termoTitulo: "Termo de Responsabilidade"
        },
        {
          id: "7",
          qrCode: "Confidencialidade",
          localizacao: "Fortaleza, CE",
          dispositivo: "Mobile",
          navegador: "Chrome",
          data: "2024-02-19",
          hora: "20:40",
          termoId: "7",
          termoTitulo: "Termo de Confidencialidade"
        }
      ]);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      analise: { bg: "var(--warning-light)", color: "var(--warning)", text: "Em análise" },
      publicado: { bg: "var(--success-light)", color: "var(--success)", text: "Publicado" },
      recusado: { bg: "var(--danger-light)", color: "var(--danger)", text: "Recusado" }
    };
    const style = styles[status as keyof typeof styles];
    
    return (
      <span style={{
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        background: style.bg,
        color: style.color
      }}>
        {style.text}
      </span>
    );
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
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={{ color: "var(--text-tertiary)" }}>Carregando dashboard...</p>
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
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.subtitle}>
              Visão geral da plataforma LibrasQR
            </p>
          </div>

          {/* Seletor de período */}
          <div style={styles.timeRangeSelector}>
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                style={{
                  ...styles.timeRangeButton,
                  background: timeRange === range ? "var(--primary)" : "transparent",
                  color: timeRange === range ? "#fff" : "var(--text-secondary)",
                  borderColor: timeRange === range ? "var(--primary)" : "var(--border-color)"
                }}
              >
                {range === "week" ? "Semana" : range === "month" ? "Mês" : "Ano"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards de Métricas Principais */}
        <div style={styles.statsGrid}>
          <StatCard
            icon={<FaUsers size={24} />}
            label="Total de Usuários"
            value={formatNumber(stats.totalUsuarios)}
            change="+8%"
            changeType="positive"
            color="var(--primary)"
            bgColor="var(--primary-soft)"
          />
          <StatCard
            icon={<FaFileAlt size={24} />}
            label="Total de Termos"
            value={formatNumber(stats.totalTermos)}
            change="+12%"
            changeType="positive"
            color="var(--success)"
            bgColor="var(--success-light)"
          />
          <StatCard
            icon={<FaClock size={24} />}
            label="Em Análise"
            value={formatNumber(stats.termosEmAnalise)}
            change="+3"
            changeType="positive"
            color="var(--warning)"
            bgColor="var(--warning-light)"
          />
          <StatCard
            icon={<FaCheckCircle size={24} />}
            label="Publicados"
            value={formatNumber(stats.termosPublicados)}
            change="+15%"
            changeType="positive"
            color="var(--info)"
            bgColor="var(--info-light)"
          />
          <StatCard
            icon={<FaVideo size={24} />}
            label="Vídeos em Libras"
            value={formatNumber(stats.totalVideos)}
            change="+5"
            changeType="positive"
            color="#8b5cf6"
            bgColor="#8b5cf620"
          />
        </div>

        {/* Relatório por Categoria e Estatísticas de Dispositivos */}
        <div style={styles.twoColumnGrid}>
          {/* Relatório por Categoria */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <FaChartPie /> Categorias
              </h3>
            </div>
            <div style={styles.categoriasList}>
              {stats.categorias.map((cat) => (
                <div key={cat.nome} style={styles.categoriaItem}>
                  <div style={styles.categoriaHeader}>
                    <span style={styles.categoriaNome}>{cat.nome}</span>
                    <span style={styles.categoriaCount}>{cat.totalTermos} termos</span>
                  </div>
                  <div style={styles.categoriaBar}>
                    <div style={{
                      ...styles.categoriaBarFill,
                      width: `${cat.porcentagem}%`,
                      background: cat.cor
                    }} />
                  </div>
                  <div style={styles.categoriaFooter}>
                    <span style={styles.categoriaVideo}>
                      <FaVideo size={10} /> {cat.totalVideos} vídeos
                    </span>
                    <span style={styles.categoriaPorcentagem}>{cat.porcentagem}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas de Dispositivos */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <FaGlobeAmericas /> Dispositivos
              </h3>
            </div>
            <div style={styles.deviceStats}>
              <div style={styles.deviceItem}>
                <div style={styles.deviceIcon}>
                  <FaLaptop color="var(--success)" />
                </div>
                <div style={styles.deviceInfo}>
                  <span style={styles.deviceName}>Desktop (Administradores)</span>
                  <span style={styles.deviceCount}>{formatNumber(stats.scansPorDispositivo.desktop)} scans</span>
                </div>
                <div style={styles.devicePercentage}>
                  {Math.round((stats.scansPorDispositivo.desktop / stats.totalScans) * 100)}%
                </div>
              </div>
              <div style={styles.deviceBar}>
                <div style={{
                  ...styles.deviceBarFill,
                  width: `${(stats.scansPorDispositivo.desktop / stats.totalScans) * 100}%`,
                  background: "var(--success)"
                }} />
              </div>

              <div style={styles.deviceItem}>
                <div style={styles.deviceIcon}>
                  <FaMobile color="var(--primary)" />
                </div>
                <div style={styles.deviceInfo}>
                  <span style={styles.deviceName}>Mobile</span>
                  <span style={styles.deviceCount}>{formatNumber(stats.scansPorDispositivo.mobile)} scans</span>
                </div>
                <div style={styles.devicePercentage}>
                  {Math.round((stats.scansPorDispositivo.mobile / stats.totalScans) * 100)}%
                </div>
              </div>
              <div style={styles.deviceBar}>
                <div style={{
                  ...styles.deviceBarFill,
                  width: `${(stats.scansPorDispositivo.mobile / stats.totalScans) * 100}%`,
                  background: "var(--primary)"
                }} />
              </div>

              <div style={styles.deviceItem}>
                <div style={styles.deviceIcon}>
                  <FaTablet color="var(--warning)" />
                </div>
                <div style={styles.deviceInfo}>
                  <span style={styles.deviceName}>Tablet</span>
                  <span style={styles.deviceCount}>{formatNumber(stats.scansPorDispositivo.tablet)} scans</span>
                </div>
                <div style={styles.devicePercentage}>
                  {Math.round((stats.scansPorDispositivo.tablet / stats.totalScans) * 100)}%
                </div>
              </div>
              <div style={styles.deviceBar}>
                <div style={{
                  ...styles.deviceBarFill,
                  width: `${(stats.scansPorDispositivo.tablet / stats.totalScans) * 100}%`,
                  background: "var(--warning)"
                }} />
              </div>
            </div>

            <div style={styles.totalScans}>
              <span>Total de Scans</span>
              <strong>{formatNumber(stats.totalScans)}</strong>
            </div>
          </div>
        </div>

        {/* Scans Recentes */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <FaEye /> Scans Recentes
            </h2>
            <button
              onClick={() => navigate("/scans")}
              style={styles.viewAllButton}
            >
              Ver todos os scans
            </button>
          </div>

          <div style={styles.scansTable}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableHeaderCell}>QR Code</th>
                  <th style={styles.tableHeaderCell}>Localização</th>
                  <th style={styles.tableHeaderCell}>Dispositivo</th>
                  <th style={styles.tableHeaderCell}>Navegador</th>
                  <th style={styles.tableHeaderCell}>Data/Hora</th>
                  <th style={styles.tableHeaderCell}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {scansRecentes.map((scan) => (
                  <tr
                    key={scan.id}
                    style={styles.tableRow}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={styles.tableCell}>
                      <div style={styles.scanQrInfo}>
                        <FaQrcode size={14} color="var(--primary)" />
                        <span>{scan.qrCode}</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.scanLocation}>
                        <FaMapMarkerAlt size={12} color="var(--text-tertiary)" />
                        <span>{scan.localizacao}</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.scanDevice}>
                        {getDeviceIcon(scan.dispositivo)}
                        <span>{scan.dispositivo}</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.scanBrowser}>{scan.navegador}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.scanDateTime}>
                        <div>{scan.data}</div>
                        <div style={styles.scanTime}>{scan.hora}</div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => scan.termoId && navigate(`/termos/${scan.termoId}`)}
                        style={styles.viewScanButton}
                        title="Ver termo"
                      >
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Termos Recentes e Atividades */}
        <div style={styles.twoColumnGrid}>
          {/* Termos Recentes */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Termos Recentes</h3>
              <button
                onClick={() => navigate("/termos/gerenciar")}
                style={styles.viewAllButton}
              >
                Ver todos
              </button>
            </div>

            <div style={styles.termosList}>
              {termosRecentes.map((termo) => (
                <div
                  key={termo.id}
                  style={styles.termoItem}
                  onClick={() => navigate(`/termos/${termo.id}`)}
                >
                  <div style={styles.termoIcon}>
                    {termo.tipo === "termo" ? <FaFileAlt /> : <FaVideo />}
                  </div>
                  <div style={styles.termoInfo}>
                    <div style={styles.termoHeader}>
                      <span style={styles.termoTitulo}>{termo.titulo}</span>
                      {getStatusBadge(termo.status)}
                    </div>
                    <div style={styles.termoMeta}>
                      <span>{termo.autor}</span>
                      <span>•</span>
                      <span>{termo.categoria}</span>
                      <span>•</span>
                      <span style={styles.termoData}>
                        <FaCalendarAlt size={10} />
                        {termo.dataCriacao}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atividades Recentes */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Atividades Recentes</h3>
            </div>

            <div style={styles.atividadesList}>
              {atividadesRecentes.map((atividade) => (
                <div key={atividade.id} style={styles.atividadeItem}>
                  <div style={{
                    ...styles.atividadeIcon,
                    background: `${atividade.cor}20`,
                    color: atividade.cor
                  }}>
                    {atividade.icone}
                  </div>
                  <div style={styles.atividadeInfo}>
                    <div style={styles.atividadeDescricao}>
                      {atividade.descricao}
                    </div>
                    <div style={styles.atividadeMeta}>
                      <span>{atividade.usuario}</span>
                      <span>•</span>
                      <span>{atividade.data}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Métricas de QR Code */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Métricas de QR Code</h2>
          
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <IoQrCode size={20} color="var(--primary)" />
                <span style={styles.metricLabel}>Total de QR Codes</span>
              </div>
              <div style={styles.metricValue}>{formatNumber(stats.totalQRCodes)}</div>
            </div>

            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <FaEye size={20} color="var(--success)" />
                <span style={styles.metricLabel}>Total de Scans</span>
              </div>
              <div style={styles.metricValue}>{formatNumber(stats.totalScans)}</div>
            </div>

            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <FaHeart size={20} color="var(--danger)" />
                <span style={styles.metricLabel}>Favoritos</span>
              </div>
              <div style={styles.metricValue}>{formatNumber(stats.favoritesCount)}</div>
            </div>

            <div style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <FaCalendarAlt size={20} color="var(--warning)" />
                <span style={styles.metricLabel}>Scans Hoje</span>
              </div>
              <div style={styles.metricValue}>{formatNumber(stats.scansToday)}</div>
            </div>
          </div>
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

// Componente StatCard
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
      ...styles.statCard,
      borderLeft: `4px solid ${color}`
    }}>
      <div style={styles.statCardContent}>
        <div>
          <div style={styles.statLabel}>{label}</div>
          <div style={styles.statValue}>{value}</div>
          <div style={styles.statChange}>
            {changeType === "positive" ? (
              <FaArrowUp size={12} style={{ color: "var(--success)" }} />
            ) : (
              <FaArrowDown size={12} style={{ color: "var(--danger)" }} />
            )}
            <span style={{
              color: changeType === "positive" ? "var(--success)" : "var(--danger)",
              fontWeight: "600"
            }}>
              {change}
            </span>
          </div>
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
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px"
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
    color: "var(--text-primary)"
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "var(--text-tertiary)"
  },
  timeRangeSelector: {
    display: "flex",
    gap: "8px",
    background: "var(--bg-tertiary)",
    padding: "4px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)"
  },
  timeRangeButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "32px"
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
    alignItems: "flex-start"
  },
  statLabel: {
    fontSize: "13px",
    color: "var(--text-tertiary)",
    marginBottom: "8px"
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginBottom: "8px"
  },
  statChange: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px"
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    marginBottom: "32px"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "32px"
  },
  card: {
    background: "var(--card-bg)",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
    padding: "20px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  cardTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  viewAllButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  categoriasList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  categoriaItem: {
    width: "100%"
  },
  categoriaHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px"
  },
  categoriaNome: {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-primary)"
  },
  categoriaCount: {
    fontSize: "12px",
    color: "var(--text-tertiary)"
  },
  categoriaBar: {
    width: "100%",
    height: "8px",
    background: "var(--border-color)",
    borderRadius: "4px",
    marginBottom: "6px",
    overflow: "hidden"
  },
  categoriaBarFill: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s ease"
  },
  categoriaFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  categoriaVideo: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  categoriaPorcentagem: {
    fontSize: "11px",
    fontWeight: "600",
    color: "var(--text-secondary)"
  },
  deviceStats: {
    marginBottom: "16px"
  },
  deviceItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "4px"
  },
  deviceIcon: {
    width: "32px",
    textAlign: "center"
  },
  deviceInfo: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deviceName: {
    fontSize: "13px",
    fontWeight: "500",
    color: "var(--text-primary)"
  },
  deviceCount: {
    fontSize: "12px",
    color: "var(--text-tertiary)"
  },
  devicePercentage: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-primary)",
    minWidth: "45px",
    textAlign: "right"
  },
  deviceBar: {
    width: "100%",
    height: "6px",
    background: "var(--border-color)",
    borderRadius: "3px",
    marginBottom: "16px",
    overflow: "hidden"
  },
  deviceBarFill: {
    height: "100%",
    borderRadius: "3px",
    transition: "width 0.3s ease"
  },
  totalScans: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    background: "var(--bg-tertiary)",
    borderRadius: "8px",
    fontSize: "13px",
    color: "var(--text-secondary)"
  },
  scansTable: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px"
  },
  tableHeader: {
    background: "var(--bg-tertiary)",
    borderBottom: "1px solid var(--border-color)"
  },
  tableHeaderCell: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-tertiary)",
    textTransform: "uppercase"
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
  scanQrInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  scanLocation: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  scanDevice: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  scanBrowser: {
    padding: "4px 8px",
    borderRadius: "4px",
    background: "var(--bg-tertiary)",
    fontSize: "11px"
  },
  scanDateTime: {
    display: "flex",
    flexDirection: "column"
  },
  scanTime: {
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  viewScanButton: {
    background: "none",
    border: "none",
    color: "var(--primary)",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    transition: "all 0.2s"
  },
  termosList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  termoItem: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  termoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: "var(--bg-tertiary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-secondary)"
  },
  termoInfo: {
    flex: 1
  },
  termoHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
    flexWrap: "wrap"
  },
  termoTitulo: {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-primary)"
  },
  termoMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: "var(--text-tertiary)",
    flexWrap: "wrap"
  },
  termoData: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  atividadesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  atividadeItem: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    borderRadius: "8px",
    background: "var(--bg-tertiary)"
  },
  atividadeIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px"
  },
  atividadeInfo: {
    flex: 1
  },
  atividadeDescricao: {
    fontSize: "13px",
    fontWeight: "500",
    color: "var(--text-primary)",
    marginBottom: "4px"
  },
  atividadeMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "11px",
    color: "var(--text-tertiary)"
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginTop: "16px"
  },
  metricCard: {
    background: "var(--card-bg)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid var(--border-color)"
  },
  metricHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px"
  },
  metricLabel: {
    fontSize: "13px",
    color: "var(--text-tertiary)"
  },
  metricValue: {
    fontSize: "20px",
    fontWeight: "600",
    color: "var(--text-primary)"
  }
};