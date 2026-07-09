import Link from 'next/link';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Image as ImageIcon, 
  MessageSquare,
  Home,
  PanelLeftClose,
  Plus
} from 'lucide-react';

export function AdminSidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Homepage Content', icon: Home, href: '/admin/content/homepage' },
    { name: 'Gallery', icon: ImageIcon, href: '/admin/gallery' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Inquiries', icon: MessageSquare, href: '/admin/inquiries' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="fixed left-4 top-4 bottom-4 w-60 glass-panel hidden md:flex flex-col z-50 shadow-2xl overflow-hidden">
      
      {/* Header section */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-[#120a1c] text-xs">Bonedi</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Bonedi Admin</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>
        <button className="p-1.5 text-gray-400 hover:text-white rounded border border-white/10 hover:bg-white/5 transition-colors">
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Dashed Separator */}
      <div className="px-5">
        <div className="border-b border-dashed border-yellow-600/30 w-full"></div>
      </div>
      
      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            // Example of an active state styling on the first item
            const isActive = index === 0; 
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-gradient-to-r from-white/10 to-transparent border border-white/5 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
