export interface SignupPayload {
    username: string;
    email: string;
    password: string;
    confirmedPassword: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
}
