import { useEffect, useState } from 'react'
import '../styles/reset.css'
import '../styles/style.css'

import Topbar from '../components/Topbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SeletorProcuracao from '../components/SeletorProcuracao.jsx'
import SeletorContrato from '../components/SeletorContrato.jsx'
import FormProcuracao from '../components/FormProcuracao.jsx'
import FormContratoAlienacao from '../components/FormContratoAlienacao.jsx'

// Valores possíveis de "menuAtual" (mesmos nomes do script.js antigo)
const MENU_TIPO_PROCURACAO = 'gerador-de-procuracao-type'
const MENU_CONTRATOS = 'contratos'

export default function Home() {
  // Qual menu/tela está ativo no momento (antigo "menuAbertoAtual")
  const [menuAtual, setMenuAtual] = useState(null)
  // Qual pop-up de seleção está visível: 'procuracao', 'contrato' ou null
  const [popup, setPopup] = useState(null)
  // Formulário de procuração aberto ou fechado, e de qual tipo
  const [procuracaoAberta, setProcuracaoAberta] = useState(false)
  const [tipoProcuracao, setTipoProcuracao] = useState('fisica')
  // Página do formulário de contrato: null (fechado), 'pg1' ou 'pg2'
  const [paginaContrato, setPaginaContrato] = useState(null)

  useEffect(() => {
    document.title = 'AutoSync'
  }, [])

  function fecharTodosMenus() {
    setPopup(null)
    setProcuracaoAberta(false)
    setMenuAtual(null)
  }

  function abrirSeletorProcuracao() {
    fecharTodosMenus()
    setPopup('procuracao')
    setMenuAtual(MENU_TIPO_PROCURACAO)
  }

  function abrirSeletorContratos() {
    fecharTodosMenus()
    setPopup('contrato')
    setMenuAtual(MENU_CONTRATOS)
  }

  // Fecha o pop-up de seleção quando o mouse sai dele
  function fecharGuia() {
    if (menuAtual === MENU_TIPO_PROCURACAO || menuAtual === MENU_CONTRATOS) {
      setPopup(null)
    }
  }

  // Escolheu o tipo de procuração no pop-up: abre o formulário
  function abrirFormProcuracao(tipo) {
    setPopup(null)
    setProcuracaoAberta(true)
    setTipoProcuracao(tipo)
    setMenuAtual(tipo === 'fisica' ? 'gerador-procuracao-fisica' : 'gerador-procuracao-juridica')
  }

  // Botão "Voltar" do formulário de procuração
  function voltarSeletorProcuracao() {
    setProcuracaoAberta(false)
    setPopup('procuracao')
    setMenuAtual(MENU_TIPO_PROCURACAO)
  }

  function abrirContratoAlienacao(pagina) {
    setPaginaContrato(pagina)
    if (pagina === 'pg1') {
      setPopup(null)
      setMenuAtual('ContratoAlienacaoFiduciariaPg1')
    } else {
      setMenuAtual('ContratoAlienacaoFiduciariaPg2')
    }
  }

  return (
    <>
      <Topbar />

      <Sidebar
        onEntrarProcuracao={abrirSeletorProcuracao}
        onEntrarContratos={abrirSeletorContratos}
        onSair={fecharTodosMenus}
      />

      <SeletorProcuracao
        aberto={popup === 'procuracao'}
        onMouseEnter={abrirSeletorProcuracao}
        onMouseLeave={fecharGuia}
        onEscolher={abrirFormProcuracao}
      />

      <SeletorContrato
        aberto={popup === 'contrato'}
        onMouseEnter={abrirSeletorContratos}
        onMouseLeave={fecharGuia}
        onEscolherAlienacao={() => abrirContratoAlienacao('pg1')}
      />

      <FormProcuracao
        aberto={procuracaoAberta}
        tipo={tipoProcuracao}
        onVoltar={voltarSeletorProcuracao}
      />

      <FormContratoAlienacao
        pagina={paginaContrato}
        onMudarPagina={abrirContratoAlienacao}
      />
    </>
  )
}
