// Gera o PDF da procuração (sempre em 1 página A4).
//
// O texto é montado e quebrado em linhas aqui mesmo, para sabermos a altura
// exata do conteúdo. Depois procuramos a maior escala de fonte que ainda cabe
// em uma página e desenhamos o documento nessa escala.

import { jsPDF } from 'jspdf'
import { ehCnpj } from '../utils/documentos.js'

const PAGINA = { largura: 210, altura: 297 } // A4 em mm
const MARGEM_X = 20
const MARGEM_TOPO = 16
const MARGEM_BASE = 14
const LARGURA_UTIL = PAGINA.largura - MARGEM_X * 2
const PT_PARA_MM = 25.4 / 72

const ESCALA_MINIMA = 0.5
const ESCALA_MAXIMA = 1.25

// Tamanhos em pontos na escala 1
const TAM_TITULO = 26
const TAM_TEXTO = 11.5

// Assinatura e logo do usuário (mm)
const LINHA_ASSINATURA = 90
const LOGO_LARGURA_MAX = 36
const LOGO_ALTURA_MAX = 24

// ---------- Fontes (Poppins, a mesma do site) ----------

let fontesCarregadas = null

async function carregarFontes() {
  if (fontesCarregadas) return fontesCarregadas
  try {
    const [regular, negrito] = await Promise.all(
      ['/fonts/Poppins-Regular.ttf', '/fonts/Poppins-SemiBold.ttf'].map(async (url) => {
        const resposta = await fetch(url)
        if (!resposta.ok) throw new Error(`Fonte não encontrada: ${url}`)
        return paraBase64(await resposta.arrayBuffer())
      }),
    )
    fontesCarregadas = { regular, negrito }
    return fontesCarregadas
  } catch (erro) {
    // Sem a Poppins, o PDF sai com Helvetica (fonte padrão do PDF)
    console.warn(erro)
    return null
  }
}

async function blobParaDataUrl(blob) {
  return `data:image/png;base64,${paraBase64(await blob.arrayBuffer())}`
}

function paraBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binario = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binario += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
  }
  return btoa(binario)
}

// ---------- Quebra de linhas com trechos em negrito ----------

// "trechos" = [{ texto, negrito }]. Palavras podem misturar negrito e normal
// (ex.: "**FULANO**," — a vírgula fica grudada no nome).
function separarPalavras(trechos) {
  const palavras = []
  let atual = []
  for (const trecho of trechos) {
    for (const parte of trecho.texto.split(/(\s+)/)) {
      if (parte === '') continue
      if (/^\s+$/.test(parte)) {
        if (atual.length) palavras.push(atual)
        atual = []
      } else {
        atual.push({ texto: parte, negrito: Boolean(trecho.negrito) })
      }
    }
  }
  if (atual.length) palavras.push(atual)
  return palavras
}

