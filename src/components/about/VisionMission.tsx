import { Target, Lightbulb } from "lucide-react";

export function VisionMission({ data }: { data: any }) {
  // Hardcoding exact text from user screenshot to avoid old real estate data

  const missionItems = [
    {
      num: "01",
      title: "Delivering Excellence with Purpose",
      desc: "To provide high-quality products and services through innovation, integrity, and customer-focused solutions while fostering sustainable growth and long-term success.",
    },
    {
      num: "02",
      title: "Creating Value Through Excellence",
      desc: "Our mission is to deliver exceptional experiences through quality, collaboration, and responsible business practices while driving continuous growth across every industry we serve.",
    },
    {
      num: "03",
      title: "Growing Together Through Innovation and Trust",
      desc: "To deliver exceptional products, services, and experiences by embracing innovation, maintaining the highest standards of integrity, and creating long-term value for our customers, employees, partners, and communities.",
    },
  ];

  const visionItems = [
    {
      num: "01",
      title: "Shaping a Better Future Through Innovation",
      desc: "To become a trusted and diversified corporate group by delivering innovative solutions, creating sustainable value, and making a positive impact on businesses, communities, and future generations.",
    },
    {
      num: "02",
      title: "Leading with Innovation, Growing with Trust",
      desc: "Our vision is to build a future where innovation, sustainability, and excellence create lasting value for customers, partners, and communities.",
    },
    {
      num: "03",
      title: "Inspiring Progress, Creating Lasting Impact",
      desc: "To be recognized as a leading corporate group that transforms industries through innovation, trusted partnerships, and sustainable business practices while creating a better future for generations to come.",
    },
  ];

  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container relative z-10">
        {/* Header section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Mission & Vision
          </div>

          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto">
            Guided by a clear vision and a strong mission, we are committed to
            creating sustainable growth, delivering excellence, and building
            lasting value for our customers, partners, and communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="bg-white border border-gray-100 rounded-[1.5rem] p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-8">
              <Target className="w-8 h-8 text-[#312e81]" />
              <h2 className="text-[28px] md:text-3xl font-bold text-[#181428]">
                Our Mission
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {missionItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 md:gap-5">
                  <span className="text-xl md:text-[22px] font-bold text-[#181428] mt-0.5">
                    {item.num}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[15px] font-bold text-[#181428] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white border border-gray-100 rounded-[1.5rem] p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-8">
              <Lightbulb className="w-8 h-8 text-[#312e81]" />
              <h2 className="text-[28px] md:text-3xl font-bold text-[#181428]">
                Our Vision
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {visionItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 md:gap-5">
                  <span className="text-xl md:text-[22px] font-bold text-[#181428] mt-0.5">
                    {item.num}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[15px] font-bold text-[#181428] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
