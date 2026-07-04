import { BlockReveal } from "@/components/ui/BlockReveal";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    title: "Luxury Villa",
    category: "Residential"
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
    title: "Modern Apartment",
    category: "Interior"
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    title: "Commercial Hub",
    category: "Architecture"
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800",
    title: "Eco Retreat",
    category: "Exterior"
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    title: "Penthouse Suite",
    category: "Residential"
  }
];

export function GalleryPreview() {
  return (
    <section className="w-full py-20 md:py-32 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <BlockReveal color="#003B6D">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                PORTFOLIO
              </div>
            </BlockReveal>
            <BlockReveal color="#003B6D" delay={0.2}>
              <h2 className="text-2xl md:text-[40px] font-bold tracking-tight text-[#003B6D] leading-[1.1] uppercase">
                Discover Our <br className="hidden md:block" /> Signature Projects
              </h2>
            </BlockReveal>
          </div>
          <button className="px-8 py-4 border border-[#003B6D] text-[#003B6D] hover:bg-[#003B6D] hover:text-white transition-colors duration-500 font-medium whitespace-nowrap self-start md:self-auto uppercase tracking-widest text-sm">
            Explore Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-1 md:h-[700px]">
          {galleryImages.map((item, idx) => {
            let colSpan = "md:col-span-1";
            let rowSpan = "md:row-span-1";
            
            if (idx === 0) {
              colSpan = "md:col-span-2";
              rowSpan = "md:row-span-2";
            } else if (idx === 1) {
              colSpan = "md:col-span-2";
            }

            return (
              <div key={idx} className={`group relative overflow-hidden bg-gray-100 ${colSpan} ${rowSpan} min-h-[300px] transform-gpu`}>
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 transform-gpu" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <p className="text-white/80 font-medium tracking-widest uppercase text-xs mb-2">{item.category}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                    <div className="w-12 h-[2px] bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
