// import DashboardLayout from "../layouts/DashboardLayout";
// import AulasTable from "../components/Aulas/AulasTable";
// import AulasHeader from "../components/Aulas/AulasHeader";
// import { useState, useCallback } from "react";

// export default function AulasPage() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filters, setFilters] = useState<{
//         status?: string;
//         professor?: string;
//         disciplina?: string;
//         dataInicio?: string;
//         dataFim?: string;
//     }>({});
//     const [stats, setStats] = useState({
//         totalAulas: 0,
//         aulasAgendadas: 0,
//         aulasRealizadas: 0,
//         aulasCanceladas: 0,
//         professoresCount: 0,
//         disciplinasCount: 0
//     });
//     const [professores, setProfessores] = useState<any[]>([]);
//     const [disciplinas, setDisciplinas] = useState<any[]>([]);

//     // Função para atualizar estatísticas (chamada pelo AulasTable)
//     const handleStatsUpdate = useCallback((newStats: {
//         totalAulas: number;
//         aulasAgendadas: number;
//         aulasRealizadas: number;
//         aulasCanceladas: number;
//         professoresCount: number;
//         disciplinasCount: number;
//         professores: any[];
//         disciplinas: any[];
//     }) => {
//         setStats({
//             totalAulas: newStats.totalAulas,
//             aulasAgendadas: newStats.aulasAgendadas,
//             aulasRealizadas: newStats.aulasRealizadas,
//             aulasCanceladas: newStats.aulasCanceladas,
//             professoresCount: newStats.professoresCount,
//             disciplinasCount: newStats.disciplinasCount
//         });
//         setProfessores(newStats.professores);
//         setDisciplinas(newStats.disciplinas);
//     }, []);

//     // Funções de busca e filtro
//     const handleSearch = useCallback((term: string) => {
//         setSearchTerm(term);
//     }, []);

//     const handleFilterChange = useCallback((filter: {
//         status?: string;
//         professor?: string;
//         disciplina?: string;
//         dataInicio?: string;
//         dataFim?: string;
//     }) => {
//         setFilters(filter);
//     }, []);

//     return (
//         <DashboardLayout>
//             <AulasHeader
//                 totalAulas={stats.totalAulas}
//                 aulasAgendadas={stats.aulasAgendadas}
//                 aulasRealizadas={stats.aulasRealizadas}
//                 aulasCanceladas={stats.aulasCanceladas}
//                 professoresCount={stats.professoresCount}
//                 disciplinasCount={stats.disciplinasCount}
//                 professores={professores}
//                 disciplinas={disciplinas}
//                 onSearch={handleSearch}
//                 onFilterChange={handleFilterChange}
//             />
//             <AulasTable
//                 onStatsUpdate={handleStatsUpdate}
//                 externalSearchTerm={searchTerm}
//                 externalFilters={filters}
//             />
//         </DashboardLayout>
//     );
// }

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import QRCode from "react-qr-code";
import {
    FaQrcode,
    FaFileAlt,
    FaLink,
    FaTextHeight,
    FaVideo,
    FaImage,
    FaDownload,
    FaShare,
    FaPrint,
    FaPalette,
    FaPlus,
    FaMinus,
    //   FaRotateRight,
    FaCheckCircle,
    FaCopy,
    FaEnvelope,
    FaWhatsapp,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaChevronLeft,
    FaChevronRight,
    FaCog,
    FaEye,
    FaEyeSlash,
    FaStar,
    FaHeart,
    FaBookmark,
    FaTrash,
    FaEdit
} from "react-icons/fa";

interface QRCodeConfig {
    tipo: "termo" | "link" | "texto" | "video" | "imagem";
    conteudo: {
        termoId?: string;
        termoTitulo?: string;
        url?: string;
        texto?: string;
        videoUrl?: string;
        imagemUrl?: string;
    };
    design: {
        tamanho?: number;
        corFundo?: string;
        corQR?: string;
        logo?: {
            url: string;
            tamanho: number;
        };
        formato?: "padrao" | "arredondado" | "pontilhado";
        margin?: number;
        nivelErro?: "L" | "M" | "Q" | "H";
    };
    personalizacao: {
        titulo: string;
        descricao: string;
        tags: string[];
        categoria: string;
        dataExpiracao?: Date;
        privado: boolean;
    };
}

interface Template {
    id: string;
    nome: string;
    descricao: string;
    imagem: string;
    config: Partial<QRCodeConfig>;
}

