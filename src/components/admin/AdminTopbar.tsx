"use client";

import {
  Bell,
  Search,
  Menu,
  ArrowLeft,
  ChevronDown,
  User,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export function AdminTopbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const mainScrollElement = document.getElementById("admin-main-scroll");
    if (!mainScrollElement) return;

    const handleScroll = () => {
      setIsScrolled(mainScrollElement.scrollTop > 10);
    };

    mainScrollElement.addEventListener("scroll", handleScroll);
    return () => mainScrollElement.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`h-14 border-b border-x transition-all duration-300 flex items-center justify-between px-6 z-40 ${
        isScrolled
          ? "bg-admin-gradient border-white/10 shadow-2xl rounded-b-2xl"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl glass-panel text-gray-200 hover:text-white transition-all overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Bell className="w-4 h-4 relative z-10" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-yellow-500 rounded-full border border-[#120a1c] z-10"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
              <User className="w-5 h-5 text-black " />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-white leading-tight">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : "Admin User"}
              </p>
              <p className="text-xs text-gray-300 capitalize">
                {user?.role || "Owner"}
              </p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-300 ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute -left-15 top-full mt-2 w-64  backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <User className="w-6 h-6 text-black " />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">
                      {user?.firstName
                        ? `${user.firstName} ${user.lastName || ""}`
                        : "Admin User"}
                    </p>
                    <p className="text-xs text-gray-300 capitalize">
                      {user?.role || "Owner"}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 font-medium truncate">
                  {user?.email || "admin@example.com"}
                </p>
              </div>

              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  My Settings
                </button>
              </div>

              <div className="p-2 border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
