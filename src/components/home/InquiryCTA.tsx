"use client";

import { useState } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInvestmentBookingPublic } from "@/services/investment-booking.service";
import { CheckCircle2 } from "lucide-react";

export function InquiryCTA() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!fullName || !phone) {
      setErrorMsg("Please enter your name and phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createInvestmentBookingPublic({
        fullName,
        phone,
        email,
        preferredLocation: location,
        propertyType: (propertyType as any) || "Apartment",
        investmentAmount: 0,
        signature: { _id: "dummy", url: "dummy" },
      });

      if (res?.success) {
        setIsSuccess(true);
        setFullName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setPropertyType("");
      } else {
        throw new Error(res?.message || "Failed to submit inquiry");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-24 bg-gray-50 relative z-10">
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

        {errorMsg && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 border border-red-100 text-sm font-semibold max-w-6xl mx-auto text-center">
            {errorMsg}
          </div>
        )}

        {/* The Widget - Redesigned as a Grid for more fields */}
        {isSuccess ? (
          <div className="max-w-6xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-200 p-8 flex flex-col items-center text-center mx-auto">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Inquiry Submitted Successfully!
            </h3>
            <p className="text-gray-500 text-sm max-w-md mb-6">
              Thank you for reaching out. Our experts will contact you soon.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-brand-blue text-white px-8 py-3 font-bold uppercase tracking-wider text-sm shadow-md hover:bg-[#002f57] transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <div className="max-w-6xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-200 grid grid-cols-1 lg:grid-cols-3">
            {/* Row 1, Col 1: Name */}
            <div className="w-full px-5 py-4 border-b border-gray-200 lg:border-r">
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none placeholder:font-normal placeholder:text-gray-400 outline-none ring-0"
              />
            </div>

            {/* Row 1, Col 2: Email */}
            <div className="w-full px-5 py-4 border-b border-gray-200 lg:border-r">
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none placeholder:font-normal placeholder:text-gray-400 outline-none ring-0"
              />
            </div>

            {/* Row 1, Col 3: Phone */}
            <div className="w-full px-5 py-4 border-b border-gray-200">
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none placeholder:font-normal placeholder:text-gray-400 outline-none ring-0"
              />
            </div>

            {/* Row 2, Col 1: Property Type */}
            <div className="w-full px-5 py-4 border-b lg:border-b-0 border-gray-200 lg:border-r">
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                Property Type
              </label>
              <Select
                value={propertyType}
                onValueChange={(val) => setPropertyType(val || "")}
              >
                <SelectTrigger className="w-full bg-transparent border-0 p-0 h-auto text-gray-900 font-semibold shadow-none focus:ring-0 focus:ring-offset-0 hover:bg-transparent rounded-none outline-none ring-0">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-gray-200 font-semibold text-gray-800 bg-white">
                  <SelectItem
                    className="hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100 focus:text-brand-blue"
                    value="Residential"
                  >
                    Residential
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100 focus:text-brand-blue"
                    value="Commercial"
                  >
                    Commercial
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100 focus:text-brand-blue"
                    value="Mixed Use"
                  >
                    Mixed Use
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100 focus:text-brand-blue"
                    value="Apartment"
                  >
                    Apartment
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100 focus:text-brand-blue"
                    value="Villa"
                  >
                    Villa
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100 focus:text-brand-blue"
                    value="Land"
                  >
                    Land
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 2, Col 2: Location */}
            <div className="w-full px-5 py-4 border-b lg:border-b-0 border-gray-200 lg:border-r">
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                Preferred Location
              </label>
              <input
                type="text"
                placeholder="e.g. Gulshan, Banani"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none placeholder:font-normal placeholder:text-gray-400 outline-none ring-0"
              />
            </div>

            {/* Row 2, Col 3: Button */}
            <div className="w-full p-4 flex items-center border-t lg:border-t-0 border-gray-200">
              <button
                onClick={handleQuickSubmit}
                disabled={isSubmitting}
                className="w-full relative group/btn px-8 py-3.5 font-bold uppercase tracking-wider overflow-hidden cursor-pointer border border-[#4ea24b] hover:border-brand-blue hover:text-white flex items-center justify-center disabled:opacity-70"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Submitting..." : "Inquire Now"}
                </span>
                <span className="absolute inset-0 bg-[#002f57] scale-x-0 origin-left transition-transform duration-700 ease-out group-hover/btn:scale-x-100 z-0"></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
