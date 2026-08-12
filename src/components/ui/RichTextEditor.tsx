"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const btnClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors ${
      isActive
        ? "bg-white/20 text-white"
        : "text-gray-400 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-transparent backdrop-blur-md">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive("strike"))}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-6 bg-white/10 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btnClass(editor.isActive("heading", { level: 3 }))}
      >
        <Heading3 className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-6 bg-white/10 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
      >
        <Quote className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-6 bg-white/10 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded-md text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded-md text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className:
          "prose prose-invert max-w-none p-5 focus:outline-none min-h-[200px]",
      },
    },
  });

  return (
    <div
      className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-white relative glass-editor ${className}`}
      style={{
        height: "400px",
        minHeight: "250px",
        resize: "vertical",
        overflow: "auto",
        display: "block",
      }}
    >
      <MenuBar editor={editor} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .tiptap.ProseMirror {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        .tiptap.ProseMirror:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        /* Glass Scrollbar for the main editor */
        .glass-editor::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .glass-editor::-webkit-scrollbar-track {
          background: transparent;
        }
        .glass-editor::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .glass-editor::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .glass-editor::-webkit-resizer {
          background: transparent;
        }
      `,
        }}
      />
      <EditorContent editor={editor} />
    </div>
  );
}
