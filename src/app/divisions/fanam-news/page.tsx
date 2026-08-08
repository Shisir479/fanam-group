import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Fanam News & Media | Fanam Group",
  description: "Leading the future of objective journalism and media broadcasting.",
});

export default function FanamNewsDivision() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[60vh] flex items-center justify-center bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 z-10 opacity-90" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Fanam News & Media</h1>
          <p className="text-xl text-blue-100 font-light">Uncovering truth, shaping perspectives.</p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Editorial Vision</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our media division is committed to delivering highly accurate, unbiased, and impactful news. 
              We leverage modern digital broadcasting to reach millions, ensuring the public stays informed.
            </p>
         </div>
      </section>
    </main>
  );
}
