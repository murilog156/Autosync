import { Link } from 'react-router'
import { useAuth } from '../auth/AuthProvider.jsx'
import { supabase } from '../lib/supabase.js'

export default function Topbar() {
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
    <div className="topbar">
      <img id="logo1" src="/media/logo1.png" width="300" height="90" alt="AutoSync" />
      <img id="logo2" src="/media/logo2.png" width="300" height="90" alt="" />

      <div className="topbar-usuario">
        {nome && <span className="topbar-nome">{nome}</span>}
        <Link to="/perfil" className="topbar-botao">
          <ion-icon name="settings-outline" aria-hidden="true"></ion-icon>
          Perfil
        </Link>
        <button type="button" className="topbar-botao" onClick={sair}>
          <ion-icon name="log-out-outline" aria-hidden="true"></ion-icon>
          Sair
        </button>
      </div>
    </div>
  )
}
