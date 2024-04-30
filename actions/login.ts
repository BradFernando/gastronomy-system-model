"use server";

import * as z from "zod";
import {AuthError} from "next-auth";
import {LoginSchema} from "@/schemas";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {signIn} from "@/auth";


export const login = async (values: z.infer<typeof LoginSchema> ) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return {error : "Credenciales inválidas 🙄"};
    }

    const {email, password} = validateFields.data;

    try {
        await signIn ("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Credenciales inválidas 🙄"};
                default:
                    return {error: "Algo salió mal. Por favor, intenta de nuevo."};
            }
        }

        throw error;
    }

};