import Image from "next/image";
import Link from "next/link";
import { PageBanner } from "@/components/ui/PageBanner";
import { getServicesPublic } from "@/services/service.service";
import { ServiceType } from "@/services/service.service";

export default async function ServicesPage() {
  let services: ServiceType[] = [];
  try {
    const res = await getServicesPublic({
      status: "active",
      sort: "sortOrder",
      order: "asc",
    });
    if (res?.success) {
      services = res.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch services", error);
  }

  return (
    <main className="w-full min-h-screen bg-[#f9fafb]">
      <PageBanner
        title="Our Premium Services"
        subtitle="Delivering unparalleled excellence through our comprehensive real estate solutions."
        bgImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
        altText="Services Background"
      />

      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 flex flex-col gap-16 md:gap-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service._id || index}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-12 md:gap-24 group`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative">
                  <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden shadow-xl ">
                    <Image
                      src={service.image?.url || "/placeholder.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                    {/* Elegant overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent opacity-60 mix-blend-multiply" />
                  </div>

                  {/* Decorative background element */}
                  <div
                    className={`absolute -z-10 top-8 bottom-8 w-full bg-[#4ea24b]/10 transition-transform duration-700 ${
                      isEven
                        ? "-right-8 group-hover:translate-x-4"
                        : "-left-8 group-hover:-translate-x-4"
                    }`}
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-[#4ea24b]" />
                    <span className="text-[#4ea24b] font-semibold tracking-[0.2em] uppercase text-sm">
                      {service.category}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-brand-blue leading-[1.1] mb-5 uppercase">
                    {service.name}
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">
                    {service.shortDescription}
                  </p>

                  <div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-4 text-sm font-bold text-brand-blue uppercase tracking-wider group/btn"
                    >
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-full">
                          Discover More
                        </span>
                        <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0 text-[#4ea24b]">
                          Discover More
                        </span>
                      </span>
                      <div className="w-10 h-10 border border-brand-blue/20 flex items-center justify-center transition-colors duration-300 group-hover/btn:border-[#4ea24b] group-hover/btn:bg-[#4ea24b]">
                        <svg
                          className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300 group-hover/btn:text-white"
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
