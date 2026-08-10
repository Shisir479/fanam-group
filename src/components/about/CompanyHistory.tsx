import { BlockReveal } from "@/components/ui/BlockReveal";

export function CompanyHistory({ data }: { data: any }) {
  const milestones =
    data?.timeline?.length > 0
      ? data.timeline
      : [
          {
            year: "2010",
            title: "Foundation",
            description:
              "Fanam Group was established with a vision to revolutionize urban living in Dhaka, focusing on premium residential properties.",
          },
          {
            year: "2014",
            title: "First Landmark Project",
            description:
              "Successfully delivered our first major project, 'Bonedi Heights', setting a new standard for luxury apartments.",
          },
          {
            year: "2018",
            title: "Expansion",
            description:
              "Expanded our operations to commercial real estate, developing state-of-the-art office spaces for multinational corporations.",
          },
          {
            year: "2022",
            title: "Sustainability Award",
            description:
              "Recognized nationally for integrating sustainable architecture and green building practices across all new developments.",
          },
          {
            year: "2024",
            title: "Global Reach",
            description:
              "Initiated collaborations with international architectural firms to bring global design standards to local projects.",
          },
        ];

  if (!data) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="text-center mb-20 flex flex-col items-center gap-4">
          <BlockReveal color="var(--color-brand-blue)">
            <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              OUR JOURNEY
            </div>
          </BlockReveal>
          <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.3] uppercase max-w-3xl text-center">
              COMPANY HISTORY
            </h2>
          </BlockReveal>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 md:-translate-x-1/2"></div>

          <div className="flex flex-col gap-12">
            {milestones.map((milestone: any, index: number) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[8px] md:left-1/2 top-1 w-4 h-4 rounded-full bg-brand-blue border-4 border-white shadow-sm md:-translate-x-1/2 z-10"></div>

                {/* Content */}
                <div
                  className={`w-full pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"}`}
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-4xl font-bold text-brand-blue/20 leading-none">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider">
                      {milestone.title}
                    </h3>
                    <div
                      className="text-gray-600 text-sm leading-relaxed mt-2 whitespace-normal break-words"
                      dangerouslySetInnerHTML={{
                        __html:
                          milestone.description?.replace(/&nbsp;/g, " ") || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
