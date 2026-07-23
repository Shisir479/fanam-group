"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { PageBanner } from "@/components/ui/PageBanner";
import { SharedButton } from "@/components/ui/SharedButton";
import { Search, ChevronDown, Filter } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";

import { Banner } from "@/services/banner.service";

export function ProjectsView({
  initialStatus = "All",
  initialProjects = [],
  banner,
}: {
  initialStatus?: string;
  initialProjects?: any[];
  banner?: Banner;
}) {
  const projects = initialProjects;

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [locationFilter, setLocationFilter] = useState<string>("Location");
  // const [sizeFilter, setSizeFilter] = useState<string>("Select Size Range"); // Keeping UI but might not apply

  const categories = ["Type", "Residential", "Commercial", "Mixed Use"];
  const statuses = ["All", "upcoming", "ongoing", "completed"];

  // Extract unique locations dynamically
  const locations = useMemo(() => {
    const locs = new Set(
      projects.map((p) => p.location?.area || p.location?.city).filter(Boolean),
    );
    return ["Location", ...Array.from(locs)];
  }, [projects]);

  // Filter and sort logic
  const filteredAndSortedProjects = useMemo(() => {
    let result = projects;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.location?.area || "").toLowerCase().includes(query) ||
          (p.location?.city || "").toLowerCase().includes(query),
      );
    }

    // Category filter
    if (categoryFilter !== "Type" && categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter((p) => p.status === statusFilter.toLowerCase());
    }

    // Location filter
    if (locationFilter !== "Location") {
      result = result.filter(
        (p) =>
          p.location?.area === locationFilter ||
          p.location?.city === locationFilter,
      );
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
        );
      } else if (sortBy === "a-z") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "z-a") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

    return result;
  }, [
    projects,
    searchQuery,
    categoryFilter,
    statusFilter,
    sortBy,
    locationFilter,
  ]);

  const displayedProjects = filteredAndSortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      {/* Hero Section */}
      <PageBanner
        title={banner?.title || "Our Projects"}
        subtitle={
          banner?.eyebrowText ||
          "Discover our portfolio of extraordinary residential and commercial properties."
        }
        bgImage={
          banner?.backgroundImage ||
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
        }
        altText={banner?.title || "Projects Background"}
      >
        {banner?.description && (
          <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mt-4">
            {banner.description}
          </p>
        )}
      </PageBanner>

      {/* Filters & Search */}
      <section className="w-full bg-white py-12 mb-12">
        <div className="container mx-auto px-5 md:px-16">
          <div className="flex flex-col gap-4 max-w-7xl">
            {/* Top Row: Status, Type, Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Dropdown */}
              <div className="relative group bg-white border border-gray-200">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-[14px] text-gray-600 focus:outline-none cursor-pointer capitalize"
                >
                  {statuses.map((stat) => (
                    <option key={stat} value={stat} className="capitalize">
                      {stat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Type Dropdown */}
              <div className="relative group bg-white border border-gray-200">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-[14px] text-gray-600 focus:outline-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Location Dropdown */}
              <div className="relative group bg-white border border-gray-200">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-[14px] text-gray-600 focus:outline-none cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc as string}>
                      {loc as string}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Bottom Row: Sort, Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Box */}
              <div className="relative bg-white border border-gray-200">
                <input
                  type="text"
                  placeholder="Search Project Name or Location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-3 px-4 text-[14px] text-gray-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="container mx-auto px-5 md:px-16">
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project._id || project.id}
                project={project}
                className="h-[500px] md:h-[600px] shadow-sm hover:shadow-xl transition-shadow duration-500"
              />
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
              className="mt-6 text-brand-blue font-bold uppercase text-sm border-b-2 border-brand-blue pb-1 hover:text-brand-blue/80 hover:border-brand-blue/80 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <SharedButton onClick={handleLoadMore}>Load More</SharedButton>
          </div>
        )}
      </section>
    </main>
  );
}
