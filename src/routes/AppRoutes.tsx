import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { RequireAuth } from "../auth/RequireAuth";
import { ROLES } from "../auth/roles";

// Paginas Comuns
import Login from "../pages/auth/Login";
import LandingPage from "../pages/auth/LandingPage";
import AcessoNegado from "../pages/AcessoNegado";

// Layout
import AdminLayout from "../layouts/AdminLayout";
import ProfessorLayout from "../layouts/ProfessorLayout";
import InterpreteLayout from "../layouts/InterpreteLayout";
import AlunoLayout from "../layouts/AlunoLayout";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import AdminNeologismos from "../pages/interprete/Neologismos";
import GerenciarUsuarios from "../pages/admin/usuarios/Usuarios";
import UsuariosForm from "../pages/admin/usuarios/UsuariosForm";
import GerenciarEscolas from "../pages/admin/escolas/GerenciarEscolas";
import GerenciarDisciplinas from "../pages/admin/disciplinas/GerenciarDisciplinas";
import GerenciarTermos from "../pages/admin/termos/GerenciarTermos";
import TermoForm from "../pages/admin/termos/TermoForm";
import AprovarRecusarTermos from "../pages/admin/termos/AprovarRecusarTermos";

import Profissionais from "../pages/admin/profissionais/Profissionais";
import ProfissionalForm from "../pages/admin/profissionais/ProfissionalForm";
import Plataformas from "../pages/admin/plataformas/Plataformas";
import AdminConfiguracoes from "../pages/admin/Configuracoes";

// Professor
import ProfessorDashboard from "../pages/admin/Dashboard";
import CursosProfessor from "../pages/professor/Cursos";
import CursoForm from "../pages/professor/CursoForm";
import CursoView from "../pages/professor/CursoView";
import Turmas from "../pages/professor/Turmas";
import TurmasForm from "../pages/professor/TurmasForm";
import MateriaisDidaticos from "../pages/professor/MateriaisDidaticos";
import MateriaisForm from "../pages/professor/MateriaisForm";
import AulasForm from "../pages/professor/AulasForm";
import AvaliacoesForm from "../pages/professor/AvaliacoesForm";

// Aluno
import AlunoDashboard from "../pages/admin/Dashboard";
import AlunoCursos from "../pages/aluno/Cursos";
import AlunoMateriais from "../pages/aluno/MateriaisDidaticos";

// Intérprete
import InterpreteDashboard from "../pages/admin/Dashboard";
import InterpreteGerarQR from "../pages/interprete/GerarQRCode";
import InterpreteNeologismos from "../pages/interprete/Neologismos";
import InterpreteVideos from "../pages/interprete/GerenciarVideos";
// import Disponibilidade from "../pages/interprete/Disponibilidade";
// import DisponibilidadeForm from "../pages/interprete/DisponibilidadeForm";

