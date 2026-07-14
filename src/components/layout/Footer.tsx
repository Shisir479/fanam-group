import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const projectLinks = [
  { label: "Ongoing Projects", href: "/projects/ongoing" },
  { label: "Upcoming Projects", href: "/projects/upcoming" },
  { label: "Handed Over", href: "/projects/handed-over" },
  { label: "Image Gallery", href: "/gallery/image" },
  { label: "Video Gallery", href: "/gallery/video" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.15)",
    border: "rgba(24,119,242,0.35)",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.15)",
    border: "rgba(225,48,108,0.35)",
    isInstagram: true,
    icon: (
      <svg
        width="16"
        height="16"
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
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.15)",
    border: "rgba(10,102,194,0.35)",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.15)",
    border: "rgba(255,0,0,0.35)",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02l.02-6.53 6.24 3.28-6.26 3.25z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <Image
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Footer Background"
        fill
        sizes="100vw"
        className="object-cover opacity-10"
      />

      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-20 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Col 1 — Logo & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-7">
              <Image
                src="/company_logo/Bonedia White Logo File.png"
                alt="Company Logo"
                width={160}
                height={64}
                className="h-14 md:h-20 object-contain "
              />
            </Link>

            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Building dreams into reality. Premium residential &amp; commercial
              projects across Bangladesh.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/75">
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>
                  Hotline:{" "}
                  <span className="text-white font-semibold">16760</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/75">
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="break-all">bonedia.com</span>
              </div>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-5 h-px bg-white/50 inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-white transition-all duration-300 ease-out" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Explore More */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-5 h-px bg-white/50 inline-block" />
              Explore
            </h4>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-white transition-all duration-300 ease-out" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Follow Us */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-5 h-px bg-white/50 inline-block" />
              Follow Us
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="group flex items-center gap-3 transition-all duration-300"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
                    style={{
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      color: s.color,
                      boxShadow: `0 0 8px ${s.bg}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.filter =
                        "brightness(1.3)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 16px ${s.bg}`;
                      (e.currentTarget as HTMLElement).style.transform =
                        "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.filter =
                        "brightness(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 8px ${s.bg}`;
                      (e.currentTarget as HTMLElement).style.transform =
                        "scale(1)";
                    }}
                  >
                    {s.icon}
                  </span>
                  <span
                    className="text-sm font-medium transition-all duration-300"
                    style={{ color: s.color }}
                  >
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent blur-sm" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; 2026 Edison Real Estate. All Rights Reserved.</p>
          <p>
            Designed &amp; Developed by{" "}
            <span className="text-white/70 font-semibold hover:text-white transition-colors cursor-pointer">
              Dcastalia
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
