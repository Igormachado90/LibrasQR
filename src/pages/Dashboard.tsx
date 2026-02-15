import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/Card/StatCard";
import LineChart from "../components/Charts/LineChart";
import DataTable from "../components/Table/DataTable";
import RelatorioAcompanhamento from "../components/Table/RelatorioAcompanhamento";
import OrientacoesEscola from "../components/Table/OrientacoesEscola";
import { supabase } from "../lib/supabase";
import {
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaCheck,
  FaCalendarAlt,
  FaHourglass,
  FaStar,
  FaClock,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaDownload
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalDisciplinas: 0,
    alunosAtivos: 0,
    atendimentosHoje: 0,
    proximosAtendimentos: 0,
    totalProfessores: 0,
    totalAulas: 0,
    mediaAvaliacoes: 0
  });

  // Buscar dados reais do Supabase
  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);

      // Buscar total de alunos
      const { count: totalAlunos, error: errorAlunos } = await supabase
        .from("Alunos")
        .select("*", { count: 'exact', head: true });

      if (errorAlunos) throw errorAlunos;

      // Buscar alunos ativos (com alguma aula nos últimos 30 dias)
      const trintaDiasAtras = new Date();
      trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

      const { count: alunosAtivos, error: errorAtivos } = await supabase
        .from("Alunos")
        .select(`
          *,
          Aulas_Alunos!inner(
            Aulas!inner(
              Data_hora_inicio
            )
          )
        `, { count: 'exact', head: true })
        .gte("Aulas_Alunos.Aulas.Data_hora_inicio", trintaDiasAtras.toISOString());

      // Buscar atendimentos de hoje
      const hoje = new Date();
      const inicioHoje = new Date(hoje.setHours(0, 0, 0, 0)).toISOString();
      const fimHoje = new Date(hoje.setHours(23, 59, 59, 999)).toISOString();

      const { count: atendimentosHoje, error: errorHoje } = await supabase
        .from("Aulas")
        .select("*", { count: 'exact', head: true })
        .gte("Data_hora_inicio", inicioHoje)
        .lte("Data_hora_inicio", fimHoje)
        .in("Status", ["agendada", "em_andamento"]);

      // Buscar próximos atendimentos (próximos 7 dias)
      const proximaSemana = new Date();
      proximaSemana.setDate(proximaSemana.getDate() + 7);

      const { count: proximosAtendimentos, error: errorProximos } = await supabase
        .from("Aulas")
        .select("*", { count: 'exact', head: true })
        .gte("Data_hora_inicio", new Date().toISOString())
        .lte("Data_hora_inicio", proximaSemana.toISOString())
        .eq("Status", "agendada");

      setStats({
        totalDisciplinas: 0,
        totalAlunos: totalAlunos || 0,
        alunosAtivos: alunosAtivos || 0,
        atendimentosHoje: atendimentosHoje || 0,
        proximosAtendimentos: proximosAtendimentos || 0,
        totalProfessores: 0,
        totalAulas: 0,
        mediaAvaliacoes: 0
      });

    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "3px solid #e5e7eb",
            borderTopColor: "#4F46E5",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <div>
          <h1 style={{
            fontSize: "40px",
            fontWeight: "600",
            color: "#1f2937",
            margin: 0
          }}>
            Dashboard
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#6b7280",
            marginTop: "4px"
          }}>
            Visão geral do sistema de acompanhamento
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              color: "#374151",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb";
              e.currentTarget.style.borderColor = "#9ca3af";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#d1d5db";
            }}
          >
            <span>🔄</span>
            Atualizar
          </button>
          <button
            onClick={() => navigate("/relatorios")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4F46E5",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#4338CA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4F46E5";
            }}
          >
            <span>📊</span>
            Ver Relatórios
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "24px"
        }}
      >
        <StatCard
          title="Total de Alunos"
          value={stats.totalAlunos.toString()}
          subtitle="Cadastrados no sistema"
          icon={<FaUsers size={24} color="#4F46E5" />}
          bgColor="linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)"
          borderColor="#C4B5FD"
          onClick={() => navigate("/alunos")}
        />
        <StatCard
          title="Alunos Ativos"
          value={stats.alunosAtivos.toString()}
          subtitle="Em acompanhamento (30 dias)"
          icon={<FaCheck size={24} color="#16A34A" />}
          bgColor="linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
          borderColor="#86EFAC"
          onClick={() => navigate("/alunos?status=ativo")}
        />
        <StatCard
          title="Atendimentos Hoje"
          value={stats.atendimentosHoje.toString()}
          subtitle="Sessões registradas"
          icon={<FaCalendarAlt size={24} color="#F97316" />}
          bgColor="linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
          borderColor="#FDBA74"
          onClick={() => navigate("/aulas?data=hoje")}
        />
        <StatCard
          title="Próximos Atendimentos"
          value={stats.proximosAtendimentos.toString()}
          subtitle="Agendados (7 dias)"
          icon={<FaHourglass size={24} color="#0EA5E9" />}
          bgColor="linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
          borderColor="#7DD3FC"
          onClick={() => navigate("/aulas?status=agendada")}
        />
      </div>

      {/* Gráficos e Relatórios */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "24px"
      }}>
        <RelatorioAcompanhamento />
        <LineChart

          title="Evolução de Atendimentos"
          height={300}
        />
      </div>

      {/* Tabela de Dados */}
      <div style={{ marginBottom: "24px" }}>
        <DataTable />
      </div>

      {/* Orientações da Escola */}
      <OrientacoesEscola />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </DashboardLayout>
  );
}