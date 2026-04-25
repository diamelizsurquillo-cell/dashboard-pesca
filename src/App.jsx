import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Overview';
import Vessels from './pages/Vessels';
import MapView from './pages/MapView';
import Reports from './pages/Reports';
import LegalModal from './components/LegalModal';

function App() {
  return (
    <BrowserRouter>
      <LegalModal />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="vessels" element={<Vessels />} />
          <Route path="map" element={<MapView />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
