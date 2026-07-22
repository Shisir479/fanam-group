"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getBrandingSettingsAdmin,
  updateBrandingSettingsAdmin,
} from "@/services/settings.service";
import { Save, Loader2 } from "lucide-react";

export default function EditContactInfoClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [fullBrandingData, setFullBrandingData] = useState<any>(null);

  const [contactInfo, setContactInfo] = useState({
    address: "",
    addressOnMap: "",
    lat: "23.8103",
    long: "90.4125",
    email: "",
    phone: "",
    whatsappNo: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getBrandingSettingsAdmin();
      if (res.success && res.data) {
        setSettingsId(res.data._id);
        setFullBrandingData(res.data);
        if (res.data.contact) {
          setContactInfo({
            address: res.data.contact.address || "",
            addressOnMap: res.data.contact.addressOnMap || "",
            lat: res.data.contact.lat || "23.8103",
            long: res.data.contact.long || "90.4125",
            email: res.data.contact.email || "",
            phone: res.data.contact.phone || "",
            whatsappNo: res.data.contact.whatsappNo || "",
          });
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch settings");
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors resize-y"
              placeholder="123 Bonedi Estate Blvd,&#10;Gulshan 1, Dhaka 1212"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
