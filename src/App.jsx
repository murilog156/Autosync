import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import RotaProtegida from './auth/RotaProtegida.jsx'

// Cada página é carregada separadamente (lazy). Assim o CSS de uma página
// não se mistura com o das outras.
const Landing = lazy(() => import('./pages/Landing.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const GeradorProcuracao = lazy(() => import('./pages/GeradorProcuracao.jsx'))
const ConsultaCpf = lazy(() => import('./pages/ConsultaCpf.jsx'))
const Perfil = lazy(() => import('./pages/Perfil.jsx'))
const ContratoAlienacaoSaida = lazy(() => import('./pages/ContratoAlienacaoSaida.jsx'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Página pública: apresentação + login/cadastro */}
        <Route path="/" element={<Landing />} />

        {/* Páginas que exigem login */}
        <Route path="/app" element={<RotaProtegida><Home /></RotaProtegida>}>
          <Route path="procuracao" element={<GeradorProcuracao />} />
          <Route path="consulta-cpf" element={<ConsultaCpf />} />
        </Route>
        <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
        {/* Modelo antigo do contrato, guardado para quando a página de Contratos for criada */}
        <Route
          path="/contrato-alienacao"
          element={<RotaProtegida><ContratoAlienacaoSaida /></RotaProtegida>}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
