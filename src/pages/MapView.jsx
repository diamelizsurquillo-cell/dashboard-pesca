import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapZonesData } from '../data/mockData';

const MapView = () => {
  const [capa, setCapa] = useState('Densidad de Captura');
  const [region, setRegion] = useState('Toda la costa');

  const displayedZones = region === 'Toda la costa'
    ? mapZonesData
    : mapZonesData.filter(z => z.name.includes(region));

  return (
    <div>
      <div className="filters-bar">
        <select value={capa} onChange={(e) => setCapa(e.target.value)}>
          <option value="Densidad de Captura">Capa: Densidad de Captura</option>
          <option value="Rutas de Pesca">Rutas de Pesca</option>
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="Toda la costa">Región: Toda la costa</option>
          <option value="Norte">Norte</option>
          <option value="Centro">Centro</option>
          <option value="Sur">Sur</option>
        </select>
      </div>
      <div className="map-container">
        <MapContainer center={[-9.19, -75.01]} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {displayedZones.map(zone => {
            const radius = zone.density === 'Muy Alta' ? 40 : zone.density === 'Alta' ? 30 : 20;
            const color = zone.density === 'Muy Alta' ? '#DC3545' : zone.density === 'Alta' ? '#FFC107' : '#2E8B57';
            
            return (
              <CircleMarker 
                key={zone.id} 
                center={zone.coords} 
                radius={radius}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.5 }}
              >
                <Tooltip>
                  <div style={{ textAlign: 'center' }}>
                    <strong>{zone.name}</strong><br />
                    Densidad: {zone.density}<br />
                    Captura Estimada: {zone.catch.toLocaleString()} TM
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
      
      <div className="chart-card" style={{ marginTop: '20px' }}>
        <h3>Leyenda</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#DC3545', borderRadius: '50%' }}></div>
            <span>Muy Alta (&gt; 600k TM)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#FFC107', borderRadius: '50%' }}></div>
            <span>Alta (400k - 600k TM)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#2E8B57', borderRadius: '50%' }}></div>
            <span>Media (&lt; 400k TM)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
