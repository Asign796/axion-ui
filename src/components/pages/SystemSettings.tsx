import { RefreshCw, Database, User, Shield, Bell, Palette } from 'lucide-react';

interface SystemSettingsProps {
  refreshInterval: number | null;
  onRefreshIntervalChange: (val: number | null) => void;
  theme?: string;
  onThemeChange?: (theme: string) => void;
}

export function SystemSettings({ refreshInterval, onRefreshIntervalChange, theme, onThemeChange }: SystemSettingsProps) {
  const sections = [
    { id: 'db', title: 'Database Configuration', icon: Database, desc: 'Manage TimescaleDB connection pools and retention policies.' },
    { id: 'users', title: 'User Management', icon: User, desc: 'Role-based access control and API token generation.' },
    { id: 'security', title: 'Security & Auth', icon: Shield, desc: 'SSO integrations and audit logging.' },
    { id: 'alarms', title: 'Alarm Rules', icon: Bell, desc: 'Configure threshold bands and notification routing.' },
  ];

  const themes = [
    { id: 'blue', name: 'Blue Premium', gradStart: 'from-blue-600', gradEnd: 'to-purple-600' },
    { id: 'purple', name: 'Deep Purple', gradStart: 'from-fuchsia-600', gradEnd: 'to-purple-600' },
    { id: 'emerald', name: 'Emerald Premium', gradStart: 'from-emerald-600', gradEnd: 'to-teal-600' },
    { id: 'amber', name: 'Amber Industrial', gradStart: 'from-amber-600', gradEnd: 'to-orange-600' },
    { id: 'rose', name: 'Rose Premium', gradStart: 'from-rose-600', gradEnd: 'to-pink-600' }
  ];

  return (
    <div className="p-6 h-full flex flex-col overflow-auto custom-scrollbar">
      <div className="mb-6 border-b border-[#262626] pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-sm text-slate-400">Configure global platform behavior and integrations.</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Core Preferences</h3>
        <div className="bg-[#171717] border border-[#262626] rounded-md p-6 max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#0a0a0a] border border-[#404040] flex items-center justify-center shrink-0">
              <RefreshCw className={`w-5 h-5 ${refreshInterval ? 'text-theme-base animate-spin-slow' : 'text-slate-500'}`} style={{ animationDuration: '3s' }} />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-white mb-1">Auto-Refresh Interval</h4>
              <p className="text-sm text-slate-400 mb-4">
                Controls how often the dashboard fetches live telemetry and summary data from the backend API.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { label: '1 Second', value: 1000 },
                  { label: '5 Seconds', value: 5000 },
                  { label: '10 Seconds', value: 10000 },
                  { label: 'Paused', value: null },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => onRefreshIntervalChange(opt.value)}
                    className={`px-4 py-2 rounded text-sm font-bold transition-colors border ${
                      refreshInterval === opt.value
                        ? 'bg-theme-base/20 text-theme-light border-theme-base/50'
                        : 'bg-[#0a0a0a] text-slate-400 border-[#404040] hover:text-white hover:border-slate-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {theme && onThemeChange && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Appearance</h3>
          <div className="bg-[#171717] border border-[#262626] rounded-md p-6 max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-[#0a0a0a] border border-[#404040] flex items-center justify-center shrink-0">
                <Palette className="w-5 h-5 text-theme-base" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1">UI Theme</h4>
                <p className="text-sm text-slate-400 mb-6">
                  Customize the global color palette, glowing accents, and data visualizations across the entire platform.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onThemeChange(t.id)}
                      className={`relative p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                        theme === t.id 
                          ? 'bg-[#1a1a1a] border-theme-base shadow-[0_0_20px_rgba(var(--theme-rgb-base),0.15)] scale-105' 
                          : 'bg-[#0a0a0a] border-[#404040] hover:border-slate-500 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className={`w-full h-8 rounded-full bg-gradient-to-r ${t.gradStart} ${t.gradEnd} shadow-inner`}></div>
                      <span className={`text-sm font-bold ${theme === t.id ? 'text-white' : 'text-slate-400'}`}>{t.name}</span>
                      {theme === t.id && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-theme-base rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-4">Integrations (Coming Soon)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {sections.map((section) => (
            <div key={section.id} className="bg-[#171717] border border-[#262626] rounded-md p-6 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded bg-[#0a0a0a] border border-[#404040] flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-white">{section.title}</h3>
              </div>
              <p className="text-sm text-slate-400 pl-14">{section.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
