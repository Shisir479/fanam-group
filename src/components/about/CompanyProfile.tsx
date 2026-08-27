import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function CompanyProfile({ data }: { data: any }) {
  if (!data) return null;

  const features = [
    "Creating long-term value for customers, partners, employees, and communities.",
    "Driving progress through modern solutions and continuous improvement.",
    "Delivering quality, trust, and exceptional customer experiences.",
    "Operating across multiple industries with sustainable growth.",
    "Building lasting relationships with ethical business practices."
  ];

  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Text Side */}
          <div className="w-full lg:w-[50%] flex flex-col pr-0 lg:pr-8">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6 self-start">
              Company Profile
            </div>

            <h2 className="text-3xl md:text-[32px] leading-tight font-serif font-bold text-[#181428] mb-6">
              Who We Are
            </h2>

            <p className="text-[#181428]/80 leading-relaxed text-[13px] font-medium mb-8">
              Fanam Group is a diversified corporate group committed to shaping the future through innovation, integrity, and excellence. With a growing portfolio spanning Real Estate, E-commerce, Travel & Tourism, Media, and emerging industries, we deliver high-quality products and services that create lasting value. Guided by a customer-first approach and a vision for sustainable growth, we build trusted businesses that positively impact communities, empower people, and contribute to long-term economic development.
            </p>

            <ul className="flex flex-col gap-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-[18px] h-[18px] text-green-500 shrink-0 mt-0.5" />
                  <span className="text-[#181428]/80 text-[13px] font-medium leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image Side (Masonry/Bento Grid) */}
          <div className="w-full lg:w-[50%] flex flex-col gap-4 mt-8 lg:mt-0">
            {/* Row 1 */}
            <div className="grid grid-cols-12 gap-4 h-40 sm:h-48 lg:h-52">
              <div className="col-span-5 relative rounded-[1rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  alt="Marketing Strategy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-7 relative rounded-[1rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Collaboration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="grid grid-cols-12 gap-4 h-40 sm:h-48 lg:h-52">
              <div className="col-span-7 relative rounded-[1rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <Image
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                  alt="Virtual Meeting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-5 relative rounded-[1rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Working Professional"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
