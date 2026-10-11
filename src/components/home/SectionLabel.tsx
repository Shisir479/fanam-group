interface SectionLabelProps {
  children: string;
  dark?: boolean;
}

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-4">
      <span
        aria-hidden="true"
        className="h-[2px] w-10 md:w-14 rounded-full bg-[#F9C602]"
      />
      <span
        className={`text-sm md:text-base font-bold tracking-[0.28em] uppercase ${
          dark ? "text-white/90" : "text-[#392F5F]/80"
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="h-[2px] w-10 md:w-14 rounded-full bg-[#F9C602]"
      />
    </div>
  );
}
