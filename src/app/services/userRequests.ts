import { prodEndpoint } from "../constants/api-data";
import type { EditUserPayload } from "../types/User";

const getUser = async () => {
    try {
        const res = await fetch(`${prodEndpoint}api/auth/me`, {
            credentials: "include",
        });

        if (!res.ok) return null;

        return await res.json();
    } catch {
        return null;
    }
};

const editUser = async (payload: EditUserPayload) => {
    try {
        const res = await fetch(`${prodEndpoint}api/auth/edit-user`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error("Failed to update user");
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update user");
    }
};

const deleteAccount = async () => {
    try {
        const res = await fetch(`${prodEndpoint}api/auth/delete`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to delete Account");
        }

        return await res.json();
    } catch (err) {
        throw new Error("Failed to delete Account");
    }
};

export { getUser, editUser, deleteAccount };