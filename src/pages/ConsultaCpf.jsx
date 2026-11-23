import { useNavigate } from 'react-router'
import '../styles/painel.css'

export default function ConsultaCpf() {
  const navigate = useNavigate()

  return (
    <div className="painel painel-compacto">
      <div className="pn-em-breve">
        <span className="pn-em-breve-icone">
          <ion-icon name="search-outline" aria-hidden="true"></ion-icon>
        </span>
        <h1>Consulta de CPF</h1>
        <p>A consulta de CPF estará disponível em breve.</p>
        <button type="button" className="pn-botao pn-botao-contorno" onClick={() => navigate('/app')}>
          <ion-icon name="arrow-undo-outline" aria-hidden="true"></ion-icon>
          Voltar
        </button>
      </div>
    </div>
  )
}
