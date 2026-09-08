"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateBrandingSettingsAdmin } from "@/services/settings.service";
import { Save, Loader2 } from "lucide-react";

export default function EditContactInfoClient({
  initialData,
}: {
  initialData: any;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const [settingsId, setSettingsId] = useState<string | null>(
    initialData?._id || null,
  );
  const [fullBrandingData, setFullBrandingData] = useState<any>(
    initialData || null,
  );

  const [contactInfo, setContactInfo] = useState({
    address: initialData?.contact?.address || "",
    addressOnMap: initialData?.contact?.addressOnMap || "",
    lat: initialData?.contact?.lat || "23.8103",
    long: initialData?.contact?.long || "90.4125",
    email: initialData?.contact?.email || "",
    phone: initialData?.contact?.phone || "",
    whatsappNo: initialData?.contact?.whatsappNo || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsId || !fullBrandingData) {
      toast.error("Settings ID not found.");
      return;
    }

    setIsSaving(true);
    try {
      // Merge contact info with full branding data because backend overwrites the whole object
      const updatedBranding = {
        ...fullBrandingData,
        contact: {
          ...contactInfo,
        },
      };

      const res = await updateBrandingSettingsAdmin(
        settingsId,
        updatedBranding,
      );

      if (res.success) {
        toast.success("Contact settings updated successfully!");
        // Update local state
        setFullBrandingData(updatedBranding);
      } else {
        toast.error(res.message || "Failed to update settings");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] pb-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Contact Info Settings
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your website's public contact information.
          </p>
        </div>
        <button
          form="contact-form"
          type="submit"
          disabled={isSaving}
          className="glass-btn disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4 mb-6">
          Contact Details
        </h3>

        <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-violet transition-colors"
                placeholder="info@yourcompany.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Phone Number(s)
              </label>
              <input
                type="text"
                name="phone"
                value={contactInfo.phone}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-violet transition-colors"
                placeholder="+880 1711-223344"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsappNo"
                value={contactInfo.whatsappNo}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-violet transition-colors"
                placeholder="+880 1912-345678"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Address on Map (URL or Text)
              </label>
              <input
                type="text"
                name="addressOnMap"
                value={contactInfo.addressOnMap}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-violet transition-colors"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Physical Address
            </label>
            <textarea
              name="address"
              value={contactInfo.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-violet transition-colors resize-y"
              placeholder="123 Bonedi Estate Blvd,&#10;Gulshan 1, Dhaka 1212"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
