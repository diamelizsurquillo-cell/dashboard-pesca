import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Ship, Map as MapIcon, FileText, Anchor } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Anchor size={40} color="white" />
          <h2>PRODUCE</h2>
          <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#E6F0FA' }}>Pesquería Anchoveta 2025</p>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
                <LayoutDashboard size={20} />
                <span>Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/vessels" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
                <Ship size={20} />
                <span>Embarcaciones</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/map" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
                <MapIcon size={20} />
                <span>Mapa Geográfico</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
                <FileText size={20} />
                <span>Reportes</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div className="search-bar">
             <h3 style={{color: 'var(--primary-blue)'}}>Dashboard Interactivo de Seguimiento</h3>
          </div>
          <div className="user-profile">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>ES | EN</span>
          </div>
        </header>
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
