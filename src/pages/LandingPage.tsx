// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import {
//     FaChalkboardTeacher,
//     FaCalendarAlt,
//     FaChartBar,
//     FaBook,
//     FaUsers,
//     FaShieldAlt,
//     FaBell,
//     FaFileAlt,
//     FaCheckCircle,
//     FaStar,
//     FaClock,
//     FaMobile,
//     FaUniversalAccess,
//     FaAssistiveListeningSystems,
//     FaBraille,
//     FaSignLanguage,
//     FaWheelchair,
//     FaHandsHelping
// } from "react-icons/fa";

// export default function LandingPage() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");

//     const features = [
//         {
//             icon: <FaChalkboardTeacher size={32} color="#4F46E5" />,
//             title: "Gestão de Professores",
//             description: "Cadastro completo com perfil profissional, especialidades, disponibilidade e histórico de aulas."
//         },
//         {
//             icon: <FaCalendarAlt size={32} color="#4F46E5" />,
//             title: "Agendamento Inteligente",
//             description: "Sistema de calendário com gestão de horários, conflitos e notificações automáticas."
//         },
//         {
//             icon: <FaChartBar size={32} color="#4F46E5" />,
//             title: "Relatórios Detalhados",
//             description: "Estatísticas, métricas de desempenho, relatórios financeiros e análise de crescimento."
//         },
//         {
//             icon: <FaBook size={32} color="#4F46E5" />,
//             title: "Controle de Aulas",
//             description: "CRUD completo com status (agendada, realizada, cancelada), histórico e avaliações."
//         },
//         {
//             icon: <FaUsers size={32} color="#4F46E5" />,
//             title: "Gestão de Alunos",
//             description: "Perfil de alunos, histórico de aulas, preferências e métricas de progresso."
//         },
//         {
//             icon: <FaUniversalAccess size={32} color="#4F46E5" />,
//             title: "Agente Inclusivo",
//             description: "Suporte especializado para alunos com necessidades especiais, adaptação curricular e acompanhamento personalizado."
//         }
//     ];

//     const benefits = [
//         {
//             icon: <FaShieldAlt size={24} color="#10b981" />,
//             title: "Autenticação Segura",
//             description: "Sistema JWT com controle de acesso baseado em roles (professor e administrador)"
//         },
//         {
//             icon: <FaChartBar size={24} color="#10b981" />,
//             title: "Dashboard Personalizado",
//             description: "Visões específicas para professores e administradores com métricas relevantes"
//         },
//         {
//             icon: <FaBook size={24} color="#10b981" />,
//             title: "Gestão de Disciplinas",
//             description: "Cadastro e categorização de matérias com status ativo/inativo"
//         },
//         {
//             icon: <FaUsers size={24} color="#10b981" />,
//             title: "Gestão de Turmas",
//             description: "Organização de aulas em grupos com controle de vagas e períodos"
//         },
//         {
//             icon: <FaFileAlt size={24} color="#10b981" />,
//             title: "Relatórios Financeiros",
//             description: "Análise de receitas, pagamentos pendentes e desempenho financeiro"
//         },
//         {
//             icon: <FaBell size={24} color="#10b981" />,
//             title: "Notificações Automáticas",
//             description: "Alertas por email e sistema sobre agendamentos, cancelamentos e lembretes"
//         }
//     ];

//     const inclusiveFeatures = [
//         {
//             icon: <FaAssistiveListeningSystems size={24} color="#4F46E5" />,
//             title: "Suporte para Deficiência Auditiva",
//             description: "Recursos visuais e textuais complementares, intérpretes de libras disponíveis"
//         },
//         {
//             icon: <FaBraille size={24} color="#4F46E5" />,
//             title: "Suporte para Deficiência Visual",
//             description: "Compatibilidade com leitores de tela, materiais em áudio e braille"
//         },
//         {
//             icon: <FaSignLanguage size={24} color="#4F46E5" />,
//             title: "Comunicação Acessível",
//             description: "Tradução simultânea para libras em aulas ao vivo e materiais adaptados"
//         },
//         {
//             icon: <FaWheelchair size={24} color="#4F46E5" />,
//             title: "Acessibilidade Física",
//             description: "Recomendação de espaços acessíveis para aulas presenciais"
//         },
//         {
//             icon: <FaUniversalAccess size={24} color="#4F46E5" />,
//             title: "Adaptação Curricular",
//             description: "Planos de ensino personalizados conforme necessidades específicas"
//         },
//         {
//             icon: <FaHandsHelping size={24} color="#4F46E5" />,
//             title: "Acompanhamento Especializado",
//             description: "Suporte de profissionais especializados em educação inclusiva"
//         }
//     ];

//     const testimonials = [
//         {
//             name: "Maria Silva",
//             role: "Diretora de Ensino",
//             text: "A plataforma transformou nossa gestão de tutoria. Reduzimos em 70% o tempo gasto com agendamentos e aumentamos a satisfação dos alunos.",
//             rating: 5,
//             image: "https://randomuser.me/api/portraits/women/1.jpg"
//         },
//         {
//             name: "João Santos",
//             role: "Professor de Matemática",
//             text: "O sistema é intuitivo e completo. Consigo gerenciar minha disponibilidade, ver relatórios e receber pagamentos tudo em um lugar.",
//             rating: 5,
//             image: "https://randomuser.me/api/portraits/men/2.jpg"
//         },
//         {
//             name: "Ana Oliveira",
//             role: "Coordenadora Pedagógica",
//             text: "Os relatórios detalhados nos ajudaram a identificar áreas de melhoria e otimizar a alocação de professores.",
//             rating: 5,
//             image: "https://randomuser.me/api/portraits/women/3.jpg"
//         }
//     ];

//     const plans = [
//         {
//             name: "Básico",
//             price: "R$ 97",
//             period: "/mês",
//             features: [
//                 "Até 5 professores",
//                 "Até 50 alunos",
//                 "Gestão de aulas",
//                 "Relatórios básicos",
//                 "Suporte por email"
//             ],
//             recommended: false
//         },
//         {
//             name: "Profissional",
//             price: "R$ 197",
//             period: "/mês",
//             features: [
//                 "Até 20 professores",
//                 "Até 200 alunos",
//                 "Gestão de aulas avançada",
//                 "Relatórios completos",
//                 "Notificações automáticas",
//                 "Suporte prioritário"
//             ],
//             recommended: true
//         },
//         {
//             name: "Empresarial",
//             price: "R$ 397",
//             period: "/mês",
//             features: [
//                 "Professores ilimitados",
//                 "Alunos ilimitados",
//                 "API personalizada",
//                 "Relatórios customizados",
//                 "Integração financeira",
//                 "Suporte 24/7"
//             ],
//             recommended: false
//         }
//     ];

//     const stats = [
//         { value: "500+", label: "Instituições" },
//         { value: "5.000+", label: "Professores" },
//         { value: "50.000+", label: "Alunos" },
//         { value: "200.000+", label: "Aulas realizadas" }
//     ];

