import { BlockReveal } from "@/components/ui/BlockReveal";
import { Play } from "lucide-react";

export function ChairmanMessage() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Video Placeholder */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full aspect-video bg-[#003B6D]/5 border border-gray-200 shadow-sm overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?q=80&w=743&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Chairman Video Thumbnail" 
                className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                  <Play className="w-6 h-6 text-[#003B6D] ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Message Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-4 mb-2">
              <BlockReveal color="#003B6D">
                <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                  MESSAGE FROM THE CHAIRMAN
                </div>
              </BlockReveal>
              <BlockReveal color="#003B6D" delay={0.2}>
                <h2 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase max-w-3xl">
                  VISION FOR THE FUTURE
                </h2>
              </BlockReveal>
            </div>
            
            <div className="relative">
              <svg className="absolute -top-4 -left-4 w-12 h-12 text-[#003B6D]/10 transform -scale-x-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-700 text-lg leading-relaxed italic z-10 relative pl-4">
                "Our commitment to excellence goes beyond bricks and mortar. We build communities, foster sustainable lifestyles, and create spaces that resonate with the rich cultural heritage of our people. Every project we undertake is a testament to our dedication to quality, innovation, and unwavering integrity."
              </p>
            </div>
            
            <div className="mt-4">
              <h4 className="text-lg font-bold text-[#003B6D]">Mr. Rafiqul Islam</h4>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-1">Chairman & Founder, Bonedi Homes</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
