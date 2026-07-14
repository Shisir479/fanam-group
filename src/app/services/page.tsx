import Image from "next/image";
import Link from "next/link";
import { PageBanner } from "@/components/ui/PageBanner";

const services = [
  {
    title: "Residential Properties",
    description:
      "Discover luxury apartments, penthouses, and bespoke villas designed for comfort and modern living. We specialize in curating properties that offer an exceptional lifestyle, combining elegant design with practical functionality.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    href: "/services/residential-properties",
    subtitle: "Find your dream home",
  },
  {
    title: "Commercial Spaces",
    description:
      "State-of-the-art office buildings and retail spaces tailored for business success and growth. Our commercial properties are designed to foster innovation and productivity, providing businesses with the infrastructure they need.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    href: "/services/commercial-spaces",
    subtitle: "Elevate your business",
  },
  {
    title: "Interior Design",
    description:
      "Transforming empty spaces into beautifully curated environments that reflect your personality. Our interior design team works closely with you to understand your vision and bring it to life with exquisite detail.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    href: "/services/interior-design",
    subtitle: "Artistry in every corner",
  },
  {
    title: "Property Management",
    description:
      "Comprehensive management services ensuring your investments are maintained and profitable. We handle everything from tenant screening and rent collection to property maintenance and financial reporting.",
    image:
      "https://images.unsplash.com/photo-1628859250369-c513b3468843?q=80&w=1200&auto=format&fit=crop",
    href: "/services/property-management",
    subtitle: "Hassle-free investments",
  },
];

export default function ServicesPage() {
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
                key={index}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-12 md:gap-24 group`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative">
                  <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden shadow-xl ">
                    <Image
                      src={service.image}
                      alt={service.title}
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
                      {service.subtitle}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-brand-blue leading-[1.1] mb-5 uppercase">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-none border border-brand-blue bg-transparent px-6 py-2.5 text-sm font-bold uppercase text-brand-blue transition-colors duration-300 hover:text-white self-start"
                  >
                    <span className="absolute inset-0 h-full w-full -translate-x-full bg-brand-blue transition-transform duration-500 ease-out group-hover/btn:translate-x-0" />
                    <span className="relative flex items-center gap-2 z-10 tracking-wider">
                      Discover Details
                      <svg
                        className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1"
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
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
