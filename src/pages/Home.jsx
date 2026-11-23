import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router'
import '../styles/reset.css'
import '../styles/style.css'

import Topbar from '../components/Topbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

// Tela principal: barra do topo + menu lateral. O conteúdo de cada opção do menu
// (procuração, consulta de CPF...) aparece no <Outlet />.
export default function Home() {
  useEffect(() => {
    document.title = 'AutoSync'
  }, [])

  return (
    <>
      <Topbar />
      <Sidebar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  )
}
