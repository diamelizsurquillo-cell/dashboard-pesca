import { useState } from 'react';
import { vesselsData } from '../data/mockData';
import { Search, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import anchovetaVideo from '../assets/anchoveta.mp4';

const Vessels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [flotaFilter, setFlotaFilter] = useState('Todas');

  const filteredVessels = vesselsData.filter(v => 
    (v.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
     v.matricula.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (estadoFilter === 'Todos' || v.estado === estadoFilter) &&
    (flotaFilter === 'Todas' || v.tipo === flotaFilter)
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredVessels);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Embarcaciones");
    XLSX.writeFile(workbook, "Embarcaciones_PRODUCE_2025.xlsx");
  };

  return (
    <div style={{ margin: '-20px', padding: '20px', position: 'relative', minHeight: 'calc(100vh - 60px)', overflow: 'hidden' }}>
      {/* Background Video */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute'
          }}
        >
          <source src={anchovetaVideo} type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0,51,102,0.4) 0%, rgba(46,139,87,0.3) 100%)',
          zIndex: 1
        }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="filters-bar" style={{ justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
            <div style={{ position: 'relative', flex: '1 1 200px' }}>
              <input 
                type="text" 
                placeholder="Buscar embarcación, matrícula..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '30px', width: '100%', background: 'rgba(255, 255, 255, 0.8)' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-secondary)' }} />
            </div>
            <select 
              style={{ background: 'rgba(255, 255, 255, 0.8)', flex: '1 1 130px' }}
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
            >
              <option value="Todos">Estado: Todos</option>
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </select>
            <select 
              style={{ background: 'rgba(255, 255, 255, 0.8)', flex: '1 1 130px' }}
              value={flotaFilter}
              onChange={(e) => setFlotaFilter(e.target.value)}
            >
              <option value="Todas">Flota: Todas</option>
              <option value="Industrial">Industrial</option>
              <option value="Artesanal">Artesanal</option>
            </select>
          </div>
          <button className="btn" onClick={exportToExcel}>
            <Download size={16} /> Exportar Excel
          </button>
        </div>

        <div className="table-container" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
          <table style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
            <thead>
              <tr>
                <th style={{ background: 'rgba(230, 240, 250, 0.7)' }}>Matrícula</th>
                <th style={{ background: 'rgba(230, 240, 250, 0.7)' }}>Nombre</th>
                <th style={{ background: 'rgba(230, 240, 250, 0.7)' }}>Tipo de Flota</th>
                <th style={{ background: 'rgba(230, 240, 250, 0.7)' }}>Capacidad (m³)</th>
                <th style={{ background: 'rgba(230, 240, 250, 0.7)' }}>Puerto Base</th>
                <th style={{ background: 'rgba(230, 240, 250, 0.7)' }}>Última Salida</th>
                <th style={{ background: 'rgba(230, 240, 250, 0.7)' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredVessels.map(v => (
                <tr key={v.id}>
                  <td><strong>{v.matricula}</strong></td>
                  <td>{v.nombre}</td>
                  <td>{v.tipo}</td>
                  <td>{v.capacidad}</td>
                  <td>{v.puerto}</td>
                  <td>{v.ultimaSalida}</td>
                  <td>
                    <span className={`badge ${v.estado === 'Activa' ? 'active' : 'inactive'}`}>
                      {v.estado}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredVessels.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No se encontraron embarcaciones.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vessels;
