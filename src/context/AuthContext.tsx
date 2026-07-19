"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { User, LoginCredentials, authService } from "@/services/auth.service";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has a token in cookies
    const token = Cookies.get("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.success && response.token) {
        // Set token in cookies (accessible to Next.js middleware)
        Cookies.set("token", response.token, { expires: 7 }); // Expires in 7 days

        // Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(response.user));

        setUser(response.user);
        setIsAuthenticated(true);
        toast.success(response.message || "Logged in successfully");

        router.push("/admin");
      }
    } catch (error: any) {
      const errorMessage =
        error?.message || "Failed to login. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");

    // Redirect to login if currently on a protected route
    if (pathname?.startsWith("/admin")) {
      router.push("/login");
    } else {
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
