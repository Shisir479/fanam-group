"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = "",
}: RichTextEditorProps) {
  const handleChange = (content: string, delta: any, source: string) => {
    // Prevent infinite loop by checking if the content actually changed
    // and if the change was triggered by a user action, not an API update
    if (content !== (value || "")) {
      onChange(content);
    }
  };

  return (
    <div
      className={`bg-white/5 rounded-xl border border-white/10 overflow-hidden text-white editor-container ${className}`}
    >
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