//     return (
//         <div style={{ backgroundColor: "#fff" }}>
//             {/* Header */}
//             <header style={{
//                 padding: "10px 90px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 borderBottom: "1px solid #e5e7eb",
//                 position: "sticky",
//                 top: 0,
//                 backgroundColor: "#fff",
//                 zIndex: 1000,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
//             }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                     <img src="/logoTEA.png"
//                         alt="VinculoTEA"
//                         style={{
//                             width: "90px"
//                         }} />
//                 </div>

//                 <nav style={{ display: "flex", gap: "30px" }}>
//                     <a href="#features" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Funcionalidades</a>
//                     <a href="#inclusive" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Inclusivo</a>
//                     <a href="#benefits" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Benefícios</a>
//                     <a href="#plans" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Planos</a>
//                     <a href="#testimonials" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Depoimentos</a>

//                 </nav>

//                 <div style={{ display: "flex", gap: "15px" }}>
//                     <button
//                         onClick={() => navigate("/login")}
//                         style={{
//                             padding: "10px 20px",
//                             borderRadius: "8px",
//                             border: "1px solid #d1d5db",
//                             backgroundColor: "#fff",
//                             color: "#374151",
//                             cursor: "pointer",
//                             fontSize: "14px",
//                             fontWeight: "500",
//                             transition: "all 0.2s"
//                         }}
//                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
//                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
//                     >
//                         Entrar
//                     </button>
//                     <button
//                         onClick={() => navigate("/register")}
//                         style={{
//                             padding: "10px 20px",
//                             borderRadius: "8px",
//                             border: "none",
//                             backgroundColor: "#4F46E5",
//                             color: "#fff",
//                             cursor: "pointer",
//                             fontSize: "14px",
//                             fontWeight: "500",
//                             transition: "all 0.2s"
//                         }}
//                         onMouseEnter={(e) => {
//                             e.currentTarget.style.backgroundColor = "#4338CA";
//                             e.currentTarget.style.transform = "translateY(-2px)";
//                             e.currentTarget.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.3)";
//                         }}
//                         onMouseLeave={(e) => {
//                             e.currentTarget.style.backgroundColor = "#4F46E5";
//                             e.currentTarget.style.transform = "translateY(0)";
//                             e.currentTarget.style.boxShadow = "none";
//                         }}
//                     >
//                         Começar Agora
//                     </button>
//                 </div>
//             </header>

//             {/* Hero Section */}
//             <section style={{
//                 padding: "80px 40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 maxWidth: "1200px",
//                 margin: "0 auto",
//                 gap: "60px"
//             }}>
//                 <div style={{ flex: 1 }}>
//                     <h1 style={{
//                         fontSize: "48px",
//                         fontWeight: "700",
//                         color: "#1f2937",
//                         margin: "0 0 20px 0",
//                         lineHeight: "1.2"
//                     }}>
//                         <span style={{ color: "#4F46E5" }}>Plataforma Completa</span><br />
//                         de Gestão de Tutoria
//                     </h1>
//                     <p style={{
//                         fontSize: "18px",
//                         color: "#6b7280",
//                         marginBottom: "30px",
//                         lineHeight: "1.6"
//                     }}>
//                         Gerencie aulas particulares, professores, agendamentos e pagamentos em um único lugar.
//                         Sistema profissional para instituições de ensino e tutores independentes.
//                     </p>

//                     <div style={{ display: "flex", gap: "15px", marginBottom: "40px" }}>
//                         <button
//                             onClick={() => navigate("/register")}
//                             style={{
//                                 padding: "16px 32px",
//                                 borderRadius: "10px",
//                                 border: "none",
//                                 backgroundColor: "#4F46E5",
//                                 color: "#fff",
//                                 cursor: "pointer",
//                                 fontSize: "16px",
//                                 fontWeight: "600",
//                                 transition: "all 0.2s",
//                                 boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)"
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor = "#4338CA";
//                                 e.currentTarget.style.transform = "translateY(-2px)";
//                                 e.currentTarget.style.boxShadow = "0 6px 12px rgba(79, 70, 229, 0.3)";
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor = "#4F46E5";
//                                 e.currentTarget.style.transform = "translateY(0)";
//                                 e.currentTarget.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.25)";
//                             }}
//                         >
//                             Comprar Agora
//                         </button>
//                         <button
//                             onClick={() => {
//                                 const features = document.getElementById("features");
//                                 features?.scrollIntoView({ behavior: "smooth" });
//                             }}
//                             style={{
//                                 padding: "16px 32px",
//                                 borderRadius: "10px",
//                                 border: "2px solid #4F46E5",
//                                 backgroundColor: "transparent",
//                                 color: "#4F46E5",
//                                 cursor: "pointer",
//                                 fontSize: "16px",
//                                 fontWeight: "600",
//                                 transition: "all 0.2s"
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor = "#f5f3ff";
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor = "transparent";
//                             }}
//                         >
//                             Saiba Mais
//                         </button>
//                     </div>

//                     {/* Trust badges */}
//                     <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                             <FaShieldAlt color="#10b981" size={16} />
//                             <span style={{ fontSize: "14px", color: "#6b7280" }}>SSL Seguro</span>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                             <FaClock color="#10b981" size={16} />
//                             <span style={{ fontSize: "14px", color: "#6b7280" }}>Suporte 24/7</span>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                             <FaMobile color="#10b981" size={16} />
//                             <span style={{ fontSize: "14px", color: "#6b7280" }}>App Mobile</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div style={{ flex: 1 }}>
//                     <img
//                         src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
//                         alt="Dashboard Preview"
//                         style={{
//                             width: "100%",
//                             borderRadius: "20px",
//                             boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
//                         }}
//                     />
//                 </div>
//             </section>

//             {/* Stats Section */}
//             <section style={{
//                 padding: "60px 40px",
//                 backgroundColor: "#f9fafb",
//                 borderTop: "1px solid #e5e7eb",
//                 borderBottom: "1px solid #e5e7eb"
//             }}>
//                 <div style={{
//                     maxWidth: "1200px",
//                     margin: "0 auto",
//                     display: "grid",
//                     gridTemplateColumns: "repeat(4, 1fr)",
//                     gap: "30px"
//                 }}>
//                     {stats.map((stat, index) => (
//                         <div key={index} style={{ textAlign: "center" }}>
//                             <h3 style={{
//                                 fontSize: "36px",
//                                 fontWeight: "700",
//                                 color: "#4F46E5",
//                                 margin: "0 0 5px 0"
//                             }}>
//                                 {stat.value}
//                             </h3>
//                             <p style={{ fontSize: "16px", color: "#6b7280", margin: 0 }}>
//                                 {stat.label}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section id="features" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
//                 <h2 style={{
//                     fontSize: "36px",
//                     fontWeight: "700",
//                     color: "#1f2937",
//                     textAlign: "center",
//                     marginBottom: "20px"
//                 }}>
//                     Funcionalidades Principais
//                 </h2>
//                 <p style={{
//                     fontSize: "18px",
//                     color: "#6b7280",
//                     textAlign: "center",
//                     maxWidth: "700px",
//                     margin: "0 auto 60px auto"
//                 }}>
//                     Tudo que você precisa para gerenciar sua plataforma de tutoria de forma profissional
//                 </p>

