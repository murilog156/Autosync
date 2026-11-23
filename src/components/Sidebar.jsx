import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

// Documentos do "Gerador Documentos". Os que não têm "caminho" ainda serão criados.
const DOCUMENTOS = [
  { nome: 'Procurações', caminho: '/app/procuracao' },
  { nome: 'Contratos' },
  { nome: 'Requerimentos ATPV' },
  { nome: 'Liberações' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const [submenuAberto, setSubmenuAberto] = useState(false)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  // Abre ao passar o mouse (ou ao clicar, no celular). Fecha com um pequeno atraso
  // para dar tempo de levar o mouse do botão até o submenu.
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
    navigate(caminho)
  }

  return (
    <nav className="sidebar">
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

        {submenuAberto && (
          <div className="submenu" role="menu">
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
        )}
      </div>

      <button type="button" className="btnside" onClick={() => irPara('/app/consulta-cpf')}>
        Consulta CPF
      </button>
    </nav>
  )
}
