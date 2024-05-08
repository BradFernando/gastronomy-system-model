"use client";

import React from "react";
import {UserRole} from "@prisma/client";
import {useCurrentRole} from "@/hooks/use-current-role";
import {FormError} from "@/components/form-error";


interface  RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="No tienes permisos para acceder a esta página" />
        );
    }

    return (
        <>
            {children}
        </>
    );
};



