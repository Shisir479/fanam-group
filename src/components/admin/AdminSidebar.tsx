"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  MessageSquare,
  Home,
  PanelLeftClose,
  Building,
  FileText,
  Info,
  PhoneCall,
  Shield,
  Star,
  Plus,
  Minus,
  Users,
  Award,
  Flag,
  Hexagon,
  Calendar,
  Heart,
  Briefcase,
  Newspaper,
} from "lucide-react";

type MenuItem = {
  name: string;
  isHeader?: boolean;
  icon?: any;
  href?: string;
  exact?: boolean;
  children?: { name: string; icon: any; href: string }[];
};

export function AdminSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Settings: pathname?.startsWith("/admin/settings") || false,
  });

  const toggleExpand = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin", exact: true },

    { name: "Core Management", isHeader: true },
    { name: "Projects", icon: Building, href: "/admin/project" },
    { name: "Leadership Team", icon: Users, href: "/admin/team" },
    { name: "Inquiries", icon: Shield, href: "/admin/investment-bookings" },
    { name: "Contacts", icon: MessageSquare, href: "/admin/contacts" },
    { name: "Blog & News", icon: FileText, href: "/admin/blog" },
    { name: "Testimonials", icon: Star, href: "/admin/testimonials" },
    { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },

    { name: "Content Management", isHeader: true },
    { name: "Homepage Content", icon: Home, href: "/admin/content/homepage" },
    { name: "About Content", icon: Info, href: "/admin/content/about" },
    { name: "Company Milestones", icon: Flag, href: "/admin/milestones" },
    { name: "Awards & Certs", icon: Award, href: "/admin/awards" },
    { name: "Business Partners", icon: Hexagon, href: "/admin/brands" },
    { name: "Events", icon: Calendar, href: "/admin/events" },
    { name: "CSR Activities", icon: Heart, href: "/admin/csr" },
    { name: "Careers", icon: Briefcase, href: "/admin/careers" },
    { name: "Media Coverage", icon: Newspaper, href: "/admin/press" },
    { name: "Investor Docs", icon: FileText, href: "/admin/documents" },
    {
      name: "Contact Info",
      icon: PhoneCall,
      href: "/admin/content/contactInfo",
    },
    { name: "Pages", icon: FileText, href: "/admin/content/pages" },

    { name: "System", isHeader: true },
    {
      name: "Settings",
      icon: Settings,
      children: [
        { name: "General Settings", icon: Settings, href: "/admin/settings" },
        {
          name: "Page Banners",
          icon: ImageIcon,
          href: "/admin/settings/pagebanner",
        },
      ],
    },
  ];

  return (
    <div className="fixed left-6 top-2 bottom-2 w-[240px] mb-2 glass-panel hidden md:flex flex-col z-50 shadow-2xl overflow-hidden">
      {/* Header section */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/company_logo/bonedia.png"
              alt="Bonedi Logo"
              width={32}
              height={32}
              className="object-cover h-full w-full p-1"
            />
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

            if (item.children) {
              const isExpanded = expanded[item.name];
              const isAnyChildActive = item.children.some(
                (child) => pathname === child.href,
              );

              return (
                <div key={item.name} className="flex flex-col space-y-0.5">
                  <button
                    onClick={(e) => toggleExpand(item.name, e)}
                    className={`w-full relative flex items-center justify-between px-3 py-1.5 rounded-lg transition-all outline-none group overflow-hidden ${
                      isExpanded || isAnyChildActive
                        ? "text-white"
                        : "text-gray-300"
                    } hover:text-white hover:bg-white/5 border border-transparent`}
                  >
                    <div className="flex items-center gap-2.5 relative z-10">
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isExpanded || isAnyChildActive
                            ? "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                            : "text-gray-400 group-hover:text-white"
                        } transition-colors`}
                      />
                      <span className="text-[13px] font-medium tracking-wide">
                        {item.name}
                      </span>
                    </div>
                    {isExpanded ? (
                      <Minus className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                    )}
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100 mt-0.5"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col space-y-0.5">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon as any;
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`relative flex items-center gap-2.5 pl-8 pr-3 py-1.5 rounded-lg transition-all outline-none group overflow-hidden ${
                              isChildActive
                                ? "bg-white/5 border border-white/10 text-white"
                                : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                          >
                            {isChildActive && (
                              <>
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(121, 222, 74, 0.56)_0%,transparent_60%)] pointer-events-none"></div>
                                <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_-4px_12px_1px_rgba(74,222,128,0.6)] pointer-events-none"></div>
                              </>
                            )}
                            <div className="flex items-center gap-2.5 relative z-10">
                              <ChildIcon
                                className={`w-3.5 h-3.5 ${
                                  isChildActive
                                    ? "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                                    : "text-gray-400 group-hover:text-white"
                                } transition-colors`}
                              />
                              <span className="text-[12px] font-medium tracking-wide">
                                {child.name}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

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
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(74,222,128,0.15)_0%,transparent_60%)] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_-4px_12px_1px_rgba(74,222,128,0.6)] pointer-events-none"></div>
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
