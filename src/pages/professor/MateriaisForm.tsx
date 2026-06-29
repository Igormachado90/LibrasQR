import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import Input from "../../components/Form/Input";
import Section from "../../components/Form/Section";
import Select from "../../components/Form/Select";
import supabase from "../../lib/supabase";
import { useTheme } from "../../components/contexts/ThemeContext";
import {
    FaBook,
    FaVideo,
    FaFilePdf,
    FaFileImage,
    FaFilePowerpoint,
    FaFileWord,
    FaFileAlt,
    FaLink,
    FaTag,
    FaGraduationCap,
    FaBookOpen,
    FaSignLanguage,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaArrowLeft,
    FaSave,
    FaEdit,
    FaPlus,
    FaSpinner,
    FaTrash,
    FaSearch,
    FaChevronDown,
    FaChevronUp,
    FaEye,
    FaCloudUploadAlt,
    FaFileUpload,
    FaFileArchive,
    FaFileAudio,
    FaFileVideo
} from "react-icons/fa";

/* =======================
   TIPAGENS
======================= */

interface MaterialFormData {
    Titulo: string;
    Descricao: string;
    Tipo: string;
    Conteudo: string;
    Status: string;
    Arquivo_URL: string;
    Arquivo_Nome: string;
    Arquivo_Tamanho: number;
    Tags: string[];
}

interface ValidationError {
    campo: string;
    mensagem: string;
}

interface Curso {
    Curso_ID: number;
    Nome: string;
    Nivel?: string;
}

interface Disciplina {
    Disciplina_ID: number;
    Nome: string;
    Carga_Horaria?: number;
}

interface TermoGlossario {
    Termo_ID: number;
    Termo: string;
    Categoria: string;
    Definicao?: string;
    Video_Libras?: boolean;
}

/* =======================
   COMPONENTE PRINCIPAL
======================= */

