"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { projects, Project } from "@/lib/projectData";
import { Search, ChevronDown, Filter } from "lucide-react";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["All", "Residential", "Commercial", "Mixed Use"];
  const statuses = ["All", "featured", "ongoing", "upcoming", "completed"];

  // Filter and sort logic
  const filteredAndSortedProjects = useMemo(() => {
    let result = projects;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter((p) => p.status.includes(statusFilter as any));
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "a-z") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "z-a") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return result;
  }, [searchQuery, categoryFilter, statusFilter, sortBy]);

  const displayedProjects = filteredAndSortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] flex items-center bg-[#003B6D] overflow-hidden mb-16">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Bonedi Homes Projects"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="container mx-auto px-5 md:px-16 relative z-20">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-4">
              <BlockReveal color="#ffffff">
                <div className="flex items-center text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                  <span className="w-8 h-[2px] bg-white/80 mr-4"></span>
                  Portfolio
                </div>
              </BlockReveal>
              <BlockReveal color="#ffffff" delay={0.2}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] uppercase">
                  Our <br /> Projects
                </h1>
              </BlockReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="container mx-auto px-5 md:px-16 mb-12">
        <div className="bg-white p-6 border border-gray-200 shadow-sm flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
          {/* Search */}
          <div className="relative w-full xl:w-96">
            <input
              type="text"
              placeholder="Search projects by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-4 text-[15px] focus:outline-none focus:border-[#003B6D] transition-colors"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            {/* Category Dropdown */}
            <div className="relative group min-w-[160px]">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 py-3 pl-4 pr-10 text-[15px] focus:outline-none focus:border-[#003B6D] transition-colors cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative group min-w-[160px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 py-3 pl-4 pr-10 text-[15px] focus:outline-none focus:border-[#003B6D] transition-colors cursor-pointer capitalize"
              >
                {statuses.map((stat) => (
                  <option key={stat} value={stat} className="capitalize">
                    Status: {stat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative group min-w-[160px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 py-3 pl-4 pr-10 text-[15px] focus:outline-none focus:border-[#003B6D] transition-colors cursor-pointer"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="a-z">Sort by: A-Z</option>
                <option value="z-a">Sort by: Z-A</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="container mx-auto px-5 md:px-16">
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, idx) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                className="relative group/card w-full aspect-[4/5] overflow-hidden cursor-pointer transform-gpu shadow-sm hover:shadow-xl transition-shadow duration-500 block"
              >
                {/* Background Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[10000ms] ease-out group-hover/card:scale-[1.15] will-change-transform"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-70 group-hover/card:opacity-90 transition-opacity duration-500"></div>

                {/* Category & Status Badges */}
                <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-2 pointer-events-auto z-10">
                  <span className="bg-[#003B6D] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-sm">
                    {project.category}
                  </span>
                  {project.status.map((s) => (
                    <span
                      key={s}
                      className="bg-white/90 backdrop-blur-sm text-[#003B6D] text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-sm capitalize"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Title & Location (Translates UP on hover) */}
                  <div className="absolute bottom-[90px] left-6 right-6 transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:-translate-y-[60px] pointer-events-auto">
                    <h3 className="text-white text-2xl font-bold uppercase tracking-wide leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-[15px] font-medium mt-1">
                      {project.location}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="absolute bottom-[90px] left-6 right-6 opacity-0 transform translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:opacity-100 group-hover/card:translate-y-0 pointer-events-auto">
                    <p className="text-white/90 text-[14px] leading-relaxed font-medium pt-3 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Explore Button */}
                  <div className="absolute bottom-6 left-6 pointer-events-auto">
                    <button className="relative group/btn border border-white/30 hover:border-[#003B6D] px-8 py-2.5 text-sm font-bold text-white overflow-hidden transition-colors duration-500">
                      <span className="relative z-10">View Details</span>
                      <span className="absolute inset-0 bg-[#003B6D] scale-x-0 origin-left transition-transform duration-700 ease-out group-hover/btn:scale-x-100 z-0"></span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-medium text-gray-500 mb-4">
              No projects found.
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("All");
                setStatusFilter("All");
                setSortBy("newest");
              }}
              className="mt-6 text-[#003B6D] font-bold uppercase text-sm border-b-2 border-[#003B6D] pb-1 hover:text-[#003B6D]/80 hover:border-[#003B6D]/80 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-2 border-2 border-[#003B6D] text-[#003B6D] px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#003B6D] hover:text-white transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
