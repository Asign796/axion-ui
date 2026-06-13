import { Bell } from 'lucide-react';

export function AlertsPanel() {
  return (
    <div className="glass-card p-4 rounded-2xl animate-fade-up delay-700 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Bell className="text-blue-500 w-5 h-5" />
        <h3 className="text-lg font-bold text-white tracking-tight">Recent Events</h3>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-700 rounded-xl bg-slate-800/20">
        <Bell className="w-8 h-8 text-slate-600 mb-2 opacity-50" />
        <p className="text-sm text-slate-400 font-medium">Alert Service Offline</p>
        <p className="text-xs text-slate-500 mt-1">
          Space reserved for future Alert microservice integration.
        </p>
      </div>
    </div>
  );
}
