"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  Building2,
  Briefcase,
  Newspaper,
  MessageSquare,
  Users,
  ImageIcon,
  PhoneCall,
  Activity,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";

interface DashboardData {
  statistics: {
    totalProjects: number;
    totalServices: number;
    totalBlogs: number;
    totalGallery: number;
    totalTestimonials: number;
    totalContacts: number;
    totalInquiries: number;
    totalVisitors: number;
    uniqueVisitors: number;
    todayVisitors: number;
  };
  widgets: {
    recentInquiries: any[];
    recentContacts: any[];
    latestVisitors: any[];
    timeline: any[];
  };
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api("/admin/dashboard-analytics");
        if (response?.success) {
          setData(response);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      value: data?.statistics.totalProjects || 0,
      icon: <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />,
      bgGradient: "from-blue-500/20 to-transparent dark:from-blue-500/10",
      borderColor: "border-blue-500/30 dark:border-blue-500/20",
    },
    {
      title: "Our Services",
      value: data?.statistics.totalServices || 0,
      icon: (
        <Briefcase className="w-7 h-7 text-purple-600 dark:text-purple-400" />
      ),
      bgGradient: "from-purple-500/20 to-transparent dark:from-purple-500/10",
      borderColor: "border-purple-500/30 dark:border-purple-500/20",
    },
    {
      title: "Blog & News",
      value: data?.statistics.totalBlogs || 0,
      icon: (
        <Newspaper className="w-7 h-7 text-green-600 dark:text-green-400" />
      ),
      bgGradient: "from-green-500/20 to-transparent dark:from-green-500/10",
      borderColor: "border-green-500/30 dark:border-green-500/20",
    },
    {
      title: "Gallery Items",
      value: data?.statistics.totalGallery || 0,
      icon: <ImageIcon className="w-7 h-7 text-teal-600 dark:text-teal-400" />,
      bgGradient: "from-teal-500/20 to-transparent dark:from-teal-500/10",
      borderColor: "border-teal-500/30 dark:border-teal-500/20",
    },
    {
      title: "Testimonials",
      value: data?.statistics.totalTestimonials || 0,
      icon: (
        <MessageSquare className="w-7 h-7 text-orange-600 dark:text-orange-400" />
      ),
      bgGradient: "from-orange-500/20 to-transparent dark:from-orange-500/10",
      borderColor: "border-orange-500/30 dark:border-orange-500/20",
    },
    {
      title: "Total Inquiries",
      value: data?.statistics.totalInquiries || 0,
      icon: <PhoneCall className="w-7 h-7 text-red-600 dark:text-red-400" />,
      bgGradient: "from-red-500/20 to-transparent dark:from-red-500/10",
      borderColor: "border-red-500/30 dark:border-red-500/20",
    },
    {
      title: "Total Contacts",
      value: data?.statistics.totalContacts || 0,
      icon: <Users className="w-7 h-7 text-pink-600 dark:text-pink-400" />,
      bgGradient: "from-pink-500/20 to-transparent dark:from-pink-500/10",
      borderColor: "border-pink-500/30 dark:border-pink-500/20",
    },
    {
      title: "Today's Visitors",
      value: data?.statistics.todayVisitors || 0,
      icon: (
        <Activity className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
      ),
      bgGradient: "from-indigo-500/20 to-transparent dark:from-indigo-500/10",
      borderColor: "border-indigo-500/30 dark:border-indigo-500/20",
    },
    {
      title: "Total Visitors",
      value: data?.statistics.totalVisitors || 0,
      icon: <Globe className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />,
      bgGradient: "from-cyan-500/20 to-transparent dark:from-cyan-500/10",
      borderColor: "border-cyan-500/30 dark:border-cyan-500/20",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Stats Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 px-1">
          Overview Statistics
        </h3>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="glass-panel bg-white/40 dark:bg-transparent border border-gray-200/50 dark:border-white/10 p-6 min-h-[110px] flex items-center gap-5 animate-pulse rounded-xl"
              >
                <div className="w-14 h-14 bg-gray-200/50 dark:bg-white/5 rounded-xl shrink-0"></div>
                <div className="flex-1">
                  <div className="w-24 h-4 bg-gray-200/50 dark:bg-white/5 rounded mb-2"></div>
                  <div className="w-16 h-6 bg-gray-200/80 dark:bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className={`glass-panel relative overflow-hidden rounded-xl p-6 min-h-[110px] flex items-center gap-5 border border-gray-200/50 dark:border-white/10 dark:${card.borderColor}`}
              >
                {/* Background Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-20 dark:opacity-30 pointer-events-none`}
                />

                <div className="relative z-10 shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-white/90 dark:bg-black/20 flex items-center justify-center border border-white/50 dark:border-white/5 shadow-sm dark:shadow-none">
                    {card.icon}
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <h4 className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                    {card.title}
                  </h4>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-none">
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional: Add a section for recent timeline or inquiries if needed later */}
      {!loading &&
        data?.widgets?.timeline &&
        data.widgets.timeline.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 px-1">
              Recent Activity
            </h3>
            <div className="glass-panel p-6 bg-white/60 dark:bg-white/5">
              <ul className="space-y-4">
                {data.widgets.timeline.slice(0, 5).map((activity, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {activity.type}
                      </p>
                      <p className="text-sm text-gray-500">{activity.title}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </div>
  );
}
