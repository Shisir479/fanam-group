import { BlockReveal } from "@/components/ui/BlockReveal";

export function ContactInfo() {
  return (
    <section className="w-full py-16 md:py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

          {/* Contact Details & Form (Left side) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            <BlockReveal color="#003B6D">
              <h2 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.2] uppercase mb-2">
                Get In Touch
              </h2>
            </BlockReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="shrink-0 bg-[#003B6D]/10 p-3 text-[#003B6D]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="mb-1 text-[11px] font-bold text-[#003B6D] uppercase tracking-wider">Address</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    123 Bonedi Estate Blvd,<br />
                    Gulshan 1, Dhaka 1212
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="shrink-0 bg-[#003B6D]/10 p-3 text-[#003B6D]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="mb-1 text-[11px] font-bold text-[#003B6D] uppercase tracking-wider">Support</p>
                  <p className="text-gray-600 text-sm">support@bonedi.com</p>
                  <p className="text-gray-600 text-sm">+1-600-890-4567</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#003B6D] uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 bg-white py-3 px-4 outline-none focus:border-[#003B6D] focus:ring-1 focus:ring-[#003B6D] transition-all text-gray-800 text-sm font-medium"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#003B6D] uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full border border-gray-200 bg-white py-3 px-4 outline-none focus:border-[#003B6D] focus:ring-1 focus:ring-[#003B6D] transition-all text-gray-800 text-sm font-medium"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#003B6D] uppercase tracking-wider mb-2">Message</label>
                <textarea
                  className="w-full border border-gray-200 bg-white py-3 px-4 outline-none focus:border-[#003B6D] focus:ring-1 focus:ring-[#003B6D] transition-all text-gray-800 text-sm font-medium resize-none"
                  rows={4}
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full md:w-auto relative group/btn bg-[#003B6D] px-10 py-3 font-bold text-white uppercase tracking-wider overflow-hidden shadow-md flex items-center justify-center cursor-pointer text-sm"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 bg-[#002f57] scale-x-0 origin-left transition-transform duration-700 ease-out group-hover/btn:scale-x-100 z-0"></span>
              </button>
            </form>
          </div>
          
          {/* Map Section (Right side) */}
          <div className="w-full lg:w-1/2 min-h-[450px] lg:h-auto relative  overflow-hidden shadow-sm border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.277552998015!2d90.410813!3d23.773128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70000000001%3A0x0!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
