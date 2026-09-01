"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { ConcernType } from "@/services/concern.service";

export default function ConcernDetailsClient({
  concern,
}: {
  concern: ConcernType;
}) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[350px] md:min-h-[350px] flex items-center pt-32 pb-16">
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
            <div className="w-full h-full bg-black" />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
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
                className="inline-flex items-center gap-2 bg-[#f9c602] text-black px-8 py-3 rounded-full font-bold transition-colors shadow-lg"
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
              <h2 className="text-3xl font-bold mb-6 text-black">Overview</h2>
              <div className="w-16 h-1 bg-[#f9c602] mb-6" />
              <div
                className="text-lg text-gray-600 leading-relaxed prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    concern.longDescription?.replace(/&nbsp;/g, " ") || "",
                }}
              />
            </motion.section>

            {/* Features / Services Grid */}
            {concern.features && concern.features.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-black">
                  Core Operations
                </h2>
                <div className="w-16 h-1 bg-[#f9c602] mb-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {concern.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded-2xl bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="w-12 h-12 bg-[#f9c602]/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-6 h-6 text-[#f9c602]" />
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">
                        {feature.title}
                      </h3>
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
                  <div
                    key={project.slug}
                    className="pt-8 border-t border-black/10 first:border-0 first:pt-0"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-black">
                        {project.name}
                      </h2>
                      {project.progress !== undefined && (
                        <span className="px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#f9c602] font-bold border border-[#f9c602]/20 flex items-center gap-2 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-[#f9c602] animate-pulse" />
                          {project.progress}% Complete
                        </span>
                      )}
                    </div>
                    <div className="w-16 h-1 bg-[#f9c602] mb-8" />

                    <div
                      className="text-lg text-gray-600 leading-relaxed mb-10 prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: project.overview?.replace(/&nbsp;/g, " ") || "",
                      }}
                    />

                    {/* Project Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {project.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white border border-black/10 shadow-sm"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#f9c602]" />
                            <span className="font-bold text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Project Gallery */}
                    {project.galleryUrls && project.galleryUrls.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.galleryUrls.map((imgObj, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-video rounded-2xl overflow-hidden group shadow-sm border border-black/10"
                          >
                            <Image
                              src={imgObj.url}
                              alt={`${project.name} Gallery ${idx + 1}`}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.section>
            )}
          </div>

          {/* Business Inquiry CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 p-10 md:p-14 bg-gray-50 border border-gray-100 rounded-3xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-black">
              Business Inquiry
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Interested in collaborating or have questions about {concern.name}
              ? Get in touch with our team for business opportunities and
              inquiries.
            </p>
            <a
              href={`/inquiry?subject=${encodeURIComponent(concern.name)}`}
              className="inline-flex items-center gap-2 bg-[#181428] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#f9c602] hover:text-[#181428] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact This Concern
            </a>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
