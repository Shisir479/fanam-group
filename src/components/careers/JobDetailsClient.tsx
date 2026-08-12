"use client";

import { useState } from "react";
import {
  Hash,
  Building,
  Award,
  Briefcase,
  Banknote,
  Clock,
  GraduationCap,
  Calendar,
  UploadCloud,
} from "lucide-react";
import { submitApplicationPublic } from "@/services/application.service";
import { useImageUpload } from "@/hooks/useImageUpload";

interface Props {
  job: any;
}

export default function JobDetailsClient({ job }: Props) {
  const [sidebarTab, setSidebarTab] = useState("overview");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { uploadSingle } = useImageUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }
    if (!cvFile) {
      setSubmitStatus({ type: "error", message: "Please upload your resume." });
      return;
    }

    setSubmitting(true);
    try {
      const uploadData = await uploadSingle(cvFile, true);
      if (!uploadData || !uploadData.url) {
        throw new Error("Failed to upload CV. Please try again.");
      }

      const payload = {
        jobId: job._id,
        applicantName: formData.name,
        email: formData.email,
        phone: formData.phone,
        cvUrl: uploadData.url,
        appliedAt: new Date().toISOString(),
      };

      const submitRes = await submitApplicationPublic(payload);
      if (submitRes.success) {
        setSubmitStatus({
          type: "success",
          message: "Application submitted successfully!",
        });
        setFormData({ name: "", email: "", phone: "" });
        setCvFile(null);
      } else {
        throw new Error(submitRes.message || "Failed to submit application");
      }
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-32">
      {/* Sidebar Tabs */}
      <div className="flex bg-gray-50 p-1.5 rounded-full mb-8 border border-gray-100">
        <button
          onClick={() => setSidebarTab("overview")}
          className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all duration-200 text-center ${sidebarTab === "overview" ? "bg-yellow-500 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
        >
          Job Overview
        </button>
        <button
          onClick={() => setSidebarTab("apply")}
          className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all duration-200 text-center ${sidebarTab === "apply" ? "bg-yellow-500 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
        >
          Apply Now
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="min-h-[400px]">
        {/* OVERVIEW TAB */}
        {sidebarTab === "overview" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {job.jobId && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Hash className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Job ID
                  </p>
                  <p className="font-medium text-gray-900">{job.jobId}</p>
                </div>
              </div>
            )}
            {job.department && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Department
                  </p>
                  <p className="font-medium text-gray-900">{job.department}</p>
                </div>
              </div>
            )}
            {job.designation && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Level
                  </p>
                  <p className="font-medium text-gray-900">{job.designation}</p>
                </div>
              </div>
            )}
            {job.vacancies > 0 && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Vacancies
                  </p>
                  <p className="font-medium text-gray-900">{job.vacancies}</p>
                </div>
              </div>
            )}
            {job.salary && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <Banknote className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Salary
                  </p>
                  <p className="font-medium text-gray-900">{job.salary}</p>
                </div>
              </div>
            )}
            {job.experience && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Experience
                  </p>
                  <p className="font-medium text-gray-900">{job.experience}</p>
                </div>
              </div>
            )}
            {job.education && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Education
                  </p>
                  <p className="font-medium text-gray-900">{job.education}</p>
                </div>
              </div>
            )}
            {job.publishDate && (
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Published On
                  </p>
                  <p className="font-medium text-gray-900">
                    {new Date(job.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* APPLY TAB */}
        {sidebarTab === "apply" && (
          <div className="animate-in fade-in duration-300">
            {job.applicationMethod === "Online Form" ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {submitStatus && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${submitStatus.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-gray-900 text-sm transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-gray-900 text-sm transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-gray-900 text-sm transition-all"
                    placeholder="+880 1XXXXXXXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Resume / CV (PDF)
                  </label>
                  <div className="relative w-full px-4 py-6 rounded-xl border border-dashed border-gray-300 text-center hover:border-gray-900 transition-colors cursor-pointer bg-gray-50 group overflow-hidden">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-gray-900 mx-auto mb-2 transition-colors relative z-0 shrink-0" />
                    <p className="text-gray-400 text-xs font-medium group-hover:text-gray-900 transition-colors relative z-0 truncate max-w-[90%] mx-auto">
                      {cvFile ? cvFile.name : "Click to upload file"}
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-yellow-500 text-gray-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors mt-4 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-6">
                  Please apply using the external link below.
                </p>
                <p className="font-semibold text-gray-900 p-4 bg-gray-50 rounded-xl">
                  {job.applicationMethod}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
