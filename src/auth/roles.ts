import { type UserRole } from "./authTypes";

export const ROLES = {
  ADMIN: "admin",
  PROFESSOR: "professor",
  INTERPRETE: "interprete",
  ALUNO: "aluno"
} as const;

// Rotas específicas por role
export const ROLE_ROUTES: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  professor: "/professor/dashboard",
  interprete: "/interprete/dashboard",
  aluno: "/aluno/dashboard",
} as const;

// Mapeamento para interface (se precisar mostrar nomes amigáveis)
export const ROLE_NAMES: Record<UserRole, string> = {
  admin: "Administrador",
  professor: "Professor",
  interprete: "Intérprete",
  aluno: "Aluno",
} as const;


// Helper para verificar roles - CORRIGIDO
export const hasRole = (
  userRole: UserRole,
  allowedRoles: UserRole[]
): boolean => {
  return allowedRoles.includes(userRole);
};

export { type UserRole };

