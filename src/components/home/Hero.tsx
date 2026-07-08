"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    title: "OASIS OF COMFORT",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    title: "LUXURY LIVING IN THE HEART OF THE CITY",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2012&auto=format&fit=crop",
    title: "BOULEVARD THAT MAKES YOUR HEART SING",
  },
];

const WIPE_1_MS = 1500; // Dark new image wipes across
const WIPE_2_MS = 1500; // Clear new image wipes across
const DELAY_MS = 1000; // Starts as the first one reaches the final stage
const TOTAL_WIPE_MS = DELAY_MS + WIPE_2_MS;
const AUTO_INTERVAL = 5000;

type Phase = "idle" | "wiping";

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [displayImage, setDisplayImage] = useState(0);
  const [nextImage, setNextImage] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [contentVisible, setContentVisible] = useState(true);
  const isTransitioning = useRef(false);
  const timers = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const addTimer = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning.current || index === current) return;
      isTransitioning.current = true;
      clearTimers();

      // Step 1: Hide old content (fast exit), start double wipe from left
      setContentVisible(false);
      setNextImage(index);
      setPhase("wiping");

      // Step 2: Old text is hidden. Swap text and animate it UP during the wipe!
      addTimer(() => {
        setCurrent(index);
        setContentVisible(true);
      }, 400);

      // Step 3: Wipe complete — finalize state
      addTimer(() => {
        setPhase("idle");
        setDisplayImage(index);
        isTransitioning.current = false;
      }, TOTAL_WIPE_MS + 100);
    },
    [current],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(interval);
  }, [current, goToSlide]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // First wave: Dark new image wipes from left
  const getDarkWipeStyle = (): React.CSSProperties => {
    if (phase === "wiping") {
      return {
        clipPath: "inset(0 0% 0 0)",
        transition: `clip-path ${WIPE_1_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      };
    }
    return { clipPath: "inset(0 100% 0 0)", transition: "none" };
  };

  // Second wave: Clear new image wipes from left, delayed so it follows right behind
  const getClearWipeStyle = (): React.CSSProperties => {
    if (phase === "wiping") {
      return {
        clipPath: "inset(0 0% 0 0)",
        transition: `clip-path ${WIPE_2_MS}ms cubic-bezier(0.65, 0, 0.35, 1) ${DELAY_MS}ms`,
      };
    }
    return { clipPath: "inset(0 100% 0 0)", transition: "none" };
  };

  // Old image gets pushed slightly to the right as the first wave hits
  const getImageStyle = (): React.CSSProperties => {
    if (phase === "wiping") {
      return {
        transform: "translateX(15%)",
        transition: `transform ${WIPE_1_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      };
    }
    return { transform: "translateX(0%)", transition: "none" };
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background layer (Old Image) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, ...getImageStyle() }}
      >
        <Image
          src={slides[displayImage].image}
          alt={slides[displayImage].title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Layer 1: Dark Wipe (Next Image with black overlay) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 10, ...getDarkWipeStyle() }}
      >
        <Image
          src={slides[nextImage].image}
          alt={slides[nextImage].title}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Layer 2: Clear Wipe (Next Image fully clear) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 12, ...getClearWipeStyle() }}
      >
        <Image
          src={slides[nextImage].image}
          alt={slides[nextImage].title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Subtle overlay for text readability */}
      <div
        className="absolute inset-0 bg-black/10 pointer-events-none"
        style={{ zIndex: 15 }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end pb-32 md:pb-40 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div className="container mx-auto px-6 md:px-12 w-full overflow-hidden pt-10">
          <h1
            className={`text-white text-3xl md:text-4xl font-bold max-w-5xl tracking-tight uppercase transition-all ease-[cubic-bezier(0.25,1,0.5,1)] ${
              contentVisible
                ? "duration-1000 opacity-100 translate-y-0"
                : "duration-300 opacity-0 translate-y-24"
            }`}
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            {slides[current].title}
          </h1>
        </div>
      </div>

      {/* Pagination Dots */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 20 }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex items-center justify-center rounded-full transition-colors duration-300 w-5 h-5 ${
              index === current
                ? "bg-white/30"
                : "bg-transparent hover:bg-white/10"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
          </button>
        ))}
      </div>
    </section>
  );
}
