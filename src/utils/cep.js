// Formata o CEP enquanto o usuário digita, no padrão 99999-999.
export function formatarCep(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 8)
  if (digitos.length <= 5) return digitos
  return `${digitos.slice(0, 5)}-${digitos.slice(5)}`
}

export const PADRAO_CEP = '\\d{5}-\\d{3}'

// Busca o endereço de um CEP na API pública do ViaCEP (https://viacep.com.br).
// Retorna { rua, bairro, cidade, uf } ou lança um erro com mensagem em português.
export async function buscarEnderecoPorCep(cep) {
  const digitos = cep.replace(/\D/g, '')
  if (digitos.length !== 8) {
    throw new Error('Digite o CEP completo (8 números).')
  }

  let resposta
  try {
    resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`)
  } catch {
    throw new Error('Não foi possível consultar o CEP. Verifique sua internet.')
  }

  if (!resposta.ok) throw new Error('Não foi possível consultar o CEP. Tente novamente.')

  const dados = await resposta.json()
  if (dados.erro) throw new Error('CEP não encontrado.')

  return {
    rua: dados.logradouro ?? '',
    bairro: dados.bairro ?? '',
    cidade: dados.localidade ?? '',
    uf: dados.uf ?? '',
  }
}
