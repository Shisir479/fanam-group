import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
            bio: "With over two decades of experience, Tariqur oversees the strategic direction and operational excellence of Fanam Group.",
          },
          {
            name: "Dr. Laila Zaman",
            designation: "Director of Operations",
            image: {
              url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
            },
            bio: "Dr. Zaman ensures that every project meets the highest standards of quality and sustainability, guaranteeing seamless execution.",
          },
        ];

  if (!data) return null;
  data;

  return (
    <section className="fanam-section bg-white relative overflow-hidden">
      <div className="fanam-container">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <h2 className="text-3xl md:text-[32px] leading-tight font-serif font-bold text-[#f9c602]">
            MEET THE BOARD
          </h2>
        </div>

        {/* Ultra-Premium Corporate List Layout */}
        <div className="flex flex-col gap-16 mt-16 max-w-6xl mx-auto">
          {leaders.map((leader: any, index: number) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border-b border-gray-100 pb-16 last:border-0 last:pb-0 group">
              
              {/* Image Side (4/12 columns) */}
              <div className="lg:col-span-4 relative aspect-[4/5] rounded-[1rem] overflow-hidden bg-gray-50">
                <Image
                  src={
                    leader.image?.url ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                  }
                  alt={leader.name}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Side (8/12 columns) */}
              <div className="lg:col-span-8 flex flex-col pt-2 lg:pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[1px] bg-[#f9c602]"></div>
                  <p className="text-[11px] font-bold text-[#f9c602] uppercase tracking-[0.25em]">
                    {leader.designation}
                  </p>
                </div>
                
                <h3 className="text-[#181428] font-bold text-3xl md:text-[40px] tracking-tight mb-6 font-serif">
                  {leader.name}
                </h3>
                
                {/* Bio text */}
                <div
                  className="text-[#181428]/80 text-[14px] md:text-[15px] font-medium leading-relaxed prose prose-p:break-words whitespace-normal break-words max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: leader.description || leader.bio,
                  }}
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
