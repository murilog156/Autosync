// Formata o telefone enquanto o usuário digita, no padrão (XX) 99999-9999.
// Aceita só números (máximo 11 dígitos: DDD + 9 dígitos).
//
// Exemplos:  "5"           -> "(5"
//            "51999"       -> "(51) 999"
//            "51999998888" -> "(51) 99999-8888"
export function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)

  if (digitos.length === 0) return ''
  if (digitos.length <= 2) return `(${digitos}`
  if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

// Padrão completo, usado na validação do formulário
export const PADRAO_TELEFONE = '\\(\\d{2}\\) \\d{5}-\\d{4}'
