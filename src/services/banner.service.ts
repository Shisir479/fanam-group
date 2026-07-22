import { api } from "@/lib/api";


export interface BannerStat {
  _id?: string;
  value: string;
  label: string;
}

export interface Banner {
  _id?: string;
  page: string;
  eyebrowText: string;
  title: string;
  description: string;
  backgroundImage: string;
  stats?: BannerStat[];
}

export const getBannerByPageAdmin = async (page: string) => {
  return await api(`/banner/${page}`, { method: "GET" });
};

export const updateBannerByPageAdmin = async (page: string, data: Partial<Banner>) => {
  return await api(`/banner/${page}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const getBannerByPagePublic = async (page: string) => {
  // Since there is no public route found, we use the admin GET route.
  // Assuming the GET route does not require auth, or if it does, we might need a public endpoint.
  // In many cases, /admin/ GET routes might be protected.
  // Wait, let's use fetchAPI without auth token if possible, or just call it directly.
  // Let's call the same endpoint. If it's protected, the backend needs a public route.
  // For now, we will use fetchAPI, which might attach a token. But public pages don't have tokens during SSR.
  // Let's just create a direct fetch without token for public.
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
      : "http://localhost:8003/api";
      
    const res = await fetch(`${baseUrl}/banner/${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch banner");
    
    const data = await res.json();
    return data?.data || (data?._id ? data : null);
  } catch (error) {
    console.error("Banner fetch error:", error);
    return null;
  }
};
