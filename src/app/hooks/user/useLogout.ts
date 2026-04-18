import { prodEndpoint } from "@/app/constants/api-data";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/main";

export const useLogout = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const res = await fetch(`${prodEndpoint}api/auth/logout`, {
                credentials: "include",
                method: "POST",
            });

            const data = await res.json();

            if (res.ok) {
                queryClient.setQueryData(["user"], null);

                queryClient.invalidateQueries({ queryKey: ["user"] });
                queryClient.invalidateQueries({ queryKey: ["favourites"] });

                navigate("/");
            }

            return data;
        } catch (err) {
            console.error(err);
            throw new Error("Logout failed");
        }
    }

    return { handleLogout };
};