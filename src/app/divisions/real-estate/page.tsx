import { constructMetadata } from "@/lib/metadata";
import Image from "next/image";

export const metadata = constructMetadata({
  title: "Real Estate Division | Fanam Group",
  description: "Explore Purbachal Fanam City, Purbachal Royal City, and our upcoming luxury real estate developments.",
});

export default function RealEstateDivision() {
  return (
    <main className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image src="/images/projects/fanam-city-1.jpg" alt="Real Estate" fill className="object-cover" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Fanam Real Estate</h1>
          <p className="text-xl text-white/90 font-light">Building tomorrow's sustainable cities, today.</p>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Signature Projects</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Purbachal Fanam City</h3>
            <p className="text-gray-600 mb-6">A master-planned luxury township offering premium residential and commercial plots.</p>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition">View Project</button>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Purbachal Royal City</h3>
            <p className="text-gray-600 mb-6">An exclusive, gated community designed for those who appreciate the finer things in life.</p>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition">View Project</button>
          </div>
        </div>
      </section>
    </main>
  );
}
