"use client";

import { BlockReveal } from "@/components/ui/BlockReveal";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen  bg-[#F8FAFC] pb-0 flex flex-col font-sans">
      
      {/* Hero Section - Matching AboutHero */}
      <section className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] flex items-center bg-[#003B6D] overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1653378972306-599af0d77fe4?q=80&w=2069&auto=format&fit=crop"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="container mx-auto px-5 md:px-16 relative z-20">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-4">
              <BlockReveal color="#ffffff">
                <div className="flex items-center text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                  <span className="w-8 h-[2px] bg-white/80 mr-4"></span>
                  Let's Talk
                </div>
              </BlockReveal>
              <BlockReveal color="#ffffff" delay={0.2}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] uppercase">
                  Contact Us
                </h1>
              </BlockReveal>
              <p className="max-w-2xl text-white/80 mt-2 text-sm md:text-base">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Map and Form Split */}
      <section className="container mx-auto px-5 md:px-16 py-16 md:py-24  relative z-20 mb-12 mt-4">
        <div className="bg-white rounded-none shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Map */}
          <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14600.088365449767!2d90.40552796216127!3d23.817793740034444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c65538e12c1b%3A0x63353ec2299778!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1709472314526!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
              title="Bonedi Homes Location"
            />
            {/* Map Overlay to prevent accidental scrolling issues */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-12 bg-white flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Group */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full px-0 py-2.5 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#003B6D] peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#003B6D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none">
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
                    className="block w-full px-0 py-2.5 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#003B6D] peer"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#003B6D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none">
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
                    className="block w-full px-0 py-2.5 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#003B6D] peer"
                    placeholder=" "
                  />
                  <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#003B6D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none">
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
                    className="block w-full px-0 py-2.5 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#003B6D] peer"
                    placeholder=" "
                  />
                  <label htmlFor="subject" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#003B6D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none">
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
                  className="block w-full px-0 py-2.5 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#003B6D] peer resize-none"
                  placeholder=" "
                />
                <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#003B6D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider font-semibold pointer-events-none">
                  Your Message
                </label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 font-bold text-white transition-all duration-300 bg-[#003B6D] rounded-none hover:bg-gray-900 hover:shadow-xl overflow-hidden uppercase tracking-widest text-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="container mx-auto px-5 md:px-16 relative z-20 mb-20">
        <div className="bg-[#003B6D] rounded-none shadow-lg overflow-hidden p-8 text-white relative">
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-48 h-48 bg-white/5 rounded-none blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-white/5 rounded-none blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Office Location */}
            <div className="flex flex-col gap-3 group cursor-default">
              <div className="w-10 h-10 bg-white/10 rounded-none flex items-center justify-center group-hover:bg-white group-hover:text-[#003B6D] transition-colors duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white/90 text-xs uppercase tracking-wider mb-1">Corporate Office</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  House #12, Road #34, Gulshan-2<br />
                  Dhaka-1212, Bangladesh
                </p>
              </div>
            </div>

            {/* Hotline */}
            <div className="flex flex-col gap-3 group cursor-default">
              <div className="w-10 h-10 bg-white/10 rounded-none flex items-center justify-center group-hover:bg-white group-hover:text-[#003B6D] transition-colors duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white/90 text-xs uppercase tracking-wider mb-1">Hotline</h4>
                <p className="text-white/70 text-sm">
                  +880 1711-223344<br />
                  +880 1811-223344
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3 group cursor-default">
              <div className="w-10 h-10 bg-white/10 rounded-none flex items-center justify-center group-hover:bg-white group-hover:text-[#003B6D] transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white/90 text-xs uppercase tracking-wider mb-1">Email</h4>
                <a href="mailto:info@bonedihomes.com" className="text-white/70 text-sm hover:text-white block transition-colors mb-0.5">
                  info@bonedihomes.com
                </a>
                <a href="mailto:sales@bonedihomes.com" className="text-white/70 text-sm hover:text-white block transition-colors">
                  sales@bonedihomes.com
                </a>
              </div>
            </div>

            {/* Business Hours & Social */}
            <div className="flex flex-col gap-3 group cursor-default">
              <div className="w-10 h-10 bg-white/10 rounded-none flex items-center justify-center group-hover:bg-white group-hover:text-[#003B6D] transition-colors duration-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white/90 text-xs uppercase tracking-wider mb-1">Business Hours</h4>
                <p className="text-white/70 text-sm mb-4">
                  Sat - Thu: 9:00 AM - 6:00 PM<br />
                  <span className="text-white/50">Friday: Closed</span>
                </p>
                
                <div className="flex gap-2">
                  <a href="#" className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#003B6D] transition-all duration-300">
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#003B6D] transition-all duration-300">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#003B6D] transition-all duration-300">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#003B6D] transition-all duration-300">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
