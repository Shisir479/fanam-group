"use client";

import { useState } from "react";
import { 
  Save, 
  Image as ImageIcon, 
  Video, 
  Type, 
  Link as LinkIcon, 
  Plus, 
  Trash2,
  Layout,
  Info,
  Building,
  Award,
  Settings,
  Star,
  FileText,
  PhoneCall,
  CheckCircle2,
  MessageSquare,
  Globe
} from "lucide-react";

export default function HomepageManagement() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: <Layout className="w-4 h-4" /> },
    { id: "about", label: "About Section", icon: <Info className="w-4 h-4" /> },
    { id: "projects", label: "Featured Projects", icon: <Building className="w-4 h-4" /> },
    { id: "overview", label: "Company Overview", icon: <Globe className="w-4 h-4" /> },
    { id: "why-us", label: "Why Choose Us", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "achievements", label: "Achievements", icon: <Award className="w-4 h-4" /> },
    { id: "services", label: "Services", icon: <Settings className="w-4 h-4" /> },
    { id: "testimonials", label: "Testimonials", icon: <Star className="w-4 h-4" /> },
    { id: "gallery", label: "Gallery Preview", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "news", label: "Latest News", icon: <FileText className="w-4 h-4" /> },
    { id: "video", label: "Video Section", icon: <Video className="w-4 h-4" /> },
    { id: "cta", label: "Inquiry CTA", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "contact", label: "Contact Info", icon: <PhoneCall className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12 flex flex-col md:flex-row gap-8 items-start">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 shrink-0 glass-panel overflow-hidden sticky top-24">
        <div className="p-4 bg-white/5 border-b border-white/10">
          <h3 className="font-bold text-white">Sections</h3>
        </div>
        <div className="p-2 flex flex-col gap-1 max-h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === tab.id 
                ? "bg-white/20 text-white shadow-md shadow-black/10" 
                : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8 glass-panel p-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Homepage Management</h2>
            <p className="text-sm text-gray-300 mt-1">Manage content for: <span className="font-semibold text-white">{tabs.find(t => t.id === activeTab)?.label}</span></p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-black/10 disabled:opacity-70 border border-white/20"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          
          {/* TAB: HERO BANNER */}
          {activeTab === "hero" && (
            <section className="glass-panel overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Layout className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Hero Banner</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5"><Type className="w-3.5 h-3.5" /> Main Heading</label>
                    <input type="text" defaultValue="A Legacy of Elegance and Trust" className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5"><Type className="w-3.5 h-3.5" /> Subheading</label>
                    <textarea rows={2} defaultValue="Discover Premium Real Estate Properties" className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Background Image/Video</label>
                    <div className="flex gap-3">
                      <input type="text" defaultValue="/videos/hero-bg.mp4" className="flex-1 px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white" />
                      <button type="button" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors text-sm">Upload File</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: ABOUT SECTION */}
          {activeTab === "about" && (
            <section className="glass-panel overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Info className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">About Section</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">Section Title</label>
                  <input type="text" defaultValue="Who We Are" className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">Description text</label>
                  <textarea rows={5} defaultValue="Bonedi has been a cornerstone of premium real estate development..." className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">Images (Left/Right composition)</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="border-2 border-dashed border-white/20 bg-black/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-300 hover:bg-white/5 hover:border-white/40 cursor-pointer transition-colors h-32">
                      <Plus className="w-6 h-6" />
                      <span className="text-sm font-medium">Add Image 1</span>
                    </div>
                    <div className="border-2 border-dashed border-white/20 bg-black/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-300 hover:bg-white/5 hover:border-white/40 cursor-pointer transition-colors h-32">
                      <Plus className="w-6 h-6" />
                      <span className="text-sm font-medium">Add Image 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: FEATURED PROJECTS */}
          {activeTab === "projects" && (
            <section className="glass-panel overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white">Featured Projects</h3>
                </div>
                <button type="button" className="text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm flex items-center gap-1 hover:bg-white/20">
                  <Plus className="w-4 h-4" /> Select Projects
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-300 mb-4">Select which projects should appear in the Featured Projects carousel on the homepage.</p>
                <div className="border border-white/20 rounded-lg divide-y divide-white/10 overflow-hidden">
                  <div className="p-3 flex items-center justify-between bg-black/20 hover:bg-white/5">
                    <span className="font-medium text-sm text-white">Bonedi Swapno Neer</span>
                    <button type="button" className="text-red-400 text-sm hover:underline">Remove</button>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-black/20 hover:bg-white/5">
                    <span className="font-medium text-sm text-white">Bonedi Rupkotha</span>
                    <button type="button" className="text-red-400 text-sm hover:underline">Remove</button>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-black/20 hover:bg-white/5">
                    <span className="font-medium text-sm text-white">Bonedi Vista</span>
                    <button type="button" className="text-red-400 text-sm hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            </section>
          )}

           {/* Placeholder for other tabs (to save space in this initial implementation) */}
           {["overview", "why-us", "achievements", "services", "testimonials", "gallery", "news", "video", "cta", "contact"].includes(activeTab) && (
            <section className="glass-panel overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center p-12 text-center h-64">
                <Settings className="w-12 h-12 text-white/30 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Manage {tabs.find(t => t.id === activeTab)?.label}</h3>
                <p className="text-gray-300 text-sm max-w-sm">Configuration fields for this section will be rendered here. You can customize the headings, text, and imagery specific to this module.</p>
            </section>
          )}

        </form>
      </div>
    </div>
  );
}
