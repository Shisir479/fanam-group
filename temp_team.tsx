import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    id: 1,
    name: "Camila Vega",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    phone1: "789 456 3210",
    phone2: "321 456 9874",
  },
  {
    id: 2,
    name: "Daniel Foster",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    phone1: "789 456 3210",
    phone2: "321 456 9874",
  },
  {
    id: 3,
    name: "Sofia Hernandez",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    phone1: "789 456 3210",
    phone2: "321 456 9874",
  },
  {
    id: 4,
    name: "Isabella Martinez",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    phone1: "789 456 3210",
    phone2: "321 456 9874",
  },
];

export function TestimonialSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col gap-3 mb-16 max-w-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-700">
            <span className="w-2 h-2 rounded-full border border-[#f8a502] bg-transparent"></span>
            Meet The Team
          </div>
          <h2 className="text-3xl md:text-[40px] leading-tight font-serif text-[#181428]">
            Local Expertise. Real Results.
          </h2>
          <p className="text-[#181428]/80 leading-relaxed text-[13px] font-medium mt-2">
            Get to know the professionals who help buyers and sellers navigate the South Florida market every day.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center bg-white border border-gray-100 rounded-[4px] p-8 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name & Badge */}
              <div className="flex flex-col items-center gap-1.5 mb-2 text-center">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <h4 className="text-[15px] font-bold text-[#181428]">{member.name}</h4>
                  <span className="flex items-center gap-1 bg-[#084E37] text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[2px] tracking-wider">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Verified
                  </span>
                </div>
              </div>

              {/* View Listings */}
              <Link href="#" className="text-[#f8a502] font-semibold text-[13px] mb-5 hover:underline">
                View my listings
              </Link>

              {/* Phones */}
              <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600 mb-6">
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {member.phone1}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  {member.phone2}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 flex items-center justify-center border border-[#181428]/20 rounded-[4px] text-[#181428] hover:bg-[#181428] hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-[#181428]/20 rounded-[4px] text-[#181428] hover:bg-[#181428] hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