//                 <div style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(3, 1fr)",
//                     gap: "30px"
//                 }}>
//                     {features.map((feature, index) => (
//                         <div
//                             key={index}
//                             style={{
//                                 padding: "30px",
//                                 borderRadius: "16px",
//                                 backgroundColor: "#fff",
//                                 boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                                 border: "1px solid #e5e7eb",
//                                 transition: "all 0.3s"
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.transform = "translateY(-5px)";
//                                 e.currentTarget.style.boxShadow = "0 10px 30px rgba(79, 70, 229, 0.1)";
//                                 e.currentTarget.style.borderColor = "#4F46E5";
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.transform = "translateY(0)";
//                                 e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
//                                 e.currentTarget.style.borderColor = "#e5e7eb";
//                             }}
//                         >
//                             <div style={{ marginBottom: "20px" }}>{feature.icon}</div>
//                             <h3 style={{
//                                 fontSize: "20px",
//                                 fontWeight: "600",
//                                 color: "#1f2937",
//                                 marginBottom: "10px"
//                             }}>
//                                 {feature.title}
//                             </h3>
//                             <p style={{
//                                 fontSize: "15px",
//                                 color: "#6b7280",
//                                 lineHeight: "1.6",
//                                 margin: 0
//                             }}>
//                                 {feature.description}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Inclusive Agent Section */}
//             <section id="inclusive" style={{
//                 padding: "80px 40px",
//                 background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)"
//             }}>
//                 <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                     <div style={{ textAlign: "center", marginBottom: "60px" }}>
//                         <div style={{
//                             display: "inline-flex",
//                             alignItems: "center",
//                             gap: "10px",
//                             backgroundColor: "#4F46E5",
//                             color: "#fff",
//                             padding: "8px 20px",
//                             borderRadius: "30px",
//                             marginBottom: "20px"
//                         }}>
//                             <FaUniversalAccess size={20} />
//                             <span style={{ fontWeight: "500" }}>Educação para Todos</span>
//                         </div>
//                         <h2 style={{
//                             fontSize: "36px",
//                             fontWeight: "700",
//                             color: "#1f2937",
//                             marginBottom: "20px"
//                         }}>
//                             Agente Inclusivo
//                         </h2>
//                         <p style={{
//                             fontSize: "18px",
//                             color: "#4b5563",
//                             maxWidth: "800px",
//                             margin: "0 auto"
//                         }}>
//                             Nossa plataforma oferece suporte especializado para garantir que todos os alunos,
//                             independentemente de suas necessidades, tenham acesso à educação de qualidade.
//                         </p>
//                     </div>

//                     <div style={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(3, 1fr)",
//                         gap: "30px",
//                         marginBottom: "60px"
//                     }}>
//                         {inclusiveFeatures.map((feature, index) => (
//                             <div
//                                 key={index}
//                                 style={{
//                                     padding: "30px",
//                                     borderRadius: "16px",
//                                     backgroundColor: "#fff",
//                                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                                     textAlign: "center",
//                                     transition: "all 0.3s"
//                                 }}
//                                 onMouseEnter={(e) => {
//                                     e.currentTarget.style.transform = "scale(1.05)";
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     e.currentTarget.style.transform = "scale(1)";
//                                 }}
//                             >
//                                 <div style={{
//                                     width: "60px",
//                                     height: "60px",
//                                     borderRadius: "30px",
//                                     backgroundColor: "#f5f3ff",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     margin: "0 auto 20px"
//                                 }}>
//                                     {feature.icon}
//                                 </div>
//                                 <h3 style={{
//                                     fontSize: "18px",
//                                     fontWeight: "600",
//                                     color: "#1f2937",
//                                     marginBottom: "10px"
//                                 }}>
//                                     {feature.title}
//                                 </h3>
//                                 <p style={{
//                                     fontSize: "14px",
//                                     color: "#6b7280",
//                                     margin: 0,
//                                     lineHeight: "1.6"
//                                 }}>
//                                     {feature.description}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>

//                     <div style={{
//                         backgroundColor: "#4F46E5",
//                         borderRadius: "20px",
//                         padding: "50px",
//                         color: "#fff",
//                         textAlign: "center"
//                     }}>
//                         <h3 style={{
//                             fontSize: "28px",
//                             fontWeight: "700",
//                             marginBottom: "20px"
//                         }}>
//                             Compromisso com a Inclusão
//                         </h3>
//                         <p style={{
//                             fontSize: "16px",
//                             maxWidth: "700px",
//                             margin: "0 auto 30px",
//                             opacity: 0.9
//                         }}>
//                             Acreditamos que a educação deve ser acessível a todos. Por isso, investimos constantemente
//                             em tecnologias e metodologias inclusivas.
//                         </p>
//                         <button
//                             onClick={() => navigate("/contact")}
//                             style={{
//                                 padding: "14px 32px",
//                                 borderRadius: "10px",
//                                 border: "2px solid #fff",
//                                 backgroundColor: "transparent",
//                                 color: "#fff",
//                                 cursor: "pointer",
//                                 fontSize: "16px",
//                                 fontWeight: "600",
//                                 transition: "all 0.2s"
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor = "#fff";
//                                 e.currentTarget.style.color = "#4F46E5";
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor = "transparent";
//                                 e.currentTarget.style.color = "#fff";
//                             }}
//                         >
//                             Saiba mais sobre nosso programa inclusivo
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Benefits Section */}
//             <section id="benefits" style={{
//                 padding: "80px 40px",
//                 backgroundColor: "#f9fafb"
//             }}>
//                 <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                     <h2 style={{
//                         fontSize: "36px",
//                         fontWeight: "700",
//                         color: "#1f2937",
//                         textAlign: "center",
//                         marginBottom: "20px"
//                     }}>
//                         Benefícios Exclusivos
//                     </h2>
//                     <p style={{
//                         fontSize: "18px",
//                         color: "#6b7280",
//                         textAlign: "center",
//                         maxWidth: "700px",
//                         margin: "0 auto 60px auto"
//                     }}>
//                         Tecnologia de ponta para maximizar resultados
//                     </p>

//                     <div style={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(3, 1fr)",
//                         gap: "30px"
//                     }}>
//                         {benefits.map((benefit, index) => (
//                             <div
//                                 key={index}
//                                 style={{
//                                     display: "flex",
//                                     gap: "15px",
//                                     padding: "20px",
//                                     borderRadius: "12px",
//                                     backgroundColor: "#fff",
//                                     boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
//                                 }}
//                             >
//                                 <div style={{
//                                     minWidth: "48px",
//                                     height: "48px",
//                                     borderRadius: "12px",
//                                     backgroundColor: "#e0f2fe",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center"
//                                 }}>
//                                     {benefit.icon}
//                                 </div>
//                                 <div>
//                                     <h4 style={{
//                                         fontSize: "16px",
//                                         fontWeight: "600",
//                                         color: "#1f2937",
//                                         marginBottom: "5px"
//                                     }}>
//                                         {benefit.title}
//                                     </h4>
//                                     <p style={{
//                                         fontSize: "14px",
//                                         color: "#6b7280",
//                                         margin: 0,
//                                         lineHeight: "1.5"
//                                     }}>
//                                         {benefit.description}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Plans Section */}
//             <section id="plans" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
//                 <h2 style={{
//                     fontSize: "36px",
//                     fontWeight: "700",
//                     color: "#1f2937",
//                     textAlign: "center",
//                     marginBottom: "20px"
//                 }}>
//                     Planos e Preços
//                 </h2>
//                 <p style={{
//                     fontSize: "18px",
//                     color: "#6b7280",
//                     textAlign: "center",
//                     maxWidth: "700px",
//                     margin: "0 auto 60px auto"
//                 }}>
//                     Escolha o plano ideal para sua instituição
//                 </p>

