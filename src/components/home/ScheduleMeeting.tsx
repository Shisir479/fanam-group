"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScheduleMeeting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
      },
    });

    tl.to(blockRef.current, { scaleX: 1, duration: 0.5, ease: "power3.inOut" })
      .set(titleRef.current, { opacity: 1 })
      .to(blockRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.5,
        ease: "power3.inOut",
      })
      .fromTo(
        formRef.current?.children ? Array.from(formRef.current.children) : [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.2",
      );
  }, []);

  return (
    <section ref={containerRef} className="w-full md:py-20 py-16 bg-gray-50/50">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col lg:flex-row bg-white md:shadow-md  overflow-hidden">
          {/* Left Column - Image */}
          <div className="w-full lg:w-3/5 h-[200px] lg:h-auto relative">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
              alt="Schedule a meeting"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-2/5 p-8 md:p-10 lg:p-14 flex flex-col justify-center">
            <div className="mb-8">
              <div className="relative inline-block self-start">
                <h2
                  ref={titleRef}
                  className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-wide uppercase opacity-0"
                >
                  SCHEDULE A MEETING
                </h2>
                <div
                  ref={blockRef}
                  className="absolute inset-0 bg-[#003B6D] origin-left scale-x-0"
                ></div>
              </div>
            </div>

            <form
              ref={formRef}
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Full Name*"
                className="w-full px-4 py-3 text-[15px] border focus:outline-none focus:border-[#00F700] transition-colors bg-transparent text-gray-800 placeholder-gray-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number*"
                className="w-full px-4 py-3 text-[15px] border focus:outline-none focus:border-[#00F700] transition-colors bg-transparent text-gray-800 placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 text-[15px] border focus:outline-none focus:border-[#00F700] transition-colors bg-transparent text-gray-800 placeholder-gray-400"
              />

              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-[15px] border focus:outline-none focus:border-[#00F700] transition-colors bg-transparent text-gray-800 appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-400">
                    Select A Time
                  </option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 4PM)</option>
                  <option value="evening">Evening (4PM - 7PM)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="relative group mt-3 md:px-12 px-14 md:py-3 py-2 border border-gray-900 text-gray-900 font-bold overflow-hidden transition-colors duration-500 hover:text-white self-start uppercase tracking-wider text-sm"
              >
                <span className="relative z-10">Submit</span>
                <span className="absolute inset-0 bg-gray-900 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
