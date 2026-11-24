import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import '../styles/painel.css'

import { MARCADOR_VALOR, PODERES } from '../data/poderes.js'
import { centavosDe, formatarMoeda, valorPorExtenso } from '../utils/moeda.js'
import { procuracaoTeste } from '../data/dadosTeste.js'
import { formatarTelefone, telefoneCompleto } from '../utils/telefone.js'
import {
  ehCnpj,
  formatarChassi,
  formatarCnpj,
  formatarCpf,
  formatarCpfOuCnpj,
  formatarPlaca,
  somenteDigitos,
  validarAno,
  validarCnpj,
  validarCpf,
  validarCpfOuCnpj,
  validarPlaca,
} from '../utils/documentos.js'
import { salvarArquivo } from '../utils/salvarArquivo.js'
import { useAuth } from '../auth/AuthProvider.jsx'
import { baixarLogo } from '../lib/logo.js'

const LIMITE_PROCURADORES = 5
const LIMITE_ENDERECO = 150

const pessoaVazia = { nome: '', documento: '', rg: '', endereco: '', telefone: '' }
const veiculoVazio = {
  placa: '',
  renavam: '',
  marcaModelo: '',
  chassi: '',
  anoFabricacao: '',
  anoModelo: '',
  cor: '',
}
const poderesIniciais = { modo: null, selecionados: [], valorVenda: '', validade: 'sem', dataValidade: '' }

// Texto do poder na tela (o valor de venda aparece como um espaço a preencher)
function textoNaTela(poder) {
  return poder.texto.replace(MARCADOR_VALOR, 'R$ ____ (valor de venda)')
}

let proximoId = 1
function novoProcurador(dados = {}) {
  return { nome: '', documento: '', rg: '', endereco: '', ...dados, id: proximoId++ }
}

// Regras de validação: "obrigatorio" e uma função que devolve true ou a mensagem de erro
const regrasProcurador = {
  nome: { obrigatorio: true },
  documento: {
    obrigatorio: true,
    validar: (v) => validarCpfOuCnpj(v) || (ehCnpj(v) ? 'CNPJ inválido' : 'CPF inválido'),
  },
}

const regrasVeiculo = {
  placa: { obrigatorio: true, validar: (v) => validarPlaca(v) || 'Placa inválida' },
  renavam: { obrigatorio: true, validar: (v) => v.length >= 9 || 'O RENAVAM tem de 9 a 11 números' },
  marcaModelo: { obrigatorio: true },
  chassi: { obrigatorio: true },
  anoFabricacao: { obrigatorio: true, validar: (v) => validarAno(v) || 'Ano inválido' },
  anoModelo: { obrigatorio: true, validar: (v) => validarAno(v) || 'Ano inválido' },
  cor: { obrigatorio: true },
}

// null = sem erro; '' = só contorno vermelho; texto = contorno + mensagem
function checar(regra, valor) {
  const v = valor.trim()
  if (!v) return regra.obrigatorio ? '' : null
  if (regra.validar) {
    const resultado = regra.validar(v)
    if (resultado !== true) return resultado
  }
  return null
}

function hojeIso() {
  const agora = new Date()
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset())
  return agora.toISOString().slice(0, 10)
}

