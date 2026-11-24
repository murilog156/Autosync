// Valores em reais: máscara "R$ 1.234,56" (até R$ 9.999.999,99) e valor por extenso.
// Internamente o valor é guardado em centavos (número inteiro), para evitar
// erros de arredondamento.

export const MOEDA_MAX_CENTAVOS = 999_999_999 // R$ 9.999.999,99

// Converte o que foi digitado em centavos: "R$ 1.234,56" -> 123456
export function centavosDe(texto) {
  const digitos = String(texto).replace(/\D/g, '').replace(/^0+/, '')
  return digitos ? Number(digitos) : 0
}

// Máscara enquanto o usuário digita: os números entram pela direita (centavos).
// Ignora dígitos que passariam do limite de R$ 9.999.999,99.
export function formatarMoeda(texto) {
  const digitos = String(texto).replace(/\D/g, '').replace(/^0+/, '').slice(0, 9)
  if (!digitos) return ''
  return reais(Number(digitos))
}

// 123456 -> "R$ 1.234,56" (com espaço "inquebrável" depois do R$, para o valor
// nunca ficar separado do símbolo na quebra de linha)
export function reais(centavos) {
  return (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\s/g, ' ')
}

// ---------- Valor por extenso ----------

const UNIDADES = [
  '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
  'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove',
]
const DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
const CENTENAS = [
  '', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos',
  'seiscentos', 'setecentos', 'oitocentos', 'novecentos',
]

// 0 a 999
function grupoPorExtenso(n) {
  if (n === 100) return 'cem'
  const partes = []
  const centena = Math.floor(n / 100)
  const resto = n % 100
  if (centena) partes.push(CENTENAS[centena])
  if (resto) {
    if (resto < 20) partes.push(UNIDADES[resto])
    else {
      const unidade = resto % 10
      partes.push(unidade ? `${DEZENAS[Math.floor(resto / 10)]} e ${UNIDADES[unidade]}` : DEZENAS[Math.floor(resto / 10)])
    }
  }
  return partes.join(' e ')
}

// 0 a 9.999.999 (parte inteira)
function inteiroPorExtenso(n) {
  const milhoes = Math.floor(n / 1_000_000)
  const milhares = Math.floor(n / 1000) % 1000
  const resto = n % 1000

  const grupos = [] // [texto, valor do grupo]
  if (milhoes) grupos.push([`${grupoPorExtenso(milhoes)} ${milhoes === 1 ? 'milhão' : 'milhões'}`, milhoes])
  if (milhares) grupos.push([milhares === 1 ? 'mil' : `${grupoPorExtenso(milhares)} mil`, milhares])
  if (resto) grupos.push([grupoPorExtenso(resto), resto])

  // "mil e duzentos", "mil e cinquenta", mas "mil duzentos e trinta"
  return grupos
    .map(([texto, valor], i) => {
      if (i === 0) return texto
      const ultimo = i === grupos.length - 1
      return (ultimo && (valor < 100 || valor % 100 === 0) ? ' e ' : ' ') + texto
    })
    .join('')
}

// 123456 -> "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"
export function valorPorExtenso(centavos) {
  const inteiro = Math.floor(centavos / 100)
  const cents = centavos % 100
  const partes = []

  if (inteiro) {
    let texto = inteiroPorExtenso(inteiro)
    // "um milhão de reais", "dois milhões de reais"
    if (inteiro % 1_000_000 === 0) texto += ' de'
    partes.push(`${texto} ${inteiro === 1 ? 'real' : 'reais'}`)
  }
  if (cents) partes.push(`${grupoPorExtenso(cents)} ${cents === 1 ? 'centavo' : 'centavos'}`)

  return partes.join(' e ') || 'zero reais'
}
