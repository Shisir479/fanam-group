"use client";

import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import gsap from "gsap";
import { BlockReveal } from "@/components/ui/BlockReveal";

type Orientation = "horizontal" | "vertical";

interface IPosition {
  left: number;
  top: number;
}

interface ISize {
  height: number;
  width: number;
}

interface IPhotoBar {
  backgroundPosition: IPosition;
  position: IPosition;
  rect: DOMRect;
  size: ISize;
}

interface IGalleryUtility {
  getPhotoStyles: (src: string) => React.CSSProperties;
  mapBarStyles: (
    bar: IPhotoBar,
    backgroundImage: string,
  ) => React.CSSProperties;
}

const GalleryUtility: IGalleryUtility = {
  getPhotoStyles: (src: string): any => {
    return {
      backgroundImage: `url(${src})`,
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    };
  },
  mapBarStyles: (bar: IPhotoBar, backgroundImage: string): any => {
    const { backgroundPosition, position, rect, size } = bar;

    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: `${backgroundPosition.left * -1}px ${backgroundPosition.top * -1}px`,
      backgroundSize: `${rect.width}px ${rect.height}px`,
      height: `${size.height}px`,
      transform: `translate(${position.left}px, ${position.top}px)`,
      width: `${size.width}px`,
      zIndex: gsap.utils.random(1, 10, 1),
      position: "absolute" as const,
      boxShadow:
        "rgba(0, 0, 0, 0.12) 0px 10px 30px, rgba(0, 0, 0, 0.16) 0px 6px 10px",
      opacity: 0,
    };
  },
};