//                 <div style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(3, 1fr)",
//                     gap: "30px"
//                 }}>
//                     {plans.map((plan, index) => (
//                         <div
//                             key={index}
//                             style={{
//                                 padding: "40px 30px",
//                                 borderRadius: "20px",
//                                 backgroundColor: "#fff",
//                                 boxShadow: plan.recommended
//                                     ? "0 20px 40px rgba(79, 70, 229, 0.15)"
//                                     : "0 4px 20px rgba(0,0,0,0.05)",
//                                 border: plan.recommended ? "2px solid #4F46E5" : "1px solid #e5e7eb",
//                                 position: "relative"
//                             }}
//                         >
//                             {plan.recommended && (
//                                 <div style={{
//                                     position: "absolute",
//                                     top: "-12px",
//                                     left: "50%",
//                                     transform: "translateX(-50%)",
//                                     backgroundColor: "#4F46E5",
//                                     color: "#fff",
//                                     padding: "4px 16px",
//                                     borderRadius: "20px",
//                                     fontSize: "14px",
//                                     fontWeight: "500"
//                                 }}>
//                                     Mais Popular
//                                 </div>
//                             )}

//                             <h3 style={{
//                                 fontSize: "24px",
//                                 fontWeight: "600",
//                                 color: "#1f2937",
//                                 marginBottom: "10px"
//                             }}>
//                                 {plan.name}
//                             </h3>

//                             <div style={{ marginBottom: "20px" }}>
//                                 <span style={{
//                                     fontSize: "36px",
//                                     fontWeight: "700",
//                                     color: "#4F46E5"
//                                 }}>
//                                     {plan.price}
//                                 </span>
//                                 <span style={{ fontSize: "16px", color: "#6b7280" }}>
//                                     {plan.period}
//                                 </span>
//                             </div>

//                             <ul style={{
//                                 listStyle: "none",
//                                 padding: 0,
//                                 margin: "0 0 30px 0"
//                             }}>
//                                 {plan.features.map((feature, idx) => (
//                                     <li
//                                         key={idx}
//                                         style={{
//                                             display: "flex",
//                                             alignItems: "center",
//                                             gap: "10px",
//                                             marginBottom: "12px",
//                                             color: "#4b5563",
//                                             fontSize: "15px"
//                                         }}
//                                     >
//                                         <FaCheckCircle color="#10b981" size={16} />
//                                         {feature}
//                                     </li>
//                                 ))}
//                             </ul>

//                             <button
//                                 onClick={() => navigate("/register")}
//                                 style={{
//                                     width: "100%",
//                                     padding: "14px",
//                                     borderRadius: "10px",
//                                     border: plan.recommended ? "none" : "2px solid #4F46E5",
//                                     backgroundColor: plan.recommended ? "#4F46E5" : "transparent",
//                                     color: plan.recommended ? "#fff" : "#4F46E5",
//                                     cursor: "pointer",
//                                     fontSize: "16px",
//                                     fontWeight: "600",
//                                     transition: "all 0.2s"
//                                 }}
//                                 onMouseEnter={(e) => {
//                                     if (plan.recommended) {
//                                         e.currentTarget.style.backgroundColor = "#4338CA";
//                                     } else {
//                                         e.currentTarget.style.backgroundColor = "#f5f3ff";
//                                     }
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     if (plan.recommended) {
//                                         e.currentTarget.style.backgroundColor = "#4F46E5";
//                                     } else {
//                                         e.currentTarget.style.backgroundColor = "transparent";
//                                     }
//                                 }}
//                             >
//                                 Começar Agora
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Testimonials Section */}
//             <section id="testimonials" style={{
//                 padding: "80px 40px",
//                 backgroundColor: "#f9fafb"
//             }}>
//                 <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                     <h2 style={{
//                         fontSize: "36px",
//                         fontWeight: "700",
//                         color: "#1f2937",
//                         textAlign: "center",
//                         marginBottom: "20px"
//                     }}>
//                         O que dizem nossos clientes
//                     </h2>
//                     <p style={{
//                         fontSize: "18px",
//                         color: "#6b7280",
//                         textAlign: "center",
//                         maxWidth: "700px",
//                         margin: "0 auto 60px auto"
//                     }}>
//                         Histórias reais de quem já transformou sua gestão
//                     </p>

//                     <div style={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(3, 1fr)",
//                         gap: "30px"
//                     }}>
//                         {testimonials.map((testimonial, index) => (
//                             <div
//                                 key={index}
//                                 style={{
//                                     padding: "30px",
//                                     borderRadius: "16px",
//                                     backgroundColor: "#fff",
//                                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
//                                 }}
//                             >
//                                 <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
//                                     {[...Array(testimonial.rating)].map((_, i) => (
//                                         <FaStar key={i} color="#f59e0b" size={18} />
//                                     ))}
//                                 </div>

//                                 <p style={{
//                                     fontSize: "15px",
//                                     color: "#4b5563",
//                                     lineHeight: "1.7",
//                                     marginBottom: "20px",
//                                     fontStyle: "italic"
//                                 }}>
//                                     "{testimonial.text}"
//                                 </p>

//                                 <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//                                     <img
//                                         src={testimonial.image}
//                                         alt={testimonial.name}
//                                         style={{
//                                             width: "50px",
//                                             height: "50px",
//                                             borderRadius: "50%",
//                                             objectFit: "cover"
//                                         }}
//                                     />
//                                     <div>
//                                         <h4 style={{
//                                             fontSize: "16px",
//                                             fontWeight: "600",
//                                             color: "#1f2937",
//                                             marginBottom: "4px"
//                                         }}>
//                                             {testimonial.name}
//                                         </h4>
//                                         <p style={{
//                                             fontSize: "14px",
//                                             color: "#6b7280",
//                                             margin: 0
//                                         }}>
//                                             {testimonial.role}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section style={{
//                 padding: "80px 40px",
//                 background: "linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)"
//             }}>
//                 <div style={{
//                     maxWidth: "800px",
//                     margin: "0 auto",
//                     textAlign: "center",
//                     color: "#fff"
//                 }}>
//                     <h2 style={{
//                         fontSize: "36px",
//                         fontWeight: "700",
//                         marginBottom: "20px"
//                     }}>
//                         Comece hoje mesmo
//                     </h2>
//                     <p style={{
//                         fontSize: "18px",
//                         marginBottom: "40px",
//                         opacity: 0.9
//                     }}>
//                         Transforme a gestão da sua plataforma de tutoria com nossa solução completa
//                     </p>

