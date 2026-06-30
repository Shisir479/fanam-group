import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <img
        src="https://images.unsplash.com/photo-1501688639626-9804fb1ad475?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Footer Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-20 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left Side: Logo & Contact */}
          <div>
            <Link href="/" className="flex items-center mb-8">
              <img
                src="/company_logo/Bonedi_homes_logo.jpg.jpeg"
                alt="Company Logo"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>

            <div className="space-y-4 text-[15px] font-semibold text-white/90">
              <p>
                HOTLINE: <span className="font-normal">16760</span>
              </p>
              <p>
                EMAIL:{" "}
                <span className="font-normal">
                  hello@edisonrealestatebd.com
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* First Divider */}
        <hr className="border-white/20 mt-12 mb-8" />

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-white">
          <a href="#" className="hover:text-gray-400 transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02l.02-6.53 6.24 3.28-6.26 3.25z"></path>
            </svg>
          </a>
        </div>

        {/* Second Divider */}
        <hr className="border-white/20 mt-8 mb-8" />

        {/* Copyright */}
        <div className="text-gray-400 text-sm">
          &copy; 2026 Edison Real Estate. All Rights Reserved. Designed &
          Developed by Dcastalia
        </div>
      </div>
    </footer>
  );
}
