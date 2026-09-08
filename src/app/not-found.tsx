import Link from "next/link";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { GridScan } from "@/components/ui/GridScan";

export default function NotFound() {
  return (
    <main
      id="not-found-page"
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#2A2545] overflow-hidden"
    >
      {/* GridScan Animated Background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#ff2020"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          lineJitter={0.1}
          scanGlow={0.5}
          scanSoftness={2}
          enableWebcam={false}
          showPreview={false}
        />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes swingLeft {
          0%   { transform: translate(0, 0); animation-timing-function: ease-out; }
          25%  { transform: translate(-100px, -25px); animation-timing-function: ease-in; }
          50%  { transform: translate(0, 0); }
          100% { transform: translate(0, 0); }
        }
        @keyframes swingRight {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(0, 0); animation-timing-function: ease-out; }
          75%  { transform: translate(100px, -25px); animation-timing-function: ease-in; }
          100% { transform: translate(0, 0); }
        }
        @keyframes colorCycle {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .pendulum-left {
          animation: swingLeft 1.6s infinite;
        }
        .pendulum-right {
          animation: swingRight 1.6s infinite;
        }
        .circle-container {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(4px);
        }
        @media (max-width: 768px) {
          @keyframes swingLeft {
            0%   { transform: translate(0, 0); animation-timing-function: ease-out; }
            25%  { transform: translate(-60px, -15px); animation-timing-function: ease-in; }
            50%  { transform: translate(0, 0); }
            100% { transform: translate(0, 0); }
          }
          @keyframes swingRight {
            0%   { transform: translate(0, 0); }
            50%  { transform: translate(0, 0); animation-timing-function: ease-out; }
            75%  { transform: translate(60px, -15px); animation-timing-function: ease-in; }
            100% { transform: translate(0, 0); }
          }
          .circle-container {
            width: 110px;
            height: 110px;
          }
        }
      `,
        }}
      />

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Newton's Cradle 404 Container */}
        <div className="flex items-center justify-center mb-16 pt-32">
          {/* Left Ball - 4 */}
          <div className="pendulum-left circle-container">
            <span className="text-[10px] md:text-[12px] text-gray-400 tracking-widest uppercase mb-1">
              OOOPS
            </span>
            <span className="text-5xl md:text-7xl font-light text-white">
              4
            </span>
            <span className="text-[10px] md:text-[12px] text-gray-400 tracking-widest uppercase mt-1">
              WE'RE SORRY
            </span>
          </div>

          {/* Middle Ball - 0 (Fixed) */}
          <div className="circle-container shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <span className="text-[10px] md:text-[12px] text-gray-400 tracking-widest uppercase mb-1">
              PAGE NOT
            </span>
            <span className="text-5xl md:text-7xl font-light text-white">
              0
            </span>
            <span className="text-[10px] md:text-[12px] text-gray-400 tracking-widest uppercase mt-1">
              FOUND
            </span>
          </div>

          {/* Right Ball - 4 */}
          <div className="pendulum-right circle-container">
            <span className="text-[10px] md:text-[12px] text-gray-400 tracking-widest uppercase mb-1">
              SOMETHING
            </span>
            <span className="text-5xl md:text-7xl font-light text-white">
              4
            </span>
            <span className="text-[10px] md:text-[12px] text-gray-400 tracking-widest uppercase mt-1">
              IS BROKEN
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center w-full mt-8">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-white/20 bg-transparent px-8 py-3.5 text-sm font-bold uppercase text-white transition-all duration-300 hover:border-white shrink-0"
          >
            <span className="relative flex items-center gap-2 z-10 tracking-wider">
              Return to Homepage
              <svg
                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
