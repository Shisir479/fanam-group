import { api } from "@/lib/api";
import { createCrudService } from "./crud.service";
import { revalidatePage } from "@/app/actions";

export interface BlogTag {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface BlogTagResponse {
  success: boolean;
  data: BlogTag[];
}

export interface SingleBlogTagResponse {
  success: boolean;
  data: BlogTag;
}

// ----------------------
// Admin Methods
// ----------------------

const adminBlogTagCrud = createCrudService<
  BlogTag,
  Partial<BlogTag>,
  Partial<BlogTag>
>("/admin/blog-tags");

export const getBlogTagsByAdmin = (): Promise<BlogTagResponse> =>
  adminBlogTagCrud.getAll() as Promise<BlogTagResponse>;

export const getBlogTagBySlugByAdmin = (
  slug: string,
): Promise<SingleBlogTagResponse> =>
  adminBlogTagCrud.getByIdOrSlug(slug) as Promise<SingleBlogTagResponse>;

export const createBlogTagByAdmin = async (
  data: Partial<BlogTag>,
): Promise<{ success: boolean; message: string; data?: BlogTag }> => {
  const res = (await adminBlogTagCrud.create(data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const updateBlogTagBySlugByAdmin = async (
  slug: string,
  data: Partial<BlogTag>,
): Promise<{ success: boolean; message: string; data?: BlogTag }> => {
  const res = (await adminBlogTagCrud.update(slug, data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const deleteBlogTagBySlugByAdmin = async (
  slug: string,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminBlogTagCrud.delete(slug)) as any;
  if (!res || res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

// ----------------------
// Public Methods
// ----------------------

export const getBlogTagsPublic = async (): Promise<BlogTagResponse> => {
  const res = await api("/blog-tags");
  return res as BlogTagResponse;
};
