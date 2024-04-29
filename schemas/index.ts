import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico es requerido.",
    }),
    password: z.string().min(1, {
        message: "La contraseña es requerida.",
    }),
});