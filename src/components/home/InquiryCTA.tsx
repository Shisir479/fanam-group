"use client";

import { useRouter } from "next/navigation";
import { BlockReveal } from "@/components/ui/BlockReveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InquiryCTA() {
  const router = useRouter();

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/inquiry");
  };

  return (
    <section className="w-full py-24 bg-gray-50  relative z-10">
      <div className="container mx-auto px-5 md:px-16">
        <div className="mb-12 flex flex-col items-start gap-4">
          <div className="flex flex-col items-start gap-4">
            <BlockReveal color="var(--color-brand-blue)">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                INQUIRY
              </div>
            </BlockReveal>
            <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
              <h2 className="text-3xl md:text-[34px] font-bold tracking-tight text-brand-blue uppercase">
                Find Your Perfect Investment
              </h2>
            </BlockReveal>
          </div>
          <p className="text-gray-500 max-w-2xl text-left">
            Quickly share your preferences, and let our experts guide you to the
            best properties.
          </p>
        </div>

        {/* The Widget */}
        <div className="max-w-5xl mx-auto bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-200 p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-0">
          {/* Field 1: Property Type */}
          <div className="w-full md:flex-1 px-5 py-3 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
              Property Type
            </label>
            <Select>
              <SelectTrigger className="w-full bg-transparent border-0 p-0 h-auto text-gray-900 font-semibold shadow-none focus:ring-0 focus:ring-offset-0 hover:bg-transparent rounded-none outline-none ring-0">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-gray-200 font-semibold text-gray-800">
                <SelectItem value="apartment">Luxury Apartment</SelectItem>
                <SelectItem value="plot">Residential Plot</SelectItem>
                <SelectItem value="commercial">Commercial Space</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Field 2: Location */}
          <div className="w-full md:flex-1 px-5 py-3 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
              Preferred Location
            </label>
            <input
              type="text"
              placeholder="e.g. Gulshan, Banani"
              className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none placeholder:font-normal placeholder:text-gray-400 outline-none ring-0"
            />
          </div>

          {/* Field 3: Phone */}
          <div className="w-full md:flex-1 px-5 py-3">
            <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none placeholder:font-normal placeholder:text-gray-400 outline-none ring-0"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleQuickSubmit}
            className="w-full md:w-auto mt-2 md:mt-0 relative group/btn  px-8 py-3 font-bold  uppercase tracking-wider overflow-hidden cursor-pointer shrink-0 border border-[#4ea24b] hover:border-brand-blue hover:text-white flex items-center justify-center"
          >
            <span className="relative z-10">Inquire Now</span>
            <span className="absolute inset-0 bg-[#002f57] scale-x-0 origin-left transition-transform duration-700 ease-out group-hover/btn:scale-x-100 z-0"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
