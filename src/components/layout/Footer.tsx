export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-6 md:py-0">
      <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} PrimeVista. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline underline-offset-4">Privacy Policy</a>
          <a href="#" className="hover:underline underline-offset-4">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
