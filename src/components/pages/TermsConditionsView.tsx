import { PageBanner } from "@/components/ui/PageBanner";
import { BlockReveal } from "@/components/ui/BlockReveal";

export function TermsConditionsView({ pageData }: { pageData: any }) {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <PageBanner
        title={
          <>
            Terms & <br className="hidden md:block" /> Conditions
          </>
        }
        subtitle="Legal Information"
        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
        altText="Terms and Conditions Banner"
      />

      <section className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-5 md:px-16 ">
          <div className="mb-16 border-b border-gray-200 pb-8 text-left flex flex-col items-start gap-4">
            <BlockReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue uppercase tracking-widest m-0">
                Terms of Service
              </h2>
            </BlockReveal>
            <BlockReveal delay={0.2}>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold m-0">
                Last Updated: {pageData?.updatedAt ? new Date(pageData.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "July 2026"}
              </p>
            </BlockReveal>
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-brand-blue prose-a:text-blue-600 prose-img:rounded-xl text-gray-600 leading-relaxed break-words overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html: pageData?.description || "<p>Loading...</p>" }}
          />
        </div>
      </section>
    </main>
  );
}