export default function GeradorProcuracao() {
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const painelRef = useRef(null)

  const [etapa, setEtapa] = useState('dados') // 'dados' | 'poderes'
  const [tipo, setTipo] = useState(null) // 'fisica' | 'juridica'
  const [proprietario, setProprietario] = useState(pessoaVazia)
  const [procuradores, setProcuradores] = useState(() => [novoProcurador()])
  const [veiculo, setVeiculo] = useState(veiculoVazio)
  const [poderes, setPoderes] = useState(poderesIniciais)
  const [erros, setErros] = useState({})
  const [aviso, setAviso] = useState(null) // { tipo: 'erro' | 'ok', texto }
  const [gerando, setGerando] = useState(false)

  useEffect(() => {
    document.title = 'Procuração · AutoSync'
    return () => {
      document.title = 'AutoSync'
    }
  }, [])

  const ehJuridica = tipo === 'juridica'

  const regrasProprietario = {
    nome: { obrigatorio: true },
    documento: {
      obrigatorio: true,
      validar: (v) =>
        ehJuridica ? validarCnpj(v) || 'CNPJ inválido' : validarCpf(v) || 'CPF inválido',
    },
    telefone: { validar: (v) => telefoneCompleto(v) || 'Telefone incompleto' },
  }

  // ---------- Erros ----------

  function definirErro(chave, mensagem) {
    setErros((atual) => {
      if (mensagem === null && !(chave in atual)) return atual
      const novo = { ...atual }
      if (mensagem === null) delete novo[chave]
      else novo[chave] = mensagem
      return novo
    })
  }

  // Ao sair de um campo preenchido, confere o formato (CPF, placa...)
  function conferirAoSair(chave, regra, valor) {
    if (valor.trim()) definirErro(chave, checar(regra, valor))
  }

  function focarPrimeiroErro() {
    setTimeout(() => {
      const elemento = painelRef.current?.querySelector('[data-erro]')
      if (!elemento) return
      const alvo = elemento.matches('input, select, textarea') ? elemento : elemento.querySelector('input')
      alvo?.focus({ preventScroll: true })
      elemento.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 0)
  }

  // ---------- Etapa 1: dados ----------

  function escolherTipo(novo) {
    if (novo === tipo) return
    setTipo(novo)
    // CPF e CNPJ têm formatos diferentes: limpa o documento ao trocar
    setProprietario((p) => ({ ...p, documento: '', rg: novo === 'juridica' ? '' : p.rg }))
    definirErro('tipo', null)
    definirErro('prop.documento', null)
    setAviso(null)
  }

  function alterarProprietario(campo, valor) {
    setProprietario((p) => ({ ...p, [campo]: valor }))
    definirErro(`prop.${campo}`, null)
  }

  function alterarProcurador(id, campo, valor) {
    setProcuradores((lista) => lista.map((p) => (p.id === id ? { ...p, [campo]: valor } : p)))
    definirErro(`proc.${id}.${campo}`, null)
  }

  function alterarVeiculo(campo, valor) {
    setVeiculo((v) => ({ ...v, [campo]: valor }))
    definirErro(`vei.${campo}`, null)
  }

  function adicionarProcurador() {
    if (procuradores.length < LIMITE_PROCURADORES) {
      setProcuradores((lista) => [...lista, novoProcurador()])
    }
  }

  function removerProcurador(id) {
    setProcuradores((lista) => lista.filter((p) => p.id !== id))
    setErros((atual) =>
      Object.fromEntries(Object.entries(atual).filter(([chave]) => !chave.startsWith(`proc.${id}.`))),
    )
  }

  function preencher() {
    const novoTipo = tipo ?? 'fisica'
    setTipo(novoTipo)
    setProprietario(
      novoTipo === 'juridica' ? procuracaoTeste.proprietarioJuridica : procuracaoTeste.proprietarioFisica,
    )
    setProcuradores(procuracaoTeste.procuradores.map((p) => novoProcurador(p)))
    setVeiculo(procuracaoTeste.veiculo)
    setErros({})
    setAviso(null)
  }

  function limparDados() {
    setProprietario(pessoaVazia)
    setProcuradores([novoProcurador()])
    setVeiculo(veiculoVazio)
    setErros({})
    setAviso(null)
  }

  function validarDados() {
    const novos = {}
    if (!tipo) {
      novos.tipo = 'Escolha Pessoa Física ou Pessoa Jurídica.'
      return novos
    }
    for (const [campo, regra] of Object.entries(regrasProprietario)) {
      const erro = checar(regra, proprietario[campo])
      if (erro !== null) novos[`prop.${campo}`] = erro
    }
    for (const p of procuradores) {
      for (const [campo, regra] of Object.entries(regrasProcurador)) {
        const erro = checar(regra, p[campo])
        if (erro !== null) novos[`proc.${p.id}.${campo}`] = erro
      }
    }
    for (const [campo, regra] of Object.entries(regrasVeiculo)) {
      const erro = checar(regra, veiculo[campo])
      if (erro !== null) novos[`vei.${campo}`] = erro
    }
    return novos
  }

  function irParaPoderes(evento) {
    evento.preventDefault()
    const novos = validarDados()
    setErros(novos)
    if (Object.keys(novos).length > 0) {
      setAviso({ tipo: 'erro', texto: 'Preencha corretamente os campos destacados em vermelho.' })
      focarPrimeiroErro()
      return
    }
    setAviso(null)
    setEtapa('poderes')
    painelRef.current?.scrollTo({ top: 0 })
  }

  // ---------- Etapa 2: poderes e validade ----------

  const ehAmplos = poderes.modo === 'amplos'

  // Poderes que vão para a procuração. Em "amplos" entram todos, menos os opcionais
  // (ex.: item 15, causa própria), que só entram se o usuário marcar.
  const poderesIncluidos = PODERES.filter((p) =>
    ehAmplos ? !p.opcional || poderes.selecionados.includes(p.id) : poderes.selecionados.includes(p.id),
  )
  const precisaValorVenda = poderes.modo !== null && poderesIncluidos.some((p) => p.exigeValor)

  const podeGerar = ehAmplos || (poderes.modo === 'especificos' && poderes.selecionados.length > 0)

  function escolherModo(modo) {
    setPoderes((p) => ({
      ...p,
      modo,
      // Ao escolher "amplos", os opcionais (item 15) começam desmarcados
      selecionados: modo === 'amplos' ? p.selecionados.filter((id) => !PODERES.find((x) => x.id === id)?.opcional) : p.selecionados,
    }))
    setAviso(null)
  }

  function alternarPoder(id) {
    setPoderes((p) => ({
      ...p,
      selecionados: p.selecionados.includes(id)
        ? p.selecionados.filter((item) => item !== id)
        : [...p.selecionados, id],
    }))
    definirErro('poderes.valor', null)
    setAviso(null)
  }

  function escolherValidade(validade) {
    setPoderes((p) => ({ ...p, validade }))
    definirErro('poderes.data', null)
  }

  function limparPoderes() {
    setPoderes(poderesIniciais)
    setErros({})
    setAviso(null)
  }

  function voltarParaDados() {
    setEtapa('dados')
    setAviso(null)
    painelRef.current?.scrollTo({ top: 0 })
  }

  async function gerar() {
    if (!podeGerar || gerando) return

    // Causa própria (item 15) exige o valor de venda do veículo
    const valorVenda = centavosDe(poderes.valorVenda)
    if (precisaValorVenda && valorVenda === 0) {
      definirErro('poderes.valor', '')
      setAviso({ tipo: 'erro', texto: 'Informe o valor de venda do veículo.' })
      focarPrimeiroErro()
      return
    }

    if (poderes.validade === 'com') {
      if (!poderes.dataValidade) {
        definirErro('poderes.data', '')
        setAviso({ tipo: 'erro', texto: 'Escolha a data de validade da procuração.' })
        focarPrimeiroErro()
        return
      }
      if (poderes.dataValidade < hojeIso()) {
        definirErro('poderes.data', 'A data não pode ser anterior a hoje')
        focarPrimeiroErro()
        return
      }
    }

    const dados = {
      tipo,
      proprietario,
      procuradores,
      veiculo,
      amplos: ehAmplos,
      poderes: poderesIncluidos,
      valorVenda: precisaValorVenda ? valorVenda : null,
      validade: poderes.validade === 'com' ? poderes.dataValidade : null,
    }

    setGerando(true)
    setAviso(null)
    try {
      // O gerador de PDF só é baixado quando o usuário clica em Gerar
      const { gerarProcuracaoPdf, nomeArquivoProcuracao } = await import('../pdf/gerarProcuracaoPdf.js')
      const resultado = await salvarArquivo(nomeArquivoProcuracao(veiculo), async () => {
        // Logo do usuário (Perfil). Sem logo, a procuração sai normalmente.
        const logo = usuario ? await baixarLogo(usuario.id) : null
        return gerarProcuracaoPdf({ ...dados, logo })
      })
      if (resultado !== 'cancelado') setAviso({ tipo: 'ok', texto: 'Procuração gerada com sucesso.' })
    } catch (erro) {
      console.error(erro)
      setAviso({ tipo: 'erro', texto: 'Não foi possível gerar o PDF. Tente novamente.' })
    } finally {
      setGerando(false)
    }
  }

  // ---------- Tela ----------

  return (
    <div className="painel" ref={painelRef}>
      <header className="pn-cabecalho">
        <div>
          <h1>Gerador de Procuração</h1>
          <p>{etapa === 'dados' ? 'Etapa 1 de 2 · Dados das partes e do veículo' : 'Etapa 2 de 2 · Poderes e validade'}</p>
        </div>
        <ol className="pn-etapas" aria-label="Etapas">
          <li className={etapa === 'dados' ? 'atual' : 'feita'}>1</li>
          <li className={etapa === 'poderes' ? 'atual' : ''}>2</li>
        </ol>
      </header>

      {etapa === 'dados' ? (
        <form className="pn-form" noValidate onSubmit={irParaPoderes}>
          <section className="pn-secao">
            <h2>Proprietário (outorgante)</h2>

            <div
              className={`pn-escolha ${'tipo' in erros ? 'pn-invalido' : ''}`}
              role="radiogroup"
              aria-label="Tipo de pessoa"
              data-erro={'tipo' in erros || undefined}
            >
              <label className={tipo === 'fisica' ? 'ativa' : ''}>
                <input
                  type="radio"
                  name="tipo-pessoa"
                  checked={tipo === 'fisica'}
                  onChange={() => escolherTipo('fisica')}
                />
                Pessoa Física
              </label>
              <label className={tipo === 'juridica' ? 'ativa' : ''}>
                <input
                  type="radio"
                  name="tipo-pessoa"
                  checked={tipo === 'juridica'}
                  onChange={() => escolherTipo('juridica')}
                />
                Pessoa Jurídica
              </label>
            </div>
            {!tipo && (
              <p className={`pn-dica ${'tipo' in erros ? 'pn-dica-erro' : ''}`}>
                Escolha Pessoa Física ou Pessoa Jurídica para liberar os campos.
              </p>
            )}
          </section>

          {/* Tudo abaixo fica travado até escolher o tipo de pessoa */}
          <fieldset className="pn-travavel" disabled={!tipo}>
            <section className="pn-secao pn-secao-colada">
              <div className="pn-grade">
                <Campo
                  chave="prop.nome"
                  erros={erros}
                  rotulo="Proprietário"
                  obrigatorio
                  className="pn-col-2"
                  placeholder={ehJuridica ? 'Razão social' : 'Nome completo'}
                  value={proprietario.nome}
                  onChange={(e) => alterarProprietario('nome', e.target.value.toUpperCase())}
                />
                <Campo
                  chave="prop.documento"
                  erros={erros}
                  rotulo={tipo ? (ehJuridica ? 'CNPJ' : 'CPF') : 'CPF ou CNPJ'}
                  obrigatorio
                  inputMode={ehJuridica ? 'text' : 'numeric'}
                  placeholder={ehJuridica ? '00.000.000/0000-00' : '000.000.000-00'}
                  value={proprietario.documento}
                  onChange={(e) =>
                    alterarProprietario(
                      'documento',
                      ehJuridica ? formatarCnpj(e.target.value) : formatarCpf(e.target.value),
                    )
                  }
                  onBlur={(e) => conferirAoSair('prop.documento', regrasProprietario.documento, e.target.value)}
                />
                {!ehJuridica && (
                  <Campo
                    chave="prop.rg"
                    erros={erros}
                    rotulo="RG do proprietário"
                    maxLength={20}
                    placeholder="Número do RG"
                    value={proprietario.rg}
                    onChange={(e) => alterarProprietario('rg', e.target.value.toUpperCase())}
                  />
                )}
                <Campo
                  chave="prop.telefone"
                  erros={erros}
                  rotulo="Telefone do proprietário"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(00) 00000-0000"
                  value={proprietario.telefone}
                  onChange={(e) => alterarProprietario('telefone', formatarTelefone(e.target.value))}
                  onBlur={(e) => conferirAoSair('prop.telefone', regrasProprietario.telefone, e.target.value)}
                />
                <Campo
                  chave="prop.endereco"
                  erros={erros}
                  rotulo="Endereço"
                  className="pn-col-linha"
                  maxLength={LIMITE_ENDERECO}
                  contador={proprietario.endereco.length}
                  placeholder="Rua, número, bairro, cidade/UF"
                  value={proprietario.endereco}
                  onChange={(e) => alterarProprietario('endereco', e.target.value)}
                />
              </div>
            </section>

            <section className="pn-secao">
              <h2>Procuradores</h2>

              {procuradores.map((p, indice) => {
                const cnpj = ehCnpj(p.documento)
                return (
                  <div className="pn-procurador" key={p.id}>
                    <div className="pn-procurador-topo">
                      <h3>Procurador {indice + 1}</h3>
                      {indice > 0 && (
                        <button
                          type="button"
                          className="pn-remover"
                          onClick={() => removerProcurador(p.id)}
                          aria-label={`Remover procurador ${indice + 1}`}
                        >
                          <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
                          Remover
                        </button>
                      )}
                    </div>
                    <div className="pn-grade">
                      <Campo
                        chave={`proc.${p.id}.nome`}
                        erros={erros}
                        rotulo={`Procurador ${indice + 1}`}
                        obrigatorio
                        className="pn-col-2"
                        placeholder="Nome completo ou razão social"
                        value={p.nome}
                        onChange={(e) => alterarProcurador(p.id, 'nome', e.target.value.toUpperCase())}
                      />
                      <Campo
                        chave={`proc.${p.id}.documento`}
                        erros={erros}
                        rotulo={`CPF ou CNPJ procurador ${indice + 1}`}
                        obrigatorio
                        placeholder="CPF ou CNPJ"
                        value={p.documento}
                        onChange={(e) => alterarProcurador(p.id, 'documento', formatarCpfOuCnpj(e.target.value))}
                        onBlur={(e) =>
                          conferirAoSair(`proc.${p.id}.documento`, regrasProcurador.documento, e.target.value)
                        }
                      />
                      {!cnpj && (
                        <Campo
                          chave={`proc.${p.id}.rg`}
                          erros={erros}
                          rotulo={`RG procurador ${indice + 1}`}
                          maxLength={20}
                          placeholder="Número do RG"
                          value={p.rg}
                          onChange={(e) => alterarProcurador(p.id, 'rg', e.target.value.toUpperCase())}
                        />
                      )}
                      <Campo
                        chave={`proc.${p.id}.endereco`}
                        erros={erros}
                        rotulo="Endereço"
                        className={cnpj ? 'pn-col-linha' : 'pn-col-2'}
                        maxLength={LIMITE_ENDERECO}
                        contador={p.endereco.length}
                        placeholder="Rua, número, bairro, cidade/UF"
                        value={p.endereco}
                        onChange={(e) => alterarProcurador(p.id, 'endereco', e.target.value)}
                      />
                    </div>
                  </div>
                )
              })}

              <button
                type="button"
                className="pn-adicionar"
                onClick={adicionarProcurador}
                disabled={procuradores.length >= LIMITE_PROCURADORES}
              >
                <ion-icon name="add-circle-outline" aria-hidden="true"></ion-icon>
                {procuradores.length >= LIMITE_PROCURADORES
                  ? 'Limite de 5 procuradores'
                  : `Adicionar procurador (${procuradores.length}/${LIMITE_PROCURADORES})`}
              </button>
            </section>

            <section className="pn-secao">
              <h2>Veículo</h2>
              <div className="pn-grade">
                <Campo
                  chave="vei.placa"
                  erros={erros}
                  rotulo="Placa"
                  obrigatorio
                  placeholder="ABC-1234 ou ABC1D23"
                  value={veiculo.placa}
                  onChange={(e) => alterarVeiculo('placa', formatarPlaca(e.target.value))}
                  onBlur={(e) => conferirAoSair('vei.placa', regrasVeiculo.placa, e.target.value)}
                />
                <Campo
                  chave="vei.renavam"
                  erros={erros}
                  rotulo="RENAVAM"
                  obrigatorio
                  inputMode="numeric"
                  placeholder="00000000000"
                  value={veiculo.renavam}
                  onChange={(e) => alterarVeiculo('renavam', somenteDigitos(e.target.value).slice(0, 11))}
                  onBlur={(e) => conferirAoSair('vei.renavam', regrasVeiculo.renavam, e.target.value)}
                />
                <Campo
                  chave="vei.marcaModelo"
                  erros={erros}
                  rotulo="Marca/Modelo"
                  obrigatorio
                  maxLength={60}
                  placeholder="Ex.: VW/GOLF 1.6"
                  value={veiculo.marcaModelo}
                  onChange={(e) => alterarVeiculo('marcaModelo', e.target.value.toUpperCase())}
                />
                <Campo
                  chave="vei.chassi"
                  erros={erros}
                  rotulo="Chassi"
                  obrigatorio
                  placeholder="17 caracteres"
                  value={veiculo.chassi}
                  onChange={(e) => alterarVeiculo('chassi', formatarChassi(e.target.value))}
                />
                <Campo
                  chave="vei.anoFabricacao"
                  erros={erros}
                  rotulo="Ano fabricação"
                  obrigatorio
                  inputMode="numeric"
                  placeholder="AAAA"
                  value={veiculo.anoFabricacao}
                  onChange={(e) => alterarVeiculo('anoFabricacao', somenteDigitos(e.target.value).slice(0, 4))}
                  onBlur={(e) => conferirAoSair('vei.anoFabricacao', regrasVeiculo.anoFabricacao, e.target.value)}
                />
                <Campo
                  chave="vei.anoModelo"
                  erros={erros}
                  rotulo="Ano modelo"
                  obrigatorio
                  inputMode="numeric"
                  placeholder="AAAA"
                  value={veiculo.anoModelo}
                  onChange={(e) => alterarVeiculo('anoModelo', somenteDigitos(e.target.value).slice(0, 4))}
                  onBlur={(e) => conferirAoSair('vei.anoModelo', regrasVeiculo.anoModelo, e.target.value)}
                />
                <Campo
                  chave="vei.cor"
                  erros={erros}
                  rotulo="Cor"
                  obrigatorio
                  maxLength={20}
                  placeholder="Ex.: Branco"
                  value={veiculo.cor}
                  onChange={(e) => alterarVeiculo('cor', e.target.value.toUpperCase())}
                />
              </div>
            </section>
          </fieldset>

          <Rodape aviso={aviso}>
            <button type="button" className="pn-botao pn-botao-contorno" onClick={() => navigate('/app')}>
              <ion-icon name="arrow-undo-outline" aria-hidden="true"></ion-icon>
              Voltar
            </button>
            <button type="button" className="pn-botao pn-botao-leve" onClick={preencher}>
              Preencher
            </button>
            <button type="button" className="pn-botao pn-botao-leve" onClick={limparDados}>
              Limpar
            </button>
            <button type="submit" className="pn-botao pn-botao-principal">
              Próximo
              <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
            </button>
          </Rodape>
        </form>
      ) : (
        <div className="pn-form">
          <section className="pn-secao">
            <h2>Tipo da procuração</h2>
            <div className="pn-modos" role="radiogroup" aria-label="Tipo da procuração">
              <label className={`pn-modo ${poderes.modo === 'amplos' ? 'ativa' : ''}`}>
                <input
                  type="radio"
                  name="modo-poderes"
                  checked={poderes.modo === 'amplos'}
                  onChange={() => escolherModo('amplos')}
                />
                <span>
                  <strong>Procuração de amplos poderes</strong>
                  <small>
                    Inclui os poderes da lista abaixo.
                    {PODERES.some((p) => p.opcional) && ' A causa própria é opcional: marque se quiser.'}
                  </small>
                </span>
              </label>
              <label className={`pn-modo ${poderes.modo === 'especificos' ? 'ativa' : ''}`}>
                <input
                  type="radio"
                  name="modo-poderes"
                  checked={poderes.modo === 'especificos'}
                  onChange={() => escolherModo('especificos')}
                />
                <span>
                  <strong>Poderes específicos</strong>
                  <small>Escolha um ou mais poderes da lista abaixo.</small>
                </span>
              </label>
            </div>

            {/* Em "amplos", os poderes fixos aparecem marcados e travados; só os opcionais
                (item 15) podem ser marcados. Em "específicos", todos ficam livres. */}
            <fieldset className="pn-poderes" disabled={poderes.modo === null}>
              <legend>{ehAmplos ? 'Poderes incluídos' : 'Poderes específicos'}</legend>
              {PODERES.map((poder) => {
                const travado = ehAmplos && !poder.opcional
                return (
                  <label key={poder.id} className="pn-poder">
                    <input
                      type="checkbox"
                      checked={poderesIncluidos.includes(poder)}
                      disabled={travado}
                      onChange={() => alternarPoder(poder.id)}
                    />
                    <span>
                      <strong>
                        {poder.id}. {poder.titulo}
                        {poder.opcional && <em className="pn-selo">opcional</em>}
                      </strong>
                      <small>{textoNaTela(poder)}</small>
                    </span>
                  </label>
                )
              })}
            </fieldset>
          </section>

          {/* Valor de venda: só aparece (e só é obrigatório) com a causa própria marcada */}
          {precisaValorVenda && (
            <section className="pn-secao">
              <h2>Valor de venda do veículo</h2>
              <p className="pn-dica">
                A procuração em causa própria precisa informar o valor de venda do veículo.
              </p>
              <div className="pn-grade">
                <Campo
                  chave="poderes.valor"
                  erros={erros}
                  rotulo="Valor de venda"
                  obrigatorio
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  value={poderes.valorVenda}
                  onChange={(e) => {
                    setPoderes((p) => ({ ...p, valorVenda: formatarMoeda(e.target.value) }))
                    definirErro('poderes.valor', null)
                    setAviso(null)
                  }}
                />
              </div>
              {centavosDe(poderes.valorVenda) > 0 && (
                <p className="pn-dica pn-extenso">({valorPorExtenso(centavosDe(poderes.valorVenda))})</p>
              )}
            </section>
          )}

          <section className="pn-secao">
            <h2>Validade</h2>
            <div className="pn-escolha" role="radiogroup" aria-label="Validade">
              <label className={poderes.validade === 'com' ? 'ativa' : ''}>
                <input
                  type="radio"
                  name="validade"
                  checked={poderes.validade === 'com'}
                  onChange={() => escolherValidade('com')}
                />
                Com validade
              </label>
              <label className={poderes.validade === 'sem' ? 'ativa' : ''}>
                <input
                  type="radio"
                  name="validade"
                  checked={poderes.validade === 'sem'}
                  onChange={() => escolherValidade('sem')}
                />
                Sem validade
              </label>
            </div>

            {poderes.validade === 'com' && (
              <div className="pn-grade">
                <Campo
                  chave="poderes.data"
                  erros={erros}
                  rotulo="Válida até"
                  obrigatorio
                  type="date"
                  min={hojeIso()}
                  value={poderes.dataValidade}
                  onChange={(e) => {
                    setPoderes((p) => ({ ...p, dataValidade: e.target.value }))
                    definirErro('poderes.data', null)
                  }}
                />
              </div>
            )}
          </section>

          <Rodape aviso={aviso}>
            <button type="button" className="pn-botao pn-botao-contorno" onClick={voltarParaDados}>
              <ion-icon name="arrow-undo-outline" aria-hidden="true"></ion-icon>
              Voltar
            </button>
            <button type="button" className="pn-botao pn-botao-leve" onClick={limparPoderes}>
              Limpar
            </button>
            <button
              type="button"
              className="pn-botao pn-botao-principal"
              onClick={gerar}
              disabled={!podeGerar || gerando}
            >
              <ion-icon name="document-text-outline" aria-hidden="true"></ion-icon>
              {gerando ? 'Gerando...' : 'Gerar'}
            </button>
          </Rodape>
        </div>
      )}
    </div>
  )
}

// Rótulo + campo + mensagem de erro (ou contador de caracteres)
function Campo({ chave, erros, rotulo, obrigatorio, contador, className = '', ...props }) {
  const temErro = chave in erros
  const mensagem = erros[chave]
  return (
    <div className={`pn-campo ${className}`}>
      <label htmlFor={chave}>
        {rotulo}
        {obrigatorio && <span className="pn-obrigatorio"> *</span>}
      </label>
      <input
        id={chave}
        type="text"
        className={temErro ? 'pn-invalido' : undefined}
        aria-invalid={temErro || undefined}
        data-erro={temErro || undefined}
        {...props}
      />
      {mensagem ? (
        <span className="pn-erro-texto">{mensagem}</span>
      ) : contador !== undefined && contador > 0 ? (
        <span className="pn-contador">
          {contador}/{LIMITE_ENDERECO}
        </span>
      ) : null}
    </div>
  )
}

// Barra de botões fixa no fim do painel, com o aviso (erro/sucesso) ao lado
function Rodape({ aviso, children }) {
  return (
    <div className="pn-rodape">
      {aviso && (
        <p className={`pn-aviso ${aviso.tipo === 'erro' ? 'pn-aviso-erro' : 'pn-aviso-ok'}`} role="status">
          {aviso.texto}
        </p>
      )}
      <div className="pn-botoes">{children}</div>
    </div>
  )
}
