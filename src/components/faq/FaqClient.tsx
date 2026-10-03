"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";

import { FAQ } from "@/services/faq.service";

interface FaqClientProps {
  initialFaqs: FAQ[];
}

export function FaqClient({ initialFaqs = [] }: FaqClientProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <PageBanner
        title="FAQ"
        subtitle="Common questions, answered."
        bgImage="/assets/images/banner/about-banner.jpg"
      />

      <section className="py-20 px-4 md:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {initialFaqs.length > 0 ? (
              initialFaqs.map((faq) => (
                <div
                  key={faq._id}
                  className={`bg-white border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 group ${
                    openId === faq._id
                      ? "border-[#f9c602]/50 shadow-sm"
                      : "border-black/10 hover:border-[#f9c602]/50"
                  }`}
                  onClick={() => toggleFaq(faq._id)}
                >
                  <div className="p-6 flex items-start justify-between min-h-[104px]">
                    <h3
                      className={`text-lg font-bold transition-colors duration-300 pr-8 ${
                        openId === faq._id
                          ? "text-[#f9c602]"
                          : "text-[#392f5f] group-hover:text-[#f9c602]"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`transform transition-transform duration-300 mt-1 ${
                        openId === faq._id ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-colors duration-300 ${
                          openId === faq._id
                            ? "text-[#f9c602]"
                            : "text-[#392f5f] group-hover:text-[#f9c602]"
                        }`}
                      />
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {openId === faq._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-black/10 mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                No FAQs available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
