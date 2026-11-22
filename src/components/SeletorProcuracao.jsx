// Pop-up "Selecione o tipo de procuração" (antigo #procSelectType)
export default function SeletorProcuracao({ aberto, onMouseEnter, onMouseLeave, onEscolher }) {
  return (
    <div
      id="procSelectType"
      className="testet"
      style={{ display: aberto ? 'flex' : 'none' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Selecione o tipo de procuração:
      <button className="btnsubmit" onClick={() => onEscolher('fisica')}>
        Pessoa física
      </button>
      <button className="btnClose">Pessoa jurídica (em breve)</button>
      <button className="btnClose">Proc. avançada (em breve)</button>
    </div>
  )
}
