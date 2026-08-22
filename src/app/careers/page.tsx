import { constructMetadata } from "@/lib/metadata";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getJobsPublic } from "@/services/job.service";
import CareersClient from "@/components/careers/CareersClient";

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
      <section className="bg-white pt-20 pb-12 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Left Content */}
            <div className="lg:w-1/2 flex flex-col items-start text-left">
              <h1 className="text-4xl lg:text-6xl font-semibold text-black leading-[1.1] mb-5 tracking-tight">
                Be Yourself <br /> And Join Us Today.
              </h1>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-lg mb-8">
                From meaningful products to innovative and long-lasting
                companies, we strongly believe that nothing significant was ever
                achieved by oneself — create the future of commerce with us!
              </p>
              <a
                href="#openings"
                className="inline-flex items-center justify-center gap-3 bg-[#f9c602] text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span> SEE
                OPEN ROLES
              </a>
            </div>

            {/* Right Images (Collage) */}
            <div className="lg:w-1/2 relative h-[400px] lg:h-[500px] w-full">
              {/* Image 1: Top Left - Horizontal Oval */}
              <div className="absolute top-[2%] left-[2%] w-[62%] h-[40%] rounded-[100px] md:rounded-[120px] overflow-hidden z-10">
                <Image
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Image 2: Bottom Left - Circle */}
              <div className="absolute bottom-[8%] left-[12%] w-[26%] aspect-square rounded-full overflow-hidden z-20">
                <Image
                  src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image 3: Bottom Middle - Vertical Oval */}
              <div className="absolute bottom-[4%] left-[41%] w-[22%] h-[48%] rounded-full overflow-hidden z-30">
                <Image
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image 4: Right - Large Pill */}
              <div className="absolute top-[3%] right-[2%] w-[32%] h-[94%] rounded-full overflow-hidden z-10">
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