interface IAppContext {
  count: number;
  setCountTo: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<IAppContext>({
  count: 0,
  setCountTo: () => {},
});

const PhotoBar = (props: {
  backgroundImage: string;
  bar: IPhotoBar;
  index: number;
}) => {
  const { count, setCountTo } = useContext(AppContext);
  const { backgroundPosition, position, rect, size } = props.bar;
  const [completed, setCompletedTo] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orientation: Orientation =
      size.height > size.width ? "vertical" : "horizontal";
    const inDuration: number = 2;
    const holdTime: number = 2;
    const sizeDuration: number = gsap.utils.random(1.2, inDuration, 1);

    const handleOnComplete = (): void => {
      if (props.index === 0) {
        setCompletedTo(true);
      }
    };

    const t1 = gsap.timeline();
    const t2 = gsap.timeline({ onComplete: handleOnComplete });

    if (orientation === "vertical") {
      const getOffsetY = (): number => {
        const signY: number = gsap.utils.random(0, 1, 1);
        if (signY === 0) {
          return gsap.utils.random(0, position.top - rect.top, 1) * -1;
        }
        return gsap.utils.random(
          0,
          rect.bottom - (position.top + size.height),
          1,
        );
      };

      const offsetY: number = getOffsetY();
      const initialY: number = position.top + offsetY;
      const initialBackgroundY: number = backgroundPosition.top + offsetY;

      t1.fromTo(
        ref.current,
        {
          height: gsap.utils.random(size.height * 0.2, size.height * 0.8, 1),
          opacity: 0,
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 10px 30px, rgba(0, 0, 0, 0.16) 0px 6px 10px",
        },
        {
          duration: sizeDuration,
          height: size.height,
          opacity: 1,
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px",
        },
      )
        .repeatDelay(inDuration - sizeDuration + holdTime)
        .yoyo(true)
        .repeat(1); // Adjusted hold time

      t2.fromTo(
        ref.current,
        {
          backgroundPosition: `${backgroundPosition.left * -1}px ${initialBackgroundY * -1}px`,
          y: initialY,
        },
        {
          backgroundPosition: `${backgroundPosition.left * -1}px ${backgroundPosition.top * -1}px`,
          duration: inDuration,
          y: position.top,
        },
      )
        .repeatDelay(holdTime)
        .yoyo(true)
        .repeat(1); // Adjusted hold time
    } else {
      const getOffsetX = (): number => {
        const signX: number = gsap.utils.random(0, 1, 1);
        if (signX === 0) {
          return gsap.utils.random(0, position.left - rect.left, 1) * -1;
        }
        return gsap.utils.random(
          0,
          rect.right - (position.left + size.width),
          1,
        );
      };

      const offsetX: number = getOffsetX();
      const initialX: number = position.left + offsetX;
      const initialBackgroundX = backgroundPosition.left + offsetX;

      t1.fromTo(
        ref.current,
        {
          opacity: 0,
          width: gsap.utils.random(size.width * 0.2, size.width * 0.8, 1),
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 10px 30px, rgba(0, 0, 0, 0.16) 0px 6px 10px",
        },
        {
          duration: sizeDuration,
          opacity: 1,
          width: size.width,
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px",
        },
      )
        .repeatDelay(inDuration - sizeDuration + holdTime)
        .yoyo(true)
        .repeat(1); // Adjusted hold time

      t2.fromTo(
        ref.current,
        {
          backgroundPosition: `${initialBackgroundX * -1}px ${backgroundPosition.top * -1}px`,
          x: initialX,
        },
        {
          backgroundPosition: `${backgroundPosition.left * -1}px ${backgroundPosition.top * -1}px`,
          duration: inDuration,
          x: position.left,
        },
      )
        .repeatDelay(holdTime)
        .yoyo(true)
        .repeat(1); // Adjusted hold time
    }

    return () => {
      t1.kill();
      t2.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (completed) {
      setCountTo((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  return (
    <div
      ref={ref}
      style={GalleryUtility.mapBarStyles(props.bar, props.backgroundImage)}
    />
  );
};

const CastMember = ({ title, loaded }: { title: string; loaded: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) {
      gsap.set(ref.current, { opacity: 0, x: -300 });
      return;
    }

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        x: -300,
      },
      {
        duration: 3,
        delay: 0.5,
        ease: "power3.out",
        opacity: 1,
        x: 0,
      },
    );

    gsap.to(ref.current, {
      delay: 7, // 3s fade in + 4s hold = starts fading out at 7s
      duration: 3,
      ease: "power3.in",
      opacity: 0,
      x: 300,
    });
  }, [title, loaded]);

  return (
    <div
      ref={ref}
      className="absolute  left-0 top-[17%] w-full flex items-center justify-center z-[3] pointer-events-none opacity-0 px-4"
    >
      <div className="bg-white/40 backdrop-blur-md border border-white/60 px-6 py-1  shadow-lg">
        <h3 className="text-brand-blue italic text-sm md:text-lg font-extrabold text-center tracking-widest uppercase">
          {title}
        </h3>
      </div>
    </div>
  );
};

interface IGalleryState {
  bars: IPhotoBar[];
  loaded: boolean;
}

const Gallery = ({ image }: { image: any }) => {
  const { count } = useContext(AppContext);
  const [state, setStateTo] = useState<IGalleryState>({
    bars: [],
    loaded: false,
  });
  const photoStyles = GalleryUtility.getPhotoStyles(image.src);
  const photoRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStateTo({ bars: [], loaded: false });
  }, [count]);

  useEffect(() => {
    const img = new window.Image();
    img.src = image.src;
    img.onload = () => {
      setStateTo((prev) => ({ ...prev, loaded: true }));
    };
  }, [image]);

  useEffect(() => {
    if (state.loaded && photoRef.current && wrapperRef.current) {
      let bars: IPhotoBar[] = [];
      const imgRect: DOMRect = photoRef.current.getBoundingClientRect();
      const wrapperRect: DOMRect = wrapperRef.current.getBoundingClientRect();

      // Ensure rect has valid dimensions before generating bars
      if (imgRect.width === 0 || imgRect.height === 0) return;

      // Adjust coordinates to be relative to the wrapper instead of the viewport
      const rect = {
        top: imgRect.top - wrapperRect.top,
        left: imgRect.left - wrapperRect.left,
        bottom: imgRect.bottom - wrapperRect.top,
        right: imgRect.right - wrapperRect.left,
        width: imgRect.width,
        height: imgRect.height,
      } as DOMRect;

      // Animate the main image to fade in slowly behind the bars to perfectly fill any hairline cracks
      const t = gsap.timeline();
      t.set(photoRef.current, { opacity: 0 });
      t.to(photoRef.current, { opacity: 1, duration: 1.5, delay: 2.5 }); // Fades in slowly as bars lock in
      t.to(photoRef.current, { opacity: 0, duration: 1.0, delay: 4.0 }); // Fades out before bars fly away

      const base: IPosition = {
        left: rect.left + rect.width * 0.2,
        top: rect.top,
      };

      while (base.left < rect.left + rect.width * 0.7) {
        const height: number = gsap.utils.random(
          rect.height * 0.4,
          rect.height * 0.8,
          1,
        );
        const width: number = gsap.utils.random(
          rect.width * 0.05,
          rect.width * 0.25,
          1,
        );

        const left: number = gsap.utils.random(
          base.left + width * 0.1,
          base.left + width * 0.2,
          1,
        );
        const top: number =
          base.top + gsap.utils.random(0, rect.height - height, 1);

        base.left = left + width;

        const backgroundPosition: IPosition = {
          left: left - rect.left,
          top: top - rect.top,
        };

        bars.push({
          backgroundPosition,
          position: { left, top },
          rect,
          size: { height, width },
        });
      }

      base.left = rect.left;
      base.top = rect.top + rect.height * 0.2;

      while (base.top < rect.top + rect.height * 0.7) {
        const height: number = gsap.utils.random(
          rect.height * 0.05,
          rect.height * 0.25,
          1,
        );
        const width: number = gsap.utils.random(
          rect.width * 0.4,
          rect.width * 0.8,
          1,
        );

        const left: number =
          base.left + gsap.utils.random(0, rect.width - width, 1);
        const top: number = gsap.utils.random(
          base.top + height * 0.1,
          base.top + height * 0.2,
          1,
        );

        base.top = top + height;

        const backgroundPosition: IPosition = {
          left: left - rect.left,
          top: top - rect.top,
        };

        bars.push({
          backgroundPosition,
          position: { left, top },
          rect,
          size: { height, width },
        });
      }

      setStateTo((prev) => ({ ...prev, bars }));
    }
  }, [state.loaded]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-[500px] md:h-[650px] relative overflow-hidden  flex items-center justify-center"
    >
      {/* Photo Bars Layer (Behind) */}
      <div className="absolute inset-0 z-[0] pointer-events-none">
        {state.bars.map((bar, index) => (
          <PhotoBar
            key={index}
            backgroundImage={image.src}
            bar={bar}
            index={index}
          />
        ))}
      </div>

      {/* Solid Image Layer (On Top) */}
      <div className="relative flex-shrink w-[90%] md:w-[70%] h-[60%] md:h-[70%] m-auto flex items-center justify-center z-[1]">
        <img
          key={image.src}
          ref={photoRef}
          src={image.src}
          style={photoStyles}
          className="opacity-0 z-[1]" // The main image fades in ON TOP to completely cover the cuts
          alt={image.title}
        />
      </div>

      {/* Title Layer */}
      <CastMember title={image.title} loaded={state.loaded} />
    </div>
  );
};

