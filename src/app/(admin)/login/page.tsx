"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-sans bg-black">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Architecture"
          fill
          className="object-cover opacity-100 "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[480px] p-8 mx-4">
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle Glow Effects inside card */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-blue/30 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px]" />

          {/* Logo / Brand */}
          <div className="text-center mb-10 relative z-10 flex flex-col items-center">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105 duration-500"
            >
              <Image
                src="/company_logo/logo-white.63532709.svg"
                alt="Bonedi Logo"
                width={140}
                height={45}
                className="w-[140px] h-auto drop-shadow-2xl"
              />
            </Link>
            <div className="h-[1px] w-12 bg-white/20 mt-6 mb-4 rounded-full" />
            <h2 className="text-white/80 text-sm tracking-widest uppercase font-light">
              Admin Portal
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-medium text-white/60 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none !text-white transition-colors duration-300">
                  <Mail className="h-4 w-4 !text-white" color="white" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/20 rounded-xl py-3.5 pl-11 pr-4 !text-white text-sm placeholder:!text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all duration-300 [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                  placeholder="admin@bonedihomes.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-medium text-white/60 uppercase tracking-widest ml-1 flex justify-between">
                <span>Password</span>
                <a
                  href="#"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                >
                  Forgot?
                </a>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none !text-white transition-colors duration-300">
                  <Lock className="h-4 w-4 !text-white" color="white" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/20 rounded-xl py-3.5 pl-11 pr-12 !text-white text-sm placeholder:!text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all duration-300 tracking-[0.2em] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center !text-white hover:!text-white transition-colors duration-300 outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 !text-white" color="white" />
                  ) : (
                    <Eye className="h-4 w-4 !text-white" color="white" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl py-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <span className="uppercase tracking-widest text-xs">
                {isSubmitting ? "Authenticating..." : "Secure Login"}
              </span>
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
          {/* Footer Text */}
          <div className="mt-8 text-center relative z-10">
            <p className="text-[9px] text-white/30 tracking-[0.2em] uppercase">
              Protected by Enterprise Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
