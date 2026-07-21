"use client";

import { useEffect, useRef } from "react";

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

export default function AutoResizeTextarea({ value, className = "", onChange, ...props }: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none resize-none overflow-hidden transition-colors ${className}`}
      {...props}
    />
  );
}
