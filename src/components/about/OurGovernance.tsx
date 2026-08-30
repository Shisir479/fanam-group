import {
  UserCheck,
  ClipboardCheck,
  Recycle,
  Scale,
  Handshake,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

const leftItems = [
  {
    title: "Ethical Leadership",
    desc: "We lead with honesty, integrity, and professionalism in every business decision.",
    icon: <UserCheck className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Compliance & Responsibility",
    desc: "We strictly follow applicable laws, regulations, and corporate policies while maintaining the highest ethical standards.",
    icon: <ClipboardCheck className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Sustainable Business Practices",
    desc: "We focus on responsible growth that creates lasting value for our business, society, and future generations.",
    icon: <Recycle className="w-4 h-4 text-[#312e81]" />,
  },
];

const rightItems = [
  {
    title: "Transparency & Accountability",
    desc: "We promote open communication, responsible management, and accountability across all business operations.",
    icon: <Scale className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Stakeholder Trust",
    desc: "We build long-term relationships by protecting the interests of our customers, investors, employees, and business partners.",
    icon: <Handshake className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Risk Management & Security",
    desc: "We proactively identify, manage, and reduce business risks while ensuring the security of our operations and information.",
    icon: <ShieldAlert className="w-4 h-4 text-[#312e81]" />,
  },
];

export function OurGovernance() {
  const renderTimeline = (items: typeof leftItems) => {
    return (
      <div className="flex flex-col mt-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-stretch">
            {/* Timeline Column */}
            <div className="w-14 md:w-16 flex-shrink-0 flex flex-col items-center relative">
              {/* Continuous Dashed Line */}
              {idx !== items.length - 1 && (
                <div className="absolute top-[64px] bottom-[-24px] w-[2px] border-l-2 border-dashed border-gray-300 z-0"></div>
              )}

              {/* Circle Marker */}
              <div className="w-10 h-10 rounded-full bg-[#f9c602]/10 border-2 border-white flex items-center justify-center shadow-sm z-10 mt-6">
                {item.icon}
              </div>

              {/* Down Arrow */}
              {idx !== items.length - 1 && (
                <div className="absolute bottom-[2px] text-gray-300 z-10 bg-white">
                  <ChevronDown className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Card Column */}
            <div className="flex-1 pb-5 ml-2 md:ml-0">
              <div className="bg-white border border-gray-100 rounded-xl p-4 px-5 shadow-sm hover:shadow-md transition-shadow relative h-[120px] flex flex-col justify-center">
                {/* Left pointing tail */}
                <div className="absolute top-[38px] -left-[6px] w-3 h-3 bg-white border-l border-t border-gray-100 rotate-[-45deg]"></div>

                <h4 className="text-[14px] font-bold text-[#181428] mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24 border-t border-gray-50">
      <div className="fanam-container">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Our Governance
          </div>

          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto">
            Fanam Group is committed to maintaining the highest standards of
            transparency, accountability, ethical leadership, and responsible
            business practices across all operations.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="flex flex-col">{renderTimeline(leftItems)}</div>

          {/* Right Column */}
          <div className="flex flex-col">{renderTimeline(rightItems)}</div>
        </div>
      </div>
    </section>
  );
}
