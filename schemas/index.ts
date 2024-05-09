import * as z from "zod"
import {UserRole} from "@prisma/client";

export const SettingsSchema = z.object({
   name: z.optional(z.string()),
   isTwoFactorEnabled: z.optional(z.boolean()),
   role: z.enum([UserRole.ADMIN, UserRole.USER]),
   email: z.optional(z.string().email() ),
   password: z.optional(z.string().min(6)),
   newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
      return !(data.password && !data.newPassword);


    }, {
        message: "Se requiere una nueva contraseña",
        path: ["newPassword"],
    })
    .refine((data) => {
        return !(data.newPassword && !data.password);

    }, {
        message: "Contraseña Requerida",
        path: ["password"],
    });

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Se requiere mas de 6 caracteres.",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico es requerido.",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico es requerido.",
    }),
    password: z.string().min(1, {
        message: "La contraseña es requerida.",
    }),
    code: z.optional(z.string()),
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