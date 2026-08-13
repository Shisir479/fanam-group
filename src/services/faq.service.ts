import { api } from "@/lib/api";

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const faqService = {
  getAll: async () => {
    return api("/all-faq", {
      next: { revalidate: 10, tags: ["faq"] },
    });
  },

  getById: async (id: string) => {
    return api(`/faq/${id}`, {
      next: { revalidate: 10, tags: ["faq"] },
    });
  },

  create: async (data: Partial<FAQ>) => {
    return api("/create-faq", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<FAQ>) => {
    return api(`/update-faq/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return api(`/delete-faq/${id}`, {
      method: "DELETE",
    });
  },
};
