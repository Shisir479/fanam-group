import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { constructMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let brandingData: any = null;
  try {
    const { getBrandingSettingsPublic, getMainSettingsPublic } =
      await import("@/services/settings.service");
    const [brandRes, mainRes] = await Promise.all([
      getBrandingSettingsPublic(),
      getMainSettingsPublic(),
    ]);

    if (brandRes?.success) {
      brandingData = brandRes.data;
      if (brandingData) {
        brandingData.logo = brandingData.logoLight || brandingData.logo;
      }
    }

    if (mainRes?.success && mainRes.data) {
      brandingData = {
        ...brandingData,
        ...mainRes.data,
      };
    }
  } catch (error) {
    console.error("Failed to fetch branding or main data:", error);
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <PublicLayoutWrapper brandingData={brandingData}>
            {children}
          </PublicLayoutWrapper>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
