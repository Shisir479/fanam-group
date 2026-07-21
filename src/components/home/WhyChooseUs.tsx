"use client";

import { BlockReveal } from "@/components/ui/BlockReveal";

const defaultFeatures = [
  {
    title: "Uncompromising Quality",
    description:
      "We source the finest materials and employ top-tier professionals to ensure every detail meets our rigorous standards of excellence.",
    icon: (
      <svg
        className="w-8 h-8 text-brand-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    title: "Timely Delivery",
    description:
      "Our streamlined processes and dedicated project management ensure that we hand over your dream space exactly when promised.",
    icon: (
      <svg
        className="w-8 h-8 text-brand-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Prime Locations",
    description:
      "We meticulously select the most sought-after neighborhoods to provide our clients with the best accessibility and lifestyle.",
    icon: (
      <svg
        className="w-8 h-8 text-brand-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Innovative Design",
    description:
      "Blending modern aesthetics with functional living spaces, our designs are crafted to inspire and elevate everyday life.",
    icon: (
      <svg
        className="w-8 h-8 text-brand-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
];

export function WhyChooseUs({ data }: { data?: any }) {
  const features = data?.strengths?.length > 0 
    ? data.strengths.map((strength: any, idx: number) => ({
        title: strength.title || "",
        description: strength.description || "",
        icon: strength.icon?.url ? (
          <img src={strength.icon.url} alt={strength.title} className="w-8 h-8 object-contain" />
        ) : defaultFeatures[idx % defaultFeatures.length].icon,
      }))
    : defaultFeatures;

  const strengthTitle = data?.strengthTitle || "Our Core Strengths";
  const strengthHeading = data?.strengthHeading || "Why Choose Us";

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col items-center text-center mb-16">
          <BlockReveal color="var(--color-brand-blue)">
            <div className="text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
              {strengthTitle}
            </div>
          </BlockReveal>

          <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.2] uppercase">
              {strengthHeading}
            </h2>
          </BlockReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 border border-gray-100 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,59,109,0.1)] transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle top border accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#4ea24b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>

              <h3 className="text-lg md:text-[20px] font-bold text-brand-blue mb-4 uppercase tracking-wide">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm md:text-[14px] leading-relaxed font-semibold">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
