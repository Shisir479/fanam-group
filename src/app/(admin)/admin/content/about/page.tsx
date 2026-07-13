"use client";

import { useState, useRef } from "react";
import {
  Save,
  Info,
  Target,
  Users,
  Image as ImageIcon,
  Type,
  Plus,
  Eye,
} from "lucide-react";

export default function AboutManagement() {
  const [activeTab, setActiveTab] = useState("history");
  const [isSaving, setIsSaving] = useState(false);

  // Drag to scroll logic
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
      const walk = (x - startX.current) * 2;
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
      id: "history",
      label: "Company History",
      icon: <Info className="w-3.5 h-3.5" />,
    },
    {
      id: "mission",
      label: "Mission & Vision",
      icon: <Target className="w-3.5 h-3.5" />,
    },
    {
      id: "team",
      label: "Team Members",
      icon: <Users className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            About Management
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage content for:{" "}
            <strong className="text-white font-medium">
              {tabs.find((t) => t.id === activeTab)?.label}
            </strong>
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
          {/* TAB: HISTORY */}
          {activeTab === "history" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Info className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Company History</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5" /> Section Title
                    </label>
                    <input
                      type="text"
                      defaultValue="Our Heritage"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5" /> Story Text
                    </label>
                    <textarea
                      rows={6}
                      defaultValue="Founded with a vision to redefine real estate..."
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" /> History Image
                    </label>
                    <div className="border-2 border-dashed border-white/20 bg-black/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-gray-300 hover:bg-white/5 hover:border-white/40 cursor-pointer transition-colors">
                      <Plus className="w-8 h-8" />
                      <span className="font-medium">Upload Image</span>
                      <span className="text-xs text-gray-400">
                        JPG, PNG or WEBP (Max 2MB)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: MISSION & VISION */}
          {activeTab === "mission" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <Target className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">Mission & Vision</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mission */}
                  <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <Target className="w-4 h-4" /> Mission Statement
                    </h4>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-300">
                        Content
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="To build homes that stand the test of time..."
                        className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Vision Statement
                    </h4>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-300">
                        Content
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="To be the most trusted real estate developer in the nation..."
                        className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 outline-none transition-all resize-none text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: TEAM MEMBERS */}
          {activeTab === "team" && (
            <section className="glass-panel overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white">Team Members</h3>
                </div>
                <button
                  type="button"
                  className="text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm flex items-center gap-1 hover:bg-white/20 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Member
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Team Card Dummy */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-black/20 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center gap-3 relative group"
                    >
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-400/10 rounded"
                      >
                        Delete
                      </button>
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                        <Users className="w-8 h-8 text-white/30" />
                      </div>
                      <div>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full text-center bg-transparent border-b border-white/10 focus:border-white/50 font-bold text-white outline-none mb-1"
                        />
                        <input
                          type="text"
                          defaultValue="Managing Director"
                          className="w-full text-center bg-transparent border-b border-transparent focus:border-white/50 text-sm text-gray-400 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}
