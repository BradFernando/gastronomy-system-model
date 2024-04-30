"use server";

import * as z from "zod";
import {RegisterSchema} from "@/schemas";
import {db} from "@/lib/db";
import bcrypt from "bcrypt";
import {getUserByEmail} from "@/data/user";

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

    //TODO: Enviar el token de verificación al correo del usuario

    return {success: "Registro enviado! Verifica tu Correo 🥳"};

};