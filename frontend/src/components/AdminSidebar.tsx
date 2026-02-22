"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Home, LayoutDashboard, Users, Heart, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Campanhas",
        url: "/admin/campanhas",
        icon: Heart,
    },
    {
        title: "Voluntários",
        url: "/admin/voluntarios",
        icon: Users,
    },
    {
        title: "Configurações",
        url: "/admin/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="border-r border-gray-200">
            <SidebarHeader className="py-6 flex items-center justify-center">
                <Link href="/">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-10 w-auto"
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Administrativo</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-gray-100">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <LogOut className="h-4 w-4" />
                            <span>Sair</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
