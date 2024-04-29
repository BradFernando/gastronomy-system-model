import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico es requerido.",
    }),
    password: z.string().min(1, {
        message: "La contraseña es requerida.",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico es requerido.",
    }),
    password: z.string().min(6, {
        message: "Se requieren al menos 6 caractéres.",
    }),
    name: z.string().min(1, {
        message: "El nombre es requerido.",
    }),
    
});