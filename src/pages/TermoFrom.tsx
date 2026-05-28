// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import DashboardLayout from "../layouts/DashboardLayout";
// import Input from "../components/Form/Input";
// import Section from "../components/Form/Section";
// import Select from "../components/Form/Select";
// import { supabase } from "../lib/supabase";

// interface EscolaFormData {
//   Nome: string;
//   CNPJ: string;
//   Email: string;
//   Telefone: string;
//   Endereco: string;
//   Status: string;
// }

// export default function EscolasForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEditing = !!id;

//   // const [plataformas, setPlataformas] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingPlataformas, setLoadingPlataformas] = useState(true);

//   const [formData, setFormData] = useState<EscolaFormData>({
//     Nome: '',
//     CNPJ: '',
//     Email: '',
//     Telefone: '',
//     Endereco: '',
//     Status: 'Ativo'
//   });

//   // const [selectedPlataformaId, setSelectedPlataformaId] = useState<string>('');

//   const statusOptions = [
//     { value: 'Ativo', label: 'Ativo' },
//     { value: 'Inativo', label: 'Inativo' },
//     { value: 'Pendente', label: 'Pendente' }
//   ];

//   useEffect(() => {
//     fetchPlataformas();
//     if (isEditing) fetchEscola();
//   }, [id]);

//   async function fetchPlataformas() {
//     try {
//       const { data, error } = await supabase
//         .from("Plataformas")
//         .select("Plataforma_ID, Nome")
//         .order("Nome");

//       if (error) throw error;
//       // setPlataformas(data || []);
//     } catch (err: any) {
//       console.error("Erro ao buscar plataformas:", err);
//       toast.error("Erro ao carregar plataformas");
//     } finally {
//       setLoadingPlataformas(false);
//     }
//   }

//   async function fetchEscola() {
//     if (!id) return;

//     try {
//       const { data, error } = await supabase
//         .from("Escolas")
//         .select("*")
//         .eq("Escola_ID", id)
//         .single();

//       if (error) throw error;

//       if (data) {
//         setFormData({
//           Nome: data.Nome || "",
//           CNPJ: data.CNPJ || "",
//           Email: data.Email || "",
//           Telefone: data.Telefone || "",
//           Endereco: data.Endereco || "",
//           Status: data.Status || "Ativo"
//         });
//         // setSelectedPlataformaId(data.Plataforma_ID?.toString() || '');
//       }
//     } catch (err: any) {
//       console.error("Erro ao carregar escola:", err);
//       toast.error("Erro ao carregar escola");
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // const handlePlataformaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   //   setSelectedPlataformaId(e.target.value);
//   // };

//   // Máscara para CNPJ
//   const formatCNPJ = (cnpj: string) => {
//     return cnpj
//       .replace(/\D/g, '')
//       .replace(/^(\d{2})(\d)/, '$1.$2')
//       .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
//       .replace(/\.(\d{3})(\d)/, '.$1/$2')
//       .replace(/(\d{4})(\d)/, '$1-$2')
//       .slice(0, 18);
//   };

//   // Máscara para telefone
//   const formatTelefone = (telefone: string) => {
//     const numbers = telefone.replace(/\D/g, '');
//     if (numbers.length <= 10) {
//       return numbers
//         .replace(/^(\d{2})(\d)/, '($1) $2')
//         .replace(/(\d{4})(\d)/, '$1-$2');
//     } else {
//       return numbers
//         .replace(/^(\d{2})(\d)/, '($1) $2')
//         .replace(/(\d{5})(\d)/, '$1-$2');
//     }
//   };

//   const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatCNPJ(e.target.value);
//     setFormData(prev => ({
//       ...prev,
//       CNPJ: formatted
//     }));
//   };

//   const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatTelefone(e.target.value);
//     setFormData(prev => ({
//       ...prev,
//       Telefone: formatted
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validações
//     // if (!selectedPlataformaId) {
//     //   toast.error("Selecione uma plataforma");
//     //   return;
//     // }

//     if (!formData.Nome.trim()) {
//       toast.error("O nome da escola é obrigatório");
//       return;
//     }

//     if (formData.CNPJ && formData.CNPJ.replace(/\D/g, '').length < 14) {
//       toast.error("CNPJ deve ter 14 dígitos");
//       return;
//     }

//     setLoading(true);

//     try {

//       const { data: { user } } = await supabase.auth.getUser();
//       console.log(user);

//       const payload = {
//         ...formData,
//         // Usuario_ID: user?.id
//       };

