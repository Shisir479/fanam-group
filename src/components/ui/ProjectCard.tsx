import Image from "next/image";
import Link from "next/link";
import { SharedButton } from "@/components/ui/SharedButton";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: any;
  className?: string;
  isSwiperSlide?: boolean;
}

export function ProjectCard({
  project,
  className,
  isSwiperSlide,
}: ProjectCardProps) {
  const content = (
    <>
      {/* Background Image that slowly zooms on hover */}
      <Image
        src={
          project.cover?.url ||
          project.image ||
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
        }
        alt={project.name || project.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 45vw, (max-width: 1024px) 40vw, 30vw"
        className="object-cover transition-transform duration-[10000ms] ease-out group-hover/card:scale-[1.3] will-change-transform"
      />

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-500"></div>

      {/* Category & Status Badges */}
      <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-2 pointer-events-auto z-10">
        <span className="bg-brand-blue text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-sm">
          {project.category}
        </span>

        {project.status && (
          <span className="bg-white/90 backdrop-blur-sm text-brand-blue text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-sm capitalize">
            {Array.isArray(project.status)
              ? project.status.find((s: string) => s !== "featured")
              : project.status}
          </span>
        )}

        {project.featured && (
          <span className="bg-brand-violet text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-sm capitalize">
            Featured
          </span>
        )}
      </div>

      {/* Content Container - Pure transform approach for buttery smooth animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Title & Location (Translates UP on hover) */}
        <div className="absolute bottom-[90px] left-6 right-6 md:left-8 md:right-8 transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:-translate-y-[90px] pointer-events-auto">
          <h3 className="text-white text-2xl md:text-2xl font-bold uppercase tracking-wide leading-tight line-clamp-2">
            {project.name || project.title}
          </h3>
          <p className="text-white/90 text-sm md:text-[15px] font-medium mt-1">
            {project.location?.area
              ? [project.location.area, project.location.city]
                  .filter(Boolean)
                  .join(", ")
              : project.location}
          </p>
        </div>

        {/* Description (Fades in and fills the space left by the title) */}
        <div className="absolute bottom-[90px] left-6 right-6 md:left-8 md:right-8 opacity-0 transform translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:opacity-100 group-hover/card:translate-y-0 pointer-events-auto">
          <p className="text-white text-[14px] md:text-[15px] leading-relaxed font-semibold pt-4 line-clamp-3">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Always visible Explore Button */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 pointer-events-auto">
          <SharedButton className="text-white cursor-pointer ">
            Explore
          </SharedButton>
        </div>
      </div>
    </>
  );

  const wrapperClass = cn(
    "relative group/card overflow-hidden cursor-pointer transform-gpu block w-full h-full",
    className,
  );

  return (
    <Link href={`/projects/${project.slug}`} className={wrapperClass}>
      {content}
    </Link>
  );
}
