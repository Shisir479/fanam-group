"use client";

import { PageBanner } from "@/components/ui/PageBanner";
import { SharedButton } from "@/components/ui/SharedButton";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { submitContactForm } from "@/services/contact.service";
import toast from "react-hot-toast";

const Facebook = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const getMapSrc = (input: string | undefined) => {
  const defaultSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14600.088365449767!2d90.40552796216127!3d23.817793740034444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c65538e12c1b%3A0x63353ec2299778!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1709472314526!5m2!1sen!2sbd";
  if (!input) return defaultSrc;

  if (input.includes("<iframe") && input.includes("src=")) {
    const match = input.match(/src="([^"]+)"/);
    if (match && match[1] && match[1].includes("google.com/maps"))
      return match[1];
  }

  if (input.includes("google.com/maps/embed")) {
    return input;
  }

  return defaultSrc;
};

export function ContactView({ data, banner }: { data?: any; banner?: any }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        toast.success(
          "Thank you for your message! We will get back to you soon.",
          {
            duration: 5000,
            position: "top-center",
          },
        );
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(res.message || "Failed to submit form. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  data?.addressOnMap;
  return (
    <main className="min-h-screen  bg-[#F8FAFC] pb-0 flex flex-col font-sans">
      {/* Hero Section - Matching AboutHero */}
      <PageBanner
        title={banner?.title || "Contact Us"}
        bgImage={
          banner?.backgroundImage ||
          "https://images.unsplash.com/photo-1653378972306-599af0d77fe4?q=80&w=2069&auto=format&fit=crop"
        }
        altText={banner?.title || "Contact Us"}
      ></PageBanner>

      {/* Contact Section - Map and Form Split */}
      <section className="container mx-auto px-5 md:px-16 py-16 md:py-24 relative z-20 mb-12 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Left Side: Map */}
          <div className="w-full lg:w-1/2 h-[350px] lg:h-auto relative bg-gray-100">
            <iframe
              src={getMapSrc(data?.addressOnMap)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
              title="Fanam Group Location"
            />
            {/* Map Overlay to prevent accidental scrolling issues */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-12 bg-white flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[#392f5f] mb-6 uppercase tracking-wide">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Group */}
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="block w-full px-0 py-2.5 text-base text-[#392f5f] bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer font-medium"
                    placeholder=" "
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute text-sm text-[#392f5f]/70 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-bold pointer-events-none"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-0 py-2.5 text-base text-[#392f5f] bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer font-medium"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-[#392f5f]/70 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-bold pointer-events-none"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="block w-full px-0 py-2.5 text-base text-[#392f5f] bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer font-medium"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm text-[#392f5f]/70 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-bold pointer-events-none"
                  >
                    Phone Number
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full px-0 py-2.5 text-base text-[#392f5f] bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer font-medium"
                    placeholder=" "
                  />
                  <label
                    htmlFor="subject"
                    className="absolute text-sm text-[#392f5f]/70 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-bold pointer-events-none"
                  >
                    Subject
                  </label>
                </div>
              </div>

              <div className="relative mt-2">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="block w-full px-0 py-2.5 text-base text-[#392f5f] bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f9c602] peer resize-none font-medium"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute text-sm text-[#392f5f]/70 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f9c602] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-bold pointer-events-none"
                >
                  Your Message
                </label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-[#f9c602] text-[#392f5f] hover:bg-[#392f5f] hover:text-[#f9c602] px-8 py-3 rounded-full font-black uppercase tracking-wide transition-colors group w-fit duration-300"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section className="container mx-auto px-5 md:px-16 relative z-20 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-[#392F5F] rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 text-white relative"
        >
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 items-center">
            {/* Office Location */}
            <div className="flex flex-col md:items-center md:text-center gap-4 group cursor-default">
              <div className="w-14 h-14 bg-white/5 border border-[#f9c602] text-[#f9c602] rounded-2xl flex items-center justify-center group-hover:bg-[#f9c602] group-hover:text-[#392f5f] transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-2">
                  Corporate Office
                </h4>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                  {data?.address ||
                    "House #12, Road #34, Gulshan-2\nDhaka-1212, Bangladesh"}
                </p>
              </div>
            </div>

            {/* Hotline */}
            <div className="flex flex-col md:items-center md:text-center gap-4 group cursor-default">
              <div className="w-14 h-14 bg-white/5 border border-[#f9c602] text-[#f9c602] rounded-2xl flex items-center justify-center group-hover:bg-[#f9c602] group-hover:text-[#392f5f] transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-2">
                  Hotline
                </h4>
                <p className="text-white/70 text-sm whitespace-pre-line">
                  {data?.phone || "+880 1711-223344\n+880 1811-223344"}
                  {data?.whatsappNo ? `\n${data.whatsappNo}` : ""}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col md:items-center md:text-center gap-4 group cursor-default">
              <div className="w-14 h-14 bg-white/5 border border-[#f9c602] text-[#f9c602] rounded-2xl flex items-center justify-center group-hover:bg-[#f9c602] group-hover:text-[#392f5f] transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white/90 text-sm uppercase tracking-widest mb-2">
                  Email
                </h4>
                <a
                  href={`mailto:${data?.email || "info@bonedihomes.com"}`}
                  className="text-white/70 text-sm hover:text-white block transition-colors mb-0.5"
                >
                  {data?.email || "info@bonedihomes.com"}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
