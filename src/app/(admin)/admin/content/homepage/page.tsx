"use client";

import { useState, useRef } from "react";
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
  Globe,
} from "lucide-react";

export default function HomepageManagement() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);

  // Drag to scroll logic (Optimized for 60FPS using refs instead of state)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollContainerRef.current) {
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5; // Slightly multiplied for a snappy feel
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const tabs = [
    {
      id: "hero",
      label: "Hero Banner",
      icon: <Layout className="w-3.5 h-3.5" />,
    },
    {
      id: "about",
      label: "About Section",
      icon: <Info className="w-3.5 h-3.5" />,
    },
    {
      id: "projects",
      label: "Featured Projects",
      icon: <Building className="w-3.5 h-3.5" />,
    },
    {
      id: "overview",
      label: "Company Overview",
      icon: <Globe className="w-3.5 h-3.5" />,
    },
    {
      id: "why-us",
      label: "Why Choose Us",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Award className="w-3.5 h-3.5" />,
    },
    {
      id: "services",
      label: "Services",
      icon: <Settings className="w-3.5 h-3.5" />,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <Star className="w-3.5 h-3.5" />,
    },
    {
      id: "gallery",
      label: "Gallery Preview",
      icon: <ImageIcon className="w-3.5 h-3.5" />,
    },
    {
      id: "news",
      label: "Latest News",
      icon: <FileText className="w-3.5 h-3.5" />,
    },
    {
      id: "video",
      label: "Video Section",
      icon: <Video className="w-3.5 h-3.5" />,
    },
    {
      id: "cta",
      label: "Inquiry CTA",
      icon: <MessageSquare className="w-3.5 h-3.5" />,
    },
    {
      id: "contact",
      label: "Contact Info",
      icon: <PhoneCall className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12 flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex justify-between items-center glass-panel p-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Homepage Management</h2>
          <p className="text-sm text-gray-300 mt-1">
            Manage content for:{" "}
            <span className="font-semibold text-white">
              {tabs.find((t) => t.id === activeTab)?.label}
            </span>
          </p>
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

      {/* Horizontal Tabs Header */}
      <div className="w-full glass-panel overflow-hidden relative">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2 px-6 gap-2 pb-3 select-none cursor-pointer [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white/20 text-white shadow-md shadow-black/10 border border-white/10"
                  : "text-gray-300 border border-transparent"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        <form className="space-y-6" onSubmit={handleSave}>
          {/* TAB: HERO BANNER */}
          {activeTab === "hero" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Layout className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Hero Banner</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5" /> Main Heading
                    </label>
                    <input
                      type="text"
                      defaultValue="A Legacy of Elegance and Trust"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5" /> Subheading
                    </label>
                    <textarea
                      rows={2}
                      defaultValue="Discover Premium Real Estate Properties"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" /> Background
                      Image/Video
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        defaultValue="/videos/hero-bg.mp4"
                        className="flex-1 px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white"
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors text-sm"
                      >
                        Upload File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: ABOUT SECTION */}
          {activeTab === "about" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Info className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">About Section</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Section Title
                  </label>
                  <input
                    type="text"
                    defaultValue="Who We Are"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Description text
                  </label>
                  <textarea
                    rows={5}
                    defaultValue="Bonedi has been a cornerstone of premium real estate development..."
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Images (Left/Right composition)
                  </label>
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
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white">Featured Projects</h3>
                </div>
                <button
                  type="button"
                  className="text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm flex items-center gap-1 hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" /> Select Projects
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-300 mb-4">
                  Select which projects should appear in the Featured Projects
                  carousel on the homepage.
                </p>
                <div className="border border-white/20 rounded-lg divide-y divide-white/10 overflow-hidden">
                  <div className="p-3 flex items-center justify-between bg-black/20 hover:bg-white/5">
                    <span className="font-medium text-sm text-white">
                      Bonedi Swapno Neer
                    </span>
                    <button
                      type="button"
                      className="text-red-400 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-black/20 hover:bg-white/5">
                    <span className="font-medium text-sm text-white">
                      Bonedi Rupkotha
                    </span>
                    <button
                      type="button"
                      className="text-red-400 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-black/20 hover:bg-white/5">
                    <span className="font-medium text-sm text-white">
                      Bonedi Vista
                    </span>
                    <button
                      type="button"
                      className="text-red-400 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: COMPANY OVERVIEW */}
          {activeTab === "overview" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Globe className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Company Overview</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                    Section Title
                  </label>
                  <input
                    type="text"
                    defaultValue="About Bonedi"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                    Overview Text
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="We are a leading real estate developer..."
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white"
                  />
                </div>
              </div>
            </section>
          )}

          {/* TAB: WHY CHOOSE US */}
          {activeTab === "why-us" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Why Choose Us</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Section Title
                  </label>
                  <input
                    type="text"
                    defaultValue="Why Choose Bonedi"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-200">
                    Selling Points
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="border border-white/10 bg-black/10 rounded-lg p-4 space-y-3 relative group hover:bg-white/5 transition-colors"
                      >
                        <button
                          type="button"
                          className="absolute top-3 right-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <input
                          type="text"
                          placeholder="Title (e.g. Premium Quality)"
                          defaultValue={`Point ${i}`}
                          className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-white/30"
                        />
                        <textarea
                          rows={2}
                          placeholder="Description..."
                          className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                        ></textarea>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add New Point
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* TAB: ACHIEVEMENTS */}
          {activeTab === "achievements" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Award className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Achievements</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Years Experience", value: "15+" },
                    { label: "Completed Projects", value: "200+" },
                    { label: "Happy Clients", value: "10k+" },
                    { label: "Awards Won", value: "25+" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2"
                    >
                      <input
                        type="text"
                        defaultValue={stat.value}
                        className="w-full text-2xl font-bold text-center bg-transparent border-b border-white/20 focus:border-white/50 outline-none text-white pb-1"
                      />
                      <input
                        type="text"
                        defaultValue={stat.label}
                        className="w-full text-sm text-center bg-transparent border-none outline-none text-gray-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB: SERVICES */}
          {activeTab === "services" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white">Services</h3>
                </div>
                <button
                  type="button"
                  className="text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm flex items-center gap-1 hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-black/20 border border-white/10 rounded-lg p-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        defaultValue={`Service ${i}`}
                        className="w-full bg-transparent border-none text-white font-medium outline-none"
                      />
                      <input
                        type="text"
                        defaultValue="Short description of the service offered."
                        className="w-full bg-transparent border-none text-sm text-gray-400 outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white">Testimonials</h3>
                </div>
                <button
                  type="button"
                  className="text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm flex items-center gap-1 hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" /> Add Review
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="border border-white/10 bg-black/10 rounded-lg p-4 space-y-3 relative group"
                  >
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <textarea
                      rows={3}
                      defaultValue="Outstanding service and beautiful properties."
                      className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md text-sm text-white focus:outline-none resize-none"
                    ></textarea>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        defaultValue={`Client Name ${i}`}
                        className="flex-1 px-3 py-1.5 bg-black/20 border border-white/10 rounded-md text-sm text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        defaultValue="5"
                        className="w-16 px-3 py-1.5 bg-black/20 border border-white/10 rounded-md text-sm text-white text-center focus:outline-none"
                        title="Rating"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB: GALLERY */}
          {activeTab === "gallery" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Gallery Preview</h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-300">
                  Select images to highlight on the homepage gallery section.
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-black/20 border border-white/10 rounded-lg relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <ImageIcon className="w-8 h-8 opacity-20" />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="aspect-square border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    <Plus className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">Add Image</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* TAB: LATEST NEWS */}
          {activeTab === "news" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Latest News</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Section Title
                  </label>
                  <input
                    type="text"
                    defaultValue="Latest Insights"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 outline-none text-white"
                  />
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-300 mb-3">
                    Currently showing 3 most recent articles automatically.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    Configure News Display
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* TAB: VIDEO */}
          {activeTab === "video" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Video className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Video Section</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Video Title
                  </label>
                  <input
                    type="text"
                    defaultValue="Experience Bonedi Luxury"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    YouTube/Vimeo URL
                  </label>
                  <div className="flex gap-2">
                    <div className="bg-black/20 border border-white/20 rounded-lg px-3 py-2 flex items-center justify-center shrink-0">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      defaultValue="https://youtube.com/..."
                      className="flex-1 px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Custom Thumbnail
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      defaultValue="/images/video-thumb.jpg"
                      className="flex-1 px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white"
                      readOnly
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors text-sm"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: INQUIRY CTA */}
          {activeTab === "cta" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Inquiry CTA</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    CTA Headline
                  </label>
                  <input
                    type="text"
                    defaultValue="Ready to find your dream home?"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Button Text
                  </label>
                  <input
                    type="text"
                    defaultValue="Contact Us Now"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Background Style
                  </label>
                  <select className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white appearance-none">
                    <option value="solid" className="text-black">
                      Solid Color
                    </option>
                    <option value="image" className="text-black" selected>
                      Background Image
                    </option>
                    <option value="gradient" className="text-black">
                      Gradient
                    </option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* TAB: CONTACT INFO */}
          {activeTab === "contact" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Contact Info</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200">
                    Display Address
                  </label>
                  <textarea
                    rows={2}
                    defaultValue="123 Luxury Avenue, Metropolis"
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none resize-none text-white"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="inquiries@bonedi.com"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg outline-none text-white"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}
