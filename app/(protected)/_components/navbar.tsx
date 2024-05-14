"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/auth/user-button";

export const Navbar = () => {

    const pathname = usePathname();

    return (
        <nav className="bg-secondary flex justify-between
        items-center p-2 sm:p-4 rounded-xl w-full shadow-sm">
            <div className="flex gap-1 sm:gap-x-2">
                <Button
                    asChild
                    variant={pathname === "/server" ? "default" : "outline" }
                    className="text-xs sm:text-base"
                >
                    <Link href="/server">
                        Servidor
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/client" ? "default" : "outline" }
                    className="text-xs sm:text-base"
                >
                    <Link href="/client">
                        Cliente
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/admin" ? "default" : "outline" }
                    className="text-xs sm:text-base"
                >
                    <Link href="/admin">
                        Administrador
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/settings" ? "default" : "outline" }
                    className="text-xs sm:text-base"
                >
                    <Link href="/settings">
                        Ajustes
                    </Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
}