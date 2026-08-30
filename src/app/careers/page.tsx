import { constructMetadata } from "@/lib/metadata";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getJobsPublic } from "@/services/job.service";
import CareersClient from "@/components/careers/CareersClient";
import { PageBanner } from "@/components/ui/PageBanner";

export const metadata = constructMetadata({
  title: "Careers",
  description: "Join our team and build the future with Fanam Group.",
});

export default async function CareersPage() {
  let initialJobs = [];
  try {
    const data = await getJobsPublic("All Categories");
    if (data && data.success) {
      initialJobs = data.data;
    }
  } catch (error) {
    // Silently fail, client component will handle empty state
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <PageBanner
        title="Careers"
        subtitle="Be Yourself And Join Us Today"
        bgImage="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920&auto=format&fit=crop"
      ></PageBanner>

      {/* Why Join Us */}
      <section className="py-20 bg-white border-t border-black/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Why Fanam Group?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're looking for individuals who are passionate, driven, and
              ready to make an impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Diverse Opportunities",
                desc: "Work across dynamic industries from real estate to digital media.",
              },
              {
                title: "Growth & Development",
                desc: "We invest heavily in training and promoting leaders from within.",
              },
              {
                title: "Impactful Work",
                desc: "Contribute to projects that directly shape the nation's infrastructure and culture.",
              },
            ].map((perk, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-[#f9c602]/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#f9c602]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {perk.title}
                </h3>
                <p className="text-gray-600">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Client Component for Openings and CV Drop */}
      <CareersClient initialJobs={initialJobs} />
    </main>
  );
}
