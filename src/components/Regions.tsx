import { useMemo } from 'react';
import { MapPin } from 'lucide-react';

interface RegionsProps {
  devices: any[];
}

export function Regions({ devices }: RegionsProps) {
  const regions = useMemo(() => {
    const counts: Record<string, number> = {};
    devices.forEach(d => {
      counts[d.refinery_region] = (counts[d.refinery_region] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [devices]);

  return (
    <div className="glass-card p-6 rounded-2xl animate-fade-up delay-500 mt-6">
      <h3 className="text-lg font-bold text-white tracking-tight mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-400" /> Regions
      </h3>
      
      <div className="space-y-3">
        {regions.map(([region, count]) => (
          <div key={region} className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <span className="text-sm font-medium text-slate-200">{region}</span>
            <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
              {count} {count === 1 ? 'device' : 'devices'}
            </span>
          </div>
        ))}
        {regions.length === 0 && (
          <div className="text-center py-4 text-slate-500 text-sm">
            No regions found
          </div>
        )}
      </div>
    </div>
  );
}