//                     <div style={{
//                         display: "flex",
//                         gap: "15px",
//                         justifyContent: "center"
//                     }}>
//                         <input
//                             type="email"
//                             placeholder="Seu melhor email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             style={{
//                                 padding: "16px 24px",
//                                 borderRadius: "10px",
//                                 border: "none",
//                                 width: "300px",
//                                 fontSize: "16px"
//                             }}
//                         />
//                         <button
//                             onClick={() => {
//                                 if (email) {
//                                     toast.success("Obrigado! Entraremos em contato.");
//                                     setEmail("");
//                                 } else {
//                                     toast.error("Por favor, informe seu email");
//                                 }
//                             }}
//                             style={{
//                                 padding: "16px 32px",
//                                 borderRadius: "10px",
//                                 border: "none",
//                                 backgroundColor: "#1f2937",
//                                 color: "#fff",
//                                 cursor: "pointer",
//                                 fontSize: "16px",
//                                 fontWeight: "600",
//                                 transition: "all 0.2s"
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor = "#111827";
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor = "#1f2937";
//                             }}
//                         >
//                             Receber Contato
//                         </button>
//                     </div>

//                     <p style={{
//                         fontSize: "14px",
//                         marginTop: "20px",
//                         opacity: 0.8
//                     }}>
//                         Ao informar seu email, você concorda com nossa Política de Privacidade
//                     </p>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer style={{
//                 padding: "60px 40px 30px",
//                 backgroundColor: "#111827",
//                 color: "#fff"
//             }}>
//                 <div style={{
//                     maxWidth: "1200px",
//                     margin: "0 auto",
//                     display: "grid",
//                     gridTemplateColumns: "repeat(4, 1fr)",
//                     gap: "40px",
//                     marginBottom: "40px"
//                 }}>
//                     <div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
//                             <img src="/logoTEA.png"
//                                 alt="VinculoTEA"
//                                 style={{
//                                     width: "90px",
//                                 }} />
//                         </div>
//                         <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.6" }}>
//                             A plataforma completa para gestão de tutoria e aulas particulares.
//                         </p>
//                     </div>

//                     <div>
//                         <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Produto</h4>
//                         <ul style={{ listStyle: "none", padding: 0 }}>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Funcionalidades</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#inclusive" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Agente Inclusivo</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Planos</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Segurança</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Atualizações</a></li>
//                         </ul>
//                     </div>

//                     <div>
//                         <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Suporte</h4>
//                         <ul style={{ listStyle: "none", padding: 0 }}>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Central de Ajuda</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Documentação</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Tutoriais</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Contato</a></li>
//                         </ul>
//                     </div>

//                     <div>
//                         <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Legal</h4>
//                         <ul style={{ listStyle: "none", padding: 0 }}>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Termos de Uso</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Política de Privacidade</a></li>
//                             <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Cookies</a></li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div style={{
//                     maxWidth: "1200px",
//                     margin: "0 auto",
//                     paddingTop: "30px",
//                     borderTop: "1px solid #374151",
//                     textAlign: "center",
//                     color: "#9ca3af",
//                     fontSize: "14px"
//                 }}>
//                     <p>© 2026 VinculoTEA. Todos os direitos reservados.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// }

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    FaChalkboardTeacher,
    FaCalendarAlt,
    FaChartBar,
    FaBook,
    FaUsers,
    FaShieldAlt,
    FaBell,
    FaFileAlt,
    FaCheckCircle,
    FaStar,
    FaClock,
    FaMobile,
    FaUniversalAccess,
    FaAssistiveListeningSystems,
    FaBraille,
    FaSignLanguage,
    FaWheelchair,
    FaHandsHelping,
    FaQrcode,
    FaVideo,
    FaEye,
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaClosedCaptioning,
    FaLanguage,
    FaGraduationCap,
    FaCertificate,
    FaHeart,
    FaShare,
    FaDownload,
    FaPrint,
    FaCopy,
    FaLink,
    FaGlobe,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone,
    FaWhatsapp,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaCode,
    FaLaptopCode,
    FaNetworkWired,
    FaDatabase,
    FaRobot,
    FaMicrochip,
    FaCloud,
    FaServer
} from "react-icons/fa";
import { IoQrCode, IoLibrary, IoSchool, IoVideocam } from "react-icons/io5";

