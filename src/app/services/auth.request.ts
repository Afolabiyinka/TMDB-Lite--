import { apiClient } from "../api/axios-config";
import type { AuthResponse } from "../types/auth.types";

const googleLogin = async (payload: { credential?: string }) => {
    try {
        const res = await apiClient.post<AuthResponse>("/auth/google-login", payload)
        return res.data
    }
    catch (err) { throw err; }

}

export { googleLogin };
