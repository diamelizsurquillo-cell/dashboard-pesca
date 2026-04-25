import { useState } from 'react';
import { kpiData, monthlyCatchData, fleetCatchData, zoneCatchData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import anchovetaVideo from '../assets/anchoveta.mp4';

const COLORS = ['#003366', '#2E8B57', '#FFC107', '#DC3545'];

const Overview = () => {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('Todos');
  const [zone, setZone] = useState('Todas');
  const [fleet, setFleet] = useState('Todas');

  const kpiMultiplier = year === '2024' ? 0.85 : 1;
  const displayKpiData = {
    totalCatch: kpiData.totalCatch2025 * kpiMultiplier,
    quota: kpiData.quotaAssigned,
    vessels: Math.round(kpiData.activeVessels * kpiMultiplier),
    zone: zone !== 'Todas' ? zone : kpiData.topZone
  };

  const percentageQuota = ((displayKpiData.totalCatch / displayKpiData.quota) * 100).toFixed(1);

  const displayedMonthlyCatch = month === 'Todos' 
    ? monthlyCatchData 
    : monthlyCatchData.filter(d => d.month === month);

  const displayedFleet = fleet === 'Todas' 
    ? fleetCatchData 
    : fleetCatchData.filter(d => d.name === fleet);

  const displayedZone = zone === 'Todas' 
    ? zoneCatchData 
    : zoneCatchData.filter(d => d.name === zone);

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
        <div className="filters-bar" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
          <select style={{ background: 'rgba(255, 255, 255, 0.8)' }} value={year} onChange={e => setYear(e.target.value)}>
            <option value="2025">Año: 2025</option><option value="2024">Año: 2024</option>
          </select>
          <select style={{ background: 'rgba(255, 255, 255, 0.8)' }} value={month} onChange={e => setMonth(e.target.value)}>
            <option value="Todos">Mes: Todos</option><option value="Ene">Enero</option><option value="Feb">Febrero</option><option value="Mar">Marzo</option><option value="Abr">Abril</option><option value="May">Mayo</option><option value="Jun">Junio</option>
          </select>
          <select style={{ background: 'rgba(255, 255, 255, 0.8)' }} value={zone} onChange={e => setZone(e.target.value)}>
            <option value="Todas">Zona: Todas</option><option value="Norte">Norte</option><option value="Centro">Centro</option><option value="Sur">Sur</option>
          </select>
          <select style={{ background: 'rgba(255, 255, 255, 0.8)' }} value={fleet} onChange={e => setFleet(e.target.value)}>
            <option value="Todas">Flota: Todas</option><option value="Industrial">Industrial</option><option value="Artesanal">Artesanal</option>
          </select>
        </div>

        <div className="kpi-grid">
          <div className="kpi-card" style={{ borderLeft: '4px solid var(--primary-green)', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <div className="kpi-info">
              <h3>Captura Total {year}</h3>
              <p>{displayKpiData.totalCatch.toLocaleString()} TM</p>
            </div>
          </div>
          <div className="kpi-card" style={{ borderLeft: '4px solid var(--primary-blue)', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <div className="kpi-info">
              <h3>Cuota Utilizada</h3>
              <p>{percentageQuota}%</p>
            </div>
          </div>
          <div className="kpi-card" style={{ borderLeft: '4px solid var(--warning-yellow)', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <div className="kpi-info">
              <h3>Embarcaciones Activas</h3>
              <p>{displayKpiData.vessels}</p>
            </div>
          </div>
          <div className="kpi-card" style={{ borderLeft: '4px solid var(--alert-red)', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <div className="kpi-info">
              <h3>Zona con Mayor Actividad</h3>
              <p>{displayKpiData.zone}</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <h3>Captura Mensual vs Límite {year} (TM)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={displayedMonthlyCatch}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="captura" fill="#003366" name="Captura" />
                <Bar dataKey="limite" fill="#DC3545" name="Límite Legal" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <h3>Distribución por Tipo de Flota</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={displayedFleet} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {displayedFleet.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <h3>Evolución de Biomasa (Tendencia)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={displayedMonthlyCatch}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="captura" stroke="#2E8B57" fill="#2E8B57" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
            <h3>Distribución por Zona de Pesca</h3>
            <ResponsiveContainer width="100%" height={300}>
               <PieChart>
                <Pie data={displayedZone} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>
                  {displayedZone.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
