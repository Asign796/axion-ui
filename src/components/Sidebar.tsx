import { LayoutDashboard, Server, AlertTriangle, LineChart, Settings } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Server, label: 'Asset Hierarchy', active: false },
    { icon: AlertTriangle, label: 'Alarms & Events', active: false },
    { icon: LineChart, label: 'Historical Trends', active: false },
    { icon: Settings, label: 'System Settings', active: false },
  ];

  return (
    <div className="w-16 lg:w-64 bg-[#0a0a0a] border-r border-[#262626] flex flex-col h-screen fixed left-0 top-0">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#262626]">
        <img src="/logo.png" alt="AXION Systems" className="h-10 object-contain hidden lg:block" />
        <img src="/logo.png" alt="AXION Systems" className="h-8 object-contain lg:hidden" style={{ objectPosition: 'left', width: '32px', overflow: 'hidden' }} />
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-4 px-4 lg:px-6 py-3 transition-colors ${
              item.active 
                ? 'bg-[#171717] border-r-2 border-blue-500' 
                : 'hover:bg-[#171717]/50 border-r-2 border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-500' : ''}`} />
            <span className={`hidden lg:block font-medium text-sm ${item.active ? 'text-white' : ''}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
