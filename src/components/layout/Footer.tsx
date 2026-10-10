import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Concerns", href: "/concern" },
  { label: "News & Media", href: "/news-events" },
  { label: "Career", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

const usefulLinks = [
  { label: "Awards & Recognition", href: "/about#milestones" },
  { label: "Company Profile", href: "#" },
  { label: "Vision & Mission", href: "/about#vision" },
  { label: "CSR Activities", href: "/csr" },
  { label: "Business Inquiry", href: "/contact" },
];

const defaultSocialLinks = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4.5 h-4.5"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4.5 h-4.5"
      >
        <rect x="2" y="4" width="20" height="16" rx="4" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4.5 h-4.5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4.5 h-4.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4.5 h-4.5"
      >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4.5 h-4.5"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

export function Footer({
  brandingData,
}: {
  brandingData?: {
    logo?: { url?: string };
    logoDark?: { url?: string };
    socialLinks?: Record<string, string>;
    contact?: {
      address?: string;
      addressOnMap?: string;
      email?: string;
      phone?: string;
      whatsappNo?: string;
      lat?: string;
      long?: string;
    };
  };
}) {
  const { logo, logoDark, socialLinks, contact } = brandingData || {};
  const footerLogo =
    logoDark?.url || logo?.url || "/company_logo/logo-white.63532709.svg";

  // Dynamic contact info with fallbacks
  const phone = contact?.phone || "+880 1822-94 20 20";
  const whatsapp = contact?.whatsappNo || "+880 1755-94 20 20";
  const email = contact?.email || "info@fanamgroup.com";
  const address = contact?.address || "House #01, Road #01, Block-A";
  const addressLine2 =
    contact?.addressOnMap || "Bashundhara R/A, Dhaka-1229, Bangladesh";

  // Dynamic social links from branding settings - fully dynamic
  const activeSocialLinks = defaultSocialLinks
    .map((link) => {
      const dynamicHref = socialLinks?.[link.key];
      return {
        ...link,
        href: dynamicHref || link.href,
      };
    })
    .filter((link) => link.href); // Only show links that have a URL

  return (
    <footer className="relative w-full bg-[#392F5F] text-white overflow-hidden">
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
                src={footerLogo}
                alt="Fanam Group Logo"
                width={180}
                height={55}
                className="object-contain"
              />
            </Link>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Fanam Group is a diversified corporate group committed to
              delivering excellence across Real Estate, E-commerce, Travel &
              Tourism, Media, and emerging business sectors through innovation,
              integrity, and sustainable growth.
            </p>

            <div className="flex items-center gap-4">
              {activeSocialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white text-[#392F5F] flex items-center justify-center hover:bg-[#f9c602] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
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
                    className="text-gray-300 hover:text-white text-base md:text-lg transition-colors duration-300"
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
                    className="text-gray-300 hover:text-white text-base md:text-lg transition-colors duration-300"
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

            <div className="flex flex-col gap-4 text-gray-300 text-base md:text-lg">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>{phone}</span>
                  <span>{whatsapp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{email}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  {address}
                  <br />
                  {addressLine2}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-sm md:text-base text-white/60">
          <p>
            Copyright &copy; {new Date().getFullYear()} Tech solutions Plex.
          </p>
          <div className="flex items-center gap-4">
            {/* <Link
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
            </Link> */}
            <Link
              href="/legal/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
