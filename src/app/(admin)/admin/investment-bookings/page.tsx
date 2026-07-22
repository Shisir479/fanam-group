import { constructMetadata } from "@/lib/metadata";
import AdminInvestmentBookingListClient from "@/components/admin/investment-bookings/AdminInvestmentBookingListClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminInvestmentBookingsPage() {
  return <AdminInvestmentBookingListClient />;
}
