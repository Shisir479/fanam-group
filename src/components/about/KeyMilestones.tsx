import { Building2, Handshake, Users, TrendingUp, Globe } from "lucide-react";

const milestones = [
  {
    icon: (
      <Building2
        className="w-10 h-10 lg:w-12 lg:h-12 text-[#312e81]"
        strokeWidth={1.5}
      />
    ),
    stat: "25+",
    label: "Years of\nExcellence",
  },
  {
    icon: (
      <Handshake
        className="w-10 h-10 lg:w-12 lg:h-12 text-[#312e81]"
        strokeWidth={1.5}
      />
    ),
    stat: "10+",
    label: "Business\nVentures",
  },
  {
    icon: (
      <Users
        className="w-10 h-10 lg:w-12 lg:h-12 text-[#312e81]"
        strokeWidth={1.5}
      />
    ),
    stat: "5000+",
    label: "Dedicated\nEmployees",
  },
  {
    icon: (
      <TrendingUp
        className="w-10 h-10 lg:w-12 lg:h-12 text-[#312e81]"
        strokeWidth={1.5}
      />
    ),
    stat: "1M+",
    label: "Happy\nCustomers",
  },
  {
    icon: (
      <Globe
        className="w-10 h-10 lg:w-12 lg:h-12 text-[#312e81]"
        strokeWidth={1.5}
      />
    ),
    stat: "10+",
    label: "Global Presence",
  },
];

export function KeyMilestones() {
  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Key Milestones
          </div>

          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-2xl mx-auto">
            Celebrating the milestones that reflect our journey of innovation,
            growth, and excellence across diverse industries.
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center group"
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                {item.icon}
              </div>
              <h3 className="text-4xl lg:text-[40px] font-bold text-[#181428] mb-2 tracking-tight">
                {item.stat}
              </h3>
              <p className="text-[13px] md:text-[14px] text-gray-500 font-medium whitespace-pre-line leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
