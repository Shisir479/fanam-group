import { PageBanner } from "@/components/ui/PageBanner";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockReveal } from "@/components/ui/BlockReveal";

// Reuse the same services data for simplicity
const services = [
  {
    title: "Residential Properties",
    slug: "residential-properties",
    subtitle: "Find your dream home",
    description:
      "Discover luxury apartments, penthouses, and bespoke villas designed for comfort and modern living. We specialize in curating properties that offer an exceptional lifestyle, combining elegant design with practical functionality. Our residential properties are located in prime areas, ensuring you get the best of city life while enjoying a peaceful retreat.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Prime Locations",
        desc: "Situated in the most sought-after neighborhoods.",
      },
      {
        title: "Modern Architecture",
        desc: "Contemporary designs that stand out.",
      },
      {
        title: "Spacious Interiors",
        desc: "Thoughtfully planned for maximum comfort.",
      },
      {
        title: "Smart Home Integration",
        desc: "Equipped with the latest technology.",
      },
    ],
  },
  {
    title: "Commercial Spaces",
    slug: "commercial-spaces",
    subtitle: "Elevate your business",
    description:
      "State-of-the-art office buildings and retail spaces tailored for business success and growth. Our commercial properties are designed to foster innovation and productivity, providing businesses with the infrastructure they need to thrive. From sleek corporate offices to bustling retail hubs, we offer spaces that elevate your brand.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Strategic Business Hubs",
        desc: "Located where commerce thrives.",
      },
      {
        title: "Flexible Floor Plans",
        desc: "Adaptable spaces for any business size.",
      },
      {
        title: "High-Speed Connectivity",
        desc: "Pre-wired for maximum digital efficiency.",
      },
      {
        title: "Premium Facilities",
        desc: "Top-tier amenities for your team and clients.",
      },
    ],
  },
  {
    title: "Interior Design",
    slug: "interior-design",
    subtitle: "Artistry in every corner",
    description:
      "Transforming empty spaces into beautifully curated environments that reflect your personality. Our interior design team works closely with you to understand your vision and bring it to life. We focus on creating spaces that are not only visually stunning but also highly functional, ensuring every corner serves a purpose.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Custom Furniture",
        desc: "Bespoke pieces tailored to your style.",
      },
      {
        title: "Space Optimization",
        desc: "Making the most of every square foot.",
      },
      {
        title: "Lighting Design",
        desc: "Creating the perfect ambiance.",
      },
      {
        title: "Sustainable Materials",
        desc: "Eco-friendly choices for a greener future.",
      },
    ],
  },
  {
    title: "Property Management",
    slug: "property-management",
    subtitle: "Hassle-free investments",
    description:
      "Comprehensive management services ensuring your investments are maintained and profitable. We handle everything from tenant screening and rent collection to property maintenance and financial reporting. Our goal is to provide peace of mind to property owners, knowing their investments are in capable hands.",
    image:
      "https://images.unsplash.com/photo-1628859250369-c513b3468843?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Tenant Management",
        desc: "Thorough screening and continuous support.",
      },
      {
        title: "Routine Maintenance",
        desc: "Keeping your property in pristine condition.",
      },
      {
        title: "Financial Reporting",
        desc: "Transparent and detailed financial statements.",
      },
      {
        title: "24/7 Support",
        desc: "Always available for emergencies.",
      },
    ],
  },
];

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#f9fafb]">
      <PageBanner
        title={service.title}
        subtitle={service.subtitle}
        bgImage={service.image}
        altText={service.title}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          {/* Overview Section */}
          <div className="flex flex-col md:flex-row gap-16 items-center mb-24 group">
            {/* Image side */}
            <div className="w-full md:w-1/2 relative">
              <div className="relative h-[400px] md:h-[550px] w-full ">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent mix-blend-multiply opacity-50" />
              </div>
              <div className="absolute -z-10 top-8 bottom-8 -left-8 w-full bg-[#4ea24b]/10 transition-transform duration-700 group-hover:-translate-x-4" />
            </div>

            {/* Text side */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <BlockReveal color="var(--color-brand-blue)">
                  <span className="text-gray-400 font-semibold tracking-[0.2em] uppercase text-sm">
                    Service Overview
                  </span>
                </BlockReveal>
              </div>
              <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue uppercase mb-6 leading-tight">
                  Discover The <br /> Difference
                </h2>
              </BlockReveal>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                {service.description}
              </p>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="mb-24">
            <div className="mb-12">
              <div className="mb-4">
                <BlockReveal color="var(--color-brand-blue)">
                  <span className="text-gray-400 font-semibold tracking-[0.2em] uppercase text-sm">
                    Our Core Strengths
                  </span>
                </BlockReveal>
              </div>
              <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
                <h3 className="text-3xl md:text-4xl font-bold text-brand-blue uppercase mb-4">
                  Why Choose Us
                </h3>
              </BlockReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-8 border border-gray-100 shadow-sm  group/card flex flex-col items-start"
                >
                  <div className="w-14 h-14 bg-brand-blue/5 flex items-center justify-center mb-6 group-hover/card:bg-[#4ea24b]/10 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-brand-blue group-hover/card:text-[#4ea24b] transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-brand-blue mb-3 group-hover/card:text-[#4ea24b] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
