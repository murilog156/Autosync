// Gera o PDF da procuração (sempre em 1 página A4), em fonte Times.
//
// O texto é montado e quebrado em linhas aqui mesmo, para sabermos a altura
// exata do conteúdo. Depois procuramos a maior escala de fonte que ainda cabe
// em uma página e desenhamos o documento nessa escala.

import { jsPDF } from 'jspdf'
import { ehCnpj } from '../utils/documentos.js'
import { reais, valorPorExtenso } from '../utils/moeda.js'
import { MARCADOR_VALOR } from '../data/poderes.js'

// Times embutida no PDF (mesmo desenho e medidas da Times New Roman)
const FONTE = 'times'

const PAGINA = { largura: 210, altura: 297 } // A4 em mm
const MARGEM_X = 22
const MARGEM_TOPO = 18
const MARGEM_BASE = 15
const LARGURA_UTIL = PAGINA.largura - MARGEM_X * 2
const PT_PARA_MM = 25.4 / 72

const ESCALA_MINIMA = 0.5
const ESCALA_MAXIMA = 1.15

// Tamanhos na escala 1 (pontos para fonte, mm para espaços)
const TAM_TITULO = 18
const TAM_TEXTO = 12
const ENTRELINHA = 1.42
const RECUO_PARAGRAFO = 12 // recuo da primeira linha dos parágrafos
const RECUO_PROCURADORES = 8

// Assinatura e logo do usuário (mm)
const LINHA_ASSINATURA = 90
const LOGO_LARGURA_MAX = 36
const LOGO_ALTURA_MAX = 24

const COR_TEXTO = [20, 20, 20]
const COR_LINHAS = [150, 150, 150]

async function blobParaDataUrl(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer())
  let binario = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binario += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
  }
  return `data:image/png;base64,${btoa(binario)}`
}

// ---------- Quebra de linhas com trechos em negrito ----------

