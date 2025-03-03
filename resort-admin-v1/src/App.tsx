// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ReservationsList from './pages/ReservationsList';
import ResortCapacity from './pages/ResortCapacity';
import RaffleManagement from './pages/RaffleManagement';
import ReservationDetail from './pages/ReservationDetail';
import Settings from './pages/Settings';

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