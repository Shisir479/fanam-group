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
      <section id="openings" className="py-20 bg-white ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
              Join Us
            </h2>
            <p className="text-xl text-black font-medium uppercase tracking-widest">
              Available jobs
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-black/10">
              <p className="text-black font-medium">
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
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/10 border-r-4 border-r-brand-gold flex flex-col h-full p-6 md:p-8 hover:shadow-md transition-shadow">
                    {/* Content Area */}
                    {job.company && (
                      <p className="text-gray-500 text-sm font-bold mb-2">
                        {job.company}
                      </p>
                    )}
                    <h3 className="text-2xl font-extrabold text-black mb-3 leading-tight transition-colors">
                      {job.jobTitle}
                    </h3>

                    {job.jobSummary && (
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {job.jobSummary}
                      </p>
                    )}

                    {job.salary && (
                      <p className="text-black font-extrabold text-base mb-6">
                        Salary : {job.salary}
                      </p>
                    )}

                    {/* Bottom Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-black/10">
                      <div className="flex gap-2">
                        {job.category && (
                          <span className="bg-white text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/10">
                            {job.category}
                          </span>
                        )}
                        {job.employmentType && (
                          <span className="bg-white text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/10">
                            {job.employmentType}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 font-semibold text-sm">
                        <MapPin className="w-4 h-4 text-[#f9c602]" />{" "}
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
      <section className="py-24 bg-white ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/10 bg-white">
            {/* Left Side (Dark) */}
            <div className="md:w-5/12 bg-[#392F5F] p-10 md:p-14 flex flex-col justify-center text-white">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8">
                <UploadCloud className="w-8 h-8 text-[#f9c602]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6 text-white">
                Can't find <br />{" "}
                <span className="font-bold">the right fit?</span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
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
                    <label className="block text-sm text-black mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-black font-medium"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-black mb-2 font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-black font-medium"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-black mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-black font-medium"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-black mb-2 font-medium">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData({ ...formData, coverLetter: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-black font-medium resize-none"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-center">
                  <div className="relative w-full h-[52px] px-4 rounded-xl border border-dashed border-black/10 text-center hover:border-brand-gold transition-colors cursor-pointer flex items-center justify-center gap-2 bg-white/50 overflow-hidden">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <UploadCloud className="w-5 h-5 text-black shrink-0 relative z-0" />
                    <span className="text-black text-sm font-medium relative z-0 truncate max-w-[80%]">
                      {cvFile ? cvFile.name : "Upload CV/Resume"}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] bg-brand-gold text-black font-bold rounded-xl hover:bg-brand-gold transition-colors text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
