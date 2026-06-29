export type UserRole = "admin" | "professor" | "interprete" | "aluno";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: UserRole;
    school?: string;
    termsAccepted?: boolean;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    token: string;
    newPassword: string;
    confirmPassword: string;
}