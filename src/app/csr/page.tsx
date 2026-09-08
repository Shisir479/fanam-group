import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getBannerByPageAdmin } from "@/services/banner.service";
import { PageBanner } from "@/components/ui/PageBanner";
import { CSRActivities } from "@/components/about/CSRActivities";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Corporate Social Responsibility - Fanam Group",
  description:
    "Learn about Fanam Group's Corporate Social Responsibility (CSR) initiatives and how we give back to the community.",
});

export default async function CSRPage() {
  let banner = null;
  try {
    const res = await getBannerByPageAdmin("csr");
    if (res?.success) {
      banner = res.data;
    }
  } catch (e) {}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageBanner
        title={banner?.title || "Corporate Social Responsibility"}
        subtitle={banner?.eyebrowText || "Making a Difference"}
        bgImage={
          banner?.backgroundImage ||
          "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070"
        }
        altText={banner?.title || "CSR"}
      >
        {banner?.description && (
          <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mt-4">
            {banner.description}
          </p>
        )}
      </PageBanner>

      {/* Intro Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f9c602]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#392f5f]/5 text-[#392f5f] text-[10px] font-bold uppercase tracking-wider mb-6">
                Our Commitment
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering Communities, <br />
                <span className="text-[#f9c602]">Enriching Lives</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                At Fanam Group, we believe that true corporate success goes hand
                in hand with social progress. Our Corporate Social
                Responsibility (CSR) initiatives are deeply woven into our
                business ethos.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                We are dedicated to fostering sustainable growth, supporting
                underprivileged communities, and protecting the environment to
                create a better tomorrow for everyone.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#392F5F] text-white flex items-center justify-center shadow-lg">
                  <HeartHandshake className="w-8 h-8 text-[#f9c602]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">100,000+</h4>
                  <p className="text-sm text-gray-500 font-medium">
                    Lives Impacted
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974"
                alt="Community Care"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#392f5f]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Sustainable Impact
                </h3>
                <p className="text-white/80">
                  Working hand-in-hand with locals to build resilient
                  communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives - Reusing the beautiful component */}
      <CSRActivities />

      {/* CTA Section */}
      <section className="py-24 bg-[#392F5F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent blur-2xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Join Hands for a{" "}
            <span className="text-[#f9c602]">Better Future</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking to partner on a social project or just want
            to learn more about our ongoing initiatives, we'd love to hear from
            you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#f9c602] text-[#392f5f] px-6 py-3 rounded-full text-sm font-bold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(249,198,2,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
