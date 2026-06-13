import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { KPIStrip } from './components/KPIStrip';
import { LiveTrend } from './components/LiveTrend';
import { AssetList } from './components/AssetList';
import { Throughput } from './components/Throughput';
import { Regions } from './components/Regions';

const API_BASE = 'http://api.axionsystems.de';

function App() {
  const [summary, setSummary] = useState({ onlineAssets: 0, lastUpdate: '-' });
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [latestData, setLatestData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<number>(1);
  const [throughput, setThroughput] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const [sumRes, devRes, thruRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/summary`),
        fetch(`${API_BASE}/devices`),
        fetch(`${API_BASE}/dashboard/throughput`)
      ]);
      
      if (sumRes.ok) {
        const sumData = await sumRes.json();
        const date = new Date(sumData.lastUpdate);
        setSummary({
          onlineAssets: sumData.onlineAssets,
          lastUpdate: sumData.lastUpdate ? date.toLocaleTimeString([], { hour12: false }) + ' UTC' : '-'
        });
      }
      
      if (devRes.ok) {
        const devData = await devRes.json();
        setDevices(devData);
        if (!selectedDeviceId && devData.length > 0) {
          setSelectedDeviceId(devData[0].device_id);
        }
      }

      if (thruRes.ok) {
        setThroughput(await thruRes.json());
      }
    } catch (e) {
      console.error('Failed to fetch dashboard data', e);
    }
  };

  const fetchDeviceData = async (deviceId: string, hours: number) => {
    try {
      const [latestRes, trendRes] = await Promise.all([
        fetch(`${API_BASE}/devices/latest?deviceId=${deviceId}`),
        fetch(`${API_BASE}/devices/${deviceId}/trends?hours=${hours}`)
      ]);

      if (latestRes.ok) setLatestData(await latestRes.json());
      if (trendRes.ok) setTrendData(await trendRes.json());
    } catch (e) {
      console.error('Failed to fetch device data', e);
    }
  };

  // Initial fetch and polling
  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch device specific data when selection or timeRange changes
  useEffect(() => {
    if (selectedDeviceId) {
      fetchDeviceData(selectedDeviceId, timeRange);
      const interval = setInterval(() => fetchDeviceData(selectedDeviceId, timeRange), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedDeviceId, timeRange]);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <TopBar onlineAssets={summary.onlineAssets} lastUpdate={summary.lastUpdate} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 flex flex-col">
          <AssetList 
            devices={devices} 
            selectedDeviceId={selectedDeviceId} 
            onSelectDevice={setSelectedDeviceId} 
          />
          <Regions devices={devices} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col">
          <KPIStrip device={latestData} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            <div className="xl:col-span-2">
              <LiveTrend 
                data={trendData} 
                timeRange={timeRange} 
                onTimeRangeChange={setTimeRange} 
              />
            </div>
            <div className="xl:col-span-1">
              <Throughput data={throughput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
