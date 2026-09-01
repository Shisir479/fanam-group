"use client";

import Link from "next/link";
import { PageBanner } from "@/components/ui/PageBanner";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { SitemapCategory } from "@/services/settings.service";

interface VisualSitemapClientProps {
  initialData?: SitemapCategory[];
}

export default function VisualSitemapClient({
  initialData,
}: VisualSitemapClientProps) {
  const sitemapData = initialData && initialData.length > 0 ? initialData : [];

  const renderIcon = (iconName: string, className: string) => {
    const Icon = (Icons as any)[iconName] || Icons.FileText;
    return <Icon className={className} />;
  };

  return (
    <>
      <PageBanner
        title="Visual Sitemap"
        subtitle="Discover Fanam Group"
        bgImage="/assets/images/banner/about-banner.jpg"
      />

      <section className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900 min-h-screen overflow-x-auto overflow-y-hidden">
        {/* Dot grid background pattern for flowchart vibe */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#9ca3af 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto min-w-[800px] pb-20">
          {/* Root Node: Home */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/"
                className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-[#f9c602]  relative"
              >
                <Icons.Home className="w-6 h-6 text-[#f9c602]" />
                <span className="font-bold text-gray-900 dark:text-white text-lg">
                  Fanam Group (Home)
                </span>
              </Link>
            </motion.div>

            {/* Main vertical line from root */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 40 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-0.5 bg-[#0a1128]/30 dark:bg-gray-600"
            ></motion.div>
          </div>

          {/* Categories Level */}
          <div className="relative flex justify-between w-full mt-0">
            {/* The horizontal connecting line across categories */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-0 left-[12.5%] right-[12.5%] h-0.5 bg-[#0a1128]/30 dark:bg-gray-600 origin-center"
            ></motion.div>

            {sitemapData.map((category, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center w-1/4 relative"
              >
                {/* Vertical drop line to category */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 32 }}
                  transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                  className="w-0.5 bg-[#0a1128]/30 dark:bg-gray-600"
                ></motion.div>

                {/* Category Node */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                  className="px-6 py-2 bg-[#392f5f] text-white rounded-lg shadow-md font-semibold text-sm z-10 relative whitespace-nowrap"
                >
                  {category.title}
                </motion.div>

                {/* Sub-items Line & Nodes */}
                <div className="flex flex-col items-center mt-4 w-full relative">
                  {category.items.map((item, itemIdx) => {
                    return (
                      <div
                        key={itemIdx}
                        className="flex flex-col items-center relative w-full group"
                      >
                        {/* Connecting line to item */}
                        <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600 transition-colors group-hover:bg-[#f9c602]"></div>

                        {/* Item Node */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.9 + idx * 0.1 + itemIdx * 0.1,
                          }}
                          className="z-10 relative"
                        >
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-[#f9c602] hover:shadow-md transition-all duration-300 min-w-[180px] justify-center"
                          >
                            {renderIcon(
                              item.icon,
                              "w-4 h-4 text-[#0a1128] group-hover:text-[#f9c602] transition-colors",
                            )}
                            <span className="font-medium text-gray-700 dark:text-gray-200 text-sm group-hover:text-[#f9c602] transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
