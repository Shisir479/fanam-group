"use client";

import Image from "next/image";
import { ArrowRight, Download, FileText, Globe, Component } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { InvestorReport } from "@/services/investor.service";
import { InvestmentPartner } from "@/services/investment-partner.service";

interface InvestorsClientProps {
  initialReports: InvestorReport[];
  initialPartners: InvestmentPartner[];
}

export default function InvestorsClient({
  initialReports,
  initialPartners,
}: InvestorsClientProps) {
  // Filter active reports only
  const activeReports = initialReports.filter((r) => r.status === "active");

  const financialReports = activeReports.filter(
    (r) =>
      r.category === "Annual Report" ||
      r.category === "Quarterly Report" ||
      r.category === "Presentation",
  );

  const governanceDocs = activeReports.filter(
    (r) => r.category === "Governance",
  );

  // Group financial reports by year
  const reportsByYear = financialReports.reduce(
    (acc, report) => {
      if (!acc[report.year]) acc[report.year] = [];
      acc[report.year].push(report);
      return acc;
    },
    {} as Record<number, InvestorReport[]>,
  );

  const sortedYears = Object.keys(reportsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const activePartners = initialPartners.filter((p) => p.status === "active");

  return (
    <div className="bg-white">
      {/* 1. Our Investment Partners Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-3 block">
              Partnerships
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Our Investment Partners
            </h2>
            <p className="text-lg text-slate-600">
              At Fanam Group, we value the trust and commitment of our partners.
              Our comprehensive investor relations strategy ensures transparency
              and consistent growth for all our stakeholders.
            </p>
          </div>

          {activePartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {activePartners.map((category) => {
                // Dynamically resolve the icon
                const IconComponent =
                  (LucideIcons as any)[category.iconName] || Globe;

                return (
                  <div
                    key={category._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-slate-100"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent z-20" />
                      <div className="absolute bottom-5 left-5 z-30 bg-white p-3 rounded-xl shadow-md">
                        <IconComponent className="w-8 h-8 text-brand-blue" />
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {category.title}
                      </h3>
                      <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                        {category.description}
                      </p>

                      <Link
                        href={`/contact?subject=Investing as ${category.title}`}
                        className="inline-flex items-center text-brand-blue font-semibold hover:text-blue-800 transition-colors mt-auto group/link"
                      >
                        Partner With Us
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
              <Component className="w-16 h-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-slate-700">
                No partners listed yet
              </h3>
              <p className="text-slate-500 mt-2">
                Partners will be updated shortly by the administration.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. Financial Performance Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-3 block">
                Performance
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Financial Reports
              </h2>
              <p className="text-lg text-slate-600">
                Access our latest annual reports, quarterly financial
                statements, and investor presentations to stay updated on our
                growth trajectory.
              </p>
            </div>
          </div>

          {sortedYears.length > 0 ? (
            <div className="space-y-12">
              {sortedYears.map((year) => (
                <div
                  key={year}
                  className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl md:text-6xl font-black text-slate-200">
                      {year}
                    </span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reportsByYear[year].map((report) => (
                      <a
                        key={report._id}
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300"
                      >
                        <div className="w-14 h-14 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                          <FileText className="w-7 h-7" />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors mb-2 line-clamp-2">
                          {report.title}
                        </h4>
                        <p className="text-sm text-slate-500 mb-6">
                          {report.category}
                        </p>
                        <div className="mt-auto flex items-center justify-between text-sm font-semibold text-brand-blue border-t border-slate-100 pt-4">
                          <span>Download PDF</span>
                          <Download className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-slate-700">
                No reports available yet
              </h3>
              <p className="text-slate-500 mt-2">
                Financial reports will appear here once published by the
                administration.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Corporate Governance Section */}
      <section className="py-16 bg-white text-slate-900">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#f9c602] font-bold tracking-wider uppercase text-sm mb-3 block">
                Compliance
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Corporate Governance
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                At Fanam Group, we are committed to maintaining the highest
                standards of corporate governance, transparency, and ethics. We
                believe that good governance is the foundation of long-term
                sustainable success.
              </p>

              {governanceDocs.length > 0 ? (
                <div className="space-y-4">
                  {governanceDocs.map((doc) => (
                    <a
                      key={doc._id}
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-slate-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 group-hover:text-[#f9c602] transition-colors">
                            {doc.title}
                          </h4>
                          <p className="text-sm text-slate-500">
                            Published: {doc.year}
                          </p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-slate-400 group-hover:text-[#f9c602] transition-colors" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <p className="text-slate-500">
                    Governance documents will be updated shortly.
                  </p>
                </div>
              )}
            </div>

            <div className="relative h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply z-10" />
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                alt="Corporate Governance"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
