import { Server, ChevronRight, ChevronDown, Folder } from 'lucide-react';
import { useState } from 'react';

interface AssetHierarchyProps {
  devices: any[];
  onSelectDevice: (id: string) => void;
}

export function AssetHierarchy({ devices, onSelectDevice }: AssetHierarchyProps) {
  // Group devices by region
  const grouped = devices.reduce((acc, device) => {
    if (!acc[device.refinery_region]) {
      acc[device.refinery_region] = [];
    }
    acc[device.refinery_region].push(device);
    return acc;
  }, {} as Record<string, any[]>);

  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => ({ ...prev, [region]: !prev[region] }));
  };

  const getStatusColor = (status: string, lastSeen: string) => {
    if (!lastSeen) return 'bg-slate-500';
    const lastSeenStr = lastSeen.endsWith('Z') ? lastSeen : `${lastSeen}Z`;
    const lastSeenDate = new Date(lastSeenStr);
    const timeDiffSeconds = (new Date().getTime() - lastSeenDate.getTime()) / 1000;
    
    if (timeDiffSeconds >= 120) return 'bg-slate-500'; // offline

    if (status === 'critical') return 'bg-red-500';
    if (status === 'warning') return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 border-b border-[#262626] pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Asset Hierarchy</h2>
        <p className="text-sm text-slate-400">Manage your plant, area, and equipment structure.</p>
      </div>
      
      <div className="flex-1 bg-[#171717] border border-[#262626] rounded-md p-6 overflow-auto custom-scrollbar">
        <div className="flex items-center gap-2 text-slate-300 font-medium mb-4 p-2 bg-[#0a0a0a] rounded border border-[#404040] w-fit pr-6">
          <Server className="w-5 h-5 text-blue-500" />
          <span>Enterprise: Axion Global</span>
        </div>
        
        <div className="pl-6 border-l border-[#404040] ml-3 space-y-4">
          {Object.entries(grouped).map(([region, regionDevs]) => {
            const regionDevices = regionDevs as any[];
            const isExpanded = expandedRegions[region] !== false; // default expanded
            
            return (
              <div key={region}>
                <div 
                  onClick={() => toggleRegion(region)}
                  className="flex items-center gap-2 text-slate-300 mb-2 hover:bg-[#262626] p-1.5 rounded cursor-pointer w-fit pr-4 transition-colors select-none"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                  <Folder className="w-4 h-4 text-amber-500" />
                  <span>{region} (Site)</span>
                </div>
                
                {isExpanded && (
                  <div className="pl-6 border-l border-[#404040] ml-2 space-y-2">
                    {regionDevices.map((device: any) => (
                      <div 
                        key={device.device_id}
                        onClick={() => onSelectDevice(device.device_id)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors text-sm py-0.5"
                      >
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(device.status, device.last_seen)}`}></span>
                        {device.device_id}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {Object.keys(grouped).length === 0 && (
            <div className="text-slate-500 text-sm italic">No assets found...</div>
          )}
        </div>
      </div>
    </div>
  );
}
