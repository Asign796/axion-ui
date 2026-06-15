import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { KPIStrip } from './components/KPIStrip';
import { LiveTrend } from './components/LiveTrend';
import { AssetList } from './components/AssetList';
import { Throughput } from './components/Throughput';
import { Regions } from './components/Regions';
import { AlertsPanel } from './components/AlertsPanel';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';

// Import pages
import { FleetSummary } from './components/pages/FleetSummary';
import { AssetHierarchy } from './components/pages/AssetHierarchy';
import { AlarmsEvents } from './components/pages/AlarmsEvents';
import { HistoricalTrends } from './components/pages/HistoricalTrends';
import { SystemSettings } from './components/pages/SystemSettings';

const API_BASE = 'https://api.axionsystems.de';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('axion_auth') === 'true';
  });
  
  const [currentView, setCurrentView] = useState('fleet');
  const [refreshInterval, setRefreshInterval] = useState<number | null>(5000);

  const [summary, setSummary] = useState({ onlineAssets: 0, lastUpdate: '-' });
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [latestData, setLatestData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<number>(1);
  const [throughput, setThroughput] = useState<any[]>([]);
  const [topAnomalous, setTopAnomalous] = useState<any[]>([]);
  const [regionSummary, setRegionSummary] = useState<any[]>([]);

  const handleLogin = () => {
    localStorage.setItem('axion_auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('axion_auth');
    setIsLoggedIn(false);
  };

  const fetchDashboardData = async () => {
    if (!isLoggedIn) return;
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
        lastUpdate: sumData.lastUpdate ? new Date(sumData.lastUpdate.endsWith('Z') ? sumData.lastUpdate : `${sumData.lastUpdate}Z`).toLocaleTimeString() : '-'
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
    if (!isLoggedIn) return;
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

  // Main Dashboard Data Loop
  useEffect(() => {
    fetchDashboardData();
    if (refreshInterval !== null) {
      const intervalId = setInterval(fetchDashboardData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn, refreshInterval]);

  // Selected Device Loop
  useEffect(() => {
    if (selectedDeviceId && isLoggedIn) {
      fetchSelectedDeviceData(selectedDeviceId);
      if (refreshInterval !== null) {
        const intervalId = setInterval(() => fetchSelectedDeviceData(selectedDeviceId), refreshInterval);
        return () => clearInterval(intervalId);
      }
    }
  }, [selectedDeviceId, timeRange, isLoggedIn, refreshInterval]);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'fleet':
        return (
          <FleetSummary 
            regionSummary={regionSummary} 
            onSelectRegion={() => {
              // For now just route to dashboard, in future could filter devices
              setCurrentView('dashboard');
            }} 
          />
        );
      case 'dashboard':
        return (
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 custom-scrollbar">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_300px] gap-4">
                {/* Left Sidebar */}
                <div className="flex flex-col gap-4">
                  <AssetList 
                    devices={devices} 
                    selectedDeviceId={selectedDeviceId}
                    onSelectDevice={setSelectedDeviceId}
                  />
                  <Regions regionSummary={regionSummary} devices={devices} />
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-4">
                  <KPIStrip device={latestData} />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">
                    <LiveTrend 
                      data={trendData} 
                      timeRange={timeRange} 
                      onTimeRangeChange={setTimeRange} 
                    />
                    <Throughput data={throughput} />
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="flex flex-col gap-4">
                  <div className="h-[600px]">
                    <AlertsPanel devices={topAnomalous} onSelectDevice={setSelectedDeviceId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'hierarchy':
        return (
          <AssetHierarchy 
            devices={devices} 
            onSelectDevice={(id) => {
              setSelectedDeviceId(id);
              setCurrentView('dashboard');
            }} 
          />
        );
      case 'alarms':
        return <AlarmsEvents devices={topAnomalous} />;
      case 'trends':
        return <HistoricalTrends />;
      case 'settings':
        return (
          <SystemSettings 
            refreshInterval={refreshInterval} 
            onRefreshIntervalChange={setRefreshInterval} 
          />
        );
      default:
        return <div className="p-6 text-white">View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-300 font-sans flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 lg:ml-64 ml-16 min-w-0 flex flex-col h-screen overflow-hidden">
        <TopBar onlineAssets={summary.onlineAssets} lastUpdate={summary.lastUpdate} onLogout={handleLogout} />
        
        {renderCurrentView()}
      </div>
    </div>
  );
}

export default App;
