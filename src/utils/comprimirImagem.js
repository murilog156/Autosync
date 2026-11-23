// Prepara a logo do usuário para a procuração, direto no navegador:
// aceita PNG, JPG ou WebP, reduz para o tamanho ideal de impressão e
// salva como PNG de no máximo 100 KB.
//
// A logo ocupa até 36 × 24 mm no PDF. Em 300 DPI isso dá ~425 × 285 px;
// usamos 600 × 400 px como limite para ter folga de nitidez.

export const LOGO_LARGURA_MAX_PX = 600
export const LOGO_ALTURA_MAX_PX = 400
export const LOGO_TAMANHO_MAXIMO = 100 * 1024 // 100 KB (limite do armazenamento)
export const ENTRADA_TAMANHO_MAXIMO = 10 * 1024 * 1024 // 10 MB (arquivo escolhido)
export const FORMATOS_ACEITOS = 'image/png,image/jpeg,image/webp'

const LARGURA_MINIMA_PX = 120 // abaixo disso a logo ficaria ruim de ler
const PASSO_REDUCAO = 0.85

// Confere o formato pelo conteúdo do arquivo, não só pela extensão
async function detectarFormato(arquivo) {
  const b = new Uint8Array(await arquivo.slice(0, 12).arrayBuffer())
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'png'
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpg'
  const texto = (inicio, fim) => String.fromCharCode(...b.slice(inicio, fim))
  if (texto(0, 4) === 'RIFF' && texto(8, 12) === 'WEBP') return 'webp'
  return null
}

function gerarPng(canvas) {
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Falha ao gerar PNG'))), 'image/png'),
  )
}

// Redimensiona em etapas (no máximo metade por vez) para a imagem não ficar serrilhada
function redimensionar(origem, largura, altura) {
  let atual = origem
  let w = origem.width
  let h = origem.height

  do {
    w = Math.max(largura, Math.round(w / 2))
    h = Math.max(altura, Math.round(h / 2))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(atual, 0, 0, w, h)
    atual = canvas
  } while (w > largura || h > altura)

  return atual
}

/**
 * Devolve { blob, largura, altura, tamanhoOriginal } com o PNG pronto para envio.
 * Lança um Error com mensagem em português se não for possível.
 */
export async function prepararLogo(arquivo) {
  if (arquivo.size > ENTRADA_TAMANHO_MAXIMO) {
    throw new Error('A imagem é muito grande. Escolha um arquivo de até 10 MB.')
  }

  const formato = await detectarFormato(arquivo)
  if (!formato) throw new Error('Formato não aceito. Envie uma imagem PNG, JPG ou WebP.')

  let imagem
  try {
    imagem = await createImageBitmap(arquivo)
  } catch {
    throw new Error('Não foi possível ler a imagem. O arquivo pode estar corrompido.')
  }

  try {
    // Tamanho inicial: cabe em 600 × 400 sem aumentar imagens menores
    const proporcao = Math.min(1, LOGO_LARGURA_MAX_PX / imagem.width, LOGO_ALTURA_MAX_PX / imagem.height)
    let largura = Math.max(1, Math.round(imagem.width * proporcao))
    let altura = Math.max(1, Math.round(imagem.height * proporcao))

    // PNG que já está no tamanho e no peso certos: usa o arquivo original,
    // que costuma ser mais leve do que uma nova compressão
    if (formato === 'png' && proporcao === 1 && arquivo.size <= LOGO_TAMANHO_MAXIMO) {
      return { blob: arquivo, largura, altura, tamanhoOriginal: arquivo.size }
    }

    // Reduz aos poucos até o PNG caber em 100 KB
    for (;;) {
      const blob = await gerarPng(redimensionar(imagem, largura, altura))
      if (blob.size <= LOGO_TAMANHO_MAXIMO) {
        return { blob, largura, altura, tamanhoOriginal: arquivo.size }
      }
      const novaLargura = Math.round(largura * PASSO_REDUCAO)
      if (novaLargura < LARGURA_MINIMA_PX) {
        throw new Error(
          'Não foi possível deixar a imagem com até 100 KB sem perder qualidade. Tente uma logo mais simples (menos degradês ou fotos).',
        )
      }
      largura = novaLargura
      altura = Math.max(1, Math.round(altura * PASSO_REDUCAO))
    }
  } finally {
    imagem.close()
  }
}

export function formatarTamanho(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`
}
