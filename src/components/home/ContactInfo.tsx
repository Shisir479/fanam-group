import { ArrowRight } from "lucide-react";

export function ContactInfo({ data }: { data?: any }) {
  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="fanam-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Form */}
          <div className="flex flex-col gap-6 w-full max-w-lg">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#f9c602] font-serif font-bold text-3xl md:text-4xl">
                Contact Us
              </h2>
              <p className="text-[#181428] text-base md:text-lg font-medium leading-snug">
                Let's Build the Future Together with Innovation, Trust, and
                Excellence
              </p>
            </div>

            <form className="flex flex-col gap-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-[#181428] placeholder-gray-400 focus:outline-none focus:border-[#f9c602] focus:ring-1 focus:ring-[#f9c602] transition-colors shadow-sm"
                />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-[#181428] placeholder-gray-400 focus:outline-none focus:border-[#f9c602] focus:ring-1 focus:ring-[#f9c602] transition-colors shadow-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-[#181428] placeholder-gray-400 focus:outline-none focus:border-[#f9c602] focus:ring-1 focus:ring-[#f9c602] transition-colors shadow-sm"
                />
                <input
                  type="text"
                  placeholder="4:00 Available"
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-[#181428] placeholder-gray-400 focus:outline-none focus:border-[#f9c602] focus:ring-1 focus:ring-[#f9c602] transition-colors shadow-sm"
                />
              </div>

              <textarea
                placeholder="Message"
                rows={4}
                className="w-full border border-gray-200 rounded-lg p-3 bg-white text-[#181428] placeholder-gray-400 focus:outline-none focus:border-[#f9c602] focus:ring-1 focus:ring-[#f9c602] transition-colors resize-none shadow-sm"
              />

              <div className="mt-1">
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 bg-[#181428] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#f9c602] hover:text-[#181428] border border-[#181428] hover:border-[#f9c602] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Book Appointment
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#181428]/10 text-white group-hover:text-[#181428] flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1 group-hover:-rotate-45">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Map */}
          <div className="w-full h-[350px] lg:h-[420px] rounded-md  overflow-hidden shadow-xl border border-gray-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1388651817445!2d90.39575971498188!3d23.8136894845582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c711d13bbec7%3A0x8ce370043c7457a4!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1689254320234!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[20%] contrast-[1.1] opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
