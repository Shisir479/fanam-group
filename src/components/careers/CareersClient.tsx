"use client";

import { useState, useEffect } from "react";
import { UploadCloud, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getJobsPublic } from "@/services/job.service";
import { submitApplicationPublic } from "@/services/application.service";
import { useImageUpload } from "@/hooks/useImageUpload";

interface Props {
  initialJobs: any[];
}

export default function CareersClient({ initialJobs }: Props) {
  const [jobs, setJobs] = useState(initialJobs);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
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
        jobId: null,
        applicantName: formData.name,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        cvUrl: uploadData.url,
        appliedAt: new Date().toISOString(),
      };

      const submitRes = await submitApplicationPublic(payload);
      if (submitRes.success) {
        setSubmitStatus({
          type: "success",
          message: "Your CV has been submitted successfully!",
        });
        setFormData({ name: "", email: "", phone: "", coverLetter: "" });
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

  useEffect(() => {
    if (categoryFilter === "All Categories") {
      setJobs(initialJobs);
      return;
    }

    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const data = await getJobsPublic(categoryFilter);
        if (data && data.success) {
          setJobs(data.data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  }, [categoryFilter, initialJobs]);

  return (
    <>
      {/* Open Positions */}
      <section
        id="openings"
        className="py-20 bg-white border-t border-gray-200"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Join Us
            </h2>
            <p className="text-xl text-gray-600 font-medium uppercase tracking-widest">
              Available jobs
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-gray-500 font-medium">
                No open positions available at this time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {jobs.map((job: any) => (
                <Link
                  href={`/careers/${job._id}`}
                  key={job._id}
                  className="block h-full"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 border-r-4 border-r-yellow-400 flex flex-col h-full p-6 md:p-8 hover:shadow-md transition-shadow">
                    {/* Content Area */}
                    {job.company && (
                      <p className="text-gray-500 text-sm font-bold mb-2">
                        {job.company}
                      </p>
                    )}
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight transition-colors">
                      {job.jobTitle}
                    </h3>

                    {job.jobSummary && (
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {job.jobSummary}
                      </p>
                    )}

                    {job.salary && (
                      <p className="text-gray-900 font-extrabold text-base mb-6">
                        Salary : {job.salary}
                      </p>
                    )}

                    {/* Bottom Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-50">
                      <div className="flex gap-2">
                        {job.category && (
                          <span className="bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200">
                            {job.category}
                          </span>
                        )}
                        {job.employmentType && (
                          <span className="bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200">
                            {job.employmentType}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-700 font-semibold text-sm">
                        <MapPin className="w-4 h-4 text-green-600" />{" "}
                        {job.location}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Direct CV Drop */}
      <section className="py-24 bg-white border-t border-gray-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 bg-white">
            {/* Left Side (Dark) */}
            <div className="md:w-5/12 bg-gray-900 p-10 md:p-14 flex flex-col justify-center text-white">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8">
                <UploadCloud className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                Can't find <br />{" "}
                <span className="font-bold">the right fit?</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We are always looking for exceptional talent. Drop your CV in
                our talent pool and we'll reach out when a suitable opportunity
                arises.
              </p>
            </div>

            {/* Right Side (Form) */}
            <div className="md:w-7/12 p-10 md:p-14">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${submitStatus.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all text-gray-900 font-medium"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2 font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all text-gray-900 font-medium"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all text-gray-900 font-medium"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2 font-medium">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData({ ...formData, coverLetter: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all text-gray-900 font-medium resize-none"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-center">
                  <div className="relative w-full h-[52px] px-4 rounded-xl border border-dashed border-gray-300 text-center hover:border-yellow-500 transition-colors cursor-pointer flex items-center justify-center gap-2 bg-gray-50/50 overflow-hidden">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <UploadCloud className="w-5 h-5 text-gray-400 shrink-0 relative z-0" />
                    <span className="text-gray-600 text-sm font-medium relative z-0 truncate max-w-[80%]">
                      {cvFile ? cvFile.name : "Upload CV/Resume"}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] bg-yellow-500 text-gray-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
