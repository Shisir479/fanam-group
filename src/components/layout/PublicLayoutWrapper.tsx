"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
export function PublicLayoutWrapper({
  children,
  brandingData,
}: {
  children: React.ReactNode;
  brandingData?: any;
}) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add("admin-theme");
    } else {
      document.body.classList.remove("admin-theme");
    }
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <main className="flex-1 h-full bg-[#f7f8fa] admin-theme">{children}</main>
    );
  }
  brandingData;
  return (
    <>
      <Navbar brandingData={brandingData} />
      <main className="flex-1">{children}</main>
      <Footer brandingData={brandingData} />
    </>
  );
}