export default function GerarQRCode() {
    const navigate = useNavigate();
    const location = useLocation();
    const qrRef = useRef<HTMLDivElement>(null);

    // Estado para o QR Code
    const [config, setConfig] = useState<QRCodeConfig>({
        tipo: "termo",
        conteudo: {},
        design: {
            tamanho: 256,
            corFundo: "#FFFFFF",
            corQR: "#000000",
            formato: "padrao",
            margin: 10,
            nivelErro: "M"
        },
        personalizacao: {
            titulo: "",
            descricao: "",
            tags: [],
            categoria: "geral",
            privado: false
        }
    });

    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [qrValue, setQrValue] = useState("");
    const [showPreview, setShowPreview] = useState(true);
    const [savedTemplates, setSavedTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState("");
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [colorPickerFor, setColorPickerFor] = useState<"fundo" | "qr">("qr");
    const [downloadFormat, setDownloadFormat] = useState<"png" | "svg" | "jpg">("png");
    const [downloadSize, setDownloadSize] = useState<1 | 2 | 3 | 4>(2);
    const [showSuccess, setShowSuccess] = useState(false);
    const [generatedId, setGeneratedId] = useState<string | null>(null);

    // Templates pré-definidos
    const templates: Template[] = [
        {
            id: "1",
            nome: "Clássico",
            descricao: "QR Code tradicional preto e branco",
            imagem: "/templates/classico.png",
            config: {
                design: {
                    corFundo: "#FFF",
                    corQR: "#000",
                    formato: "padrao"
                }
            }
        },
        {
            id: "2",
            nome: "Colorido",
            descricao: "QR Code com cores personalizadas",
            imagem: "/templates/colorido.png",
            config: {
                design: {
                    corFundo: "#F0F9FF",
                    corQR: "#2563EB",
                    formato: "padrao"
                }
            }
        },
        {
            id: "3",
            nome: "Arredondado",
            descricao: "QR Code com pontos arredondados",
            imagem: "/templates/arredondado.png",
            config: {
                design: {
                    formato: "arredondado"
                }
            }
        },
        {
            id: "4",
            nome: "Pontilhado",
            descricao: "QR Code com estilo pontilhado",
            imagem: "/templates/pontilhado.png",
            config: {
                design: {
                    formato: "pontilhado"
                }
            }
        },
        {
            id: "5",
            nome: "Profissional",
            descricao: "Design limpo para uso corporativo",
            imagem: "/templates/profissional.png",
            config: {
                design: {
                    corFundo: "#F8FAFC",
                    corQR: "#0F172A",
                    margin: 20
                }
            }
        },
        {
            id: "6",
            nome: "Vibrante",
            descricao: "Cores vibrantes para chamar atenção",
            imagem: "/templates/vibrante.png",
            config: {
                design: {
                    corFundo: "#FEF3C7",
                    corQR: "#D97706",
                    formato: "arredondado"
                }
            }
        }
    ];

    // Verificar se veio de um termo específico
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const termoId = params.get("termo");
        const termoTitulo = params.get("titulo");

        if (termoId && termoTitulo) {
            setConfig(prev => ({
                ...prev,
                tipo: "termo",
                conteudo: {
                    termoId,
                    termoTitulo: decodeURIComponent(termoTitulo)
                },
                personalizacao: {
                    ...prev.personalizacao,
                    titulo: `QR Code - ${decodeURIComponent(termoTitulo)}`
                }
            }));
        }

        // Carregar templates salvos
        const saved = localStorage.getItem("qr-templates");
        if (saved) {
            setSavedTemplates(JSON.parse(saved));
        }
    }, [location]);

    // Gerar valor do QR Code baseado no tipo
    useEffect(() => {
        let value = "";

        switch (config.tipo) {
            case "termo":
                if (config.conteudo.termoId) {
                    value = `${window.location.origin}/termo/${config.conteudo.termoId}`;
                }
                break;
            case "link":
                value = config.conteudo.url || "";
                break;
            case "texto":
                value = config.conteudo.texto || "";
                break;
            case "video":
                value = config.conteudo.videoUrl || "";
                break;
            case "imagem":
                value = config.conteudo.imagemUrl || "";
                break;
        }

        setQrValue(value);
    }, [config.tipo, config.conteudo]);

    const handleTipoChange = (tipo: QRCodeConfig["tipo"]) => {
        setConfig(prev => ({ ...prev, tipo, conteudo: {} }));
    };

    const handleDesignChange = (key: keyof QRCodeConfig["design"], value: any) => {
        setConfig(prev => ({
            ...prev,
            design: { ...prev.design, [key]: value }
        }));
    };

    const handlePersonalizacaoChange = (key: keyof QRCodeConfig["personalizacao"], value: any) => {
        setConfig(prev => ({
            ...prev,
            personalizacao: { ...prev.personalizacao, [key]: value }
        }));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !config.personalizacao.tags.includes(tagInput.trim())) {
            handlePersonalizacaoChange("tags", [...config.personalizacao.tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        handlePersonalizacaoChange(
            "tags",
            config.personalizacao.tags.filter(t => t !== tag)
        );
    };

    const handleApplyTemplate = (templateId: string) => {
        const template = templates.find(t => t.id === templateId) ||
            savedTemplates.find(t => t.id === templateId);

        if (template?.config) {
            setConfig(prev => ({
                ...prev,
                design: {
                    ...prev.design,
                    ...template.config.design
                }
            }));
            setSelectedTemplate(templateId);
        }
    };

    const handleSaveTemplate = () => {
        const newTemplate: Template = {
            id: `template-${Date.now()}`,
            nome: `Meu Template ${savedTemplates.length + 1}`,
            descricao: "Template personalizado",
            imagem: "/templates/personalizado.png",
            config: {
                design: config.design
            }
        };

        const updated = [...savedTemplates, newTemplate];
        setSavedTemplates(updated);
        localStorage.setItem("qr-templates", JSON.stringify(updated));
        setSelectedTemplate(newTemplate.id);
    };

    const handleDownload = () => {
        if (!qrRef.current) return;

        // Simular download
        setTimeout(() => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 500);

        console.log("Download QR Code:", {
            formato: downloadFormat,
            tamanho: downloadSize,
            config
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: config.personalizacao.titulo,
                    text: config.personalizacao.descricao,
                    url: qrValue
                });
            } catch (error) {
                console.error("Erro ao compartilhar:", error);
            }
        } else {
            // Fallback para clipboard
            navigator.clipboard.writeText(qrValue);
            alert("Link copiado para a área de transferência!");
        }
    };

    const handleGenerate = () => {
        // Validar conteúdo
        if (!qrValue) {
            alert("Preencha o conteúdo do QR Code");
            return;
        }

        // Simular geração
        setGeneratedId(`qr-${Date.now()}`);
        setStep(4);
    };

    const renderStep1 = () => (
        <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>1. Escolha o tipo de conteúdo</h3>

            <div style={styles.tipoGrid}>
                <button
                    onClick={() => handleTipoChange("termo")}
                    style={{
                        ...styles.tipoCard,
                        borderColor: config.tipo === "termo" ? "var(--primary)" : "var(--border-color)",
                        background: config.tipo === "termo" ? "var(--primary-soft)" : "var(--card-bg)"
                    }}
                >
                    <FaFileAlt size={32} color={config.tipo === "termo" ? "var(--primary)" : "var(--text-tertiary)"} />
                    <span style={styles.tipoLabel}>Termo</span>
                    <span style={styles.tipoDesc}>Vincular a um termo existente</span>
                </button>

                <button
                    onClick={() => handleTipoChange("link")}
                    style={{
                        ...styles.tipoCard,
                        borderColor: config.tipo === "link" ? "var(--primary)" : "var(--border-color)",
                        background: config.tipo === "link" ? "var(--primary-soft)" : "var(--card-bg)"
                    }}
                >
                    <FaLink size={32} color={config.tipo === "link" ? "var(--primary)" : "var(--text-tertiary)"} />
                    <span style={styles.tipoLabel}>Link</span>
                    <span style={styles.tipoDesc}>URL para redirecionamento</span>
                </button>

                <button
                    onClick={() => handleTipoChange("texto")}
                    style={{
                        ...styles.tipoCard,
                        borderColor: config.tipo === "texto" ? "var(--primary)" : "var(--border-color)",
                        background: config.tipo === "texto" ? "var(--primary-soft)" : "var(--card-bg)"
                    }}
                >
                    <FaTextHeight size={32} color={config.tipo === "texto" ? "var(--primary)" : "var(--text-tertiary)"} />
                    <span style={styles.tipoLabel}>Texto</span>
                    <span style={styles.tipoDesc}>Mensagem ou informação</span>
                </button>

                <button
                    onClick={() => handleTipoChange("video")}
                    style={{
                        ...styles.tipoCard,
                        borderColor: config.tipo === "video" ? "var(--primary)" : "var(--border-color)",
                        background: config.tipo === "video" ? "var(--primary-soft)" : "var(--card-bg)"
                    }}
                >
                    <FaVideo size={32} color={config.tipo === "video" ? "var(--primary)" : "var(--text-tertiary)"} />
                    <span style={styles.tipoLabel}>Vídeo</span>
                    <span style={styles.tipoDesc}>Link para vídeo</span>
                </button>

                <button
                    onClick={() => handleTipoChange("imagem")}
                    style={{
                        ...styles.tipoCard,
                        borderColor: config.tipo === "imagem" ? "var(--primary)" : "var(--border-color)",
                        background: config.tipo === "imagem" ? "var(--primary-soft)" : "var(--card-bg)"
                    }}
                >
                    <FaImage size={32} color={config.tipo === "imagem" ? "var(--primary)" : "var(--text-tertiary)"} />
                    <span style={styles.tipoLabel}>Imagem</span>
                    <span style={styles.tipoDesc}>Link para imagem</span>
                </button>
            </div>

            <div style={styles.conteudoSection}>
                <h4 style={styles.sectionTitle}>Conteúdo</h4>

                {config.tipo === "termo" && (
                    <div style={styles.termoSelecionado}>
                        <FaFileAlt />
                        <div>
                            <div><strong>{config.conteudo.termoTitulo || "Nenhum termo selecionado"}</strong></div>
                            <div style={styles.termoId}>ID: {config.conteudo.termoId || "---"}</div>
                        </div>
                        <button
                            onClick={() => navigate("/termos")}
                            style={styles.selecionarButton}
                        >
                            Selecionar Termo
                        </button>
                    </div>
                )}

                {config.tipo === "link" && (
                    <input
                        type="url"
                        placeholder="https://exemplo.com"
                        value={config.conteudo.url || ""}
                        onChange={(e) => setConfig(prev => ({
                            ...prev,
                            conteudo: { ...prev.conteudo, url: e.target.value }
                        }))}
                        style={styles.input}
                    />
                )}

                {config.tipo === "texto" && (
                    <textarea
                        placeholder="Digite o texto que será armazenado no QR Code..."
                        value={config.conteudo.texto || ""}
                        onChange={(e) => setConfig(prev => ({
                            ...prev,
                            conteudo: { ...prev.conteudo, texto: e.target.value }
                        }))}
                        rows={4}
                        style={styles.textarea}
                    />
                )}

                {config.tipo === "video" && (
                    <input
                        type="url"
                        placeholder="https://youtube.com/..."
                        value={config.conteudo.videoUrl || ""}
                        onChange={(e) => setConfig(prev => ({
                            ...prev,
                            conteudo: { ...prev.conteudo, videoUrl: e.target.value }
                        }))}
                        style={styles.input}
                    />
                )}

                {config.tipo === "imagem" && (
                    <input
                        type="url"
                        placeholder="https://exemplo.com/imagem.jpg"
                        value={config.conteudo.imagemUrl || ""}
                        onChange={(e) => setConfig(prev => ({
                            ...prev,
                            conteudo: { ...prev.conteudo, imagemUrl: e.target.value }
                        }))}
                        style={styles.input}
                    />
                )}
            </div>

            <div style={styles.navigationButtons}>
                <button
                    onClick={() => setStep(2)}
                    disabled={!qrValue}
                    style={{
                        ...styles.nextButton,
                        background: !qrValue ? "var(--text-tertiary)" : "var(--primary)",
                        cursor: !qrValue ? "not-allowed" : "pointer"
                    }}
                >
                    Próximo <FaChevronRight />
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>2. Personalize o design</h3>

            {/* Templates */}
            <div style={styles.templatesSection}>
                <h4 style={styles.sectionTitle}>Templates</h4>
                <div style={styles.templatesGrid}>
                    {templates.map(template => (
                        <button
                            key={template.id}
                            onClick={() => handleApplyTemplate(template.id)}
                            style={{
                                ...styles.templateCard,
                                borderColor: selectedTemplate === template.id ? "var(--primary)" : "var(--border-color)"
                            }}
                        >
                            <div style={styles.templatePreview}>
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    background: template.config.design?.corFundo || "#FFF",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        background: template.config.design?.corQR || "#000",
                                        borderRadius: template.config.design?.formato === "arredondado" ? "8px" :
                                            template.config.design?.formato === "pontilhado" ? "50%" : "0",
                                        opacity: 0.8
                                    }} />
                                </div>
                            </div>
                            <div style={styles.templateInfo}>
                                <span style={styles.templateName}>{template.nome}</span>
                                <span style={styles.templateDesc}>{template.descricao}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleSaveTemplate}
                    style={styles.saveTemplateButton}
                >
                    <FaPlus /> Salvar como template
                </button>
            </div>

            {/* Controles de Design */}
            <div style={styles.designControls}>
                <div style={styles.controlGroup}>
                    <label style={styles.controlLabel}>Tamanho</label>
                    <div style={styles.sizeControl}>
                        <button
                            onClick={() => handleDesignChange("tamanho", Math.max(128, config.design?.tamanho ?? 128 - 32))}
                            style={styles.sizeButton}
                        >
                            <FaMinus />
                        </button>
                        <span style={styles.sizeValue}>{config.design?.tamanho ?? 128}px</span>
                        <button
                            onClick={() => handleDesignChange("tamanho", Math.min(512, config.design?.tamanho ?? 128 + 32))}
                            style={styles.sizeButton}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div style={styles.controlGroup}>
                    <label style={styles.controlLabel}>Margem</label>
                    <div style={styles.sizeControl}>
                        <button
                            onClick={() => handleDesignChange("margin", Math.max(0, config.design?.margin ?? 0 - 2))}
                            style={styles.sizeButton}
                        >
                            <FaMinus />
                        </button>
                        <span style={styles.sizeValue}>{config.design?.margin ?? 0}px</span>
                        <button
                            onClick={() => handleDesignChange("margin", Math.min(50, config.design?.margin ?? 0 + 2))}
                            style={styles.sizeButton}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div style={styles.controlGroup}>
                    <label style={styles.controlLabel}>Formato</label>
                    <div style={styles.formatoGrid}>
                        <button
                            onClick={() => handleDesignChange("formato", "padrao")}
                            style={{
                                ...styles.formatoButton,
                                background: config.design.formato === "padrao" ? "var(--primary)" : "var(--bg-tertiary)",
                                color: config.design.formato === "padrao" ? "#fff" : "var(--text-secondary)"
                            }}
                        >
                            Padrão
                        </button>
                        <button
                            onClick={() => handleDesignChange("formato", "arredondado")}
                            style={{
                                ...styles.formatoButton,
                                background: config.design.formato === "arredondado" ? "var(--primary)" : "var(--bg-tertiary)",
                                color: config.design.formato === "arredondado" ? "#fff" : "var(--text-secondary)"
                            }}
                        >
                            Arredondado
                        </button>
                        <button
                            onClick={() => handleDesignChange("formato", "pontilhado")}
                            style={{
                                ...styles.formatoButton,
                                background: config.design.formato === "pontilhado" ? "var(--primary)" : "var(--bg-tertiary)",
                                color: config.design.formato === "pontilhado" ? "#fff" : "var(--text-secondary)"
                            }}
                        >
                            Pontilhado
                        </button>
                    </div>
                </div>

                <div style={styles.controlGroup}>
                    <label style={styles.controlLabel}>Cores</label>
                    <div style={styles.coresGrid}>
                        <div style={styles.corItem}>
                            <span>Fundo</span>
                            <button
                                onClick={() => {
                                    setColorPickerFor("fundo");
                                    setShowColorPicker(true);
                                }}
                                style={{
                                    ...styles.corButton,
                                    background: config.design.corFundo
                                }}
                            />
                        </div>
                        <div style={styles.corItem}>
                            <span>QR Code</span>
                            <button
                                onClick={() => {
                                    setColorPickerFor("qr");
                                    setShowColorPicker(true);
                                }}
                                style={{
                                    ...styles.corButton,
                                    background: config.design.corQR
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.controlGroup}>
                    <label style={styles.controlLabel}>Nível de correção de erro</label>
                    <select
                        value={config.design.nivelErro}
                        onChange={(e) => handleDesignChange("nivelErro", e.target.value)}
                        style={styles.select}
                    >
                        <option value="L">Baixo (7%)</option>
                        <option value="M">Médio (15%)</option>
                        <option value="Q">Alto (25%)</option>
                        <option value="H">Máximo (30%)</option>
                    </select>
                </div>
            </div>

            <div style={styles.navigationButtons}>
                <button
                    onClick={() => setStep(1)}
                    style={styles.backButton}
                >
                    <FaChevronLeft /> Voltar
                </button>
                <button
                    onClick={() => setStep(3)}
                    style={styles.nextButton}
                >
                    Próximo <FaChevronRight />
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>3. Personalize as informações</h3>

            <div style={styles.personalizacaoForm}>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Título</label>
                    <input
                        type="text"
                        placeholder="Dê um título ao seu QR Code"
                        value={config.personalizacao.titulo}
                        onChange={(e) => handlePersonalizacaoChange("titulo", e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Descrição</label>
                    <textarea
                        placeholder="Descreva o conteúdo do QR Code"
                        value={config.personalizacao.descricao}
                        onChange={(e) => handlePersonalizacaoChange("descricao", e.target.value)}
                        rows={3}
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Tags</label>
                    <div style={styles.tagsInput}>
                        <input
                            type="text"
                            placeholder="Adicionar tag"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                            style={styles.tagInput}
                        />
                        <button onClick={handleAddTag} style={styles.addTagButton}>
                            <FaPlus />
                        </button>
                    </div>
                    <div style={styles.tagsList}>
                        {config.personalizacao.tags.map(tag => (
                            <span key={tag} style={styles.tag}>
                                {tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    style={styles.removeTag}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Categoria</label>
                    <select
                        value={config.personalizacao.categoria}
                        onChange={(e) => handlePersonalizacaoChange("categoria", e.target.value)}
                        style={styles.select}
                    >
                        <option value="geral">Geral</option>
                        <option value="educacao">Educação</option>
                        <option value="saude">Saúde</option>
                        <option value="direitos">Direitos</option>
                        <option value="servicos">Serviços</option>
                        <option value="cultura">Cultura</option>
                        <option value="emergencia">Emergência</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Data de expiração (opcional)</label>
                    <input
                        type="date"
                        value={config.personalizacao.dataExpiracao?.toISOString().split("T")[0] || ""}
                        onChange={(e) => handlePersonalizacaoChange(
                            "dataExpiracao",
                            e.target.value ? new Date(e.target.value) : undefined
                        )}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={config.personalizacao.privado}
                            onChange={(e) => handlePersonalizacaoChange("privado", e.target.checked)}
                        />
                        Tornar QR Code privado (não aparecerá em buscas)
                    </label>
                </div>
            </div>

            <div style={styles.navigationButtons}>
                <button
                    onClick={() => setStep(2)}
                    style={styles.backButton}
                >
                    <FaChevronLeft /> Voltar
                </button>
                <button
                    onClick={handleGenerate}
                    style={styles.nextButton}
                >
                    Gerar QR Code <FaQrcode />
                </button>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>4. QR Code gerado com sucesso!</h3>

            {showSuccess && (
                <div style={styles.successMessage}>
                    <FaCheckCircle /> QR Code baixado com sucesso!
                </div>
            )}

            <div style={styles.resultContainer}>
                {/* Pré-visualização */}
                <div style={styles.previewSection}>
                    <div style={styles.previewHeader}>
                        <h4 style={styles.previewTitle}>Pré-visualização</h4>
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            style={styles.previewToggle}
                        >
                            {showPreview ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {showPreview && (
                        <div style={styles.qrPreviewContainer}>
                            <div
                                ref={qrRef}
                                style={{
                                    ...styles.qrPreview,
                                    padding: config.design.margin,
                                    background: config.design.corFundo
                                }}
                            >
                                <QRCode
                                    value={qrValue}
                                    size={config.design.tamanho}
                                    bgColor={config.design.corFundo}
                                    fgColor={config.design.corQR}
                                    level={config.design.nivelErro}
                                />
                            </div>

                            {config.personalizacao.titulo && (
                                <div style={styles.qrInfo}>
                                    <strong>{config.personalizacao.titulo}</strong>
                                    {config.personalizacao.descricao && (
                                        <p style={styles.qrDesc}>{config.personalizacao.descricao}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Opções de Download */}
                <div style={styles.downloadSection}>
                    <h4 style={styles.downloadTitle}>Opções de Download</h4>

                    <div style={styles.downloadOptions}>
                        <div style={styles.optionGroup}>
                            <label style={styles.optionLabel}>Formato</label>
                            <div style={styles.formatButtons}>
                                {["png", "svg", "jpg"].map(format => (
                                    <button
                                        key={format}
                                        onClick={() => setDownloadFormat(format as any)}
                                        style={{
                                            ...styles.formatButton,
                                            background: downloadFormat === format ? "var(--primary)" : "var(--bg-tertiary)",
                                            color: downloadFormat === format ? "#fff" : "var(--text-secondary)"
                                        }}
                                    >
                                        {format.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={styles.optionGroup}>
                            <label style={styles.optionLabel}>Tamanho</label>
                            <div style={styles.sizeButtons}>
                                {[1, 2, 3, 4].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setDownloadSize(size as any)}
                                        style={{
                                            ...styles.sizeOptionButton,
                                            background: downloadSize === size ? "var(--primary)" : "var(--bg-tertiary)",
                                            color: downloadSize === size ? "#fff" : "var(--text-secondary)"
                                        }}
                                    >
                                        {size === 1 && "Pequeno"}
                                        {size === 2 && "Médio"}
                                        {size === 3 && "Grande"}
                                        {size === 4 && "Extra"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={styles.actionButtons}>
                        <button onClick={handleDownload} style={styles.downloadButton}>
                            <FaDownload /> Download
                        </button>
                        <button onClick={handleShare} style={styles.shareButton}>
                            <FaShare /> Compartilhar
                        </button>
                        <button onClick={() => window.print()} style={styles.printButton}>
                            <FaPrint /> Imprimir
                        </button>
                    </div>

                    <div style={styles.shareLinks}>
                        <h5 style={styles.shareTitle}>Compartilhar em:</h5>
                        <div style={styles.socialButtons}>
                            <button style={styles.socialButton}><FaWhatsapp /></button>
                            <button style={styles.socialButton}><FaFacebook /></button>
                            <button style={styles.socialButton}><FaTwitter /></button>
                            <button style={styles.socialButton}><FaLinkedin /></button>
                            <button style={styles.socialButton}><FaEnvelope /></button>
                            <button
                                onClick={() => navigator.clipboard.writeText(qrValue)}
                                style={styles.socialButton}
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>

                    <div style={styles.qrLink}>
                        <strong>Link do QR Code:</strong>
                        <div style={styles.linkBox}>
                            <span style={styles.linkText}>{qrValue}</span>
                            <button
                                onClick={() => navigator.clipboard.writeText(qrValue)}
                                style={styles.copyLinkButton}
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>

                    <div style={styles.actionsFooter}>
                        <button
                            onClick={() => setStep(1)}
                            style={styles.newQRButton}
                        >
                            <FaPlus /> Novo QR Code
                        </button>
                        <button
                            onClick={() => navigate(`/meus-qrcodes/${generatedId}`)}
                            style={styles.viewButton}
                        >
                            <FaEye /> Visualizar detalhes
                        </button>
                        <button
                            onClick={() => navigate("/meus-qrcodes")}
                            style={styles.listButton}
                        >
                            Ver meus QR Codes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <DashboardLayout>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>Gerar QR Code</h1>
                        <p style={styles.subtitle}>
                            Crie QR Codes personalizados para seus termos e conteúdos
                        </p>
                    </div>

                    <div style={styles.progressBar}>
                        <div style={styles.progressSteps}>
                            {[1, 2, 3, 4].map(s => (
                                <div
                                    key={s}
                                    style={{
                                        ...styles.progressStep,
                                        background: s <= step ? "var(--primary)" : "var(--bg-tertiary)",
                                        color: s <= step ? "#fff" : "var(--text-tertiary)"
                                    }}
                                    onClick={() => s < step && setStep(s as any)}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                        <div style={styles.progressLabels}>
                            <span>Tipo</span>
                            <span>Design</span>
                            <span>Info</span>
                            <span>Final</span>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div style={styles.mainContent}>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                </div>

                {/* Color Picker Modal */}
                {showColorPicker && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.colorPickerModal}>
                            <h4 style={styles.modalTitle}>
                                Escolha a cor do {colorPickerFor === "fundo" ? "fundo" : "QR Code"}
                            </h4>

                            <div style={styles.colorPresets}>
                                {["#000000", "#2563EB", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#EC4899"].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => {
                                            if (colorPickerFor === "fundo") {
                                                handleDesignChange("corFundo", color);
                                            } else {
                                                handleDesignChange("corQR", color);
                                            }
                                            setShowColorPicker(false);
                                        }}
                                        style={{
                                            ...styles.colorPreset,
                                            background: color
                                        }}
                                    />
                                ))}
                            </div>

                            <input
                                type="color"
                                value={colorPickerFor === "fundo" ? config.design.corFundo : config.design.corQR}
                                onChange={(e) => {
                                    if (colorPickerFor === "fundo") {
                                        handleDesignChange("corFundo", e.target.value);
                                    } else {
                                        handleDesignChange("corQR", e.target.value);
                                    }
                                }}
                                style={styles.colorInput}
                            />

                            <button
                                onClick={() => setShowColorPicker(false)}
                                style={styles.modalCloseButton}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        animation: "fadeIn 0.5s ease-out"
    },
    header: {
        marginBottom: "32px"
    },
    title: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    subtitle: {
        margin: "4px 0 0",
        fontSize: "14px",
        color: "var(--text-tertiary)"
    },
    progressBar: {
        marginTop: "24px"
    },
    progressSteps: {
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        marginBottom: "8px"
    },
    progressStep: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    progressLabels: {
        display: "flex",
        justifyContent: "center",
        gap: "51px",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        padding: "0 8px"
    },
    mainContent: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        padding: "24px"
    },
    stepContent: {
        minHeight: "400px"
    },
    stepTitle: {
        margin: "0 0 24px",
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    tipoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
    },
    tipoCard: {
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid",
        background: "var(--card-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    tipoLabel: {
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    tipoDesc: {
        fontSize: "11px",
        color: "var(--text-tertiary)",
        textAlign: "center"
    },
    conteudoSection: {
        marginTop: "24px"
    },
    sectionTitle: {
        margin: "0 0 16px",
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    termoSelecionado: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px"
    },
    termoId: {
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    selecionarButton: {
        marginLeft: "auto",
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        cursor: "pointer"
    },
    input: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px"
    },
    textarea: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px",
        resize: "vertical"
    },
    navigationButtons: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "32px"
    },
    backButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
    },
    nextButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        background: "var(--primary)",
        color: "#fff",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
    },
    templatesSection: {
        marginBottom: "32px"
    },
    templatesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "12px",
        marginBottom: "16px"
    },
    templateCard: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid",
        background: "var(--card-bg)",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    templatePreview: {
        width: "60px",
        height: "60px",
        borderRadius: "8px",
        overflow: "hidden"
    },
    templateInfo: {
        display: "flex",
        flexDirection: "column"
    },
    templateName: {
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    templateDesc: {
        fontSize: "11px",
        color: "var(--text-tertiary)"
    },
    saveTemplateButton: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px dashed var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        cursor: "pointer"
    },
    designControls: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    controlGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },
    controlLabel: {
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    sizeControl: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    sizeButton: {
        width: "32px",
        height: "32px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    },
    sizeValue: {
        minWidth: "60px",
        textAlign: "center",
        fontSize: "14px",
        color: "var(--text-primary)"
    },
    formatoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px"
    },
    formatoButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        fontSize: "13px",
        cursor: "pointer"
    },
    coresGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px"
    },
    corItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    corButton: {
        width: "32px",
        height: "32px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        cursor: "pointer"
    },
    select: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px"
    },
    personalizacaoForm: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },
    formLabel: {
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        color: "var(--text-secondary)",
        cursor: "pointer"
    },
    tagsInput: {
        display: "flex",
        gap: "8px"
    },
    tagInput: {
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px"
    },
    addTagButton: {
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    },
    tagsList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
    },
    tag: {
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 8px",
        borderRadius: "4px",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)",
        fontSize: "12px"
    },
    removeTag: {
        background: "none",
        border: "none",
        color: "var(--text-tertiary)",
        cursor: "pointer",
        fontSize: "14px"
    },
    resultContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px"
    },
    previewSection: {
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "8px"
    },
    previewHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
    },
    previewTitle: {
        margin: 0,
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    previewToggle: {
        background: "none",
        border: "none",
        color: "var(--text-tertiary)",
        cursor: "pointer",
        fontSize: "16px"
    },
    qrPreviewContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
    },
    qrPreview: {
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    },
    qrInfo: {
        textAlign: "center"
    },
    qrDesc: {
        margin: "4px 0 0",
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    downloadSection: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    downloadTitle: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    downloadOptions: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    optionGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },
    optionLabel: {
        fontSize: "13px",
        color: "var(--text-tertiary)"
    },
    formatButtons: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px"
    },
    formatButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        fontSize: "12px",
        cursor: "pointer"
    },
    sizeButtons: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px"
    },
    sizeOptionButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        fontSize: "11px",
        cursor: "pointer"
    },
    actionButtons: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px"
    },
    downloadButton: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        background: "var(--primary)",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer"
    },
    shareButton: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer"
    },
    printButton: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer"
    },
    shareLinks: {
        marginTop: "16px"
    },
    shareTitle: {
        margin: "0 0 12px",
        fontSize: "13px",
        fontWeight: "500",
        color: "var(--text-secondary)"
    },
    socialButtons: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
    },
    socialButton: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "16px"
    },
    qrLink: {
        marginTop: "16px"
    },
    linkBox: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "8px",
        padding: "8px",
        background: "var(--bg-tertiary)",
        borderRadius: "6px"
    },
    linkText: {
        flex: 1,
        fontSize: "12px",
        color: "var(--text-secondary)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    copyLinkButton: {
        background: "none",
        border: "none",
        color: "var(--text-tertiary)",
        cursor: "pointer"
    },
    actionsFooter: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px",
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: "1px solid var(--border-color)"
    },
    newQRButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer"
    },
    viewButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer"
    },
    listButton: {
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer"
    },
    successMessage: {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 20px",
        background: "var(--success)",
        color: "#fff",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
        zIndex: 2000,
        animation: "slideIn 0.3s ease-out"
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
    colorPickerModal: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        padding: "24px",
        width: "90%",
        maxWidth: "400px"
    },
    modalTitle: {
        margin: "0 0 20px",
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    colorPresets: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "8px",
        marginBottom: "16px"
    },
    colorPreset: {
        width: "36px",
        height: "36px",
        borderRadius: "6px",
        border: "2px solid var(--border-color)",
        cursor: "pointer"
    },
    colorInput: {
        width: "100%",
        height: "50px",
        padding: "4px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        marginBottom: "16px",
        cursor: "pointer"
    },
    modalCloseButton: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        fontSize: "14px",
        cursor: "pointer"
    }
};

// CSS Global
const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

// Adicionar estilos globais
const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);