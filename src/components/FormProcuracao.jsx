import { useState } from 'react'
import { procuracaoTeste } from '../data/dadosTeste.js'

const camposVazios = {
  // Pessoa jurídica (ainda não usado para gerar documento)
  razaoSocial: '',
  cnpj: '',
  // Pessoa física
  proprietario: '',
  proprietarioCpf: '',
  procurador1: '',
  cpfproc1: '',
  procurador2: '',
  cpfproc2: '',
  // Veículo
  placa: '',
  renavam: '',
  marcamodelo: '',
  chassi: '',
  anoveiculo: '',
  cor: '',
}

const maiusculo = { textTransform: 'uppercase' }

// Formulário do gerador de procuração (antigo #caixa-dos-inputs-grande)
export default function FormProcuracao({ aberto, tipo, onVoltar }) {
  const [dados, setDados] = useState(camposVazios)
  const ehFisica = tipo === 'fisica'
  const ehJuridica = tipo === 'juridica'

  // Atualiza o campo pelo "name" do input
  function alterarCampo(evento) {
    const { name, value } = evento.target
    setDados((anterior) => ({ ...anterior, [name]: value }))
  }

  function preencher() {
    setDados((anterior) => ({ ...anterior, ...procuracaoTeste }))
  }

  function limpar() {
    setDados(camposVazios)
  }

  function gerarProcuracao(evento) {
    evento.preventDefault()

    if (ehFisica) {
      const parametros = new URLSearchParams({
        proprietario: dados.proprietario,
        proprietarioCpf: dados.proprietarioCpf,
        procurador1: dados.procurador1,
        cpfproc1: dados.cpfproc1,
        procurador2: dados.procurador2,
        cpfproc2: dados.cpfproc2,
        placa: dados.placa,
        renavam: dados.renavam,
        marcamodelo: dados.marcamodelo,
        chassi: dados.chassi,
        anoveiculo: dados.anoveiculo,
        cor: dados.cor,
      })
      // Abre o documento pronto em uma nova aba
      window.open(`/procuracao?${parametros}`)
    }
  }

  return (
    <div
      className="inputboxprocfisica"
      id="caixa-dos-inputs-grande"
      style={{ display: aberto ? 'flex' : 'none' }}
    >
      <form id="encaixotei" onSubmit={gerarProcuracao}>
        <div className="rcbform">
          <div
            className="caixainput1"
            id="caixa-dos-inputs-juridicos"
            style={{ display: ehJuridica ? 'flex' : 'none' }}
          >
            <label htmlFor="procPjInput1">Razão Social</label>
            <input
              style={maiusculo}
              name="razaoSocial"
              id="procPjInput1"
              className="t1 form1"
              type="text"
              placeholder=" Proprietário Razão social"
              required={ehJuridica}
              value={dados.razaoSocial}
              onChange={alterarCampo}
            />

            <label htmlFor="procPjInput2">CNPJ</label>
            <input
              style={maiusculo}
              maxLength={18}
              name="cnpj"
              id="procPjInput2"
              className="t2 form1"
              type="text"
              placeholder="xx.xxx.xxx/xxxx-xx"
              required={ehJuridica}
              value={dados.cnpj}
              onChange={alterarCampo}
            />
          </div>

          <div
            className="caixainput1"
            id="caixa-dos-inputs-fisicos"
            style={{ display: ehFisica ? 'flex' : 'none' }}
          >
            <label htmlFor="procPfInput1">Proprietário</label>
            <input
              style={maiusculo}
              required={ehFisica}
              name="proprietario"
              id="procPfInput1"
              className="t1 form1"
              type="text"
              placeholder=" Proprietário"
              value={dados.proprietario}
              onChange={alterarCampo}
            />

            <label htmlFor="procPfInput2">CPF Proprietário</label>
            <input
              required={ehFisica}
              id="procPfInput2"
              minLength={11}
              maxLength={14}
              name="proprietarioCpf"
              className="t2 form1"
              type="text"
              placeholder="xxx.xxx.xxx-xx"
              value={dados.proprietarioCpf}
              onChange={alterarCampo}
            />
          </div>

          <div className="caixainput1">
            <label htmlFor="procPfInput3">Procurador 1</label>
            <input
              style={maiusculo}
              required
              id="procPfInput3"
              name="procurador1"
              className="t1 form1"
              type="text"
              placeholder=" Procurador 1"
              value={dados.procurador1}
              onChange={alterarCampo}
            />

            <label htmlFor="procPfInput4">CPF</label>
            <input
              required
              id="procPfInput4"
              maxLength={14}
              name="cpfproc1"
              className="t2 form1"
              type="text"
              placeholder="xxx.xxx.xxx-xx"
              value={dados.cpfproc1}
              onChange={alterarCampo}
            />
          </div>

          <div className="caixainput1">
            <label htmlFor="procPfInput5">Procurador 2</label>
            <input
              style={maiusculo}
              id="procPfInput5"
              name="procurador2"
              className="t1 form1"
              type="text"
              placeholder=" Procurador 2"
              value={dados.procurador2}
              onChange={alterarCampo}
            />

            <label htmlFor="procPfInput6">CPF</label>
            <input
              maxLength={14}
              name="cpfproc2"
              id="procPfInput6"
              className="t2 form1"
              type="text"
              placeholder="xxx.xxx.xxx-xx"
              value={dados.cpfproc2}
              onChange={alterarCampo}
            />
          </div>
        </div>

        <div className="rcbform2">
          <div className="caixainput2">
            <label htmlFor="placa">Placa</label>
            <input
              required
              style={maiusculo}
              minLength={7}
              maxLength={7}
              id="placa"
              name="placa"
              className="t3 form2"
              type="text"
              placeholder=" XYZ1B34"
              value={dados.placa}
              onChange={alterarCampo}
            />

            <label htmlFor="rnvvei">Renavam</label>
            <input
              required
              minLength={9}
              maxLength={11}
              name="renavam"
              id="rnvvei"
              className="t3 form2"
              type="text"
              placeholder="123456789"
              value={dados.renavam}
              onChange={alterarCampo}
            />

            <label htmlFor="marmodvei">Marca / Modelo</label>
            <input
              required
              maxLength={24}
              id="marmodvei"
              name="marcamodelo"
              className="t3 form2"
              type="text"
              placeholder=" Marca Mod"
              value={dados.marcamodelo}
              onChange={alterarCampo}
            />

            <label htmlFor="chassi1">Chassi</label>
            <input
              required
              style={maiusculo}
              minLength={10}
              maxLength={17}
              name="chassi"
              id="chassi1"
              className="t3 form2"
              type="text"
              placeholder="EX: 9BGK348V0JF153530"
              value={dados.chassi}
              onChange={alterarCampo}
            />

            <label htmlFor="anoveiculo">Ano fab / Ano mod</label>
            <input
              required
              minLength={8}
              maxLength={10}
              id="anoveiculo"
              name="anoveiculo"
              className="t3 form2"
              type="text"
              placeholder=" Ano fab / Ano mod"
              value={dados.anoveiculo}
              onChange={alterarCampo}
            />

            <label htmlFor="corveiculo">Cor</label>
            <input
              required
              style={maiusculo}
              maxLength={12}
              name="cor"
              id="corveiculo"
              className="t3 form2"
              type="text"
              placeholder="Ex: Branco"
              value={dados.cor}
              onChange={alterarCampo}
            />
          </div>
        </div>

        <div id="footbtn">
          <button type="button" className="btnsubback" onClick={onVoltar}>
            <div id="separador2">
              <ion-icon size="large" name="arrow-undo-outline"></ion-icon>
              Voltar
            </div>
          </button>
          <button type="button" className="btnsubback" onClick={preencher}>
            PREENCHER
          </button>
          <button type="button" className="btnsubback" onClick={limpar}>
            LIMPAR
          </button>
          <button type="submit" className="btnsubback">
            <div id="separador1">
              <ion-icon size="large" name="cloud-download-outline"></ion-icon>
              Gerar
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}
