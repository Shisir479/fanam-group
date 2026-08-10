"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function Navbar({ brandingData }: { brandingData?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname() || "";

  const { logo } = brandingData || {};

  // Check if current page is a banner page
  const isBannerPage =
    pathname === "/" ||
    (pathname.startsWith("/concern/") && pathname !== "/concern") ||
    pathname.startsWith("/divisions/");

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
      
      // Handle solid/transparent state
      setIsScrolled(currentScrollY > 50);

      // Handle visibility on scroll direction
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAccordion = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const navStyles = isMobileMenuOpen
    ? "bg-brand-blue/90 backdrop-blur-md text-white"
    : isBannerPage && !isScrolled
      ? "bg-transparent text-white"
      : "bg-white text-black";

  const linkLineColor = isBannerPage && !isScrolled ? "bg-white" : "bg-black";
  const mobileHamburgerColor = isBannerPage && !isScrolled && !isMobileMenuOpen ? "bg-white" : isMobileMenuOpen ? "bg-white" : "bg-black";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${navStyles} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-6 md:px-20 flex h-19 items-center justify-between">
          <div className="flex items-center gap-20 h-full">
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
                className={`h-14 md:h-20 object-contain transition-all duration-300 ${isBannerPage && !isScrolled ? "" : ""}`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center h-full gap-8 text-sm font-semibold tracking-wide">
              <Link
                href="/"
                className="relative group h-full flex items-center"
              >
                Home
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] ${linkLineColor} origin-left transition-transform duration-600 ease-out ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>

              <Link
                href="/about"
                className="relative group h-full flex items-center"
              >
                About Us
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] ${linkLineColor} origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/about") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>

              <Link
                href="/concern"
                className="relative group h-full flex items-center"
              >
                Concern
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] ${linkLineColor} origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/concern") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>

              <Link
                href="/events"
                className="relative group h-full flex items-center whitespace-nowrap"
              >
                News & Events
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] ${linkLineColor} origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/events") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>

              <Link
                href="/blog"
                className="relative group h-full flex items-center"
              >
                Blogs
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] ${linkLineColor} origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/blog") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>

              <Link
                href="/careers"
                className="relative group h-full flex items-center"
              >
                Career
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] ${linkLineColor} origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/careers") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>

              {/* Legal / More Pages with Dropdown */}
              <div className="relative group h-full flex items-center">
                <span className="h-full flex items-center cursor-pointer">
                  More
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[4px] ${linkLineColor} origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/legal") || pathname.startsWith("/contact") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </span>
                <div className="absolute top-full right-0 min-w-[240px] bg-white shadow-xl border border-gray-100 flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    href="/contact"
                    className={`px-6 py-5 text-sm font-semibold hover:text-gray-900 hover:bg-gray-50 border-b border-gray-100 transition-colors ${pathname === "/contact" ? "text-gray-900 bg-gray-50" : "text-gray-600"}`}
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/legal/faq"
                    className={`px-6 py-5 text-sm font-semibold hover:text-gray-900 hover:bg-gray-50 border-b border-gray-100 transition-colors ${pathname === "/legal/faq" ? "text-gray-900 bg-gray-50" : "text-gray-600"}`}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/legal/privacy-policy"
                    className={`px-6 py-5 text-sm font-semibold hover:text-gray-900 hover:bg-gray-50 transition-colors ${pathname === "/legal/privacy-policy" ? "text-gray-900 bg-gray-50" : "text-gray-600"}`}
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:01331662255"
              className={`hidden lg:flex items-center gap-2 border px-6 py-2 transition-colors font-semibold ${isBannerPage && !isScrolled ? "border-white/40 hover:bg-white hover:text-black text-white" : "border-black/40 hover:bg-black hover:text-white text-black"}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              01331662255
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-8 h-8 z-50 relative cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className={`absolute block w-7 h-[2px] ${mobileHamburgerColor} transition-all duration-300 ease-out ${isMobileMenuOpen ? "rotate-45" : "-translate-y-2"}`}
              ></span>
              <span
                className={`absolute block w-7 h-[2px] ${mobileHamburgerColor} transition-all duration-300 ease-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`absolute block w-7 h-[2px] ${mobileHamburgerColor} transition-all duration-300 ease-out ${isMobileMenuOpen ? "-rotate-45" : "translate-y-2"}`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[76px] bg-brand-blue/80 backdrop-blur-md z-40 transition-transform duration-500 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8 pb-24">
          <div className="flex flex-col gap-8 text-white font-semibold text-[17px]">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>

            {/* About Link */}
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>

            {/* Concern Link */}
            <Link href="/concern" onClick={() => setIsMobileMenuOpen(false)}>
              Concern
            </Link>

            <Link href="/events" onClick={() => setIsMobileMenuOpen(false)}>
              News & Events
            </Link>

            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              Blogs
            </Link>

            <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)}>
              Career
            </Link>

            {/* More Accordion */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("more")}
              >
                <span>More</span>
                <span className="text-2xl font-light text-white/70 w-8 text-center">
                  {expandedMenu === "more" ? "-" : "+"}
                </span>
              </div>
              <div
                className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-300 ${expandedMenu === "more" ? "max-h-60 mt-4" : "max-h-0"}`}
              >
                <Link
                  href="/contact"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/legal/faq"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/legal/privacy-policy"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
