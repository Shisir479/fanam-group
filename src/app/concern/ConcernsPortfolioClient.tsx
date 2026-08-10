"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ConcernType } from "@/services/concern.service";

export default function ConcernsPortfolioClient({ concerns }: { concerns: ConcernType[] }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-5xl mb-16 text-center mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900"
        >
          Our <span className="text-amber-500 font-light italic">Ecosystem</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-light"
        >
          Explore the diverse concerns of Fanam Group. From reshaping skylines with real estate
          to delivering unbiased news, crafting global tours, and revolutionizing e-commerce.
        </motion.p>
      </div>

      {/* Premium Editorial Showcase */}
      <div className="flex flex-col gap-16 md:gap-24">
        {concerns?.map((concern, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={concern._id || concern.slug} className="container mx-auto px-6 md:px-12 max-w-6xl">
              <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
                
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-1/2"
                >
                  <Link href={`/concern/${concern.slug}`} className="block relative group">
                    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-3xl shadow-xl">
                      {concern.heroImage?.url ? (
                        <Image
                          src={concern.heroImage.url}
                          alt={concern.name}
                          fill
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                  </Link>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full md:w-1/2 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-[2px] w-8 bg-amber-500" />
                    <span className="text-amber-500 font-semibold tracking-widest uppercase text-xs">
                      0{index + 1} &mdash; {concern.slug.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                    {concern.name}
                  </h2>
                  
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 font-light line-clamp-3">
                    {concern.shortDescription}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/concern/${concern.slug}`}
                      className="group flex items-center justify-center gap-2 bg-gray-900 hover:bg-amber-500 text-white px-6 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300"
                    >
                      Discover More
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    {concern.websiteUrl && (
                      <a
                        href={concern.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 bg-transparent hover:bg-gray-50 text-gray-900 border border-gray-200 px-6 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300"
                      >
                        Visit Site
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </motion.div>

              </div>
            </div>
          );
        })}
        {(!concerns || concerns.length === 0) && (
           <div className="text-center text-gray-500 py-12">No concerns found.</div>
        )}
      </div>
    </div>
  );
}
