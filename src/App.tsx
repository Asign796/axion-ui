import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { KPIStrip } from './components/KPIStrip';
import { LiveTrend } from './components/LiveTrend';
import { AssetList } from './components/AssetList';
import { Throughput } from './components/Throughput';
import { Regions } from './components/Regions';
import { TopProblemAssets } from './components/TopProblemAssets';
import { AlertsPanel } from './components/AlertsPanel';

const API_BASE = 'https://api.axionsystems.de';

function App() {
  const [summary, setSummary] = useState({ onlineAssets: 0, lastUpdate: '-' });
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [latestData, setLatestData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<number>(1);
  const [throughput, setThroughput] = useState<any[]>([]);
  
  // New State variables
  const [topAnomalous, setTopAnomalous] = useState<any[]>([]);
  const [regionSummary, setRegionSummary] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const [sumRes, devRes, thruRes, anomRes, regRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/summary`),
        fetch(`${API_BASE}/devices`),
        fetch(`${API_BASE}/dashboard/throughput`),
        fetch(`${API_BASE}/devices/top-anomalous`),
        fetch(`${API_BASE}/dashboard/regions`)
      ]);
      
      const [sumData, devData, thruData, anomData, regData] = await Promise.all([
        sumRes.json(),
        devRes.json(),
        thruRes.json(),
        anomRes.json(),
        regRes.json()
      ]);

      setSummary({
        onlineAssets: sumData.onlineAssets,
        lastUpdate: new Date(sumData.lastUpdate).toLocaleTimeString()
      });
      setDevices(devData);
      setThroughput(thruData);
      setTopAnomalous(anomData);
      setRegionSummary(regData);

      if (!selectedDeviceId && devData.length > 0) {
        setSelectedDeviceId(devData[0].device_id);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    }
  };

  const fetchSelectedDeviceData = async (deviceId: string) => {
    try {
      const [latestRes, trendRes] = await Promise.all([
        fetch(`${API_BASE}/devices/${deviceId}/latest`),
        fetch(`${API_BASE}/devices/${deviceId}/trends?hours=${timeRange}`)
      ]);
      setLatestData(await latestRes.json());
      setTrendData(await trendRes.json());
    } catch (err) {
      console.error(`Failed to fetch data for ${deviceId}`, err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedDeviceId) {
      fetchSelectedDeviceData(selectedDeviceId);
      const interval = setInterval(() => fetchSelectedDeviceData(selectedDeviceId), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedDeviceId, timeRange]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-6 font-sans">
      <div className="max-w-[1600px] mx-auto">
        <TopBar onlineAssets={summary.onlineAssets} lastUpdate={summary.lastUpdate} />
        
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_300px] gap-6">
          {/* Left Sidebar */}
          <div className="flex flex-col gap-6">
            <AssetList 
              devices={devices} 
              selectedDeviceId={selectedDeviceId}
              onSelectDevice={setSelectedDeviceId}
            />
            <Regions regionSummary={regionSummary} devices={devices} />
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6">
            <KPIStrip device={latestData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
              <LiveTrend 
                data={trendData} 
                timeRange={timeRange} 
                onTimeRangeChange={setTimeRange} 
              />
              <Throughput data={throughput} />
            </div>

            <div className="h-[300px]">
              <TopProblemAssets devices={topAnomalous} onSelectDevice={setSelectedDeviceId} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="h-[600px]">
              <AlertsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
