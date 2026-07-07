import { ContactView } from "@/components/contact/ContactView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Bonedi Homes",
  description: "Get in touch with Bonedi Homes. Find our office locations, contact information, and business hours.",
};

export default function ContactPage() {
  return <ContactView />;
}
