import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Building } from 'lucide-react';

interface MapWidgetProps {
  regionSummary: any[];
}

// Coordinates mapping based on our regions
const REGION_COORDS: Record<string, [number, number]> = {
  'WEST_REFINERY': [35.3733, -119.0187], // Bakersfield, CA
  'SOUTH_PLANT': [29.7604, -95.3698],    // Houston, TX
  'EAST_REFINERY': [25.2048, 55.2708],   // Dubai, UAE
  'NORTH_PLANT': [57.1497, -2.0943],     // Aberdeen, UK (North Sea)
};

// Create a custom glowing icon function
const createCustomIcon = (status: 'critical' | 'healthy') => {
  const color = status === 'critical' ? '#ef4444' : '#10b981';
  const shadowColor = status === 'critical' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)';
  
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 15px ${shadowColor}, 0 0 30px ${shadowColor};
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid ${color};
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        "></div>
      </div>
      <style>
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

function MapBounds({ regions }: { regions: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (regions.length > 0) {
      const bounds = L.latLngBounds(regions.map(r => REGION_COORDS[r.region] || [0, 0]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 });
    }
  }, [map, regions]);
  return null;
}

export function MapWidget({ regionSummary }: MapWidgetProps) {
  const navigate = useNavigate();

  const regionsWithCoords = useMemo(() => {
    return regionSummary.filter(r => REGION_COORDS[r.region]);
  }, [regionSummary]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-md overflow-hidden border border-[#262626] relative z-0">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
        zoomControl={false}
      >
        {/* Dark Matter TileLayer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapBounds regions={regionsWithCoords} />

        {regionsWithCoords.map((region) => {
          const coords = REGION_COORDS[region.region];
          const isCritical = region.alert_devices > 0;
          
          return (
            <Marker 
              key={region.region} 
              position={coords} 
              icon={createCustomIcon(isCritical ? 'critical' : 'healthy')}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {region.region}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="bg-slate-100 p-2 rounded">
                      <div className="text-slate-500 text-xs font-bold uppercase">Online</div>
                      <div className="text-green-600 font-bold">{region.online_devices}</div>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                      <div className="text-slate-500 text-xs font-bold uppercase">Alerts</div>
                      <div className={`font-bold ${isCritical ? 'text-red-500' : 'text-slate-700'}`}>
                        {region.alert_devices}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/device')}
                    className="w-full py-2 bg-[#171717] hover:bg-[#262626] text-white rounded text-sm font-bold transition-colors"
                  >
                    View Devices
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Custom CSS to hide default leaflet UI and style popups */}
      <style>{`
        .leaflet-container { background: #0a0a0a; }
        .leaflet-popup-content-wrapper { background: white; color: #171717; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5); }
        .leaflet-popup-tip { background: white; }
        .leaflet-control-attribution { background: rgba(0,0,0,0.5) !important; color: #888 !important; }
        .leaflet-control-attribution a { color: #aaa !important; }
      `}</style>
    </div>
  );
}
