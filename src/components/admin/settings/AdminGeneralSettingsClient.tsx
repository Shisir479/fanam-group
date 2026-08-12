"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateBrandingSettingsAdmin } from "@/services/settings.service";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Save, Loader2, ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminGeneralSettingsClient({
  initialData,
}: {
  initialData: any;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const [mainSettings, setMainSettings] = useState({
    businessName: initialData?.main?.businessName || "",
    domainName: initialData?.main?.domainName || "",
    websiteStatus: initialData?.main?.websiteStatus ?? true,
    offlineMessage: initialData?.main?.offlineMessage || "",
    mission: initialData?.main?.mission || "",
    vision: initialData?.main?.vision || "",
    gaId: initialData?.main?.gaId || "",
    gtmId: initialData?.main?.gtmId || "",
    seo: {
      metaTitle: initialData?.main?.seo?.metaTitle || "",
      metaDescription: initialData?.main?.seo?.metaDescription || "",
      description: initialData?.main?.seo?.description || "",
      tags: initialData?.main?.seo?.tags || [],
    },
  });

  const handleMainChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMainSettings({ ...mainSettings, [e.target.name]: e.target.value });
  };

  const handleSeoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMainSettings({
      ...mainSettings,
      seo: { ...mainSettings.seo, [e.target.name]: e.target.value },
    });
  };

  const [logo, setLogo] = useState(
    initialData?.logoLight || initialData?.logo || { _id: "", url: "" },
  );
  const [favicon, setFavicon] = useState(
    initialData?.favicon || { _id: "", url: "" },
  );

  const [fullBrandingData, setFullBrandingData] = useState<any>(
    initialData || null,
  );
  const [fullMainData, setFullMainData] = useState<any>(
    initialData?.main || null,
  );
  const [settingsId, setSettingsId] = useState<string>(initialData?._id || "");
  const [mainSettingsId, setMainSettingsId] = useState<string>(
    initialData?.main?._id || "",
  );
  const [socialLinks, setSocialLinks] = useState({
    facebook: initialData?.socialLinks?.facebook || "",
    instagram: initialData?.socialLinks?.instagram || "",
    linkedin: initialData?.socialLinks?.linkedin || "",
    twitter: initialData?.socialLinks?.twitter || "",
    youtube: initialData?.socialLinks?.youtube || "",
  });

  const [themeColors, setThemeColors] = useState({
    primary: initialData?.theme?.palette?.primary || "#1C6BD2",
    secondary: initialData?.theme?.palette?.secondary || "#2288EB",
    paperLight: initialData?.theme?.palette?.paperLight || "#FFFFFF",
    paperDark: initialData?.theme?.palette?.paperDark || "#212B36",
    defaultDark: initialData?.theme?.palette?.defaultDark || "#161C24",
    defaultLight: initialData?.theme?.palette?.defaultLight || "#F9FAFB",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { getBrandingSettingsAdmin, getMainSettingsAdmin } =
          await import("@/services/settings.service");
        const [brandingRes, mainRes] = await Promise.all([
          getBrandingSettingsAdmin(),
          getMainSettingsAdmin(),
        ]);

        if (brandingRes.success && brandingRes.data) {
          setFullBrandingData(brandingRes.data);
          setSettingsId(brandingRes.data._id);
          setLogo(
            brandingRes.data.logoLight ||
              brandingRes.data.logo || { _id: "", url: "" },
          );
          setFavicon(brandingRes.data.favicon || { _id: "", url: "" });
          setSocialLinks({
            facebook: brandingRes.data.socialLinks?.facebook || "",
            instagram: brandingRes.data.socialLinks?.instagram || "",
            linkedin: brandingRes.data.socialLinks?.linkedin || "",
            twitter: brandingRes.data.socialLinks?.twitter || "",
            youtube: brandingRes.data.socialLinks?.youtube || "",
          });
          setThemeColors({
            primary: brandingRes.data.theme?.palette?.primary || "#1C6BD2",
            secondary: brandingRes.data.theme?.palette?.secondary || "#2288EB",
            paperLight:
              brandingRes.data.theme?.palette?.paperLight || "#FFFFFF",
            paperDark: brandingRes.data.theme?.palette?.paperDark || "#212B36",
            defaultDark:
              brandingRes.data.theme?.palette?.defaultDark || "#161C24",
            defaultLight:
              brandingRes.data.theme?.palette?.defaultLight || "#F9FAFB",
          });
        }

        if (mainRes.success && mainRes.data) {
          setFullMainData(mainRes.data);
          setMainSettingsId(mainRes.data._id);
          setMainSettings({
            businessName: mainRes.data.businessName || "",
            domainName: mainRes.data.domainName || "",
            websiteStatus: mainRes.data.websiteStatus ?? true,
            offlineMessage: mainRes.data.offlineMessage || "",
            mission: mainRes.data.mission || "",
            vision: mainRes.data.vision || "",
            gaId:
              mainRes.data.gaId === "********" ? "" : mainRes.data.gaId || "",
            gtmId:
              mainRes.data.gtmId === "********" ? "" : mainRes.data.gtmId || "",
            seo: {
              metaTitle: mainRes.data.seo?.metaTitle || "",
              metaDescription: mainRes.data.seo?.metaDescription || "",
              description: mainRes.data.seo?.description || "",
              tags: mainRes.data.seo?.tags || [],
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings client-side", error);
      }
    };
    fetchSettings();
  }, []);

  const { uploadSingle, isUploading } = useImageUpload();
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeColors({ ...themeColors, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const res = await uploadSingle(file);
      if (res && res._id) {
        setLogo({ _id: res._id, url: res.url });
        toast.success("Logo uploaded successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleFaviconUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFavicon(true);
    try {
      const res = await uploadSingle(file);
      if (res && res._id) {
        setFavicon({ _id: res._id, url: res.url });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsId || !fullBrandingData) {
      toast.error("Settings ID not found.");
      return;
    }

    setIsSaving(true);
    try {
      const { updateBrandingSettingsAdmin, updateMainSettingsAdmin } =
        await import("@/services/settings.service");

      const updatedBranding = {
        ...fullBrandingData,
        socialLinks,
        theme: {
          ...(fullBrandingData.theme || {}),
          palette: {
            ...(fullBrandingData.theme?.palette || {}),
            ...themeColors,
          },
        },
        logoLight: logo,
        logo,
        favicon,
      };

      const updatedMain = {
        ...fullMainData,
        ...mainSettings,
        // Only update GA/GTM if they changed, since backend might mask them with ********
        ...(mainSettings.gaId ? { gaId: mainSettings.gaId } : {}),
        ...(mainSettings.gtmId ? { gtmId: mainSettings.gtmId } : {}),
      };

      const promises = [
        updateBrandingSettingsAdmin(settingsId, updatedBranding),
      ];
      if (mainSettingsId) {
        promises.push(
          updateMainSettingsAdmin(mainSettingsId, updatedMain) as any,
        );
      }

      const results = await Promise.all(promises);
      const allSuccess = results.every((res) => res && res.success !== false);

      if (allSuccess) {
        toast.success("Settings updated successfully!");
        setFullBrandingData(updatedBranding);
        setFullMainData(updatedMain);
        router.refresh();
      } else {
        toast.error("Some settings failed to update");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] pb-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            General Settings
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your website's logo, branding, and social links.
          </p>
        </div>
        <button
          form="general-settings-form"
          type="submit"
          disabled={isSaving || isUploading}
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

      <form
        id="general-settings-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Settings */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">
                Core Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={mainSettings.businessName}
                    onChange={handleMainChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    name="domainName"
                    value={mainSettings.domainName}
                    onChange={handleMainChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={mainSettings.seo.metaTitle}
                    onChange={handleSeoChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={mainSettings.seo.metaDescription}
                    onChange={handleSeoChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={mainSettings.seo.description}
                    onChange={handleSeoChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={mainSettings.seo.tags.join(", ")}
                    onChange={(e) =>
                      setMainSettings({
                        ...mainSettings,
                        seo: {
                          ...mainSettings.seo,
                          tags: e.target.value.split(",").map((t) => t.trim()),
                        },
                      })
                    }
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
              </div>
            </div>
            {/* Social Links */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">
                Social Links
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={socialLinks.facebook}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={socialLinks.instagram}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={socialLinks.linkedin}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={socialLinks.twitter}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    YouTube
                  </label>
                  <input
                    type="url"
                    name="youtube"
                    value={socialLinks.youtube}
                    onChange={handleSocialChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">Site Logo</h3>

              <div className="relative aspect-video rounded-xl border-2 border-dashed border-white/20 bg-black/20 hover:border-yellow-500/50 transition-colors overflow-hidden group">
                {logo.url ? (
                  <>
                    <Image
                      src={logo.url}
                      alt="Logo"
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setLogo({ _id: "", url: "" })}
                        className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    {uploadingLogo ? (
                      <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
                    ) : (
                      <>
                        <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-400">
                          Upload Logo
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 2MB
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Favicon Upload */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">Favicon</h3>

              <div className="relative aspect-square w-32 mx-auto rounded-xl border-2 border-dashed border-white/20 bg-black/20 hover:border-yellow-500/50 transition-colors overflow-hidden group">
                {favicon.url ? (
                  <>
                    <Image
                      src={favicon.url}
                      alt="Favicon"
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setFavicon({ _id: "", url: "" })}
                        className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    {uploadingFavicon ? (
                      <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
                    ) : (
                      <>
                        <ImagePlus className="w-6 h-6 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-400 text-center px-2">
                          Upload Favicon
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      disabled={uploadingFavicon}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
