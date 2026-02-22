"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/sobre-nos", label: "Sobre Nós" },
    { href: "/acoes", label: "Ações" },
    { href: "/transparencia", label: "Transparência" },
    { href: "/contato", label: "Contato" },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300",
            isScrolled ? "bg-primary shadow-md py-2" : "bg-transparent py-4 mx-auto"
        )}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={isScrolled ? "/images/logo.svg" : "/images/logo-white.svg"}
                        alt="D.F. Ação Social"
                        width={140}
                        height={46}
                        className="h-10 md:h-12 w-auto"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "font-bold text-sm uppercase tracking-wider transition-colors",
                                isScrolled ? "text-black hover:text-black/70" : "text-white hover:text-primary"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Button asChild className={cn(
                        "hidden sm:inline-flex font-bold uppercase tracking-tight",
                        isScrolled ? "bg-black text-white hover:bg-black/80" : "bg-primary text-black hover:bg-primary/90"
                    )}>
                        <Link href="/como-doar">DOE AGORA</Link>
                    </Button>

                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Menu</DrawerTitle>
                            </DrawerHeader>
                            <div className="flex flex-col gap-4 p-4 pb-8">
                                {navLinks.map((link) => (
                                    <DrawerClose key={link.href} asChild>
                                        <Link
                                            href={link.href}
                                            className="text-lg font-medium py-2 hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </DrawerClose>
                                ))}
                                <DrawerClose asChild>
                                    <Button asChild className="w-full bg-primary text-black font-bold mt-4">
                                        <Link href="/como-doar">DOE AGORA</Link>
                                    </Button>
                                </DrawerClose>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </header>
    )
}
