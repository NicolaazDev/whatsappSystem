import type { Metadata } from "next";

import "@/styles/globals.css";

import { TooltipProvider } from "@medusajs/ui";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@medusajs/ui";

export const metadata: Metadata = {
  title: "Whatsapp Automate",
  description: " Whatsapp Automate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-poppinsLight">
        <SidebarProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
