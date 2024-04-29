"use client"

import React from "react";
import {useRouter} from "next/navigation";

interface LogginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LogginButton = (
    {
        children,
        mode = "redirect",
        asChild
    }: LogginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    }

    if (mode === "modal") {
        return (
            <span>
                TODO: Implementar modal
            </span>
        );
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
