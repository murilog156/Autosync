import { useEffect, useState } from 'react'

// Efeito máquina de escrever: o texto aparece letra por letra e, no final,
// fica um cursor piscando.
//
// "partes" = [{ texto, destaque }]: as partes com "destaque" ganham a classe
// "lp-destaque" (laranja), para colorir só um pedaço da frase.
//
// O texto completo fica reservado (invisível) por baixo, para a frase não
// "empurrar" o resto da página enquanto é digitada. Leitores de tela recebem
// a frase inteira de uma vez.
const prefereMenosMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function TextoDigitado({ partes, velocidade = 55, atrasoInicial = 350 }) {
  const textoCompleto = partes.map((p) => p.texto).join('')
  const total = textoCompleto.length
  const [digitadas, setDigitadas] = useState(() => (prefereMenosMovimento() ? total : 0))

  useEffect(() => {
    if (digitadas >= total) return
    const espera = digitadas === 0 ? atrasoInicial : velocidade
    const temporizador = setTimeout(() => setDigitadas((n) => n + 1), espera)
    return () => clearTimeout(temporizador)
  }, [digitadas, total, velocidade, atrasoInicial])

  // Corta cada parte conforme a quantidade de letras já digitadas
  let restante = digitadas
  const visiveis = partes.map((parte) => {
    const pedaco = parte.texto.slice(0, Math.max(0, restante))
    restante -= parte.texto.length
    return { ...parte, texto: pedaco }
  })

  const renderizar = (lista) =>
    lista.map((parte, i) =>
      parte.destaque ? (
        <span key={i} className="lp-destaque">
          {parte.texto}
        </span>
      ) : (
        <span key={i}>{parte.texto}</span>
      ),
    )

  return (
    <span className="lp-digitado">
      {/* Frase inteira para leitores de tela (invisível na tela) */}
      <span className="lp-somente-leitor">{textoCompleto}</span>
      {/* Reserva o espaço da frase inteira */}
      <span className="lp-digitado-reserva" aria-hidden="true">
        {renderizar(partes)}
        <span className="lp-cursor">|</span>
      </span>
      {/* Frase sendo digitada + cursor piscando */}
      <span className="lp-digitado-texto" aria-hidden="true">
        {renderizar(visiveis)}
        <span className={`lp-cursor ${digitadas >= total ? 'piscando' : ''}`}>|</span>
      </span>
    </span>
  )
}
