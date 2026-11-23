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
// com o submenu recolhido; abre e fecha ao tocar em "Gerador Documentos".
const MENU_DESLIZANTE = '(max-width: 768px)'
const ehMenuDeslizante = () => window.matchMedia(MENU_DESLIZANTE).matches

export default function Sidebar({ aberto, onFechar }) {
  const navigate = useNavigate()
  const [submenuAberto, setSubmenuAberto] = useState(false)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  // Ao fechar o menu deslizante, o submenu volta a ficar recolhido
  useEffect(() => {
    if (!aberto) setSubmenuAberto(false)
  }, [aberto])

  // Tecla Esc fecha o menu deslizante
  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto, onFechar])

  // Computador: abre ao passar o mouse e fecha com um pequeno atraso, para dar
  // tempo de levar o mouse do botão até o submenu. No celular o mouse é ignorado
  // (o toque também dispara esses eventos e abriria/fecharia sem querer).
  function entrarComMouse() {
    if (ehMenuDeslizante()) return
    clearTimeout(temporizador.current)
    setSubmenuAberto(true)
  }

  function sairComMouse() {
    if (ehMenuDeslizante()) return
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => setSubmenuAberto(false), 200)
  }

  // Clique/toque: no celular abre e recolhe; no computador só abre
  function clicarGerador() {
    clearTimeout(temporizador.current)
    setSubmenuAberto((atual) => (ehMenuDeslizante() ? !atual : true))
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

        <div className="sidebar-grupo" onMouseEnter={entrarComMouse} onMouseLeave={sairComMouse}>
          <button
            type="button"
            className="btnside"
            aria-haspopup="menu"
            aria-expanded={submenuAberto}
            onClick={clicarGerador}
          >
            Gerador Documentos
            {/* Setinha que indica abrir/recolher (só no menu deslizante) */}
            <ion-icon class="btnside-seta" name="chevron-down-outline" aria-hidden="true"></ion-icon>
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
