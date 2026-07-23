"use client";

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

  if (isAdmin) {
    return <main className="flex-1 h-full bg-black">{children}</main>;
  }
  console.log(brandingData);
  return (
    <>
      <Navbar brandingData={brandingData} />
      <main className="flex-1">{children}</main>
      <Footer brandingData={brandingData} />
    </>
  );
}
