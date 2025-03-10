// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ReservationsList from './pages/ReservationsList.tsx';
import ResortCapacity from './pages/ResortCapacity.tsx';
import RaffleManagement from '@/pages/RaffleManagement';
import ReservationDetail from './pages/ReservationDetail.tsx';
import Settings from './pages/Settings.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<ReservationsList />} />
          <Route path="reservations/:id" element={<ReservationDetail />} />
          <Route path="capacity" element={<ResortCapacity />} />
          <Route path="raffle" element={<RaffleManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;