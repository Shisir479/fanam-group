import Image from "next/image";

const awards = [
  {
    title: "Achievement Cards",
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop", // placeholder trophy
  },
  {
    title: "Business Leadership Award",
    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=800&auto=format&fit=crop", // placeholder award
  },
  {
    title: "Corporate Excellence Award",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", // placeholder certificate/award
  },
  {
    title: "Industry Pioneer Award",
    image: "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Outstanding Employer 2023",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Sustainable Growth Recognition",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
];

export function AwardsRecognition() {
  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Awards & Recognition
          </div>
          
          {/* Note: Kept the exact text from the screenshot even though it says 'core values' */}
          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto">
            Our core values define who we are, guide every decision we make, and inspire us to deliver excellence with integrity and innovation.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, idx) => (
            <div 
              key={idx} 
              className="relative group w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              <Image
                src={award.image}
                alt={award.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="absolute bottom-6 left-6 right-6 text-xl font-bold text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {award.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
