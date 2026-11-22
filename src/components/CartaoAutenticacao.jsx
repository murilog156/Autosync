import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase, supabaseConfigurado } from '../lib/supabase.js'
import { traduzirErro } from '../auth/mensagensErro.js'
import { UFS } from '../data/ufs.js'
import { formatarTelefone, PADRAO_TELEFONE } from '../utils/telefone.js'

// Cartão com as abas "Entrar" e "Criar conta", + login com Google.
export default function CartaoAutenticacao() {
  const navigate = useNavigate()
  const [aba, setAba] = useState('entrar') // 'entrar' | 'cadastrar'
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [uf, setUf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')

  const ehCadastro = aba === 'cadastrar'

  function trocarAba(novaAba) {
    setAba(novaAba)
    setErro('')
    setAviso('')
    setSenha('')
    setConfirmarSenha('')
  }

  async function entrarComGoogle() {
    setErro('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/app` },
    })
    if (error) setErro(traduzirErro(error))
    // Se deu certo, o navegador vai para a tela do Google e volta em /app.
  }

  async function enviar(evento) {
    evento.preventDefault()
    setErro('')
    setAviso('')

    if (ehCadastro && senha !== confirmarSenha) {
      setErro('As senhas não conferem.')
      return
    }

    setEnviando(true)

    if (ehCadastro) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          // Dados extras do cadastro, salvos no perfil do usuário (user_metadata)
          data: { full_name: nome, telefone, uf },
          emailRedirectTo: `${window.location.origin}/app`,
        },
      })
      setEnviando(false)

      if (error) {
        setErro(traduzirErro(error))
      } else if (data.session) {
        // Confirmação de e-mail desativada no Supabase: já entra direto.
        navigate('/app')
      } else {
        setAviso('Conta criada! Enviamos um link de confirmação para o seu e-mail.')
        trocarAbaMantendoAviso()
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
      setEnviando(false)

      if (error) setErro(traduzirErro(error))
      else navigate('/app')
    }
  }

  // Depois do cadastro, volta para "Entrar" sem apagar a mensagem de sucesso
  function trocarAbaMantendoAviso() {
    setAba('entrar')
    setSenha('')
    setConfirmarSenha('')
  }

  return (
    <div className="lp-cartao">
      <div className="lp-abas" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={!ehCadastro}
          className={!ehCadastro ? 'ativa' : ''}
          onClick={() => trocarAba('entrar')}
        >
          Entrar
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={ehCadastro}
          className={ehCadastro ? 'ativa' : ''}
          onClick={() => trocarAba('cadastrar')}
        >
          Criar conta
        </button>
      </div>

      <h2 className="lp-cartao-titulo">
        {ehCadastro ? 'Comece a usar o AutoSync' : 'Bem-vindo de volta'}
      </h2>

      {!supabaseConfigurado && (
        <p className="lp-mensagem lp-mensagem-erro">
          Login indisponível: configure o Supabase no arquivo <code>.env.local</code>.
        </p>
      )}

      <button
        type="button"
        className="lp-botao-google"
        onClick={entrarComGoogle}
        disabled={!supabaseConfigurado}
      >
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
        </svg>
        {ehCadastro ? 'Cadastrar com Google' : 'Entrar com Google'}
      </button>

      <div className="lp-divisor"><span>ou com e-mail</span></div>

      <form className="lp-form" onSubmit={enviar}>
        {ehCadastro && (
          <div className="lp-campo">
            <label htmlFor="lp-nome">Nome</label>
            <input
              id="lp-nome"
              type="text"
              autoComplete="name"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        )}

        {ehCadastro && (
          <div className="lp-linha">
            <div className="lp-campo">
              <label htmlFor="lp-telefone">Telefone</label>
              <input
                id="lp-telefone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="(51) 99999-9999"
                pattern={PADRAO_TELEFONE}
                title="Informe o telefone com DDD: (XX) 99999-9999"
                maxLength={15}
                required
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              />
            </div>

            <div className="lp-campo">
              <label htmlFor="lp-uf">Estado (UF)</label>
              <select
                id="lp-uf"
                autoComplete="address-level1"
                required
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              >
                <option value="" disabled>Selecione</option>
                {UFS.map(({ sigla, nome: nomeUf }) => (
                  <option key={sigla} value={sigla} title={nomeUf}>
                    {sigla}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="lp-campo">
          <label htmlFor="lp-email">E-mail</label>
          <input
            id="lp-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="lp-campo">
          <label htmlFor="lp-senha">Senha</label>
          <input
            id="lp-senha"
            type="password"
            autoComplete={ehCadastro ? 'new-password' : 'current-password'}
            minLength={6}
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {ehCadastro && (
          <div className="lp-campo">
            <label htmlFor="lp-confirmar">Confirmar senha</label>
            <input
              id="lp-confirmar"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
        )}

        {erro && <p className="lp-mensagem lp-mensagem-erro" role="alert">{erro}</p>}
        {aviso && <p className="lp-mensagem lp-mensagem-ok" role="status">{aviso}</p>}

        <button
          type="submit"
          className="lp-botao-principal"
          disabled={!supabaseConfigurado || enviando}
        >
          {enviando ? 'Aguarde…' : ehCadastro ? 'Criar conta' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
