import Image from "next/image";
import { BlockReveal } from "@/components/ui/BlockReveal";

export default function DreamTeam() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-8 lg:px-10">
        {/* Heading */}
        <BlockReveal color="#0F4C81">
          <h2 className="text-[#0F4C81] text-4xl ml-5  font-bold uppercase tracking-wide">
            Dream Team
          </h2>
        </BlockReveal>

        {/* Image */}
        <div className="relative w-full aspect-[16/6] overflow-hidden mt-14">
          <Image
            src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image
            alt="Dream Team"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
