import { useState } from "react";
import { FaFilter, FaDownload, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Orientacao {
  nome: string;
  periodo: string;
  resultado: string;
  meta: string;
  dataNascimento?: string;
  turma?: string;
}

const orientacoesIniciais: Orientacao[] = [
  {
    nome: "João Silva Santos",
    periodo: "01/07/2025 a 01/01/2026",
    resultado: "Boa adaptação ao ambiente escolar, interage bem com colegas e professores",
    meta: "Manter rotina visual estruturada e estimular participação em atividades em grupo",
    dataNascimento: "15/03/2015",
    turma: "3º Ano A"
  },
  {
    nome: "Maria Oliveira Costa",
    periodo: "01/07/2025 a 01/01/2026",
    resultado: "Dificuldades em atividades coletivas, mas bom desempenho em tarefas individuais",
    meta: "Apoio mediado em grupo e acompanhamento individualizado",
    dataNascimento: "22/08/2014",
    turma: "4º Ano B"
  },
  {
    nome: "Pedro Henrique Lima",
    periodo: "01/07/2025 a 01/01/2026",
    resultado: "Excelente evolução na comunicação e expressão oral",
    meta: "Ampliar vocabulário e estimular escrita criativa",
    dataNascimento: "10/11/2015",
    turma: "3º Ano A"
  },
  {
    nome: "Ana Beatriz Ferreira",
    periodo: "01/07/2025 a 01/01/2026",
    resultado: "Necessita de apoio em matemática, mas se destaca em atividades artísticas",
    meta: "Reforço em conceitos matemáticos básicos e estímulo à expressão artística",
    dataNascimento: "05/04/2014",
    turma: "4º Ano B"
  },
  {
    nome: "Lucas Gabriel Souza",
    periodo: "01/07/2025 a 01/01/2026",
    resultado: "Boa evolução na alfabetização, lê palavras simples com ajuda",
    meta: "Continuar estímulo à leitura com materiais visuais e jogos educativos",
    dataNascimento: "18/09/2015",
    turma: "3º Ano A"
  }
];

export default function OrientacoesEscolaTable() {
  const [orientacoes] = useState<Orientacao[]>(orientacoesIniciais);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filterTurma, setFilterTurma] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const itemsPerPage = 4;
  const totalPages = Math.ceil(orientacoes.length / itemsPerPage);

  // Filtrar orientações
  const orientacoesFiltradas = orientacoes.filter(orientacao => {
    const matchesSearch = searchTerm === "" ||
      orientacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orientacao.resultado.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTurma = filterTurma === "" || orientacao.turma === filterTurma;

    return matchesSearch && matchesTurma;
  });

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const orientacoesPaginadas = orientacoesFiltradas.slice(startIndex, endIndex);

  // Turmas únicas para filtro
  const turmasUnicas = [...new Set(orientacoes.map(o => o.turma).filter(Boolean))];

  // Exportar dados
  const exportToCSV = () => {
    const csvContent = [
      ["Paciente", "Data Nascimento", "Turma", "Período", "Resultados", "Metas"].join(","),
      ...orientacoes.map(o => [
        `"${o.nome}"`,
        `"${o.dataNascimento || ""}"`,
        `"${o.turma || ""}"`,
        `"${o.periodo}"`,
        `"${o.resultado}"`,
        `"${o.meta}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orientacoes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const thStyle: React.CSSProperties = {
    padding: "14px 12px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#6B7280",
    textAlign: "left",
    borderBottom: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB"
  };

  const tdStyle: React.CSSProperties = {
    padding: "16px 12px",
    fontSize: "14px",
    color: "#111827",
    verticalAlign: "top",
    borderBottom: "1px solid #F1F5F9"
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        padding: "24px",
        marginTop: "32px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                margin: 0
              }}
            >
              Orientações para Escola
            </h3>

            <span
              style={{
                fontSize: "12px",
                color: "#16A34A",
                background: "#DCFCE7",
                padding: "4px 10px",
                borderRadius: "999px",
                fontWeight: 500
              }}
            >
              Relatório de Inclusão
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
            {orientacoesFiltradas.length} registros encontrados
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {/* Barra de busca */}
          {/* <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 16px 10px 40px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                fontSize: "14px",
                width: "250px",
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#4F46E5";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <span style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9CA3AF"
            }}>
              🔍
            </span>
          </div> */}

          {/* Botão Filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              border: "1px solid #E5E7EB",
              background: showFilters ? "#F3F4F6" : "#FFFFFF",
              padding: "10px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              cursor: "pointer",
              color: "#374151",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = showFilters ? "#F3F4F6" : "#FFFFFF";
            }}
          >
            <FaFilter size={14} />
            Filtros
          </button>

          {/* Botão Exportar */}
          <button
            onClick={exportToCSV}
            style={{
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              padding: "10px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              cursor: "pointer",
              color: "#374151",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
            }}
          >
            <FaDownload size={14} />
            Exportar
          </button>
        </div>
      </div>

      {/* Painel de Filtros */}
      {showFilters && (
        <div
          style={{
            backgroundColor: "#F9FAFB",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #E5E7EB"
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px"
              }}>
                Turma
              </label>
              <select
                value={filterTurma}
                onChange={(e) => {
                  setFilterTurma(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                  background: "#F9FAFB",
                  color: "#374151"
                }}
              >
                <option value="">Todas as turmas</option>
                {turmasUnicas.map((turma, index) => (
                  <option key={index} value={turma}>{turma}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setFilterTurma("");
                setSearchTerm("");
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151"
              }}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {orientacoesPaginadas.length > 0 ? (
        <>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse"
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Paciente</th>
                  <th style={thStyle}>Turma</th>
                  <th style={thStyle}>Período</th>
                  <th style={thStyle}>Resultados</th>
                  <th style={thStyle}>Metas</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Ações</th>
                </tr>
              </thead>

              <tbody>
                {orientacoesPaginadas.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #F1F5F9",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#F9FAFB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                        {item.nome}
                      </div>
                      {item.dataNascimento && (
                        <span style={{ fontSize: "12px", color: "#6B7280", display: "block" }}>
                          Nasc: {item.dataNascimento}
                        </span>
                      )}
                    </td>

                    <td style={tdStyle}>
                      {item.turma && (
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          backgroundColor: "#EFF6FF",
                          color: "#1D4ED8",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}>
                          {item.turma}
                        </span>
                      )}
                    </td>

                    <td style={tdStyle}>
                      <span style={{ fontSize: "13px", color: "#4B5563" }}>
                        {item.periodo}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div style={{
                        maxWidth: "250px",
                        fontSize: "13px",
                        color: "#374151",
                        lineHeight: "1.5"
                      }}>
                        {item.resultado}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <div style={{
                        maxWidth: "250px",
                        fontSize: "13px",
                        color: "#374151",
                        lineHeight: "1.5"
                      }}>
                        {item.meta}
                      </div>
                    </td>

                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <button
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {orientacoesFiltradas.length > itemsPerPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "24px"
              }}
            >
              <div style={{ fontSize: "13px", color: "#6B7280" }}>
                Mostrando {startIndex + 1} a {Math.min(endIndex, orientacoesFiltradas.length)} de {orientacoesFiltradas.length} registros
              </div>

              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    color: currentPage === 1 ? "#D1D5DB" : "#374151",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: "14px",
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
                      minWidth: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: page === currentPage ? "#4F46E5" : "#E5E7EB",
                      background: page === currentPage ? "#4F46E5" : "#FFFFFF",
                      color: page === currentPage ? "#FFFFFF" : "#111827",
                      fontSize: "13px",
                      cursor: "pointer",
                      padding: "0 10px"
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
                    background: "#FFFFFF",
                    color: currentPage === totalPages ? "#D1D5DB" : "#374151",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{
          padding: "60px 20px",
          textAlign: "center",
          backgroundColor: "#F9FAFB",
          borderRadius: "8px",
          border: "1px dashed #E5E7EB"
        }}>
          <p style={{ fontSize: "16px", color: "#9CA3AF", margin: 0 }}>
            Nenhuma orientação encontrada com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
}