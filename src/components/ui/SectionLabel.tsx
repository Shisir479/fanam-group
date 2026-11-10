interface SectionLabelProps {
  children: string;
  dark?: boolean;
}

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-4">
      <span
        aria-hidden="true"
        className="h-[2px] w-10 rounded-full bg-[#F9C602] md:w-14"
      />
      <span
        className={`text-sm font-bold uppercase tracking-[0.28em] md:text-base ${
          dark ? "text-white/90" : "text-[#392F5F]/80"
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="h-[2px] w-10 rounded-full bg-[#F9C602] md:w-14"
      />
    </div>
  );
}
