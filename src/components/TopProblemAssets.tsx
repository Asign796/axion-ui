import { AlertTriangle, TrendingUp, Thermometer } from 'lucide-react';

interface TopProblemAssetsProps {
  devices: any[];
  onSelectDevice: (deviceId: string) => void;
}

export function TopProblemAssets({ devices, onSelectDevice }: TopProblemAssetsProps) {
  if (!devices || devices.length === 0) {
    return (
      <div className="glass-card p-6 rounded-md animate-fade-up h-full flex flex-col">
        <h3 className="text-xl font-bold text-white tracking-tight mb-4">Top Problem Assets</h3>
        <div className="flex-1 flex items-center justify-center text-slate-500">
          No anomalous assets detected
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-md animate-fade-up h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-amber-500 w-5 h-5" />
        <h3 className="text-xl font-bold text-white tracking-tight">Top Problem Assets</h3>
      </div>
      
      <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
        {devices.map((device, idx) => {
          // Determine main anomaly reason for display
          let reason = '';
          let Icon = AlertTriangle;
          let colorClass = 'text-red-500';
          
          if (device.temperature > 100) {
            reason = `High Temp: ${device.temperature.toFixed(1)}°C`;
            Icon = Thermometer;
          } else if (device.vibration > 10) {
            reason = `High Vibration: ${device.vibration.toFixed(1)} mm/s`;
            Icon = TrendingUp;
            colorClass = 'text-amber-500';
          } else {
             reason = `Warning State`;
             colorClass = 'text-yellow-500';
          }

          return (
            <button
              key={device.device_id}
              onClick={() => onSelectDevice(device.device_id)}
              className="w-full text-left bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-500/50 p-3 rounded-sm transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{device.device_id}</h4>
                  <p className="text-xs text-slate-400">{device.refinery_region}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <span className={`text-xs font-bold ${colorClass}`}>{reason}</span>
                  <span className="text-[10px] text-slate-500">Health: {device.health_score}%</span>
                </div>
                <Icon className={`w-4 h-4 ${colorClass} opacity-80`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
