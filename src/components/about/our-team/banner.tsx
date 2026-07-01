import Image from "next/image";
import { BlockReveal } from "@/components/ui/BlockReveal";

export default function Banner() {
  return (
    <div className="w-full">
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-end pb-12 md:pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop"
            alt="Chess pieces representing strategy and team"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay to match the screenshot's moody feel */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-5 md:px-16 relative z-10">
          <BlockReveal color="#003B6D">
            <h1 className="text-white text-5xl font-bold tracking-tight uppercase">
              Team
            </h1>
          </BlockReveal>
        </div>
      </section>
    </div>
  );
}
