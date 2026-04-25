import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Ship, Map as MapIcon, FileText, Anchor, Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
        <div className="sidebar-header" style={{ position: 'relative' }}>
          <button 
            className="mobile-close-btn" 
            onClick={() => setIsSidebarOpen(false)}
            style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
          >
            <X size={24} />
          </button>
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

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <main className="main-content">
        <header className="topbar">
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-blue)', padding: '5px' }}
             >
               <Menu size={24} />
             </button>
             <h3 style={{color: 'var(--primary-blue)'}} className="topbar-title">Dashboard Interactivo de Seguimiento</h3>
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
