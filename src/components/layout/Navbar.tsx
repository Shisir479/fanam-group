import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/85 text-white transition-all duration-300">
      <div className="container mx-auto px-6 md:px-12 flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-bold text-3xl tracking-tight uppercase flex flex-col leading-none">
            <span>EDISON</span>
            <span className="text-xs font-normal tracking-widest text-white/70">REAL ESTATE</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide">
            <Link href="/" className="transition-colors hover:text-white/70">Home</Link>
            <Link href="/about" className="transition-colors hover:text-white/70">About</Link>
            <Link href="/projects" className="transition-colors hover:text-white/70">Projects</Link>
            <Link href="/blog" className="transition-colors hover:text-white/70">Blog</Link>
            <Link href="/gallery" className="transition-colors hover:text-white/70">Gallery</Link>
            <Link href="/career" className="transition-colors hover:text-white/70">Career</Link>
            <Link href="/contact" className="transition-colors hover:text-white/70">Contact</Link>
            <Link href="/landowner" className="transition-colors hover:text-white/70">Landowner</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:16760" className="flex items-center gap-2 border border-white/40 px-6 py-2 rounded hover:bg-white hover:text-black transition-colors font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            16760
          </a>
        </div>
      </div>
    </header>
  );
}
