import { createCrudService } from "./crud.service";
import { revalidatePage } from "@/app/actions";

export interface InvestmentPartner {
  _id: string;
  title: string;
  description: string;
  image: string;
  iconName: string; // E.g., 'Building2', 'Globe2'
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentPartnerResponse {
  success: boolean;
  data: InvestmentPartner[];
  total: number;
  count: number;
  currentPage: number;
  totalPages: number;
}

export interface SingleInvestmentPartnerResponse {
  success: boolean;
  data: InvestmentPartner;
}

// ----------------------
// Admin Methods
// ----------------------

const adminPartnerCrud = createCrudService<
  InvestmentPartner,
  Partial<InvestmentPartner>,
  Partial<InvestmentPartner>
>("/admin/investment-partners");

export const getInvestmentPartnersAdmin = (
  params?: Record<string, any>,
): Promise<InvestmentPartnerResponse> =>
  adminPartnerCrud.getAll(params) as Promise<InvestmentPartnerResponse>;

export const getInvestmentPartnerByIdAdmin = (
  id: string,
): Promise<SingleInvestmentPartnerResponse> =>
  adminPartnerCrud.getByIdOrSlug(
    id,
  ) as Promise<SingleInvestmentPartnerResponse>;

export const createInvestmentPartnerAdmin = async (
  data: Partial<InvestmentPartner>,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminPartnerCrud.create(data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/investors", "page");
  }
  return res;
};

export const updateInvestmentPartnerAdmin = async (
  id: string,
  data: Partial<InvestmentPartner>,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminPartnerCrud.update(id, data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/investors", "page");
  }
  return res;
};

export const deleteInvestmentPartnerAdmin = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminPartnerCrud.delete(id)) as any;
  if (!res || res.success !== false) {
    await revalidatePage("/investors", "page");
  }
  return res;
};

// ----------------------
// Public Methods
// ----------------------

const publicPartnerCrud = createCrudService<InvestmentPartner>(
  "/investment-partners",
);

export const getInvestmentPartnersPublic = (
  params?: Record<string, any>,
): Promise<InvestmentPartnerResponse> =>
  publicPartnerCrud.getAll(params) as Promise<InvestmentPartnerResponse>;
