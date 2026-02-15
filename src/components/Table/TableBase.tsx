import type { ReactNode } from 'react';

interface Props {
  headers: string[];
  children: ReactNode;
  title: string;
  actions?: ReactNode;
  width?: string | number;
  maxHeight?: string | number;
  showHeaders?: boolean;
  headerBgColor?: string;
}

export default function TableBase({ 
  children, 
  title, 
  actions,
  headers,
  // width = "490px",
  maxHeight,
  showHeaders = true,
  headerBgColor = "#F9FAFB"
}: Props) {
  
  // Função para renderizar os headers se existirem
  const renderHeaders = () => {
    if (!showHeaders || !headers || headers.length === 0) return null;

    return (
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: "600",
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                backgroundColor: headerBgColor,
                borderBottom: "2px solid #E5E7EB"
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        padding: "20px",
        color: "#374151",
        border: "1px solid #E5E7EB",
        // width: width,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        maxHeight: maxHeight,
        overflow: "hidden"
      }}
    >
      {/* Cabeçalho do Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: headers.length > 0 ? "1px solid #E5E7EB" : "none",
          paddingBottom: headers.length > 0 ? "16px" : "0"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "4px",
            height: "24px",
            backgroundColor: "#4F46E5",
            borderRadius: "2px"
          }}></div>
          <h3 style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "600",
            color: "#1F2937"
          }}>
            {title}
          </h3>
        </div>
        {actions && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {actions}
          </div>
        )}
      </div>

      {/* Área de conteúdo com scroll se necessário */}
      <div style={{
        overflowY: maxHeight ? "auto" : "visible",
        flex: 1
      }}>
        {headers.length > 0 ? (
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px"
          }}>
            {renderHeaders()}
            <tbody>
              {children}
            </tbody>
          </table>
        ) : (
          children
        )}
      </div>

      {/* Rodapé opcional - pode ser adicionado depois se necessário */}
      {/* <div style={{
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: "1px solid #E5E7EB",
        fontSize: "12px",
        color: "#6B7280",
        textAlign: "right"
      }}>
        Última atualização: {new Date().toLocaleDateString('pt-BR')}
      </div> */}
    </div>
  );
}