export default function LandingPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // Estatísticas baseadas no texto
    const stats = [
        { value: "2.500+", label: "Termos em Libras" },
        { value: "800+", label: "Vídeos Educacionais" },
        { value: "15.000+", label: "Usuários Ativos" },
        { value: "50.000+", label: "QR Codes Gerados" }
    ];

    // Funcionalidades principais baseadas no texto
    const features = [
        {
            icon: <FaQrcode size={32} color="#4F46E5" />,
            title: "QR Codes para Acessibilidade",
            description: "Integração entre material impresso e digital: cada seção possui QR Code único que redireciona para vídeos em Libras, promovendo acessibilidade imediata."
        },
        {
            icon: <FaSignLanguage size={32} color="#4F46E5" />,
            title: "Glossário Bilíngue - GLIPa",
            description: "Glossário de Libras para Informática do Pará com termos técnicos de Programação, Banco de Dados, Redes e Hardware, validados pela comunidade surda."
        },
        {
            icon: <FaLaptopCode size={32} color="#4F46E5" />,
            title: "Lógica de Programação Acessível",
            description: "Ensino de algoritmos, variáveis, condicionais e laços com vídeos em Libras, superando barreiras linguísticas em conceitos abstratos."
        },
        {
            icon: <FaVideo size={32} color="#4F46E5" />,
            title: "Vídeos em Libras",
            description: "Conteúdos bilíngues (Português/Libras) com explicações conceituais, termos técnicos e exemplos práticos para cada tópico."
        },
        {
            icon: <IoLibrary size={32} color="#4F46E5" />,
            title: "Materiais Didáticos Acessíveis",
            description: "Apostilas, fichas de estudo e cartazes com QR Codes integrados para acesso imediato a vídeos explicativos em Libras."
        },
        {
            icon: <FaUniversalAccess size={32} color="#4F46E5" />,
            title: "Tecnologia Assistiva",
            description: "Recursos visuais, interface intuitiva e suporte bilíngue garantindo autonomia e inclusão para estudantes surdos."
        }
    ];

    // Benefícios baseados no texto
    const benefits = [
        {
            icon: <FaShieldAlt size={24} color="#10b981" />,
            title: "Neologismos Validados",
            description: "Sinais criados colaborativamente com comunidade surda, intérpretes e professores, respeitando parâmetros linguísticos da Libras."
        },
        {
            icon: <FaQrcode size={24} color="#10b981" />,
            title: "QR Codes Automáticos",
            description: "Gerados dinamicamente para cada seção do material, permitindo acesso rápido a vídeos em Libras."
        },
        {
            icon: <FaEye size={24} color="#10b981" />,
            title: "Monitoramento de Progresso",
            description: "Acompanhamento do avanço nos cursos, visualizações e conclusão de módulos."
        },
        {
            icon: <FaMobile size={24} color="#10b981" />,
            title: "Acesso Multiplataforma",
            description: "Disponível na web e em aplicativo móvel (React Native/Flutter) para Android e iOS."
        },
        {
            icon: <FaClock size={24} color="#10b981" />,
            title: "Atualização Contínua",
            description: "Novos termos e vídeos adicionados regularmente com base nas demandas dos cursos."
        },
        {
            icon: <FaUsers size={24} color="#10b981" />,
            title: "Comunidade Inclusiva",
            description: "Espaço para interação entre estudantes surdos, intérpretes e professores."
        }
    ];

    // Seção Inclusiva com base no texto
    const inclusiveFeatures = [
        {
            icon: <FaAssistiveListeningSystems size={24} color="#4F46E5" />,
            title: "Suporte para Deficiência Auditiva",
            description: "Recursos visuais, vídeos em Libras e legendas em todos os conteúdos, garantindo comunicação eficaz."
        },
        {
            icon: <FaSignLanguage size={24} color="#4F46E5" />,
            title: "Ensino Bilíngue",
            description: "Conteúdos em Português escrito e Libras como línguas de instrução, conforme Decreto nº 5.626/2005."
        },
        {
            icon: <FaLanguage size={24} color="#4F46E5" />,
            title: "Termos Técnicos em Libras",
            description: "Criação e validação de neologismos para conceitos de programação sem sinais oficiais."
        },
        {
            icon: <FaRobot size={24} color="#4F46E5" />,
            title: "Lógica de Programação",
            description: "Conceitos abstratos como algoritmos, variáveis e condicionais explicados visualmente em Libras."
        },
        {
            icon: <FaBraille size={24} color="#4F46E5" />,
            title: "Acessibilidade Visual",
            description: "Interface compatível com leitores de tela e alto contraste para estudantes com baixa visão."
        },
        {
            icon: <FaHandsHelping size={24} color="#4F46E5" />,
            title: "Acompanhamento Especializado",
            description: "Suporte de intérpretes de Libras e professores capacitados em educação inclusiva."
        }
    ];

    // Depoimentos adaptados
    const testimonials = [
        {
            name: "Maria Silva",
            role: "Estudante Surda - IFPA Tucuruí",
            text: "O GLIPa transformou meu aprendizado em Lógica de Programação. Agora consigo entender conceitos como 'laço de repetição' e 'condicional' com os vídeos em Libras.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            name: "João Santos",
            role: "Intérprete de Libras - UFPA",
            text: "Participar da criação dos neologismos foi fundamental. Construímos sinais que representam fielmente os conceitos técnicos, respeitando a estrutura da Libras.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
            name: "Profa. Ana Oliveira",
            role: "Coordenadora de Inclusão - IFPA",
            text: "Os QR Codes nos materiais impressos revolucionaram nossas aulas. Os alunos acessam os vídeos imediatamente, reduzindo barreiras linguísticas.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/3.jpg"
        }
    ];

    // Planos adaptados
    const plans = [
        {
            name: "Básico",
            price: "Grátis",
            period: "",
            features: [
                "Acesso a 500 termos do GLIPa",
                "50 vídeos em Libras",
                "QR Codes básicos",
                "Materiais didáticos introdutórios",
                "Suporte por email"
            ],
            recommended: false
        },
        {
            name: "Profissional",
            price: "R$ 97",
            period: "/mês",
            features: [
                "Acesso completo ao GLIPa (2.500+ termos)",
                "800+ vídeos em Libras",
                "QR Codes ilimitados",
                "Cursos completos de Programação",
                "Relatórios de progresso",
                "Suporte prioritário com intérpretes"
            ],
            recommended: true
        },
        {
            name: "Institucional",
            price: "R$ 297",
            period: "/mês",
            features: [
                "Acesso para múltiplos usuários",
                "API para integração com AVA",
                "Criação de neologismos personalizados",
                "Materiais customizáveis",
                "Relatórios institucionais",
                "Suporte 24/7 com equipe especializada"
            ],
            recommended: false
        }
    ];

    // Categorias de termos baseadas no texto
    const categories = [
        { name: "Lógica de Programação", count: 120, color: "#4F46E5" },
        { name: "Banco de Dados", count: 85, color: "#10b981" },
        { name: "Redes de Computadores", count: 94, color: "#f59e0b" },
        { name: "Hardware", count: 67, color: "#ec4899" },
        { name: "Engenharia de Software", count: 78, color: "#8b5cf6" },
        { name: "Informática Básica", count: 156, color: "#ef4444" }
    ];

    return (
        <div style={{ backgroundColor: "#fff" }}>
            {/* Header */}
            <header style={{
                padding: "10px 90px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e5e7eb",
                position: "sticky",
                top: 0,
                backgroundColor: "#fff",
                zIndex: 1000,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IoQrCode size={40} color="#4F46E5" />
                    <span style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>LibrasQR</span>
                </div>

                <nav style={{ display: "flex", gap: "30px" }}>
                    <a href="#features" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Funcionalidades</a>
                    <a href="#glipa" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>GLIPa</a>
                    <a href="#inclusive" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Inclusivo</a>
                    <a href="#benefits" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Benefícios</a>
                    <a href="#plans" style={{ color: "#4b5563", textDecoration: "none", fontSize: "15px" }}>Planos</a>
                </nav>

                <div style={{ display: "flex", gap: "15px" }}>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            backgroundColor: "#fff",
                            color: "#374151",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
                    >
                        Entrar
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#4F46E5",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#4338CA";
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#4F46E5";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        Começar Agora
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                padding: "80px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "1200px",
                margin: "0 auto",
                gap: "60px"
            }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{
                        fontSize: "48px",
                        fontWeight: "700",
                        color: "#1f2937",
                        margin: "0 0 20px 0",
                        lineHeight: "1.2"
                    }}>
                        <span style={{ color: "#4F46E5" }}>Educação Inclusiva</span><br />
                        para Surdos no Pará
                    </h1>
                    <p style={{
                        fontSize: "18px",
                        color: "#6b7280",
                        marginBottom: "30px",
                        lineHeight: "1.6"
                    }}>
                        O LibrasQR integra tecnologia assistiva, QR Codes e o Glossário GLIPa para tornar o ensino de Lógica de Programação acessível a estudantes surdos do IFPA e instituições parceiras.
                    </p>

                    <div style={{ display: "flex", gap: "15px", marginBottom: "40px" }}>
                        <button
                            onClick={() => navigate("/register")}
                            style={{
                                padding: "16px 32px",
                                borderRadius: "10px",
                                border: "none",
                                backgroundColor: "#4F46E5",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "600",
                                transition: "all 0.2s",
                                boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#4338CA";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 6px 12px rgba(79, 70, 229, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#4F46E5";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.25)";
                            }}
                        >
                            Começar Agora
                        </button>
                        <button
                            onClick={() => {
                                const glipa = document.getElementById("glipa");
                                glipa?.scrollIntoView({ behavior: "smooth" });
                            }}
                            style={{
                                padding: "16px 32px",
                                borderRadius: "10px",
                                border: "2px solid #4F46E5",
                                backgroundColor: "transparent",
                                color: "#4F46E5",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "600",
                                transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#f5f3ff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                            }}
                        >
                            Conheça o GLIPa
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <FaShieldAlt color="#10b981" size={16} />
                            <span style={{ fontSize: "14px", color: "#6b7280" }}>Lei nº 10.436/2002</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <FaSignLanguage color="#10b981" size={16} />
                            <span style={{ fontSize: "14px", color: "#6b7280" }}>Decreto nº 5.626/2005</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <FaGraduationCap color="#10b981" size={16} />
                            <span style={{ fontSize: "14px", color: "#6b7280" }}>IFPA • UFPA • UEPA</span>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <img
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                        alt="Estudante usando Libras"
                        style={{
                            width: "100%",
                            borderRadius: "20px",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                        }}
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section style={{
                padding: "60px 40px",
                backgroundColor: "#f9fafb",
                borderTop: "1px solid #e5e7eb",
                borderBottom: "1px solid #e5e7eb"
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "30px"
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                            <h3 style={{
                                fontSize: "36px",
                                fontWeight: "700",
                                color: "#4F46E5",
                                margin: "0 0 5px 0"
                            }}>
                                {stat.value}
                            </h3>
                            <p style={{ fontSize: "16px", color: "#6b7280", margin: 0 }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#1f2937",
                    textAlign: "center",
                    marginBottom: "20px"
                }}>
                    Funcionalidades da Plataforma
                </h2>
                <p style={{
                    fontSize: "18px",
                    color: "#6b7280",
                    textAlign: "center",
                    maxWidth: "700px",
                    margin: "0 auto 60px auto"
                }}>
                    Tecnologias assistivas para garantir acessibilidade e inclusão no ensino de programação
                </p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "30px"
                }}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "30px",
                                borderRadius: "16px",
                                backgroundColor: "#fff",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                border: "1px solid #e5e7eb",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 10px 30px rgba(79, 70, 229, 0.1)";
                                e.currentTarget.style.borderColor = "#4F46E5";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                                e.currentTarget.style.borderColor = "#e5e7eb";
                            }}
                        >
                            <div style={{ marginBottom: "20px" }}>{feature.icon}</div>
                            <h3 style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                color: "#1f2937",
                                marginBottom: "10px"
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                fontSize: "15px",
                                color: "#6b7280",
                                lineHeight: "1.6",
                                margin: 0
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* GLIPa Section */}
            <section id="glipa" style={{
                padding: "80px 40px",
                background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "#4F46E5",
                            color: "#fff",
                            padding: "8px 20px",
                            borderRadius: "30px",
                            marginBottom: "20px"
                        }}>
                            <FaBook size={20} />
                            <span style={{ fontWeight: "500" }}>GLIPa</span>
                        </div>
                        <h2 style={{
                            fontSize: "36px",
                            fontWeight: "700",
                            color: "#1f2937",
                            marginBottom: "20px"
                        }}>
                            Glossário de Libras para Informática do Pará
                        </h2>
                        <p style={{
                            fontSize: "18px",
                            color: "#4b5563",
                            maxWidth: "800px",
                            margin: "0 auto"
                        }}>
                            Desenvolvido para atender às demandas regionais do estado do Pará, considerando suas particularidades culturais, tecnológicas e pedagógicas.
                        </p>
                    </div>

                    {/* Categorias do GLIPa */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                        marginBottom: "40px"
                    }}>
                        {categories.map((cat, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: "20px",
                                    borderRadius: "12px",
                                    backgroundColor: "#fff",
                                    border: "1px solid #e5e7eb",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <span style={{ fontSize: "16px", fontWeight: "500", color: "#1f2937" }}>
                                    {cat.name}
                                </span>
                                <span style={{
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    backgroundColor: `${cat.color}20`,
                                    color: cat.color,
                                    fontSize: "14px",
                                    fontWeight: "600"
                                }}>
                                    {cat.count} termos
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Processo de Validação */}
                    <div style={{
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                        padding: "40px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                    }}>
                        <h3 style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#1f2937",
                            marginBottom: "30px",
                            textAlign: "center"
                        }}>
                            Processo de Construção e Validação dos Neologismos
                        </h3>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "20px"
                        }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "25px",
                                    backgroundColor: "#4F46E5",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    margin: "0 auto 15px"
                                }}>
                                    1
                                </div>
                                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "5px" }}>Levantamento</h4>
                                <p style={{ fontSize: "14px", color: "#6b7280" }}>Termos técnicos sem sinais consolidados</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "25px",
                                    backgroundColor: "#4F46E5",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    margin: "0 auto 15px"
                                }}>
                                    2
                                </div>
                                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "5px" }}>Análise Conceitual</h4>
                                <p style={{ fontSize: "14px", color: "#6b7280" }}>Compreensão do significado técnico</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "25px",
                                    backgroundColor: "#4F46E5",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    margin: "0 auto 15px"
                                }}>
                                    3
                                </div>
                                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "5px" }}>Criação</h4>
                                <p style={{ fontSize: "14px", color: "#6b7280" }}>Ressignificação ou novos sinais</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "25px",
                                    backgroundColor: "#4F46E5",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    margin: "0 auto 15px"
                                }}>
                                    4
                                </div>
                                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "5px" }}>Validação</h4>
                                <p style={{ fontSize: "14px", color: "#6b7280" }}>Comunidade surda, intérpretes e professores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inclusive Features Section */}
            <section id="inclusive" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#1f2937",
                    textAlign: "center",
                    marginBottom: "20px"
                }}>
                    Educação Inclusiva para Surdos
                </h2>
                <p style={{
                    fontSize: "18px",
                    color: "#6b7280",
                    textAlign: "center",
                    maxWidth: "700px",
                    margin: "0 auto 60px auto"
                }}>
                    Fundamentado na Lei nº 10.436/2002 e no Decreto nº 5.626/2005, garantindo ensino bilíngue de qualidade
                </p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "30px"
                }}>
                    {inclusiveFeatures.map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "30px",
                                borderRadius: "16px",
                                backgroundColor: "#fff",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                textAlign: "center",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 10px 30px rgba(79, 70, 229, 0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                            }}
                        >
                            <div style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "30px",
                                backgroundColor: "#f5f3ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 20px"
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#1f2937",
                                marginBottom: "10px"
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                margin: 0,
                                lineHeight: "1.6"
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" style={{
                padding: "80px 40px",
                backgroundColor: "#f9fafb"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h2 style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        color: "#1f2937",
                        textAlign: "center",
                        marginBottom: "20px"
                    }}>
                        Benefícios da Plataforma
                    </h2>
                    <p style={{
                        fontSize: "18px",
                        color: "#6b7280",
                        textAlign: "center",
                        maxWidth: "700px",
                        margin: "0 auto 60px auto"
                    }}>
                        Tecnologia a serviço da inclusão e acessibilidade educacional
                    </p>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "30px"
                    }}>
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    gap: "15px",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                    transition: "all 0.3s"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateX(5px)";
                                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(79, 70, 229, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateX(0)";
                                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
                                }}
                            >
                                <div style={{
                                    minWidth: "48px",
                                    height: "48px",
                                    borderRadius: "12px",
                                    backgroundColor: "#e0f2fe",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h4 style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#1f2937",
                                        marginBottom: "5px"
                                    }}>
                                        {benefit.title}
                                    </h4>
                                    <p style={{
                                        fontSize: "14px",
                                        color: "#6b7280",
                                        margin: 0,
                                        lineHeight: "1.5"
                                    }}>
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section id="plans" style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#1f2937",
                    textAlign: "center",
                    marginBottom: "20px"
                }}>
                    Planos de Acesso
                </h2>
                <p style={{
                    fontSize: "18px",
                    color: "#6b7280",
                    textAlign: "center",
                    maxWidth: "700px",
                    margin: "0 auto 60px auto"
                }}>
                    Escolha o plano ideal para sua instituição ou estudo individual
                </p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "30px"
                }}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "40px 30px",
                                borderRadius: "20px",
                                backgroundColor: "#fff",
                                boxShadow: plan.recommended
                                    ? "0 20px 40px rgba(79, 70, 229, 0.15)"
                                    : "0 4px 20px rgba(0,0,0,0.05)",
                                border: plan.recommended ? "2px solid #4F46E5" : "1px solid #e5e7eb",
                                position: "relative"
                            }}
                        >
                            {plan.recommended && (
                                <div style={{
                                    position: "absolute",
                                    top: "-12px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: "#4F46E5",
                                    color: "#fff",
                                    padding: "4px 16px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    fontWeight: "500"
                                }}>
                                    Mais Popular
                                </div>
                            )}

                            <h3 style={{
                                fontSize: "24px",
                                fontWeight: "600",
                                color: "#1f2937",
                                marginBottom: "10px"
                            }}>
                                {plan.name}
                            </h3>

                            <div style={{ marginBottom: "20px" }}>
                                <span style={{
                                    fontSize: "36px",
                                    fontWeight: "700",
                                    color: "#4F46E5"
                                }}>
                                    {plan.price}
                                </span>
                                <span style={{ fontSize: "16px", color: "#6b7280" }}>
                                    {plan.period}
                                </span>
                            </div>

                            <ul style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "0 0 30px 0"
                            }}>
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            marginBottom: "12px",
                                            color: "#4b5563",
                                            fontSize: "15px"
                                        }}
                                    >
                                        <FaCheckCircle color="#10b981" size={16} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigate("/register")}
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    borderRadius: "10px",
                                    border: plan.recommended ? "none" : "2px solid #4F46E5",
                                    backgroundColor: plan.recommended ? "#4F46E5" : "transparent",
                                    color: plan.recommended ? "#fff" : "#4F46E5",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    transition: "all 0.2s"
                                }}
                                onMouseEnter={(e) => {
                                    if (plan.recommended) {
                                        e.currentTarget.style.backgroundColor = "#4338CA";
                                    } else {
                                        e.currentTarget.style.backgroundColor = "#f5f3ff";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (plan.recommended) {
                                        e.currentTarget.style.backgroundColor = "#4F46E5";
                                    } else {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }
                                }}
                            >
                                Começar Agora
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={{
                padding: "80px 40px",
                backgroundColor: "#f9fafb"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h2 style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        color: "#1f2937",
                        textAlign: "center",
                        marginBottom: "20px"
                    }}>
                        Depoimentos
                    </h2>
                    <p style={{
                        fontSize: "18px",
                        color: "#6b7280",
                        textAlign: "center",
                        maxWidth: "700px",
                        margin: "0 auto 60px auto"
                    }}>
                        Histórias reais de quem já utiliza a plataforma
                    </p>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "30px"
                    }}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: "30px",
                                    borderRadius: "16px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                    transition: "all 0.3s"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(79, 70, 229, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                                }}
                            >
                                <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} color="#f59e0b" size={18} />
                                    ))}
                                </div>

                                <p style={{
                                    fontSize: "15px",
                                    color: "#4b5563",
                                    lineHeight: "1.7",
                                    marginBottom: "20px",
                                    fontStyle: "italic"
                                }}>
                                    "{testimonial.text}"
                                </p>

                                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            objectFit: "cover"
                                        }}
                                    />
                                    <div>
                                        <h4 style={{
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            color: "#1f2937",
                                            marginBottom: "4px"
                                        }}>
                                            {testimonial.name}
                                        </h4>
                                        <p style={{
                                            fontSize: "14px",
                                            color: "#6b7280",
                                            margin: 0
                                        }}>
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: "80px 40px",
                background: "linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)"
            }}>
                <div style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    textAlign: "center",
                    color: "#fff"
                }}>
                    <h2 style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        marginBottom: "20px"
                    }}>
                        Transforme a Educação Inclusiva no Pará
                    </h2>
                    <p style={{
                        fontSize: "18px",
                        marginBottom: "40px",
                        opacity: 0.9
                    }}>
                        Junte-se ao IFPA, UFPA e UEPA na promoção do ensino acessível de programação para surdos
                    </p>

                    <div style={{
                        display: "flex",
                        gap: "15px",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        <input
                            type="email"
                            placeholder="Seu melhor email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: "16px 24px",
                                borderRadius: "10px",
                                border: "none",
                                width: "300px",
                                fontSize: "16px"
                            }}
                        />
                        <button
                            onClick={() => {
                                if (email) {
                                    toast.success("Obrigado! Entraremos em contato.");
                                    setEmail("");
                                } else {
                                    toast.error("Por favor, informe seu email");
                                }
                            }}
                            style={{
                                padding: "16px 32px",
                                borderRadius: "10px",
                                border: "none",
                                backgroundColor: "#1f2937",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "600",
                                transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#111827";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#1f2937";
                            }}
                        >
                            Receber Contato
                        </button>
                    </div>

                    <p style={{
                        fontSize: "14px",
                        marginTop: "20px",
                        opacity: 0.8
                    }}>
                        Ao informar seu email, você concorda com nossa Política de Privacidade
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: "60px 40px 30px",
                backgroundColor: "#111827",
                color: "#fff"
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "40px",
                    marginBottom: "40px"
                }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                            <IoQrCode size={40} color="#fff" />
                            <span style={{ fontSize: "24px", fontWeight: "700" }}>LibrasQR</span>
                        </div>
                        <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.6" }}>
                            Plataforma inclusiva para ensino de programação a estudantes surdos, integrando tecnologia assistiva e o GLIPa.
                        </p>
                        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                            <FaFacebook size={20} color="#9ca3af" style={{ cursor: "pointer" }} />
                            <FaInstagram size={20} color="#9ca3af" style={{ cursor: "pointer" }} />
                            <FaYoutube size={20} color="#9ca3af" style={{ cursor: "pointer" }} />
                            <FaLinkedin size={20} color="#9ca3af" style={{ cursor: "pointer" }} />
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Plataforma</h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "10px" }}><a href="#features" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Funcionalidades</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#glipa" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>GLIPa</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#inclusive" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Educação Inclusiva</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#plans" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Planos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Instituições</h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>IFPA</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>UFPA</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>UEPA</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Parcerias</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Suporte</h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Central de Ajuda</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Tutoriais em Libras</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>FAQ</a></li>
                            <li style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Contato</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    paddingTop: "30px",
                    borderTop: "1px solid #374151",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "14px"
                }}>
                    <p>© 2026 LibrasQR. Todos os direitos reservados. Desenvolvido com base na Lei nº 10.436/2002 e Decreto nº 5.626/2005.</p>
                </div>
            </footer>
        </div>
    );
}