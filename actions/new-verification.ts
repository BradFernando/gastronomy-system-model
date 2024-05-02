"use server"

import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import {getVerificationByToken} from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationByToken(token);


    if (!existingToken){
        return {error: "El token proporcionado no es válido ❌"};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired){
        return {error: "El token ha expirado 🕘!!"};

    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser){
        return {error: "El email no existe 🚫"};
    }

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    });

    return {success: "Email verificado correctamente"};


};