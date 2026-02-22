import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AdminSidebar"
import { Separator } from "@/components/ui/separator"

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50/50">
                <AppSidebar />
                <div className="flex flex-col flex-1">
                    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-white">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="flex items-center gap-2 px-4">
                            <span className="font-semibold text-sm">Dashboard Administrativo</span>
                        </div>
                    </header>
                    <main className="p-6 flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
