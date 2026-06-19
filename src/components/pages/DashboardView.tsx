import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AssetList } from '../AssetList';
import { KPIStrip } from '../KPIStrip';
import { LiveTrend } from '../LiveTrend';
import { Throughput } from '../Throughput';
import { AlertsPanel } from '../AlertsPanel';
import { DigitalTwin } from '../DigitalTwin';
import { ThermalCamera } from '../ThermalCamera';

const API_BASE = 'https://api.axionsystems.de';

interface DashboardViewProps {
  devices: any[];
  throughput: any[];
  topAnomalous: any[];
  isLoggedIn: boolean;
  refreshInterval: number | null;
  timezone: string;
}

export function DashboardView({ devices, throughput, topAnomalous, isLoggedIn, refreshInterval, timezone }: DashboardViewProps) {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTimeRange = parseInt(searchParams.get('hours') || '1');
  const initialVisualizer = (searchParams.get('view') as '3D' | 'CCTV') || '3D';
  const initialMetric = (searchParams.get('metric') as 'temperature' | 'vibration' | 'current') || 'temperature';

  const [latestData, setLatestData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<number>(initialTimeRange);
  const [activeVisualizer, setActiveVisualizer] = useState<'3D' | 'CCTV'>(initialVisualizer);
  const [metric, setMetric] = useState<'temperature' | 'vibration' | 'current'>(initialMetric);

  const updateUrlParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams, { replace: true });
  };

  const handleTimeRangeChange = (newHours: number) => {
    setTimeRange(newHours);
    updateUrlParam('hours', newHours.toString());
  };

  const handleVisualizerChange = (newView: '3D' | 'CCTV') => {
    setActiveVisualizer(newView);
    updateUrlParam('view', newView);
  };

  const handleMetricChange = (newMetric: 'temperature' | 'vibration' | 'current') => {
    setMetric(newMetric);
    updateUrlParam('metric', newMetric);
  };

  useEffect(() => {
    // Ensure default parameters are always present in the URL for sharing
    const currentHours = searchParams.get('hours');
    const currentView = searchParams.get('view');
    const currentMetric = searchParams.get('metric');
    
    if (!currentHours || !currentView || !currentMetric) {
      const newParams = new URLSearchParams(searchParams);
      if (!currentHours) newParams.set('hours', initialTimeRange.toString());
      if (!currentView) newParams.set('view', initialVisualizer);
      if (!currentMetric) newParams.set('metric', initialMetric);
      setSearchParams(newParams, { replace: true });
    }
  }, [deviceId, searchParams, initialTimeRange, initialVisualizer, initialMetric, setSearchParams]);

  const fetchSelectedDeviceData = async (id: string) => {
    if (!isLoggedIn) return;
    try {
      const [latestRes, trendRes] = await Promise.all([
        fetch(`${API_BASE}/devices/${id}/latest`),
        fetch(`${API_BASE}/devices/${id}/trends?hours=${timeRange}`)
      ]);
      setLatestData(await latestRes.json());
      setTrendData(await trendRes.json());
    } catch (err) {
      console.error(`Failed to fetch data for ${id}`, err);
    }
  };

  useEffect(() => {
    if (deviceId && isLoggedIn) {
      fetchSelectedDeviceData(deviceId);
      if (refreshInterval !== null) {
        const intervalId = setInterval(() => fetchSelectedDeviceData(deviceId), refreshInterval);
        return () => clearInterval(intervalId);
      }
    }
  }, [deviceId, timeRange, isLoggedIn, refreshInterval]);

  // Auto-redirect if no deviceId but devices are loaded
  useEffect(() => {
    if (!deviceId && devices.length > 0) {
      const first = devices[0];
      navigate(`/device/${first.refinery_region}/${first.device_id}`, { replace: true });
    }
  }, [deviceId, devices, navigate]);

  const handleSelectDevice = (id: string) => {
    const dev = devices.find((d: any) => d.device_id === id);
    if (dev) navigate(`/device/${dev.refinery_region}/${id}`);
  };

  if (!deviceId || !latestData) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        <div className="animate-pulse">Loading device telemetry...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 custom-scrollbar relative">
      <div className="max-w-[1600px] mx-auto bg-[#09090b] pt-6">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4">
          <div className="flex flex-col gap-4 h-full">
            <AssetList 
              devices={devices} 
              selectedDeviceId={deviceId}
              onSelectDevice={handleSelectDevice}
            />
          </div>
          <div id="main-dashboard-content" className="flex flex-col gap-4 bg-[#09090b] rounded-md p-1">
            <KPIStrip device={latestData} />
            
            {/* Top Row: Visualizer (Tabbed) and Live Trend */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="h-[400px] flex flex-col relative rounded-md overflow-hidden bg-black border border-[#262626]">
                
                {/* Visualizer Tabs */}
                <div className="absolute top-4 right-4 z-30 flex gap-1 bg-black/80 p-1 rounded-md backdrop-blur-md border border-[#404040]">
                  <button 
                    onClick={() => handleVisualizerChange('3D')}
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors ${activeVisualizer === '3D' ? 'bg-theme-base text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    3D Model
                  </button>
                  <button 
                    onClick={() => handleVisualizerChange('CCTV')}
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors ${activeVisualizer === 'CCTV' ? 'bg-red-600 text-white animate-pulse' : 'text-slate-400 hover:text-white'}`}
                  >
                    Thermal CCTV
                  </button>
                </div>

                {activeVisualizer === '3D' ? (
                  <DigitalTwin deviceId={deviceId} deviceType={latestData.device_type} temperature={latestData.temperature} status={latestData.status} />
                ) : (
                  <ThermalCamera deviceId={deviceId} deviceType={latestData.device_type} temperature={latestData.temperature} status={latestData.status} />
                )}
              </div>
              <div className="h-[400px] flex flex-col">
                <LiveTrend 
                  data={trendData} 
                  timeRange={timeRange} 
                  onTimeRangeChange={handleTimeRangeChange} 
                  metric={metric}
                  onMetricChange={handleMetricChange}
                  timezone={timezone}
                />
              </div>
            </div>

            {/* Bottom Row: Alerts and Throughput */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
              <AlertsPanel 
                devices={topAnomalous} 
                onSelectDevice={handleSelectDevice} 
              />
              <Throughput data={throughput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
