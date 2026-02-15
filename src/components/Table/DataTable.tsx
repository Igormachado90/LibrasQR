import { useState } from "react";
import { FaFilePdf, FaEye, FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface RelatorioSemestral {
  nome: string;
  periodo: string;
  progresso: string;
  pontosFortes: string;
  metas: string;
  dataNascimento?: string;
  turma?: string;
}

const relatorios: RelatorioSemestral[] = [
  {
    nome: "Ana Beatriz Santos",
    periodo: "01/07/2025 a 01/01/2026",
    progresso: "Evolução significativa nas habilidades sociais, interagindo mais com colegas e participando de atividades em grupo.",
    pontosFortes: "Boa interação com mediadores, excelente memória visual e interesse por jogos educativos.",
    metas: "Estimular autonomia em sala de aula e desenvolver habilidades de comunicação verbal.",
    dataNascimento: "15/03/2015",
    turma: "3º Ano A"
  },
  {
    nome: "Carlos Eduardo Oliveira",
    periodo: "01/07/2025 a 01/01/2026",
    progresso: "Avanço gradual na comunicação, utilizando mais recursos de CAA e iniciando pequenas frases.",
    pontosFortes: "Boa resposta a estímulos visuais, organização de rotinas e interesse por atividades lúdicas.",
    metas: "Expandir comunicação funcional e desenvolver habilidades de leitura.",
    dataNascimento: "22/08/2014",
    turma: "4º Ano B"
  },
  {
    nome: "Mariana Costa Lima",
    periodo: "01/07/2025 a 01/01/2026",
    progresso: "Melhora significativa na regulação emocional e no cumprimento de rotinas escolares.",
    pontosFortes: "Autonomia nas atividades diárias, bom relacionamento com professores e colegas.",
    metas: "Aprimorar habilidades de escrita e desenvolver estratégias para lidar com frustrações.",
    dataNascimento: "10/11/2015",
    turma: "3º Ano C"
  },
  {
    nome: "Pedro Henrique Alves",
    periodo: "01/07/2025 a 01/01/2026",
    progresso: "Desenvolvimento motor significativo, maior coordenação em atividades físicas e artísticas.",
    pontosFortes: "Criatividade, participação ativa em atividades práticas e bom relacionamento com a turma.",
    metas: "Fortalecer habilidades de atenção concentrada e organização de materiais.",
    dataNascimento: "05/05/2014",
    turma: "5º Ano A"
  }
];

export default function RelatorioSemestralTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(relatorios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRelatorios = relatorios.slice(startIndex, startIndex + itemsPerPage);

  const toggleExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleExportPDF = () => {
    console.log("Exportando relatórios para PDF...");
    // Lógica de exportação para PDF
  };

  const handleDownloadCSV = () => {
    // Criar CSV
    const headers = ["Paciente", "Data Nascimento", "Turma", "Período", "Progresso", "Pontos Fortes", "Metas"];
    const csvContent = [
      headers.join(","),
      ...relatorios.map(r => 
        [
          r.nome,
          r.dataNascimento || "",
          r.turma || "",
          r.periodo,
          `"${r.progresso}"`,
          `"${r.pontosFortes}"`,
          `"${r.metas}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorios_semestrais_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  /* Estilos reutilizáveis */
  const thStyle: React.CSSProperties = {
    padding: "16px 12px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#6B7280",
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "2px solid #E5E7EB"
  };

  const tdStyle: React.CSSProperties = {
    padding: "16px 12px",
    fontSize: "14px",
    color: "#111827",
    verticalAlign: "top",
    borderBottom: "1px solid #F1F5F9",
    lineHeight: "1.5"
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "24px",
        marginTop: "32px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        border: "1px solid #F0F2F5"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                margin: 0
              }}
            >
              Relatório Semestral de Evolução
            </h3>

            <span
              style={{
                fontSize: "12px",
                color: "#2563EB",
                background: "#DBEAFE",
                padding: "4px 12px",
                borderRadius: "999px",
                fontWeight: 500
              }}
            >
              Avaliação Periódica
            </span>
          </div>

          <p style={{
            fontSize: "13px",
            color: "#6B7280",
            margin: 0
          }}>
            Acompanhamento do desenvolvimento dos alunos no período
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleDownloadCSV}
            style={{
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              padding: "10px 16px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#374151",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F9FAFB";
              e.currentTarget.style.borderColor = "#9CA3AF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.borderColor = "#E5E7EB";
            }}
          >
            <FaDownload size={14} />
            Exportar CSV
          </button>
          
          <button
            onClick={handleExportPDF}
            style={{
              border: "none",
              background: "#4F46E5",
              padding: "10px 16px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#FFFFFF",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#4338CA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4F46E5";
            }}
          >
            <FaFilePdf size={14} />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1000px"
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Paciente</th>
              <th style={thStyle}>Período</th>
              <th style={thStyle}>Progresso Observado</th>
              <th style={thStyle}>Pontos Fortes</th>
              <th style={thStyle}>Metas para o Próximo Período</th>
              <th style={thStyle}></th>
            </tr>
          </thead>

          <tbody>
            {currentRelatorios.map((item, index) => {
              const globalIndex = startIndex + index;
              const isExpanded = expandedRow === globalIndex;

              return (
                <tr
                  key={globalIndex}
                  style={{
                    borderBottom: "1px solid #F1F5F9",
                    backgroundColor: isExpanded ? "#F9FAFB" : "transparent",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.backgroundColor = "#F9FAFB";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, color: "#111827" }}>
                      {item.nome}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                      {item.dataNascimento} • {item.turma}
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <span style={{
                      background: "#F3F4F6",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#374151"
                    }}>
                      {item.periodo}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <div style={{
                      maxWidth: "250px",
                      whiteSpace: isExpanded ? "normal" : "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {item.progresso}
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <div style={{
                      maxWidth: "200px",
                      whiteSpace: isExpanded ? "normal" : "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {item.pontosFortes}
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <div style={{
                      maxWidth: "200px",
                      whiteSpace: isExpanded ? "normal" : "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {item.metas}
                    </div>
                  </td>

                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <button
                      onClick={() => toggleExpand(globalIndex)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#6B7280",
                        fontSize: "14px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F3F4F6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Informações adicionais quando expandido */}
      {expandedRow !== null && (
        <div style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#F9FAFB",
          borderRadius: "12px",
          border: "1px solid #E5E7EB"
        }}>
          <h4 style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "16px"
          }}>
            Detalhes Completos - {relatorios[expandedRow].nome}
          </h4>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px"
          }}>
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                Progresso Observado
              </p>
              <p style={{ fontSize: "14px", color: "#111827", lineHeight: "1.6" }}>
                {relatorios[expandedRow].progresso}
              </p>
            </div>
            
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                Pontos Fortes
              </p>
              <p style={{ fontSize: "14px", color: "#111827", lineHeight: "1.6" }}>
                {relatorios[expandedRow].pontosFortes}
              </p>
            </div>
            
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                Metas para o Próximo Período
              </p>
              <p style={{ fontSize: "14px", color: "#111827", lineHeight: "1.6" }}>
                {relatorios[expandedRow].metas}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "24px"
        }}
      >
        <p style={{
          fontSize: "13px",
          color: "#6B7280",
          margin: 0
        }}>
          Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, relatorios.length)} de {relatorios.length} relatórios
        </p>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              background: currentPage === 1 ? "#F3F4F6" : "#FFFFFF",
              color: currentPage === 1 ? "#9CA3AF" : "#374151",
              fontSize: "14px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FaChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: page === currentPage ? "#4F46E5" : "#E5E7EB",
                background: page === currentPage ? "#4F46E5" : "#FFFFFF",
                color: page === currentPage ? "#FFFFFF" : "#374151",
                fontSize: "14px",
                fontWeight: page === currentPage ? 500 : "normal",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              background: currentPage === totalPages ? "#F3F4F6" : "#FFFFFF",
              color: currentPage === totalPages ? "#9CA3AF" : "#374151",
              fontSize: "14px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Legenda */}
      <div style={{
        marginTop: "16px",
        padding: "12px",
        backgroundColor: "#F0F9FF",
        borderRadius: "8px",
        border: "1px solid #BAE6FD",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "13px",
        color: "#0369A1"
      }}>
        <span style={{ fontSize: "16px" }}>ℹ️</span>
        <span>
          Clique no ícone de olho para ver os detalhes completos de cada relatório.
          Os relatórios são atualizados semestralmente pela equipe pedagógica.
        </span>
      </div>
    </div>
  );
}