export default function MateriaisForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isEditing = !!id;

    // Estados para dados do banco
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [termosGlossario, setTermosGlossario] = useState<TermoGlossario[]>([]);

    // Estados de loading
    const [loading, setLoading] = useState(false);
    const [loadingCursos, setLoadingCursos] = useState(true);
    const [loadingDisciplinas, setLoadingDisciplinas] = useState(false);
    const [loadingTermos, setLoadingTermos] = useState(true);
    const [saving, setSaving] = useState(false);

    // Estados de upload
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadType, setUploadType] = useState<'material' | 'video'>('material');

    // Estados de formulário
    const [formData, setFormData] = useState<MaterialFormData>({
        Titulo: '',
        Descricao: '',
        Tipo: 'pdf',
        Conteudo: '',
        Status: 'rascunho',
        Arquivo_URL: '',
        Arquivo_Nome: '',
        Arquivo_Tamanho: 0,
        Tags: []
    });

    const [selectedCursoId, setSelectedCursoId] = useState<string>('');
    const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string>('');
    const [selectedTermos, setSelectedTermos] = useState<string[]>([]);
    const [temVideoLibras, setTemVideoLibras] = useState(false);
    const [videoLibrasFile, setVideoLibrasFile] = useState<File | null>(null);
    const [videoLibrasUrl, setVideoLibrasUrl] = useState<string>('');
    const [arquivoMaterial, setArquivoMaterial] = useState<File | null>(null);
    const [tagInput, setTagInput] = useState('');

    // Estados de UI
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [termosSearchTerm, setTermosSearchTerm] = useState('');
    const [expandSection, setExpandSection] = useState({
        basicos: true,
        arquivo: true,
        libras: true,
        tags: true,
        termos: true
    });

    // Opções para selects
    const tiposOptions = [
        { value: 'pdf', label: 'PDF', icon: <FaFilePdf />, desc: 'Documento em formato PDF' },
        { value: 'video', label: 'Vídeo', icon: <FaVideo />, desc: 'Arquivo de vídeo' },
        { value: 'imagem', label: 'Imagem', icon: <FaFileImage />, desc: 'Imagem ou ilustração' },
        { value: 'livro', label: 'Livro', icon: <FaBookOpen />, desc: 'Livro digital ou e-book' },
    ];

    const statusOptions = [
        { value: 'rascunho', label: 'Rascunho', icon: <FaEdit /> },
        { value: 'publicado', label: 'Publicado', icon: <FaCheckCircle /> },
        { value: 'arquivado', label: 'Arquivado', icon: <FaFileArchive /> }
    ];

    /* =======================
       EFEITOS
    ======================= */

    useEffect(() => {
        fetchCursos();
        fetchTermosGlossario();
        if (isEditing) fetchMaterial();
    }, [id]);

    useEffect(() => {
        if (selectedCursoId) {
            fetchDisciplinas(selectedCursoId);
        }
    }, [selectedCursoId]);

    /* =======================
       FUNÇÕES DE BUSCA
    ======================= */

    async function fetchCursos() {
        try {
            setLoadingCursos(true);
            const { data, error } = await supabase
                .from("Cursos")
                .select("Curso_ID, Nome, Nivel")
                .eq("Status", "Ativo")
                .order("Nome");

            if (error) throw error;
            setCursos(data || []);
        } catch (err) {
            console.error("Erro ao buscar cursos:", err);
            toast.error("Erro ao carregar cursos");
        } finally {
            setLoadingCursos(false);
        }
    }

    async function fetchDisciplinas(cursoId: string) {
        try {
            setLoadingDisciplinas(true);
            setSelectedDisciplinaId('');

            const { data, error } = await supabase
                .from("Disciplinas")
                .select("Disciplina_ID, Nome, Carga_Horaria")
                .eq("Curso_ID", cursoId)
                .eq("Status", "Ativo")
                .order("Nome");

            if (error) throw error;
            setDisciplinas(data || []);
        } catch (err) {
            console.error("Erro ao buscar disciplinas:", err);
            toast.error("Erro ao carregar disciplinas");
        } finally {
            setLoadingDisciplinas(false);
        }
    }

    async function fetchTermosGlossario() {
        try {
            setLoadingTermos(true);
            const { data, error } = await supabase
                .from("TermosGlossario")
                .select("Termo_ID, Termo, Categoria, Definicao, Video_Libras")
                .eq("Status", "Ativo")
                .order("Termo");

            if (error) throw error;
            setTermosGlossario(data || []);
        } catch (err) {
            console.error("Erro ao buscar termos:", err);
        } finally {
            setLoadingTermos(false);
        }
    }

    async function fetchMaterial() {
        if (!id) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("MateriaisDidaticos")
                .select(`
                    *,
                    MateriaisTermos (
                        Termo_ID
                    )
                `)
                .eq("Material_ID", id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    Titulo: data.Titulo || "",
                    Descricao: data.Descricao || "",
                    Tipo: data.Tipo || "pdf",
                    Conteudo: data.Conteudo || "",
                    Status: data.Status || "rascunho",
                    Arquivo_URL: data.Arquivo_URL || "",
                    Arquivo_Nome: data.Arquivo_Nome || "",
                    Arquivo_Tamanho: data.Arquivo_Tamanho || 0,
                    Tags: data.Tags || []
                });

                setSelectedCursoId(data.Curso_ID?.toString() || '');
                setSelectedDisciplinaId(data.Disciplina_ID?.toString() || '');
                setTemVideoLibras(data.Tem_Video_Libras || false);
                setVideoLibrasUrl(data.Video_Libras_URL || '');

                if (data.MateriaisTermos) {
                    setSelectedTermos(data.MateriaisTermos.map((t: any) => t.Termo_ID.toString()));
                }
            }
        } catch (err) {
            console.error("Erro ao carregar material:", err);
            toast.error("Erro ao carregar material");
        } finally {
            setLoading(false);
        }
    }

    /* =======================
       HANDLERS DE FORMULÁRIO
    ======================= */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => prev.filter(e => e.campo !== name));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error("Arquivo muito grande. Tamanho máximo: 100MB");
            return;
        }

        let validTypes: string[] = [];
        switch (formData.Tipo) {
            case 'pdf':
                validTypes = ['application/pdf'];
                break;
            case 'video':
                validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
                break;
            case 'livro':
                validTypes = ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook'];
                break;
            default:
                validTypes = ['*/*'];
        }

        if (!validTypes.includes(file.type) && validTypes[0] !== '*/*') {
            toast.error(`Tipo de arquivo inválido. Formatos aceitos: ${validTypes.join(', ')}`);
            return;
        }

        setArquivoMaterial(file);
        setFormData(prev => ({
            ...prev,
            Arquivo_Nome: file.name,
            Arquivo_Tamanho: file.size
        }));
    };

    const handleVideoLibrasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 200 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error("Vídeo muito grande. Tamanho máximo: 200MB");
            return;
        }

        const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
        if (!validTypes.includes(file.type)) {
            toast.error("Formato de vídeo inválido. Use MP4, WebM ou MOV");
            return;
        }

        setVideoLibrasFile(file);
    };

    const handleAddTag = () => {
        if (!tagInput.trim()) return;

        if (formData.Tags.length >= 10) {
            toast.error("Máximo de 10 tags por material");
            return;
        }

        const newTag = tagInput.trim().toLowerCase();
        if (!formData.Tags.includes(newTag)) {
            setFormData(prev => ({
                ...prev,
                Tags: [...prev.Tags, newTag]
            }));
            toast.success(`Tag "${newTag}" adicionada`);
        } else {
            toast.error("Tag já existe");
        }
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            Tags: prev.Tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput) {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleTermoSelect = (termoId: string) => {
        setSelectedTermos(prev => {
            if (prev.includes(termoId)) {
                return prev.filter(id => id !== termoId);
            } else {
                if (prev.length >= 20) {
                    toast.error("Máximo de 20 termos por material");
                    return prev;
                }
                return [...prev, termoId];
            }
        });
    };

    const handleSelectAllTermos = () => {
        if (filteredTermos.length === 0) return;

        if (selectedTermos.length === filteredTermos.length) {
            setSelectedTermos([]);
        } else {
            setSelectedTermos(filteredTermos.map(t => t.Termo_ID.toString()));
        }
    };

    /* =======================
       FUNÇÕES DE UPLOAD
    ======================= */

    const uploadFile = async (file: File, bucket: string, path: string): Promise<string | null> => {
        try {
            setUploading(true);
            setUploadProgress(0);

            const fileExt = file.name.split('.').pop();
            const fileName = `${path}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 300);

            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            clearInterval(progressInterval);

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(data.path);

            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 1000);

            return publicUrl;
        } catch (err) {
            console.error("Erro no upload:", err);
            toast.error("Erro ao fazer upload do arquivo");
            return null;
        } finally {
            setUploading(false);
        }
    };

    /* =======================
       VALIDAÇÃO
    ======================= */

    const validateForm = (): boolean => {
        const newErrors: ValidationError[] = [];

        if (!formData.Titulo.trim()) {
            newErrors.push({ campo: 'Titulo', mensagem: 'O título do material é obrigatório' });
        } else if (formData.Titulo.length < 3) {
            newErrors.push({ campo: 'Titulo', mensagem: 'O título deve ter pelo menos 3 caracteres' });
        } else if (formData.Titulo.length > 200) {
            newErrors.push({ campo: 'Titulo', mensagem: 'O título deve ter no máximo 200 caracteres' });
        }

        if (!selectedCursoId) {
            newErrors.push({ campo: 'Curso', mensagem: 'Selecione um curso' });
        }

        if (!selectedDisciplinaId) {
            newErrors.push({ campo: 'Disciplina', mensagem: 'Selecione uma disciplina' });
        }

        if (formData.Tipo !== 'link' && !arquivoMaterial && !formData.Arquivo_URL) {
            newErrors.push({ campo: 'Arquivo', mensagem: 'Adicione um arquivo para o material' });
        }

        if (formData.Tipo === 'link' && !formData.Conteudo.trim()) {
            newErrors.push({ campo: 'Link', mensagem: 'Adicione a URL do link' });
        }

        if (formData.Tipo === 'link') {
            const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            if (!urlRegex.test(formData.Conteudo)) {
                newErrors.push({ campo: 'Link', mensagem: 'URL inválida' });
            }
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const getErrorMessage = (campo: string) => {
        return errors.find(e => e.campo === campo)?.mensagem;
    };

    /* =======================
       SUBMIT
    ======================= */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Por favor, corrija os erros no formulário');
            return;
        }

        setSaving(true);

        try {
            let arquivoUrl = formData.Arquivo_URL;
            let videoLibrasUploadUrl = videoLibrasUrl;

            if (arquivoMaterial) {
                setUploadType('material');
                const url = await uploadFile(
                    arquivoMaterial,
                    'materiais',
                    `cursos/${selectedCursoId}/disciplinas/${selectedDisciplinaId}`
                );
                if (!url) throw new Error("Falha no upload do arquivo");
                arquivoUrl = url;
            }

            if (videoLibrasFile) {
                setUploadType('video');
                const url = await uploadFile(
                    videoLibrasFile,
                    'videos-libras',
                    `materiais/${Date.now()}`
                );
                if (!url) throw new Error("Falha no upload do vídeo");
                videoLibrasUploadUrl = url;
            }

            const payload = {
                Titulo: formData.Titulo,
                Descricao: formData.Descricao,
                Tipo: formData.Tipo,
                Conteudo: formData.Conteudo,
                Status: formData.Status,
                Arquivo_URL: arquivoUrl,
                Arquivo_Nome: formData.Arquivo_Nome,
                Arquivo_Tamanho: formData.Arquivo_Tamanho,
                Tags: formData.Tags,
                Curso_ID: Number(selectedCursoId),
                Disciplina_ID: Number(selectedDisciplinaId),
                Tem_Video_Libras: temVideoLibras,
                Video_Libras_URL: videoLibrasUploadUrl || null,
                Data_Atualizacao: new Date().toISOString()
            };

            let materialId;

            if (isEditing) {
                const { error } = await supabase
                    .from("MateriaisDidaticos")
                    .update(payload)
                    .eq("Material_ID", id);

                if (error) throw error;
                materialId = id;
                toast.success('✅ Material atualizado com sucesso!');
            } else {
                const { data, error } = await supabase
                    .from("MateriaisDidaticos")
                    .insert({
                        ...payload,
                        Data_Criacao: new Date().toISOString()
                    })
                    .select('Material_ID')
                    .single();

                if (error) throw error;
                materialId = data.Material_ID;
                toast.success('✅ Material criado com sucesso!');
            }

            if (materialId) {
                await supabase
                    .from("MateriaisTermos")
                    .delete()
                    .eq("Material_ID", materialId);

                if (selectedTermos.length > 0) {
                    const termosAssociacoes = selectedTermos.map(termoId => ({
                        Material_ID: materialId,
                        Termo_ID: termoId
                    }));

                    const { error: termosError } = await supabase
                        .from("MateriaisTermos")
                        .insert(termosAssociacoes);

                    if (termosError) throw termosError;
                }
            }

            navigate('/materiais');
        } catch (err: any) {
            console.error("Erro detalhado:", err);

            if (err.code === '23505') {
                toast.error("Já existe um material com este título neste curso");
            } else {
                toast.error('Erro ao salvar material: ' + (err.message || 'Erro desconhecido'));
            }
        } finally {
            setSaving(false);
        }
    };

    // Filtros
    const filteredTermos = termosGlossario.filter(termo =>
        termo.Termo.toLowerCase().includes(termosSearchTerm.toLowerCase()) ||
        termo.Categoria.toLowerCase().includes(termosSearchTerm.toLowerCase())
    );

    /* =======================
       ESTILOS
    ======================= */

    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            animation: 'fadeIn 0.5s ease-out'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        },
        title: {
            margin: 0,
            fontSize: '28px',
            fontWeight: '700',
            color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        subtitle: {
            margin: '4px 0 0',
            fontSize: '14px',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
        },
        form: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: theme === 'dark'
                ? '0 10px 30px rgba(0,0,0,0.3)'
                : '0 10px 30px rgba(0,0,0,0.05)',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
        },
        sectionHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '12px 16px',
            borderRadius: '8px',
            background: theme === 'dark' ? '#374151' : '#f9fafb',
            marginBottom: '16px'
        },
        sectionTitle: {
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        fileUploadArea: {
            border: `2px dashed ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center' as const,
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: theme === 'dark' ? '#374151' : '#f9fafb'
        },
        fileInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: theme === 'dark' ? '#1f2937' : '#f3f4f6',
            borderRadius: '8px',
            marginTop: '12px'
        },
        progressBar: {
            width: '100%',
            height: '4px',
            background: theme === 'dark' ? '#4b5563' : '#e5e7eb',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '8px'
        },
        progressFill: {
            height: '100%',
            background: 'linear-gradient(90deg, #4F46E5, #818CF8)',
            transition: 'width 0.3s ease'
        },
        tagContainer: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '8px',
            marginTop: '12px'
        },
        tag: {
            padding: '6px 12px',
            background: theme === 'dark' ? '#374151' : '#EEF2FF',
            color: theme === 'dark' ? '#e5e7eb' : '#4F46E5',
            borderRadius: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`
        },
        tagRemove: {
            background: 'none',
            border: 'none',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            cursor: 'pointer',
            padding: '0 4px',
            fontSize: '14px'
        },
        termosGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '8px',
            maxHeight: '400px',
            overflowY: 'auto' as const,
            padding: '12px',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
            background: theme === 'dark' ? '#1f2937' : '#ffffff'
        },
        termoItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: `1px solid transparent`,
            background: (termoId: string) => selectedTermos.includes(termoId)
                ? theme === 'dark' ? '#374151' : '#EEF2FF'
                : 'transparent'
        },
        termoInfo: {
            flex: 1
        },
        termoNome: {
            fontSize: '13px',
            fontWeight: '500',
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937'
        },
        termoCategoria: {
            fontSize: '11px',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
        },
        videoLibrasBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 6px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'rgb(16, 185, 129)',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '600',
            marginLeft: '4px'
        },
        actionsContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
        },
        cancelButton: {
            padding: '12px 24px',
            borderRadius: '8px',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#e5e7eb' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        submitButton: {
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        errorText: {
            fontSize: '12px',
            color: '#ef4444',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        },
        badge: {
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '600',
            background: theme === 'dark' ? '#374151' : '#f3f4f6',
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937'
        }
    };

    /* =======================
       RENDER
    ======================= */

    if (loading && isEditing) {
        return (
            <DashboardLayout>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh'
                }}>
                    <FaSpinner style={{
                        width: '50px',
                        height: '50px',
                        animation: 'spin 1s linear infinite',
                        color: 'var(--primary)'
                    }} />
                    <p style={{
                        marginTop: '16px',
                        color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                    }}>
                        Carregando...
                    </p>
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
                            {isEditing ? 'Editar Material Didático' : 'Novo Material Didático'}
                        </h1>
                        <p style={styles.subtitle}>
                            {isEditing
                                ? "Atualize as informações do material abaixo."
                                : "Preencha o formulário para adicionar um novo material didático."}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* DADOS BÁSICOS */}
                    <div
                        style={styles.sectionHeader}
                        onClick={() => setExpandSection({ ...expandSection, basicos: !expandSection.basicos })}
                    >
                        <div style={styles.sectionTitle}>
                            <FaBook color="var(--primary)" />
                            Dados Básicos
                        </div>
                        {expandSection.basicos ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    {expandSection.basicos && (
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '16px',
                                marginBottom: '16px'
                            }}>
                                <Select
                                    label="Curso *"
                                    name="Curso_ID"
                                    value={selectedCursoId}
                                    onChange={(e) => setSelectedCursoId(e.target.value)}
                                    error={getErrorMessage('Curso')}
                                    required
                                >
                                    <option value="">Selecione um curso</option>
                                    {cursos.map(curso => (
                                        <option key={curso.Curso_ID} value={curso.Curso_ID}>
                                            {curso.Nome} {curso.Nivel ? `(${curso.Nivel})` : ''}
                                        </option>
                                    ))}
                                </Select>

                                <Select
                                    label="Disciplina *"
                                    name="Disciplina_ID"
                                    value={selectedDisciplinaId}
                                    onChange={(e) => setSelectedDisciplinaId(e.target.value)}
                                    disabled={!selectedCursoId || loadingDisciplinas}
                                    error={getErrorMessage('Disciplina')}
                                    required
                                >
                                    <option value="">
                                        {loadingDisciplinas ? 'Carregando...' : 'Selecione uma disciplina'}
                                    </option>
                                    {disciplinas.map(disciplina => (
                                        <option key={disciplina.Disciplina_ID} value={disciplina.Disciplina_ID}>
                                            {disciplina.Nome} {disciplina.Carga_Horaria ? `(${disciplina.Carga_Horaria}h)` : ''}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <Input
                                    label="Título do Material *"
                                    name="Titulo"
                                    value={formData.Titulo}
                                    onChange={handleChange}
                                    error={getErrorMessage('Titulo')}
                                    placeholder="Ex: Introdução à Lógica de Programação"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    color: theme === 'dark' ? '#e5e7eb' : '#374151',
                                    fontWeight: '500'
                                }}>
                                    Descrição
                                </label>
                                <textarea
                                    name="Descricao"
                                    value={formData.Descricao}
                                    onChange={handleChange}
                                    placeholder="Descreva o conteúdo, objetivos e público-alvo do material"
                                    rows={4}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border: `1px solid ${theme === 'dark' ? '#4b5563' : '#D1D5DB'}`,
                                        background: theme === 'dark' ? '#374151' : '#fff',
                                        color: theme === 'dark' ? '#e5e7eb' : '#333',
                                        fontSize: "14px",
                                        fontFamily: "inherit",
                                        resize: "vertical",
                                        boxSizing: "border-box"
                                    }}
                                />
                                <p style={{
                                    fontSize: '12px',
                                    color: theme === 'dark' ? '#9ca3af' : '#666',
                                    marginTop: '4px'
                                }}>
                                    {formData.Descricao.length} caracteres
                                </p>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '16px'
                            }}>
                                <Select
                                    label="Tipo de Material *"
                                    name="Tipo"
                                    value={formData.Tipo}
                                    onChange={handleChange}
                                    required
                                >
                                    {tiposOptions.map(tipo => (
                                        <option key={tipo.value} value={tipo.value}>
                                            {tipo.label}
                                        </option>
                                    ))}
                                </Select>

                                <Select
                                    label="Status"
                                    name="Status"
                                    value={formData.Status}
                                    onChange={handleChange}
                                >
                                    {statusOptions.map(status => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* ARQUIVO DO MATERIAL */}
                    <div
                        style={styles.sectionHeader}
                        onClick={() => setExpandSection({ ...expandSection, arquivo: !expandSection.arquivo })}
                    >
                        <div style={styles.sectionTitle}>
                            <FaCloudUploadAlt color="var(--info)" />
                            Arquivo do Material
                        </div>
                        {expandSection.arquivo ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    {expandSection.arquivo && (
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                color: theme === 'dark' ? '#e5e7eb' : '#374151',
                                fontWeight: '500'
                            }}>
                                {formData.Tipo === 'link' ? 'URL do Link *' : 'Arquivo *'}
                            </label>

                            {formData.Tipo === 'link' ? (
                                <Input
                                    label=""
                                    name="Conteudo"
                                    value={formData.Conteudo}
                                    onChange={handleChange}
                                    placeholder="https://exemplo.com/material"
                                    error={getErrorMessage('Link')}
                                    required
                                />
                            ) : (
                                <>
                                    <div
                                        style={styles.fileUploadArea}
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4F46E5'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4b5563' : '#d1d5db'}
                                    >
                                        <FaFileUpload size={32} color={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                                        <p style={{ margin: '8px 0', color: theme === 'dark' ? '#e5e7eb' : '#374151' }}>
                                            Clique para selecionar ou arraste o arquivo
                                        </p>
                                        <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                            Tamanho máximo: 100MB
                                        </p>
                                    </div>

                                    <input
                                        id="file-upload"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept={
                                            formData.Tipo === 'pdf' ? '.pdf' :
                                                formData.Tipo === 'video' ? 'video/*' :
                                                    formData.Tipo === 'imagem' ? 'image/*' :
                                                        formData.Tipo === 'apresentacao' ? '.ppt,.pptx,.key' :
                                                            formData.Tipo === 'documento' ? '.doc,.docx,.txt' :
                                                                formData.Tipo === 'audio' ? 'audio/*' :
                                                                    formData.Tipo === 'livro' ? '.pdf,.epub,.mobi' :
                                                                        '*/*'
                                        }
                                        style={{ display: 'none' }}
                                    />

                                    {formData.Arquivo_Nome && (
                                        <div style={styles.fileInfo}>
                                            <FaFileAlt size={24} color="var(--primary)" />
                                            <div style={{ flex: 1 }}>
                                                <strong style={{ color: theme === 'dark' ? '#e5e7eb' : '#1f2937' }}>
                                                    {formData.Arquivo_Nome}
                                                </strong>
                                                <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                    {(formData.Arquivo_Tamanho / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setArquivoMaterial(null);
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        Arquivo_Nome: '',
                                                        Arquivo_Tamanho: 0
                                                    }));
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#ef4444',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )}

                                    {uploading && uploadType === 'material' && (
                                        <div>
                                            <div style={styles.progressBar}>
                                                <div style={{ ...styles.progressFill, width: `${uploadProgress}%` }} />
                                            </div>
                                            <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#666', marginTop: '4px' }}>
                                                Enviando: {uploadProgress}%
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}

                            {getErrorMessage('Arquivo') && (
                                <div style={styles.errorText}>
                                    <FaExclamationTriangle />
                                    {getErrorMessage('Arquivo')}
                                </div>
                            )}
                        </div>
                    )}

                    {/* VÍDEO EM LIBRAS */}
                    <div
                        style={styles.sectionHeader}
                        onClick={() => setExpandSection({ ...expandSection, libras: !expandSection.libras })}
                    >
                        <div style={styles.sectionTitle}>
                            <FaSignLanguage color="var(--success)" />
                            Acessibilidade em Libras
                        </div>
                        {expandSection.libras ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    {expandSection.libras && (
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '12px',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '6px',
                                background: theme === 'dark' ? '#374151' : '#f9fafb'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={temVideoLibras}
                                    onChange={(e) => setTemVideoLibras(e.target.checked)}
                                />
                                <span style={{ fontSize: '14px', color: theme === 'dark' ? '#e5e7eb' : '#374151' }}>
                                    Este material possui vídeo em Libras
                                </span>
                            </label>

                            {temVideoLibras && (
                                <div style={{
                                    marginTop: '12px',
                                    padding: '16px',
                                    background: theme === 'dark' ? '#1f2937' : '#F9FAFB',
                                    borderRadius: '8px',
                                    border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
                                }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        color: theme === 'dark' ? '#e5e7eb' : '#374151',
                                        fontWeight: '500'
                                    }}>
                                        Upload do Vídeo em Libras
                                    </label>

                                    <input
                                        type="file"
                                        onChange={handleVideoLibrasChange}
                                        accept="video/*"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: `1px dashed ${theme === 'dark' ? '#4b5563' : '#D1D5DB'}`,
                                            borderRadius: '8px',
                                            background: theme === 'dark' ? '#374151' : '#fff',
                                            color: theme === 'dark' ? '#e5e7eb' : '#333'
                                        }}
                                    />

                                    <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#666', marginTop: '4px' }}>
                                        Formatos aceitos: MP4, WebM, MOV (máx. 200MB)
                                    </p>

                                    {videoLibrasFile && (
                                        <div style={styles.fileInfo}>
                                            <FaVideo size={20} color="var(--success)" />
                                            <span style={{ color: theme === 'dark' ? '#e5e7eb' : '#1f2937' }}>
                                                {videoLibrasFile.name}
                                            </span>
                                        </div>
                                    )}

                                    {videoLibrasUrl && !videoLibrasFile && (
                                        <div style={styles.fileInfo}>
                                            <FaCheckCircle color="var(--success)" />
                                            <span style={{ color: theme === 'dark' ? '#e5e7eb' : '#1f2937' }}>
                                                Vídeo já enviado
                                            </span>
                                        </div>
                                    )}

                                    {uploading && uploadType === 'video' && (
                                        <div>
                                            <div style={styles.progressBar}>
                                                <div style={{ ...styles.progressFill, width: `${uploadProgress}%` }} />
                                            </div>
                                            <p style={{ fontSize: '12px', color: theme === 'dark' ? '#9ca3af' : '#666', marginTop: '4px' }}>
                                                Enviando vídeo: {uploadProgress}%
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAGS */}
                    <div
                        style={styles.sectionHeader}
                        onClick={() => setExpandSection({ ...expandSection, tags: !expandSection.tags })}
                    >
                        <div style={styles.sectionTitle}>
                            <FaTag color="var(--warning)" />
                            Tags
                        </div>
                        {expandSection.tags ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    {expandSection.tags && (
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                marginBottom: '12px'
                            }}>
                                <Input
                                    label=""
                                    name="tagInput"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Digite uma tag e pressione Enter"
                                    style={{ flex: 1 }}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    style={{
                                        padding: '0 16px',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        height: '42px',
                                        alignSelf: 'flex-end',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    <FaPlus /> Adicionar
                                </button>
                            </div>

                            <div style={styles.tagContainer}>
                                {formData.Tags.map(tag => (
                                    <span key={tag} style={styles.tag}>
                                        #{tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            style={styles.tagRemove}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                {formData.Tags.length === 0 && (
                                    <p style={{ color: theme === 'dark' ? '#9ca3af' : '#666', fontSize: '12px' }}>
                                        Nenhuma tag adicionada
                                    </p>
                                )}
                            </div>

                            <p style={{
                                fontSize: '12px',
                                color: theme === 'dark' ? '#9ca3af' : '#666',
                                marginTop: '8px'
                            }}>
                                <FaInfoCircle /> {formData.Tags.length}/10 tags. Use tags para facilitar a busca.
                            </p>
                        </div>
                    )}

                    {/* TERMOS DO GLOSSÁRIO */}
                    <div
                        style={styles.sectionHeader}
                        onClick={() => setExpandSection({ ...expandSection, termos: !expandSection.termos })}
                    >
                        <div style={styles.sectionTitle}>
                            <FaBookOpen color="var(--purple)" />
                            Termos do Glossário
                        </div>
                        {expandSection.termos ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    {expandSection.termos && (
                        <div style={{ marginBottom: '24px' }}>
                            <p style={{
                                fontSize: '14px',
                                color: theme === 'dark' ? '#e5e7eb' : '#374151',
                                marginBottom: '12px'
                            }}>
                                Selecione os termos do glossário que aparecem neste material:
                            </p>

                            {/* Barra de busca */}
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                marginBottom: '12px'
                            }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <FaSearch style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Buscar termos..."
                                        value={termosSearchTerm}
                                        onChange={(e) => setTermosSearchTerm(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 10px 10px 36px',
                                            borderRadius: '6px',
                                            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
                                            background: theme === 'dark' ? '#374151' : '#fff',
                                            color: theme === 'dark' ? '#e5e7eb' : '#333',
                                            fontSize: '13px'
                                        }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSelectAllTermos}
                                    style={{
                                        padding: '0 16px',
                                        background: theme === 'dark' ? '#374151' : '#f3f4f6',
                                        border: `1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        color: theme === 'dark' ? '#e5e7eb' : '#374151',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {selectedTermos.length === filteredTermos.length ? 'Desmarcar todos' : 'Selecionar todos'}
                                </button>
                            </div>

                            {/* Lista de termos */}
                            {loadingTermos ? (
                                <div style={{ textAlign: 'center', padding: '40px' }}>
                                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                                    <p>Carregando termos...</p>
                                </div>
                            ) : (
                                <div style={styles.termosGrid}>
                                    {filteredTermos.map(termo => (
                                        <div
                                            key={termo.Termo_ID}
                                            style={{
                                                ...styles.termoItem(termo.Termo_ID.toString()),
                                                borderColor: selectedTermos.includes(termo.Termo_ID.toString())
                                                    ? 'var(--primary)'
                                                    : 'transparent'
                                            }}
                                            onClick={() => handleTermoSelect(termo.Termo_ID.toString())}
                                            onMouseEnter={(e) => {
                                                if (!selectedTermos.includes(termo.Termo_ID.toString())) {
                                                    e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#f9fafb';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!selectedTermos.includes(termo.Termo_ID.toString())) {
                                                    e.currentTarget.style.background = 'transparent';
                                                }
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedTermos.includes(termo.Termo_ID.toString())}
                                                onChange={() => { }}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <div style={styles.termoInfo}>
                                                <div style={styles.termoNome}>
                                                    {termo.Termo}
                                                    {termo.Video_Libras && (
                                                        <span style={styles.videoLibrasBadge}>
                                                            <FaVideo size={8} /> LIBRAS
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={styles.termoCategoria}>
                                                    {termo.Categoria}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {filteredTermos.length === 0 && (
                                        <div style={{
                                            gridColumn: '1 / -1',
                                            textAlign: 'center',
                                            padding: '40px',
                                            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                                        }}>
                                            <FaBookOpen size={32} />
                                            <p>Nenhum termo encontrado</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '12px'
                            }}>
                                <p style={{
                                    fontSize: '12px',
                                    color: theme === 'dark' ? '#9ca3af' : '#666'
                                }}>
                                    <FaInfoCircle /> {selectedTermos.length} termos selecionados (máx. 20)
                                </p>
                                <span style={styles.badge}>
                                    Total: {termosGlossario.length} termos
                                </span>
                            </div>
                        </div>
                    )}

                    {/* AÇÕES */}
                    <div style={styles.actionsContainer}>
                        <button
                            type="button"
                            onClick={() => navigate('/materiais-didaticos')}
                            style={styles.cancelButton}
                            disabled={saving || uploading}
                            onMouseEnter={(e) => !saving && !uploading && (e.currentTarget.style.background = theme === 'dark' ? '#4b5563' : '#f9fafb')}
                            onMouseLeave={(e) => !saving && !uploading && (e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#ffffff')}
                        >
                            <FaTimesCircle /> Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{
                                ...styles.submitButton,
                                opacity: (saving || uploading) ? 0.7 : 1,
                                cursor: (saving || uploading) ? 'not-allowed' : 'pointer'
                            }}
                            disabled={saving || uploading}
                            onMouseEnter={(e) => !saving && !uploading && (e.currentTarget.style.background = 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)')}
                            onMouseLeave={(e) => !saving && !uploading && (e.currentTarget.style.background = 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)')}
                        >
                            {saving || uploading ? (
                                <>
                                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                                    {uploading ? 'Enviando arquivo...' : 'Salvando...'}
                                </>
                            ) : (
                                isEditing ? <><FaSave /> Atualizar Material</> : <><FaCheckCircle /> Salvar Material</>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                input, select, textarea {
                    background-color: ${theme === 'dark' ? '#374151' : '#ffffff'} !important;
                    color: ${theme === 'dark' ? '#e5e7eb' : '#1f2937'} !important;
                    border-color: ${theme === 'dark' ? '#4b5563' : '#d1d5db'} !important;
                }

                input:focus, select:focus, textarea:focus {
                    border-color: #4F46E5 !important;
                    box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(79, 70, 229, 0.3)' : 'rgba(79, 70, 229, 0.1)'} !important;
                }

                input::placeholder, textarea::placeholder {
                    color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'} !important;
                }

                select option {
                    background-color: ${theme === 'dark' ? '#1f2937' : '#ffffff'};
                    color: ${theme === 'dark' ? '#e5e7eb' : '#1f2937'};
                }

                button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: ${theme === 'dark' ? '#374151' : '#f1f1f1'};
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: ${theme === 'dark' ? '#4b5563' : '#888'};
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: ${theme === 'dark' ? '#6b7280' : '#666'};
                }
            `}</style>
        </DashboardLayout>
    );
}