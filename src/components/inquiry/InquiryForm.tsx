"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  createInvestmentBookingPublic,
  InvestmentBookingPayload,
} from "@/services/investment-booking.service";
import { CheckCircle2, Send, ArrowRight } from "lucide-react";

export default function InquiryForm() {
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const queryPhone = searchParams.get("phone");
    const querySubject = searchParams.get("subject");

    if (queryPhone || querySubject) {
      setFormData((prev) => ({
        ...prev,
        ...(queryPhone && { phone: queryPhone }),
        ...(querySubject && { subject: querySubject }),
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
      const res = await createInvestmentBookingPublic(formData);
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
    <div className="w-full bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100 overflow-hidden relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#392F5F] text-white py-12 px-8 md:px-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f9c602]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 text-[#f9c602] text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/10">
            Get Started
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-10 md:p-16 flex flex-col items-center text-center space-y-6">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-2 border-4 border-green-100 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Inquiry Submitted!
          </h2>
          <p className="text-gray-500 max-w-md text-base leading-relaxed">
            Thank you for reaching out. One of our representatives will review
            your request and get back to you shortly.
          </p>
          <div className="pt-8 w-full flex justify-center">
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  subject: "",
                  message: "",
                });
              }}
              className="group inline-flex items-center gap-3 bg-[#392f5f] text-white px-8 py-3 rounded-full font-medium hover:bg-[#f9c602] hover:text-[#392f5f] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Submit Another Inquiry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 md:p-14 bg-white">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-4 border border-red-100 text-sm font-semibold rounded-xl text-center mb-8">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="block w-full px-0 py-3 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer"
                placeholder=" "
              />
              <label
                htmlFor="fullName"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none"
              >
                Full Name *
              </label>
            </div>

            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="block w-full px-0 py-3 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none"
              >
                Phone Number *
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-0 py-3 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="block w-full px-0 py-3 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer"
                placeholder=" "
              />
              <label
                htmlFor="subject"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none"
              >
                Subject / Concern Name
              </label>
            </div>

            <div className="relative md:col-span-2">
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="block w-full px-0 py-3 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer"
                placeholder=" "
              />
              <label
                htmlFor="message"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none"
              >
                Message / Additional Details
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 mt-4 gap-6">
            <p className="text-sm text-gray-400 font-medium text-center md:text-left max-w-sm">
              By submitting this form, you authorize our team to contact you
              regarding your inquiry.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto group inline-flex items-center justify-center gap-3 bg-[#f9c602] text-[#392f5f] px-10 py-3.5 rounded-full font-bold hover:bg-[#d4a900] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
