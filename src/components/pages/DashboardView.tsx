import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AssetList } from '../AssetList';
import { KPIStrip } from '../KPIStrip';
import { LiveTrend } from '../LiveTrend';
import { Throughput } from '../Throughput';
import { AlertsPanel } from '../AlertsPanel';

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

  const [latestData, setLatestData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<number>(1);

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
    <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_300px] gap-4">
          <div className="flex flex-col gap-4 h-full">
            <AssetList 
              devices={devices} 
              selectedDeviceId={deviceId}
              onSelectDevice={handleSelectDevice}
            />
          </div>
          <div className="flex flex-col gap-4">
            <KPIStrip device={latestData} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">
              <LiveTrend 
                data={trendData} 
                timeRange={timeRange} 
                onTimeRangeChange={setTimeRange} 
                timezone={timezone}
              />
              <Throughput data={throughput} />
            </div>
          </div>
          <div className="flex flex-col gap-4 h-full">
            <AlertsPanel 
              devices={topAnomalous} 
              onSelectDevice={handleSelectDevice} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
