"use client"

import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {newVerification} from "@/actions/new-verification";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";


export const NewVerificationForm = () => {

    const[error, setError] = useState<string | undefined>();
    const[success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback( () => {
        if (success || error) return;

        if (!token) {
            setError("Token no encontrado!");
            return;
        }

        newVerification(token).
            then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Ha ocurrido un error!!");
            });
        }, [token, success, error]);

        useEffect(() => {
            onSubmit();
        }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Esperando la confirmación de correo electrónico"
            backButtonLabel="Volver a Log In"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader color="#2563EB" />
                )}
                <FormSuccess message={success} />
                {!success &&(
                    <FormError message={error} />
                )}

            </div>
        </CardWrapper>
    );
}

export default NewVerificationForm;