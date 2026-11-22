import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import '../styles/procuracao.css'

// Documento de procuração pronto para impressão (antigo docsaida.html + proc.js).
// Os dados chegam pela URL, enviados pelo formulário da tela principal.
export default function ProcuracaoSaida() {
  const [params] = useSearchParams()

  useEffect(() => {
    document.title = 'Procuração'
  }, [])

  const dados = {
    proprietario: params.get('proprietario') ?? '',
    cpf: params.get('proprietarioCpf') ?? '',
    procurador1: params.get('procurador1') ?? '',
    cpfproc1: params.get('cpfproc1') ?? '',
    procurador2: params.get('procurador2') ?? '',
    cpfproc2: params.get('cpfproc2') ?? '',
    placa: params.get('placa') ?? '',
    renavam: params.get('renavam') ?? '',
    marcamodelo: params.get('marcamodelo') ?? '',
    chassi: params.get('chassi') ?? '',
    anoveiculo: params.get('anoveiculo') ?? '',
    cor: params.get('cor') ?? '',
  }

  // Só considera o procurador 2 se o nome E o CPF dele foram preenchidos
  const temProcurador2 = dados.procurador2 !== '' && dados.cpfproc2 !== ''

  return (
    <div id="box-proc" className={temProcurador2 ? 'com-procurador-2' : undefined}>
      <div id="title">Procuração</div>

      <div id="pessoas-id">
        <div>Pelo presente instrumento particular de procuração, eu:</div>

        <div id="cxprop">
          <div id="nome-proprietario" className="fonte-info-saida">{dados.proprietario}</div>
          <div className="cpf-fixed">CPF:</div>
          <div id="cpf-prop" className="fonte-info-saida">{dados.cpf}</div>
        </div>

        <div id="texto-nomeacao-procuradores">
          {temProcurador2
            ? 'nomeio e constituo meus bastantes procuradores:'
            : 'nomeio e constituo meu bastante procurador:'}
        </div>
        <div id="cxproc">
          <div id="nome-proc-1" className="fonte-info-saida">{dados.procurador1}</div>
          <div className="cpf-fixed">CPF:</div>
          <div id="cpf-proc-1" className="fonte-info-saida">{dados.cpfproc1}</div>
        </div>

        {temProcurador2 && (
          <div id="com-proc-2">
            <div style={{ textAlign: 'center' }}>E também:</div>
            <div id="cxproc2">
              <div id="nome-proc-2" className="fonte-info-saida">{dados.procurador2}</div>
              <div className="cpf-fixed">CPF:</div>
              <div id="cpf-proc-2" className="fonte-info-saida">{dados.cpfproc2}</div>
            </div>
          </div>
        )}

        <p id="texto-conjunto-ou-isolado">
          {temProcurador2
            ? 'Podendo assinar em conjunto ou isoladamente, para fim de vender ou transferir para si próprios, locar, comprar e permutar o veículo com as seguintes características:'
            : 'A fim de vender ou transferir para si próprio, locar, comprar e permutar o veículo com as seguintes características:'}
        </p>
      </div>

      <div id="veiculo-id">
        <div id="veiculo-id1">
          Marca/Modelo:<div id="marca-mod" className="fonte-info-saida">{dados.marcamodelo}</div>
          Placa:<div id="placa" className="fonte-info-saida">{dados.placa}</div>
          Renavam:<div id="renavam" className="fonte-info-saida">{dados.renavam}</div>
        </div>
        <div id="veiculo-id2">
          Chassi:<div id="chassi" className="fonte-info-saida">{dados.chassi}</div>
          Ano/Modelo:<div id="anofab-anomod" className="fonte-info-saida">{dados.anoveiculo}</div>
          Cor do veículo:<div id="cor" className="fonte-info-saida">{dados.cor}</div>
        </div>
      </div>

      <div id="poderes-texto">
        Podendo ainda efetuar a venda ou transferir a si próprios, receber o preço, solicitar ATPVe,
        assinar requerimentos, realizar vistorias, com poderes também para requerer , junto aos
        CRVAS/DETRAN-RS, os processos de 2ª via de CRV/CRLV, podendo assinar declaração de endereço
        residencial e de perda/extravio do CRV/CRLV, baixa definitiva do veículo, alteração de
        informação do veículo, alteração de característica, autorização e renovação de RNTRC ( ANTT),
        cancelamento de processo, autorização para regravação de chassi, colocar restrição por
        transferência, liberar restrição por transferência, troca de município, alteração de entrega
        do CRV e ou CRLV, inclusão de representar perante quaisquer repartições públicas e/ou privadas
        para tratar de assuntos que forem relacionados à inclusão, renovação ou exclusão do
        combustível GNV ( Gás Natural Veicular), assinar contratos de inclusão e liberação de:
        alienação, locação, comodato, reserva de domínio, e ainda assinar carta de desistência de
        leasing, endossar documentos, retirar documentos junto ás agências dos correios, retirar o
        veículo de depósito, usar o veículo em apreço, manejando o mesmo, em qualquer parte do
        território nacional ou podendo transferir para si próprio conforme Art. 685 do código civil,
        causa própria e finalmente, usar e gozar do veículo como uma coisa sua e sem interferência ou
        autorização de outros, podendo ainda substabelecer a presente no todo ou parte, praticar
        enfim os mais amplos e ilimitados poderes no fiel cumprimento do presente mandato. O presente
        mandato é celebrado em caráter IRREVOGAVEL, SEM PRESTAÇÃO DE CONTAS e podendo agir em causa
        própria. Outorgante, pelo presente instrumento declara-se responsável pelos pagamentos de
        multas e impostos do veículo acima descrito e caracterizado, até a data da outorga do
        presente mandato. Ratificando poderes dados em procurações anteriores e poder assinar
        cancelamento comunicação de venda ou distrato de venda.
      </div>

      <div id="data-proc">
        Local e data:
        <div id="linha-data">____________________, ______/____________/______.</div>
      </div>

      <div id="campo-de-assinatura">
        <div id="linha">_____________________________________________________</div>
        <div id="campo-assinatura">
          <div id="nome-proprietario-ass" className="fonte-info-saida">{dados.proprietario}</div>
        </div>
      </div>
    </div>
  )
}
