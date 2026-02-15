import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

interface LineChartProps {
  data?: Array<{
    month: string;
    alunos?: number;
    ativos?: number;
    [key: string]: any;
  }>;
  title?: string;
  height?: number;
  showLegend?: boolean;
  lines?: Array<{
    dataKey: string;
    stroke: string;
    name?: string;
  }>;
}

const defaultData = [
  { month: "Jan", alunos: 30, ativos: 28 },
  { month: "Fev", alunos: 32, ativos: 30 },
  { month: "Mar", alunos: 31, ativos: 29 },
  { month: "Abr", alunos: 35, ativos: 33 },
  { month: "Mai", alunos: 36, ativos: 34 },
  { month: "Jun", alunos: 38, ativos: 36 },
  { month: "Jul", alunos: 40, ativos: 38 },
  { month: "Ago", alunos: 42, ativos: 40 },
  { month: "Set", alunos: 41, ativos: 39 },
  { month: "Out", alunos: 43, ativos: 41 },
  { month: "Nov", alunos: 45, ativos: 43 },
  { month: "Dez", alunos: 48, ativos: 46 }
];

const defaultLines = [
  { dataKey: "alunos", stroke: "#4F46E5", name: "Total de Alunos" },
  { dataKey: "ativos", stroke: "#F97316", name: "Alunos Ativos" }
];

export default function LineChart({ 
  data = defaultData,
  title = "Relatório Geral",
  height = 343,
  showLegend = true,
  lines = defaultLines
}: LineChartProps) {
  
  // Formatar meses para português se necessário
  const formatMonth = (month: string) => {
    const monthMap: { [key: string]: string } = {
      "Jan": "Jan", "Feb": "Fev", "Mar": "Mar", "Apr": "Abr",
      "May": "Mai", "Jun": "Jun", "Jul": "Jul", "Aug": "Ago",
      "Sep": "Set", "Oct": "Out", "Nov": "Nov", "Dec": "Dez"
    };
    return monthMap[month] || month;
  };

  // Customizar tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: "#1f2937",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #374151",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <p style={{ 
            color: "#f9fafb", 
            margin: "0 0 8px 0", 
            fontWeight: "600",
            fontSize: "14px"
          }}>
            {formatMonth(label)}
          </p>
          {payload.map((entry: any, index: number) => (
            <div 
              key={index} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                marginBottom: index < payload.length - 1 ? "4px" : 0
              }}
            >
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: entry.color
              }}></div>
              <span style={{ color: "#e5e7eb", fontSize: "13px" }}>
                {entry.name || entry.dataKey}: 
              </span>
              <span style={{ 
                color: "#fff", 
                fontWeight: "600", 
                fontSize: "13px",
                marginLeft: "auto"
              }}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        height: height,
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Cabeçalho */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <div>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#1f2937",
            margin: 0
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: "13px",
            color: "#6b7280",
            margin: "4px 0 0 0"
          }}>
            Evolução mensal de alunos
          </p>
        </div>
        
        {/* Legenda resumida */}
        {showLegend && (
          <div style={{ display: "flex", gap: "16px" }}>
            {lines.map((line, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: line.stroke
                }}></div>
                <span style={{
                  fontSize: "12px",
                  color: "#6b7280"
                }}>
                  {line.name || line.dataKey}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" >
        <ReLineChart 
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis 
            dataKey="month" 
            tickFormatter={formatMonth}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name || line.dataKey}
              strokeWidth={2}
              dot={{ 
                r: 4, 
                fill: line.stroke, 
                stroke: '#fff', 
                strokeWidth: 2,
                fillOpacity: 1
              }}
              activeDot={{ 
                r: 6, 
                fill: line.stroke, 
                stroke: '#fff', 
                strokeWidth: 2 
              }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}