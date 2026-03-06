// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { RequireAuth } from "../auth/RequireAuth";

// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import Alunos from "../pages/Alunos";
// import AlunoForm from "../pages/AlunoForm";
// import Profissionais from "../pages/Profissionais";
// import ProfissionalForm from "../pages/ProfissionalForm";
// import Disciplinas from "../pages/Disciplinas";
// import DisciplinasForm from "../pages/DisciplinasForm";
// import PEI from "../pages/PEI";
// import FolhasDeRegistro from "../pages/FolhasDeRegistro";
// import Relatorios from "../pages/Relatorios";
// import Agenda from "../pages/Agenda";
// import Escolas from "../pages/Escolas";
// import EscolasForm from "../pages/EscolasForm";
// import Usuarios from "../pages/Usuarios";
// import UsuariosForm from "../pages/UsuariosForm";
// import FamiliasForm from "../pages/FamiliasForm";
// import Familias from "../pages/Familias";
// import Trumas from "../pages/Turmas";
// import TurmasForm from "../pages/TurmasForm";
// import Plataformas from "../pages/Plataformas";
// import Aulas from "../pages/Aulas";
// import AulasForm from "../pages/AulasForm";
// import Avaliacoes from "../pages/Avaliacoes";
// import AvaliacoesForm from "../pages/AvaliacoesForm";
// import Disponibilidade from "../pages/Disponibilidade";
// import DisponibilidadeForm from "../pages/DisponibilidadeForm";
// import LandingPage from "../pages/LandingPage";

// export default function AppRoutes() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 {/* <Route path="/" element={<LandingPage />} /> */}
//                 {/* <Route path="/login" element={<Login />} /> */}
//                 <Route
//                     path="/dashboard"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR", "PROFISSIONAL"]}>
//                             <Dashboard />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/plataformas"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Plataformas />
//                         </RequireAuth>
//                     }
//                 />
//                 {/* <Route
//                     path="/plataformas/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <PlataformasForm />
//                         </RequireAuth>
//                     }
//                 /> */}
//                 <Route
//                     path="/usuarios"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Usuarios />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/usuarios/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <UsuariosForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/usuarios/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <UsuariosForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/escolas"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Escolas />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/escolas/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <EscolasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/escolas/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <EscolasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/alunos"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR", "PROFISSIONAL"]}>
//                             <Alunos />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/alunos/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <AlunoForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/alunos/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <AlunoForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/alunos/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <AlunoForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/familias"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Familias />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/familias/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <FamiliasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/familias/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <FamiliasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/agenda"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR", "PROFISSIONAL"]}>
//                             <Agenda />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/profissionais"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Profissionais />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/profissionais/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <ProfissionalForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/profissionais/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <ProfissionalForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/turmas"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Trumas />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/turmas/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <TurmasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/turmas/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <TurmasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/disciplina"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Disciplinas />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/disciplinas/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <DisciplinasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/disciplinas/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <DisciplinasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/aulas"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Aulas />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/aulas/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <AulasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/aulas/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <AulasForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/avaliacoes"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Avaliacoes />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/avaliacoes/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <AvaliacoesForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/avaliacoes/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <AvaliacoesForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/disponibilidade"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Disponibilidade />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/disponibilidade/novo"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <DisponibilidadeForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/disponibilidade/:id/editar"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <DisponibilidadeForm />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/pei"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR", "PROFISSIONAL", "FAMILIA"]}>
//                             <PEI />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/folhas-registro"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR", "PROFISSIONAL"]}>
//                             <FolhasDeRegistro />
//                         </RequireAuth>
//                     }
//                 />
//                 <Route
//                     path="/relatorios"
//                     element={
//                         <RequireAuth allowedRoles={["GESTOR"]}>
//                             <Relatorios />
//                         </RequireAuth>
//                     }
//                 />
//                 {/* 🚫 404 */}
//                 <Route path="*" element={<h1>Página não encontrada</h1>} />

