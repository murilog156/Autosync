import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

// Cada página é carregada separadamente (lazy). Assim o CSS da tela principal
// não se mistura com o CSS dos documentos gerados, que abrem em outra aba.
const Home = lazy(() => import('./pages/Home.jsx'))
const ProcuracaoSaida = lazy(() => import('./pages/ProcuracaoSaida.jsx'))
const ContratoAlienacaoSaida = lazy(() => import('./pages/ContratoAlienacaoSaida.jsx'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Antigo docsaida.html */}
        <Route path="/procuracao" element={<ProcuracaoSaida />} />
        {/* Antigo RESERVADOMINIO.html */}
        <Route path="/contrato-alienacao" element={<ContratoAlienacaoSaida />} />
      </Routes>
    </Suspense>
  )
}
