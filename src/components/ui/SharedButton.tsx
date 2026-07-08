import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SharedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hoverBgClass?: string;
  hoverTextClass?: string;
}

export function SharedButton({
  children,
  className,
  href,
  hoverBgClass = "bg-brand-blue",
  hoverTextClass = "hover:text-white",
  ...props
}: SharedButtonProps) {
  const innerContent = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-0 ${hoverBgClass} scale-x-0 origin-left transition-transform duration-700 ease-out group-hover:scale-x-100 z-0`}
      ></span>
    </>
  );

  const classes = cn(
    "inline-flex items-center justify-center relative group border border-[#4ea24b] hover:border-brand-blue px-12 py-3 text-sm font-bold text-brand-blue overflow-hidden transition-colors duration-500",
    hoverTextClass,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {innerContent}
    </button>
  );
}
