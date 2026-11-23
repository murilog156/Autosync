// Máscaras e verificadores de CPF, CNPJ, placa e outros campos de documentos.

export function somenteDigitos(valor) {
  return valor.replace(/\D/g, '')
}

// ---------- CPF ----------

export function formatarCpf(valor) {
  const d = somenteDigitos(valor).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

export function validarCpf(valor) {
  const d = somenteDigitos(valor)
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false

  const digitoVerificador = (tamanho) => {
    let soma = 0
    for (let i = 0; i < tamanho; i++) soma += Number(d[i]) * (tamanho + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }

  return digitoVerificador(9) === Number(d[9]) && digitoVerificador(10) === Number(d[10])
}

// ---------- CNPJ (numérico e o novo alfanumérico, vigente desde julho/2026) ----------

// Mantém só letras e números, em maiúsculo. As 12 primeiras posições podem ter letras;
// os 2 dígitos verificadores são sempre números.
function limparCnpj(valor) {
  const limpo = valor.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 14)
  return limpo.slice(0, 12) + limpo.slice(12).replace(/\D/g, '')
}

export function formatarCnpj(valor) {
  const c = limparCnpj(valor)
  if (c.length <= 2) return c
  if (c.length <= 5) return `${c.slice(0, 2)}.${c.slice(2)}`
  if (c.length <= 8) return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5)}`
  if (c.length <= 12) return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8)}`
  return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12)}`
}

export function validarCnpj(valor) {
  const c = limparCnpj(valor)
  if (!/^[A-Z0-9]{12}\d{2}$/.test(c) || /^(.)\1{13}$/.test(c)) return false

  // Cada caractere vale (código ASCII - 48): '0'..'9' = 0..9, 'A' = 17, 'B' = 18...
  const valores = [...c].map((ch) => ch.charCodeAt(0) - 48)
  const digitoVerificador = (tamanho) => {
    let soma = 0
    let peso = tamanho - 7
    for (let i = 0; i < tamanho; i++) {
      soma += valores[i] * peso
      peso = peso === 2 ? 9 : peso - 1
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  return digitoVerificador(12) === valores[12] && digitoVerificador(13) === valores[13]
}

// ---------- CPF ou CNPJ no mesmo campo (procuradores) ----------

// Até 11 números = CPF. Mais que isso, ou se tiver letra = CNPJ.
export function ehCnpj(valor) {
  const limpo = valor.toUpperCase().replace(/[^A-Z0-9]/g, '')
  return limpo.length > 11 || /[A-Z]/.test(limpo)
}

export function formatarCpfOuCnpj(valor) {
  return ehCnpj(valor) ? formatarCnpj(valor) : formatarCpf(valor)
}

export function validarCpfOuCnpj(valor) {
  return ehCnpj(valor) ? validarCnpj(valor) : validarCpf(valor)
}

// ---------- Veículo ----------

// Placa antiga (ABC-1234) ou Mercosul (ABC1D23)
export function formatarPlaca(valor) {
  const p = valor.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)
  // Hífen só no padrão antigo: 3 letras + 4 números
  if (/^[A-Z]{3}\d\d/.test(p)) return `${p.slice(0, 3)}-${p.slice(3)}`
  return p
}

export function validarPlaca(valor) {
  return /^[A-Z]{3}\d[A-Z0-9]\d{2}$/.test(valor.replace('-', ''))
}

export function formatarChassi(valor) {
  return valor.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17)
}

export function validarAno(valor) {
  const ano = Number(valor)
  return /^\d{4}$/.test(valor) && ano >= 1900 && ano <= new Date().getFullYear() + 2
}
