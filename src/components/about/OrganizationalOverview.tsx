import {
  Building2,
  Home,
  Landmark,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

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
    <section className="fanam-section bg-gray-50 relative overflow-hidden">
      <div className="fanam-container">
        {/* Header Section (Left Aligned) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
          <div className="flex flex-col gap-3 flex-1 max-w-2xl">
            <h2 className="text-3xl md:text-[32px] leading-tight font-serif font-bold text-[#181428] break-words">
              {data?.organizationHeading || "Organizational Overview"}
            </h2>
          </div>

          <div className="hidden lg:block w-[1.5px] h-20 bg-[#f9c602]/30 mx-4 shrink-0"></div>

          <div className="flex-1 lg:max-w-[450px] min-w-0">
            <div
              className="text-[#181428]/80 leading-relaxed text-[13px] font-medium prose prose-p:break-words whitespace-normal break-words max-w-none w-full"
              dangerouslySetInnerHTML={{
                __html:
                  data?.organizationDescription ||
                  "Fanam Group is structured to deliver end-to-end solutions. From initial conceptualization to final management, our specialized divisions work in seamless harmony to ensure the flawless execution of every project.",
              }}
            />
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept: any, index: number) => (
            <div key={index} className="relative">
              <div className="group/dept flex flex-col relative h-full transition-all duration-500 cursor-pointer">
                {/* Icon Header */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 text-[#181428] group-hover/dept:bg-[#f9c602] group-hover/dept:text-white group-hover/dept:border-[#f9c602] group-hover/dept:scale-110 transition-all duration-500 shadow-sm shrink-0">
                    {dept.icon}
                  </div>
                  <div className="h-[1px] flex-1 bg-gray-100 group-hover/dept:bg-[#f9c602]/30 transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <h3 className="text-[16px] font-bold text-[#181428] mb-3 group-hover/dept:text-[#f9c602] transition-colors duration-500 tracking-tight">
                  {dept.title}
                </h3>

                <p className="text-[#181428]/80 text-[13px] font-medium leading-relaxed mb-6 group-hover/dept:text-gray-700 transition-colors duration-500">
                  {dept.description}
                </p>

                {/* Interactive Link */}
                <div className="mt-auto pt-4 border-t border-gray-100/50 flex items-center gap-2 text-[#f9c602] font-semibold text-[10px] uppercase tracking-wider opacity-0 group-hover/dept:opacity-100 translate-y-2 group-hover/dept:translate-y-0 transition-all duration-500">
                  <span>Explore Division</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/dept:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
