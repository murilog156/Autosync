export default function Sidebar({ onEntrarProcuracao, onEntrarContratos, onSair }) {
  return (
    <nav className="sidebar">
      <button className="btnside" onMouseEnter={onEntrarProcuracao} onMouseLeave={onSair}>
        Gerador de procuração
      </button>
      <button className="btnside" onMouseEnter={onEntrarContratos} onMouseLeave={onSair}>
        Contratos
      </button>
      <button className="btnside">Outros Documentos</button>
      <button className="btnside">Consulta CPF</button>
    </nav>
  )
}
