import { api } from "@/lib/api";

export interface InvestmentBookingPayload {
  fullName: string;
  occupation?: string;
  nidPassport?: string;
  nationality?: string;
  dateOfBirth?: Date | string | null;
  religion?: string;
  email?: string;
  phone: string;
  presentAddress?: string;
  permanentAddress?: string;
  preferredLocation?: string;
  nomineeName?: string;
  nomineePresentAddress?: string;
  nomineePermanentAddress?: string;
  nomineeRelation?: string;
  nomineePhone?: string;
  investmentAmount: number;
  propertyType:
    "Residential" | "Commercial" | "Mixed Use" | "Apartment" | "Villa" | "Land";
  duration?: number;
  signature: {
    _id: string;
    url: string;
  };
  status?: "pending" | "contacted" | "approved" | "rejected";
}

export const createInvestmentBookingPublic = async (
  payload: InvestmentBookingPayload,
) => {
  return await api("/investment-bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getInvestmentBookingsAdmin = async (query?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (query?.page) queryParams.append("page", query.page.toString());
  if (query?.limit) queryParams.append("limit", query.limit.toString());
  if (query?.status) queryParams.append("status", query.status);
  if (query?.search) queryParams.append("search", query.search);

  const queryString = queryParams.toString();
  return await api(
    `/admin/investment-bookings${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    },
  );
};

export const getInvestmentBookingByIdAdmin = async (id: string) => {
  return await api(`/admin/investment-bookings/${id}`, {
    method: "GET",
  });
};

export const updateInvestmentBookingAdmin = async (
  id: string,
  payload: Partial<InvestmentBookingPayload>,
) => {
  return await api(`/admin/investment-bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const deleteInvestmentBookingAdmin = async (id: string) => {
  return await api(`/admin/investment-bookings/${id}`, {
    method: "DELETE",
  });
};
