import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Sam Daniels",
    title: "SE DRE# 12567897",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Jim Daniels",
    title: "selling agent",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Maya Daniels",
    title: "sales executive",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Michael Rutter",
    title: "buying agent",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Sam Daniels",
    title: "SE DRE# 12567897",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
  },
];

export function OurAchievements({ data }: { data?: any }) {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
          {/* Left Title */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-700">
              <span className="w-2 h-2 rounded-full border border-[#084E37] bg-transparent"></span>
              For Investors
            </div>
            <h2 className="text-3xl md:text-[32px] leading-tight font-serif text-[#181428] lg:whitespace-nowrap">
              Built For Long-Term Value
            </h2>
          </div>

          {/* Vertical Green Line (Hidden on mobile) */}
          <div className="hidden lg:block w-[1.5px] h-20 bg-[#084E37]/30 mx-4"></div>

          {/* Right Description */}
          <div className="flex-1 lg:max-w-[450px]">
            <p className="text-[#181428]/80 leading-relaxed text-[13px] font-medium">
              Whether you're a first-time buyer exploring your options or a
              seasoned investor seeking strategic advice, our agents are here to
              empower you with knowledge and guide you towards your goals. Here,
              we bring together a network of seasoned professional.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative w-full aspect-[2.5/3.5] overflow-hidden rounded-[2px] rounded-tl-[40px] rounded-br-[40px] group cursor-pointer shadow-sm"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90"></div>

              {/* Text Content */}
              <div className="absolute bottom-4 left-4 z-10 flex flex-col">
                <h4 className="text-[15px] font-bold text-white mb-0.5 tracking-wide">
                  {member.name}
                </h4>
                <p className="text-[10px] font-medium text-white/80 uppercase tracking-wider">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
