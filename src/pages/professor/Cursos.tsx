import { Link } from "react-router-dom";

export default function CursosProfessor() {
    return (
        <div style={{ padding: "24px" }}>
            <h1>Meus cursos</h1>
            <p>Esta é a área do profissional. Adicione aqui a lista de cursos e ações do professor.</p>
            <div style={{ marginTop: "20px" }}>
                <Link to="/professor/cursos/novo" style={{ color: "#2563eb" }}>
                    + Criar novo curso
                </Link>
            </div>
        </div>
    );
}
