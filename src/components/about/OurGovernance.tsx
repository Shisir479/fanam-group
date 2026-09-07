"use client";

import React from "react";
import {
  UserCheck,
  ClipboardCheck,
  Recycle,
  Scale,
  Handshake,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const ethicalPillars = [
  {
    title: "Ethical Leadership & Conduct",
    desc: "We enforce an uncompromising code of corporate ethics, ensuring every strategic decision reflects integrity, fairness, and honor.",
    icon: <UserCheck className="w-5 h-5 text-[#0a0a0a]" />,
  },
  {
    title: "Strict Regulatory Compliance",
    desc: "We strictly observe all national laws, industrial regulations, statutory mandates, and corporate compliance benchmarks.",
    icon: <ClipboardCheck className="w-5 h-5 text-[#0a0a0a]" />,
  },
  {
    title: "Sustainable Corporate Stewardship",
    desc: "Our management champions resource efficiency and long-term societal value, balancing commercial growth with environmental care.",
    icon: <Recycle className="w-5 h-5 text-[#0a0a0a]" />,
  },
];

const riskPillars = [
  {
    title: "Radical Transparency & Accountability",
    desc: "We foster an open communication culture, transparent financial reporting, and clear governance across all executive tiers.",
    icon: <Scale className="w-5 h-5 text-[#0a0a0a]" />,
  },
  {
    title: "Stakeholder Trust & Protection",
    desc: "We prioritize and protect the rights of our clients, investors, employees, and community partners through verified trust mechanisms.",
    icon: <Handshake className="w-5 h-5 text-[#0a0a0a]" />,
  },
  {
    title: "Enterprise Risk & Security",
    desc: "Our dedicated audit units actively assess operational risks, cyber resilience, and compliance safety to guarantee stability.",
    icon: <ShieldAlert className="w-5 h-5 text-[#0a0a0a]" />,
  },
];

export function OurGovernance() {
  return (
    <section className="relative fanam-section bg-gradient-to-b from-white via-neutral-50/60 to-white overflow-hidden py-20 lg:py-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#f9c602]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/35 text-[#0a0a0a] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0a0a0a]" />
            <span>Corporate Governance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0a0a0a] leading-[1.2] tracking-tight mb-5">
            Institutional Integrity & Ethical{" "}
            <span className="relative whitespace-nowrap text-[#0a0a0a]">
              Governance
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
            Fanam Group operates under a rigorous governance framework built upon transparency,
            fiduciary accountability, regulatory adherence, and world-class ethical leadership.
          </p>
        </div>

        {/* 2 Governance Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Column 1: Ethical Leadership */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-[#f9c602] flex items-center justify-center text-[#0a0a0a] shadow-sm">
                <ShieldCheck className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0a0a0a]">
                  Ethical Leadership & Compliance
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Upholding our core fiduciary responsibilities
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {ethicalPillars.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-5 rounded-2xl bg-neutral-50 border border-gray-100 hover:border-[#f9c602]/60 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0a0a0a] flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-gray-100 group-hover:bg-[#f9c602] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0a0a0a] mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Risk & Accountability */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] flex items-center justify-center text-[#f9c602] shadow-sm">
                <Scale className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0a0a0a]">
                  Accountability & Risk Stewardship
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Protecting assets, data, and partner interests
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {riskPillars.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-5 rounded-2xl bg-neutral-50 border border-gray-100 hover:border-[#f9c602]/60 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0a0a0a] flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-gray-100 group-hover:bg-[#f9c602] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0a0a0a] mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Trust Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/15 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#f9c602] text-[#0a0a0a] flex items-center justify-center shadow-lg shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-0.5">
                Institutional Trust & Compliance Seal
              </h4>
              <p className="text-xs text-white/70">
                100% Regulatory Adherence • Independent Internal Audits • Zero Tolerance for Unethical Conduct
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-[#f9c602] text-xs font-bold uppercase tracking-wider shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#f9c602]" />
            <span>Certified Governance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
