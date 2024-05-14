"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {RoleGate} from "@/components/auth/role-gate";
import {FormSuccess} from "@/components/form-success";
import {UserRole} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {admin} from "@/actions/admin";

const AdminPage =  () => {

    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }
                if (data.success) {
                    toast.success(data.success);
                }
        })
    }


    const onApiRouteClick = () => {
        fetch("/api/admin")
            .then((response) => {
                if (response.ok) {
                    toast.success("Ruta API permitida");
                } else {
                    toast.error("Ruta API prohibida");
                }
            })
    }


    return (
        <Card>
            <CardHeader>
                <p className="text-1xl font-semibold text-center">
                    🔑 Administrador
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess
                        message="Bienvenido, administrador"
                    />
                </RoleGate>
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-md
                ">
                    <p className="text-sm font-medium">
                        Ruta API solo para administradores
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Haga clic! para probar
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-md
                ">
                    <p className="text-sm font-medium">
                        Acción del servidor solo para administradores
                    </p>
                    <Button onClick={onServerActionClick}>
                        Haga clic! para probar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default AdminPage;