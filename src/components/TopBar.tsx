import { Activity, Database, Server, Wifi } from 'lucide-react';

interface TopBarProps {
  onlineAssets: number;
  lastUpdate: string;
}

export function TopBar({ onlineAssets, lastUpdate }: TopBarProps) {
  return (
    <header className="glass-card px-6 py-4 mb-6 rounded-2xl animate-fade-up flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 glow-blue">
          <Activity className="text-blue-500 w-5 h-5 pulse-glow" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">AXION</h1>
          <p className="text-sm text-slate-400">Continuous Condition Monitoring</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 text-xs font-medium px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <span className="text-slate-400">System Health:</span>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-green-400" />
            <span className="text-slate-300">API</span>
          </div>
          <div className="flex items-center gap-1">
            <Database className="w-3 h-3 text-green-400" />
            <span className="text-slate-300">DB</span>
          </div>
          <div className="flex items-center gap-1">
            <Server className="w-3 h-3 text-green-400" />
            <span className="text-slate-300">Sim</span>
          </div>
        </div>

        <div className="text-right flex flex-col items-end">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-2 bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Live Stream</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-200">{onlineAssets} Assets Online</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-mono">Last Update: {lastUpdate}</p>
        </div>
      </div>
    </header>
  );
}
