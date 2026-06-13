import { Server, ChevronRight, Folder } from 'lucide-react';

export function AssetHierarchy() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 border-b border-[#262626] pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Asset Hierarchy</h2>
        <p className="text-sm text-slate-400">Manage your plant, area, and equipment structure.</p>
      </div>
      
      <div className="flex-1 bg-[#171717] border border-[#262626] rounded-md p-6 overflow-auto">
        <div className="flex items-center gap-2 text-slate-300 font-medium mb-4 p-2 bg-[#0a0a0a] rounded border border-[#404040]">
          <Server className="w-5 h-5 text-blue-500" />
          <span>Enterprise: Axion Global</span>
        </div>
        
        <div className="pl-6 border-l border-[#404040] ml-3 space-y-4">
          {/* Site 1 */}
          <div>
            <div className="flex items-center gap-2 text-slate-300 mb-2 hover:bg-[#262626] p-1.5 rounded cursor-pointer w-fit pr-4 transition-colors">
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <Folder className="w-4 h-4 text-amber-500" />
              <span>EAST_REFINERY (Site)</span>
            </div>
            <div className="pl-6 border-l border-[#404040] ml-2 space-y-2">
              <div className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors text-sm">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                COMPRESSOR_E01
              </div>
              <div className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                PUMP_E01
              </div>
            </div>
          </div>

          {/* Site 2 */}
          <div>
            <div className="flex items-center gap-2 text-slate-300 mb-2 hover:bg-[#262626] p-1.5 rounded cursor-pointer w-fit pr-4 transition-colors">
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <Folder className="w-4 h-4 text-amber-500" />
              <span>NORTH_PLANT (Site)</span>
            </div>
            <div className="pl-6 border-l border-[#404040] ml-2 space-y-2">
              <div className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                MOTOR_N01
              </div>
              <div className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors text-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                PUMP_N02
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
