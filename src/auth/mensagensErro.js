// Traduz os erros mais comuns do Supabase Auth para português.
const mensagens = {
  invalid_credentials: 'E-mail ou senha incorretos.',
  email_not_confirmed: 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.',
  user_already_exists: 'Este e-mail já está cadastrado. Tente entrar.',
  email_exists: 'Este e-mail já está cadastrado. Tente entrar.',
  weak_password: 'Senha fraca. Use pelo menos 6 caracteres.',
  over_email_send_rate_limit: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
  over_request_rate_limit: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
  validation_failed: 'Verifique os dados informados.',
}

export function traduzirErro(erro) {
  if (!erro) return ''
  return mensagens[erro.code] ?? 'Não foi possível concluir. Tente novamente.'
}
