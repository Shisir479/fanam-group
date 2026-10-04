"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { ConcernType } from "@/services/concern.service";
import { InquiryCTA } from "@/components/home/InquiryCTA";

export default function ConcernDetailsClient({
  concern,
}: {
  concern: ConcernType;
}) {
  return (
    <div className="min-h-screen bg-[#EFECE6] text-[#392F5F]">
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
              <h2 className="text-3xl font-bold mb-6 text-[#392F5F]">
                Overview
              </h2>
              <div className="w-16 h-1 bg-[#f9c602] mb-8" />

              <div
                className="text-lg text-gray-700 leading-loose prose prose-lg max-w-none prose-p:text-justify prose-p:mb-6 prose-headings:text-[#392F5F] prose-headings:font-bold prose-a:text-[#f9c602] hover:prose-a:text-[#392F5F] transition-all"
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
                <h2 className="text-3xl font-bold mb-6 text-[#392F5F]">
                  Features
                </h2>
                <div className="w-16 h-1 bg-[#f9c602] mb-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {concern.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-6 md:p-8 rounded-2xl bg-white shadow-sm transition-all duration-300 flex flex-col sm:flex-row items-start gap-5 relative overflow-hidden"
                    >
                      <div className="w-14 h-14 shrink-0 bg-[#f9c602]/20 rounded-xl flex items-center justify-center relative z-10">
                        <CheckCircle2 className="w-7 h-7 text-[#f9c602]" />
                      </div>

                      <div className="relative z-10 pt-1">
                        <h3 className="text-xl font-bold text-[#392F5F] mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-[#392F5F]/80 leading-relaxed text-base text-justify font-medium">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Projects Section */}
            {concern.projects && concern.projects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="pt-10"
              >
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#392F5F]">
                    Our Projects
                  </h2>
                  <div className="w-16 h-1 bg-[#f9c602]" />
                </div>

                <div className="space-y-24">
                  {concern.projects.map((project) => (
                    <div
                      key={project.slug}
                      className="bg-white rounded-2xl p-8 border border-gray-100"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                        <h2 className="text-3xl font-bold text-[#392F5F]">
                          {project.name}
                        </h2>
                        <div className="flex items-center gap-3">
                          {project.websiteUrl && (
                            <a
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-white text-[#392F5F] px-4 py-1.5 rounded-full font-bold hover:bg-[#f9c602] hover:text-white border border-gray-200 shadow-sm transition-all text-sm shrink-0"
                            >
                              Website
                              <ExternalLink size={16} />
                            </a>
                          )}
                          {project.progress !== undefined && (
                            <span className="px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#f9c602] font-bold border border-[#f9c602]/20 flex items-center gap-2 shrink-0 capitalize text-sm">
                              {(project.progress === "ongoing" ||
                                (project.progress as any) === 0) && (
                                <span className="w-2 h-2 rounded-full bg-[#f9c602] animate-pulse" />
                              )}
                              {project.progress !== "upcoming" &&
                              project.progress !== "ongoing" &&
                              project.progress !== "complete"
                                ? Number(project.progress) === 0
                                  ? "ongoing"
                                  : "complete"
                                : project.progress}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-16 h-1 bg-[#f9c602] mb-8" />

                      <div
                        className="text-lg text-gray-600 leading-relaxed mb-10 prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                          __html:
                            project.overview?.replace(/&nbsp;/g, " ") || "",
                        }}
                      />

                      {/* Project Features */}
                      {project.features && project.features.length > 0 && (
                        <div className="mb-10">
                          <h3 className="text-xl font-bold text-[#392F5F] mb-6">
                            Key Highlights
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#f9c602]/20 shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-[#f9c602]" />
                                </div>
                                <span className="text-gray-700 leading-relaxed text-justify">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Project Gallery */}
                      {project.galleryUrls &&
                        project.galleryUrls.length > 0 && (
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
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </div>
      {/* Business Inquiry CTA */}
      <InquiryCTA></InquiryCTA>
    </div>
  );
}
