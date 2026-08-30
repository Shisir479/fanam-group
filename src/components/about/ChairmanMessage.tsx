import Image from "next/image";

export function ChairmanMessage({ data }: { data: any }) {
  // We are temporarily hardcoding the text and image because the backend
  // is still returning old real estate data (Bonedi Homes / Yasser Reza Chowdhury)
  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Side: Image */}
          <div className="w-full lg:w-[35%] flex justify-center lg:justify-end relative pr-0 lg:pr-8">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-md border border-gray-100 group">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                alt="Chairman"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Side: Message Text */}
          <div className="w-full lg:w-[65%] flex flex-col justify-center min-w-0">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6 self-start">
              Chairman Message
            </div>

            <h2 className="text-3xl md:text-[32px] leading-tight font-serif font-bold text-[#181428] mb-8">
              Message from the Chairman
            </h2>

            <div
              className="text-[#181428]/80 text-[13px] font-medium leading-relaxed flex flex-col gap-4 mb-8"
              dangerouslySetInnerHTML={{
                __html: `<p>At Fanam Group, we believe that lasting success is built on trust, innovation, and a strong commitment to excellence. Since our journey began, our goal has been to create businesses that deliver real value to our customers, partners, and communities.</p><p>As we continue to grow across multiple industries, we remain focused on sustainable development, ethical business practices, and building meaningful relationships. Together, we are shaping a stronger future and creating opportunities that inspire progress for generations to come.</p>`,
              }}
            />

            <div className="mt-4 flex flex-col">
              <h4 className="text-xl md:text-2xl font-bold text-[#312e81]">
                Md. Ashraful Islam
              </h4>
              <p className="text-[13px] font-medium text-[#312e81]/80 mt-1">
                Chairman, Fanam Group
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
