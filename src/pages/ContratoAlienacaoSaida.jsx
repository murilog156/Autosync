import { useEffect } from 'react'
import '../styles/contrato-alienacao.css'

// Documento do contrato de alienação fiduciária (antigo RESERVADOMINIO.html).
//
// ATENÇÃO: assim como na versão antiga, esta página ainda mostra só o MODELO,
// com dados de exemplo fixos. Os dados enviados pelo formulário chegam na URL,
// mas ainda não são usados aqui. Isso fica para a etapa de correção de bugs.
export default function ContratoAlienacaoSaida() {
  useEffect(() => {
    document.title = 'Contrato Alienação Fiduciária'
  }, [])

  return (
    <div id="marginCSS">
      <div id="box-rDom">
        <h2 id="tituloRDom">
          Contrato particular de venda de veículo Nº<div id="nContrato"></div>
        </h2>

        <div id="box-infos">
          <div className="titulos-partes">DADOS DAS PARTES:</div>
          <div id="box-credor">
            <div className="titulos-formato">• Credor:<div id="credorNome" className="fonte-info-saida">JOÃO SILVA PEREIRA</div></div>
            <div className="titulos-formato">• Cpf:<div id="cpfCredor" className="fonte-info-saida">038.882.260-07</div></div>
            <div className="titulos-formato">• Rg:<div id="rgCredor" className="fonte-info-saida">4872078</div></div>
            <div className="titulos-formato">• Endereço:<div id="enderecoCredor" className="fonte-info-saida">JULIO DE CASTILHOS, 699, RINCÃO, ESTÂNCIA VELHA - RSAAAAAAAAA</div></div>
            <div className="titulos-formato">• CEP:<div id="cepCredor" className="fonte-info-saida">93.600-000</div></div>
            <div className="titulos-formato">• Telefone:<div id="telefoneCredor" className="fonte-info-saida">51 994163466</div></div>
          </div>
          <div id="box-devedor">
            <div className="titulos-formato">• Devedor:<div id="devedorNome" className="fonte-info-saida">JOÃO SILVA PEREIRA</div></div>
            <div className="titulos-formato">• Cpf:<div id="cpfDevedor" className="fonte-info-saida">038.882.260-07</div></div>
            <div className="titulos-formato">• Rg:<div id="rgDevedor" className="fonte-info-saida">4832078</div></div>
            <div className="titulos-formato">• Endereço:<div id="enderecoDevedor" className="fonte-info-saida">JULIO DE CASTILHOS, 699, RINCÃO, ESTÂNCIA VELHA - RSAAAAAAAAA</div></div>
            <div className="titulos-formato">• CEP:<div id="cepDevedor" className="fonte-info-saida">93.600-000</div></div>
            <div className="titulos-formato">• Telefone:<div id="telefoneDevedor" className="fonte-info-saida">51 994163466</div></div>
          </div>

          <div className="titulos-partes">DADOS DO VEÍCULO:</div>
          <div id="box-veiculo">
            <div className="titulos-formato">• Marca/Modelo:<div id="marcaVeiculo" className="fonte-info-saida">HONDA BIZ 125KS</div></div>
            <div className="titulos-formato">• Placa:<div id="placaVeiculo" className="fonte-info-saida">IOV-9478</div></div>
            <div className="titulos-formato">• Renavam:<div id="renavamVeiculo" className="fonte-info-saida">01234567891</div></div>
            <div className="titulos-formato">• Chassi:<div id="chassiVeiculo" className="fonte-info-saida">9BGK348V0JF153530</div></div>
            <div className="titulos-formato">• Ano Fab/Modelo:<div id="anoVeiculo" className="fonte-info-saida">2009-2009</div></div>
          </div>

          <div className="titulos-partes">DADOS DA VENDA:</div>
          <div id="box-venda">
            <div className="titulos-formato">
              • Valor total: <div id="valorTotal" className="fonte-info-saida">R$20.900,00.</div>
              ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
            </div>
            <div className="titulos-formato">
              • Valor da entrada:<div id="valorEntrada" className="fonte-info-saida">R$10.000,00. ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀</div>
            </div>
            <div className="titulos-formato">
              • Valor financiado: <div id="valorFinanciado" className="fonte-info-saida">R$10.900,00</div>
              ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
            </div>
            <div className="titulos-formato" id="parcelasCSS">
              • Parcelas:<div id="xParcelas" className="fonte-info-saida">20</div>parcelas de R$
              <div id="valorParcelas" className="fonte-info-saida">R$545,00</div>cada. ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
            </div>
            <div className="titulos-formato">
              • Primeira parcela: <div className="fonte-info-saida" id="primeiraParcela">10/10/2024</div>
              ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
            </div>
            <div className="titulos-formato">
              • Última parcela: <div className="fonte-info-saida" id="ultimaParcela">10/05/2026</div>
              ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
            </div>
            <div className="titulos-formato">
              • Formas de pagamento: PIX, Dinheiro ou transferência bancária.⍀⍀⍀⍀⍀⍀
            </div>
          </div>
        </div>

        <div id="texto1">
          As partes acima mencionadas têm entre si justo e contratado o presente Contrato de Venda de
          Veículo, que se regerá pelas cláusulas seguintes:
        </div>

        <div id="divClau">
          <div id="clausula1">
            <div className="titulos-clausulas">CLÁUSULA 1:</div>
            <div>
              O CREDOR vende ao DEVEDOR o veículo descrito acima pelo valor total de R$
              <span className="fonte-info-saida" id="clausula1-total">20.900,00</span>.
            </div>
          </div>
          <div id="clausula2">
            <div className="titulos-clausulas">CLÁUSULA 2:</div>
            <div className="clausula2-2">
              Por conta do preço referido na cláusula 1, o DEVEDOR pagou neste ato a quantia de{' '}
              <span className="fonte-info-saida" id="clausula-entrada-valor">R$10.000,00</span> e o
              valor financiado de{' '}
              <span className="fonte-info-saida" id="clausula-financiado-valor">R$10.900,00</span>, que
              será pago em <span className="fonte-info-saida" id="clausula-parcelas-numero">20</span>{' '}
              parcelas de <span className="fonte-info-saida" id="clausula-parcelas-valor">R$545,00</span>{' '}
              cada, pago em dinheiro, PIX, ou transferência bancária, nas seguintes datas: a primeira em{' '}
              <span className="fonte-info-saida" id="clausula-data-primeira">10/10/2024</span> e a última
              em <span className="fonte-info-saida" id="clausula-data-ultima">10/05/2026</span>.
            </div>
          </div>
          <div id="clausula3">
            <div className="titulos-clausulas">CLÁUSULA 3:</div>
            Por força do pacto da alienação fiduciária, fica estabelecido que o CREDOR terá a
            prioridade sobre o veículo descrito na cláusula 1 até que seja liquidada a última das
            prestações mencionadas acima.
          </div>
          <div id="clausula4">
            <div className="titulos-clausulas">CLÁUSULA 4:</div>
            Em caso de atraso no pagamento de qualquer parcela mencionada na cláusula 2, o DEVEDOR
            incorrerá em multa de 2% sobre o valor em atraso, além de juros de mora de 1% ao mês. O não
            cumprimento das obrigações financeiras poderá resultar na restituição do veículo ao CREDOR,
            conforme estipulado nos artigos 343 e seguintes do Código de Processo Civil. ÚNICO - O
            CREDOR poderá optar pela rescisão deste contrato em caso de mora ou inadimplemento pelo
            DEVEDOR, procedendo à cobrança judicial dos valores devidos.
          </div>
          <div id="clausula5">
            <div className="titulos-clausulas">CLÁUSULA 5:</div>
            A falência do DEVEDOR implicará na resolução deste contrato, permitindo ao CREDOR
            reivindicar o veículo junto à massa falida.
          </div>
          <div id="clausula6">
            <div className="titulos-clausulas">CLÁUSULA 6:</div>
            Enquanto não estiver integralmente pago o preço estipulado na cláusula 2, o DEVEDOR se
            compromete a manter o veículo em perfeito estado de conservação, protegendo-o contra
            terceiros e permitindo ao CREDOR inspecioná-lo quando necessário, mediante aviso prévio
            por escrito em caso de mudança de residência.
          </div>
          <div id="clausula7">
            <div className="titulos-clausulas">CLÁUSULA 7:</div>
            O DEVEDOR assume integral responsabilidade civil e criminal por quaisquer acidentes, multas
            de trânsito, impostos, seguro obrigatório e outras obrigações relacionadas ao veículo a
            partir da data de assinatura deste contrato. Até a assinatura do contrato, essas obrigações
            são de responsabilidade do CREDOR.
          </div>
        </div>

        <div id="texto2">
          E, por estarem assim justos e contratados, firmam o presente instrumento particular em duas
          vias de igual teor, juntamente com as testemunhas abaixo assinadas.
        </div>
        <div id="loc-data">
          Local e data: <div id="loc-data-valor">Estância Velha, 26 de JULHO DE 2024.</div>
        </div>

        <div id="assinaturas">
          <div id="align1">
            <div className="line">________________________________________</div>
            <div id="credorAss">JOÃO SILVA PEREIRA</div>
          </div>
          <div id="align2">
            <div className="line">________________________________________</div>
            <div id="devedorAss">JOÃO SILVA PEREIRA</div>
          </div>
        </div>
      </div>
    </div>
  )
}
