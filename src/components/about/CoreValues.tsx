import { Settings, Medal, Lightbulb, Target, TrendingUp, Network } from "lucide-react";

const coreValues = [
  {
    title: "Integrity",
    icon: <Settings className="w-8 h-8 text-slate-700" />,
    bg: "bg-slate-100",
  },
  {
    title: "Excellence",
    icon: <Medal className="w-8 h-8 text-yellow-500" />,
    bg: "bg-yellow-50",
  },
  {
    title: "Innovation",
    icon: <Lightbulb className="w-8 h-8 text-orange-500" />,
    bg: "bg-orange-50",
  },
  {
    title: "Customer Focus",
    icon: <Target className="w-8 h-8 text-red-500" />,
    bg: "bg-red-50",
  },
  {
    title: "Sustainability",
    icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    bg: "bg-green-50",
  },
  {
    title: "Teamwork",
    icon: <Network className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50",
  },
];

export function CoreValues({ data }: { data: any }) {
  // Hardcoded to match the strict visual design provided

  return (
    <section className="fanam-section bg-white relative overflow-hidden py-16 lg:py-24">
      <div className="fanam-container">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#f9c602]/10 text-[#181428] text-[10px] font-bold uppercase tracking-wider mb-6">
            Our Core Values
          </div>
          
          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-2xl mx-auto">
            Our core values define who we are, guide every decision we make, and inspire us to deliver excellence with integrity and innovation.
          </p>
        </div>

        {/* Desktop Layout (Horizontal Wavy Timeline) */}
        <div className="hidden lg:block relative w-full h-[200px] px-12 z-0">
          <div className="relative w-full h-full">
            
            {/* Wavy Dashed SVG Background */}
            <svg 
              className="absolute top-0 left-0 w-full h-[80px] overflow-visible z-0" 
              preserveAspectRatio="none" 
              viewBox="0 0 100 40"
            >
              <path 
                d="M 0 20 Q 10 -10, 20 20 T 40 20 T 60 20 T 80 20 T 100 20" 
                fill="transparent" 
                stroke="#86efac" 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke"
                strokeDasharray="8 8" 
              />
            </svg>

            {/* Icons and Labels */}
            {coreValues.map((val, i) => (
              <div 
                key={i} 
                className="absolute top-0 flex flex-col items-center -translate-x-1/2 w-32 z-10"
                style={{ left: `${i * 20}%` }}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-sm mb-4 border border-white ${val.bg} transform transition-transform hover:scale-110 duration-300`}>
                  {val.icon}
                </div>
                <h4 className="text-[15px] font-bold text-[#181428] whitespace-nowrap">
                  {val.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout (Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4 lg:hidden">
          {coreValues.map((val, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-sm mb-4 border border-white ${val.bg} transform transition-transform group-hover:scale-110 duration-300`}>
                {val.icon}
              </div>
              <h4 className="text-[14px] md:text-[15px] font-bold text-[#181428]">
                {val.title}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
