// Logo do usuário, estampada nas procurações.
// Fica no Supabase Storage, bucket "logos", no caminho "<id do usuário>/logo.png".
// As regras (policies) do bucket só deixam cada usuário ler e gravar a própria pasta.

import { supabase } from './supabase.js'

const BUCKET = 'logos'

function caminho(usuarioId) {
  return `${usuarioId}/logo.png`
}

// "png" deve vir de prepararLogo() (utils/comprimirImagem.js): PNG de até 100 KB
export async function enviarLogo(usuarioId, png) {
  const { error } = await supabase.storage.from(BUCKET).upload(caminho(usuarioId), png, {
    upsert: true,
    contentType: 'image/png',
    cacheControl: '0',
  })
  if (error) throw error
}

// Devolve o PNG (Blob) ou null se o usuário ainda não enviou uma logo
export async function baixarLogo(usuarioId) {
  if (!supabase || !usuarioId) return null
  try {
    // O parâmetro extra evita receber uma versão antiga guardada em cache
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .download(caminho(usuarioId), { cacheNonce: Date.now() })
    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

export async function removerLogo(usuarioId) {
  const { error } = await supabase.storage.from(BUCKET).remove([caminho(usuarioId)])
  if (error) throw error
}
