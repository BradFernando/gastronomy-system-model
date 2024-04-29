"use server";

import * as z from "zod";
import {RegisterSchema} from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema> ) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return {error : "Verifica que los campos sean correctos 🧐"};
    }

    return {success: "Registro enviado! Verifica tu Correo 🥳"};

};