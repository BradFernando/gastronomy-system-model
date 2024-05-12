"use server";

import * as z from "zod";
import {RegisterSchema} from "@/schemas";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/nodemail";

export const register = async (values: z.infer<typeof RegisterSchema> ) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return {error : "Verifica que los campos sean correctos 🧐"};
    }

    const {email, password, name} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "Ese correo ya está registrado en nuestro sistema 🤔"};
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    return {success: "Registro enviado! Verifica tu Correo 🥳"};

};