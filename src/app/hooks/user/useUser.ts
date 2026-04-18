import { getUser } from "@/app/services/userRequests";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    //Fetching the user details
    const { data: user, isLoading: userLoading, error: userError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: "always",
    });


    return {
        fetchedUser: user?.user,
        userLoading,
        userError
    }


}