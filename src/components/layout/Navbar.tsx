"use client";

import Link from "next/link";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  BookOpen,
  Images,
  Phone,
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
  about: [
    {
      title: "Company",
      items: [
        {
          label: "About Fanam Group",
          href: "/about",
          description: "Our story, mission, vision & values",
          icon: <Building2 className="w-5 h-5" />,
        },
        {
          label: "Leadership Team",
          href: "/about#leadership",
          description: "Meet the people driving our success",
          icon: <Users className="w-5 h-5" />,
        },
        {
          label: "CSR Initiatives",
          href: "/csr",
          description: "Making a difference in communities",
          icon: <Target className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Explore",
      items: [
        {
          label: "Our Concerns",
          href: "/concern",
          description: "Explore our diverse business verticals",
          icon: <Globe className="w-5 h-5" />,
        },
        {
          label: "Awards & Milestones",
          href: "/about#milestones",
          description: "Recognitions and key achievements",
          icon: <Award className="w-5 h-5" />,
        },
        {
          label: "Career Opportunities",
          href: "/careers",
          description: "Join our growing team",
          icon: <Briefcase className="w-5 h-5" />,
        },
      ],
    },
  ],
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
        {
          label: "Media Gallery",
          href: "/image-gallery",
          description: "Photos and videos from our journey",
          icon: <Images className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Press",
      items: [
        {
          label: "Press Releases",
          href: "/press",
          description: "Official announcements and statements",
          icon: <FileText className="w-5 h-5" />,
        },
      ],
    },
  ],
  investors: [
    {
      title: "Investor Relations",
      items: [
        {
          label: "Investor Overview",
          href: "/investors",
          description: "Financial highlights and corporate governance",
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          label: "Investment Opportunities",
          href: "/investors#booking",
          description: "Explore investment possibilities with us",
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          label: "Partnership Inquiry",
          href: "/inquiry",
          description: "Collaborate and grow together",
          icon: <Handshake className="w-5 h-5" />,
        },
      ],
    },
  ],
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
        {
          label: "Terms & Conditions",
          href: "/legal/terms-conditions",
          description: "Usage terms and guidelines",
          icon: <FileText className="w-5 h-5" />,
        },
      ],
    },
  ],
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", megaMenuKey: "about" },
  { label: "Concern", href: "/concern" },
  { label: "News & Media", megaMenuKey: "news-media" },
  { label: "Career", href: "/careers" },
  { label: "Investors", megaMenuKey: "investors" },
  { label: "More", megaMenuKey: "more" },
];

// Mega Menu Panel removed in favor of simple dropdowns

// ─── Main Navbar ────────────────────────────────────────────────
export function Navbar({ brandingData }: { brandingData?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname() || "";

  const { logo } = brandingData || {};

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

  const navStyles = isMobileMenuOpen
    ? "bg-white/95 backdrop-blur-xl text-[#181428] shadow-sm border-b border-gray-100"
    : isScrolled
      ? "bg-white/80 backdrop-blur-xl text-[#181428] shadow-sm border-b border-white/50"
      : "bg-white/60 backdrop-blur-lg text-[#181428] border-b border-white/30";

  const mobileHamburgerColor = "bg-[#181428]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${navStyles} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
        onMouseLeave={handleMegaMenuLeave}
      >
        <div className="container mx-auto px-6 md:px-20 flex h-18 items-center justify-between">
          <div className="flex items-center gap-16 h-full">
            <Link
              href="/"
              className="flex items-center group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src={logo?.url || "/company_logo/logo-white.63532709.svg"}
                alt="Company Logo"
                width={160}
                height={52}
                priority
                className="h-14 md:h-20 object-contain transition-all duration-300 brightness-0"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center h-full gap-7 text-[15px] font-semibold tracking-wide">
              {navItems.map((item) => {
                const active = isNavActive(item);
                const hasMega = !!item.megaMenuKey;

                if (hasMega) {
                  return (
                    <div
                      key={item.label}
                      className="relative h-full flex items-center"
                      onMouseEnter={() =>
                        handleMegaMenuEnter(item.megaMenuKey!)
                      }
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
                            {megaMenuData[item.megaMenuKey].map((section, sIdx) => (
                              <div key={sIdx} className={`${sIdx !== 0 ? 'mt-2 pt-2 border-t border-gray-50' : ''}`}>
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
                            ))}
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
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/sitemap"
              className="hidden lg:flex items-center gap-2 border border-gray-200 hover:bg-[#f9c602] hover:text-[#181428] hover:border-[#f9c602] text-[#181428] px-6 py-2 rounded-full transition-colors font-semibold shadow-sm"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              Sitemap
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
          <div className="flex flex-col gap-6 text-[#181428] font-semibold text-[17px]">
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
                      <span className="text-2xl font-light text-[#181428]/70 w-8 text-center">
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
                            className="flex items-center gap-3 text-[15px] font-normal text-[#181428]/80 py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-[#181428]/60 flex-shrink-0">
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
          </div>
        </div>
      </div>
    </>
  );
}
