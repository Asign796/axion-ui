import { LineChart, Search } from 'lucide-react';

export function HistoricalTrends() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 border-b border-[#262626] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Historical Trends</h2>
          <p className="text-sm text-slate-400">Deep dive into long-term metric analysis.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="date" 
            className="bg-[#0a0a0a] border border-[#404040] text-slate-300 px-3 py-1.5 rounded text-sm focus:outline-none focus:border-theme-base" 
          />
          <span className="text-slate-500 flex items-center px-2">to</span>
          <input 
            type="date" 
            className="bg-[#0a0a0a] border border-[#404040] text-slate-300 px-3 py-1.5 rounded text-sm focus:outline-none focus:border-theme-base" 
          />
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Plot Browser */}
        <div className="w-64 bg-[#171717] border border-[#262626] rounded-md flex flex-col">
          <div className="p-3 border-b border-[#404040]">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search tags..." 
                className="w-full bg-[#0a0a0a] border border-[#404040] rounded pl-8 pr-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-theme-base"
              />
            </div>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase">Selected Tags</div>
            <div className="flex items-center gap-2 p-1.5 bg-[#262626] rounded text-sm text-white">
              <div className="w-3 h-3 bg-theme-base rounded-sm"></div>
              COMPRESSOR_E01.Temp
            </div>
            <div className="flex items-center gap-2 p-1.5 hover:bg-[#262626] rounded text-sm text-slate-400 cursor-pointer">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              COMPRESSOR_E01.Vib
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 bg-[#171717] border border-[#262626] rounded-md p-6 flex items-center justify-center relative">
          <div className="absolute inset-0 dot-grid opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-slate-500">
            <LineChart className="w-16 h-16 mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-slate-400">Advanced Trending (Placeholder)</h3>
            <p className="text-sm">Historical plot view will be wired to TimescaleDB in Phase 2.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
