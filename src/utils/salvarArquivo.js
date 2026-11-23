// Salva um arquivo gerado no navegador, deixando o usuário escolher a pasta.
//
// Chrome e Edge abrem a janela "Salvar como" (File System Access API).
// Nos outros navegadores o arquivo é baixado normalmente (o próprio navegador
// pode perguntar onde salvar, conforme a configuração dele).
//
// Importante: chame esta função logo no clique do botão, antes de qualquer
// "await", porque o navegador só abre a janela em resposta direta a um clique.

export async function salvarArquivo(nomeArquivo, gerarBlob, tipo = {
  description: 'Documento PDF',
  accept: { 'application/pdf': ['.pdf'] },
}) {
  let destino = null

  if (typeof window.showSaveFilePicker === 'function') {
    try {
      destino = await window.showSaveFilePicker({ suggestedName: nomeArquivo, types: [tipo] })
    } catch (erro) {
      if (erro.name === 'AbortError') return 'cancelado'
      destino = null // janela indisponível: usa o download comum
    }
  }

  const blob = await gerarBlob()

  if (destino) {
    const escrita = await destino.createWritable()
    await escrita.write(blob)
    await escrita.close()
    return 'salvo'
  }

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nomeArquivo
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
  return 'baixado'
}
