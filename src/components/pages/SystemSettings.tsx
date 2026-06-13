import { Database, User, Shield, Bell } from 'lucide-react';

export function SystemSettings() {
  const sections = [
    { id: 'db', title: 'Database Configuration', icon: Database, desc: 'Manage TimescaleDB connection pools and retention policies.' },
    { id: 'users', title: 'User Management', icon: User, desc: 'Role-based access control and API token generation.' },
    { id: 'security', title: 'Security & Auth', icon: Shield, desc: 'SSO integrations and audit logging.' },
    { id: 'alarms', title: 'Alarm Rules', icon: Bell, desc: 'Configure threshold bands and notification routing.' },
  ];

  return (
    <div className="p-6 h-full flex flex-col overflow-auto custom-scrollbar">
      <div className="mb-6 border-b border-[#262626] pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-sm text-slate-400">Configure global platform behavior and integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-[#171717] border border-[#262626] rounded-md p-6 hover:border-[#404040] transition-colors cursor-pointer group">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded bg-[#0a0a0a] border border-[#404040] flex items-center justify-center group-hover:border-blue-500 transition-colors">
                <section.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white">{section.title}</h3>
            </div>
            <p className="text-sm text-slate-400 pl-14">{section.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
