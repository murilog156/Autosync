import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import '../styles/reset.css'
import '../styles/style.css'

import Topbar from '../components/Topbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

// Tela principal: barra do topo + menu lateral + conteúdo da opção escolhida.
// No celular/tablet (até 768 px) o menu lateral vira um menu deslizante,
// aberto pelo botão ☰ da barra do topo.
export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = 'AutoSync'
  }, [])

  // Fecha o menu deslizante ao trocar de página
  useEffect(() => {
    setMenuAberto(false)
  }, [pathname])

  return (
    <div className="app-layout">
      <Topbar menuAberto={menuAberto} onAbrirMenu={() => setMenuAberto(true)} />
      <div className="app-corpo">
        <Sidebar aberto={menuAberto} onFechar={() => setMenuAberto(false)} />
        <main className="app-conteudo">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
