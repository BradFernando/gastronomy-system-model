"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField, FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import {LoginSchema} from "@/schemas";
import {Input} from "@/components/ui/input";

import {CardWrapper} from "@/components/auth/card-wrapper";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values);
    }

    return (
        <CardWrapper
            headerLabel="Bienvenido! Inicia sesión para continuar."
            backButtonLabel="No tienes cuenta? Regístrate aquí."
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel> Correo electrónico </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="alguien@ejemplo.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel> Contraseña </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message=""/>
                    <FormSuccess message=""/>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Iniciar Sesión
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}