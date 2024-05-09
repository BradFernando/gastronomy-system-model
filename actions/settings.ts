"use server"

import * as z from "zod"

import {db} from "@/lib/db";
import {SettingsSchema} from "@/schemas";
import {getUserById} from "@/data/user";
import {currentUser} from "@/lib/auth";

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

    await db.user.update({
        where: { id: user.id },
        data: {
            ... values
        }
    });

    return { success: "Configuración actualizada correctamente"}
}
