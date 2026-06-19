import { LayoutDashboard, Server, AlertTriangle, LineChart, Settings, Sparkles } from 'lucide-react';

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

      {/* AI Chat Button */}
      <div className="p-3 lg:p-4 border-t border-[#262626]">
        <a
          href="https://chat.axionsystems.de"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 w-full px-3 lg:px-4 py-3 rounded-lg transition-all duration-300
                     bg-gradient-to-r from-blue-600/20 to-purple-600/20 
                     border border-blue-500/30 
                     hover:from-blue-600/30 hover:to-purple-600/30 
                     hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10
                     hover:scale-[1.02] active:scale-[0.98]"
          style={{ animation: 'pulseGlow 3s ease-in-out infinite' }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-semibold text-white">AI Assistant</span>
            <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">Ask anything</span>
          </div>
        </a>
      </div>
    </div>
  );
}
