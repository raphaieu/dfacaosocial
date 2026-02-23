"use client"

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePathname } from "next/navigation";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

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
