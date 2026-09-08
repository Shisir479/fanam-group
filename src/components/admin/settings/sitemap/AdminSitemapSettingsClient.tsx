"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Save,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import * as Icons from "lucide-react";
import {
  updateSitemapSettingsAdmin,
  SitemapCategory,
} from "@/services/settings.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminSitemapSettingsClientProps {
  initialData: SitemapCategory[];
}

const AVAILABLE_ICONS = [
  "Newspaper",
  "FileText",
  "PhoneCall",
  "Briefcase",
  "Building",
  "Building2",
  "Users",
  "Award",
  "Flag",
  "Heart",
  "MapPin",
  "Info",
  "Globe",
  "Mail",
  "Link",
  "MessageSquare",
  "Star",
  "Shield",
  "Hexagon",
];

export default function AdminSitemapSettingsClient({
  initialData,
}: AdminSitemapSettingsClientProps) {
  const [categories, setCategories] = useState<SitemapCategory[]>(
    initialData || [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateSitemapSettingsAdmin(categories);
      if (res.success) {
        toast.success("Sitemap updated successfully");
      } else {
        toast.error(res.message || "Failed to update sitemap");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = () => {
    setCategories([{ title: "New Category", items: [] }, ...categories]);
  };

  const removeCategory = (index: number) => {
    const newCats = [...categories];
    newCats.splice(index, 1);
    setCategories(newCats);
  };

  const updateCategoryTitle = (index: number, title: string) => {
    const newCats = [...categories];
    newCats[index].title = title;
    setCategories(newCats);
  };

  const addItem = (catIndex: number) => {
    const newCats = [...categories];
    newCats[catIndex].items.unshift({
      name: "New Link",
      href: "/",
      icon: "FileText",
    });
    setCategories(newCats);
  };

  const removeItem = (catIndex: number, itemIndex: number) => {
    const newCats = [...categories];
    newCats[catIndex].items.splice(itemIndex, 1);
    setCategories(newCats);
  };

  const updateItem = (
    catIndex: number,
    itemIndex: number,
    field: string,
    value: string,
  ) => {
    const newCats = [...categories];
    (newCats[catIndex].items[itemIndex] as any)[field] = value;
    setCategories(newCats);
  };

  const renderIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.FileText;
    return <Icon className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6 max-w-[1400px] pb-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sitemap Settings
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure the visual sitemap displayed on the frontend.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addCategory} className="glass-btn hover:bg-white/5">
            <Plus className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="glass-btn disabled:opacity-50"
          >
            {isLoading ? (
              <Icons.Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category, catIndex) => (
          <div
            key={catIndex}
            className="glass-panel p-6 rounded-2xl relative group"
          >
            <div className="flex items-center gap-4 mb-6">
              <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
              <input
                type="text"
                value={category.title}
                onChange={(e) => updateCategoryTitle(catIndex, e.target.value)}
                className="flex-1 text-lg font-bold bg-transparent border-b border-white/10 focus:border-[#f9c602] focus:ring-0 px-0 py-2 outline-none transition-colors text-white"
                placeholder="Category Title"
              />
              <button
                onClick={() => removeCategory(catIndex)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                title="Remove Category"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="pl-9 space-y-4">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-gray-500 cursor-move" />
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#f9c602]">
                      {renderIcon(item.icon)}
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400">
                        Link Name
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(
                            catIndex,
                            itemIndex,
                            "name",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#f9c602]/50 text-sm"
                        placeholder="e.g. Contact Us"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400">
                        URL (href)
                      </label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) =>
                          updateItem(
                            catIndex,
                            itemIndex,
                            "href",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#f9c602]/50 text-sm"
                        placeholder="e.g. /contact"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400">
                        Icon
                      </label>
                      <Select
                        value={item.icon}
                        onValueChange={(val) =>
                          updateItem(catIndex, itemIndex, "icon", val || "")
                        }
                      >
                        <SelectTrigger className="w-full h-auto py-2 px-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#f9c602]/50 focus:border-[#f9c602]/50 transition-colors">
                          <SelectValue placeholder="Select Icon" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#392f5f] border-white/10 text-white">
                          {AVAILABLE_ICONS.map((icon) => (
                            <SelectItem key={icon} value={icon}>
                              {icon}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(catIndex, itemIndex)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors self-end sm:self-center"
                    title="Remove Link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => addItem(catIndex)}
                className="flex items-center gap-2 text-sm font-semibold text-[#f9c602] hover:text-[#e0b201] transition-colors mt-4"
              >
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
