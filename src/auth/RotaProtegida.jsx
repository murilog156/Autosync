import { Navigate } from 'react-router'
import { useAuth } from './AuthProvider.jsx'

// Só mostra a página se houver alguém logado; senão, volta para a landing page.
export default function RotaProtegida({ children }) {
  const { usuario, carregando } = useAuth()

  if (carregando) return null
  if (!usuario) return <Navigate to="/" replace />

  return children
}
