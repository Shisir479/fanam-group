import { Suspense } from "react";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getBannerByPageAdmin } from "@/services/banner.service";
import InquiryForm from "@/components/inquiry/InquiryForm";
import { PageBanner } from "@/components/ui/PageBanner";

export const metadata: Metadata = constructMetadata({
  title: "Business Collaboration - Fanam Group",
  description:
    "Submit an inquiry or explore collaboration opportunities with Fanam Group.",
});

export default async function InquiryPage() {
  let banner = null;
  try {
    const res = await getBannerByPageAdmin("inquiry");
    if (res?.success) {
      banner = res.data;
    }
  } catch (e) {}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageBanner
        title={banner?.title || "Business Collaboration"}
        subtitle={banner?.eyebrowText || "Explore Opportunities"}
        bgImage={
          banner?.backgroundImage ||
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
        }
        altText={banner?.title || "Business Collaboration"}
      >
        {banner?.description && (
          <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mt-4">
            {banner.description}
          </p>
        )}
      </PageBanner>
      <div className="container mx-auto px-5 md:px-16 max-w-5xl py-20">
        <Suspense
          fallback={
            <div className="h-40 flex items-center justify-center">
              Loading form...
            </div>
          }
        >
          <InquiryForm />
        </Suspense>
      </div>
    </div>
  );
}
