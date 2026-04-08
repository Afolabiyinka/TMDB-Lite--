import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/app/services/authRequest";
import type { SignupPayload } from "@/app/types/auth";
import useToastMessage from "@/app/libs/useToastMsg";
import { queryClient } from "@/main";

export const useSignup = () => {
    const [signupData, setSignUpData] = React.useState<SignupPayload>({
        email: "",
        password: "",
        username: "",
        confirmedPassword: "",
    });

    const navigate = useNavigate();
    const { toastError, toastLoading, toastSuccess } = useToastMessage()

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SignupPayload) => signup(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toastSuccess(data.message);
            navigate("/");
        },
        onError: (err) => {
            toastError(err.message);
        },
        onMutate: () => {
            toastLoading("Creating account...")
        }
    });

    function handleSignup() {
        mutate(signupData);
    }

    return {
        signupData,
        setSignUpData,
        handleSignup,
        loading: isPending,
    };
};
