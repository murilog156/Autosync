import { useState } from 'react'
import { contratoAlienacaoTeste } from '../data/dadosTeste.js'

const camposVazios = {
  // Vendedor (credor)
  credor1: '',
  cpfCredor1: '',
  rgCredor1: '',
  endCredor1: '',
  cepCredor1: '',
  telCredor1: '',
  // Comprador (devedor)
  devedor1: '',
  cpfDevedor1: '',
  rgDevedor1: '',
  endDevedor1: '',
  cepDevedor1: '',
  telDevedor1: '',
  // Veículo
  marcaModelo: '',
  placa: '',
  renavam: '',
  chassi: '',
  anoFabMod: '',
  // Venda
  valorEntrada: '',
  xParcelas: '',
  vlrParcelas: '',
  primeiraParcelaData: '',
}

// Campos de texto da página 1 (partes), na ordem em que aparecem
const camposVendedor = [
  { name: 'credor1', label: 'Vendedor ↴', placeholder: 'Nome completo' },
  { name: 'cpfCredor1', label: 'CPF Vendedor ↴', placeholder: 'CPF Vendedor', minLength: 11, maxLength: 14 },
  { name: 'rgCredor1', label: 'RG Vendedor ↴', placeholder: 'RG Vendedor' },
  { name: 'endCredor1', label: 'Endereço completo ↴', placeholder: 'Endereço completo' },
  { name: 'cepCredor1', label: 'CEP Vendedor ↴', placeholder: 'CEP' },
  { name: 'telCredor1', label: 'Telefone Vendedor ↴', placeholder: 'Telefone (DDD)' },
]

const camposComprador = [
  { name: 'devedor1', label: 'Comprador ↴', placeholder: 'Nome completo' },
  { name: 'cpfDevedor1', label: 'CPF Comprador ↴', placeholder: 'CPF Comprador', minLength: 11, maxLength: 14 },
  { name: 'rgDevedor1', label: 'RG Comprador ↴', placeholder: 'RG Comprador' },
  { name: 'endDevedor1', label: 'Endereço completo ↴', placeholder: 'Endereço completo' },
  { name: 'cepDevedor1', label: 'CEP Comprador ↴', placeholder: 'CEP' },
  { name: 'telDevedor1', label: 'Telefone Comprador ↴', placeholder: 'Telefone (DDD)' },
]

// Campos de texto do veículo (página 2)
const camposVeiculo = [
  { name: 'marcaModelo', id: 'MaMod', label: 'Marca/Modelo ↴', placeholder: 'Marca/Modelo' },
  { name: 'placa', id: 'placa1', label: 'Placa ↴', placeholder: 'Placa' },
  { name: 'renavam', id: 'renavam1', label: 'Revavam ↴', placeholder: '123456789' },
  { name: 'chassi', id: 'chassi2', label: 'Chassi ↴', placeholder: 'EX: aaaaaaaaaaaa' },
  { name: 'anoFabMod', id: 'anoFabMod', label: 'Ano/Mod ↴', placeholder: 'Ano/Mod' },
]

