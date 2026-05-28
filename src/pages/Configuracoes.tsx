import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    FaCog,
    FaBuilding,
    FaNetworkWired,
    FaCloudUploadAlt,
    FaCloudDownloadAlt,
    FaDatabase,
    FaServer,
    FaGlobe,
    FaWifi,
    FaShieldAlt,
    FaBell,
    FaEnvelope,
    FaMobile,
    FaLaptop,
    FaUsers,
    FaUserTie,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaSave,
    FaTimes,
    FaSpinner,
    FaInfoCircle,
    FaExclamationTriangle,
    FaCheckCircle,
    FaArrowLeft,
    FaEdit,
    FaCopy,
    FaQrcode,
    FaCode,
    FaDatabase as FaDatabaseIcon,
    FaCloud,
    FaSync,
    FaHistory,
    FaTrash,
    FaDownload,
    FaUpload,
    FaPlus,
    FaMinus,
    FaToggleOn,
    FaToggleOff,
    FaClock,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaGlobeAmericas
} from "react-icons/fa";

interface ConfiguracaoInstitucional {
    id: string;
    nome: string;
    sigla: string;
    cnpj: string;
    endereco: {
        logradouro: string;
        numero: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };
    contato: {
        telefone: string;
        email: string;
        site: string;
    };
    campi: Campus[];
    logo?: string;
    cores?: {
        primaria: string;
        secundaria: string;
    };
}

interface Campus {
    id: string;
    nome: string;
    cidade: string;
    estado: string;
    tipo: "sede" | "campus" | "nucleo" | "polo";
    status: "ativo" | "inativo";
    sincronizacao: {
        modo: "centralizado" | "descentralizado" | "hibrido";
        ultimaSincronizacao?: string;
        frequencia: "tempo-real" | "diaria" | "semanal" | "manual";
    };
    responsavel: {
        nome: string;
        email: string;
        telefone: string;
    };
}

interface ConfiguracaoBackup {
    id: string;
    tipo: "automático" | "manual";
    frequencia: "diario" | "semanal" | "mensal";
    horario: string;
    destino: "local" | "nuvem" | "ambos";
    reter: number;
    ultimoBackup?: string;
    status: "ativo" | "inativo";
}

interface ModoImplantacao {
    id: string;
    nome: "centralizado" | "descentralizado" | "hibrido";
    descricao: string;
    vantagens: string[];
    desvantagens: string[];
    configuracao: {
        servidorCentral?: string;
        replicacao?: "tempo-real" | "diaria" | "manual";
        cacheLocal?: boolean;
        offlineCapable?: boolean;
    };
}

