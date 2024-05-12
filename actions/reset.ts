"use server"

import * as z from "zod";

import {ResetSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {sendPasswordResetEmail} from "@/lib/nodemail";
import {generatePasswordResetToken} from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error:  "El email no es válido!!."
        }
    }

    const {email} = validateFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "El email no funciona."
        }
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return {
        success: "Correo de reseteo enviado."
    }


}