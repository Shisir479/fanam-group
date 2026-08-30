import Image from "next/image";

const executives = [
  {
    designation: "Managing Director & CEO",
    name: "Mohammad Arif Hossain",
    bio: "Leading with vision, integrity, and a commitment to sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  {
    designation: "Chief Operating Officer (COO)",
    name: "Md. Rakibul Hasan",
    bio: "Ensuring operational efficiency and delivering excellence across every business.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    designation: "Chief Financial Officer (CFO)",
    name: "Nusrat Jahan",
    bio: "Creating new opportunities through strategic partnerships and sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    designation: "Chief Technology Officer (CTO)",
    name: "Engr. Kamrul Islam",
    bio: "Empowering digital transformation through technology and innovation.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
];

export function ManagingDirectors() {
  return (
    <section className="fanam-section bg-gray-50/50 relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        {/* Header section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Managing Director's
          </div>

          <p className="text-[#181428]/70 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-4xl mx-auto">
            At Fanam Group, our focus is on delivering quality, innovation, and
            customer satisfaction in everything we do. We continuously improve
            our services, embrace new technologies, and strengthen our business
            operations to meet the changing needs of our customers.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {executives.map((exec, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-[11px] font-bold text-[#312e81] mb-1">
                {exec.designation}
              </p>
              <h4 className="text-[16px] font-bold text-[#181428] mb-3">
                {exec.name}
              </h4>
              <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
                {exec.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel Dots indicator (decorative for screenshot match) */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f9c602]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
}
