import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { constructMetadata } from "@/lib/metadata";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let title = "Fanam Group";
  let description =
    "Fanam Group offers bespoke enclaves with finesse in architecture and design. Discover your dream home with us.";
  let image = "/assets/images/logo/logo.png";
  let icons = "/icon.png";

  let otherVerification: Record<string, string[]> = {};

  try {
    const { getMainSettingsPublic, getBrandingSettingsPublic } =
      await import("@/services/settings.service");
    const { seoService } = await import("@/services/seo.service");

    const [mainRes, brandRes, seoRes] = await Promise.all([
      getMainSettingsPublic(),
      getBrandingSettingsPublic(),
      seoService.getActiveMetaTags(),
    ]);

    if (mainRes?.success && mainRes.data) {
      if (mainRes.data.siteTitle) title = mainRes.data.siteTitle;
      if (mainRes.data.seoDescription)
        description = mainRes.data.seoDescription;
    }
    if (brandRes?.success && brandRes.data) {
      if (brandRes.data.logo?.url) image = brandRes.data.logo.url;
      if (brandRes.data.favicon?.url) icons = brandRes.data.favicon.url;
    }
    if (seoRes?.success && Array.isArray(seoRes.data)) {
      seoRes.data.forEach((tag: any) => {
        if (
          tag.isActive !== false &&
          tag.metaTagContent &&
          tag.verificationId
        ) {
          otherVerification[tag.metaTagContent] = [tag.verificationId];
        }
      });
    }
  } catch (error) {
    console.error("Failed to fetch global SEO settings:", error);
  }

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://fanamgroup.com",
    ),
    title: {
      template: "Fanam Group | %s",
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    verification:
      Object.keys(otherVerification).length > 0
        ? { other: otherVerification }
        : undefined,
  };
}

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
      className={`${cormorantGaramond.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
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
