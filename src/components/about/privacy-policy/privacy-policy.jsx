export function PrivacyPolicy() {
  return (
    <div className="w-full bg-white text-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-16">
        {/* Header */}
        <div className="mb-12 border-b pb-8">
          <h1 className="text-4xl font-bold text-[#003B6D] uppercase tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Effective Date: July 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-[15px] leading-relaxed text-gray-700 text-justify">
          <section>
            <h2 className="text-xl font-bold text-[#003B6D] mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to our Privacy Policy. We are deeply committed to
              protecting your personal information and your right to privacy. If
              you have any questions or concerns about our policy, or our
              practices with regards to your personal information, please
              contact us.
            </p>
            <p className="mt-4">
              When you visit our website and use our services, you trust us with
              your personal information. We take your privacy very seriously. In
              this privacy policy, we seek to explain to you in the clearest way
              possible what information we collect, how we use it, and what
              rights you have in relation to it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003B6D] mb-4">
              2. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you register on the website, express an interest in obtaining
              information about us or our projects, when you participate in
              activities on the website, or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>
                <strong>Personal Details:</strong> Name, phone number, email
                address, and contact preferences.
              </li>
              <li>
                <strong>Property Interests:</strong> Information regarding the
                types of properties or projects you are interested in acquiring.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003B6D] mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our website for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>To respond to user inquiries and offer support.</li>
              <li>
                To send you marketing and promotional communications regarding
                our new real estate projects.
              </li>
              <li>
                To request feedback and contact you about your use of our
                website.
              </li>
              <li>
                To protect our Services from legal liability and security
                threats.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003B6D] mb-4">
              4. Sharing Your Information
            </h2>
            <p>
              We only share information with your consent, to comply with laws,
              to provide you with services, to protect your rights, or to
              fulfill business obligations. We strictly{" "}
              <strong>do not sell</strong> your personal information to third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003B6D] mb-4">
              5. Security of Your Information
            </h2>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003B6D] mb-4">
              6. Contact Us
            </h2>
            <p>
              If you have questions or comments about this policy, you may
              contact our support team. We will ensure that your inquiries are
              addressed promptly and effectively.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
