"use client";

import Link from "next/link";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  BookOpen,
  Images,
  Phone,
  Mail,
  HelpCircle,
  Shield,
  FileText,
  ChevronRight,
  Building2,
  Users,
  Target,
  Globe,
  TrendingUp,
  BarChart3,
  Briefcase,
  Award,
  Handshake,
  Video,
} from "lucide-react";

// ─── Mega Menu Data ─────────────────────────────────────────────
interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

interface NavItem {
  label: string;
  href?: string;
  megaMenuKey?: string;
}

const megaMenuData: Record<string, MegaMenuSection[]> = {
  "news-media": [
    {
      title: "News & Media",
      items: [
        {
          label: "News & Events",
          href: "/news-events",
          description: "Latest corporate news and upcoming events",
          icon: <Newspaper className="w-5 h-5" />,
        },
        {
          label: "Blog & Insights",
          href: "/blog",
          description: "Thought leadership and industry insights",
          icon: <BookOpen className="w-5 h-5" />,
        },
      ],
    },
  ],
  // Investors section removed in favor of direct link
  more: [
    {
      title: "Resources",
      items: [
        {
          label: "Contact Us",
          href: "/contact",
          description: "Get in touch with our team",
          icon: <Phone className="w-5 h-5" />,
        },
        {
          label: "FAQ",
          href: "/faq",
          description: "Frequently asked questions",
          icon: <HelpCircle className="w-5 h-5" />,
        },
        {
          label: "Privacy Policy",
          href: "/legal/privacy-policy",
          description: "How we handle your data",
          icon: <Shield className="w-5 h-5" />,
        },
      ],
    },
  ],
  gallery: [
    {
      title: "Gallery",
      items: [
        {
          label: "Image Gallery",
          href: "/image-gallery",
          description: "Browse our photo collections",
          icon: <Images className="w-5 h-5" />,
        },
        {
          label: "Video Gallery",
          href: "/video-gallery",
          description: "Watch our video presentations",
          icon: <Video className="w-5 h-5" />,
        },
      ],
    },
  ],
};

const navItems: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Concern", href: "/concern" },
  { label: "News & Media", megaMenuKey: "news-media" },
  { label: "Career", href: "/careers" },
  { label: "Investors", href: "/investors" },
  { label: "Gallery", megaMenuKey: "gallery" },
  { label: "More", megaMenuKey: "more" },
];

// Mega Menu Panel removed in favor of simple dropdowns

