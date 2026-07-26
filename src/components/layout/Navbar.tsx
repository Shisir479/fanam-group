"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar({ brandingData }: { brandingData?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname() || "";

  const { logo } = brandingData || {};

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

  const toggleAccordion = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-600 text-white ${isMobileMenuOpen ? "bg-brand-blue/80 backdrop-blur-md" : "bg-black/70"}`}
      >
        <div className="container mx-auto px-6 md:px-20 flex h-19 items-center justify-between">
          <div className="flex items-center gap-20 h-full">
            <Link
              href="/"
              className="flex items-center group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src={logo?.url || "/company_logo/Bonedia White Logo File.png"}
                alt="Company Logo"
                width={160}
                height={52}
                priority
                style={{
                  width: "auto",
                  animation:
                    "sunriseUp 2.2s cubic-bezier(0.22, 1, 0.36, 1) both, logoBlink 2.2s ease-in-out 3.2s infinite",
                }}
                className="h-14 md:h-20 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center h-full gap-8 text-sm font-semibold tracking-wide text-white">
              <Link
                href="/"
                className="relative group h-full flex items-center"
              >
                Home
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] bg-white origin-left transition-transform duration-600 ease-out ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>
              {/* About with Dropdown */}
              <div className="relative group h-full flex items-center">
                <Link href="/about" className="h-full flex items-center">
                  About Us
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[4px] bg-white origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/about") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
              </div>

              {/* Projects with Dropdown */}
              <div className="relative group h-full flex items-center">
                <Link href="/projects" className="h-full flex items-center">
                  Projects
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[4px] bg-white origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/projects") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
                <div className="absolute top-full left-0 min-w-[240px] bg-black/80 flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    href="/projects/ongoing"
                    className={`px-6 py-5 text-sm font-semibold hover:text-white border-b border-white/10 transition-colors ${pathname === "/projects/ongoing" ? "text-white bg-white/10" : "text-white/70"}`}
                  >
                    Ongoing
                  </Link>
                  <Link
                    href="/projects/upcoming"
                    className={`px-6 py-5 text-sm font-semibold hover:text-white border-b border-white/10 transition-colors ${pathname === "/projects/upcoming" ? "text-white bg-white/10" : "text-white/70"}`}
                  >
                    Upcoming
                  </Link>
                  {/* <Link
                    href="/projects/handed-over"
                    className={`px-6 py-5 text-sm font-semibold hover:text-white border-b border-white/10 transition-colors ${pathname === "/projects/handed-over" ? "text-white bg-white/10" : "text-white/70"}`}
                  >
                    Handed Over
                  </Link> */}
                </div>
              </div>

              <Link
                href="/blog"
                className="relative group h-full flex items-center"
              >
                Blog
                <span
                  className={`absolute left-0 bottom-0 w-full h-[4px] bg-white origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/blog") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>

              {/* Gallery with Dropdown */}
              <div className="relative group h-full flex items-center">
                <span className="h-full flex items-center cursor-pointer">
                  Gallery
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[4px] bg-white origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/gallery/image-gallery") || pathname.startsWith("/gallery/video-gallery") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </span>
                <div className="absolute top-full left-0 min-w-[240px] bg-black/80 flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    href="/image-gallery"
                    className={`px-6 py-5 text-sm font-semibold hover:text-white border-b border-white/10 transition-colors ${pathname === "/image-gallery" ? "text-white bg-white/10" : "text-white/70"}`}
                  >
                    Image Gallery
                  </Link>
                  <Link
                    href="/video-gallery"
                    className={`px-6 py-5 text-sm font-semibold hover:text-white transition-colors ${pathname === "/video-gallery" ? "text-white bg-white/10" : "text-white/70"}`}
                  >
                    Video Gallery
                  </Link>
                </div>
              </div>

              {/* Contact with Dropdown */}
              <div className="relative group h-full flex items-center">
                <Link href="/contact" className="h-full flex items-center">
                  Contact
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[4px] bg-white origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/contact") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
              </div>

              {/* Legal Pages with Dropdown */}
              <div className="relative group h-full flex items-center">
                <span className="h-full flex items-center cursor-pointer">
                  Legal
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[4px] bg-white origin-left transition-transform duration-600 ease-out ${pathname.startsWith("/legal/privacy-policy") || pathname.startsWith("/legal/terms-conditions") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </span>
                <div className="absolute top-full left-0 min-w-[240px] bg-black/80 flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    href="/legal/privacy-policy"
                    className={`px-6 py-5 text-sm font-semibold hover:text-white border-b border-white/10 transition-colors ${pathname === "/legal/privacy-policy" ? "text-white bg-white/10" : "text-white/70"}`}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/legal/terms-conditions"
                    className={`px-6 py-5 text-sm font-semibold hover:text-white transition-colors ${pathname === "/legal/terms-conditions" ? "text-white bg-white/10" : "text-white/70"}`}
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:01331662255"
              className="hidden lg:flex items-center gap-2 border border-white/40 px-6 py-2 hover:bg-white hover:text-black transition-colors font-semibold"
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
                className={`absolute block w-7 h-[2px] bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "rotate-45" : "-translate-y-2"}`}
              ></span>
              <span
                className={`absolute block w-7 h-[2px] bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`absolute block w-7 h-[2px] bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "-rotate-45" : "translate-y-2"}`}
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

            {/* About Accordion */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("about")}
              >
                <span>About Us</span>
              </div>
            </div>

            {/* Projects Accordion */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("projects")}
              >
                <span>Projects</span>
                <span className="text-2xl font-light text-white/70 w-8 text-center">
                  {expandedMenu === "projects" ? "-" : "+"}
                </span>
              </div>
              <div
                className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-300 ${expandedMenu === "projects" ? "max-h-60 mt-4" : "max-h-0"}`}
              >
                <Link
                  href="/projects/ongoing"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ongoing
                </Link>
                <Link
                  href="/projects/upcoming"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Upcoming
                </Link>
                {/* <Link
                  href="/projects/handed-over"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Handed Over
                </Link> */}
              </div>
            </div>

            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </Link>

            {/* Gallery Accordion */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("gallery")}
              >
                <span>Gallery</span>
                <span className="text-2xl font-light text-white/70 w-8 text-center">
                  {expandedMenu === "gallery" ? "-" : "+"}
                </span>
              </div>
              <div
                className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-300 ${expandedMenu === "gallery" ? "max-h-40 mt-4" : "max-h-0"}`}
              >
                <Link
                  href="/gallery/image"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Image Gallery
                </Link>
                <Link
                  href="/gallery/video"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Video Gallery
                </Link>
              </div>
            </div>

            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            {/* Legal Pages Accordion */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("legal")}
              >
                <span>Legal</span>
                <span className="text-2xl font-light text-white/70 w-8 text-center">
                  {expandedMenu === "legal" ? "-" : "+"}
                </span>
              </div>
              <div
                className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-300 ${expandedMenu === "legal" ? "max-h-40 mt-4" : "max-h-0"}`}
              >
                <Link
                  href="/legal/privacy-policy"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/legal/terms-conditions"
                  className="text-[15px] font-normal text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