export default function ConfiguracoesSistema() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"institucional" | "campi" | "backup" | "implantacao">("institucional");
    const [configInstitucional, setConfigInstitucional] = useState<ConfiguracaoInstitucional | null>(null);
    const [configBackup, setConfigBackup] = useState<ConfiguracaoBackup | null>(null);
    const [modoImplantacao, setModoImplantacao] = useState<ModoImplantacao | null>(null);
    const [editando, setEditando] = useState(false);
    const [showBackupModal, setShowBackupModal] = useState(false);
    const [showCampiModal, setShowCampiModal] = useState(false);
    const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
    const [backupProgress, setBackupProgress] = useState(0);
    const [sincronizando, setSincronizando] = useState(false);

    useEffect(() => {
        fetchConfiguracoes();
    }, []);

    const fetchConfiguracoes = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Dados mockados
            setConfigInstitucional({
                id: "1",
                nome: "Instituto Federal do Pará",
                sigla: "IFPA",
                cnpj: "10.123.456/0001-00",
                endereco: {
                    logradouro: "Avenida João Paulo II",
                    numero: "123",
                    complemento: "Bloco A",
                    bairro: "Centro",
                    cidade: "Belém",
                    estado: "PA",
                    cep: "66000-000"
                },
                contato: {
                    telefone: "(91) 1234-5678",
                    email: "contato@ifpa.edu.br",
                    site: "www.ifpa.edu.br"
                },
                campi: [
                    {
                        id: "c1",
                        nome: "Campus Belém",
                        cidade: "Belém",
                        estado: "PA",
                        tipo: "sede",
                        status: "ativo",
                        sincronizacao: {
                            modo: "hibrido",
                            ultimaSincronizacao: "2024-03-06T08:30:00",
                            frequencia: "tempo-real"
                        },
                        responsavel: {
                            nome: "Prof. João Silva",
                            email: "joao.silva@ifpa.edu.br",
                            telefone: "(91) 98765-4321"
                        }
                    },
                    {
                        id: "c2",
                        nome: "Campus Tucuruí",
                        cidade: "Tucuruí",
                        estado: "PA",
                        tipo: "campus",
                        status: "ativo",
                        sincronizacao: {
                            modo: "hibrido",
                            ultimaSincronizacao: "2024-03-06T09:15:00",
                            frequencia: "tempo-real"
                        },
                        responsavel: {
                            nome: "Profa. Maria Oliveira",
                            email: "maria.oliveira@ifpa.edu.br",
                            telefone: "(94) 98765-1234"
                        }
                    },
                    {
                        id: "c3",
                        nome: "Núcleo Avançado Altamira",
                        cidade: "Altamira",
                        estado: "PA",
                        tipo: "nucleo",
                        status: "ativo",
                        sincronizacao: {
                            modo: "descentralizado",
                            ultimaSincronizacao: "2024-03-05T14:00:00",
                            frequencia: "diaria"
                        },
                        responsavel: {
                            nome: "Dr. Carlos Santos",
                            email: "carlos.santos@ifpa.edu.br",
                            telefone: "(93) 98765-5678"
                        }
                    }
                ],
                cores: {
                    primaria: "#4F46E5",
                    secundaria: "#10B981"
                }
            });

            setConfigBackup({
                id: "b1",
                tipo: "automático",
                frequencia: "diario",
                horario: "02:00",
                destino: "ambos",
                reter: 30,
                ultimoBackup: "2024-03-06T02:00:00",
                status: "ativo"
            });

            setModoImplantacao({
                id: "m1",
                nome: "hibrido",
                descricao: "Modelo híbrido com sincronização em tempo real entre campi e cache local para funcionamento offline",
                vantagens: [
                    "Funciona online e offline",
                    "Sincronização automática",
                    "Dados disponíveis em todos os campi",
                    "Redundância de dados",
                    "Performance otimizada"
                ],
                desvantagens: [
                    "Requer configuração mais complexa",
                    "Maior custo de infraestrutura",
                    "Possíveis conflitos de sincronização"
                ],
                configuracao: {
                    servidorCentral: "https://api.ifpa.edu.br/librasqr",
                    replicacao: "tempo-real",
                    cacheLocal: true,
                    offlineCapable: true
                }
            });

        } catch (error) {
            console.error("Erro ao buscar configurações:", error);
            toast.error("Erro ao carregar configurações");
        } finally {
            setLoading(false);
        }
    };

    const handleSalvarConfig = async () => {
        setSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Configurações salvas com sucesso!");
            setEditando(false);
        } catch (error) {
            toast.error("Erro ao salvar configurações");
        } finally {
            setSaving(false);
        }
    };

    const handleBackup = async (tipo: "manual" | "restaurar") => {
        if (tipo === "manual") {
            setBackupProgress(0);
            const interval = setInterval(() => {
                setBackupProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        toast.success("Backup realizado com sucesso!");
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
        } else {
            if (window.confirm("Deseja restaurar o último backup? Isso substituirá os dados atuais.")) {
                toast.success("Restauração iniciada...");
                setTimeout(() => toast.success("Restauração concluída!"), 2000);
            }
        }
    };

    const handleSincronizarCampi = async () => {
        setSincronizando(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success("Sincronização concluída!");
        } catch (error) {
            toast.error("Erro na sincronização");
        } finally {
            setSincronizando(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Carregando configurações...</p>
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
                        <h1 style={styles.title}>
                            <FaCog /> Configurações do Sistema
                        </h1>
                        <p style={styles.subtitle}>
                            Gerencie as configurações institucionais, sincronização e backup
                        </p>
                    </div>
                    {!editando ? (
                        <button
                            onClick={() => setEditando(true)}
                            style={styles.editButton}
                        >
                            <FaEdit /> Editar Configurações
                        </button>
                    ) : (
                        <div style={styles.headerActions}>
                            <button
                                onClick={() => setEditando(false)}
                                style={styles.cancelButton}
                                disabled={saving}
                            >
                                <FaTimes /> Cancelar
                            </button>
                            <button
                                onClick={handleSalvarConfig}
                                style={styles.saveButton}
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <FaSpinner style={styles.buttonSpinner} />
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave /> Salvar Configurações
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Abas */}
                <div style={styles.tabsContainer}>
                    <button
                        onClick={() => setActiveTab("institucional")}
                        style={{
                            ...styles.tabButton,
                            borderBottomColor: activeTab === "institucional" ? "var(--primary)" : "transparent",
                            color: activeTab === "institucional" ? "var(--primary)" : "var(--text-secondary)"
                        }}
                    >
                        <FaBuilding /> Institucional
                    </button>
                    <button
                        onClick={() => setActiveTab("campi")}
                        style={{
                            ...styles.tabButton,
                            borderBottomColor: activeTab === "campi" ? "var(--primary)" : "transparent",
                            color: activeTab === "campi" ? "var(--primary)" : "var(--text-secondary)"
                        }}
                    >
                        <FaGlobe /> Campi
                    </button>
                    <button
                        onClick={() => setActiveTab("backup")}
                        style={{
                            ...styles.tabButton,
                            borderBottomColor: activeTab === "backup" ? "var(--primary)" : "transparent",
                            color: activeTab === "backup" ? "var(--primary)" : "var(--text-secondary)"
                        }}
                    >
                        <FaDatabase /> Backup
                    </button>
                    <button
                        onClick={() => setActiveTab("implantacao")}
                        style={{
                            ...styles.tabButton,
                            borderBottomColor: activeTab === "implantacao" ? "var(--primary)" : "transparent",
                            color: activeTab === "implantacao" ? "var(--primary)" : "var(--text-secondary)"
                        }}
                    >
                        <FaNetworkWired /> Modo de Implantação
                    </button>
                </div>

                {/* Conteúdo das Abas */}
                <div style={styles.tabContent}>
                    {/* Aba Institucional */}
                    {activeTab === "institucional" && configInstitucional && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Dados da Instituição</h3>
                            
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Nome da Instituição</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.nome}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            nome: e.target.value
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Sigla</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.sigla}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            sigla: e.target.value
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>CNPJ</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.cnpj}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            cnpj: e.target.value
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <h3 style={styles.sectionTitle}>Endereço</h3>
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Logradouro</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.endereco.logradouro}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            endereco: { ...configInstitucional.endereco, logradouro: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Número</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.endereco.numero}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            endereco: { ...configInstitucional.endereco, numero: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Complemento</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.endereco.complemento}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            endereco: { ...configInstitucional.endereco, complemento: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Bairro</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.endereco.bairro}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            endereco: { ...configInstitucional.endereco, bairro: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Cidade</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.endereco.cidade}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            endereco: { ...configInstitucional.endereco, cidade: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Estado</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.endereco.estado}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            endereco: { ...configInstitucional.endereco, estado: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>CEP</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.endereco.cep}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            endereco: { ...configInstitucional.endereco, cep: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <h3 style={styles.sectionTitle}>Contato</h3>
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Telefone</label>
                                    <input
                                        type="text"
                                        value={configInstitucional.contato.telefone}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            contato: { ...configInstitucional.contato, telefone: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Email</label>
                                    <input
                                        type="email"
                                        value={configInstitucional.contato.email}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            contato: { ...configInstitucional.contato, email: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Site</label>
                                    <input
                                        type="url"
                                        value={configInstitucional.contato.site}
                                        onChange={(e) => setConfigInstitucional({
                                            ...configInstitucional,
                                            contato: { ...configInstitucional.contato, site: e.target.value }
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Aba Campi */}
                    {activeTab === "campi" && configInstitucional && (
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <h3 style={styles.sectionTitle}>Campi e Unidades</h3>
                                <div style={styles.sectionActions}>
                                    <button
                                        onClick={handleSincronizarCampi}
                                        style={styles.secondaryButton}
                                        disabled={sincronizando}
                                    >
                                        {sincronizando ? (
                                            <>
                                                <FaSpinner style={styles.buttonSpinner} />
                                                Sincronizando...
                                            </>
                                        ) : (
                                            <>
                                                <FaSync /> Sincronizar Todos
                                            </>
                                        )}
                                    </button>
                                    {editando && (
                                        <button
                                            onClick={() => setShowCampiModal(true)}
                                            style={styles.primaryButton}
                                        >
                                            <FaPlus /> Adicionar Campus
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div style={styles.campiGrid}>
                                {configInstitucional.campi.map(campus => (
                                    <div key={campus.id} style={styles.campusCard}>
                                        <div style={styles.campusHeader}>
                                            <h4>{campus.nome}</h4>
                                            <span style={{
                                                ...styles.campusTipoBadge,
                                                background: campus.tipo === "sede" ? "var(--primary-light)" :
                                                           campus.tipo === "campus" ? "var(--success-light)" :
                                                           "var(--info-light)",
                                                color: campus.tipo === "sede" ? "var(--primary)" :
                                                       campus.tipo === "campus" ? "var(--success)" :
                                                       "var(--info)"
                                            }}>
                                                {campus.tipo}
                                            </span>
                                        </div>

                                        <div style={styles.campusInfo}>
                                            <p><FaMapMarkerAlt /> {campus.cidade}/{campus.estado}</p>
                                            <p><FaUserTie /> {campus.responsavel.nome}</p>
                                            <p><FaEnvelope /> {campus.responsavel.email}</p>
                                            <p><FaMobile /> {campus.responsavel.telefone}</p>
                                        </div>

                                        <div style={styles.campusFooter}>
                                            <div style={styles.sincronizacaoInfo}>
                                                <FaSync />
                                                <span>
                                                    {campus.sincronizacao.frequencia}
                                                    {campus.sincronizacao.ultimaSincronizacao && (
                                                        <> • Última: {new Date(campus.sincronizacao.ultimaSincronizacao).toLocaleTimeString()}</>
                                                    )}
                                                </span>
                                            </div>
                                            <div style={styles.campusActions}>
                                                {editando && (
                                                    <>
                                                        <button
                                                            onClick={() => setSelectedCampus(campus)}
                                                            style={styles.iconButton}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            style={styles.iconButton}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Aba Backup */}
                    {activeTab === "backup" && configBackup && (
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <h3 style={styles.sectionTitle}>Configurações de Backup</h3>
                                <div style={styles.sectionActions}>
                                    <button
                                        onClick={() => handleBackup("manual")}
                                        style={styles.primaryButton}
                                    >
                                        <FaCloudUploadAlt /> Fazer Backup Agora
                                    </button>
                                    <button
                                        onClick={() => handleBackup("restaurar")}
                                        style={styles.warningButton}
                                    >
                                        <FaCloudDownloadAlt /> Restaurar Backup
                                    </button>
                                </div>
                            </div>

                            {backupProgress > 0 && backupProgress < 100 && (
                                <div style={styles.progressContainer}>
                                    <div style={styles.progressBar}>
                                        <div style={{
                                            ...styles.progressFill,
                                            width: `${backupProgress}%`
                                        }} />
                                    </div>
                                    <span>{backupProgress}% concluído</span>
                                </div>
                            )}

                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Tipo de Backup</label>
                                    <select
                                        value={configBackup.tipo}
                                        onChange={(e) => setConfigBackup({
                                            ...configBackup,
                                            tipo: e.target.value as "automático" | "manual"
                                        })}
                                        disabled={!editando}
                                        style={styles.select}
                                    >
                                        <option value="automático">Automático</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Frequência</label>
                                    <select
                                        value={configBackup.frequencia}
                                        onChange={(e) => setConfigBackup({
                                            ...configBackup,
                                            frequencia: e.target.value as "diario" | "semanal" | "mensal"
                                        })}
                                        disabled={!editando || configBackup.tipo === "manual"}
                                        style={styles.select}
                                    >
                                        <option value="diario">Diário</option>
                                        <option value="semanal">Semanal</option>
                                        <option value="mensal">Mensal</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Horário</label>
                                    <input
                                        type="time"
                                        value={configBackup.horario}
                                        onChange={(e) => setConfigBackup({
                                            ...configBackup,
                                            horario: e.target.value
                                        })}
                                        disabled={!editando || configBackup.tipo === "manual"}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Destino</label>
                                    <select
                                        value={configBackup.destino}
                                        onChange={(e) => setConfigBackup({
                                            ...configBackup,
                                            destino: e.target.value as "local" | "nuvem" | "ambos"
                                        })}
                                        disabled={!editando}
                                        style={styles.select}
                                    >
                                        <option value="local">Local</option>
                                        <option value="nuvem">Nuvem</option>
                                        <option value="ambos">Ambos</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Reter backups por</label>
                                    <input
                                        type="number"
                                        value={configBackup.reter}
                                        onChange={(e) => setConfigBackup({
                                            ...configBackup,
                                            reter: parseInt(e.target.value)
                                        })}
                                        disabled={!editando}
                                        style={styles.input}
                                    />
                                    <span style={styles.helperText}>dias</span>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Último Backup</label>
                                    <input
                                        type="text"
                                        value={configBackup.ultimoBackup ? new Date(configBackup.ultimoBackup).toLocaleString() : "Nunca"}
                                        disabled
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <div style={styles.infoBox}>
                                <FaInfoCircle />
                                <div>
                                    <strong>Informações de Backup</strong>
                                    <p>Os backups incluem todos os dados da plataforma: usuários, cursos, materiais, QR Codes e configurações.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Aba Modo de Implantação */}
                    {activeTab === "implantacao" && modoImplantacao && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Modo de Implantação</h3>

                            <div style={styles.modoGrid}>
                                {["centralizado", "descentralizado", "hibrido"].map((modo) => (
                                    <div
                                        key={modo}
                                        onClick={() => editando && setModoImplantacao({
                                            ...modoImplantacao,
                                            nome: modo as any
                                        })}
                                        style={{
                                            ...styles.modoCard,
                                            borderColor: modoImplantacao.nome === modo ? "var(--primary)" : "var(--border-color)",
                                            background: modoImplantacao.nome === modo ? "var(--primary-light)" : "var(--card-bg)"
                                        }}
                                    >
                                        <div style={styles.modoHeader}>
                                            <h4>
                                                {modo === "centralizado" && <FaServer />}
                                                {modo === "descentralizado" && <FaGlobe />}
                                                {modo === "hibrido" && <FaNetworkWired />}
                                                {modo === "centralizado" && "Centralizado"}
                                                {modo === "descentralizado" && "Descentralizado"}
                                                {modo === "hibrido" && "Híbrido"}
                                            </h4>
                                            {modoImplantacao.nome === modo && (
                                                <FaCheckCircle style={{ color: "var(--success)" }} />
                                            )}
                                        </div>
                                        <p style={styles.modoDescricao}>
                                            {modo === "centralizado" && "Todos os dados em servidor central. Requer conexão constante."}
                                            {modo === "descentralizado" && "Dados distribuídos entre campi. Sincronização periódica."}
                                            {modo === "hibrido" && "Funciona online/offline com sincronização automática."}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={styles.configCard}>
                                <h4>Configuração Atual</h4>
                                <div style={styles.configList}>
                                    <div style={styles.configItem}>
                                        <strong>Servidor Central:</strong>
                                        <span>{modoImplantacao.configuracao.servidorCentral}</span>
                                    </div>
                                    <div style={styles.configItem}>
                                        <strong>Replicação:</strong>
                                        <span>{modoImplantacao.configuracao.replicacao}</span>
                                    </div>
                                    <div style={styles.configItem}>
                                        <strong>Cache Local:</strong>
                                        <span>{modoImplantacao.configuracao.cacheLocal ? "Ativado" : "Desativado"}</span>
                                    </div>
                                    <div style={styles.configItem}>
                                        <strong>Modo Offline:</strong>
                                        <span>{modoImplantacao.configuracao.offlineCapable ? "Suportado" : "Não suportado"}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.infoBox}>
                                <FaInfoCircle />
                                <div>
                                    <strong>Vantagens do modo {modoImplantacao.nome}</strong>
                                    <ul style={styles.list}>
                                        {modoImplantacao.vantagens.map((vantagem, idx) => (
                                            <li key={idx}>{vantagem}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </DashboardLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        animation: "fadeIn 0.5s ease-out",
        maxWidth: "1200px",
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
    buttonSpinner: {
        animation: "spin 1s linear infinite",
        fontSize: "16px"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px"
    },
    title: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "600",
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    subtitle: {
        margin: "4px 0 0",
        fontSize: "14px",
        color: "var(--text-tertiary)"
    },
    editButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid var(--primary)",
        background: "transparent",
        color: "var(--primary)",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    headerActions: {
        display: "flex",
        gap: "12px"
    },
    cancelButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-primary)",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    saveButton: {
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
    tabsContainer: {
        display: "flex",
        gap: "4px",
        borderBottom: "1px solid var(--border-color)",
        marginBottom: "24px"
    },
    tabButton: {
        padding: "12px 20px",
        background: "none",
        border: "none",
        borderBottom: "3px solid transparent",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    tabContent: {
        minHeight: "500px"
    },
    section: {
        background: "var(--card-bg)",
        borderRadius: "12px",
        padding: "24px",
        border: "1px solid var(--border-color)"
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "16px"
    },
    sectionTitle: {
        margin: "0 0 20px",
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)"
    },
    sectionActions: {
        display: "flex",
        gap: "12px"
    },
    formGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },
    label: {
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--text-primary)"
    },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px"
    },
    select: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        background: "var(--input-bg)",
        color: "var(--text-primary)",
        fontSize: "14px"
    },
    helperText: {
        fontSize: "12px",
        color: "var(--text-tertiary)",
        marginTop: "4px"
    },
    infoBox: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        background: "var(--info-light)",
        borderRadius: "8px",
        border: "1px solid var(--info)",
        marginTop: "20px"
    },
    primaryButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        background: "var(--primary)",
        color: "#fff",
        fontSize: "13px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    secondaryButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-primary)",
        fontSize: "13px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    warningButton: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid var(--warning)",
        background: "transparent",
        color: "var(--warning)",
        fontSize: "13px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    campiGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px"
    },
    campusCard: {
        background: "var(--bg-tertiary)",
        borderRadius: "12px",
        padding: "16px",
        border: "1px solid var(--border-color)"
    },
    campusHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
    },
    campusTipoBadge: {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600"
    },
    campusInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "12px",
        fontSize: "13px"
    },
    campusFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "12px",
        borderTop: "1px solid var(--border-color)"
    },
    sincronizacaoInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "var(--text-tertiary)"
    },
    campusActions: {
        display: "flex",
        gap: "8px"
    },
    iconButton: {
        width: "32px",
        height: "32px",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        background: "transparent",
        color: "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    progressContainer: {
        marginBottom: "20px"
    },
    progressBar: {
        width: "100%",
        height: "8px",
        background: "var(--border-color)",
        borderRadius: "4px",
        overflow: "hidden",
        marginBottom: "8px"
    },
    progressFill: {
        height: "100%",
        background: "var(--success)",
        transition: "width 0.3s ease"
    },
    modoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        marginBottom: "24px"
    },
    modoCard: {
        padding: "20px",
        borderRadius: "12px",
        border: "2px solid",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    modoHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
    },
    modoDescricao: {
        fontSize: "13px",
        color: "var(--text-secondary)",
        margin: 0
    },
    configCard: {
        background: "var(--bg-tertiary)",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px"
    },
    configList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "16px"
    },
    configItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid var(--border-color)"
    },
    list: {
        margin: "8px 0 0",
        paddingLeft: "20px"
    }
};