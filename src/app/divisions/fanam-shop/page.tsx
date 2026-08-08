import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Fanam Shop | E-commerce",
});

export default function FanamShopDivision() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] flex items-center justify-center bg-orange-600">
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Fanam Shop</h1>
          <p className="text-xl text-orange-50 font-light">Premium e-commerce platform delivering quality to your doorstep.</p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Coming Soon</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Our revolutionary e-commerce platform is currently under development. Stay tuned for an unparalleled shopping experience.</p>
      </section>
    </main>
  );
}
