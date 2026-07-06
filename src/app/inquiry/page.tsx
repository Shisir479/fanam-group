import InquiryForm from "@/components/inquiry/InquiryForm";

export const metadata = {
  title: "Inquiry - Bonedi Homes",
  description: "Submit an inquiry or book an investment with Bonedi Homes.",
};

export default function InquiryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-5 md:px-16 max-w-5xl">
        <InquiryForm />
      </div>
    </div>
  );
}
