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
    ></PageBanner>
  );
}
