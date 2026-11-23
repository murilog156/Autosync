import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../auth/AuthProvider.jsx'
import { supabase } from '../lib/supabase.js'
import { UFS } from '../data/ufs.js'
import { formatarTelefone, PADRAO_TELEFONE } from '../utils/telefone.js'
import { formatarCep, PADRAO_CEP, buscarEnderecoPorCep } from '../utils/cep.js'
import LogoProcuracao from '../components/LogoProcuracao.jsx'
import '../styles/perfil.css'

// Lê os dados já salvos no perfil (user_metadata do Supabase).
// O nome editado fica em "nome" porque o login com Google regrava "full_name" a cada acesso.
function dadosIniciais(usuario) {
  const meta = usuario?.user_metadata ?? {}
  return {
    nome: meta.nome || meta.full_name || '',
    telefone: meta.telefone || '',
    uf: meta.uf || '',
    cep: meta.cep || '',
    cidade: meta.cidade || '',
    bairro: meta.bairro || '',
    rua: meta.rua || '',
    numero: meta.numero || '',
  }
}

export default function Perfil() {
  const { usuario } = useAuth()
  const [dados, setDados] = useState(() => dadosIniciais(usuario))
  const [salvando, setSalvando] = useState(false)
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [mensagem, setMensagem] = useState(null) // { tipo: 'ok' | 'erro', texto }
  const [mensagemCep, setMensagemCep] = useState('')

  useEffect(() => {
    document.title = 'Perfil · AutoSync'
  }, [])

  function alterar(campo, valor) {
    setDados((anterior) => ({ ...anterior, [campo]: valor }))
    setMensagem(null)
  }

  async function buscarCep() {
    setMensagemCep('')
    setBuscandoCep(true)
    try {
      const endereco = await buscarEnderecoPorCep(dados.cep)
      setDados((anterior) => ({
        ...anterior,
        rua: endereco.rua,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        uf: endereco.uf || anterior.uf,
      }))
      // Leva o cursor para o número, que o CEP não informa
      document.getElementById('pf-numero')?.focus()
    } catch (erro) {
      setMensagemCep(erro.message)
    } finally {
      setBuscandoCep(false)
    }
  }

  async function salvar(evento) {
    evento.preventDefault()
    setSalvando(true)
    setMensagem(null)

    const { error } = await supabase.auth.updateUser({ data: dados })
    setSalvando(false)

    if (error) setMensagem({ tipo: 'erro', texto: 'Não foi possível salvar. Tente novamente.' })
    else setMensagem({ tipo: 'ok', texto: 'Perfil atualizado com sucesso.' })
  }

  return (
    <div className="perfil">
      <header className="pf-topo">
        <Link to="/app" className="pf-voltar">
          <ion-icon name="arrow-back-outline" aria-hidden="true"></ion-icon>
          Voltar ao painel
        </Link>
        <img src="/media/logo1.png" alt="AutoSync" className="pf-logo" width="175" height="50" />
      </header>

      <main className="pf-conteudo">
        <h1 className="pf-titulo">Meu perfil</h1>
        <p className="pf-subtitulo">Complete ou atualize seus dados quando quiser.</p>

        <form className="pf-cartao" onSubmit={salvar}>
          <section className="pf-secao">
            <h2>Dados pessoais</h2>

            <div className="pf-campo">
              <label htmlFor="pf-nome">Nome</label>
              <input
                id="pf-nome"
                type="text"
                autoComplete="name"
                value={dados.nome}
                onChange={(e) => alterar('nome', e.target.value)}
              />
            </div>

            <div className="pf-campo">
              <label htmlFor="pf-email">E-mail</label>
              <input id="pf-email" type="email" value={usuario?.email ?? ''} disabled />
            </div>

            <div className="pf-linha pf-linha-telefone">
              <div className="pf-campo">
                <label htmlFor="pf-telefone">Telefone</label>
                <input
                  id="pf-telefone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="(51) 99999-9999"
                  pattern={PADRAO_TELEFONE}
                  title="Informe o telefone com DDD: (XX) 99999-9999"
                  maxLength={15}
                  value={dados.telefone}
                  onChange={(e) => alterar('telefone', formatarTelefone(e.target.value))}
                />
              </div>

              <div className="pf-campo">
                <label htmlFor="pf-uf">Estado (UF)</label>
                <select
                  id="pf-uf"
                  autoComplete="address-level1"
                  value={dados.uf}
                  onChange={(e) => alterar('uf', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {UFS.map(({ sigla, nome }) => (
                    <option key={sigla} value={sigla} title={nome}>
                      {sigla}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="pf-secao">
            <h2>Endereço</h2>

            <div className="pf-campo">
              <label htmlFor="pf-cep">CEP</label>
              <div className="pf-cep">
                <input
                  id="pf-cep"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="93600-000"
                  pattern={PADRAO_CEP}
                  title="Informe o CEP: 99999-999"
                  maxLength={9}
                  value={dados.cep}
                  onChange={(e) => {
                    alterar('cep', formatarCep(e.target.value))
                    setMensagemCep('')
                  }}
                  onKeyDown={(e) => {
                    // Enter no campo CEP busca o endereço em vez de salvar o formulário
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      buscarCep()
                    }
                  }}
                />
                <button
                  type="button"
                  className="pf-botao-secundario"
                  onClick={buscarCep}
                  disabled={buscandoCep}
                >
                  <ion-icon name="search-outline" aria-hidden="true"></ion-icon>
                  {buscandoCep ? 'Buscando…' : 'Buscar CEP'}
                </button>
              </div>
              {mensagemCep && <p className="pf-dica pf-dica-erro" role="alert">{mensagemCep}</p>}
            </div>

            <div className="pf-linha">
              <div className="pf-campo">
                <label htmlFor="pf-cidade">Cidade</label>
                <input
                  id="pf-cidade"
                  type="text"
                  autoComplete="address-level2"
                  value={dados.cidade}
                  onChange={(e) => alterar('cidade', e.target.value)}
                />
              </div>
              <div className="pf-campo">
                <label htmlFor="pf-bairro">Bairro</label>
                <input
                  id="pf-bairro"
                  type="text"
                  value={dados.bairro}
                  onChange={(e) => alterar('bairro', e.target.value)}
                />
              </div>
            </div>

            <div className="pf-linha pf-linha-rua">
              <div className="pf-campo">
                <label htmlFor="pf-rua">Rua</label>
                <input
                  id="pf-rua"
                  type="text"
                  autoComplete="address-line1"
                  value={dados.rua}
                  onChange={(e) => alterar('rua', e.target.value)}
                />
              </div>
              <div className="pf-campo">
                <label htmlFor="pf-numero">Número</label>
                <input
                  id="pf-numero"
                  type="text"
                  value={dados.numero}
                  onChange={(e) => alterar('numero', e.target.value)}
                />
              </div>
            </div>
          </section>

          <div className="pf-rodape">
            {mensagem && (
              <p className={`pf-dica pf-dica-${mensagem.tipo}`} role="status">{mensagem.texto}</p>
            )}
            <button type="submit" className="pf-botao-principal" disabled={salvando}>
              {salvando ? 'Salvando…' : 'Salvar alterações'}
            </button>
          </div>
        </form>

        <LogoProcuracao usuarioId={usuario?.id} />
      </main>
    </div>
  )
}