//       await supabase.from("Escolas").insert(payload);

//       if (isEditing) {
//         const { error } = await supabase
//           .from("Escolas")
//           .update(payload)
//           .eq("Escola_ID", id);

//         if (error) throw error;
//         toast.success('Escola atualizada com sucesso!');
//       } else {
//         const { error } = await supabase
//           .from("Escolas")
//           .insert(payload);

//         if (error) throw error;
//         toast.success('Escola criada com sucesso!');
//       }

//       navigate('/escolas');
//     } catch (err: any) {
//       console.error("Erro detalhado:", err);

//       if (err.code === '23502') {
//         if (err.message.includes('Plataforma_ID')) {
//           toast.error("Erro: Plataforma não selecionada.");
//         }
//       } else if (err.code === '23505') {
//         toast.error("Já existe uma escola com este CNPJ ou nome.");
//       } else if (err.code === '23503') {
//         toast.error("Plataforma selecionada não existe.");
//       } else {
//         toast.error('Erro ao salvar escola: ' + (err.message || 'Erro desconhecido'));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mostrar loading enquanto busca as plataformas
//   if (loadingPlataformas) {
//     return (
//       <DashboardLayout>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <p>Carregando plataformas...</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <h1>{isEditing ? "Editar Escola" : "Nova Escola"}</h1>

