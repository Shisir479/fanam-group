"use client";

import * as React from "react";

/* ----------------------------------------------------------------
 * ScrollReelTestimonials
 *
 * Counter-rotating scroll reel + per-character text rise.
 * The middle column is a real vertical list of portraits that
 * translates by one "pitch" per step; the outer columns counter-
 * rotate the opposite way. Text animates in character-by-character
 * with a stagger; the old block exits as a whole before the new
 * characters rise in sequence.
 * ---------------------------------------------------------------- */

export interface ScrollReelTestimonial {
  /** Optional title above the quote */
  title?: string;
  /** The quote text */
  quote: string;
  /** Author name shown below the quote */
  author: string;
  /** Optional designation/title of the author */
  designation?: string;
  /** Portrait image URL for the featured tile */
  image: string;
  /** Optional alt text for the portrait */
  alt?: string;
}

export interface ScrollReelTestimonialsProps {
  /** Testimonials to cycle through (one featured tile is generated per entry) */
  testimonials: ScrollReelTestimonial[];
  /** Per-character stagger in ms (default 6) */
  charStaggerMs?: number;
  /** Extra classes for the outer container */
  className?: string;
}

/* Geometry — middle column pitch between portrait centers:
 * 3 * (cell 121.33px + gap 8px) = 388px */
const CELL = 160;
const GAP = 12;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 240; // old text removed / new text mounted
const SLIDE_MS = 800; // column slide duration + interaction lock

const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const TITLE_CLASSES =
  "m-0 text-xl font-bold leading-[1.3] text-[#F9C602] md:text-2xl ";
const QUOTE_CLASSES = "m-0 text-sm font-normal leading-relaxed text-gray-600 ";
const AUTHOR_CLASSES =
  "m-0 text-sm font-bold leading-[1.3] text-black md:text-[15px]";
const DESIGNATION_CLASSES =
  "m-0 text-xs font-normal text-gray-500 mt-1 md:text-sm";

const FEATURED_SHADOW =
  "0 1.008px 0.705px -0.563px rgba(57,47,95,0.22), 0 2.389px 1.672px -1.125px rgba(57,47,95,0.2), 0 4.357px 3.05px -1.688px rgba(57,47,95,0.2), 0 7.244px 5.07px -2.25px rgba(57,47,95,0.18), 0 11.698px 8.188px -2.813px rgba(57,47,95,0.16), 0 19.148px 13.404px -3.375px rgba(57,47,95,0.14), 0 32.972px 23.08px -3.938px rgba(249,198,2,0.22), 0 60px 42px -4.5px rgba(249,198,2,0.16), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(57,47,95,0.45)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* Blurred placeholder cell */
function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 border border-[#F9C602]/25 bg-gradient-to-b from-[#FFFBE5] to-[#FFF3B8] blur-[1px] shadow-[0_5px_14px_rgba(249,198,2,0.2),inset_0_2px_0_rgba(255,255,255,0.9)]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

/* Featured portrait tile with desaturation + gradient sheen overlays */
function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden  "
      style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
    </div>
  );
}

/* Per-character split. Spaces live between word spans as plain text
 * nodes so natural line-wrapping is preserved. Each char rises in
 * with an inline animation-delay; while the block is exiting, the
 * char animation is removed so in-flight rises are killed. */
function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char inline-block"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 6,
  className,
}: ScrollReelTestimonialsProps) {
  /* Navigation state vs display state are kept separate so the
   * exiting block and the entering block never render together. */
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const count = testimonials.length;

  React.useEffect(() => {
    /* Enable column transitions only after first paint so the reel
     * appears at its starting offset without a slide-in. */
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true)),
    );
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS),
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS),
      );
    },
    [index, count],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  /* Middle column: 3 leading cells, then featured + 2 cells between
   * each testimonial, then 3 trailing cells. */
  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    testimonials.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = testimonials[displayIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full  flex-col items-stretch gap-6 overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-[400px] md:flex-row",
        className,
      )}
    >
      {/* Reel section */}
      <div
        aria-hidden="true"
        className="relative h-[280px] w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[500px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          {/* Left column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          {/* Middle column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured
                  key={i}
                  src={testimonials[item.i].image}
                  alt={testimonials[item.i].alt}
                />
              ) : (
                <Cell key={i} />
              ),
            )}
          </div>

          {/* Right column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-5 py-8 md:px-10 md:py-12">
        <div className="relative flex flex-col gap-5 pl-2 md:pl-8">
          {/* Huge Background Quote Icon */}
          <svg
            className="absolute left-0 -top-6 h-20 w-20 md:-left-4 md:-top-8 md:h-32 md:w-32 text-gray-50 -z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
          </svg>

          {/* Text stage */}
          <div
            className="relative w-full max-w-[500px] overflow-hidden"
            aria-live="polite"
          >
            {/* Invisible in-flow copy sizes the stage to the current
             * quote at any viewport width, so wrapped text never clips. */}
            <div
              aria-hidden="true"
              className="invisible flex min-h-[160px] flex-col gap-6"
            >
              {current.title && (
                <h3 className={TITLE_CLASSES}>{current.title}</h3>
              )}
              <p className={QUOTE_CLASSES}>{current.quote}</p>
              <div>
                <p className={AUTHOR_CLASSES}>{current.author}</p>
                {current.designation && (
                  <p className={DESIGNATION_CLASSES}>{current.designation}</p>
                )}
              </div>
            </div>
            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-6 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit",
              )}
            >
              {current.title && (
                <h3 className={TITLE_CLASSES}>{current.title}</h3>
              )}
              <p className={QUOTE_CLASSES}>
                <Chars
                  text={current.quote}
                  startIndex={0}
                  staggerMs={charStaggerMs / 2}
                />
              </p>
              <div>
                <p className={AUTHOR_CLASSES}>
                  <Chars
                    text={current.author}
                    startIndex={current.quote.length + 6}
                    staggerMs={charStaggerMs}
                  />
                </p>
                {current.designation && (
                  <p className={DESIGNATION_CLASSES}>{current.designation}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-0 md:mt-0">
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
            className="flex h-10 w-12 cursor-pointer items-center justify-center bg-transparent p-0 text-brand-blue transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:enabled:scale-110 disabled:cursor-default disabled:opacity-40 focus-visible:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.354"
              height="7.707"
              viewBox="0 0 20.354 10.707"
              className="w-8 h-auto"
            >
              <g transform="translate(20.354 10.354) rotate(180)">
                <line
                  x2="20"
                  transform="translate(0 5)"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
                <line
                  x2="5"
                  y2="5"
                  transform="translate(15)"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
                <line
                  y1="5"
                  x2="5"
                  transform="translate(15 5)"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
              </g>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label="Next testimonial"
            className="flex h-10 w-12 cursor-pointer items-center justify-center bg-transparent p-0 text-brand-blue transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:enabled:scale-110 disabled:cursor-default disabled:opacity-40 focus-visible:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.354"
              height="7.707"
              viewBox="0 0 20.354 10.707"
              className="w-8 h-auto"
            >
              <g transform="translate(0 0.354)">
                <line
                  x2="20"
                  transform="translate(0 5)"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
                <line
                  x2="5"
                  y2="5"
                  transform="translate(15)"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
                <line
                  y1="5"
                  x2="5"
                  transform="translate(15 5)"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
