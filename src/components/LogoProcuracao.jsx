import { useEffect, useRef, useState } from 'react'
import { baixarLogo, enviarLogo, removerLogo } from '../lib/logo.js'
import { FORMATOS_ACEITOS, formatarTamanho, prepararLogo } from '../utils/comprimirImagem.js'

// Cartão da página de perfil para enviar/trocar/remover a logo das procurações.
// O envio acontece na hora em que o arquivo é escolhido (não depende do "Salvar alterações").
export default function LogoProcuracao({ usuarioId }) {
  const entradaRef = useRef(null)
  const [previa, setPrevia] = useState(null) // URL temporária da imagem para mostrar na tela
  const [carregando, setCarregando] = useState(true)
  const [ocupado, setOcupado] = useState(false)
  const [mensagem, setMensagem] = useState(null) // { tipo: 'ok' | 'erro', texto }

  function mostrarPrevia(blob) {
    setPrevia(blob ? URL.createObjectURL(blob) : null)
  }

  useEffect(() => {
    if (!usuarioId) return
    let ativo = true
    baixarLogo(usuarioId).then((blob) => {
      if (!ativo) return
      mostrarPrevia(blob)
      setCarregando(false)
    })
    return () => {
      ativo = false
    }
  }, [usuarioId])

  // Libera da memória a URL da prévia anterior (ao trocar a logo ou sair da página)
  useEffect(() => () => previa && URL.revokeObjectURL(previa), [previa])

  async function escolherArquivo(evento) {
    const arquivo = evento.target.files?.[0]
    evento.target.value = '' // permite escolher o mesmo arquivo de novo
    if (!arquivo) return

    setMensagem(null)
    setOcupado(true)

    // 1) Ajusta a imagem: PNG, até 600 × 400 px e até 100 KB
    let logo
    try {
      logo = await prepararLogo(arquivo)
    } catch (falha) {
      setMensagem({ tipo: 'erro', texto: falha.message })
      setOcupado(false)
      return
    }

    // 2) Envia para o Supabase
    try {
      await enviarLogo(usuarioId, logo.blob)
      mostrarPrevia(logo.blob)
      const otimizada =
        logo.blob !== arquivo
          ? ` Imagem otimizada: ${formatarTamanho(logo.tamanhoOriginal)} → ${formatarTamanho(logo.blob.size)} (${logo.largura} × ${logo.altura} px).`
          : ''
      setMensagem({
        tipo: 'ok',
        texto: `Logo salva. Ela vai aparecer nas próximas procurações.${otimizada}`,
      })
    } catch (falha) {
      console.error(falha)
      setMensagem({ tipo: 'erro', texto: 'Não foi possível enviar a logo. Tente novamente.' })
    } finally {
      setOcupado(false)
    }
  }

  async function remover() {
    setMensagem(null)
    setOcupado(true)
    try {
      await removerLogo(usuarioId)
      mostrarPrevia(null)
      setMensagem({ tipo: 'ok', texto: 'Logo removida.' })
    } catch (falha) {
      console.error(falha)
      setMensagem({ tipo: 'erro', texto: 'Não foi possível remover a logo. Tente novamente.' })
    } finally {
      setOcupado(false)
    }
  }

  return (
    <section className="pf-cartao pf-cartao-logo">
      <div className="pf-secao">
        <h2>Logo da procuração</h2>
        <p className="pf-dica">
          Sua logo aparece no canto inferior direito das procurações geradas. Envie uma imagem
          PNG, JPG ou WebP de até 10 MB: ela é ajustada automaticamente para o tamanho ideal.
          Para fundo transparente, use PNG.
        </p>

        <div className="pf-logo-area">
          <div className="pf-logo-previa">
            {carregando ? (
              <span>Carregando…</span>
            ) : previa ? (
              <img src={previa} alt="Sua logo" />
            ) : (
              <span>Nenhuma logo enviada</span>
            )}
          </div>

          <div className="pf-logo-acoes">
            <input
              ref={entradaRef}
              type="file"
              accept={FORMATOS_ACEITOS}
              hidden
              onChange={escolherArquivo}
            />
            <button
              type="button"
              className="pf-botao-secundario"
              onClick={() => entradaRef.current?.click()}
              disabled={ocupado || carregando}
            >
              <ion-icon name="cloud-upload-outline" aria-hidden="true"></ion-icon>
              {ocupado ? 'Processando…' : previa ? 'Trocar logo' : 'Enviar logo'}
            </button>
            {previa && (
              <button type="button" className="pf-botao-remover" onClick={remover} disabled={ocupado}>
                <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
                Remover
              </button>
            )}
          </div>
        </div>

        {mensagem && (
          <p className={`pf-dica pf-dica-${mensagem.tipo}`} role="status">
            {mensagem.texto}
          </p>
        )}
      </div>
    </section>
  )
}
