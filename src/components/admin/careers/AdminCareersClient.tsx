"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Briefcase, X, FileText, Settings, AlignLeft, CalendarIcon } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import { getJobsAdmin, createJobAdmin, deleteJobAdmin, updateJobAdmin } from "@/services/job.service";
import { getApplicationsAdmin, updateApplicationStatusAdmin } from "@/services/application.service";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeleteModal } from "@/components/ui/DeleteModal";
import toast from "react-hot-toast";

export default function AdminCareersClient() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [mainTab, setMainTab] = useState("jobs"); // 'jobs' or 'applications'
  const [applications, setApplications] = useState<any[]>([]);
  const [jobFilter, setJobFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editMode, setEditMode] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  // Delete Job Modal State
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Delete Application Modal State
  const [deleteAppTarget, setDeleteAppTarget] = useState<string | null>(null);
  const [isDeletingApp, setIsDeletingApp] = useState(false);

  const [formData, setFormData] = useState({
    jobId: "",
    company: "Fanam Group",
    jobTitle: "",
    category: "",
    department: "",
    designation: "",
    jobLevel: "Mid Level",
    vacancies: 1,
    employmentType: "Full-Time",
    workMode: "Onsite",
    location: "Dhaka, Bangladesh",
    salary: "Negotiable",
    jobSummary: "",
    jobDescription: "",
    responsibilities: "",
    education: "",
    experience: "",
    skills: "",
    benefits: "",
    additionalInformation: "",
    applicationDeadline: "",
    applicationMethod: "Online Form",
    jobStatus: "Open",
    publishDate: new Date().toISOString().split('T')[0], // keep as string internally for now
    expiryDate: "",
    featuredImage: "",
  });

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await getJobsAdmin();
      if (data && data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const data = await getApplicationsAdmin();
      if (data && data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteJobAdmin(deleteTarget);
      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      toast.error("Failed to delete job");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateApplicationStatusAdmin(id, newStatus);
      fetchApplications();
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const confirmDeleteApp = async () => {
    if (!deleteAppTarget) return;
    setIsDeletingApp(true);
    try {
      const { deleteApplicationAdmin } = await import("@/services/application.service");
      await deleteApplicationAdmin(deleteAppTarget);
      toast.success("Application deleted successfully");
      fetchApplications();
    } catch (error) {
      toast.error("Failed to delete application");
    } finally {
      setIsDeletingApp(false);
      setDeleteAppTarget(null);
    }
  };

  const handleEdit = (job: any) => {
    setEditMode(true);
    setCurrentJobId(job._id);
    setFormData({
      jobId: job.jobId || "",
      company: job.company || "",
      jobTitle: job.jobTitle || "",
      category: job.category || "",
      department: job.department || "",
      designation: job.designation || "",
      jobLevel: job.jobLevel || "Mid Level",
      vacancies: job.vacancies || 1,
      employmentType: job.employmentType || "Full-Time",
      workMode: job.workMode || "Onsite",
      location: job.location || "",
      salary: job.salary || "",
      jobSummary: job.jobSummary || "",
      jobDescription: job.jobDescription || "",
      responsibilities: job.responsibilities ? job.responsibilities.join(", ") : "",
      education: job.education || "",
      experience: job.experience || "",
      skills: job.skills ? job.skills.join(", ") : "",
      benefits: job.benefits ? job.benefits.join(", ") : "",
      additionalInformation: job.additionalInformation || "",
      applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : "",
      applicationMethod: job.applicationMethod || "Online Form",
      jobStatus: job.jobStatus || "Open",
      publishDate: job.publishDate ? new Date(job.publishDate).toISOString().split('T')[0] : "",
      expiryDate: job.expiryDate ? new Date(job.expiryDate).toISOString().split('T')[0] : "",
      featuredImage: job.featuredImage || "",
    });
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditMode(false);
    setCurrentJobId(null);
    setFormData({
      jobId: "", company: "Fanam Group", jobTitle: "", category: "", department: "", designation: "", jobLevel: "Mid Level",
      vacancies: 1, employmentType: "Full-Time", workMode: "Onsite", location: "Dhaka, Bangladesh", salary: "Negotiable",
      jobSummary: "", jobDescription: "", responsibilities: "", education: "", experience: "", skills: "", benefits: "",
      additionalInformation: "", applicationDeadline: "", applicationMethod: "Online Form", jobStatus: "Open",
      publishDate: new Date().toISOString().split('T')[0], expiryDate: "", featuredImage: "",
    });
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const reqArray = formData.responsibilities.split(",").map(r => r.trim()).filter(r => r);
      const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(s => s);
      const benefitsArray = formData.benefits.split(",").map(b => b.trim()).filter(b => b);

      const payload = {
        ...formData,
        responsibilities: reqArray,
        skills: skillsArray,
        benefits: benefitsArray,
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline) : null,
        publishDate: formData.publishDate ? new Date(formData.publishDate) : new Date(),
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null,
      };

      if (editMode && currentJobId) {
        await updateJobAdmin(currentJobId, payload);
        toast.success("Job updated successfully");
      } else {
        await createJobAdmin(payload);
        toast.success("Job created successfully");
      }

      setIsModalOpen(false);
      fetchJobs();
    } catch (error: any) {
      toast.error(error.message || "Failed to save job");
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Job Details",
      render: (job) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10"><Briefcase className="w-4 h-4 text-gray-400" /></div>
          <div><div className="font-semibold text-white">{job.jobTitle}</div><div className="text-xs text-gray-400">{job.company} • {job.department}</div></div>
        </div>
      )
    },
    {
      header: "Status",
      render: (j) => {
        const isExpired = j.expiryDate && new Date(j.expiryDate) < new Date();
        const isClosed = j.jobStatus === "Closed" || j.jobStatus === "Paused";
        return (
          <span className={`text-xs font-bold ${isExpired || isClosed ? 'text-red-500' : 'text-green-500'}`}>
            {isExpired ? 'Expired' : j.jobStatus}
          </span>
        )
      }
    },
    {
      header: "Type & Mode",
      render: (j) => <span className="text-gray-300 text-sm">{j.employmentType} • {j.workMode}</span>
    },
    {
      header: "Actions", className: "text-right",
      render: (j) => (
        <div className="space-x-2">
          <button onClick={() => handleEdit(j)} className="text-gray-400 hover:text-green-400"><Edit className="w-4 h-4" /></button>
          <button onClick={() => setDeleteTarget(j._id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  const appColumns: ColumnDef<any>[] = [
    {
      header: "Applicant",
      render: (app) => (
        <div>
          <div className="font-semibold text-white">{app.applicantName}</div>
          <div className="text-xs text-gray-400">{app.email} • {app.phone}</div>
        </div>
      )
    },
    {
      header: "Applied For",
      render: (app) => (
        <span className="text-sm text-gray-300">
          {app.jobId ? app.jobId.jobTitle : <span className="italic text-purple-400">General CV Drop</span>}
        </span>
      )
    },
    {
      header: "Status",
      render: (app) => (
        <Select value={app.status} onValueChange={(val) => handleUpdateStatus(app._id, val)}>
          <SelectTrigger className={`w-[130px] text-xs font-bold px-3 py-1 rounded-full border outline-none h-auto min-h-[32px]
            ${app.status === 'Pending' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10' : 
              app.status === 'Shortlisted' ? 'text-blue-500 border-blue-500/20 bg-blue-500/10' : 
              app.status === 'Hired' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 
              app.status === 'Rejected' ? 'text-red-500 border-red-500/20 bg-red-500/10' : 'text-gray-300 border-white/10 bg-white/5'}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending" className="text-yellow-500 focus:text-yellow-500 font-medium">Pending</SelectItem>
            <SelectItem value="Reviewed" className="text-gray-300 focus:text-gray-300 font-medium">Reviewed</SelectItem>
            <SelectItem value="Shortlisted" className="text-blue-500 focus:text-blue-500 font-medium">Shortlisted</SelectItem>
            <SelectItem value="Hired" className="text-green-500 focus:text-green-500 font-medium">Hired</SelectItem>
            <SelectItem value="Rejected" className="text-red-500 focus:text-red-500 font-medium">Rejected</SelectItem>
          </SelectContent>
        </Select>
      )
    },
    {
      header: "Actions", className: "text-right",
      render: (app) => (
        <div className="flex items-center justify-end gap-3">
          <a href={app.cvUrl} download={`CV_${app.applicantName.replace(/\s+/g, '_')}`} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
            <FileText className="w-4 h-4" /> Download CV
          </a>
          <button onClick={() => setDeleteAppTarget(app._id)} className="text-gray-400 hover:text-red-400" title="Delete Application">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Careers & Jobs</h2>
          <p className="text-gray-400 text-sm">Manage dynamic job postings and applicant CVs.</p>
        </div>
        <button onClick={openCreateModal} className="glass-btn"><Plus className="w-4 h-4" /> Post New Job</button>
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button 
          onClick={() => setMainTab("jobs")} 
          className={`px-4 py-2 rounded-xl text-sm font-medium outline-none focus:outline-none transition-all ${mainTab === "jobs" ? "bg-white/10 text-white border border-white/10" : "text-gray-400 hover:text-white border border-transparent"}`}
        >
          Job Postings ({jobs.length})
        </button>
        <button 
          onClick={() => setMainTab("applications")} 
          className={`px-4 py-2 rounded-xl text-sm font-medium outline-none focus:outline-none transition-all ${mainTab === "applications" ? "bg-white/10 text-white border border-white/10" : "text-gray-400 hover:text-white border border-transparent"}`}
        >
          Applications & CVs ({applications.length})
        </button>
      </div>

      <div className="min-h-[500px]">
        {mainTab === "jobs" ? (
          <AdminTable columns={columns} data={jobs} isLoading={isLoading} keyExtractor={(j) => j._id} />
        ) : (
          <div className="space-y-4">
            <div className="flex gap-4">
              <Select value={jobFilter} onValueChange={(val) => setJobFilter(val || "All")}>
                <SelectTrigger className="w-auto min-w-[200px] bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:ring-0">
                  <SelectValue>
                    {jobFilter === "All" ? "All Applications" :
                     jobFilter === "General" ? "General CV Drop" :
                     jobs.find((j: any) => j._id === jobFilter)?.jobTitle || "Select Job"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Applications</SelectItem>
                  <SelectItem value="General">General CV Drop</SelectItem>
                  {jobs.map((j: any) => (
                    <SelectItem key={j._id} value={j._id}>{j.jobTitle}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "All")}>
                <SelectTrigger className="w-[150px] bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:ring-0">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Reviewed">Reviewed</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AdminTable 
              columns={appColumns} 
              data={applications.filter((app: any) => {
                let jobMatch = true;
                if (jobFilter === "General") {
                  jobMatch = !app.jobId;
                } else if (jobFilter !== "All") {
                  jobMatch = app.jobId?._id === jobFilter;
                }
                let statusMatch = true;
                if (statusFilter !== "All") {
                  statusMatch = app.status === statusFilter;
                }
                return jobMatch && statusMatch;
              })} 
              isLoading={isLoading} 
              keyExtractor={(a) => a._id} 
            />
          </div>
        )}
      </div>

      {/* Post Job Modal - Full Screen */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="glass-panel rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col border border-white/10 shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0 bg-white/5">
              <h3 className="text-xl font-bold text-white tracking-wide">{editMode ? 'Edit Job' : 'Post New Job'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Modal Body with Tabs */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">

              {/* Tabs Sidebar */}
              <div className="w-full md:w-64 border-r border-white/10 p-4 shrink-0 overflow-y-auto">
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => setActiveTab("basic")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm outline-none focus:outline-none transition-all ${activeTab === 'basic' ? 'bg-white/10 text-white border border-white/10' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                      <FileText className="w-4 h-4" /> Basic Information
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab("details")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm outline-none focus:outline-none transition-all ${activeTab === 'details' ? 'bg-white/10 text-white border border-white/10' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                      <AlignLeft className="w-4 h-4" /> Description & Skills
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm outline-none focus:outline-none transition-all ${activeTab === 'settings' ? 'bg-white/10 text-white border border-white/10' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                      <Settings className="w-4 h-4" /> Dates & Settings
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <form id="jobForm" onSubmit={handleSubmit} className="space-y-6">

                  {/* TAB 1: BASIC INFO */}
                  <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                    <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Job ID</label><input value={formData.jobId} onChange={e => setFormData({ ...formData, jobId: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" placeholder="e.g. ENG-2023-01" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Company *</label><input required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Job Title *</label><input required value={formData.jobTitle} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Category</label><input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" placeholder="e.g. Engineering, Marketing" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Department</label><input value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Designation</label><input value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Job Level</label><select value={formData.jobLevel} onChange={e => setFormData({ ...formData, jobLevel: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors [&>option]:bg-gray-900"><option>Entry Level</option><option>Mid Level</option><option>Senior Level</option><option>Executive</option></select></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Vacancies</label><input type="number" min="1" value={formData.vacancies} onChange={e => setFormData({ ...formData, vacancies: parseInt(e.target.value) })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Location *</label><input required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Salary</label><input value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" /></div>
                    </div>
                  </div>

                  {/* TAB 2: DESCRIPTION & SKILLS */}
                  <div className={activeTab === 'details' ? 'block' : 'hidden'}>
                    <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Description & Skills</h4>
                    <div className="space-y-5">
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Job Summary (Short text)</label><textarea rows={2} value={formData.jobSummary} onChange={e => setFormData({ ...formData, jobSummary: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Job Description (HTML allowed) *</label><textarea required rows={5} value={formData.jobDescription} onChange={e => setFormData({ ...formData, jobDescription: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Responsibilities (Comma separated list)</label><textarea rows={3} value={formData.responsibilities} onChange={e => setFormData({ ...formData, responsibilities: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Lead teams, Architect solutions, Write clean code..." /></div>
                      <div className="grid grid-cols-2 gap-5">
                        <div><label className="text-sm font-semibold text-gray-200 block mb-1">Education</label><input value={formData.education} onChange={e => setFormData({ ...formData, education: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" placeholder="B.Sc in Computer Science" /></div>
                        <div><label className="text-sm font-semibold text-gray-200 block mb-1">Experience</label><input value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" placeholder="5+ years" /></div>
                      </div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Skills (Comma separated)</label><input value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" placeholder="React, Node.js, Leadership" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Benefits (Comma separated list)</label><textarea rows={2} value={formData.benefits} onChange={e => setFormData({ ...formData, benefits: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Health Insurance, Remote Work, Bonuses" /></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Additional Information (HTML allowed)</label><textarea rows={2} value={formData.additionalInformation} onChange={e => setFormData({ ...formData, additionalInformation: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none" /></div>
                    </div>
                  </div>

                  {/* TAB 3: SETTINGS & DATES */}
                  <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
                    <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Settings & Dates</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Employment Type</label><select value={formData.employmentType} onChange={e => setFormData({ ...formData, employmentType: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors [&>option]:bg-gray-900"><option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Internship</option><option>Freelance</option></select></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Work Mode</label><select value={formData.workMode} onChange={e => setFormData({ ...formData, workMode: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors [&>option]:bg-gray-900"><option>Onsite</option><option>Remote</option><option>Hybrid</option></select></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Job Status</label><select value={formData.jobStatus} onChange={e => setFormData({ ...formData, jobStatus: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors [&>option]:bg-gray-900"><option>Open</option><option>Closed</option><option>Paused</option></select></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Application Method</label><select value={formData.applicationMethod} onChange={e => setFormData({ ...formData, applicationMethod: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors [&>option]:bg-gray-900"><option>Online Form</option><option>Email</option><option>External Link</option></select></div>
                      <div><label className="text-sm font-semibold text-gray-200 block mb-1">Featured Image URL</label><input value={formData.featuredImage} onChange={e => setFormData({ ...formData, featuredImage: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" placeholder="https://..." /></div>

                      <div>
                        <label className="text-sm font-semibold text-gray-200 block mb-1">Publish Date</label>
                        <Popover>
                          <PopoverTrigger className={`w-full flex justify-between items-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors ${!formData.publishDate ? "text-gray-400" : "text-white"}`}>
                            {formData.publishDate ? format(new Date(formData.publishDate), "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.publishDate ? new Date(formData.publishDate) : undefined}
                              onSelect={(date) => setFormData({ ...formData, publishDate: date ? format(date, "yyyy-MM-dd") : "" })}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-200 block mb-1">Application Deadline</label>
                        <Popover>
                          <PopoverTrigger className={`w-full flex justify-between items-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors ${!formData.applicationDeadline ? "text-gray-400" : "text-white"}`}>
                            {formData.applicationDeadline ? format(new Date(formData.applicationDeadline), "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.applicationDeadline ? new Date(formData.applicationDeadline) : undefined}
                              onSelect={(date) => setFormData({ ...formData, applicationDeadline: date ? format(date, "yyyy-MM-dd") : "" })}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-200 block mb-1">Expiry Date (Job will hide on frontend)</label>
                        <Popover>
                          <PopoverTrigger className={`w-full flex justify-between items-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors ${!formData.expiryDate ? "text-gray-400" : "text-white"}`}>
                            {formData.expiryDate ? format(new Date(formData.expiryDate), "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.expiryDate ? new Date(formData.expiryDate) : undefined}
                              onSelect={(date) => setFormData({ ...formData, expiryDate: date ? format(date, "yyyy-MM-dd") : "" })}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-6 border-t border-white/10 shrink-0 bg-white/5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeTab === 'basic' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className={`w-2 h-2 rounded-full ${activeTab === 'details' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className={`w-2 h-2 rounded-full ${activeTab === 'settings' ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-red-600  transition-colors">Cancel</button>
                <button form="jobForm" type="submit" className="glass-btn flex items-center gap-2">Save & Post Job</button>
              </div>
            </div>

          </div>
        </div>
      )}

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Job"
        description="Are you sure you want to delete this job posting? It will be permanently removed from the database."
      />

      <DeleteModal
        isOpen={!!deleteAppTarget}
        onClose={() => setDeleteAppTarget(null)}
        onConfirm={confirmDeleteApp}
        isLoading={isDeletingApp}
        title="Delete Application"
        description="Are you sure you want to delete this application? This action cannot be undone."
      />
    </div>
  );
}
