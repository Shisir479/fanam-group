import { constructMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Briefcase, MapPin, Clock, ArrowLeft, Building, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getJobById } from "@/services/job.service";
import JobDetailsClient from "@/components/careers/JobDetailsClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const res = await getJobById(resolvedParams.id);
    const job = res?.data;
    if (!job) return constructMetadata({ title: "Job Not Found" });
    return constructMetadata({
      title: `${job.jobTitle} - Fanam Group Careers`,
      description: job.jobSummary || `Apply for ${job.jobTitle} at Fanam Group`,
    });
  } catch (error) {
    return constructMetadata({ title: "Job Not Found" });
  }
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let job = null;

  try {
    const res = await getJobById(resolvedParams.id);
    job = res?.data;
  } catch (error) {
    // Handle error
  }

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20 text-gray-900">
      {/* Job Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Link href="/careers" className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-gray-900 transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {job.company && (
                  <div className="text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full text-xs">
                    {job.company}
                  </div>
                )}
                {job.category && (
                  <div className="text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full text-xs">
                    {job.category}
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">{job.jobTitle}</h1>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="flex items-center gap-1.5 text-gray-700 bg-white px-3.5 py-1.5 rounded-full text-sm font-medium border border-gray-200">
                  <MapPin className="w-4 h-4 text-blue-500" /> {job.location}
                </span>
                <span className="flex items-center gap-1.5 text-gray-700 bg-white px-3.5 py-1.5 rounded-full text-sm font-medium border border-gray-200">
                  <Briefcase className="w-4 h-4 text-emerald-500" /> {job.employmentType}
                </span>
                {job.workMode && (
                  <span className="flex items-center gap-1.5 text-gray-700 bg-white px-3.5 py-1.5 rounded-full text-sm font-medium border border-gray-200">
                    <Building className="w-4 h-4 text-indigo-500" /> {job.workMode}
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-start lg:items-end gap-3 mt-6 lg:mt-0">
              <a
                href="#apply-section"
                className="bg-yellow-500 text-gray-900 font-bold px-8 py-3.5 rounded-full hover:bg-yellow-400 transition-colors shadow-sm text-center w-full lg:w-auto"
              >
                Apply for this Position
              </a>
              {job.applicationDeadline && (
                <p className="text-sm text-red-600 font-semibold flex items-center justify-center lg:justify-end gap-1.5 w-full lg:w-auto bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                  <Clock className="w-4 h-4" /> Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-16" id="apply-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex flex-col lg:flex-row gap-12">
          {/* Left Column: Continuous Content */}
          <div className="flex-1 space-y-16">
            {/* Summary & Description */}
            <div className="space-y-8">
              {job.jobSummary && (
                <div className="prose prose-lg max-w-none text-gray-600">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Job Summary</h2>
                  <p className="leading-relaxed">{job.jobSummary}</p>
                </div>
              )}

              <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Job Description</h2>
                <div dangerouslySetInnerHTML={{ __html: job.jobDescription }}></div>
              </div>
            </div>

            {/* Requirements */}
            {(job.responsibilities?.length > 0 || job.skills?.length > 0) && (
              <div className="space-y-10 pt-8 border-t border-gray-200/60">
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Key Responsibilities</h2>
                    <ul className="space-y-4">
                      {job.responsibilities.map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-4 text-gray-600 text-lg">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0 mt-2.5" />
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {job.skills && job.skills.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full font-medium text-sm border border-yellow-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Benefits & Info */}
            {(job.benefits?.length > 0 || job.additionalInformation) && (
              <div className="space-y-10 pt-8 border-t border-gray-200/60">
                {job.benefits && job.benefits.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Perks & Benefits</h2>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                      {job.benefits.map((benefit: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 text-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {job.additionalInformation && (
                  <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Additional Information</h2>
                    <div dangerouslySetInnerHTML={{ __html: job.additionalInformation }}></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Tabbed Sidebar */}
          <div className="lg:w-[400px] shrink-0">
            <JobDetailsClient job={job} />
          </div>
        </div>
      </section>
    </main>
  );
}