// Formulário do contrato de alienação fiduciária, em 2 páginas (antigo #inputBoxContratoResDom)
export default function FormContratoAlienacao({ pagina, onMudarPagina }) {
  const [dados, setDados] = useState(camposVazios)

  function alterarCampo(evento) {
    const { name, value } = evento.target
    setDados((anterior) => ({ ...anterior, [name]: value }))
  }

  function preencher() {
    setDados((anterior) => ({ ...anterior, ...contratoAlienacaoTeste }))
  }

  function gerarContrato(evento) {
    evento.preventDefault()

    const parametros = new URLSearchParams({
      credor1: dados.credor1,
      cpfCredor1: dados.cpfCredor1,
      rgCredor1: dados.rgCredor1,
      endCredor1: dados.endCredor1,
      cepCredor1: dados.cepCredor1,
      telCredor1: dados.telCredor1,
      devedor1: dados.devedor1,
      cpfDevedor1: dados.cpfDevedor1,
      rgDevedor1: dados.rgDevedor1,
      endDevedor1: dados.endDevedor1,
      cepDevedor1: dados.cepDevedor1,
      telDevedor1: dados.telDevedor1,
      marcaModelo: dados.marcaModelo,
      placa: dados.placa,
      renavam: dados.renavam,
      chassi: dados.chassi,
      anoFabMod: dados.anoFabMod,
      valorEntrada: dados.valorEntrada,
      xParcelas: dados.xParcelas,
      vlrParcelas: dados.vlrParcelas,
    })
    window.open(`/contrato-alienacao?${parametros}`)
  }

  // Renderiza um par label + input de texto
  function campoTexto({ name, id = name, label, placeholder, minLength, maxLength }) {
    return [
      <label key={`${name}-label`} className="labelRDom" htmlFor={id}>
        {label}
      </label>,
      <input
        key={name}
        id={id}
        name={name}
        className="t1 form1"
        type="text"
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={dados[name]}
        onChange={alterarCampo}
      />,
    ]
  }

  return (
    <form
      className="inputBoxContratoResDomCSS"
      id="inputBoxContratoResDom"
      style={{ display: pagina ? 'flex' : 'none' }}
      onSubmit={gerarContrato}
    >
      <h1 id="tituloRDom">CONTRATO DE ALIENAÇÃO FIDUCIÁRIA ✎</h1>

      {/* Página 1: dados das partes */}
      <div id="inputBoxPartes" style={{ display: pagina === 'pg1' ? 'flex' : 'none' }}>
        <div id="credorRdom">{camposVendedor.map(campoTexto)}</div>
        <div id="devedorRdom">{camposComprador.map(campoTexto)}</div>
        <button type="button" id="btnProx" onClick={() => onMudarPagina('pg2')}>
          PRÓXIMO ▶
        </button>
      </div>

      {/* Página 2: veículo e venda */}
      <div id="inputBoxVeiculoEVenda" style={{ display: pagina === 'pg2' ? 'flex' : 'none' }}>
        <div id="veiculoRDom">{camposVeiculo.map(campoTexto)}</div>

        <div id="vendaRDom">
          <label className="labelRDom" htmlFor="vlrEntrada">⬐ Valor de entrada</label>
          <input
            id="vlrEntrada"
            name="valorEntrada"
            type="number"
            className="t5 form1"
            placeholder="Entrada R$"
            value={dados.valorEntrada}
            onChange={alterarCampo}
          />

          <label className="labelRDom" htmlFor="xParcelas1">⬐ Número de parcelas</label>
          <input
            required
            id="xParcelas1"
            name="xParcelas"
            type="number"
            className="t5 form1"
            placeholder="x Parcelas"
            value={dados.xParcelas}
            onChange={alterarCampo}
          />

          <label className="labelRDom" htmlFor="vlrParcelas">⬐ Valor das parcelas</label>
          <input
            id="vlrParcelas"
            name="vlrParcelas"
            type="number"
            className="t5 form1"
            placeholder="Valor parcela"
            value={dados.vlrParcelas}
            onChange={alterarCampo}
          />

          <label className="labelRDom" htmlFor="primeiraParcelaData">⬐ Data 1ª parcela</label>
          <input
            id="primeiraParcelaData"
            name="primeiraParcelaData"
            type="date"
            className="t5 form1"
            value={dados.primeiraParcelaData}
            onChange={alterarCampo}
          />

          <label className="labelRDom">⬐ Valor Total:</label>
          <div id="valorTotalRDom"></div>

          {/* Botão de teste (sem texto, como no original): preenche com dados fictícios */}
          <button type="button" className="btnsubback" onClick={preencher}></button>
        </div>

        <div id="btnsCenter">
          <button type="button" className="btnsubback" onClick={() => onMudarPagina('pg1')}>
            ◄ RETORNAR
          </button>
          <button type="submit" className="btnsubback">
            GERAR
            <div style={{ fontSize: '30px', marginLeft: '10px', marginBottom: '4px' }}>🛠</div>
          </button>
        </div>
      </div>
    </form>
  )
}
