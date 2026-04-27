import { AuthModal } from "@/components/auth/AuthModal";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import type { Metadata } from "next";
import { ShellProvider } from "@/components/providers/ShellProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { NavigationProgress } from "@/components/ui/NavigationProgress";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "LENS & LORE — Editorial Photography Magazine",
  description:
    "A content-commerce editorial magazine for street photography gear and culture. Stories, reviews, and the shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full scroll-smooth bg-black antialiased"
    >
      <body className="min-h-full bg-black text-ivory selection:bg-gold selection:text-black">
        <ShellProvider>
          <ToastProvider>
            <NavigationProgress />
            <GrainOverlay />
            <CustomCursor />
            <AuthModal />
            <CartDrawer />
            <SearchOverlay />
            <div className="relative flex min-h-full flex-col">
              <SiteHeader />
              {children}
            </div>
          </ToastProvider>
        </ShellProvider>
      </body>
    </html>
  );
}
