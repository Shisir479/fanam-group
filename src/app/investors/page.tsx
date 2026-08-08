import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Investor Relations | Fanam Group",
});

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Investor Relations</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Financial highlights, corporate governance, and reports for our stakeholders.</p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">Quarterly Reports</h3>
            <p className="text-gray-500">No reports available for download yet.</p>
        </div>
      </div>
    </main>
  );
}
