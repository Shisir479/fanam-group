import { api } from "@/lib/api";
import { createCrudService } from "./crud.service";
import { revalidatePage } from "@/app/actions";

export interface Blog {
  _id: string;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  cover?: {
    _id: string;
    url: string;
  };
  blogCategory?: {
    _id: string;
    name: string;
    slug?: string;
  };
  tags: string[];
  status: "draft" | "active" | "inactive";
  publishedAt?: string | null;
  metaTitle: string;
  metaDescription: string;
  views: number;
  readingTime: number;
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  success: boolean;
  data: Blog[];
  total: number;
  count: number;
  currentPage: number;
}

export interface SingleBlogResponse {
  success: boolean;
  data: Blog;
}

// ----------------------
// Admin Methods
// ----------------------

const adminBlogCrud = createCrudService<Blog, Partial<Blog>, Partial<Blog>>(
  "/admin/blogs",
);

export const getBlogsByAdmin = (
  params?: Record<string, any>,
): Promise<BlogResponse> =>
  adminBlogCrud.getAll(params) as Promise<BlogResponse>;
export const getBlogBySlugByAdmin = (
  slug: string,
): Promise<SingleBlogResponse> =>
  adminBlogCrud.getByIdOrSlug(slug) as Promise<SingleBlogResponse>;
export const createBlogByAdmin = async (
  data: Partial<Blog>,
): Promise<{ success: boolean; message: string; id: string }> => {
  const res = (await adminBlogCrud.create(data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const updateBlogBySlugByAdmin = async (
  slug: string,
  data: Partial<Blog>,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminBlogCrud.update(slug, data)) as any;
  if (res?.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const deleteBlogBySlugByAdmin = async (
  slug: string,
): Promise<{ success: boolean; message: string }> => {
  const res = (await adminBlogCrud.delete(slug)) as any;
  if (!res || res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

// ----------------------
// Public Methods
// ----------------------

const publicBlogCrud = createCrudService<Blog>("/blogs");

export const getBlogsPublic = (
  params?: Record<string, any>,
): Promise<BlogResponse> =>
  publicBlogCrud.getAll(params) as Promise<BlogResponse>;
export const getBlogBySlugPublic = (
  slug: string,
): Promise<SingleBlogResponse> =>
  publicBlogCrud.getByIdOrSlug(slug) as Promise<SingleBlogResponse>;
