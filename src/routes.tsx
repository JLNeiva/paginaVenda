// routes.tsx (TSX)
//import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HostAwareHome from "./HostAwareHome"; // passo B (router por host)
import App from "./App";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import ResetPassword from "./pages/ResetPassword";
import DiagnosticoNR1 from "./pages/DiagnosticoNR1";
import MelhoriasHospitais from "./pages/MelhoriasHospitais";
import AvaliacaoAtencaoBasica from "./pages/AvaliacaoAtencaoBasica";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Raiz decide pelo host e mantém URL limpa */}
        <Route path="/" element={<HostAwareHome defaultComponent={App} />} />

        {/* Rotas existentes */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/diagnosticonr1" element={<DiagnosticoNR1 />} />
        <Route path="/diagnosticohospitalar" element={<MelhoriasHospitais />} />
        <Route path="/diagnosticoatencaobasica" element={<AvaliacaoAtencaoBasica />} />
      </Routes>
    </BrowserRouter>
  );
}

// export default também, para evitar erro de import mismatch
export default AppRoutes;
