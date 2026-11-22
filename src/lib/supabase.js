import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const chaveAnon = import.meta.env.VITE_SUPABASE_ANON_KEY

// Se as variáveis do .env.local não estiverem configuradas, o cliente fica null
// e a landing page mostra um aviso em vez de quebrar.
export const supabaseConfigurado = Boolean(url && chaveAnon)

export const supabase = supabaseConfigurado ? createClient(url, chaveAnon) : null
