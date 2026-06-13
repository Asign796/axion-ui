import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface LiveTrendProps {
  data: any[];
  timeRange: number;
  onTimeRangeChange: (hours: number) => void;
}

export function LiveTrend({ data, timeRange, onTimeRangeChange }: LiveTrendProps) {
  const [metric, setMetric] = useState<'temperature' | 'vibration'>('temperature');

  const formatTime = (timeStr: any) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const chartColor = metric === 'temperature' ? '#EF4444' : '#F59E0B';

  return (
    <div className="glass-card p-6 rounded-2xl animate-fade-up delay-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Live Trend</h3>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
            <button
              onClick={() => setMetric('temperature')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                metric === 'temperature' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setMetric('vibration')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                metric === 'vibration' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Vibration
            </button>
          </div>

          <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
            {[
              { label: '1H', value: 1 },
              { label: '24H', value: 24 },
              { label: '7D', value: 168 }
            ].map(range => (
              <button
                key={range.value}
                onClick={() => onTimeRangeChange(range.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  timeRange === range.value ? 'bg-blue-600 text-white shadow-sm glow-blue' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatTime} 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
              labelFormatter={formatTime}
            />
            <Area 
              type="monotone" 
              dataKey={metric} 
              stroke={chartColor} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMetric)" 
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
