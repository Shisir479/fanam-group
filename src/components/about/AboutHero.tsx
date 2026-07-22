import { PageBanner } from "@/components/ui/PageBanner";

export function AboutHero({ data }: { data: any }) {
  return (
    <PageBanner
      title={
        <div
          dangerouslySetInnerHTML={{
            __html:
              data?.heroTitle || "Building Legacies <br /> Since Inception",
          }}
        />
      }
      subtitle={data?.heroSubtitle || "Discover Our Story"}
      bgImage={
        data?.heroImage?.url ||
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
      }
      altText={data?.heroTitle || "Bonedi Office"}
    />
  );
}
