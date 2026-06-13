import { LayoutDashboard, Server, AlertTriangle, LineChart, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'fleet', icon: LayoutDashboard, label: 'Fleet Summary' },
    { id: 'dashboard', icon: Server, label: 'Device Diagnostics' },
    { id: 'hierarchy', icon: Server, label: 'Asset Hierarchy' },
    { id: 'alarms', icon: AlertTriangle, label: 'Alarms & Events' },
    { id: 'trends', icon: LineChart, label: 'Historical Trends' },
    { id: 'settings', icon: Settings, label: 'System Settings' },
  ];

  return (
    <div className="w-16 lg:w-64 bg-[#0a0a0a] border-r border-[#262626] flex flex-col h-screen fixed left-0 top-0">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#262626]">
        <img src="/logo.png" alt="AXION Systems" className="h-10 object-contain hidden lg:block" />
        <img src="/logo.png" alt="AXION Systems" className="h-8 object-contain lg:hidden" style={{ objectPosition: 'left', width: '32px', overflow: 'hidden' }} />
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 lg:px-6 py-3 transition-colors ${
                isActive 
                  ? 'bg-[#171717] border-r-2 border-blue-500' 
                  : 'hover:bg-[#171717]/50 border-r-2 border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : ''}`} />
              <span className={`hidden lg:block font-medium text-sm ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
