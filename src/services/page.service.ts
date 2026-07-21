import { api } from "@/lib/api";
import { createCrudService } from "./crud.service";
import { revalidateGlobalCache } from "@/app/actions";

export interface Page {
  _id: string;
  name: string;
  link: string;
  metaTitle: string;
  description: string;
  metaDescription: string;
  slug: string;
  status: "active" | "inactive";
  cover?: {
    _id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse {
  success: boolean;
  data: Page[];
  total: number;
  count: number;
  currentPage: number;
  totalPages: number;
}

export interface SinglePageResponse {
  success: boolean;
  data: Page;
}

// ----------------------
// Admin Methods
// ----------------------

const adminPageCrud = createCrudService<Page, Partial<Page>, Partial<Page>>(
  "/admin/pages",
);

export const getPagesByAdmin = (
  params?: Record<string, any>,
): Promise<PageResponse> =>
  adminPageCrud.getAll(params) as Promise<PageResponse>;

export const getPageBySlugByAdmin = (
  slug: string,
): Promise<SinglePageResponse> =>
  adminPageCrud.getByIdOrSlug(slug) as Promise<SinglePageResponse>;

export const createPageByAdmin = async (
  data: Partial<Page>,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminPageCrud.create(data)) as any;
  if (res?.success !== false) {
    await revalidateGlobalCache("pages");
  }
  return res;
};

export const updatePageBySlugByAdmin = async (
  slug: string,
  data: Partial<Page>,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminPageCrud.update(slug, data)) as any;
  if (res?.success !== false) {
    await revalidateGlobalCache("pages");
  }
  return res;
};

export const deletePageBySlugByAdmin = async (
  slug: string,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminPageCrud.delete(slug)) as any;
  if (!res || res.success !== false) {
    await revalidateGlobalCache("pages");
  }
  return res;
};

// ----------------------
// Public Methods
// ----------------------

const publicPageCrud = createCrudService<Page>("/pages");

export const getPageBySlugPublic = (
  slug: string,
): Promise<SinglePageResponse> =>
  publicPageCrud.getByIdOrSlug(slug) as Promise<SinglePageResponse>;
