import { BlockReveal } from "@/components/ui/BlockReveal";
import { Building2, Home, Landmark, ShieldCheck } from "lucide-react";

export function OrganizationalOverview({ data }: { data: any }) {
  const defaultDepartments = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Residential Development",
      description:
        "Focuses on crafting premium apartments and luxury villas with modern amenities.",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Commercial Spaces",
      description:
        "Develops high-end corporate office spaces and retail complexes in prime locations.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quality Assurance",
      description:
        "Ensures all projects meet strict international safety and quality standards.",
    },
    {
      icon: <Landmark className="w-8 h-8" />,
      title: "Property Management",
      description:
        "Provides comprehensive post-handover maintenance and community management services.",
    },
  ];

  const departments =
    data?.departments?.length > 0
      ? data.departments.map((d: any, i: number) => ({
          ...d,
          icon: defaultDepartments[i % defaultDepartments.length].icon,
        }))
      : defaultDepartments;

  if (!data) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 ">
      <div className="container mx-auto px-5 md:px-16">
        {/* Header Section (Left Aligned) */}
        <div className="flex flex-col items-start text-left max-w-3xl mb-16 gap-6">
          <div className="flex flex-col items-start gap-4">
            <BlockReveal color="var(--color-brand-blue)">
              <div className="flex items-center text-[12px] md:text-[14px] font-semibold tracking-[0.25em] text-gray-400 uppercase">
                {data?.organizationTitle || "STRUCTURE"}
              </div>
            </BlockReveal>
            <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-tight uppercase">
                {data?.organizationHeading || "Organizational Overview"}
              </h2>
            </BlockReveal>
          </div>

          <div
            className="text-gray-500 text-[15px] leading-relaxed font-light mt-2 max-w-2xl prose max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                data?.organizationDescription ||
                "Bonedi Homes is structured to deliver end-to-end real estate solutions. From initial architectural conceptualization to final property management, our specialized divisions work in seamless harmony to ensure the flawless execution of every project.",
            }}
          />
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept: any, index: number) => (
            <div
              key={index}
              className="bg-white shadow-sm p-6 md:p-8  transition-all duration-500 flex flex-col group relative overflow-hidden"
            >
              {/* Elegant Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>

              {/* Icon Container */}
              <div className="w-14 h-14 bg-gray-50 flex items-center justify-center  text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500">
                {dept.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-medium text-brand-blue mb-3 ">
                {dept.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
