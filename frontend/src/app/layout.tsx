import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./(site)/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "D.F. Ação Social - Transformando Vidas",
    description: "D.F. Ação Social - Organização não governamental dedicada a ajudar famílias em situação de vulnerabilidade.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={`${outfit.variable} ${inter.variable} antialiased font-inter`}
            >
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </body>
        </html>
    );
}
