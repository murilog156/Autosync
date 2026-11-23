// Formata o telefone enquanto o usuário digita.
// Celular (11 números): (XX) 99999-9999 — Fixo (10 números): (XX) 9999-9999
export function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)

  if (digitos.length === 0) return ''
  if (digitos.length <= 2) return `(${digitos}`
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

// Padrão usado no atributo "pattern" do cadastro (celular com 9 dígitos)
export const PADRAO_TELEFONE = '\\(\\d{2}\\) \\d{5}-\\d{4}'

// Celular ou fixo completo
export function telefoneCompleto(valor) {
  const total = valor.replace(/\D/g, '').length
  return total === 10 || total === 11
}
