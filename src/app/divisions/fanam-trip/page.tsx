import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Fanam Trip | Travel & Tourism",
});

export default function FanamTripDivision() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] flex items-center justify-center bg-cyan-800">
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Fanam Trip</h1>
          <p className="text-xl text-cyan-50 font-light">Your trusted partner for global travel and seamless journeys.</p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {["Domestic Tours", "International Packages", "Corporate Travel & Visa"].map((svc) => (
             <div key={svc} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{svc}</h3>
                <p className="text-gray-600 mb-6">Experience world-class service with our specialized travel management.</p>
                <button className="text-cyan-600 font-semibold hover:text-cyan-800">Learn More →</button>
             </div>
          ))}
        </div>
      </section>
    </main>
  );
}
