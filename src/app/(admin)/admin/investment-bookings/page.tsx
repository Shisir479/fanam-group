import { constructMetadata } from "@/lib/metadata";
import { getInvestmentBookingsAdmin } from "@/services/investment-booking.service";
import AdminInvestmentBookingListClient, {
  InvestmentBooking,
} from "@/components/admin/investment-bookings/AdminInvestmentBookingListClient";

export const metadata = constructMetadata({
  title: "Investment Bookings (Inquiries) - Admin Dashboard",
  noIndex: true,
});

export default async function AdminInvestmentBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";
  const status = resolvedParams.status || "";

  let bookings: InvestmentBooking[] = [];
  let totalPages = 1;

  try {
    const res: any = await getInvestmentBookingsAdmin({
      page,
      search,
      status,
      limit: 10,
    });
    if (res.success) {
      bookings = res.data;
      totalPages = res.count || 1;
    }
  } catch (error) {
    console.error("Failed to fetch investment bookings in SSR", error);
  }

  return (
    <AdminInvestmentBookingListClient
      initialBookings={bookings}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
      currentStatus={status}
    />
  );
}
