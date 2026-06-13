import React from 'react';
import { Activity } from 'lucide-react';

interface TopBarProps {
  onlineAssets: number;
  lastUpdate: string;
}

export function TopBar({ onlineAssets, lastUpdate }: TopBarProps) {
  return (
    <header className="glass-card flex items-center justify-between px-6 py-4 mb-6 rounded-2xl animate-fade-up">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 glow-blue">
          <Activity className="text-blue-500 w-5 h-5 pulse-glow" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">AXION</h1>
          <p className="text-sm text-slate-400">Continuous Condition Monitoring</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 justify-end mb-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-200">{onlineAssets} Assets Online</span>
        </div>
        <p className="text-xs text-slate-500 font-mono">Last Update: {lastUpdate}</p>
      </div>
    </header>
  );
}
