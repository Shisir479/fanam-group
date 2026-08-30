import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Trusted Corporate Brand",
  "Sustainable Growth",
  "Innovation-Driven Solutions",
  "Experienced Leadership",
  "Commitment to Excellence",
  "Diversified Business Portfolio",
  "Customer-First Approach",
  "Long-Term Partnership",
];

export function WhyChooseUs() {
  return (
    <section className="fanam-section bg-gray-50/30 relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left Side: Image Composition */}
          <div className="w-full lg:w-[40%] max-w-[450px] mx-auto lg:mx-0 relative h-[380px] md:h-[420px] flex flex-shrink-0">
            {/* Main Background Image */}
            <div className="absolute top-0 right-4 w-[85%] h-[80%] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                alt="Business Meeting"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Right Overlapping Image */}
            <div className="absolute bottom-0 right-0 w-[65%] h-[50%] rounded-[1.5rem] overflow-hidden border-[6px] border-white shadow-xl z-10">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                alt="Team Collaboration"
                fill
                className="object-cover"
              />
            </div>

            {/* Left Floating Experience Card */}
            <div className="absolute top-[20%] left-0 w-32 h-32 md:w-36 md:h-36 bg-[#312e81] rounded-xl flex flex-col items-center justify-center text-white shadow-2xl z-20">
              {/* Decorative tail */}
              <div className="absolute -bottom-3 left-6 w-6 h-6 bg-[#312e81] rotate-45 transform origin-top-left -z-10"></div>

              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center mb-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white flex items-center justify-center">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">25+</h3>
              <p className="text-[10px] font-medium text-white/80">
                Years Of Experience
              </p>
            </div>
          </div>

          {/* Right Side: Text & Features */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6 self-start">
              Why Choose Us
            </div>

            <h2 className="text-3xl md:text-[40px] leading-tight font-bold text-[#181428] mb-6">
              Why Choose Fanam Group
            </h2>

            <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed mb-10">
              At Fanam Group, we combine innovation, expertise, and integrity to
              deliver exceptional value across diverse industries. Our
              commitment to quality, customer satisfaction, and sustainable
              growth makes us a trusted partner for individuals, businesses, and
              communities.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-[14px] text-gray-600 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