// Outros
import Categorias from "../pages/Categorias";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export default function AppRoutes() {
    const { user, getUserDashboardRoute } = useAuth();

    return (
        <Routes>
            {/* Públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/acesso-negado" element={<AcessoNegado />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Rotas do Admin */}
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/neologismos" element={<AdminNeologismos />} />
                    <Route path="/admin/usuarios" element={<GerenciarUsuarios />} />
                    <Route path="/admin/usuarios/novo" element={<UsuariosForm />} />
                    <Route path="/admin/usuarios/:id/editar" element={<UsuariosForm />} />
                    <Route path="/admin/escolas" element={<GerenciarEscolas />} />
                    <Route path="/admin/disciplinas" element={<GerenciarDisciplinas />} />
                    <Route path="/admin/termos" element={<GerenciarTermos />} />
                    <Route path="/admin/termos/novo" element={<TermoForm />} />
                    <Route path="/admin/termos/:id/editar" element={<TermoForm />} />
                    <Route path="/admin/aprovar-recusar" element={<AprovarRecusarTermos />} />
                    <Route path="/admin/configuracoes" element={<AdminConfiguracoes />} />
                    {/* <Route path="/admin/materiais-didaticos" element={<ProfessorMateriais />} /> */}
                </Route>
            </Route>

            {/* Rotas do Professor */}
            <Route element={<RequireAuth allowedRoles={[ROLES.PROFESSOR]} />}>
                <Route element={<ProfessorLayout />}>
                    <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
                    <Route path="/professor/cursos" element={<CursosProfessor />} />
                    <Route path="/professor/cursos/novo" element={<CursoForm />} />
                    <Route path="/professor/cursos/:id" element={<CursoView />} />
                    <Route path="/professor/cursos/:id/editar" element={<CursoForm />} />
                    {/* <Route path="/professor/materiais-didaticos" element={<ProfessorMateriais />} /> */}
                    <Route path="/professor/materiais/novo" element={<MateriaisForm />} />
                    <Route path="/professor/materiais/:id/editar" element={<MateriaisForm />} />
                    {/* <Route path="/professor/turmas" element={<ProfessorTurmas />} /> */}
                    <Route path="/professor/turmas/novo" element={<TurmasForm />} />
                    <Route path="/professor/turmas/:id/editar" element={<TurmasForm />} />
                    <Route path="/professor/aulas/novo" element={<AulasForm />} />
                    <Route path="/professor/aulas/:id/editar" element={<AulasForm />} />
                    {/* <Route path="/professor/categorias" element={<ProfessorCategorias />} /> */}
                    <Route path="/professor/termos" element={<GerenciarTermos />} />
                </Route>
            </Route>

            {/* Rotas do Intérprete */}
            <Route element={<RequireAuth allowedRoles={[ROLES.INTERPRETE]} />}>
                <Route element={<InterpreteLayout />}>
                    <Route path="/interprete/dashboard" element={<InterpreteDashboard />} />
                    <Route path="/interprete/neologismos" element={<InterpreteNeologismos />} />
                    <Route path="/interprete/gerar-qr" element={<InterpreteGerarQR />} />
                    <Route path="/interprete/videos" element={<InterpreteVideos />} />
                    <Route path="/interprete/termos" element={<GerenciarTermos />} />
                </Route>
            </Route>

            {/* Rotas do Aluno */}
            <Route element={<RequireAuth allowedRoles={[ROLES.ALUNO]} />}>
                <Route element={<AlunoLayout />}>
                    <Route path="/aluno/dashboard" element={<AlunoDashboard />} />
                    <Route path="/aluno/cursos" element={<AlunoCursos />} />
                    <Route path="/aluno/materiais-didaticos" element={<AlunoMateriais />} />
                    <Route path="/aluno/termos" element={<GerenciarTermos />} />
                </Route>
            </Route>

            {/* 🔥 ÚNICO GRUPO DE ROTAS PROTEGIDAS */}
                {/* ADMIN */}
                {/* <Route path="/admin/profissionais" element={<Profissionais />} />
                <Route path="/admin/profissionais/novo" element={<ProfissionalForm />} />
                <Route path="/admin/profissionais/:id/editar" element={<ProfissionalForm />} />
                <Route path="/admin/plataformas" element={<Plataformas />} /> */}


                {/* GESTOR */}
                {/* <Route path="/gestor/dashboard" element={<DashboardPage />} /> */}

                {/* PROFESSOR */}
                {/* <Route path="/professor/avaliacoes/novo" element={<AvaliacoesForm />} />
                <Route path="/professor/avaliacoes/:id/editar" element={<AvaliacoesForm />} /> */}

                {/* INTÉRPRETE */}
                {/* <Route path="/interprete/dashboard" element={<DashboardPage />} /> */}
                {/* <Route path="/interprete/neologismos" element={<GerenciarNeologismos />} /> */}
                {/* <Route path="/interprete/termos" element={<GerenciarTermos />} /> */}
                {/* <Route path="/interprete/videos" element={<GerenciarVideos />} /> */}
                {/* <Route path="/interprete/gerar-qr" element={<GerarQRCode />} /> */}
                {/* <Route path="/gerar-qr" element={<GerarQRCode />} /> */}

                {/* ALUNO */}
            {/* </Route> */}

            {/* Redirecionamento para o dashboard correto */}
            <Route
                path="/dashboard"
                element={<Navigate to={user ? getUserDashboardRoute() : "/login"} replace />}
            />

            {/* 404 */}
            <Route
                path="*"
                element={
                    <div style={{
                        padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "center",
                        alignItems: "center", minHeight: "100vh", textAlign: "center"
                    }}>
                        <h1>404</h1>
                        <p>Página não encontrada.</p>
                    </div>
                }
            />
        </Routes>
    );
}

