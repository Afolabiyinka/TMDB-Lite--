
import { prodEndpoint, } from "../constants/api-data";
import type { AuthResponse, LoginPayload, SignupPayload } from "../types/auth";

const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await fetch(`${prodEndpoint}api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
    const res = await fetch(`${prodEndpoint}api/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
        const message = data?.message || "Login failed";
        throw new Error(message);
    }

    return data;
};

export { login, signup };
