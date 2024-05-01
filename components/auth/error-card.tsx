import {CardWrapper} from "@/components/auth/card-wrapper";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Ooops! Algo salió mal 😭"
            backButtonHref="/auth/login"
            backButtonLabel="Volver a Login"
        >
            <div className="w-full flex justify-center items-center text-red-600">
            <ExclamationTriangleIcon className="text-destructive size-10" />
            </div>
        </CardWrapper>
    );
}