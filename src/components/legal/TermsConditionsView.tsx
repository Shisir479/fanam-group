import { PageBanner } from "@/components/ui/PageBanner";
import { BlockReveal } from "@/components/ui/BlockReveal";

export function TermsConditionsView() {
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
                Last Updated: July 2026
              </p>
            </BlockReveal>
          </div>

          <div className="space-y-16">
            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">01.</span>
                Terms & Acceptance
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-4">
                  By accessing this website, you are agreeing to be bound by
                  these website Terms and Conditions of Use, all applicable laws
                  and regulations, and agree that you are responsible for
                  compliance with any applicable local laws.
                </p>
                <p>
                  If you do not agree with any of these terms, you are
                  prohibited from using or accessing this site. The materials
                  contained in this website are protected by applicable
                  copyright and trademark law.
                </p>
              </div>
            </div>

            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">02.</span>
                Use License
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-6">
                  Permission is granted to temporarily download one copy of the
                  materials (information or software) on Bonedi&apos;s website
                  for personal, non-commercial transitory viewing only. This is
                  the grant of a license, not a transfer of title, and under
                  this license you may not:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p>Modify or copy the materials.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p>
                      Use the materials for any commercial purpose, or for any
                      public display (commercial or non-commercial).
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p>
                      Attempt to decompile or reverse engineer any software
                      contained on Bonedi&apos;s website.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p>
                      Remove any copyright or other proprietary notations from
                      the materials; or transfer the materials to another person
                      or &quot;mirror&quot; the materials on any other server.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">03.</span>
                Disclaimer
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-4">
                  The materials on Bonedi&apos;s website are provided on an
                  &quot;as is&quot; basis. Bonedi makes no warranties, expressed
                  or implied, and hereby disclaims and negates all other
                  warranties including, without limitation, implied warranties
                  or conditions of merchantability, fitness for a particular
                  purpose, or non-infringement of intellectual property or other
                  violation of rights.
                </p>
                <p>
                  Further, Bonedi does not warrant or make any representations
                  concerning the accuracy, likely results, or reliability of the
                  use of the materials on its website or otherwise relating to
                  such materials or on any sites linked to this site.
                </p>
              </div>
            </div>

            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">04.</span>
                Limitations
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-4">
                  In no event shall Bonedi or its suppliers be liable for any
                  damages (including, without limitation, damages for loss of
                  data or profit, or due to business interruption) arising out
                  of the use or inability to use the materials on Bonedi&apos;s
                  website, even if Bonedi or a Bonedi authorized representative
                  has been notified orally or in writing of the possibility of
                  such damage.
                </p>
                <p>
                  Because some jurisdictions do not allow limitations on implied
                  warranties, or limitations of liability for consequential or
                  incidental damages, these limitations may not apply to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
