import { PageBanner } from "@/components/ui/PageBanner";
import { BlockReveal } from "@/components/ui/BlockReveal";

export function PrivacyPolicyView({ pageData }: { pageData: any }) {
  const fallbackHtml = `
    <p>The privacy policy explains how <strong>Bonedi Homes</strong> collects, uses, maintains, and discloses information from users of our website and offline channels. As a proud member of <strong>REHAB</strong> (Real Estate & Housing Association of Bangladesh), we strictly adhere to industry standards and best practices to ensure your data is secure and handled transparently.</p>
    
    <h3>1. Personal Identification Information</h3>
    <p>We may collect personal information from users in a variety of ways when they visit our site, subscribe to our newsletter, fill out an inquiry form, or take part in other activities, services, features, or resources that we offer. This information could include a user's name, email address, mailing address, or phone number. Users always have the option to visit our site anonymously and refuse to supply personal information. Keep in mind that this may prevent participation in certain activities available on our site or booking processes.</p>
    
    <h3>2. Non-Personal Identification Information</h3>
    <p>We collect non-personal identification information about users whenever they interact with our site. This information may include the browser name, type of computer, and technical information about the user's connection to the site, such as the operating system and internet service providers utilized.</p>
    
    <h3>3. Web Browser Cookies</h3>
    <p>Our site uses cookies to improve your experience. Cookies are small files that are placed on your computer by websites you visit. They are generally used for record-keeping purposes, and sometimes to track information about you. You can set your browser to refuse cookies or to alert you when cookies are being sent. However, if you do this, some parts of the site may not work properly.</p>
    
    <h3>4. How We Use Collected Information</h3>
    <p>We may collect and use your personal information to:</p>
    <ul>
      <li>Improve customer service and respond to your real estate inquiries more effectively.</li>
      <li>Personalize your experience and understand how our users as a group use the services and resources provided on our site.</li>
      <li>Improve our site offerings based on the feedback we receive from you.</li>
      <li>Run promotions, contests, surveys, or other site features.</li>
      <li>Send periodic emails or SMS updates regarding project milestones, handover details, and new property launches, in compliance with REHAB guidelines.</li>
    </ul>
    
    <h3>5. How We Protect User’s Information</h3>
    <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site. However, we cannot guarantee complete security, and we will not be liable in the event of an attack that is difficult to defend against.</p>
    
    <h3>6. Sharing Personal Information of Users</h3>
    <p>We do not sell, trade, or rent users' personal identification information to others. We may share general aggregated demographic information not linked to any personal identification information regarding visitors and users with our subsidiaries, business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>
    
    <h3>7. Changes to This Privacy Policy</h3>
    <p>Bonedi Homes has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. By using this site, you acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>
    
    <h3>8. Your Acceptance of These Terms</h3>
    <p>By accessing this site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our site. Your continued use of the site following the posting of changes to this policy will be deemed your acceptance of those changes. This privacy policy also applies to information and data collected by our sales representatives and call centers.</p>
    
    <hr />
    
    <h2>Disclaimer</h2>
    <p>This website contains artistic representations of Bonedi Homes' work, including VR views, elevations, walkthroughs, e-brochures, and other similar materials. These materials are for representational purposes only and do not form part of any agreement, nor are they legally binding on the company. The views expressed in these materials are not a part of the actual deliverables. Soft furnishing/furniture, and gadgets are not part of the offering.</p>
    <p>The products and technologies displayed, if any, or referred to are for representation purposes only and the company does not guarantee the use of all of them. Specifications are indicative and are subject to change as decided by Bonedi Homes or the competent authority (e.g., RAJUK, REHAB). Marginal variation may be necessary during construction. The extent/number/variety of the equipment/appliances and their brand thereof is tentative and liable to change at the sole discretion of the company. Applicant/allottee or any person shall not have any right to raise an objection in this regard.</p>
    <p>The individual is responsible for evaluating the accuracy, completeness, and usefulness of any opinions, advice, services, or other information provided. All information contained on any page is distributed with the understanding that the authors, publishers, and distributors are not rendering legal or other professional advice or opinions on specific facts or matters, and accordingly assume no liability whatsoever in connection with its use. The individual should consult their own legal or tax advisor with respect to their personal situation.</p>
    <p>In no event shall Bonedi Homes be liable for any direct, indirect, special, incidental, or consequential damages arising out of the use of the information herein.</p>
  `;
  console.log(pageData);
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <PageBanner
        title="Privacy Policy"
        subtitle="Legal Information"
        bgImage={
          pageData?.cover?.url ||
          "https://res.cloudinary.com/dwicffhns/image/upload/v1767523509/nen8c6jasky5fqt0to3y.png"
        }
        altText="Privacy Policy Banner"
      />

      <section className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-5 md:px-16 ">
          <div className="mb-16 border-b border-gray-200 pb-8 text-left flex flex-col items-start gap-4">
            <BlockReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue uppercase tracking-widest m-0">
                Privacy Policy & Disclaimer
              </h2>
            </BlockReveal>
            <BlockReveal delay={0.2}>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold m-0">
                Last Updated:{" "}
                {pageData?.updatedAt
                  ? new Date(pageData.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "July 2026"}
              </p>
            </BlockReveal>
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-brand-blue prose-a:text-blue-600 prose-img:rounded-xl text-gray-600 leading-relaxed break-words overflow-x-hidden"
            dangerouslySetInnerHTML={{
              __html: pageData?.description || fallbackHtml,
            }}
          />
        </div>
      </section>
    </main>
  );
}
