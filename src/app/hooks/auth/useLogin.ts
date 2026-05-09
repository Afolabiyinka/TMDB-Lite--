import React from "react";
import type { LoginPayload } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useToastMessage from "@/app/libs/useToastMsg";
import { login } from "@/app/services/authRequest";
import { queryClient } from "@/main";


export const useLogin = () => {
  const [loginData, setLoginData] = React.useState<LoginPayload>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const { toastError, toastLoading, toastSuccess } = useToastMessage()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toastSuccess(data.message);
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate("/");
      }
    },
    onError: (error: any) => {
      toastError(error.message);
    },
    onMutate: () => {
      toastLoading("Signing in")
    }
  });

  function handleLogin() {
    mutate(loginData);
  }
  return {
    handleLogin,
    loading: isPending,
    setLoginData,
    loginData,
  };
};
