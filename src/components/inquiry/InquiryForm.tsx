"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  createInvestmentBookingPublic,
  InvestmentBookingPayload,
} from "@/services/investment-booking.service";
import { CheckCircle2 } from "lucide-react";

import { BlockReveal } from "@/components/ui/BlockReveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InquiryForm() {
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    preferredLocation: "",
    projectName: "",
  });

  useEffect(() => {
    const queryPhone = searchParams.get("phone");
    const queryLocation = searchParams.get("location");
    const queryPropertyType = searchParams.get("propertyType");
    const queryProjectName = searchParams.get("projectName");

    if (queryPhone || queryLocation || queryPropertyType || queryProjectName) {
      setFormData((prev) => ({
        ...prev,
        ...(queryPhone && { phone: queryPhone }),
        ...(queryLocation && { preferredLocation: queryLocation }),
        ...(queryPropertyType && { propertyType: queryPropertyType }),
        ...(queryProjectName && { projectName: queryProjectName }),
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.fullName || !formData.phone) {
      setErrorMsg("Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload: InvestmentBookingPayload = {
        ...formData,
        investmentAmount: 0,
        propertyType: (formData.propertyType as any) || "Apartment",
        signature: { _id: "dummy", url: "dummy" },
      };
      const res = await createInvestmentBookingPublic(payload);
      if (res?.success) {
        setIsSuccess(true);
      } else {
        throw new Error(res?.message || "Failed to submit inquiry");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to submit inquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-brand-blue text-white py-14 px-8 md:px-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10 flex flex-col items-center md:items-start">
          <BlockReveal color="#ffffff">
            <div className="flex items-center text-[12px] font-bold tracking-[0.25em] text-white/70 uppercase mb-3">
              Start Your Journey
            </div>
          </BlockReveal>
          <BlockReveal color="#ffffff" delay={0.2}>
            <h1 className="text-3xl md:text-[38px] font-bold mb-4 tracking-tight uppercase">
              Property Inquiry
            </h1>
          </BlockReveal>
          <p className="text-white/80 text-sm md:text-base max-w-2xl text-center md:text-left mt-2">
            Fill in the form below to submit your inquiry. Our experts will
            contact you soon.
          </p>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-8 md:p-14 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2 border border-green-100">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Inquiry Submitted!
          </h2>
          <p className="text-gray-500 max-w-md text-base leading-relaxed">
            Thank you for reaching out. One of our property consultants will
            review your request and get back to you shortly.
          </p>
          <div className="pt-6 w-full flex justify-center border-t border-gray-100">
            <a
              href="/projects"
              className="bg-brand-blue text-white px-10 py-4 font-bold uppercase tracking-wider shadow-md hover:bg-[#002f57] transition-all transform hover:-translate-y-0.5"
            >
              Browse More Projects
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 md:p-14 space-y-8">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-4 border border-red-100 text-sm font-semibold text-center">
              {errorMsg}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Property Type
              </label>
              <Select
                value={formData.propertyType}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, propertyType: val || "" }))
                }
              >
                <SelectTrigger className="w-full border border-gray-200 p-3.5 h-auto rounded-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold shadow-none">
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

            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Preferred Location
              </label>
              <input
                type="text"
                placeholder="Example: Sonargaon, Purbachal"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-200 gap-6 mt-10">
            <p className="text-sm text-gray-500 font-semibold text-center md:text-left max-w-xs">
              By submitting this form, you authorize our team to contact you.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto relative group/btn bg-brand-blue px-12 py-4 font-bold text-white uppercase tracking-wider overflow-hidden cursor-pointer shadow-md flex items-center justify-center shrink-0"
            >
              <span className="relative z-10">
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </span>
              <span className="absolute inset-0 bg-[#002f57] scale-x-0 origin-left transition-transform duration-700 ease-out group-hover/btn:scale-x-100 z-0"></span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
