import Image from "next/image";
import Link from "next/link";
import { BlockReveal } from "@/components/ui/BlockReveal";

const managementTeam = [
  {
    id: 1,
    name: "AMINUR RASHID",
    designation: "Chairman & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    exploreLink: "#",
  },
  {
    id: 2,
    name: "FARIZA TASNIM",
    designation: "Managing Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    exploreLink: "#",
  },
];

export function ManagementTeam() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        {/* Section Title */}
        <div className="mb-12">
          <BlockReveal color="var(--color-brand-blue)">
            <h2 className="text-brand-blue text-3xl md:text-4xl font-bold uppercase">
              Management Team
            </h2>
          </BlockReveal>
        </div>
      </div>

      {/* Team Grid */}
      <div className="px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {managementTeam.map((member) => (
            <div
              key={member.id}
              className="hover:cursor-pointer relative group w-full aspect-[5/6] overflow-hidden"
            >
              {/* Member Image */}
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top "
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500"></div>

              {/* Content / Info */}
              <div className="absolute bottom-5 left-2 right-0 p-6 flex flex-col justify-end">
                <div className="transform-gpu transition-transform duration-500 ease-out group-hover:-translate-y-7 will-change-transform">
                  <h3 className="text-white text-lg font-bold uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-white/90 text-sm font-medium mt-1">
                    {member.designation}
                  </p>
                </div>

                {/* Explore Message Link (Absolute positioned inside the card, fades and slides up) */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto">
                  {member.exploreLink && (
                    <Link
                      href={member.exploreLink}
                      className="inline-block text-green-500 hover:text-green-400 text-[11px] font-semibold underline decoration-1 underline-offset-4 transition-colors"
                    >
                      Explore Message
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
