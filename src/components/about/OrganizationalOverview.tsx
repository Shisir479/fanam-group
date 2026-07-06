import { BlockReveal } from "@/components/ui/BlockReveal";
import { Building2, Home, Landmark, ShieldCheck } from "lucide-react";

const departments = [
  {
    icon: <Home className="w-8 h-8" />,
    name: "Residential Development",
    description: "Focuses on crafting premium apartments and luxury villas with modern amenities."
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    name: "Commercial Spaces",
    description: "Develops high-end corporate office spaces and retail complexes in prime locations."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    name: "Quality Assurance",
    description: "Ensures all projects meet strict international safety and quality standards."
  },
  {
    icon: <Landmark className="w-8 h-8" />,
    name: "Property Management",
    description: "Provides comprehensive post-handover maintenance and community management services."
  }
];

export function OrganizationalOverview() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-5 md:px-16">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="flex flex-col gap-4 mb-2">
              <BlockReveal color="#003B6D">
                <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                  STRUCTURE
                </div>
              </BlockReveal>
              <BlockReveal color="#003B6D" delay={0.2}>
                <h2 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase">
                  ORGANIZATIONAL OVERVIEW
                </h2>
              </BlockReveal>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Bonedi Homes is structured to deliver end-to-end real estate solutions. From initial architectural conceptualization to final property management, our specialized divisions work in seamless harmony to ensure the flawless execution of every project.
            </p>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-white p-8 border border-gray-200 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#003B6D]/10 p-3 text-[#003B6D] mb-5">
                    {dept.icon}
                  </div>
                  <h3 className="text-[13px] font-bold text-[#003B6D] uppercase tracking-wider mb-2">{dept.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
