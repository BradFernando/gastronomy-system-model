"use server"

import * as z from "zod"

import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import {SettingsSchema} from "@/schemas";
import {getUserByEmail, getUserById} from "@/data/user";
import {currentUser} from "@/lib/auth";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/nodemail";
import {unstable_update} from "@/auth";

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "No autorizado" }
    }

    if (!user.id) {
        return { error: "ID de usuario no definido" }
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "No autorizado" }
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "El email ya está en uso" }
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Se ha enviado un email de verificación" }
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        );

        if (!passwordMatch) {
            return { error: "La contraseña actual no coincide" }
        }

        values.password = await bcrypt.hash(
            values.newPassword,
            10
        );
        values.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
            ... values
        }
    });

    await unstable_update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
            role: updatedUser.role
        }
    })

    return { success: "Configuración actualizada correctamente"}
}