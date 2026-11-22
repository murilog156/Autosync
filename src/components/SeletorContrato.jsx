// Pop-up "Selecione o tipo de contrato" (antigo #contractSelectType)
export default function SeletorContrato({ aberto, onMouseEnter, onMouseLeave, onEscolherAlienacao }) {
  return (
    <div
      id="contractSelectType"
      className="testet"
      style={{ display: aberto ? 'flex' : 'none' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Selecione o tipo de contrato:
      <button className="btnsubmit" onClick={onEscolherAlienacao}>
        Alienação Fiduciária
      </button>
    </div>
  )
}
