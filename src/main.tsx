import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OracleHome from './pages/OracleHome';
import OracleConsultation from './pages/OracleConsultation';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OracleHome />} />
        <Route path="/oraculo" element={<OracleHome />} />
        <Route path="/oraculo/consulta" element={<OracleConsultation />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
