"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BlockReveal } from "@/components/ui/BlockReveal";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main
      id="error-page"
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#2A2545] overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay grayscale" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#2A2545]/90 to-[#2A2545]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Animated Warning Icon */}
        <div className="relative mb-8 flex justify-center items-center animate-[bounce_3s_infinite]">
          <div className="w-[120px] h-[120px] relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            >
              <path
                d="M12 9V14M12 17.5V18M12 3L21 10M5 10V21H9V14H15V21H19V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_#ef4444]" />
          </div>
        </div>

        {/* Text Content */}
        <BlockReveal color="#ef4444">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-4">
            Under Maintenance
          </h2>
        </BlockReveal>

        <div className="mt-6 mb-12">
          <BlockReveal color="#ef4444" delay={0.2}>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto">
              We encountered an unexpected issue while constructing this page.
              Our team is already working on the repairs.
            </p>
          </BlockReveal>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <BlockReveal color="#ef4444" delay={0.4}>
            <button
              onClick={() => reset()}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-red-500 bg-transparent px-8 py-4 font-bold uppercase text-white transition-colors duration-300 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] shrink-0 w-full sm:w-auto"
            >
              <span className="relative flex items-center gap-2 z-10 tracking-wider">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </span>
            </button>
          </BlockReveal>
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-white/30 bg-white/5 px-8 py-4 font-bold uppercase text-white transition-colors duration-300 hover:bg-white hover:text-black shrink-0 w-full sm:w-auto"
          >
            <span className="relative flex items-center gap-2 z-10 tracking-wider">
              Return Home
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
