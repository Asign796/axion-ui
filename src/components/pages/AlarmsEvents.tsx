import { AlertTriangle, Bell, Info } from 'lucide-react';

export function AlarmsEvents() {
  const alarms = [
    { id: 'ALM-001', time: '10:45:22', level: 'CRITICAL', device: 'COMPRESSOR_E01', message: 'Temperature exceeded 100°C' },
    { id: 'ALM-002', time: '10:42:15', level: 'WARNING', device: 'PUMP_N02', message: 'Vibration deviation detected' },
    { id: 'EVT-001', time: '09:30:00', level: 'INFO', device: 'MOTOR_S01', message: 'System maintenance scheduled' },
    { id: 'ALM-003', time: '08:15:44', level: 'CRITICAL', device: 'COMPRESSOR_E01', message: 'Vibration exceeded 10mm/s' },
  ];

  const getLevelColor = (level: string) => {
    if (level === 'CRITICAL') return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (level === 'WARNING') return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
  };

  const getLevelIcon = (level: string) => {
    if (level === 'CRITICAL') return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (level === 'WARNING') return <Bell className="w-4 h-4 text-amber-500" />;
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 border-b border-[#262626] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Alarms & Events</h2>
          <p className="text-sm text-slate-400">Historical log of system alerts and state changes.</p>
        </div>
        <button className="bg-[#171717] hover:bg-[#262626] border border-[#404040] text-slate-300 px-4 py-2 rounded text-sm font-medium transition-colors">
          Acknowledge All
        </button>
      </div>

      <div className="flex-1 bg-[#171717] border border-[#262626] rounded-md overflow-hidden flex flex-col">
        <div className="grid grid-cols-[100px_100px_120px_150px_1fr] gap-4 bg-[#0a0a0a] border-b border-[#404040] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div>ID</div>
          <div>Time</div>
          <div>Level</div>
          <div>Device</div>
          <div>Message</div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {alarms.map((alarm, idx) => (
            <div key={idx} className="grid grid-cols-[100px_100px_120px_150px_1fr] gap-4 p-4 border-b border-[#262626] hover:bg-[#262626]/50 transition-colors text-sm items-center">
              <div className="text-slate-500 font-mono">{alarm.id}</div>
              <div className="text-slate-300">{alarm.time}</div>
              <div>
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold border ${getLevelColor(alarm.level)}`}>
                  {getLevelIcon(alarm.level)}
                  {alarm.level}
                </span>
              </div>
              <div className="text-white font-medium">{alarm.device}</div>
              <div className="text-slate-400">{alarm.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
