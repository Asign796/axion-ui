import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface KPIStripProps {
  device: any;
}

export function KPIStrip({ device }: KPIStripProps) {
  if (!device) return null;

  const getStatusDisplay = (status: string, score: number) => {
    if (status === 'critical') {
      return (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <div>
            <div className="text-red-500 font-bold uppercase tracking-wider text-xs">Critical</div>
            <div className="text-slate-300 text-[10px]">Health Score: {score}%</div>
          </div>
        </div>
      );
    }
    if (status === 'warning') {
      return (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl">
          <Shield className="w-5 h-5 text-amber-500" />
          <div>
            <div className="text-amber-500 font-bold uppercase tracking-wider text-xs">Warning</div>
            <div className="text-slate-300 text-[10px]">Health Score: {score}%</div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl">
        <ShieldCheck className="w-5 h-5 text-green-500" />
        <div>
          <div className="text-green-500 font-bold uppercase tracking-wider text-xs">Healthy</div>
          <div className="text-slate-300 text-[10px]">Health Score: {score}%</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium tracking-wide">Selected Device:</span>
          <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-white font-bold tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            {device.device_id}
          </span>
        </div>
        
        {getStatusDisplay(device.status, device.health_score)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl animate-fade-up">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Temperature</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tracking-tight">
              {device.temperature ? device.temperature.toFixed(1) : '--'}
            </span>
            <span className="text-lg text-slate-500 font-medium">°C</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl animate-fade-up delay-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vibration</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tracking-tight">
              {device.vibration ? device.vibration.toFixed(1) : '--'}
            </span>
            <span className="text-lg text-slate-500 font-medium">mm/s</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl animate-fade-up delay-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tracking-tight">
              {device.current ? device.current.toFixed(1) : '--'}
            </span>
            <span className="text-lg text-slate-500 font-medium">A</span>
          </div>
        </div>
      </div>
      
      {/* Device Information Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-500">Device Type</span>
          <span className="text-xs font-medium text-slate-300">{device.device_type}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-500">Region</span>
          <span className="text-xs font-medium text-slate-300">{device.refinery_region}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-500">First Seen</span>
          <span className="text-xs font-medium text-slate-300">
            {device.first_seen ? new Date(device.first_seen).toLocaleDateString() : 'N/A'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-500">Total Records</span>
          <span className="text-xs font-medium text-slate-300">
            {device.total_records ? device.total_records.toLocaleString() : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
