"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  createInvestmentBookingPublic,
  InvestmentBookingPayload,
} from "@/services/investment-booking.service";
import { useImageUpload } from "@/hooks/useImageUpload";
import toast from "react-hot-toast";
import Image from "next/image";

import { BlockReveal } from "@/components/ui/BlockReveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InquiryForm() {
  const searchParams = useSearchParams();
  const { uploadSingle } = useImageUpload();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<InvestmentBookingPayload>>({
    fullName: "",
    occupation: "",
    nidPassport: "",
    nationality: "Bangladesh",
    dateOfBirth: "",
    religion: "",
    email: "",
    phone: "",
    presentAddress: "",
    permanentAddress: "",
    preferredLocation: "",
    nomineeName: "",
    nomineePresentAddress: "",
    nomineePermanentAddress: "",
    nomineeRelation: "",
    nomineePhone: "",
    investmentAmount: 0,
    propertyType: "Apartment",
    duration: 12,
  });

  useEffect(() => {
    const queryPhone = searchParams.get("phone");
    const queryLocation = searchParams.get("location");
    const queryType = searchParams.get("type");
    if (queryPhone || queryLocation || queryType) {
      setFormData((prev) => ({
        ...prev,
        ...(queryPhone && { phone: queryPhone }),
        ...(queryLocation && { preferredLocation: queryLocation }),
        ...(queryType && { propertyType: queryType as any }),
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "investmentAmount" || name === "duration"
          ? Number(value)
          : value,
    }));
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSignatureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSignaturePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.investmentAmount ||
      !formData.propertyType
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!signatureFile) {
      toast.error("Applicant signature is required");
      return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting...");
    try {
      const uploadedSignature = await uploadSingle(signatureFile, true);
      if (!uploadedSignature) throw new Error("Failed to upload signature");
      const payload: InvestmentBookingPayload = {
        ...formData,
        fullName: formData.fullName!,
        phone: formData.phone!,
        investmentAmount: formData.investmentAmount!,
        propertyType: formData.propertyType as any,
        signature: { _id: uploadedSignature._id, url: uploadedSignature.url },
      };
      const res = await createInvestmentBookingPublic(payload);
      if (res?.success) {
        toast.success("Booking submitted successfully!", { id: toastId });
        window.location.href = "/";
      } else {
        throw new Error(res?.message || "Failed to submit booking");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit booking", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative">
      {/* Header */}
      <div className="bg-brand-blue text-white py-14 px-8 md:px-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10 flex flex-col items-center md:items-start">
          <BlockReveal color="#ffffff">
            <div className="flex items-center text-[12px] font-bold tracking-[0.25em] text-white/70 uppercase mb-3">
              Start Your Journey
            </div>
          </BlockReveal>
          <BlockReveal color="#ffffff" delay={0.2}>
            <h1 className="text-3xl md:text-[38px] font-bold mb-4 tracking-tight uppercase">
              Investment Booking
            </h1>
          </BlockReveal>
          <p className="text-white/80 text-sm md:text-base max-w-2xl text-center md:text-left mt-2">
            Fill in the form below to submit your booking request. Our experts
            will contact you to finalize the investment process.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-14 space-y-12">
        {/* Row 1: Personal Info */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-xl md:text-2xl font-bold text-brand-blue uppercase tracking-wide">
              Personal Information
            </h2>
            <span className="text-sm font-bold text-gray-300">01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Occupation
              </label>
              <input
                type="text"
                placeholder="Example: Service, Business, Freelancer"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                NID / Passport No.
              </label>
              <input
                type="text"
                placeholder="Enter ID number"
                name="nidPassport"
                value={formData.nidPassport}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Nationality
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={
                  formData.dateOfBirth
                    ? String(formData.dateOfBirth).split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Religion
              </label>
              <Select
                value={formData.religion || undefined}
                onValueChange={(val) =>
                  setFormData({ ...formData, religion: val ?? undefined })
                }
              >
                <SelectTrigger className="w-full border border-gray-200 p-3.5 h-[52px] rounded-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-gray-50/50 hover:bg-gray-50 transition-all text-gray-900 font-semibold shadow-none outline-none">
                  <SelectValue placeholder="Select Religion" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-gray-200 font-semibold text-gray-800">
                  <SelectItem value="islam">Islam</SelectItem>
                  <SelectItem value="hinduism">Hinduism</SelectItem>
                  <SelectItem value="christianity">Christianity</SelectItem>
                  <SelectItem value="buddhism">Buddhism</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact & Address */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-brand-blue uppercase tracking-wide">
                Contact & Address
              </h2>
              <span className="text-sm font-bold text-gray-300">02</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                  Present Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter your current address"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 resize-none outline-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                  Permanent Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter your permanent address"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 resize-none outline-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                  Preferred Location
                </label>
                <input
                  type="text"
                  placeholder="Example: Sonargaon, Purbachal, Ajman"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Nominee Information */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-brand-blue uppercase tracking-wide">
                Nominee Information
              </h2>
              <span className="text-sm font-bold text-gray-300">03</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                  Nominee Name
                </label>
                <input
                  type="text"
                  placeholder="Enter nominee name"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Present Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Nominee address"
                    name="nomineePresentAddress"
                    value={formData.nomineePresentAddress}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 resize-none outline-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Permanent Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Nominee address"
                    name="nomineePermanentAddress"
                    value={formData.nomineePermanentAddress}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 resize-none outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Relation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Spouse"
                    name="nomineeRelation"
                    value={formData.nomineeRelation}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    name="nomineePhone"
                    value={formData.nomineePhone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Investment Details */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-brand-blue uppercase tracking-wide">
                Investment Details
              </h2>
              <span className="text-sm font-bold text-gray-300">04</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                  Investment Amount
                </label>
                <input
                  type="text"
                  placeholder="e.g., BDT 10,00,000"
                  name="investmentAmount"
                  value={formData.investmentAmount || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Property Type *
                  </label>
                  <Select
                    required
                    value={formData.propertyType}
                    onValueChange={(val) =>
                      setFormData({ ...formData, propertyType: val as any })
                    }
                  >
                    <SelectTrigger className="w-full border border-gray-200 p-3.5 h-[52px] rounded-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-gray-50/50 hover:bg-gray-50 transition-all text-gray-900 font-semibold shadow-none outline-none">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-gray-200 font-semibold text-gray-800">
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                      <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                      <SelectItem value="Apartment">
                        Luxury Apartment
                      </SelectItem>
                      <SelectItem value="Commercial">
                        Commercial Space
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    placeholder="12"
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3.5 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none transition-all bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold placeholder:font-normal placeholder:text-gray-400 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Applicant Signature */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-brand-blue uppercase tracking-wide">
                Applicant Signature
              </h2>
              <span className="text-sm font-bold text-gray-300">05</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-full sm:w-1/2 h-36 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50/50 transition-colors hover:bg-gray-50 group overflow-hidden">
                {signaturePreview ? (
                  <Image
                    src={signaturePreview}
                    alt="Signature preview"
                    width={300}
                    height={120}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm font-medium group-hover:text-gray-500 transition-colors">
                    Signature Preview
                  </span>
                )}
              </div>

              <div className="w-full sm:w-1/2 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-2">
                    Upload Digital Signature
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    ref={signatureInputRef}
                    onChange={handleSignatureChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:border-0 file:text-[11px] file:font-bold file:uppercase file:tracking-wider file:bg-brand-blue file:text-white hover:file:bg-[#002f57] file:transition-colors file:cursor-pointer cursor-pointer border border-gray-200 bg-gray-50/50 p-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-xs font-semibold text-gray-500">
                    Supported formats: JPG, PNG, WEBP
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-xs font-semibold text-gray-500">
                    Maximum file size: 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-200 gap-6">
          <p className="text-sm text-gray-500 font-semibold text-center md:text-left max-w-lg">
            By submitting this form, you authorize our team to contact you to
            finalize the investment process.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto relative group/btn bg-brand-blue px-12 py-4 font-bold text-white uppercase tracking-wider overflow-hidden cursor-pointer shadow-md flex items-center justify-center shrink-0"
          >
            <span className="relative z-10">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </span>
            <span className="absolute inset-0 bg-[#002f57] scale-x-0 origin-left transition-transform duration-700 ease-out group-hover/btn:scale-x-100 z-0"></span>
          </button>
        </div>
      </form>
    </div>
  );
}