function criarFerramentas(doc, familia) {
  function medir(texto, negrito, tamanho) {
    doc.setFont(familia, negrito ? 'bold' : 'normal')
    doc.setFontSize(tamanho)
    return doc.getTextWidth(texto)
  }

  // Divide uma palavra que sozinha não cabe na linha (ex.: endereço sem espaços)
  function partirPalavraLonga(palavra, larguraMax, tamanho) {
    const pedacos = []
    let atual = []
    let larguraAtual = 0
    for (const seg of palavra) {
      for (const letra of seg.texto) {
        const l = medir(letra, seg.negrito, tamanho)
        if (larguraAtual + l > larguraMax && atual.length) {
          pedacos.push(atual)
          atual = []
          larguraAtual = 0
        }
        const ultimo = atual[atual.length - 1]
        if (ultimo && ultimo.negrito === seg.negrito) ultimo.texto += letra
        else atual.push({ texto: letra, negrito: seg.negrito })
        larguraAtual += l
      }
    }
    if (atual.length) pedacos.push(atual)
    return pedacos
  }

  function quebrarLinhas(trechos, larguraMax, tamanho) {
    const espaco = medir(' ', false, tamanho)
    const palavras = []
    for (const palavra of separarPalavras(trechos)) {
      const medida = (p) => ({
        segmentos: p.map((s) => ({ ...s, largura: medir(s.texto, s.negrito, tamanho) })),
      })
      let m = medida(palavra)
      m.largura = m.segmentos.reduce((soma, s) => soma + s.largura, 0)
      if (m.largura <= larguraMax) {
        palavras.push(m)
      } else {
        for (const pedaco of partirPalavraLonga(palavra, larguraMax, tamanho)) {
          m = medida(pedaco)
          m.largura = m.segmentos.reduce((soma, s) => soma + s.largura, 0)
          palavras.push(m)
        }
      }
    }

    const linhas = []
    let linha = []
    let larguraLinha = 0
    for (const palavra of palavras) {
      const extra = linha.length ? espaco + palavra.largura : palavra.largura
      if (linha.length && larguraLinha + extra > larguraMax) {
        linhas.push({ palavras: linha, largura: larguraLinha })
        linha = [palavra]
        larguraLinha = palavra.largura
      } else {
        linha.push(palavra)
        larguraLinha += extra
      }
    }
    if (linha.length) linhas.push({ palavras: linha, largura: larguraLinha })
    return { linhas, espaco }
  }

  function desenharLinha(linha, ehUltima, x, baseY, larguraMax, alinhamento, tamanho, espaco) {
    let folga = 0
    let inicio = x
    if (alinhamento === 'justificado' && !ehUltima && linha.palavras.length > 1) {
      folga = (larguraMax - linha.largura) / (linha.palavras.length - 1)
    } else if (alinhamento === 'centro') {
      inicio = x + (larguraMax - linha.largura) / 2
    }

    let cursor = inicio
    linha.palavras.forEach((palavra, i) => {
      for (const seg of palavra.segmentos) {
        doc.setFont(familia, seg.negrito ? 'bold' : 'normal')
        doc.setFontSize(tamanho)
        doc.text(seg.texto, cursor, baseY)
        cursor += seg.largura
      }
      if (i < linha.palavras.length - 1) cursor += espaco + folga
    })
  }

  return { quebrarLinhas, desenharLinha }
}

// ---------- Textos da procuração ----------

const n = (texto) => ({ texto, negrito: false })
const b = (texto) => ({ texto, negrito: true })

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

