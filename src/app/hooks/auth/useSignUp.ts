import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { SignupPayload } from "../../types/auth";
import { signup } from "../../services/authRequest";
import { queryClient } from "../../../main";
import useToastMessage from "../../libs/useToastMsg";

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
