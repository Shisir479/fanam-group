import { PageBanner } from "@/components/ui/PageBanner";

export function AboutHero() {
  return (
    <PageBanner
      title={
        <>
          Building Legacies <br /> Since Inception
        </>
      }
      subtitle="Discover Our Story"
      bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
      altText="Bonedi Office"
    />
  );
}
