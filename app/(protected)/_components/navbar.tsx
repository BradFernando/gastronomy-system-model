"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { HomeIcon, PersonIcon, ClipboardIcon, TokensIcon } from "@radix-ui/react-icons";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
          <Link href="/server">
            <div className="flex flex-col items-center">
              <HomeIcon className="sm:hidden" />
              <span className="sm:block hidden">Servidor</span>
            </div>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
          <Link href="/client">
            <div className="flex flex-col items-center">
              <ClipboardIcon className="sm:hidden" />
              <span className="sm:block hidden">Cliente</span>
            </div>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">
            <div className="flex flex-col items-center">
              <PersonIcon className="sm:hidden" />
              <span className="sm:block hidden">Administrador</span>
            </div>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
          <Link href="/settings">
            <div className="flex flex-col items-center">
              <TokensIcon className="sm:hidden" />
              <span className="sm:block hidden">Ajustes</span>
            </div>
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};