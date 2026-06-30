"use client";

export function VideoSection() {
  return (
    <section className="w-full md:py-20 py-16 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="relative overflow-hidden w-full h-[30vh] md:h-[80vh] group cursor-pointer shadow-2xl">
          {/* Background Image with Slow Zoom on Hover */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt="Building Overview Video"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[15000ms] ease-out group-hover:scale-115"
          />

          {/* Dark Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-13 h-13 md:w-18 md:h-18 bg-[#FF0000] rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              {/* Expanding White Background Circle */}
              <div className="absolute inset-0 bg-white rounded-full transform scale-0 group-hover:scale-105 transition-transform duration-500 ease-out origin-center"></div>

              {/* SVG Icon */}
              <svg
                className="relative z-10 w-6 h-6 md:w-9 md:h-9 text-white group-hover:text-[#FF0000] ml-1 transition-colors duration-500 ease-out"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
