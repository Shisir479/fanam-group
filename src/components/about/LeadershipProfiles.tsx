import { BlockReveal } from "@/components/ui/BlockReveal";

export function LeadershipProfiles({ data }: { data: any }) {
  const leaders =
    data?.boardMembers?.length > 0
      ? data.boardMembers
      : [
          {
            name: "Tariqur Rahman",
            designation: "Managing Director",
            image: {
              url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
            },
            bio: "With over two decades of experience in real estate development, Tariqur oversees the strategic direction and operational excellence of Bonedi Homes. His visionary approach has been instrumental in shaping the company's robust portfolio.",
          },
          {
            name: "Dr. Laila Zaman",
            designation: "Director of Operations",
            image: {
              url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
            },
            bio: "Dr. Zaman ensures that every Bonedi project meets the highest standards of quality and sustainability. Her expertise in project management and operations guarantees seamless execution from conceptualization to handover.",
          },
        ];

  if (!data) return null;
  console.log(data);

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="text-center mb-10 flex flex-col items-center gap-3">
          <BlockReveal color="var(--color-brand-blue)">
            <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              LEADERSHIP
            </div>
          </BlockReveal>
          <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.3] uppercase max-w-3xl text-center">
              MEET THE BOARD
            </h2>
          </BlockReveal>
        </div>

        <div className="flex flex-col gap-16 md:gap-24 mt-8">
          {leaders.map((leader: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Image Section */}
              <div className="w-full md:w-5/12 lg:w-1/3">
                <div className="relative w-full aspect-[4/5] md:aspect-[3/3] overflow-hidden group">
                  <img
                    src={
                      leader.image?.url ||
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                    }
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle border accent */}
                  <div className="absolute inset-0 border border-black/5 z-10"></div>
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col justify-center">
                <p className="text-[12px] md:text-[13px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-3">
                  {leader.designation}
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-blue mb-6 md:mb-8 leading-tight">
                  {leader.name}
                </h3>

                <div className="w-16 h-[2px] bg-brand-blue/20 mb-6 md:mb-8"></div>

                <div
                  className="text-gray-600 text-[15px] md:text-[16px] leading-loose font-light max-w-2xl prose prose-invert min-w-0"
                  dangerouslySetInnerHTML={{ __html: leader.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
