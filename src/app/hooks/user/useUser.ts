import { getUser } from "@/app/services/user.request";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    const {
        data: user,
        isLoading: userLoading,
        error: userError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        refetchOnMount: "always",
        retry: false,
    });
    return {
        fetchedUser: user?.user,
        userLoading,
        userError,
    };
};