export function GalleryPreview({ data }: { data?: any }) {
  const defaultImages = [
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      title: "Luxury Villa",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      title: "Modern Apartment",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      title: "Commercial Hub",
    },
    {
      src: "https://images.unsplash.com/photo-1460408037948-b89a5e837b41?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Eco Retreat",
    },
    {
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      title: "Penthouse Suite",
    },
  ];

  const galleryImages =
    data?.galleryItems?.length > 0
      ? data.galleryItems.map((item: any) => ({
          src: item.image?.url || "",
          title: item.title || "",
        }))
      : defaultImages;

  const galleryTitle = data?.galleryTitle || "GALLERY";
  const galleryHeading = data?.galleryHeading || (
    <>
      Discover Our <br className="hidden md:block" /> Signature Projects
    </>
  );

  const [index, setIndexTo] = useState<number>(0);
  const [count, setCountTo] = useState<number>(0);
  const [resizing, setResizingTo] = useState<boolean>(false);

  const photo = galleryImages[index];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!resizing && count > 0) {
        setIndexTo((prevIndex) =>
          prevIndex + 1 > galleryImages.length - 1 ? 0 : prevIndex + 1,
        );
      }
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    const handleOnResize = () => {
      if (!resizing) setResizingTo(true);
    };

    const timeout = setTimeout(() => {
      if (resizing) setResizingTo(false);
    }, 500);

    window.addEventListener("resize", handleOnResize);
    return () => {
      window.removeEventListener("resize", handleOnResize);
      clearTimeout(timeout);
    };
  }, [resizing]);

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <BlockReveal color="var(--color-brand-blue)">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                {galleryTitle}
              </div>
            </BlockReveal>
            <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-brand-blue leading-[1.1] uppercase">
                {galleryHeading}
              </h2>
            </BlockReveal>
          </div>
        </div>

        {/* Custom GSAP Gallery */}
        <AppContext.Provider value={{ count, setCountTo }}>
          {!resizing && photo ? (
            <Gallery image={photo} />
          ) : (
            <div className="h-[500px] md:h-[650px] w-full bg-gray-50" />
          )}
        </AppContext.Provider>
      </div>
    </section>
  );
}
