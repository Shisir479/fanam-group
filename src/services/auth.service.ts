import { api } from "@/lib/api";

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  earnPoints?: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return api("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // other endpoints like sign-up, verify-otp can be added here
};
