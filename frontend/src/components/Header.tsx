"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react"
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
import { createClient } from "@/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/sobre-nos", label: "Sobre Nós" },
    { href: "/acoes", label: "Ações" },
    { href: "/transparencia", label: "Transparência" },
    { href: "/contato", label: "Contato" },
]

export default function Header() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()
    const router = useRouter()

    const isSolidHeader = isScrolled || pathname !== "/"

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)

        // Check for user session
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            subscription.unsubscribe()
        }
    }, [supabase.auth])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/")
        router.refresh()
    }

    return (
        <header className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300",
            isSolidHeader ? "bg-primary shadow-md py-2" : "bg-transparent py-4 mx-auto"
        )}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/logo-white.svg"
                        alt="D.F. Ação Social"
                        width={140}
                        height={46}
                        className={cn(
                            "h-10 md:h-12 w-auto transition-all duration-300",
                            !isSolidHeader && "brightness-0 invert"
                        )}
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
                                isSolidHeader ? "text-black hover:text-black/70" : "text-white hover:text-primary"
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
                        isSolidHeader ? "bg-black text-white hover:bg-black/80" : "bg-primary text-black hover:bg-primary/90"
                    )}>
                        <Link href="/como-doar">DOE AGORA</Link>
                    </Button>

                    {user && (
                        <Link
                            href="/admin"
                            className={cn(
                                "font-bold text-sm uppercase tracking-wider transition-colors hidden md:flex items-center gap-1",
                                isSolidHeader ? "text-black hover:text-black/70" : "text-white hover:text-primary"
                            )}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Admin
                        </Link>
                    )}

                    {!user && (
                        <Link href="/login" className={cn(
                            "hidden md:block transition-colors",
                            isSolidHeader ? "text-black hover:text-black/70" : "text-white hover:text-primary"
                        )}>
                            <User className="h-5 w-5" />
                        </Link>
                    )}

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

                                {user ? (
                                    <>
                                        <DrawerClose asChild>
                                            <Link
                                                href="/admin"
                                                className="text-lg font-medium py-2 hover:text-primary flex items-center gap-2"
                                            >
                                                <LayoutDashboard className="h-5 w-5" />
                                                Painel Administrativo
                                            </Link>
                                        </DrawerClose>
                                        <Button variant="outline" onClick={handleLogout} className="w-full justify-start gap-2">
                                            <LogOut className="h-5 w-5" />
                                            Sair
                                        </Button>
                                    </>
                                ) : (
                                    <DrawerClose asChild>
                                        <Link
                                            href="/login"
                                            className="text-lg font-medium py-2 hover:text-primary flex items-center gap-2"
                                        >
                                            <User className="h-5 w-5" />
                                            Login
                                        </Link>
                                    </DrawerClose>
                                )}

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
