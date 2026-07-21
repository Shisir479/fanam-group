"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { updateAboutAdmin } from "@/services/about.service";
import { uploadSingleImage } from "@/services/upload.service";
import { Save, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";
export default function EditAboutClient({ initialData }: { initialData: any }) {
  const [activeTab, setActiveTab] = useState("company");
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>(initialData || {
    heroTitle: "", heroSubtitle: "",
    companyTitle: "", companyHeading: "", companyDescription: "", experience: 0, completedProjects: 0,
    chairmanTitle: "", chairmanHeading: "", chairmanMessage: "", chairmanName: "", chairmanDesignation: "", chairmanVideo: "",
    visionTitle: "", visionHeading: "", visionDescription: "",
    missionTitle: "", missionHeading: "", missionDescription: "",
    organizationTitle: "", organizationHeading: "", organizationDescription: "",
    coreValues: [], timeline: [], departments: [], boardMembers: []
  });

  // Image files for upload
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [companyFile, setCompanyFile] = useState<File | null>(null);
  const [chairmanFile, setChairmanFile] = useState<File | null>(null);
  const [boardFiles, setBoardFiles] = useState<{ [key: number]: File }>({});

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const toastId = toast.loading("Saving changes...");

      let payload = { ...formData };

      // Upload Hero Image
      if (heroFile) {
        toast.loading("Uploading Hero Image...", { id: toastId });
        const res = await uploadSingleImage(heroFile);
        if (res.success) payload.heroImage = { _id: res.data[0]._id || res.data[0].url, url: res.data[0].url };
      }
      
      // Upload Company Image
      if (companyFile) {
        toast.loading("Uploading Company Image...", { id: toastId });
        const res = await uploadSingleImage(companyFile);
        if (res.success) payload.companyImage = { _id: res.data[0]._id || res.data[0].url, url: res.data[0].url };
      }

      // Upload Chairman Image
      if (chairmanFile) {
        toast.loading("Uploading Chairman Image...", { id: toastId });
        const res = await uploadSingleImage(chairmanFile);
        if (res.success) payload.chairmanImage = { _id: res.data[0]._id || res.data[0].url, url: res.data[0].url };
      }

      // Upload Board Files
      let newBoardMembers = [...(payload.boardMembers || [])];
      for (const idx in boardFiles) {
        toast.loading(`Uploading Board Member Image...`, { id: toastId });
        const res = await uploadSingleImage(boardFiles[idx]);
        if (res.success) {
          newBoardMembers[idx] = { ...newBoardMembers[idx], image: { _id: res.data[0]._id || res.data[0].url, url: res.data[0].url } };
        }
      }
      payload.boardMembers = newBoardMembers;

      toast.loading("Saving to database...", { id: toastId });
      const res = await updateAboutAdmin(payload);
      
      if (res.success) {
        toast.success("About page updated successfully!", { id: toastId });
        setBoardFiles({});
        setHeroFile(null);
        setCompanyFile(null);
        setChairmanFile(null);
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update About page");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "company", label: "Company & Stats" },
    { id: "chairman", label: "Chairman Message" },
    { id: "vision", label: "Vision & Mission" },
    { id: "board", label: "Board Members" },
    { id: "values", label: "Core Values" },
    { id: "history", label: "Company History" },
    { id: "org", label: "Organization" },
  ];

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

  return (
    <div className="space-y-6 max-w-[1400px] pb-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Manage About Page</h2>
          <p className="text-sm text-gray-400 mt-1">Configure all public-facing about content.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="glass-btn disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="w-full glass-panel overflow-hidden relative">
        <div 
          className="flex overflow-x-auto gap-2 p-2 cursor-grab active:cursor-grabbing hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={handleMouseMove}
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
          `}</style>
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              draggable={false}
              onClick={() => setActiveTab(tab.id)} 
              className={`whitespace-nowrap select-none flex-shrink-0 transition-all ${activeTab === tab.id ? 'glass-btn' : 'px-[1rem] py-[0.46rem] text-[0.825rem] border border-transparent rounded-full font-medium hover:bg-white/10 text-gray-400'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        {/* ... Similar structures for other tabs ... */}
        {activeTab === "company" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Company Title</label>
                <input type="text" value={formData.companyTitle} onChange={(e) => setFormData({...formData, companyTitle: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Company Heading</label>
                <input type="text" value={formData.companyHeading} onChange={(e) => setFormData({...formData, companyHeading: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Company Description (HTML)</label>
              <RichTextEditor className="mt-2" value={formData.companyDescription} onChange={(val) => setFormData({...formData, companyDescription: val})} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Company Image</label>
              <input type="file" onChange={(e) => e.target.files?.[0] && setCompanyFile(e.target.files[0])} className="w-full mt-2" accept="image/*" />
              {(companyFile || formData.companyImage?.url) && (
                <img src={companyFile ? URL.createObjectURL(companyFile) : formData.companyImage?.url} alt="Preview" className="h-32 mt-2 rounded object-cover" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Years Experience</label>
                <input type="number" value={formData.experience} onChange={(e) => setFormData({...formData, experience: Number(e.target.value)})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Completed Projects</label>
                <input type="number" value={formData.completedProjects} onChange={(e) => setFormData({...formData, completedProjects: Number(e.target.value)})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "chairman" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Chairman Name</label>
                <input type="text" value={formData.chairmanName} onChange={(e) => setFormData({...formData, chairmanName: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Designation</label>
                <input type="text" value={formData.chairmanDesignation} onChange={(e) => setFormData({...formData, chairmanDesignation: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Section Title</label>
                <input type="text" value={formData.chairmanTitle} onChange={(e) => setFormData({...formData, chairmanTitle: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Section Heading</label>
                <input type="text" value={formData.chairmanHeading} onChange={(e) => setFormData({...formData, chairmanHeading: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Message (HTML)</label>
              <RichTextEditor className="mt-2" value={formData.chairmanMessage} onChange={(val) => setFormData({...formData, chairmanMessage: val})} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">YouTube/Vimeo Video URL</label>
              <input type="text" value={formData.chairmanVideo} onChange={(e) => setFormData({...formData, chairmanVideo: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Chairman Image</label>
              <input type="file" onChange={(e) => e.target.files?.[0] && setChairmanFile(e.target.files[0])} className="w-full mt-2" accept="image/*" />
              {(chairmanFile || formData.chairmanImage?.url) && (
                <img src={chairmanFile ? URL.createObjectURL(chairmanFile) : formData.chairmanImage?.url} alt="Preview" className="h-32 mt-2 rounded object-cover" />
              )}
            </div>
          </div>
        )}

        {activeTab === "vision" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Vision</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Vision Title</label>
                <input type="text" value={formData.visionTitle} onChange={(e) => setFormData({...formData, visionTitle: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Vision Heading</label>
                <input type="text" value={formData.visionHeading} onChange={(e) => setFormData({...formData, visionHeading: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Vision Description (HTML)</label>
              <RichTextEditor className="mt-2" value={formData.visionDescription} onChange={(val) => setFormData({...formData, visionDescription: val})} />
            </div>

            <div className="border-t border-white/10 my-6"></div>

            <h3 className="text-xl font-bold">Mission</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Mission Title</label>
                <input type="text" value={formData.missionTitle} onChange={(e) => setFormData({...formData, missionTitle: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Mission Heading</label>
                <input type="text" value={formData.missionHeading} onChange={(e) => setFormData({...formData, missionHeading: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Mission Description (HTML)</label>
              <RichTextEditor className="mt-2" value={formData.missionDescription} onChange={(val) => setFormData({...formData, missionDescription: val})} />
            </div>
          </div>
        )}

        {activeTab === "board" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Board Members</h3>
              <button onClick={() => setFormData({...formData, boardMembers: [...(formData.boardMembers || []), { name: "", designation: "", description: "", linkedin: "" }]})} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Member
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(formData.boardMembers || []).map((member: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                  <div className="flex justify-between">
                    <h4 className="font-bold">Member {idx + 1}</h4>
                    <button onClick={() => setFormData({...formData, boardMembers: formData.boardMembers.filter((_:any, i:number) => i !== idx)})} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <input type="text" placeholder="Name" value={member.name} onChange={(e) => { const arr = [...formData.boardMembers]; arr[idx].name = e.target.value; setFormData({...formData, boardMembers: arr}) }} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-colors" />
                  <input type="text" placeholder="Designation" value={member.designation} onChange={(e) => { const arr = [...formData.boardMembers]; arr[idx].designation = e.target.value; setFormData({...formData, boardMembers: arr}) }} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-colors" />
                  <RichTextEditor placeholder="Description (HTML)" value={member.description} onChange={(val) => { const arr = [...formData.boardMembers]; arr[idx].description = val; setFormData({...formData, boardMembers: arr}) }} />
                  <input type="text" placeholder="LinkedIn URL" value={member.linkedin} onChange={(e) => { const arr = [...formData.boardMembers]; arr[idx].linkedin = e.target.value; setFormData({...formData, boardMembers: arr}) }} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-colors" />
                  <div>
                    <label className="text-sm text-gray-400">Image</label>
                    <input type="file" onChange={(e) => { if(e.target.files?.[0]) setBoardFiles({...boardFiles, [idx]: e.target.files[0]}) }} className="w-full mt-1 text-sm" accept="image/*" />
                    {(boardFiles[idx] || member.image?.url) && (
                      <img src={boardFiles[idx] ? URL.createObjectURL(boardFiles[idx]) : member.image?.url} alt="Preview" className="h-16 mt-2 rounded object-cover" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "values" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Core Values</h3>
              <button onClick={() => setFormData({...formData, coreValues: [...(formData.coreValues || []), { title: "", description: "" }]})} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Value
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.coreValues || []).map((val: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex justify-between">
                    <input type="text" placeholder="Title" value={val.title} onChange={(e) => { const arr = [...formData.coreValues]; arr[idx].title = e.target.value; setFormData({...formData, coreValues: arr}) }} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-colors mr-2" />
                    <button onClick={() => setFormData({...formData, coreValues: formData.coreValues.filter((_:any, i:number) => i !== idx)})} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <AutoResizeTextarea placeholder="Description" value={val.description} onChange={(e) => { const arr = [...formData.coreValues]; arr[idx].description = e.target.value; setFormData({...formData, coreValues: arr}) }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Timeline</h3>
              <button onClick={() => setFormData({...formData, timeline: [...(formData.timeline || []), { year: "", title: "", description: "" }]})} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Milestone
              </button>
            </div>
            <div className="space-y-4">
              {(formData.timeline || []).map((milestone: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0 w-32">
                    <input type="text" placeholder="Year" value={milestone.year} onChange={(e) => { const arr = [...formData.timeline]; arr[idx].year = e.target.value; setFormData({...formData, timeline: arr}) }} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-colors" />
                  </div>
                  <div className="flex-grow space-y-2">
                    <input type="text" placeholder="Title" value={milestone.title} onChange={(e) => { const arr = [...formData.timeline]; arr[idx].title = e.target.value; setFormData({...formData, timeline: arr}) }} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-colors" />
                    <RichTextEditor className="w-full mt-2" placeholder="Description (HTML)" value={milestone.description} onChange={(val) => { const arr = [...formData.timeline]; arr[idx].description = val; setFormData({...formData, timeline: arr}) }} />
                  </div>
                  <button onClick={() => setFormData({...formData, timeline: formData.timeline.filter((_:any, i:number) => i !== idx)})} className="text-red-400 hover:text-red-300 self-start mt-1"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "org" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Organization Title</label>
                <input type="text" value={formData.organizationTitle} onChange={(e) => setFormData({...formData, organizationTitle: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Organization Heading</label>
                <input type="text" value={formData.organizationHeading} onChange={(e) => setFormData({...formData, organizationHeading: e.target.value})} className="w-full px-4 py-2 mt-2 bg-white/5 border border-white/10 rounded-xl outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Organization Description (HTML)</label>
              <RichTextEditor className="mt-2" value={formData.organizationDescription} onChange={(val) => setFormData({...formData, organizationDescription: val})} />
            </div>

            <div className="border-t border-white/10 my-6"></div>
            
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Departments</h3>
              <button onClick={() => setFormData({...formData, departments: [...(formData.departments || []), { title: "", description: "" }]})} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Department
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.departments || []).map((dept: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex justify-between">
                    <input type="text" placeholder="Department Title" value={dept.title} onChange={(e) => { const arr = [...formData.departments]; arr[idx].title = e.target.value; setFormData({...formData, departments: arr}) }} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none transition-colors mr-2" />
                    <button onClick={() => setFormData({...formData, departments: formData.departments.filter((_:any, i:number) => i !== idx)})} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <AutoResizeTextarea placeholder="Description" value={dept.description} onChange={(e) => { const arr = [...formData.departments]; arr[idx].description = e.target.value; setFormData({...formData, departments: arr}) }} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
