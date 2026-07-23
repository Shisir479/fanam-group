"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] glass-panel p-8 text-center">
      <div className="w-24 h-24 mb-6 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
        <Image
          src="/company_logo/bonedia.png"
          alt="Bonedi Logo"
          width={64}
          height={64}
          className="object-contain h-full w-full p-2"
        />
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">
        Welcome to Bonedi Admin Dashboard
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl">
        Hello{" "}
        <span className="text-white font-semibold">
          {user?.firstName || "Admin"}
        </span>
        , you have successfully logged in.
        <br />
        <br />
        Use the sidebar navigation to manage your website settings, view
        inquiries, update projects, and manage your content.
      </p>
    </div>
  );
}
