import { useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Search } from 'lucide-react';

interface AssetListProps {
  devices: any[];
  selectedDeviceId: string | null;
  onSelectDevice: (deviceId: string) => void;
}

export function AssetList({ devices, selectedDeviceId, onSelectDevice }: AssetListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredDevices = useMemo(() => {
    return devices.filter(d => {
      const matchesSearch = d.device_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            d.refinery_region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'ALL' || d.device_type === filterType;
      return matchesSearch && matchesType;
    });
  }, [devices, searchTerm, filterType]);

  const getStatusColor = (status: string, isOnline: boolean) => {
    if (!isOnline) return 'bg-slate-500';
    if (status === 'critical') return 'bg-red-500';
    if (status === 'warning') return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getStatusGlow = (status: string, isOnline: boolean) => {
    if (!isOnline) return '';
    if (status === 'critical') return 'bg-red-400';
    if (status === 'warning') return 'bg-amber-400';
    return 'bg-green-400';
  };

  return (
    <div className="glass-card p-4 rounded-md animate-fade-up delay-300 flex flex-col h-[600px]">
      <h3 className="text-xl font-bold text-white tracking-tight mb-3 px-2">Assets</h3>
      
      {/* Search Bar */}
      <div className="relative mb-3 px-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-500" />
        </div>
        <input
          type="text"
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-sm pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-theme-base/50 focus:ring-1 focus:ring-theme-base/50 transition-all"
          placeholder="Search devices or regions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-4 px-2 overflow-x-auto custom-scrollbar pb-1">
        {['ALL', 'MOTOR', 'PUMP', 'COMPRESSOR'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === type 
                ? 'bg-fuchsia-600 text-white shadow-sm glow-primary' 
                : 'bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {type === 'ALL' ? 'All' : type + 'S'}
          </button>
        ))}
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto px-2 custom-scrollbar">
        {filteredDevices.map((device) => {
          const isSelected = device.device_id === selectedDeviceId;
          const lastSeenStr = device.last_seen.endsWith('Z') ? device.last_seen : `${device.last_seen}Z`;
          const lastSeenDate = new Date(lastSeenStr);
          const timeDiffSeconds = (new Date().getTime() - lastSeenDate.getTime()) / 1000;
          const isOnline = timeDiffSeconds < 120;
          
          let lastSeenText = '';
          if (isOnline) {
             lastSeenText = `Online - ${timeDiffSeconds < 60 ? Math.floor(timeDiffSeconds) + ' sec' : Math.floor(timeDiffSeconds/60) + ' min'} ago`;
          } else {
             lastSeenText = `Offline - ${formatDistanceToNow(lastSeenDate, { addSuffix: true })}`;
          }

          const statusColor = getStatusColor(device.status, isOnline);
          const statusGlow = getStatusGlow(device.status, isOnline);

          return (
            <button
              key={device.device_id}
              onClick={() => onSelectDevice(device.device_id)}
              className={`w-full text-left p-3 rounded-sm border transition-all duration-300 flex items-start gap-3 ${
                isSelected 
                  ? 'bg-theme-deep/40 border-theme-base/50 shadow-[0_0_15px_rgba(var(--theme-rgb-base),0.15)]' 
                  : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50'
              }`}
            >
              <div className="mt-1">
                <span className="relative flex h-3 w-3">
                  {isOnline && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusGlow}`}></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${statusColor}`}></span>
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {device.device_id}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 truncate">{device.refinery_region}</p>
                <p className={`text-[10px] mt-1.5 font-medium ${isOnline ? 'text-theme-light' : 'text-slate-500'}`}>
                  {lastSeenText}
                </p>
              </div>
            </button>
          );
        })}
        {filteredDevices.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No devices match your search
          </div>
        )}
      </div>
    </div>
  );
}
