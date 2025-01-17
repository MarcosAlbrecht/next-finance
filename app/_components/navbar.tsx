"use client";

import { UserButton } from "@clerk/nextjs";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-solid px-4 py-3 md:px-8">
      {/* CONTAINER PRINCIPAL */}
      <div className="flex items-center justify-between">
        {/* LOGO E LINKS (DESKTOP) */}
        <div className="flex items-center gap-8">
          {/* LOGO */}
          <Image src="/logo.svg" width={120} height={30} alt="Finance AI" />

          {/* LINKS - VISÍVEIS NO DESKTOP */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className={
                pathname === "/transactions"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Transações
            </Link>
            <Link
              href="/subscription"
              className={
                pathname === "/subscription"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Assinatura
            </Link>
          </div>
        </div>

        {/* BOTÃO DO USUÁRIO E MENU MOBILE */}
        <div className="flex items-center gap-4">
          {/* MENU MOBILE - ÍCONE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center md:hidden"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <XIcon className="h-6 w-6 text-primary" />
            ) : (
              <MenuIcon className="h-6 w-6 text-primary" />
            )}
          </button>

          {/* BOTÃO DO USUÁRIO (DESKTOP) */}
          <div className="hidden md:flex">
            <UserButton showName />
          </div>
        </div>
      </div>

      {/* MENU MOBILE - LISTA */}
      {menuOpen && (
        <div className="mb-4 mt-4 rounded-xl bg-slate-700 p-4 md:hidden">
          {/* LINKS MOBILE */}
          <div className="flex flex-col items-start gap-4 p-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={
                pathname === "/"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/transactions"
              onClick={() => setMenuOpen(false)}
              className={
                pathname === "/transactions"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Transações
            </Link>
            <Link
              href="/subscription"
              onClick={() => setMenuOpen(false)}
              className={
                pathname === "/subscription"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              Assinatura
            </Link>
          </div>

          {/* SEPARADOR */}
          <hr className="my-4 border-gray-200" />

          {/* BOTÃO DO USUÁRIO MOBILE */}
          <div className="px-4">
            <UserButton showName />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
