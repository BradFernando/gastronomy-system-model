import {db} from "@/lib/db";

export const getVerificationByToken = async (
    token: string
) => {
    try {
        return await db.verificationToken.findUnique({
            where: {
                token: token
            }
        });
    } catch {
        return null;
    }
}


export const getVerificationTokenByEmail = async (
    email: string
    ) => {
        try {
            return await db.verificationToken.findFirst({
                where: {
                    token: email
                }
            });
        } catch {
            return null;
        }
    }