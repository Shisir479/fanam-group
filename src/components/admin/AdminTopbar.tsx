"use client";

import { Bell, Search, Menu, ArrowLeft, ChevronDown, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AdminTopbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const mainScrollElement = document.getElementById('admin-main-scroll');
    if (!mainScrollElement) return;

    const handleScroll = () => {
      setIsScrolled(mainScrollElement.scrollTop > 10);
    };

    mainScrollElement.addEventListener('scroll', handleScroll);
    return () => mainScrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`h-14 border-b border-x transition-all duration-300 flex items-center justify-between px-6 z-40 ${isScrolled
          ? 'bg-admin-gradient border-white/10 shadow-2xl rounded-b-2xl'
          : 'bg-transparent border-transparent'
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
        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
            <User className="w-5 h-5 text-black " />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold text-white leading-tight">Admin User</p>
            <p className="text-xs text-gray-300">Owner</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-300 ml-1" />
        </button>
      </div>
    </div>
  );
}