//             </Routes>
//         </BrowserRouter>
//     );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Cursos from "../pages/Cursos";
import CursoForm from "../pages/CursoForm";
import Profissionais from "../pages/Profissionais";
import ProfissionalForm from "../pages/ProfissionalForm";
import MateriaisDidaticos from "../pages/MateriaisDidaticos";
import MateriaisForm from "../pages/MateriaisForm";
import Agenda from "../pages/Agenda";
import Termos from "../pages/GerenciarTermos";
import EscolasForm from "../pages/CadastrarTermo";
import Usuarios from "../pages/Usuarios";
import UsuariosForm from "../pages/UsuariosForm";
import FamiliasForm from "../pages/FamiliasForm";
import Familias from "../pages/AprovarRecusarTermos";
import Trumas from "../pages/Turmas";
import TurmasForm from "../pages/TurmasForm";
import Plataformas from "../pages/Plataformas";
import GerarQRCode from "../pages/GerarQRCode";
import AulasForm from "../pages/AulasForm";
import Categorias from "../pages/Categorias";
import AvaliacoesForm from "../pages/AvaliacoesForm";
import Disponibilidade from "../pages/Disponibilidade";
import DisponibilidadeForm from "../pages/DisponibilidadeForm";
import Notificacoes from "../pages/Notificacoes";
import LandingPage from "../pages/LandingPage";
import CursoView from "../pages/CursoView";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
                    path="/plataformas"
                    element={<Plataformas />}
                />
                {/* <Route
                    path="/plataformas/novo"
                    element={<PlataformasForm />}
                /> */}
                <Route
                    path="/usuarios"
                    element={<Usuarios />}
                />
                <Route
                    path="/usuarios/novo"
                    element={<UsuariosForm />}
                />
                <Route
                    path="/usuarios/:id/editar"
                    element={<UsuariosForm />}
                />
                <Route
                    path="/termos"
                    element={<Termos />}
                />
                <Route
                    path="/termos/novo"
                    element={<EscolasForm />}
                />
                <Route
                    path="/termos/:id/editar"
                    element={<EscolasForm />}
                />
                <Route
                    path="/curso"
                    element={<Cursos />}
                />
                <Route
                    path="/curso/novo"
                    element={<CursoForm />}
                />
                <Route
                    path="/curso/:id/editar"
                    element={<CursoForm />}
                />
                <Route
                    path="/curso/:id"
                    element={<CursoView />}
                />
                <Route
                    path="/aprovarRecusar"
                    element={<Familias />}
                />
                <Route
                    path="/familias/novo"
                    element={<FamiliasForm />}
                />
                <Route
                    path="/familias/:id/editar"
                    element={<FamiliasForm />}
                />
                <Route
                    path="/agenda"
                    element={<Agenda />}
                />
                <Route
                    path="/profissionais"
                    element={<Profissionais />}
                />
                <Route
                    path="/profissionais/novo"
                    element={<ProfissionalForm />}
                />
                <Route
                    path="/profissionais/:id/editar"
                    element={<ProfissionalForm />}
                />
                <Route
                    path="/turmas"
                    element={<Trumas />}
                />
                <Route
                    path="/turmas/novo"
                    element={<TurmasForm />}
                />
                <Route
                    path="/turmas/:id/editar"
                    element={<TurmasForm />}
                />
                <Route
                    path="/materiais-didaticos"
                    element={<MateriaisDidaticos />}
                />
                <Route
                    path="/materiais/novo"
                    element={<MateriaisForm />}
                />
                <Route
                    path="/materiais/:id/editar"
                    element={<MateriaisForm />}
                />
                <Route
                    path="/gerar-qr"
                    element={<GerarQRCode />}
                />
                <Route
                    path="/aulas/novo"
                    element={<AulasForm />}
                />
                <Route
                    path="/aulas/:id/editar"
                    element={<AulasForm />}
                />
                <Route
                    path="/categorias"
                    element={<Categorias />}
                />
                <Route
                    path="/categorias/novo"
                    element={<AvaliacoesForm />}
                />
                <Route
                    path="/categorias/:id/editar"
                    element={<AvaliacoesForm />}
                />
                <Route
                    path="/disponibilidade"
                    element={<Disponibilidade />}
                />
                <Route
                    path="/disponibilidade/novo"
                    element={<DisponibilidadeForm />}
                />
                <Route
                    path="/disponibilidade/:id/editar"
                    element={<DisponibilidadeForm />}
                />
                <Route
                    path="/notificacoes"
                    element={<Notificacoes />}
                />
                {/* 🚫 404 */}
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </BrowserRouter>
    );
}