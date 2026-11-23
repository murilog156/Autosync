import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

// Documentos do "Gerador Documentos". Os que não têm "caminho" ainda serão criados.
const DOCUMENTOS = [
  { nome: 'Procurações', caminho: '/app/procuracao' },
  { nome: 'Contratos' },
  { nome: 'Requerimentos ATPV' },
  { nome: 'Liberações' },
]

// Menu lateral. No computador: coluna fixa à esquerda, e o submenu abre ao lado
// (passando o mouse ou clicando). No celular/tablet: menu deslizante ("aberto"),
// com o submenu sempre visível embaixo do botão.
export default function Sidebar({ aberto, onFechar }) {
  const navigate = useNavigate()
  const [submenuAberto, setSubmenuAberto] = useState(false)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  // Tecla Esc fecha o menu deslizante
  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto, onFechar])

  // Fecha com um pequeno atraso para dar tempo de levar o mouse do botão até o submenu
  function abrirSubmenu() {
    clearTimeout(temporizador.current)
    setSubmenuAberto(true)
  }

  function fecharSubmenu() {
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => setSubmenuAberto(false), 200)
  }

  function irPara(caminho) {
    clearTimeout(temporizador.current)
    setSubmenuAberto(false)
    onFechar()
    navigate(caminho)
  }

  return (
    <>
      {/* Fundo escuro atrás do menu deslizante (só aparece no celular/tablet) */}
      <div className={`sidebar-fundo ${aberto ? 'aberto' : ''}`} onClick={onFechar} aria-hidden="true" />

      <nav className={`sidebar ${aberto ? 'aberto' : ''}`} aria-label="Menu principal">
        <button type="button" className="sidebar-fechar" onClick={onFechar} aria-label="Fechar menu">
          <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
        </button>

        <div className="sidebar-grupo" onMouseEnter={abrirSubmenu} onMouseLeave={fecharSubmenu}>
          <button
            type="button"
            className="btnside"
            aria-haspopup="menu"
            aria-expanded={submenuAberto}
            onClick={abrirSubmenu}
          >
            Gerador Documentos
          </button>

          <div className={`submenu ${submenuAberto ? 'aberto' : ''}`} role="menu">
            <span className="submenu-titulo">Selecione o documento:</span>
            {DOCUMENTOS.map((doc) =>
              doc.caminho ? (
                <button
                  key={doc.nome}
                  type="button"
                  role="menuitem"
                  className="btnsubmit"
                  onClick={() => irPara(doc.caminho)}
                >
                  {doc.nome}
                </button>
              ) : (
                <button key={doc.nome} type="button" role="menuitem" className="btnClose" disabled>
                  {doc.nome}
                  <small>em breve</small>
                </button>
              ),
            )}
          </div>
        </div>

        <button type="button" className="btnside" onClick={() => irPara('/app/consulta-cpf')}>
          Consulta CPF
        </button>
      </nav>
    </>
  )
}
