import { apiClient } from "../api/axios-config";
import type { AuthResponse, UserResponse } from "../types/auth.types";
import type { EditUserPayload } from "../types/user.types";



const getUser = async () => {
    try {
        const res = await apiClient.get<UserResponse>(`/auth/me`)
        return res.data
    }
    catch (err) { throw err; }
}

const editUser = async (payload: EditUserPayload): Promise<AuthResponse> => {

    try {
        const res = await apiClient.put<AuthResponse>(`/auth/edit-user`, payload)
        return res.data
    }
    catch (err) { throw err; }
};

const deleteAccount = async () => {
    try {
        const res = await apiClient.delete<AuthResponse>(`/auth/delete`)
        return res.data
    }
    catch (err) { throw err; }
};

export { getUser, editUser, deleteAccount };