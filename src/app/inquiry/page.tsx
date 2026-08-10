import { Suspense } from "react";
import { constructMetadata } from "@/lib/metadata";
import { getBannerByPageAdmin } from "@/services/banner.service";
import InquiryForm from "@/components/inquiry/InquiryForm";
import { PageBanner } from "@/components/ui/PageBanner";

export const metadata = constructMetadata({
  title: "Inquiry - Fanam Group",
  description: "Submit an inquiry or book an investment with Fanam Group.",
});

export default async function InquiryPage() {
  let banner = null;
  try {
    const res = await getBannerByPageAdmin("inquiry");
    if (res?.success) banner = res.data;
  } catch (e) {}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageBanner
        title={banner?.title || "Property Inquiry"}
        subtitle={banner?.eyebrowText || "Consultation"}
        bgImage={
          banner?.backgroundImage ||
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075"
        }
        altText={banner?.title || "Property Inquiry"}
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
