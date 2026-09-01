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
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden cursor-pointer  transition-shadow"
                  onClick={() => toggleFaq(faq._id)}
                >
                  <div className="p-6 flex items-start justify-between min-h-[104px]">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 pr-8">
                      {faq.question}
                    </h3>
                    <div
                      className={`transform transition-transform duration-300 mt-1 ${
                        openId === faq._id ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
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
                        <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700/50 mt-2">
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
