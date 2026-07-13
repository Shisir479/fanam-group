import { 
  Building, 
  Users, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Calendar,
  MoreVertical,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 mb-3">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-sm text-gray-200 mt-1">Welcome back, here is what is happening today.</p>
        </div>
        <button className="glass-btn">
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
        {/* Force Refresh */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Projects" 
          value="24" 
          change="+12%" 
          isPositive={true}
          icon={<Building className="w-4.5 h-4.5 text-blue-400" />}
          bgColor="bg-blue-50"
        />
        <StatCard 
          title="Total Inquiries" 
          value="156" 
          change="+8%" 
          isPositive={true}
          icon={<MessageSquare className="w-4.5 h-4.5 text-green-400" />}
          bgColor="bg-green-50"
        />
        <StatCard 
          title="Website Visitors" 
          value="12.5k" 
          change="+24%" 
          isPositive={true}
          icon={<Eye className="w-4.5 h-4.5 text-purple-400" />}
          bgColor="bg-purple-50"
        />
        <StatCard 
          title="Active Users" 
          value="8" 
          change="-2%" 
          isPositive={false}
          icon={<Users className="w-4.5 h-4.5 text-orange-400" />}
          bgColor="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Inquiries Table */}
        <div className="lg:col-span-2 glass-panel p-0 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h3 className="font-bold text-white">Recent Inquiries</h3>
            <button className="text-blue-300 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-200 text-sm border-b border-white/10">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Subject</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <InquiryRow name="Ahmed Reza" subject="Project Pricing" date="Today, 10:30 AM" status="New" />
                <InquiryRow name="Jannatul Ferdous" subject="Site Visit Request" date="Yesterday" status="In Progress" />
                <InquiryRow name="Kamrul Hasan" subject="Partnership Query" date="Jul 05, 2026" status="Resolved" />
                <InquiryRow name="Sabrina Monir" subject="Flat Availability" date="Jul 04, 2026" status="Resolved" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="glass-panel p-6">
          <h3 className="font-bold text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <QuickAction title="Add Blog Post" desc="Publish a new article" icon={<FileText className="w-5 h-5 text-indigo-300" />} color="bg-indigo-500/20" />
            <QuickAction title="Update Banner" desc="Change homepage hero" icon={<ImageIcon className="w-5 h-5 text-pink-300" />} color="bg-pink-500/20" />
            <QuickAction title="Manage Gallery" desc="Upload new images" icon={<Folder className="w-5 h-5 text-teal-300" />} color="bg-teal-500/20" />
            <QuickAction title="Site Settings" desc="Update SEO & meta" icon={<Settings className="w-5 h-5 text-gray-200" />} color="bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents for the dashboard
function StatCard({ title, value, change, isPositive, icon, bgColor }: any) {
  return (
    <div className="glass-panel p-4 flex flex-col justify-between h-28">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-300 text-[12px] font-medium tracking-wide">{title}</p>
          <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
        </div>
        <div className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className={`text-[11px] font-bold flex items-center ${isPositive ? 'text-green-500' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1 rotate-180" />}
          {change}
        </span>
        <span className="text-[11px] text-gray-400">vs last month</span>
      </div>
    </div>
  );
}

function InquiryRow({ name, subject, date, status }: any) {
  const statusStyles: any = {
    "New": "bg-red-100 text-red-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Resolved": "bg-green-100 text-green-700"
  };

  return (
    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
      <td className="p-4 font-medium text-white">{name}</td>
      <td className="p-4 text-gray-200">{subject}</td>
      <td className="p-4 text-gray-300 text-xs">
        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{date}</span>
      </td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${statusStyles[status]}`}>
          {status}
        </span>
      </td>
      <td className="p-4 text-right">
        <button className="text-gray-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

import { FileText, Image as ImageIcon, Folder, Settings } from "lucide-react";

function QuickAction({ title, desc, icon, color }: any) {
  return (
    <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-300 mt-0.5">{desc}</p>
      </div>
    </button>
  );
}
