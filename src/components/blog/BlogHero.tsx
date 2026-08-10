import { PageBanner } from "@/components/ui/PageBanner";

export function BlogHero() {
  return (
    <PageBanner
      title={
        <>
          News & <br /> Perspectives
        </>
      }
      subtitle="Insights & Updates"
      bgImage="https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=2070&auto=format&fit=crop"
      altText="Fanam Group News and Insights"
    />
  );
}
