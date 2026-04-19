import type { Metadata } from "next";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "LENS & LORE",
  description:
    "A content-commerce editorial magazine for street photography gear and culture.",
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
        <GrainOverlay />
        <CustomCursor />
        <div className="relative flex min-h-full flex-col">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
