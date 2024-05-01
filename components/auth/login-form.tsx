"use client";

import * as z from "zod";
import {useState, useTransition} from "react";
import {useSearchParams} from "next/navigation";
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
import {login} from "@/actions/login";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email en uso, prueba un proveedor diferente."
        : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error)
                    // TODO: Haremos uso cuando se implemente 2FA
                    setSuccess(data?.success)
            });
        });
    };

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
                    className="space-y-5"
                >
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel> Correo electrónico </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
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
                                            disabled={isPending}
                                            type="password"
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button
                        disabled={isPending}
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