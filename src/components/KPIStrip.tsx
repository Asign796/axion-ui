import React from 'react';

interface KPIStripProps {
  device: any;
}

export function KPIStrip({ device }: KPIStripProps) {
  if (!device) return null;

  return (
    <div className="mb-6 animate-fade-up delay-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-200">
          Selected Device: <span className="text-white bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 ml-2">{device.device_id}</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Temperature */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-red-500/10"></div>
          <p className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Temperature</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white tracking-tighter">{device.temperature?.toFixed(1) || '0.0'}</span>
            <span className="text-xl text-slate-500 font-medium">°C</span>
          </div>
        </div>

        {/* Vibration */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-amber-500/10"></div>
          <p className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Vibration</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white tracking-tighter">{device.vibration?.toFixed(1) || '0.0'}</span>
            <span className="text-xl text-slate-500 font-medium">mm/s</span>
          </div>
        </div>

        {/* Current */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-blue-500/10"></div>
          <p className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Current</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white tracking-tighter">{device.current?.toFixed(1) || '0.0'}</span>
            <span className="text-xl text-slate-500 font-medium">A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
