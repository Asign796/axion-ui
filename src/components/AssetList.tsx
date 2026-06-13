import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface AssetListProps {
  devices: any[];
  selectedDeviceId: string | null;
  onSelectDevice: (deviceId: string) => void;
}

export function AssetList({ devices, selectedDeviceId, onSelectDevice }: AssetListProps) {
  return (
    <div className="glass-card p-6 rounded-2xl animate-fade-up delay-300">
      <h3 className="text-xl font-bold text-white tracking-tight mb-4">Assets</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {devices.map((device) => {
          const isSelected = device.device_id === selectedDeviceId;
          const lastSeenDate = new Date(device.last_seen);
          // Assuming UTC timestamps, we just format distance to now
          const lastSeenText = formatDistanceToNow(lastSeenDate, { addSuffix: true });
          
          // Simple logic: if seen in last 2 minutes, it's green, else red/amber
          const isOnline = (new Date().getTime() - lastSeenDate.getTime()) < 120000;

          return (
            <button
              key={device.device_id}
              onClick={() => onSelectDevice(device.device_id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                isSelected 
                  ? 'bg-blue-900/40 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                  : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50'
              }`}
            >
              <div className="mt-1">
                <span className="relative flex h-3 w-3">
                  {isOnline && isSelected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {device.device_id}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">{device.device_type}</span>
                </div>
                <p className="text-sm text-slate-400">{device.refinery_region}</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">Last seen {lastSeenText}</p>
              </div>
            </button>
          );
        })}
        {devices.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No assets found
          </div>
        )}
      </div>
    </div>
  );
}
