"use client"

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const handleGlobalClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const pixElement = target.closest('[data-pix-display]') as HTMLElement;

      if (pixElement) {
        const pixCode = pixElement.innerText.trim();
        try {
          await navigator.clipboard.writeText(pixCode);
          const originalText = pixElement.innerText;
          pixElement.innerText = "Copiado! ✅";
          pixElement.style.color = "#10b981"; // success color

          setTimeout(() => {
            pixElement.innerText = originalText;
            pixElement.style.color = "";
          }, 2000);
        } catch (err) {
          console.error("Failed to copy PIX:", err);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isLoginPage && <Footer />}
      {!isLoginPage && <WhatsAppButton />}
    </div>
  );
}
