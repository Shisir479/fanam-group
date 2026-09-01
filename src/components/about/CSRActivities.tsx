"use client";

import Image from "next/image";
import { Heart, Droplets, BookOpen, Users, ArrowRight } from "lucide-react";

const csrInitiatives = [
  {
    id: 1,
    title: "Community Development",
    description:
      "Empowering local communities through infrastructure development and sustainable livelihood programs to ensure inclusive growth.",
    icon: <Users className="w-8 h-8" />,
    image:
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1000&auto=format&fit=crop",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Environmental Sustainability",
    description:
      "Implementing green technologies and responsible waste management to reduce our carbon footprint and protect natural ecosystems.",
    icon: <Droplets className="w-8 h-8" />,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    color: "from-emerald-500 to-green-400",
  },
  {
    id: 3,
    title: "Education & Healthcare",
    description:
      "Investing in the future by providing scholarships, building schools, and supporting medical facilities in underserved regions.",
    icon: <BookOpen className="w-8 h-8" />,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
    color: "from-purple-500 to-pink-400",
  },
];

export function CSRActivities() {
  return (
    <section className="fanam-section bg-gray-50/30 relative overflow-hidden py-16 lg:py-24">
      {/* Background abstract shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="fanam-container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Social Responsibility
          </div>
          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto">
            At Fanam Group, our success is measured not just by financial
            performance, but by the positive impact we create for society and
            the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {csrInitiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 h-[450px] flex flex-col justify-end border border-gray-100"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" />
              </div>

              {/* Content Box */}
              <div className="relative z-20 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-br ${initiative.color} shadow-lg`}
                >
                  {initiative.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {initiative.title}
                </h3>

                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3 mb-6">
                  {initiative.description}
                </p>

                <button className="flex items-center gap-2 text-[#f9c602] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
