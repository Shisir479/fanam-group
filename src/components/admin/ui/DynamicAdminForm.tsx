"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/hooks/useImageUpload";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Loader2, UploadCloud } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { validateFields } from "@/lib/validation";

export type FieldType =
  "text" | "textarea" | "rich-text" | "select" | "image" | "date" | "checkbox";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  sidebar?: boolean;
  validationMessage?: string;
  // For images, we often need to store the uploaded ID and URL in separate keys
  imageIdKey?: string;
  // Custom dependency logic (e.g. auto generate slug from name)
  autoGenerateSlugFrom?: string;
}

export interface DynamicAdminFormProps {
  title: string;
  fields: FormField[];
  initialValues: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<any>;
  submitLabel?: string;
  backHref?: string;
}

export default function DynamicAdminForm({
  title,
  fields,
  initialValues,
  onSubmit,
  submitLabel = "Save",
  backHref,
}: DynamicAdminFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>(
    initialValues || {},
  );
  const { isUploading, uploadSingle, removeImage } = useImageUpload();

  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Auto-generate slug if this field is a source for a slug
      const slugField = fields.find((f) => f.autoGenerateSlugFrom === name);
      if (
        slugField &&
        (!prev[slugField.name] ||
          prev[slugField.name] === generateSlug(prev[name] || ""))
      ) {
        newData[slugField.name] = generateSlug(value);
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect validations
    const validations = fields
      .filter((f) => f.required)
      .map((f) => ({
        field: formData[f.name],
        message: f.validationMessage || `${f.label} is required`,
        isString:
          f.type === "text" || f.type === "textarea" || f.type === "rich-text",
      }));

    if (validations.length > 0) {
      const isValid = validateFields(validations);
      if (!isValid) return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || "";

    switch (field.type) {
      case "text":
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              {field.label} {field.required && "*"}
            </label>
            <input
              type="text"
              required={field.required}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.name} className="space-y-2 ">
            <label className="text-sm font-medium text-gray-300">
              {field.label} {field.required && "*"}
            </label>
            <textarea
              required={field.required}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors min-h-[120px]"
            />
          </div>
        );

      case "rich-text":
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              {field.label} {field.required && "*"}
            </label>
            <RichTextEditor
              value={value}
              onChange={(val) => handleChange(field.name, val)}
              placeholder={field.placeholder}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              {field.label} {field.required && "*"}
            </label>
            <Select
              value={
                Array.isArray(value) && value.length > 0
                  ? String(value[0])
                  : String(value)
              }
              onValueChange={(val) => {
                // If the field name is 'tags', our backend typically expects an array.
                // You can add a specific property `multiple` to FormField in the future.
                handleChange(field.name, field.name === "tags" ? [val] : val);
              }}
            >
              <SelectTrigger>
                <span className="flex-1 text-left">
                  {value && value.length > 0 ? (
                    field.options?.find(
                      (o) =>
                        o.value ===
                        String(Array.isArray(value) ? value[0] : value),
                    )?.label ||
                    field.placeholder ||
                    "Select"
                  ) : (
                    <span className="text-gray-400">
                      {field.placeholder || "Select"}
                    </span>
                  )}
                </span>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "image":
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              {field.label} {field.required && "*"}
            </label>
            <label
              className={`w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-brand-violet transition-colors cursor-pointer bg-white/5 overflow-hidden relative group ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  try {
                    const imageData = await uploadSingle(file);
                    if (imageData) {
                      const oldId = field.imageIdKey
                        ? formData[field.imageIdKey]
                        : null;
                      if (oldId && oldId !== imageData._id) {
                        await removeImage(oldId, true);
                      }

                      const updates: Record<string, any> = {
                        [field.name]: imageData.url,
                      };
                      if (field.imageIdKey)
                        updates[field.imageIdKey] = imageData._id;
                      setFormData((prev) => ({ ...prev, ...updates }));
                    }
                  } catch (error: any) {
                    toast.error(error.message);
                  }
                }}
              />
              {value ? (
                <div className="relative w-full h-full">
                  <Image
                    src={value}
                    alt={field.label}
                    fill
                    className="object-cover"
                  />
                  {isUploading ? (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <Loader2 className="w-8 h-8 animate-spin text-white" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <UploadCloud className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  ) : (
                    <UploadCloud className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  )}
                  <span className="text-sm">
                    Click to upload {field.label.toLowerCase()}
                  </span>
                </>
              )}
            </label>
          </div>
        );

      case "date":
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              {field.label} {field.required && "*"}
            </label>
            <input
              type="date"
              required={field.required}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors [color-scheme:dark]"
            />
          </div>
        );

      case "checkbox":
        return (
          <div key={field.name} className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id={`checkbox-${field.name}`}
              checked={!!value}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="w-5 h-5 rounded border-white/10 bg-white/5 text-brand-violet focus:ring-brand-violet focus:ring-offset-gray-900"
            />
            <label
              htmlFor={`checkbox-${field.name}`}
              className="text-sm font-medium text-gray-300 cursor-pointer"
            >
              {field.label} {field.required && "*"}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  const mainFields = fields.filter((f) => !f.sidebar);
  const sidebarFields = fields.filter(
    (f) => f.sidebar && !f.name.startsWith("meta"),
  );
  const seoFields = fields.filter(
    (f) => f.sidebar && f.name.startsWith("meta"),
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backHref && <BackButton href={backHref} />}
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="glass-btn flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>

      <div
        className={`grid grid-cols-1 ${sidebarFields.length > 0 ? "lg:grid-cols-3" : ""} gap-6 items-start`}
      >
        {/* Main Content */}
        {mainFields.length > 0 && (
          <div
            className={
              sidebarFields.length > 0 ? "lg:col-span-2 space-y-6" : "space-y-6"
            }
          >
            <div className="glass-panel p-6 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
                Basic Information
              </h3>
              {mainFields.map(renderField)}
            </div>
          </div>
        )}

        {/* Sidebar */}
        {(sidebarFields.length > 0 || seoFields.length > 0) && (
          <div className="space-y-6">
            {sidebarFields.length > 0 && (
              <div className="glass-panel p-6 space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
                  Settings
                </h3>
                {sidebarFields.map(renderField)}
              </div>
            )}

            {seoFields.length > 0 && (
              <div className="glass-panel p-6 space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
                  SEO Optimization
                </h3>
                {seoFields.map(renderField)}
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
