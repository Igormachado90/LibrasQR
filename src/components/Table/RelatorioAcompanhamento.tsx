import { useState, useEffect } from "react";
import TableBase from "./TableBase";
import { supabase } from "../../lib/supabase";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

interface Indicador {
  id: string;
  label: string;
  valor: number;
  tendencia: number;
  cor: string;
}

export default function RelatorioAcompanhamento() {
  const [loading, setLoading] = useState(true);
  const [indicadores, setIndicadores] = useState<Indicador[]>([
    { id: "1", label: "Percentual Geral", valor: 75.55, tendencia: 10, cor: "#10B981" },
    { id: "2", label: "Assiduidade", valor: 82.3, tendencia: 5.2, cor: "#3B82F6" },
    { id: "3", label: "Comportamento", valor: 68.7, tendencia: -3.1, cor: "#EF4444" },
    { id: "4", label: "Desempenho", valor: 79.2, tendencia: 7.8, cor: "#F59E0B" },
    { id: "5", label: "Participação", valor: 71.8, tendencia: 2.3, cor: "#8B5CF6" }
  ]);

  const [dadosHabilidades, setDadosHabilidades] = useState({
    semanal: -9,
    anual: 30,
    diario: 70
  });

  useEffect(() => {
    fetchDadosReais();
  }, []);

  async function fetchDadosReais() {
    try {
      setLoading(true);
      
      // Buscar dados reais do Supabase (exemplo)
      const { data: aulas, error } = await supabase
        .from("Aulas")
        .select("Status, created_at")
        .gte("created_at", new Date(new Date().setDate(new Date().getDate() - 30)).toISOString());

      if (error) throw error;

      // Calcular métricas reais baseadas nos dados
      if (aulas && aulas.length > 0) {
        const totalAulas = aulas.length;
        const aulasRealizadas = aulas.filter(a => a.Status === "realizada").length;
        const percentual = (aulasRealizadas / totalAulas) * 100;
        
        setIndicadores(prev => prev.map(indicador => 
          indicador.label === "Percentual Geral" 
            ? { ...indicador, valor: Math.round(percentual * 100) / 100 }
            : indicador
        ));
      }

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  const getTendenciaIcon = (tendencia: number) => {
    if (tendencia > 0) {
      return <FaArrowUp color="#10B981" size={14} />;
    } else if (tendencia < 0) {
      return <FaArrowDown color="#EF4444" size={14} />;
    } else {
      return <FaMinus color="#6B7280" size={14} />;
    }
  };

  const getTendenciaColor = (tendencia: number) => {
    if (tendencia > 0) return "#10B981";
    if (tendencia < 0) return "#EF4444";
    return "#6B7280";
  };

  if (loading) {
    return (
      <TableBase
        title="Relatório de Acompanhamento"
        headers={["Indicador", "Valor", "Tendência"]}
        actions={<span style={{ color: "#22C55E", fontWeight: "bold" }}>Carregando...</span>}
      >
        <tr>
          <td colSpan={3} style={{ padding: "40px", textAlign: "center" }}>
            <div style={{
              display: "inline-block",
              width: "30px",
              height: "30px",
              border: "2px solid #e5e7eb",
              borderTopColor: "#4F46E5",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}></div>
          </td>
        </tr>
      </TableBase>
    );
  }

  return (
    <TableBase
      title="Relatório de Acompanhamento"
      headers={["Indicador", "Valor", "Tendência"]}
      actions={
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#22C55E", fontWeight: "bold", fontSize: "13px" }}>
            📊 Diário / Semanal (Interno)
          </span>
          <button
            onClick={fetchDadosReais}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              cursor: "pointer",
              fontSize: "11px",
              color: "#374151"
            }}
          >
            🔄 Atualizar
          </button>
        </div>
      }
    >
      {/* Linha em branco para espaçamento */}
      <tr>
        <td colSpan={3} style={{ 
          padding: "8px", 
          backgroundColor: "#035bb4",
          background: "linear-gradient(90deg, #035bb4 0%, #4F46E5 100%)"
        }}>
        </td>
      </tr>

      {/* Indicadores principais */}
      {indicadores.map((indicador, index) => (
        <tr key={indicador.id}>
          <td style={{ 
            padding: "16px", 
            fontWeight: index === 0 ? "bold" : "500", 
            fontSize: index === 0 ? "18px" : "14px",
            color: "#1f2937"
          }}>
            {indicador.label}
          </td>
          <td style={{ 
            padding: "16px", 
            fontSize: index === 0 ? "24px" : "18px", 
            fontWeight: "bold",
            color: indicador.cor
          }}>
            {indicador.valor.toFixed(1)}%
          </td>
          <td style={{ 
            padding: "16px", 
            color: getTendenciaColor(indicador.tendencia), 
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            {getTendenciaIcon(indicador.tendencia)}
            {indicador.tendencia > 0 ? "+" : ""}{indicador.tendencia}%
          </td>
        </tr>
      ))}

      {/* Gráficos de habilidades */}
      <tr>
        <td colSpan={3} style={{ 
          padding: "16px", 
          paddingTop: "24px", 
          paddingBottom: "24px",
          backgroundColor: "#f9fafb"
        }}>
          <div style={{ 
            fontWeight: "bold", 
            marginBottom: "16px",
            fontSize: "15px",
            color: "#1f2937"
          }}>
            📈 Gráficos de habilidades, comportamento-ABC, assiduidade e desempenho por disciplina
          </div>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            maxWidth: "500px",
            gap: "20px"
          }}>
            <div style={{ 
              textAlign: "center",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              flex: 1
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: dadosHabilidades.semanal > 0 ? "#10B981" : "#EF4444" }}>
                {dadosHabilidades.semanal > 0 ? "+" : ""}{dadosHabilidades.semanal}% {dadosHabilidades.semanal > 0 ? "↑" : "↓"}
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                Variação Semanal
              </div>
              <div style={{ 
                fontSize: "11px", 
                color: "#9CA3AF", 
                marginTop: "4px",
                padding: "2px 6px",
                backgroundColor: "#F3F4F6",
                borderRadius: "12px",
                display: "inline-block"
              }}>
                vs mês passado
              </div>
            </div>

            <div style={{ 
              textAlign: "center",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              flex: 1
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: dadosHabilidades.anual > 0 ? "#10B981" : "#EF4444" }}>
                +{dadosHabilidades.anual}% ↑
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                Progresso Anual
              </div>
              <div style={{ 
                fontSize: "11px", 
                color: "#9CA3AF", 
                marginTop: "4px",
                padding: "2px 6px",
                backgroundColor: "#F3F4F6",
                borderRadius: "12px",
                display: "inline-block"
              }}>
                meta: 50%
              </div>
            </div>

            <div style={{ 
              textAlign: "center",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              flex: 1
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10B981" }}>
                +{dadosHabilidades.diario}% ↑
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                Desempenho Diário
              </div>
              <div style={{ 
                fontSize: "11px", 
                color: "#9CA3AF", 
                marginTop: "4px",
                padding: "2px 6px",
                backgroundColor: "#F3F4F6",
                borderRadius: "12px",
                display: "inline-block"
              }}>
                recorde: 75%
              </div>
            </div>
          </div>

          {/* Barras de progresso */}
          <div style={{ marginTop: "24px" }}>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", color: "#6B7280" }}>Habilidades</span>
                <span style={{ fontSize: "12px", fontWeight: "bold", color: "#1F2937" }}>68%</span>
              </div>
              <div style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#E5E7EB",
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: "68%",
                  height: "100%",
                  backgroundColor: "#3B82F6",
                  borderRadius: "4px"
                }}></div>
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", color: "#6B7280" }}>Comportamento-ABC</span>
                <span style={{ fontSize: "12px", fontWeight: "bold", color: "#1F2937" }}>72%</span>
              </div>
              <div style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#E5E7EB",
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: "72%",
                  height: "100%",
                  backgroundColor: "#10B981",
                  borderRadius: "4px"
                }}></div>
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", color: "#6B7280" }}>Assiduidade</span>
                <span style={{ fontSize: "12px", fontWeight: "bold", color: "#1F2937" }}>85%</span>
              </div>
              <div style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#E5E7EB",
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: "85%",
                  height: "100%",
                  backgroundColor: "#F59E0B",
                  borderRadius: "4px"
                }}></div>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#F0F9FF",
            borderRadius: "8px",
            border: "1px solid #BAE6FD"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "13px", color: "#0369A1", fontWeight: "500" }}>
                  Média Geral de Desempenho
                </span>
                <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0369A1" }}>
                  75.6%
                </div>
              </div>
              <div style={{
                padding: "6px 12px",
                backgroundColor: "#10B981",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600"
              }}>
                Acima da média
              </div>
            </div>
            <p style={{
              fontSize: "12px",
              color: "#6B7280",
              marginTop: "8px",
              marginBottom: 0
            }}>
              Última atualização: {new Date().toLocaleDateString("pt-BR", { 
                day: "2-digit", 
                month: "long", 
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>
        </td>
      </tr>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </TableBase>
  );
}