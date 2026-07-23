import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-admin-gradient text-white">
      {/* SVG Filter for Liquid Glass Effect */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter
          id="liquid-glass-filter"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.03"
            numOctaves="1"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Sidebar - fixed position */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[24px] relative h-screen overflow-hidden flex flex-col">
        {/* Absolute Topbar */}
        <div className="absolute top-0 left-2 right-6 z-40">
          <AdminTopbar />
        </div>

        {/* Main Content Area */}
        <main
          id="admin-main-scroll"
          className="flex-1 h-full overflow-y-auto px-2 pt-24 relative"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