// Ex.: "22 de novembro de 2026"
function dataPorExtenso(data) {
  return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function trechosOutorgante(tipo, pessoa, plural) {
  const t = [n('Pelo presente instrumento particular de procuração, ')]
  if (tipo === 'juridica') {
    t.push(n('a empresa '), b(pessoa.nome.toUpperCase()), n(', CNPJ '), b(pessoa.documento))
    if (pessoa.endereco.trim()) t.push(n(`, com sede em ${pessoa.endereco.trim()}`))
    if (pessoa.telefone.trim()) t.push(n(`, telefone ${pessoa.telefone}`))
    t.push(n(plural ? ', nomeia e constitui seus bastantes procuradores:' : ', nomeia e constitui seu bastante procurador:'))
  } else {
    t.push(n('eu, '), b(pessoa.nome.toUpperCase()), n(', CPF '), b(pessoa.documento))
    if (pessoa.rg.trim()) t.push(n(', RG '), b(pessoa.rg.trim()))
    if (pessoa.endereco.trim()) t.push(n(`, com endereço em ${pessoa.endereco.trim()}`))
    if (pessoa.telefone.trim()) t.push(n(`, telefone ${pessoa.telefone}`))
    t.push(n(plural ? ', nomeio e constituo meus bastantes procuradores:' : ', nomeio e constituo meu bastante procurador:'))
  }
  return t
}

function trechosProcurador(pessoa, ehUltimo) {
  const cnpj = ehCnpj(pessoa.documento)
  const t = [b(pessoa.nome.toUpperCase()), n(cnpj ? ', CNPJ ' : ', CPF '), b(pessoa.documento)]
  if (!cnpj && pessoa.rg.trim()) t.push(n(', RG '), b(pessoa.rg.trim()))
  if (pessoa.endereco.trim()) {
    t.push(n(`${cnpj ? ', com sede em ' : ', com endereço em '}${pessoa.endereco.trim()}`))
  }
  t.push(n(ehUltimo ? '.' : ';'))
  return t
}

function textoIntroducao(amplos, plural) {
  if (amplos) {
    return plural
      ? 'Podendo assinar em conjunto ou isoladamente, para fim de vender ou transferir para si próprios, locar, comprar e permutar o veículo com as seguintes características:'
      : 'A fim de vender ou transferir para si próprio, locar, comprar e permutar o veículo com as seguintes características:'
  }
  return plural
    ? 'Podendo assinar em conjunto ou isoladamente, para representar o outorgante em relação ao veículo com as seguintes características:'
    : 'Para representar o outorgante em relação ao veículo com as seguintes características:'
}

// ---------- Montagem da página ----------

// Percorre o documento inteiro. Com "desenhar = false" só mede a altura.
function montar(doc, ferramentas, dados, escala, desenhar) {
  const { quebrarLinhas, desenharLinha } = ferramentas
  const tam = TAM_TEXTO * escala
  let y = MARGEM_TOPO

  function paragrafo(trechos, { tamanho = tam, alinhamento = 'justificado', recuo = 0, antes = 0, entrelinha = 1.45 } = {}) {
    y += antes * escala
    const largura = LARGURA_UTIL - recuo
    const { linhas, espaco } = quebrarLinhas(trechos, largura, tamanho)
    const alturaLinha = tamanho * PT_PARA_MM * entrelinha
    linhas.forEach((linha, i) => {
      // Linha de base do texto: centraliza a altura da letra dentro da altura da linha
      const baseY = y + alturaLinha / 2 + tamanho * PT_PARA_MM * 0.35
      if (desenhar) {
        desenharLinha(linha, i === linhas.length - 1, MARGEM_X + recuo, baseY, largura, alinhamento, tamanho, espaco)
      }
      y += alturaLinha
    })
  }

  // Bloco do veículo: 2 colunas, rótulo em cima e valor em negrito embaixo
  function blocoVeiculo(pares, antes) {
    y += antes * escala
    const vao = 10
    const larguraColuna = (LARGURA_UTIL - vao) / 2
    const alturaLinha = tam * PT_PARA_MM * 1.4
    for (const par of pares) {
      let maiorAltura = 0
      par.forEach(([rotulo, valor], coluna) => {
        const x = MARGEM_X + coluna * (larguraColuna + vao)
        let yCelula = y
        for (const trechos of [[n(rotulo)], [b(valor)]]) {
          const { linhas, espaco } = quebrarLinhas(trechos, larguraColuna, tam)
          for (const linha of linhas) {
            const baseY = yCelula + alturaLinha / 2 + tam * PT_PARA_MM * 0.35
            if (desenhar) desenharLinha(linha, true, x, baseY, larguraColuna, 'centro', tam, espaco)
            yCelula += alturaLinha
          }
        }
        maiorAltura = Math.max(maiorAltura, yCelula - y)
      })
      y += maiorAltura + 1.2 * escala
    }
  }

  const { tipo, proprietario, procuradores, veiculo, poderes, amplos, validade } = dados
  const plural = procuradores.length > 1

  // Título
  paragrafo([n('Procuração')], { tamanho: TAM_TITULO * escala, alinhamento: 'centro', entrelinha: 1.2 })

  // Outorgante e procuradores
  paragrafo(trechosOutorgante(tipo, proprietario, plural), { antes: 6 })
  procuradores.forEach((p, i) => {
    paragrafo(trechosProcurador(p, i === procuradores.length - 1), { recuo: 8, antes: i === 0 ? 2.5 : 1.2 })
  })

  // Veículo
  paragrafo([n(textoIntroducao(amplos, plural))], { antes: 4 })
  blocoVeiculo(
    [
      [['Marca/Modelo:', veiculo.marcaModelo.toUpperCase()], ['Chassi:', veiculo.chassi.toUpperCase()]],
      [['Placa:', veiculo.placa.toUpperCase()], ['Ano Fab./Modelo:', `${veiculo.anoFabricacao} / ${veiculo.anoModelo}`]],
      [['Renavam:', veiculo.renavam], ['Cor do veículo:', veiculo.cor.toUpperCase()]],
    ],
    3.5,
  )

  // Poderes
  paragrafo([n(poderes.map((p) => p.texto).join(' '))], { antes: 3 })

  // Validade (em negrito)
  if (validade) {
    paragrafo([b(`Procuração válida até ${formatarData(validade)}.`)], { alinhamento: 'centro', antes: 4 })
  }

  // Data de emissão (sempre a data do dia em que a procuração é gerada)
  paragrafo([n(dataPorExtenso(dados.dataEmissao))], { alinhamento: 'centro', antes: 9 })

  // Assinatura
  y += 16 * escala
  const linhaY = y
  if (desenhar) {
    doc.setLineWidth(0.3)
    doc.line(PAGINA.largura / 2 - LINHA_ASSINATURA / 2, y, PAGINA.largura / 2 + LINHA_ASSINATURA / 2, y)
  }
  paragrafo([b(proprietario.nome.toUpperCase())], { alinhamento: 'centro', antes: 1.5, entrelinha: 1.3 })
  paragrafo([n(`${tipo === 'juridica' ? 'CNPJ' : 'CPF'}: ${proprietario.documento}`)], {
    alinhamento: 'centro',
    entrelinha: 1.3,
  })

  // Logo do usuário: canto inferior direito, ao lado da assinatura
  if (dados.logo) {
    const { dataUrl, largura, altura } = dados.logo
    const proporcao = Math.min(LOGO_LARGURA_MAX / largura, LOGO_ALTURA_MAX / altura)
    const w = largura * proporcao
    const h = altura * proporcao
    const centroY = (linhaY + y) / 2
    const topo = centroY - h / 2
    if (desenhar) doc.addImage(dataUrl, 'PNG', PAGINA.largura - MARGEM_X - w, topo, w, h, 'logo', 'FAST')
    y = Math.max(y, topo + h)
  }

  return y + MARGEM_BASE
}

// Maior escala em que o documento ainda cabe em uma página
function encontrarEscala(doc, ferramentas, dados) {
  if (montar(doc, ferramentas, dados, ESCALA_MAXIMA, false) <= PAGINA.altura) return ESCALA_MAXIMA
  let menor = ESCALA_MINIMA
  let maior = ESCALA_MAXIMA
  for (let i = 0; i < 14; i++) {
    const meio = (menor + maior) / 2
    if (montar(doc, ferramentas, dados, meio, false) <= PAGINA.altura) menor = meio
    else maior = meio
  }
  return menor
}

/**
 * dados = {
 *   tipo: 'fisica' | 'juridica',
 *   proprietario: { nome, documento, rg, endereco, telefone },
 *   procuradores: [{ nome, documento, rg, endereco }],
 *   veiculo: { placa, renavam, marcaModelo, chassi, anoFabricacao, anoModelo, cor },
 *   poderes: [{ texto }],   // já filtrados (todos, se amplos)
 *   amplos: boolean,
 *   validade: 'AAAA-MM-DD' | null,
 *   logo: Blob (PNG) | null,  // logo do usuário, opcional
 * }
 */
export async function gerarProcuracaoPdf(entrada) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
  const dados = { ...entrada, dataEmissao: new Date(), logo: null }

  if (entrada.logo) {
    try {
      const dataUrl = await blobParaDataUrl(entrada.logo)
      const { width, height } = doc.getImageProperties(dataUrl)
      if (width > 0 && height > 0) dados.logo = { dataUrl, largura: width, altura: height }
    } catch (erro) {
      // Logo com problema não impede de gerar a procuração
      console.warn('Logo ignorada:', erro)
    }
  }
  doc.setProperties({ title: 'Procuração', creator: 'AutoSync' })

  let familia = 'helvetica'
  const fontes = await carregarFontes()
  if (fontes) {
    doc.addFileToVFS('Poppins-Regular.ttf', fontes.regular)
    doc.addFont('Poppins-Regular.ttf', 'Poppins', 'normal')
    doc.addFileToVFS('Poppins-SemiBold.ttf', fontes.negrito)
    doc.addFont('Poppins-SemiBold.ttf', 'Poppins', 'bold')
    familia = 'Poppins'
  }

  const ferramentas = criarFerramentas(doc, familia)
  const escala = encontrarEscala(doc, ferramentas, dados)
  montar(doc, ferramentas, dados, escala, true)

  return doc.output('blob')
}

export function nomeArquivoProcuracao(veiculo) {
  // Ex.: Procuracao_FERRARI_456_GT_JTV6591.pdf
  const limpar = (texto) =>
    texto
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toUpperCase()
      .replace(/[^A-Z0-9 ]+/g, '')
      .trim()
      .replace(/\s+/g, '_')
  const partes = [limpar(veiculo.marcaModelo), limpar(veiculo.placa)].filter(Boolean)
  return `${['Procuracao', ...partes].join('_')}.pdf`
}
