import type { GoogleCredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useToastMessage from "@/app/libs/useToastMsg";
import { googleLogin } from "@/app/services/auth.request";
import { queryClient } from "@/main";

export const useGoogleLogin = () => {
   const { toastError, toastSuccess } = useToastMessage();
   const navigate = useNavigate();

   const { isPending, mutate } = useMutation({
      mutationFn: (payload: GoogleCredentialResponse) =>
         googleLogin({ credential: payload.credential }),

      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: ["user"],
         });
         toastSuccess(data.message);
         navigate("/");
      },

      onError: (err: any) => {
         toastError(err.message);
      },
   });

   function handleGoogleLogin(payload: GoogleCredentialResponse) {
      mutate(payload);
   }

   return { handleGoogleLogin, googleLoading: isPending };
};
