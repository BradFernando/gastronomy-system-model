"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import {NewPasswordSchema} from "@/schemas";
import {getPasswordResetByToken} from "@/data/password-reset-token";
import {getUserByEmail} from "@/data/user";
import {db} from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema> ,
    token?: string | null,
) => {
    if (!token) {
        return {error: "Token no encontrado"};
    }

    const validateFields = NewPasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Error en los campos"};
    }

    const {password} = validateFields.data;

    const existingToken = await getPasswordResetByToken(token);

    if (!existingToken) {
        return {error: "Token no válido"};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {error: "El Token ha expirado!!"};
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {error: "El email no existe"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: { password: hashedPassword},
    });

    await db.passwordResetToken.delete({
        where: {id: existingToken.id},
    });

    return {success: "Contraseña actualizada correctamente"};
}