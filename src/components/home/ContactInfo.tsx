import { BlockReveal } from "@/components/ui/BlockReveal";

export function ContactInfo() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="mb-12 flex flex-col gap-4 text-center items-center">
          <BlockReveal color="#003B6D">
            <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              GET IN TOUCH
            </div>
          </BlockReveal>
          <BlockReveal color="#003B6D" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-[#003B6D] leading-[1.3] uppercase">
              Contact Information
            </h2>
          </BlockReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Phone */}
          <div className="flex flex-col items-center text-center p-8 bg-gray-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#003B6D]/10 flex items-center justify-center text-[#003B6D] mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-500 mb-2">Mon-Fri from 8am to 5pm.</p>
            <p className="text-[#003B6D] font-semibold text-lg">+1 (555) 123-4567</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center p-8 bg-gray-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#003B6D]/10 flex items-center justify-center text-[#003B6D] mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-500 mb-2">Drop us a line anytime.</p>
            <p className="text-[#003B6D] font-semibold text-lg">contact@bonedihomes.com</p>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center text-center p-8 bg-gray-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#003B6D]/10 flex items-center justify-center text-[#003B6D] mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Office</h3>
            <p className="text-gray-500 mb-2">Come say hello.</p>
            <p className="text-[#003B6D] font-semibold text-lg">123 Real Estate Blvd<br/>New York, NY 10001</p>
          </div>
        </div>
      </div>
    </section>
  );
}
