import { BlockReveal } from "@/components/ui/BlockReveal";
import { Shield, Gem, Users, Leaf, Lightbulb, TrendingUp } from "lucide-react";

export function CoreValues({ data }: { data: any }) {
  const defaultValues = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity",
      description:
        "We uphold the highest standards of honesty and transparency in all our interactions and transactions.",
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Quality",
      description:
        "Uncompromising commitment to excellence in materials, design, and construction.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description:
        "Our clients are at the heart of everything we do. We build relationships, not just buildings.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description:
        "Dedicated to eco-friendly practices and building sustainable communities for the future.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Continuously adopting new technologies and architectural trends to stay ahead of the curve.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth",
      description:
        "Fostering an environment of continuous learning and growth for our team and partners.",
    },
  ];

  const values =
    data?.coreValues?.length > 0
      ? data.coreValues.map((cv: any, i: number) => ({
          ...cv,
          icon: defaultValues[i % defaultValues.length].icon,
        }))
      : defaultValues;

  if (!data) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-5 md:px-16">
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <BlockReveal color="var(--color-brand-blue)">
            <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              OUR PRINCIPLES
            </div>
          </BlockReveal>
          <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.3] uppercase max-w-3xl text-center">
              CORE VALUES
            </h2>
          </BlockReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value: any, index: number) => (
            <div
              key={index}
              className="bg-white p-10 border border-gray-50 shadow-sm transition-shadow group flex flex-col items-start"
            >
              <div className="bg-brand-blue/5 text-brand-blue p-4 rounded-none mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
