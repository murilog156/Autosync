import { Link } from 'react-router'
import { useAuth } from '../auth/AuthProvider.jsx'
import { supabase } from '../lib/supabase.js'

export default function Topbar({ menuAberto, onAbrirMenu }) {
  const { usuario } = useAuth()
  const meta = usuario?.user_metadata ?? {}
  // "nome" é o nome editado na página de perfil; "full_name" vem do cadastro/Google
  const nome = meta.nome || meta.full_name || usuario?.email

  async function sair() {
    await supabase.auth.signOut()
    // Recarrega a página para começar a landing page "limpa", sem o CSS da tela principal
    window.location.replace('/')
  }

  return (
    <header className="topbar">
      {/* Botão ☰: só aparece no celular/tablet */}
      <button
        type="button"
        className="topbar-menu"
        onClick={onAbrirMenu}
        aria-label="Abrir menu"
        aria-expanded={menuAberto}
      >
        <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
      </button>

      <img className="topbar-logo" src="/media/logo-fundo-branco.svg" width="330" height="90" alt="AutoSync" />

      <div className="topbar-usuario">
        {nome && (
          <span className="topbar-nome" title={nome}>
            {nome}
          </span>
        )}
        <Link to="/perfil" className="topbar-botao" aria-label="Perfil">
          <ion-icon name="settings-outline" aria-hidden="true"></ion-icon>
          <span className="topbar-rotulo">Perfil</span>
        </Link>
        <button type="button" className="topbar-botao" onClick={sair} aria-label="Sair">
          <ion-icon name="log-out-outline" aria-hidden="true"></ion-icon>
          <span className="topbar-rotulo">Sair</span>
        </button>
      </div>
    </header>
  )
}
