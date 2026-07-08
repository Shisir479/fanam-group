import { PageBanner } from "@/components/ui/PageBanner";
import { BlockReveal } from "@/components/ui/BlockReveal";

export function PrivacyPolicyView() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <PageBanner
        title="Privacy Policy"
        subtitle="Legal Information"
        bgImage="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop"
        altText="Privacy Policy Banner"
      />
      
      <section className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-5 md:px-16 ">
          
          <div className="mb-16 border-b border-gray-200 pb-8 text-left flex flex-col items-start gap-4">
            <BlockReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue uppercase tracking-widest m-0">Privacy Policy</h2>
            </BlockReveal>
            <BlockReveal delay={0.2}>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold m-0">Last Updated: July 2026</p>
            </BlockReveal>
          </div>

          <div className="space-y-16">
            
            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">01.</span>
                Introduction
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-4">
                  Welcome to Bonedi. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
                <p>
                  Our goal is to provide transparency and clarity regarding our data practices. We want you to understand exactly what information we collect, why we collect it, and how we protect it.
                </p>
              </div>
            </div>

            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">02.</span>
                Data Collection
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-6">
                  Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p><strong className="text-gray-900 font-bold uppercase tracking-wide text-sm">Identity Data:</strong> Includes first name, last name, username or similar identifier.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p><strong className="text-gray-900 font-bold uppercase tracking-wide text-sm">Contact Data:</strong> Includes billing address, delivery address, email address and telephone numbers.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p><strong className="text-gray-900 font-bold uppercase tracking-wide text-sm">Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">03.</span>
                How We Use Data
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-6">
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p>Where we need to perform the contract we are about to enter into or have entered into with you.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0"></span>
                    <p>Where we need to comply with a legal obligation.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide mb-6 flex items-center gap-4">
                <span className="text-gray-300 font-light text-3xl">04.</span>
                Data Security
              </h3>
              <div className="text-gray-600 leading-relaxed text-[16px] md:text-[17px] pl-0 md:pl-12">
                <p className="mb-4">
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
                <p>
                  They will only process your personal data on our instructions and they are subject to a duty of confidentiality. All information you provide to us is stored on our secure servers behind firewalls.
                </p>
              </div>
            </div>

          </div>
          
        </div>
      </section>
    </main>
  );
}
