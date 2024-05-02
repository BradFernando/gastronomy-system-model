import {db} from "@/lib/db";

export const getPasswordResetByToken = async (token: string) => {
    try {
        return await db.passwordResetToken.findUnique({
            where: {token},
        });
    } catch {
        return null;
    }
}

export const getPasswordResetByEmail = async (email: string) => {
    try {
        return await db.passwordResetToken.findFirst({
            where: {email},
        });
    } catch {
        return null;
    }
}