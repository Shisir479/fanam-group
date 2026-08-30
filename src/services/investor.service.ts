import { createCrudService } from "./crud.service";
import { revalidatePage } from "@/app/actions";

export interface InvestorReport {
  _id: string;
  title: string;
  year: number;
  category:
    "Annual Report" | "Quarterly Report" | "Governance" | "Presentation";
  pdfUrl: string;
  thumbnailUrl?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface InvestorReportResponse {
  success: boolean;
  data: InvestorReport[];
  total: number;
  count: number;
  currentPage: number;
  totalPages: number;
}

export interface SingleInvestorReportResponse {
  success: boolean;
  data: InvestorReport;
}

// ----------------------
// Admin Methods
// ----------------------

const adminInvestorCrud = createCrudService<
  InvestorReport,
  Partial<InvestorReport>,
  Partial<InvestorReport>
>("/admin/investor-reports");

export const getInvestorReportsByAdmin = (
  params?: Record<string, any>,
): Promise<InvestorReportResponse> =>
  adminInvestorCrud.getAll(params) as Promise<InvestorReportResponse>;

export const getInvestorReportByIdAdmin = (
  id: string,
): Promise<SingleInvestorReportResponse> =>
  adminInvestorCrud.getByIdOrSlug(id) as Promise<SingleInvestorReportResponse>;

export const createInvestorReportByAdmin = async (
  data: Partial<InvestorReport>,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminInvestorCrud.create(data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/investors", "page");
  }
  return res;
};

export const updateInvestorReportByAdmin = async (
  id: string,
  data: Partial<InvestorReport>,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminInvestorCrud.update(id, data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/investors", "page");
  }
  return res;
};

export const deleteInvestorReportByAdmin = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminInvestorCrud.delete(id)) as any;
  if (!res || res.success !== false) {
    await revalidatePage("/investors", "page");
  }
  return res;
};

// ----------------------
// Public Methods
// ----------------------

const publicInvestorCrud =
  createCrudService<InvestorReport>("/investor-reports");

export const getInvestorReportsPublic = (
  params?: Record<string, any>,
): Promise<InvestorReportResponse> =>
  publicInvestorCrud.getAll(params) as Promise<InvestorReportResponse>;
