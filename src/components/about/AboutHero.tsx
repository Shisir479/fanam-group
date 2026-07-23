import { PageBanner } from "@/components/ui/PageBanner";

import { Banner } from "@/services/banner.service";

export function AboutHero({ data, banner }: { data: any; banner?: Banner }) {
  return (
    <PageBanner
      title={
        banner?.title ? (
          banner.title
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html:
                data?.heroTitle || "Building Legacies <br /> Since Inception",
            }}
          />
        )
      }
      subtitle={
        banner?.eyebrowText || data?.heroSubtitle || "Discover Our Story"
      }
      bgImage={banner?.backgroundImage || data?.heroImage?.url || ""}
      altText={banner?.title || data?.heroTitle || "Bonedi Office"}
    >
      {banner?.description && (
        <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mt-4">
          {banner.description}
        </p>
      )}
    </PageBanner>
  );
}
