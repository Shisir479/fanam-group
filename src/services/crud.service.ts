import { api } from "@/lib/api";

export const createCrudService = <T, C = Partial<T>, U = Partial<T>>(
  basePath: string,
) => {
  return {
    getAll: async (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, value.toString());
        }
      });
      const queryString = query.toString();
      const endpoint = queryString ? `${basePath}?${queryString}` : basePath;

      const tag = basePath.replace(/^\/+/, "").split("/")[0] || "api";
      return api(endpoint, {
        next: { revalidate: 10, tags: [tag] },
      });
    },

    getByIdOrSlug: async (idOrSlug: string) => {
      const tag = basePath.replace(/^\/+/, "").split("/")[0] || "api";
      return api(`${basePath}/${idOrSlug}`, {
        next: { revalidate: 10, tags: [tag] },
      });
    },

    create: async (data: C) => {
      return api(basePath, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    update: async (idOrSlug: string, data: U) => {
      return api(`${basePath}/${idOrSlug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },

    delete: async (idOrSlug: string) => {
      return api(`${basePath}/${idOrSlug}`, {
        method: "DELETE",
      });
    },
  };
};