//       <p style={{ color: "#666" }}>
//         {isEditing ? "Atualize as informações da escola abaixo." : "Preencha o formulário para adicionar uma nova escola."}
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         style={{
//           background: "#fff",
//           borderRadius: "12px",
//           padding: "24px",
//           marginTop: "24px",
//           boxShadow: "0 6px 24px rgba(0,0,0,0.04)"
//         }}
//       >
//        {/* DADOS DA ESCOLA */}
//         <Section title="Dados da Escola">
//           <Input
//             label="Nome da Escola *"
//             name="Nome"
//             value={formData.Nome}
//             onChange={handleChange}
//             required

//           />

//           <Input
//             label="CNPJ"
//             name="CNPJ"
//             value={formData.CNPJ}
//             onChange={handleCNPJChange}

//           />

//           <Input
//             label="Email"
//             name="Email"
//             type="email"
//             value={formData.Email}
//             onChange={handleChange}

//           />

//           <Input
//             label="Telefone"
//             name="Telefone"
//             value={formData.Telefone}
//             onChange={handleTelefoneChange}

//           />

//           <div style={{ gridColumn: 'span 2' }}>
//             <label style={{
//               display: 'block',
//               marginBottom: '8px',
//               fontSize: '14px',
//               color: '#374151',
//               fontWeight: '500'
//             }}>
//               Endereço
//             </label>
//             <textarea
//               name="Endereco"
//               value={formData.Endereco}
//               onChange={handleChange}
//               placeholder="Rua, número, bairro, cidade - Estado, CEP"
//               rows={3}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 borderRadius: "8px",
//                 border: "1px solid #D1D5DB",
//                 background: "#fff",
//                 color: "#333",
//                 fontSize: "14px",
//                 fontFamily: "inherit",
//                 resize: "vertical",
//                 boxSizing: "border-box"
//               }}
//             />
//           </div>

//           <Select
//             label="Status"
//             name="Status"
//             value={formData.Status}
//             onChange={handleChange}
//           >
//             {statusOptions.map(status => (
//               <option key={status.value} value={status.value}>
//                 {status.label}
//               </option>
//             ))}
//           </Select>
//         </Section>

//         {/* AÇÕES */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'flex-end',
//           gap: '12px',
//           marginTop: '24px'
//         }}>
//           <button
//             type="button"
//             onClick={() => navigate('/escolas')}
//             style={{
//               padding: '10px 20px',
//               borderRadius: '8px',
//               border: '1px solid #ddd',
//               background: '#fff',
//               color: '#374151',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             disabled={loading}
//             onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
//             onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
//           >
//             Cancelar
//           </button>
//           <button
//             type="submit"
//             style={{
//               background: '#4F46E5',
//               color: '#fff',
//               borderRadius: '8px',
//               padding: '10px 20px',
//               border: 'none',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             disabled={loading}
//             onMouseOver={(e) => e.currentTarget.style.background = '#4338CA'}
//             onMouseOut={(e) => e.currentTarget.style.background = '#4F46E5'}
//           >
//             {loading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar Escola'}
//           </button>
//         </div>
//       </form>
//     </DashboardLayout>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    FaSave,
    FaPaperPlane,
    FaArrowLeft,
    FaExclamationTriangle,
    FaTimesCircle,
    FaBook,
    FaTag
} from "react-icons/fa";

interface TermoFormData {
    titulo: string;
    definicao: string;
    categoria: string;
    palavrasChave: string[];
    status: "rascunho" | "pendente" | "aprovado" | "recusado";
    autor: {
        id: string;
        nome: string;
        tipo: string;
    };
    dataCriacao: string;
    versao: string;
}

interface ErroValidacao {
    campo: string;
    mensagem: string;
}

export default function TermoForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditing);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [acaoConfirmacao, setAcaoConfirmacao] = useState<"rascunho" | "analise" | null>(null);
    const [palavraChaveInput, setPalavraChaveInput] = useState("");
    const [erros, setErros] = useState<ErroValidacao[]>([]);

    const [termo, setTermo] = useState<TermoFormData>({
        titulo: "",
        definicao: "",
        categoria: "",
        palavrasChave: [],
        status: "rascunho",
        autor: {
            id: "1",
            nome: "Admin Sistema",
            tipo: "admin"
        },
        dataCriacao: new Date().toISOString(),
        versao: "1.0"
    });

    const categorias = [
        "Algoritmos",
        "Estruturas de Controle",
        "Estruturas de Dados",
        "Programação Orientada a Objetos",
        "Banco de Dados",
        "Funções",
        "Conceitos Básicos",
        "Linguagens de Programação"
    ];

    // Carregar dados se for edição
    useEffect(() => {
        if (isEditing) {
            fetchTermo();
        }
    }, [id]);

    const fetchTermo = async () => {
        setFetching(true);
        try {
            // Simular busca de dados
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Dados mockados para edição
            const mockData = {
                titulo: "Algoritmos de Ordenação - Quick Sort",
                definicao: "Implementação e análise do algoritmo de ordenação Quick Sort em diferentes linguagens. O Quick Sort é um algoritmo eficiente de ordenação que utiliza a estratégia de dividir para conquistar.",
                categoria: "Algoritmos",
                palavrasChave: ["quick sort", "ordenação", "algoritmos", "complexidade"],
                status: "rascunho" as const,
                autor: {
                    id: "1",
                    nome: "Admin Sistema",
                    tipo: "admin"
                },
                dataCriacao: "2024-03-01T10:30:00",
                versao: "2.1"
            };

            setTermo(mockData);
        } catch (error) {
            console.error("Erro ao carregar termo:", error);
        } finally {
            setFetching(false);
        }
    };

    const validarCampos = (acao: "rascunho" | "analise"): boolean => {
        const novosErros: ErroValidacao[] = [];

        if (!termo.titulo.trim()) {
            novosErros.push({
                campo: "titulo",
                mensagem: "O título do termo é obrigatório"
            });
        } else if (termo.titulo.length < 5) {
            novosErros.push({
                campo: "titulo",
                mensagem: "O título deve ter pelo menos 5 caracteres"
            });
        } else if (termo.titulo.length > 200) {
            novosErros.push({
                campo: "titulo",
                mensagem: "O título não pode ter mais de 200 caracteres"
            });
        }

        if (!termo.definicao.trim()) {
            novosErros.push({
                campo: "definicao",
                mensagem: "A definição em português é obrigatória"
            });
        } else if (termo.definicao.length < 20) {
            novosErros.push({
                campo: "definicao",
                mensagem: "A definição deve ter pelo menos 20 caracteres"
            });
        }

        if (!termo.categoria) {
            novosErros.push({
                campo: "categoria",
                mensagem: "Selecione uma categoria para o termo"
            });
        }

        if (acao === "analise" && termo.palavrasChave.length === 0) {
            novosErros.push({
                campo: "palavrasChave",
                mensagem: "Adicione pelo menos uma palavra-chave antes de enviar para análise"
            });
        }

        setErros(novosErros);
        return novosErros.length === 0;
    };

    const handleSalvar = (tipo: "rascunho" | "analise") => {
        if (validarCampos(tipo)) {
            setAcaoConfirmacao(tipo);
            setShowConfirmacao(true);
        }
    };

    const confirmarAcao = async () => {
        if (!acaoConfirmacao) return;

        setLoading(true);
        setShowConfirmacao(false);

        try {
            // Simular envio para API
            await new Promise(resolve => setTimeout(resolve, 1500));

            const termoParaSalvar = {
                ...termo,
                status: acaoConfirmacao === "rascunho" ? "rascunho" : "pendente",
                id: isEditing ? id : Date.now().toString(),
                versao: isEditing ? termo.versao : "1.0",
                dataCriacao: isEditing ? termo.dataCriacao : new Date().toISOString()
            };

            console.log("Termo salvo:", termoParaSalvar);

            // Redirecionar baseado na ação
            navigate("/termos", { 
                state: { 
                    mensagem: acaoConfirmacao === "rascunho" 
                        ? "Termo salvo como rascunho com sucesso!" 
                        : "Termo enviado para análise com sucesso!",
                    tipo: "sucesso" 
                }
            });
        } catch (error) {
            console.error("Erro ao salvar termo:", error);
            setErros([
                { campo: "geral", mensagem: "Erro ao salvar o termo. Tente novamente." }
            ]);
        } finally {
            setLoading(false);
            setAcaoConfirmacao(null);
        }
    };

    const adicionarPalavraChave = () => {
        if (palavraChaveInput.trim() && !termo.palavrasChave.includes(palavraChaveInput.trim())) {
            if (termo.palavrasChave.length < 10) {
                setTermo({
                    ...termo,
                    palavrasChave: [...termo.palavrasChave, palavraChaveInput.trim()]
                });
                setPalavraChaveInput("");
            }
        }
    };

    const removerPalavraChave = (palavra: string) => {
        setTermo({
            ...termo,
            palavrasChave: termo.palavrasChave.filter(p => p !== palavra)
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            adicionarPalavraChave();
        }
    };

    const getErroCampo = (campo: string) => {
        return erros.find(e => e.campo === campo)?.mensagem;
    };

    if (fetching) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Carregando termo...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <button
                        onClick={() => navigate("/termos")}
                        style={styles.backButton}
                    >
                        <FaArrowLeft /> Voltar
                    </button>
                    <h1 style={styles.title}>
                        {isEditing ? "Editar Termo" : "Cadastrar Novo Termo"}
                    </h1>
                    <div style={styles.headerActions}>
                        <button
                            onClick={() => handleSalvar("rascunho")}
                            style={styles.draftButton}
                            disabled={loading}
                        >
                            <FaSave /> Salvar como Rascunho
                        </button>
                        <button
                            onClick={() => handleSalvar("analise")}
                            style={styles.submitButton}
                            disabled={loading}
                        >
                            <FaPaperPlane /> {isEditing ? "Enviar para Análise" : "Enviar para Análise"}
                        </button>
                    </div>
                </div>

                {/* Formulário */}
                <div style={styles.formContainer}>
                    {erros.some(e => e.campo === "geral") && (
                        <div style={styles.erroGeral}>
                            <FaExclamationTriangle />
                            {getErroCampo("geral")}
                        </div>
                    )}

                    {/* Título */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Título do Termo <span style={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            value={termo.titulo}
                            onChange={(e) => setTermo({ ...termo, titulo: e.target.value })}
                            placeholder="Ex: Algoritmos de Ordenação - Quick Sort"
                            style={{
                                ...styles.input,
                                borderColor: getErroCampo("titulo") ? "var(--danger)" : "var(--border-color)"
                            }}
                        />
                        {getErroCampo("titulo") && (
                            <span style={styles.erroText}>{getErroCampo("titulo")}</span>
                        )}
                        <span style={styles.helperText}>
                            {termo.titulo.length}/200 caracteres
                        </span>
                    </div>

                    {/* Definição */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Definição em Português <span style={styles.required}>*</span>
                        </label>
                        <textarea
                            value={termo.definicao}
                            onChange={(e) => setTermo({ ...termo, definicao: e.target.value })}
                            placeholder="Descreva o significado e o propósito deste termo..."
                            rows={6}
                            style={{
                                ...styles.textarea,
                                borderColor: getErroCampo("definicao") ? "var(--danger)" : "var(--border-color)"
                            }}
                        />
                        {getErroCampo("definicao") && (
                            <span style={styles.erroText}>{getErroCampo("definicao")}</span>
                        )}
                        <span style={styles.helperText}>
                            {termo.definicao.length} caracteres (mínimo 20)
                        </span>
                    </div>

                    {/* Categoria */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Categoria <span style={styles.required}>*</span>
                        </label>
                        <select
                            value={termo.categoria}
                            onChange={(e) => setTermo({ ...termo, categoria: e.target.value })}
                            style={{
                                ...styles.select,
                                borderColor: getErroCampo("categoria") ? "var(--danger)" : "var(--border-color)"
                            }}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {getErroCampo("categoria") && (
                            <span style={styles.erroText}>{getErroCampo("categoria")}</span>
                        )}
                    </div>

                    {/* Palavras-chave */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Palavras-chave
                            {getErroCampo("palavrasChave") && (
                                <span style={styles.required}> *</span>
                            )}
                        </label>
                        <div style={styles.keywordsInputContainer}>
                            <input
                                type="text"
                                value={palavraChaveInput}
                                onChange={(e) => setPalavraChaveInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Digite uma palavra-chave e pressione Enter"
                                style={styles.keywordsInput}
                                disabled={termo.palavrasChave.length >= 10}
                            />
                            <button
                                onClick={adicionarPalavraChave}
                                style={styles.addKeywordButton}
                                disabled={!palavraChaveInput.trim() || termo.palavrasChave.length >= 10}
                            >
                                Adicionar
                            </button>
                        </div>

                        {getErroCampo("palavrasChave") && (
                            <span style={styles.erroText}>{getErroCampo("palavrasChave")}</span>
                        )}

                        <div style={styles.keywordsList}>
                            {termo.palavrasChave.map((palavra, index) => (
                                <span key={index} style={styles.keywordTag}>
                                    <FaTag size={10} />
                                    {palavra}
                                    <button
                                        onClick={() => removerPalavraChave(palavra)}
                                        style={styles.removeKeyword}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            {termo.palavrasChave.length === 0 && (
                                <span style={styles.keywordsPlaceholder}>
                                    Nenhuma palavra-chave adicionada
                                </span>
                            )}
                        </div>
                        <span style={styles.helperText}>
                            {termo.palavrasChave.length}/10 palavras-chave
                        </span>
                    </div>

                    {/* Informações de versão (apenas para edição) */}
                    {isEditing && (
                        <div style={styles.versionInfo}>
                            <div style={styles.versionItem}>
                                <strong>Versão atual:</strong> v{termo.versao}
                            </div>
                            <div style={styles.versionItem}>
                                <strong>Data de criação:</strong> {new Date(termo.dataCriacao).toLocaleString()}
                            </div>
                            <div style={styles.versionItem}>
                                <strong>Status atual:</strong> 
                                <span style={{
                                    marginLeft: "8px",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    background: termo.status === "aprovado" ? "var(--success-light)" :
                                               termo.status === "pendente" ? "var(--warning-light)" :
                                               termo.status === "recusado" ? "var(--danger-light)" :
                                               "var(--info-light)",
                                    color: termo.status === "aprovado" ? "var(--success)" :
                                           termo.status === "pendente" ? "var(--warning)" :
                                           termo.status === "recusado" ? "var(--danger)" :
                                           "var(--info)"
                                }}>
                                    {termo.status}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Informações adicionais */}
                    <div style={styles.infoBox}>
                        <FaBook style={{ color: "var(--primary)", fontSize: "20px" }} />
                        <div style={styles.infoContent}>
                            <h4 style={styles.infoTitle}>Dicas para um bom termo:</h4>
                            <ul style={styles.infoList}>
                                <li>Use linguagem clara e acessível</li>
                                <li>Seja específico sobre o conceito técnico</li>
                                <li>Inclua exemplos de uso quando possível</li>
                                <li>Adicione palavras-chave que facilitem a busca</li>
                                <li>Revise o conteúdo antes de enviar para análise</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Modal de Confirmação */}
                {showConfirmacao && acaoConfirmacao && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <div style={styles.modalIcon}>
                                {acaoConfirmacao === "rascunho" ? (
                                    <FaSave style={{ color: "var(--warning)", fontSize: "48px" }} />
                                ) : (
                                    <FaPaperPlane style={{ color: "var(--primary)", fontSize: "48px" }} />
                                )}
                            </div>

                            <h3 style={styles.modalTitle}>
                                {acaoConfirmacao === "rascunho"
                                    ? "Salvar como Rascunho?"
                                    : "Enviar para Análise?"}
                            </h3>

                            <p style={styles.modalText}>
                                {acaoConfirmacao === "rascunho"
                                    ? "O termo será salvo como rascunho e você poderá editá-lo posteriormente antes de enviar para análise."
                                    : "O termo será enviado para análise da equipe responsável. Você receberá uma notificação quando for aprovado ou se houver necessidade de ajustes."}
                            </p>

                            <div style={styles.modalActions}>
                                <button
                                    onClick={() => setShowConfirmacao(false)}
                                    style={styles.modalCancelButton}
                                    disabled={loading}
                                >
                                    <FaTimesCircle /> Cancelar
                                </button>
                                <button
                                    onClick={confirmarAcao}
                                    style={{
                                        ...styles.modalConfirmButton,
                                        background: acaoConfirmacao === "rascunho"
                                            ? "var(--warning)"
                                            : "var(--primary)"
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        "Processando..."
                                    ) : (
                                        <>
                                            {acaoConfirmacao === "rascunho" ? (
                                                <><FaSave /> Sim, salvar rascunho</>
                                            ) : (
                                                <><FaPaperPlane /> Sim, enviar para análise</>
                                            )}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {loading && (
                    <div style={styles.loadingOverlay}>
                        <div style={styles.spinner}></div>
                        <p style={{ color: "#fff", marginTop: "16px" }}>
                            {acaoConfirmacao === "rascunho" ? "Salvando rascunho..." : "Enviando para análise..."}
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

// Estilos
const styles: Record<string, React.CSSProperties> = {
    container: {
        animation: "fadeIn 0.5s ease-out",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px"
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
        alignItems: "center",
        gap: "16px",
        marginBottom: "24px",
        flexWrap: "wrap"
    },
    backButton: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-primary)",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    title: {
        margin: 0,
        fontSize: "24px",
        fontWeight: "600",
        color: "var(--text-primary)",
        flex: 1
    },
    headerActions: {
        display: "flex",
        gap: "12px"
    },
    draftButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid var(--warning)",
        background: "transparent",
        color: "var(--warning)",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    submitButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        background: "var(--primary)",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    formContainer: {
        background: "var(--card-bg)",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        padding: "32px"
    },
    erroGeral: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px",
        background: "var(--danger-light)",
        border: "1px solid var(--danger)",
        borderRadius: "8px",
        color: "var(--danger)",
        marginBottom: "20px",
        fontSize: "14px"
    },
    formGroup: {
        marginBottom: "24px"
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    required: {
        color: "var(--danger)",
        marginLeft: "4px"
    },
    input: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none"
    },
    textarea: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        resize: "vertical",
        outline: "none"
    },
    select: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none"
    },
    erroText: {
        display: "block",
        marginTop: "4px",
        fontSize: "12px",
        color: "var(--danger)"
    },
    helperText: {
        display: "block",
        marginTop: "4px",
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    keywordsInputContainer: {
        display: "flex",
        gap: "8px",
        marginBottom: "12px"
    },
    keywordsInput: {
        flex: 1,
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "13px",
        outline: "none"
    },
    addKeywordButton: {
        padding: "10px 16px",
        background: "var(--primary)",
        border: "none",
        borderRadius: "6px",
        color: "#fff",
        fontSize: "13px",
        cursor: "pointer"
    },
    keywordsList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "8px",
        minHeight: "40px"
    },
    keywordTag: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 8px",
        background: "var(--primary-soft)",
        color: "var(--primary)",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "500"
    },
    removeKeyword: {
        background: "none",
        border: "none",
        color: "var(--primary)",
        cursor: "pointer",
        fontSize: "16px",
        padding: "0 2px"
    },
    keywordsPlaceholder: {
        color: "var(--text-tertiary)",
        fontSize: "13px",
        fontStyle: "italic"
    },
    versionInfo: {
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
    },
    versionItem: {
        fontSize: "13px",
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center"
    },
    infoBox: {
        display: "flex",
        gap: "16px",
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        marginTop: "16px"
    },
    infoContent: {
        flex: 1
    },
    infoTitle: {
        margin: "0 0 8px",
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    infoList: {
        margin: 0,
        paddingLeft: "20px",
        fontSize: "13px",
        color: "var(--text-secondary)",
        lineHeight: "1.6"
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000
    },
    modal: {
        background: "var(--card-bg)",
        borderRadius: "16px",
        padding: "32px",
        maxWidth: "400px",
        width: "90%",
        textAlign: "center"
    },
    modalIcon: {
        marginBottom: "20px"
    },
    modalTitle: {
        margin: "0 0 12px",
        fontSize: "20px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    modalText: {
        margin: "0 0 24px",
        fontSize: "14px",
        color: "var(--text-secondary)",
        lineHeight: "1.6"
    },
    modalActions: {
        display: "flex",
        gap: "12px",
        justifyContent: "center"
    },
    modalCancelButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    modalConfirmButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        color: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    loadingOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3000
    }
};

// Adicionar keyframes para animações
const globalStyles = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    button:active {
        transform: translateY(0);
    }
`;

const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);