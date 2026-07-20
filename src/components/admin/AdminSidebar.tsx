"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Home,
  PanelLeftClose,
  Building,
  FileText,
  Info,
  PhoneCall,
  Shield,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin", exact: true },

    { name: "Core Management", isHeader: true },
    { name: "Projects", icon: Building, href: "/admin/projects" },
    { name: "Contacts", icon: MessageSquare, href: "/admin/contacts" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Blog & News", icon: FileText, href: "/admin/blog" },
    { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },

    { name: "Content Management", isHeader: true },
    { name: "Homepage Content", icon: Home, href: "/admin/content/homepage" },
    { name: "About Content", icon: Info, href: "/admin/content/about" },
    { name: "Contact Info", icon: PhoneCall, href: "/admin/content/contact" },
    { name: "Legal Pages", icon: Shield, href: "/admin/content/legal" },

    { name: "System", isHeader: true },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="fixed left-6 top-2 bottom-2 w-[240px] mb-2 glass-panel hidden md:flex flex-col z-50 shadow-2xl overflow-hidden">
      {/* Header section */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-[#120a1c] text-[10px]">BN</span>
          </div>
          <div>
            <h1 className="text-[13px] font-bold text-white leading-tight tracking-wide">
              Bonedi Admin
            </h1>
            <p className="text-[10px] text-gray-400">Dashboard</p>
          </div>
        </div>
        <button className="p-1 text-gray-400 hover:text-white rounded border border-white/5 hover:bg-white/5 transition-colors">
          <PanelLeftClose className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dashed Separator */}
      <div className="px-4">
        <div className="border-b border-dashed border-white/10 w-full"></div>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto py-3 px-2 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="space-y-0.5">
          {menuItems.map((item, index) => {
            if (item.isHeader) {
              return (
                <div key={`header-${index}`} className="pt-4 pb-1 px-3">
                  <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                    {item.name}
                  </span>
                </div>
              );
            }

            const Icon = item.icon as any;

            // Check if active (exact match for /admin, prefix match for others)
            const isActive = item.exact
              ? pathname === item.href
              : pathname?.startsWith(item.href || "");

            return (
              <Link
                key={item.name}
                href={item.href || "#"}
                className={`relative flex items-center justify-between px-3 py-1.5 rounded-lg transition-all outline-none group overflow-hidden ${
                  isActive
                    ? "bg-white/5 border border-white/10 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {/* Glassy Bottom Glow (Active State Only) */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,165,0,0.15)_0%,transparent_60%)] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_-4px_12px_1px_rgba(255,165,0,0.6)] pointer-events-none"></div>
                  </>
                )}

                <div className="flex items-center gap-2.5 relative z-10">
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" : "text-gray-400 group-hover:text-white"} transition-colors`}
                  />
                  <span className="text-[13px] font-medium tracking-wide">
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
