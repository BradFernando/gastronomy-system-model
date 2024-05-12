"use server";

import * as z from "zod";
import {db} from "@/lib/db";
import {AuthError} from "next-auth";
import {LoginSchema} from "@/schemas";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {signIn} from "@/auth";
import {getUserByEmail} from "@/data/user";
import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";
import {generateVerificationToken, generateTwoFactorToken} from "@/lib/tokens";
import {sendVerificationEmail, sendTwoFactorTokenEmail} from "@/lib/nodemail";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";


export const login = async (values: z.infer<typeof LoginSchema> ) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return {error : "Credenciales inválidas 🙄"};
    }

    const {email, password, code} = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "El email proporcionado no existe! 🙄"};
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return {success: "Email de confirmación enviado! 🎉"};
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (!code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );

            if (!twoFactorToken) {
                return {error: "Código no válido."};
            }

            if (twoFactorToken.token !== code) {
                return {error: "Código no válido."};
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return {error: "El código ha expirado 😅"};
            }

            await db.twoFactorToken.delete({
                where: {id: twoFactorToken.id}
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {id: existingConfirmation.id}
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });
        }else {
            const twoFactorToken = await generateTwoFactorToken(
                existingUser.email
            );

            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            );

            return {twoFactor: true};
        }
    }

    try {
        await signIn ("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });

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