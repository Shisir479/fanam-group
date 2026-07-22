import { PageBanner } from "@/components/ui/PageBanner";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockReveal } from "@/components/ui/BlockReveal";
import {
  getServiceBySlugPublic,
  getServicesPublic,
} from "@/services/service.service";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let service: any = null;
  try {
    const res = await getServiceBySlugPublic(resolvedParams.slug);
    if (res?.success) service = res.data;
  } catch (error) {}

  if (!service) return constructMetadata({ title: "Service Not Found" });

  return constructMetadata({
    title: `${service.name || service.title} - Bonedi Homes Services`,
    description: service.shortDescription || service.description,
  });
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let service: any = null;
  let otherServices: any[] = [];

  try {
    const res = await getServiceBySlugPublic(resolvedParams.slug);
    if (res?.success && res.data) {
      service = res.data;
    }

    const servicesRes = await getServicesPublic({ status: "active", limit: 5 });
    if (servicesRes?.success && servicesRes.data) {
      otherServices = servicesRes.data.filter(
        (s: any) => s.slug !== resolvedParams.slug,
      );
    }
  } catch (error) {
    console.error("Failed to fetch service", error);
  }

  if (!service) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#f9fafb]">
      <PageBanner
        title={service.name}
        subtitle={service.heading}
        bgImage={
          service.image?.url ||
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
        }
        altText={service.name}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-16 flex flex-col lg:flex-row gap-16">
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3">
            <div className="relative w-full aspect-video  overflow-hidden shadow-2xl mb-12 group">
              <Image
                src={service.image?.url || "/placeholder.jpg"}
                alt={service.name}
                fill
                className="object-cover "
              />
              <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" />
            </div>

            <BlockReveal color="var(--color-brand-blue)">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue leading-[1.2] mb-6 uppercase">
                {service.heading}
              </h2>
            </BlockReveal>

            {/* Rendering Rich Text Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-brand-blue prose-headings:font-bold prose-headings:uppercase prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#4ea24b] prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600 marker:text-[#4ea24b]"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              {/* Other Services Box */}
              {otherServices.length > 0 && (
                <div className="bg-white p-8 shadow-sm border-t-4 border-[#4ea24b]">
                  <h3 className="text-xl font-bold text-brand-blue mb-6 uppercase">
                    Other Services
                  </h3>
                  <ul className="space-y-4">
                    {otherServices.map((s, idx) => (
                      <li key={idx}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block p-4 bg-gray-50 hover:bg-[#4ea24b] text-gray-700 hover:text-white font-medium transition-colors border border-gray-100 hover:border-[#4ea24b] group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="line-clamp-1">{s.name}</span>
                            <svg
                              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/services"
                        className="block mt-4 p-4 text-[#4ea24b] font-bold uppercase text-center border-2 border-[#4ea24b] hover:bg-[#4ea24b] hover:text-white transition-colors"
                      >
                        View All Services
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* CTA Box */}
              <div className="relative overflow-hidden bg-brand-blue p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ea24b] rounded-bl-full opacity-20 transform translate-x-8 -translate-y-8" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#CBA35E] rounded-tr-full opacity-20 transform -translate-x-8 translate-y-8" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/10 flex items-center justify-center rounded-full mb-6">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                    Need Consultation?
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm">
                    Contact our experts today to discuss your requirements.
                  </p>

                  <Link
                    href="/contact"
                    className="w-full text-center py-4 bg-[#4ea24b] hover:bg-[#3d853a] text-white font-bold tracking-wider transition-colors uppercase text-sm"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
