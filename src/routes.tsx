import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { Terms } from './pages/Terms';
import { Settings } from './pages/Settings';
import { Dashboard } from './pages/Dashboard';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { ResetPassword } from './pages/ResetPassword';
import { DiagnosticoNR1 } from './pages/DiagnosticoNR1';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/diagnosticonr1" element={<DiagnosticoNR1 />} />
      </Routes>
    </BrowserRouter>
  );
}