// ─── Main Navbar ────────────────────────────────────────────────
export function Navbar({
  brandingData,
}: {
  brandingData?: {
    logo?: { url?: string };
    logoDark?: { url?: string };
    socialLinks?: Record<string, string>;
    contact?: { phone?: string; email?: string; whatsappNo?: string };
  };
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname() || "";

  const { logo, logoDark, socialLinks, contact } = brandingData || {};
  const navbarLogo =
    logoDark?.url || logo?.url || "/company_logo/logo-white.63532709.svg";

  // Dynamic contact info with fallbacks
  const phone = contact?.phone || "+880 1822-94 20 20";
  const email = contact?.email || "info@fanamgroup.com";

  // Dynamic social links from branding settings - using inline SVGs
  const dynamicSocialLinks = socialLinks
    ? [
        {
          key: "facebook",
          label: "Facebook",
          href: socialLinks.facebook || "https://facebook.com",
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          ),
        },
        {
          key: "instagram",
          label: "Instagram",
          href: socialLinks.instagram || "https://instagram.com",
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.25"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          ),
        },
        {
          key: "linkedin",
          label: "LinkedIn",
          href: socialLinks.linkedin || "https://linkedin.com",
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          ),
        },
        {
          key: "twitter",
          label: "Twitter",
          href: socialLinks.twitter || "https://twitter.com",
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          ),
        },
        {
          key: "youtube",
          label: "YouTube",
          href: socialLinks.youtube || "https://youtube.com",
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <rect x="2" y="4" width="20" height="16" rx="4" />
              <polygon
                points="10,8 16,12 10,16"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          ),
        },
      ]
    : [];

  const isBannerPage =
    pathname === "/" ||
    (pathname.startsWith("/concern/") && pathname !== "/concern") ||
    pathname.startsWith("/divisions/");

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setActiveMegaMenu(null);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMegaMenuEnter = useCallback((key: string) => {
    if (megaMenuTimeout.current) {
      clearTimeout(megaMenuTimeout.current);
      megaMenuTimeout.current = null;
    }
    setActiveMegaMenu(key);
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  }, []);

  const handlePanelEnter = useCallback(() => {
    if (megaMenuTimeout.current) {
      clearTimeout(megaMenuTimeout.current);
      megaMenuTimeout.current = null;
    }
  }, []);

  const handlePanelLeave = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  }, []);

  const toggleAccordion = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const isNavActive = (item: NavItem): boolean => {
    if (item.href) {
      return item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href);
    }
    if (item.megaMenuKey) {
      const sections = megaMenuData[item.megaMenuKey];
      return sections?.some((s) =>
        s.items.some((i) => pathname.startsWith(i.href.split("#")[0])),
      );
    }
    return false;
  };

  const isDetailsPage =
    (pathname.startsWith("/blog/") && pathname !== "/blog") ||
    (pathname.startsWith("/news-events/") && pathname !== "/news-events");

  const navStyles = isMobileMenuOpen
    ? "bg-[#392F5F]/95 backdrop-blur-xl text-white shadow-sm border-b border-white/10"
    : isScrolled
      ? "bg-[#392F5F]/80 backdrop-blur-xl text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] border-b border-white/10"
      : pathname.includes("gallery") || isDetailsPage
        ? "bg-[#392F5F] text-white shadow-[0_4px_24px_rgba(0,0,0,0.1)] border-b border-transparent"
        : "bg-transparent text-white border-b border-transparent";

  const mobileHamburgerColor = "bg-white";

  const isSolidAtTop = pathname.includes("gallery") || isDetailsPage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${navStyles}`}
        onMouseLeave={handleMegaMenuLeave}
      >
        <div
          className={`container mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${isScrolled || isSolidAtTop ? "h-16 md:h-20" : "h-20 md:h-24"}`}
        >
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src={navbarLogo}
                alt="Company Logo"
                width={190}
                height={58}
                priority
                className="h-10 md:h-12 object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center h-full gap-7 md:gap-8 text-[17px] font-medium tracking-wide mx-auto">
            {navItems.map((item) => {
              const active = isNavActive(item);
              const hasMega = !!item.megaMenuKey;

              if (hasMega) {
                return (
                  <div
                    key={item.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleMegaMenuEnter(item.megaMenuKey!)}
                  >
                    <span
                      className={`h-full flex items-center gap-1 cursor-pointer transition-colors ${active ? "text-[#f9c602] font-extrabold" : ""}`}
                    >
                      <TextRoll>{item.label}</TextRoll>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ${activeMegaMenu === item.megaMenuKey ? "rotate-180" : ""}`}
                      >
                        <path d="M2 4L5 7L8 4" />
                      </svg>
                      <span
                        className={`absolute left-0 bottom-0 w-full h-[3px] bg-[#f9c602] origin-center transition-transform duration-500 ease-out ${active || activeMegaMenu === item.megaMenuKey ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </span>

                    {/* Simple Dropdown Menu */}
                    <AnimatePresence>
                      {activeMegaMenu === item.megaMenuKey && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-3 mt-1 overflow-hidden z-50 flex flex-col"
                        >
                          {megaMenuData[item.megaMenuKey].map(
                            (section, sIdx) => (
                              <div
                                key={sIdx}
                                className={`${sIdx !== 0 ? "mt-2 pt-2 border-t border-gray-50" : ""}`}
                              >
                                {megaMenuData[item.megaMenuKey!].length > 1 && (
                                  <div className="px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                                    {section.title}
                                  </div>
                                )}
                                {section.items.map((subItem, iIdx) => (
                                  <Link
                                    key={iIdx}
                                    href={subItem.href}
                                    onClick={() => setActiveMegaMenu(null)}
                                    className="block px-5 py-2.5 text-[14px] text-gray-600 font-medium hover:bg-gray-50 hover:text-[#f9c602] transition-colors"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            ),
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`relative group h-full flex items-center transition-colors ${active ? "text-[#f9c602] font-extrabold" : ""}`}
                  onMouseEnter={() => setActiveMegaMenu(null)}
                >
                  <TextRoll>{item.label}</TextRoll>
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[3px] bg-[#f9c602] origin-center transition-transform duration-500 ease-out ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 bg-white text-[#392F5F] hover:bg-gray-100 rounded-full px-6 py-2.5 transition-colors font-medium text-sm active:scale-[0.98]"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              Get In Touch
              <span className="w-6 h-6 rounded-full bg-[#F9C602] text-[#392F5F] flex items-center justify-center ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-8 h-8 z-50 relative cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className={`absolute block w-7 h-[2px] ${mobileHamburgerColor} transition-all duration-300 ease-out ${isMobileMenuOpen ? "rotate-45" : "-translate-y-2"}`}
              />
              <span
                className={`absolute block w-7 h-[2px] ${mobileHamburgerColor} transition-all duration-300 ease-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute block w-7 h-[2px] ${mobileHamburgerColor} transition-all duration-300 ease-out ${isMobileMenuOpen ? "-rotate-45" : "translate-y-2"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      <div
        className={`fixed inset-0 top-[76px] bg-white/95 backdrop-blur-md z-40 transition-transform duration-500 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8 pb-24">
          <div className="flex flex-col gap-6 text-[#392F5F] font-semibold text-[17px]">
            {navItems.map((item) => {
              if (item.megaMenuKey) {
                const sections = megaMenuData[item.megaMenuKey];
                return (
                  <div key={item.label}>
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleAccordion(item.megaMenuKey!)}
                    >
                      <span>{item.label}</span>
                      <span className="text-2xl font-light text-[#392F5F]/70 w-8 text-center">
                        {expandedMenu === item.megaMenuKey ? "−" : "+"}
                      </span>
                    </div>
                    <div
                      className={`flex flex-col gap-3 pl-4 overflow-hidden transition-all duration-300 ${expandedMenu === item.megaMenuKey ? "max-h-[500px] mt-4" : "max-h-0"}`}
                    >
                      {sections.map((section) =>
                        section.items.map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={subItem.href}
                            className="flex items-center gap-3 text-[15px] font-normal text-[#392F5F]/80 py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-[#392F5F]/60 flex-shrink-0">
                              {subItem.icon}
                            </span>
                            {subItem.label}
                          </Link>
                        )),
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* Mobile Social Links */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              {dynamicSocialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#392F5F] hover:bg-[#F9C602] hover:text-white transition-all duration-300"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
