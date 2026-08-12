import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "News & Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const projectLinks = [
  { label: "Ongoing Projects", href: "/projects/ongoing" },
  { label: "Upcoming Projects", href: "/projects/upcoming" },
  { label: "Completed Projects", href: "/projects/handed-over" },
  { label: "Media Gallery", href: "/gallery" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-conditions" },
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
    label: "Instagram",
    href: "#",
    isInstagram: true,
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02l.02-6.53 6.24 3.28-6.26 3.25z" />
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
    <footer className="relative w-full bg-[#0a0a0a] text-white overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] opacity-30" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Col 1 — Brand & Mission (4 cols) */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block mb-8 transition-transform hover:opacity-90"
            >
              <Image
                src={logo?.url || "/company_logo/bonedia.png"}
                alt="Fanam Group Logo"
                width={180}
                height={65}
                className="object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
              Pioneering excellence in real estate, corporate investments, and
              luxury living. We build more than structures; we forge legacies
              across Bangladesh.
            </p>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-4 group">
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-black transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </span>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    Hotline
                  </span>
                  <span className="text-white font-medium text-base tracking-wide">
                    {contact?.phone || "+880 1331 662255"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-black transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </span>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    Email Inquiry
                  </span>
                  <span className="text-white font-medium text-base tracking-wide">
                    {contact?.email || "info@fanamgroup.com"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2 — Quick Links (2 cols) */}
          <div className="lg:col-span-2 lg:ml-8">
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Company
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-gray-400 hover:text-white text-sm transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-yellow-500 mr-0 group-hover:mr-3 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Explore (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Discover
            </h4>
            <ul className="space-y-4">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-gray-400 hover:text-white text-sm transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-yellow-500 mr-0 group-hover:mr-3 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter & Social (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Stay Connected
            </h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter for exclusive updates, project
              launches, and market insights.
            </p>

            <form
              className="relative mb-10 group"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center gap-3">
              {activeSocialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wide text-gray-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-gray-300">
              {brandingData?.siteName || "Fanam Group"}
            </span>
            . All Rights Reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Designed & Developed by</span>
            <a
              href="#"
              className="text-gray-300 font-semibold hover:text-yellow-500 transition-colors ml-1"
            >
              Tech Solutions Plex Ltd.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
