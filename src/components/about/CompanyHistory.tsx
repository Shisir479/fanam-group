import {
  Clock,
  Brain,
  Building,
  Briefcase,
  Handshake,
  Eye,
  Users,
  Lightbulb,
  ShieldCheck,
  Leaf,
  ChevronDown,
} from "lucide-react";

const historyItems = [
  {
    title: "Company Founded",
    desc: "Fanam Group was established in 2012 with a vision to build trusted and sustainable businesses.",
    icon: <Building className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Business Expansion",
    desc: "In 2014, Fanam Group expanded into new business sectors to strengthen its corporate presence.",
    icon: <Briefcase className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Strategic Partnerships",
    desc: "By 2018, Fanam Group formed strategic partnerships to accelerate business growth and long-term success.",
    icon: <Handshake className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Future Vision",
    desc: "In 2026, Fanam Group continues to drive sustainable growth through innovation and responsible leadership.",
    icon: <Eye className="w-4 h-4 text-[#312e81]" />,
  },
];

const philosophyItems = [
  {
    title: "Purpose-Driven Leadership",
    desc: "We lead with a clear purpose, creating meaningful impact through responsible leadership and long-term vision.",
    icon: <Users className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Innovation & Excellence",
    desc: "We embrace innovation and continuous improvement to deliver exceptional products, services, and business solutions.",
    icon: <Lightbulb className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Integrity & Trust",
    desc: "We build lasting relationships through honesty, transparency, and ethical business practices.",
    icon: <ShieldCheck className="w-4 h-4 text-[#312e81]" />,
  },
  {
    title: "Sustainable Growth",
    desc: "We are committed to responsible growth that benefits our communities and future generations.",
    icon: <Leaf className="w-4 h-4 text-[#312e81]" />,
  },
];

export function CompanyHistory({ data }: { data: any }) {
  // Hardcoded as per the exact design requested

  const renderTimeline = (items: typeof historyItems) => {
    return (
      <div className="relative pl-10 mt-8">
        {/* Vertical Dashed Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] border-l-2 border-dashed border-gray-300"></div>

        <div className="flex flex-col gap-5">
          {items.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Icon Marker */}
              <div className="absolute -left-10 top-4 w-10 h-10 rounded-full bg-[#f9c602]/10 border-2 border-white flex items-center justify-center shadow-sm z-10">
                {item.icon}
              </div>

              {/* Down Arrow on Line (except last item) */}
              {idx !== items.length - 1 && (
                <div className="absolute -left-[30px] -bottom-4 text-gray-300 z-10 bg-white">
                  <ChevronDown className="w-4 h-4" />
                </div>
              )}

              {/* Card Content */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 px-5 shadow-sm hover:shadow-md transition-shadow relative ml-4 h-[120px] flex flex-col justify-center">
                {/* Tail pointer */}
                <div className="absolute top-7 -left-2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-[-45deg]"></div>

                <h4 className="text-[14px] font-bold text-[#181428] mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Company History & Philosophy
          </div>

          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto">
            Explore the journey that has shaped Fanam Group into a trusted and
            diversified corporate organization through innovation, dedication,
            and continuous growth.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: History */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-8 h-8 text-[#312e81]" />
              <h2 className="text-3xl font-bold text-[#181428]">Our History</h2>
            </div>
            {renderTimeline(historyItems)}
          </div>

          {/* Right Column: Philosophy */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <Brain className="w-8 h-8 text-[#312e81]" />
              <h2 className="text-3xl font-bold text-[#181428]">
                Our Philosophy
              </h2>
            </div>
            {renderTimeline(philosophyItems)}
          </div>
        </div>
      </div>
    </section>
  );
}
