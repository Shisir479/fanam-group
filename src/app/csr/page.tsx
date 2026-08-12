import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "CSR | Fanam Group",
});

export default function CSRPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Corporate Social Responsibility
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Giving back to the community is at the core of Fanam Group's values.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Placeholder for CSR items */}
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              Winter Relief Campaign
            </h3>
            <p className="text-green-800">
              Distributing warm clothes to thousands in rural areas.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
