import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
  : "http://localhost:8003/api";

type FetchOptions = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };

export const api = async (endpoint: string, options: FetchOptions = {}) => {
  const token = Cookies.get("token");

  const headers = new Headers(options.headers || {});

  // Only set Content-Type if it's not already set, and it's not FormData
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.message || "Something went wrong",
      data,
    };
  }

  return data;
};