// "trechos" = [{ texto, negrito }]. Palavras podem misturar negrito e normal
// (ex.: "**FULANO**," — a vírgula fica grudada no nome).
function separarPalavras(trechos) {
  const palavras = []
  let atual = []
  for (const trecho of trechos) {
    // Quebra só em espaços comuns: o espaço inquebrável ( ) mantém "R$ 1.000,00" junto
    for (const parte of trecho.texto.split(/([ \t\r\n]+)/)) {
      if (parte === '') continue
      if (/^[ \t\r\n]+$/.test(parte)) {
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

function criarFerramentas(doc) {
  // Mede sem "kerning": o jsPDF desconta o kerning ao medir, mas não ao desenhar
  // as fontes padrão (Times), o que fazia palavras "engolirem" o espaço seguinte.
  function medir(texto, negrito, tamanho) {
    doc.setFont(FONTE, negrito ? 'bold' : 'normal')
    doc.setFontSize(tamanho)
    return (doc.getStringUnitWidth(texto, { doKerning: false }) * tamanho) / doc.internal.scaleFactor
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

  // "recuoPrimeira": a primeira linha fica mais estreita (recuo de parágrafo)
  function quebrarLinhas(trechos, larguraMax, tamanho, recuoPrimeira = 0) {
    const espaco = medir(' ', false, tamanho)
    const medirPalavra = (p) => {
      const segmentos = p.map((s) => ({ ...s, largura: medir(s.texto, s.negrito, tamanho) }))
      return { segmentos, largura: segmentos.reduce((soma, s) => soma + s.largura, 0) }
    }

    const palavras = []
    for (const palavra of separarPalavras(trechos)) {
      const m = medirPalavra(palavra)
      if (m.largura <= larguraMax - recuoPrimeira) palavras.push(m)
      else partirPalavraLonga(palavra, larguraMax - recuoPrimeira, tamanho).forEach((p) => palavras.push(medirPalavra(p)))
    }

    const linhas = []
    let linha = []
    let larguraLinha = 0
    const limite = () => larguraMax - (linhas.length === 0 ? recuoPrimeira : 0)
    for (const palavra of palavras) {
      const extra = linha.length ? espaco + palavra.largura : palavra.largura
      if (linha.length && larguraLinha + extra > limite()) {
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
        doc.setFont(FONTE, seg.negrito ? 'bold' : 'normal')
        doc.setFontSize(tamanho)
        doc.text(seg.texto, cursor, baseY)
        cursor += seg.largura
      }
      if (i < linha.palavras.length - 1) cursor += espaco + folga
    })
  }

  return { medir, quebrarLinhas, desenharLinha }
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

// Texto corrido dos poderes; o valor de venda (causa própria) sai em negrito
function trechosPoderes(poderes, valorVenda) {
  const trechos = []
  poderes.forEach((poder, i) => {
    const separador = i === 0 ? '' : ' '
    const [antes, depois] = poder.texto.split(MARCADOR_VALOR)
    if (depois === undefined) {
      trechos.push(n(separador + poder.texto))
    } else {
      trechos.push(
        n(separador + antes),
        b(reais(valorVenda)),
        n(` (${valorPorExtenso(valorVenda)})${depois}`),
      )
    }
  })
  return trechos
}

// ---------- Montagem da página ----------

// Percorre o documento inteiro. Com "desenhar = false" só mede a altura.
function montar(doc, ferramentas, dados, escala, desenhar) {
  const { medir, quebrarLinhas, desenharLinha } = ferramentas
  const tam = TAM_TEXTO * escala
  let y = MARGEM_TOPO

  function paragrafo(
    trechos,
    { tamanho = tam, alinhamento = 'justificado', recuo = 0, recuoPrimeira = 0, antes = 0, entrelinha = ENTRELINHA } = {},
  ) {
    y += antes * escala
    const largura = LARGURA_UTIL - recuo
    const { linhas, espaco } = quebrarLinhas(trechos, largura, tamanho, recuoPrimeira)
    const alturaLinha = tamanho * PT_PARA_MM * entrelinha
    linhas.forEach((linha, i) => {
      // Linha de base do texto: centraliza a altura da letra dentro da altura da linha
      const baseY = y + alturaLinha / 2 + tamanho * PT_PARA_MM * 0.33
      const deslocamento = i === 0 ? recuoPrimeira : 0
      if (desenhar) {
        desenharLinha(
          linha,
          i === linhas.length - 1,
          MARGEM_X + recuo + deslocamento,
          baseY,
          largura - deslocamento,
          alinhamento,
          tamanho,
          espaco,
        )
      }
      y += alturaLinha
    })
  }

  // Título "PROCURAÇÃO" espaçado, com um traço fino embaixo
  function titulo(texto, antesTraco) {
    const tamanho = TAM_TITULO * escala
    const espacamento = 1.2 * escala
    const largura = medir(texto, true, tamanho) + espacamento * (texto.length - 1)
    const altura = tamanho * PT_PARA_MM
    if (desenhar) {
      doc.setFont(FONTE, 'bold')
      doc.setFontSize(tamanho)
      doc.text(texto, (PAGINA.largura - largura) / 2, y + altura * 0.8, { charSpace: espacamento })
    }
    y += altura + antesTraco * escala
    if (desenhar) {
      doc.setDrawColor(...COR_LINHAS)
      doc.setLineWidth(0.3)
      doc.line(PAGINA.largura / 2 - 18, y, PAGINA.largura / 2 + 18, y)
    }
  }

  // Tabela do veículo: 3 linhas × 2 colunas, "Rótulo: VALOR" em cada célula
  function tabelaVeiculo(linhasTabela, antes) {
    y += antes * escala
    const larguraColuna = LARGURA_UTIL / 2
    const folgaX = 3 * escala
    const folgaY = 1.6 * escala
    const alturaLinha = tam * PT_PARA_MM * 1.25
    const inicio = y

    for (const celulas of linhasTabela) {
      const conteudos = celulas.map(([rotulo, valor]) =>
        quebrarLinhas([n(`${rotulo}: `), b(valor)], larguraColuna - folgaX * 2, tam),
      )
      const alturaCelula = Math.max(...conteudos.map((c) => c.linhas.length)) * alturaLinha + folgaY * 2
      if (desenhar) {
        conteudos.forEach(({ linhas, espaco }, coluna) => {
          linhas.forEach((linha, i) => {
            const baseY = y + folgaY + alturaLinha * i + alturaLinha / 2 + tam * PT_PARA_MM * 0.33
            desenharLinha(linha, true, MARGEM_X + coluna * larguraColuna + folgaX, baseY, larguraColuna, 'esquerda', tam, espaco)
          })
        })
      }
      y += alturaCelula
      if (desenhar) {
        doc.setDrawColor(...COR_LINHAS)
        doc.setLineWidth(0.2)
        doc.line(MARGEM_X, y, MARGEM_X + LARGURA_UTIL, y) // linha entre as linhas da tabela
      }
    }

    if (desenhar) {
      doc.setDrawColor(...COR_LINHAS)
      doc.setLineWidth(0.25)
      doc.rect(MARGEM_X, inicio, LARGURA_UTIL, y - inicio) // contorno
      doc.line(MARGEM_X + larguraColuna, inicio, MARGEM_X + larguraColuna, y) // divisória do meio
    }
  }

  const { tipo, proprietario, procuradores, veiculo, poderes, amplos, validade, valorVenda } = dados
  const plural = procuradores.length > 1

  if (desenhar) doc.setTextColor(...COR_TEXTO)

  titulo('PROCURAÇÃO', 2.5)

  // Outorgante e procuradores
  paragrafo(trechosOutorgante(tipo, proprietario, plural), { antes: 8, recuoPrimeira: RECUO_PARAGRAFO * escala })
  procuradores.forEach((p, i) => {
    paragrafo(trechosProcurador(p, i === procuradores.length - 1), {
      recuo: RECUO_PROCURADORES * escala,
      antes: i === 0 ? 2.5 : 1.2,
    })
  })

  // Veículo
  paragrafo([n(textoIntroducao(amplos, plural))], { antes: 3.5, recuoPrimeira: RECUO_PARAGRAFO * escala })
  tabelaVeiculo(
    [
      [['Marca/Modelo', veiculo.marcaModelo.toUpperCase()], ['Chassi', veiculo.chassi.toUpperCase()]],
      [['Placa', veiculo.placa.toUpperCase()], ['Ano Fab./Modelo', `${veiculo.anoFabricacao}/${veiculo.anoModelo}`]],
      [['Renavam', veiculo.renavam], ['Cor', veiculo.cor.toUpperCase()]],
    ],
    3,
  )

  // Poderes
  paragrafo(trechosPoderes(poderes, valorVenda), { antes: 4, recuoPrimeira: RECUO_PARAGRAFO * escala })

  // Validade (em negrito)
  if (validade) {
    paragrafo([b(`Procuração válida até ${formatarData(validade)}.`)], { alinhamento: 'centro', antes: 4 })
  }

  // Data de emissão (sempre a data do dia em que a procuração é gerada)
  paragrafo([n(`${dataPorExtenso(dados.dataEmissao)}.`)], { alinhamento: 'centro', antes: 8 })

  // Assinatura
  y += 16 * escala
  const linhaY = y
  if (desenhar) {
    doc.setDrawColor(40, 40, 40)
    doc.setLineWidth(0.3)
    doc.line(PAGINA.largura / 2 - LINHA_ASSINATURA / 2, y, PAGINA.largura / 2 + LINHA_ASSINATURA / 2, y)
  }
  paragrafo([b(proprietario.nome.toUpperCase())], { alinhamento: 'centro', antes: 1.2, entrelinha: 1.25 })
  paragrafo([n(`${tipo === 'juridica' ? 'CNPJ' : 'CPF'}: ${proprietario.documento}`)], {
    alinhamento: 'centro',
    entrelinha: 1.25,
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
 *   poderes: [{ texto }],     // já filtrados, na ordem
 *   amplos: boolean,
 *   valorVenda: centavos | null,  // obrigatório se algum poder tiver {VALOR}
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

  const ferramentas = criarFerramentas(doc)
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
