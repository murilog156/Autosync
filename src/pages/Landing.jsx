import { useEffect } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../auth/AuthProvider.jsx'
import CartaoAutenticacao from '../components/CartaoAutenticacao.jsx'
import '../styles/landing.css'

const recursos = [
  {
    icone: 'document-text-outline',
    titulo: 'Procurações',
    texto: 'Preencha os dados e a procuração sai pronta.',
  },
  {
    icone: 'reader-outline',
    titulo: 'Contratos',
    texto: 'Alienação fiduciária com cláusulas prontas.',
  },
  {
    icone: 'search-outline',
    titulo: 'Consulta de placas',
    texto: 'Dados do veículo em segundos.',
    emBreve: true,
  },
  {
    icone: 'print-outline',
    titulo: 'Pronto para imprimir',
    texto: 'Documentos formatados, direto para a impressora.',
  },
]

export default function Landing() {
  const { usuario, carregando } = useAuth()

  useEffect(() => {
    document.title = 'AutoSync: documentação veicular'
  }, [])

  // Quem já está logado vai direto para o sistema
  if (carregando) return null
  if (usuario) return <Navigate to="/app" replace />

  return (
    <div className="landing">
      <section className="lp-apresentacao">
        <img className="lp-logo" src="/media/logo2.png" alt="AutoSync" width="420" height="120" />

        <h1 className="lp-titulo">
          Documentação veicular <span>pronta para imprimir</span>.
        </h1>
        <p className="lp-subtitulo">Feito para despachantes e revendas de veículos.</p>

        <ul className="lp-recursos">
          {recursos.map((recurso) => (
            <li key={recurso.titulo} className="lp-recurso">
              <span className="lp-recurso-icone">
                <ion-icon name={recurso.icone} aria-hidden="true"></ion-icon>
              </span>
              <div>
                <strong>
                  {recurso.titulo}
                  {recurso.emBreve && <span className="lp-selo">em breve</span>}
                </strong>
                <p>{recurso.texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <footer className="lp-rodape">© {new Date().getFullYear()} AutoSync</footer>
      </section>

      <section className="lp-acesso">
        <CartaoAutenticacao />
      </section>
    </div>
  )
}
