import { BlockReveal } from "@/components/ui/BlockReveal";

export function ContactInfo() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col gap-4 mb-12">
          <BlockReveal color="var(--color-brand-blue)">
            <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              CONTACT US
            </div>
          </BlockReveal>
          <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.3] uppercase max-w-3xl">
              GET IN TOUCH
            </h2>
          </BlockReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Address */}
          <div className="bg-white p-10 border border-gray-50 flex flex-col items-center text-center shadow-sm">
            <div className="bg-brand-blue/10 p-4 text-brand-blue mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-4">
              Address
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              123 Bonedi Estate Blvd,
              <br />
              Gulshan 1, Dhaka 1212
            </p>
          </div>

          {/* Card 2: Support */}
          <div className="bg-white p-10 border border-gray-50 flex flex-col items-center text-center shadow-sm">
            <div className="bg-brand-blue/10 p-4 text-brand-blue mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-4">
              Support
            </h3>
            <p className="text-gray-600 text-sm mb-2">support@bonedi.com</p>
            <p className="text-gray-600 text-sm">+1-600-890-4567</p>
          </div>

          {/* Card 3: Mobile */}
          <div className="bg-white p-10 border border-gray-50 flex flex-col items-center text-center shadow-sm">
            <div className="bg-brand-blue/10 p-4 text-brand-blue mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-4">
              Mobile
            </h3>
            <p className="text-gray-600 text-sm mb-2">+880 1712-345678</p>
            <p className="text-gray-600 text-sm">+880 1912-345678</p>
          </div>
        </div>
      </div>
    </section>
  );
}
