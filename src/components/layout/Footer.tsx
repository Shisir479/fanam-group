import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { MapPin } from "lucide-react";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Concerns", href: "/concern" },
  { label: "Projects", href: "/projects" },
  { label: "News & Media", href: "/news-events" },
  { label: "Career", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

const usefulLinks = [
  { label: "Awards & Recognition", href: "/about#milestones" },
  { label: "Company Profile", href: "#" },
  { label: "Leadership Team", href: "/about#leadership" },
  { label: "Vision & Mission", href: "/about#vision" },
  { label: "CSR Activities", href: "/csr" },
  { label: "Fanam Real Estate", href: "/concern/real-estate" },
  { label: "Future Ventures", href: "/concern/future" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02l.02-6.53 6.24 3.28-6.26 3.25z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.03 2.06c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.44 1.32 4.93L2 22l5.22-1.37c1.45.79 3.09 1.2 4.79 1.2h.01c5.5 0 9.97-4.47 9.97-9.97 0-5.5-4.47-9.97-9.97-9.97m0 18.25h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.13.82.83-3.05-.2-.32a8.23 8.23 0 0 1-1.26-4.4c0-4.55 3.7-8.25 8.25-8.25 4.54 0 8.24 3.7 8.24 8.25s-3.7 8.25-8.24 8.25m4.53-6.19c-.25-.12-1.47-.72-1.7-.81-.22-.08-.39-.12-.55.12-.17.25-.65.81-.8 9.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.1-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.48-.41-.42-.55-.43h-.48c-.17 0-.45.06-.68.31s-.89.87-.89 2.12c0 1.25.91 2.45 1.04 2.62.12.17 1.79 2.73 4.33 3.83.6.26 1.08.41 1.45.53.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.15-.48-.28" />
      </svg>
    ),
  },
];

export function Footer({ brandingData }: { brandingData?: any }) {
  const { logo, socialLinks: dynamicSocial, contact } = brandingData || {};

  const activeSocialLinks = socialLinks.map((link) => {
    const key =
      link.label.toLowerCase() === "twitter"
        ? "twitter"
        : link.label.toLowerCase();
    const dynamicHref = dynamicSocial?.[key];
    return { ...link, href: dynamicHref || link.href };
  });

  return (
    <footer className="relative w-full bg-[#181428] text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-10 pb-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-8">
          {/* Col 1 — Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link
              href="/"
              className="inline-block mb-4 transition-transform hover:opacity-90"
            >
              <Image
                src={logo?.url || "/company_logo/logo-white.63532709.svg"}
                alt="Fanam Group Logo"
                width={180}
                height={55}
                className="object-contain"
              />
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Fanam Group is a diversified corporate group committed to
              delivering excellence across Real Estate, E-commerce, Travel &
              Tourism, Media, and emerging business sectors through innovation,
              integrity, and sustainable growth.
            </p>

            <div className="flex items-center gap-4">
              {activeSocialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white text-[#181428] flex items-center justify-center hover:bg-[#f9c602] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Company Links (2 cols) */}
          <div className="lg:col-span-2 lg:ml-8">
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Useful Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-lg mb-4">
              Useful links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>

            <div className="flex flex-col gap-4 text-gray-300 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>+880 1822-94 20 20</span>
                  <span>+880 1755-94 20 20</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@fanamgroup.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  House #01, Road #01, Block-A
                  <br />
                  Bashundhara R/A, Dhaka-1229, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-dashed border-gray-600 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            Copyright &copy; {new Date().getFullYear()} Tech solutions Plex.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/legal/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms Of Use
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Support
            </Link>
            <Link
              href="/legal/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Private Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
