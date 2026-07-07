import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projectData";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { GalleryViewer } from "@/components/ui/GalleryViewer";
import {
  MapPin,
  Waves,
  Dumbbell,
  Users,
  Baby,
  TreePine,
  Book,
  CheckCircle2,
  Download,
  Share2,
  Building2,
  BedDouble,
  Bath,
  Maximize,
  FileText,
  XIcon,
} from "lucide-react";

// Inline SVG components to replace Lucide brand icons
const Facebook = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      clipRule="evenodd"
    />
  </svg>
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - Bonedi Homes Projects`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Fallback icons map for amenities
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Waves":
        return <Waves className="w-6 h-6" />;
      case "Dumbbell":
        return <Dumbbell className="w-6 h-6" />;
      case "Users":
        return <Users className="w-6 h-6" />;
      case "Baby":
        return <Baby className="w-6 h-6" />;
      case "TreePine":
        return <TreePine className="w-6 h-6" />;
      case "Book":
        return <Book className="w-6 h-6" />;
      default:
        return <CheckCircle2 className="w-6 h-6" />;
    }
  };

  const similarProjects = projects
    .filter(
      (p) =>
        p.id !== project.id &&
        (p.category === project.category || p.status[0] === project.status[0]),
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 pb-0 font-sans">
      {/* 1. Project Banner */}
      <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] flex items-end bg-[#003B6D] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <div className="container mx-auto px-5 md:px-16 relative z-20 pb-20 md:pb-28">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-[#003B6D] text-white text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 shadow-sm">
                {project.category}
              </span>
              {project.status.map((s) => (
                <span
                  key={s}
                  className="bg-white text-[#003B6D] text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 shadow-sm capitalize"
                >
                  {s}
                </span>
              ))}
            </div>

            <BlockReveal color="#ffffff">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] uppercase mb-4 drop-shadow-lg">
                {project.title}
              </h1>
            </BlockReveal>
          </div>
        </div>
      </section>

      {/* Quick Info Bar (Overlapping Hero) */}
      <div className="container mx-auto px-5 md:px-16 -mt-12 md:-mt-16 relative z-30 mb-16">
        <div className="bg-white p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100 ">
          <div className="flex-1 flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 first:pt-0">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#003B6D]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                Location
              </p>
              <p className="text-[#003B6D] font-bold text-lg">
                {project.location}
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 px-0 md:px-8">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#003B6D]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                Status
              </p>
              <p className="text-[#003B6D] font-bold text-lg capitalize">
                {project.status[0]}
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 pl-0 md:pl-8">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-[#003B6D]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                Property Type
              </p>
              <p className="text-[#003B6D] font-bold text-lg capitalize">
                {project.category}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overview & Features (Split Layout) */}
      <section id="overview" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-5 md:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="flex flex-col gap-3 mb-12">
                <BlockReveal color="#003B6D">
                  <h2 className="text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                    About The Project
                  </h2>
                </BlockReveal>
                <BlockReveal color="#003B6D" delay={0.2}>
                  <h3 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase  inline-block">
                    Project Overview
                  </h3>
                </BlockReveal>
              </div>
              <p className="text-gray-600 text-lg leading-[1.8] font-light">
                {project.overview || project.description}
              </p>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              {project.features && (
                <div className="bg-gray-50 p-8 md:p-10 border border-gray-100  h-full shadow-sm">
                  <h3 className="text-xl font-bold text-[#003B6D] mb-6 uppercase tracking-wider">
                    Key Features
                  </h3>
                  <ul className="flex flex-col gap-5">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="bg-white p-1 rounded-full shadow-sm mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-[#003B6D] flex-shrink-0" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Amenities */}
      {project.amenities && (
        <section
          id="amenities"
          className="py-12 md:py-16 bg-gray-50 "
        >
          <div className="container mx-auto px-5 md:px-16 max-w-7xl">
            <div className="mb-12 flex flex-col gap-3">
              <BlockReveal color="#003B6D">
                <h2 className="text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                  Lifestyle
                </h2>
              </BlockReveal>
              <BlockReveal color="#003B6D" delay={0.2}>
                <h3 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase">
                  World-Class Amenities
                </h3>
              </BlockReveal>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {project.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 border border-gray-100 flex flex-col items-center justify-center text-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group "
                >
                  <div className="w-16 h-16 bg-blue-50  flex items-center justify-center group-hover:bg-[#003B6D] transition-colors duration-300">
                    <div className="text-[#003B6D] group-hover:text-white transition-colors duration-300">
                      {getIcon(amenity.icon)}
                    </div>
                  </div>
                  <span className="text-[16px] font-bold text-gray-800 tracking-wide">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Floor Plans */}
      {project.floorPlans && (
        <section id="floor-plans" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 md:px-16 max-w-7xl">
            <div className="mb-12 flex flex-col gap-3">
              <BlockReveal color="#003B6D">
                <h2 className="text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                  Residences
                </h2>
              </BlockReveal>
              <BlockReveal color="#003B6D" delay={0.2}>
                <h3 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase">
                  Floor Plans
                </h3>
              </BlockReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.floorPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-white  shadow-sm transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-5 text-center border-b border-gray-100 bg-[#f8f9fa]">
                    <h4 className="text-[16px] font-bold text-[#003B6D] uppercase tracking-wide">
                      {plan.name}
                    </h4>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-white">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200 bg-[#f8f9fa] py-5">
                    <div className="text-center px-2 flex flex-col items-center">
                      <Maximize className="w-4 h-4 text-[#003B6D] mb-1.5" strokeWidth={1.5} />
                      <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                        Size
                      </span>
                      <span className="text-[14px] font-bold text-gray-900">
                        {plan.size}
                      </span>
                    </div>
                    <div className="text-center px-2 flex flex-col items-center">
                      <BedDouble className="w-4 h-4 text-[#003B6D] mb-1.5" strokeWidth={1.5} />
                      <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                        Beds
                      </span>
                      <span className="text-[14px] font-bold text-gray-900">
                        {plan.beds}
                      </span>
                    </div>
                    <div className="text-center px-2 flex flex-col items-center">
                      <Bath className="w-4 h-4 text-[#003B6D] mb-1.5" strokeWidth={1.5} />
                      <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                        Baths
                      </span>
                      <span className="text-[14px] font-bold text-gray-900">
                        {plan.baths}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Gallery (Dynamic Grid) */}
      {project.gallery && (
        <section
          id="gallery"
          className="py-16 md:py-24 bg-gray-50 "
        >
          <div className="container mx-auto px-5 md:px-16 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="flex flex-col gap-3">
                <BlockReveal color="#003B6D">
                  <h2 className="text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                    Visuals
                  </h2>
                </BlockReveal>
                <BlockReveal color="#003B6D" delay={0.2}>
                  <h3 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase">
                    Project Gallery
                  </h3>
                </BlockReveal>
              </div>
            </div>

            <GalleryViewer images={project.gallery} />
          </div>
        </section>
      )}

      {/* Construction Progress & Video */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-5 md:px-16 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Progress */}
            {project.constructionProgress && (
              <div id="progress" className="flex flex-col h-full">
                <div className="flex flex-col gap-3 mb-12">
                  <BlockReveal color="#003B6D">
                    <h2 className="text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                      Status
                    </h2>
                  </BlockReveal>
                  <BlockReveal color="#003B6D" delay={0.2}>
                    <h3 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase inline-block">
                      Construction Progress
                    </h3>
                  </BlockReveal>
                </div>

                <div className="bg-gray-50 p-10 shadow-sm flex flex-col justify-center flex-grow">
                  <div className="flex justify-between text-[13px] text-gray-500 mb-4 font-bold uppercase tracking-wider">
                    <span>
                      Started: {project.constructionProgress.startDate}
                    </span>
                    <span>
                      Completion: {project.constructionProgress.endDate}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full bg-[#003B6D] relative"
                      style={{
                        width: `${project.constructionProgress.percentage}%`,
                      }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 animate-pulse skew-x-[-20deg]"></div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-gray-500 font-medium">
                      Overall Completion
                    </span>
                    <div className="text-4xl font-bold text-[#003B6D]">
                      {project.constructionProgress.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Tour */}
            {project.videoTourUrl && (
              <div id="video-tour" className="flex flex-col h-full">
                <div className="flex flex-col gap-3 mb-12">
                  <BlockReveal color="#003B6D">
                    <h2 className="text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                      Experience
                    </h2>
                  </BlockReveal>
                  <BlockReveal color="#003B6D" delay={0.2}>
                    <h3 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase   inline-block">
                      Video Tour
                    </h3>
                  </BlockReveal>
                </div>
                <div className="relative w-full h-full min-h-[250px] bg-gray-200 border border-gray-200 overflow-hidden shadow-sm flex-grow">
                  <iframe
                    src={project.videoTourUrl}
                    title="Video Tour"
                    className="w-full h-full absolute inset-0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Location Map */}
      {project.locationMapUrl && (
        <section id="location" className="py-8 md:py-10 bg-gray-50 ">
          <div className="container mx-auto px-5 md:px-16 max-w-7xl">
            <div className="mb-12 flex flex-col gap-3">
              <BlockReveal color="#003B6D">
                <h2 className="text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                  Neighborhood
                </h2>
              </BlockReveal>
              <BlockReveal color="#003B6D" delay={0.2}>
                <h3 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase">
                  Location Map
                </h3>
              </BlockReveal>
            </div>
            <div className="relative w-full h-[300px] md:h-[400px] bg-white border border-gray-200 p-2 shadow-sm ">
              <iframe
                src={project.locationMapUrl}
                title="Location Map"
                className="w-full h-full  filter contrast-[1.05]"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* 8. Inquiry Section */}
      <section className="w-full bg-[#003B6D] py-10 md:py-16 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="container mx-auto px-5 md:px-16 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side: Text and Actions */}
            <div className="flex flex-col text-white">
              <div className="mb-3">
                <BlockReveal color="#ffffff">
                  <h2 className="text-2xl md:text-[34px] Interested in this project?
 font-bold uppercase tracking-wide">
                    Interested in this project?
                  </h2>
                </BlockReveal>
              </div>
              <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-md mb-8">
                Get in touch with our property consultants to learn more about
                availability, pricing details, and private viewings.
              </p>

              <button className="bg-white text-[#003B6D] hover:bg-gray-100 font-bold text-[12px] tracking-widest uppercase py-3 px-6 w-max transition-colors mb-10 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Brochure
              </button>

              <div>
                <span className="block text-[11px] font-bold text-white/50 uppercase tracking-widest mb-4">
                  Share Project
                </span>
                <div className="flex gap-3">
                  <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                    <Facebook className="w-4 h-4 fill-current" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                    <Twitter className="w-4 h-4 fill-current" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                    <Linkedin className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Inquiry CTA */}
            <div className="bg-white p-8 md:p-12 shadow-2xl flex flex-col items-center justify-center text-center h-full">
              <div className="mb-4">
                <BlockReveal color="#003B6D">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#003B6D] uppercase tracking-wide">
                    Send an Inquiry
                  </h3>
                </BlockReveal>
              </div>
              <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-8 max-w-sm mx-auto">
                Ready to take the next step? Click below to fill out our detailed inquiry form and connect with our property consultants.
              </p>
              
              <Link
                href="/inquiry"
                className="inline-block bg-[#003B6D] text-white font-bold text-[13px] tracking-widest uppercase py-3 px-10 hover:bg-[#002f57] transition-colors shadow-md w-full sm:w-auto"
              >
                Go to Inquiry Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Similar Projects */}
      {similarProjects.length > 0 && (
        <section className="bg-gray-50 py-12 md:py-16 border-t border-gray-200">
          <div className="container mx-auto px-5 md:px-16 max-w-7xl">
            <div className="mb-12">
              <BlockReveal color="#003B6D">
                <h2 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.3] uppercase">
                  Similar Projects
                </h2>
              </BlockReveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProjects.map((p) => (
                <a
                  href={`/projects/${p.slug}`}
                  key={p.id}
                  className="group block bg-white shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-[#003B6D] uppercase tracking-wider ">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                      {p.location}
                    </span>
                    <h4 className="text-lg font-bold text-[#003B6D] group-hover:text-[#003B6D]/80 transition-colors">
                      {p.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
