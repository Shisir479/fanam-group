"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { ConcernType } from "@/services/concern.service";

export default function ConcernDetailsClient({ concern }: { concern: ConcernType }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center pt-32 pb-16">
        <div className="absolute inset-0">
          {concern.heroImage?.url ? (
            <Image
              src={concern.heroImage.url}
              alt={concern.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-medium tracking-wide">Business Concern</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {concern.name}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
              {concern.shortDescription}
            </p>

            {concern.websiteUrl && (
              <a
                href={concern.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg"
              >
                Visit Official Website
                <ExternalLink size={20} />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-20 py-20 max-w-5xl">
        <div className="space-y-20">
          
          {/* Main Content */}
          <div className="space-y-20">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Overview
              </h2>
              <div className="w-16 h-1 bg-amber-500 mb-6" />
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                {concern.longDescription}
              </p>
            </motion.section>

            {/* Features / Services Grid */}
            {concern.features && concern.features.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Core Operations
                </h2>
                <div className="w-16 h-1 bg-amber-500 mb-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {concern.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-6 h-6 text-amber-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Dynamic Real Estate Projects Section */}
            {concern.projects && concern.projects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-16"
              >
                {concern.projects.map((project) => (
                  <div key={project.slug} className="pt-8 border-t border-gray-200 first:border-0 first:pt-0">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">
                        {project.name}
                      </h2>
                      {project.progress !== undefined && (
                        <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 font-bold border border-amber-100 flex items-center gap-2 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          {project.progress}% Complete
                        </span>
                      )}
                    </div>
                    <div className="w-16 h-1 bg-amber-500 mb-8" />
                    
                    <p className="text-lg text-gray-600 leading-relaxed mb-10">
                      {project.overview}
                    </p>

                    {/* Project Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {project.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                          >
                            <CheckCircle2 className="w-5 h-5 text-amber-500" />
                            <span className="font-bold text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Project Gallery */}
                    {project.galleryUrls && project.galleryUrls.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.galleryUrls.map((imgObj, idx) => (
                          <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group shadow-sm border border-gray-100">
                            <Image
                              src={imgObj.url}
                              alt={`${project.name} Gallery ${idx + 1}`}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
