// += recebe ele mesmo mais a informação que for acrescentada.  exemplo: let valor = 1; valor += 2; valor agora é 3 , 
// se é string, exemplo "ban" + "ana" , fica "banana"
// se for numero mais string, exemplo: "ban" + 1 , fica "ban1"
// se for numero é a soma matemática
// "1" + "1" fica "11"


const params = new URLSearchParams(window.location.search);
const menuAtual = params.get('MAA')
console.log(menuAtual)

if (menuAtual == 'geradorDeProcuracao') {
    geradorDeProcuracao()
    console.log(menuAtual)
}

else if (menuAtual == 'CAF') {
    gerarContratoAlienacaoFiduciaria()

}




function geradorDeProcuracao() {
    const params = new URLSearchParams(window.location.search);
    // aqui a gente procura o valor dos parametros que contem as informações do procurador 2, se elas estiverem vazias, quer dizer que o procurador 2 não foi preenchido
    let stringVazia = "";
    let valorCpfProc2 = params.get("cpfproc2");
    let valorProc2 = params.get("procurador2");
    let preencheuValoresProcurador2 = false;

    if (valorProc2 !== stringVazia && valorCpfProc2 !== stringVazia) {
        preencheuValoresProcurador2 = true;
    }

    const DadosProcPf = {

        proprietario: params.get('proprietario'),
        cpf: params.get('proprietarioCpf'),
        procurador1: params.get('procurador1'),
        cpfproc1: params.get('cpfproc1'),
        procurador2: params.get('procurador2'),
        cpfproc2: params.get('cpfproc2'),
        placa: params.get('placa'),
        renavam: params.get('renavam'),
        marcamodelo: params.get('marcamodelo'),
        chassi: params.get('chassi'),
        anoveiculo: params.get('anoveiculo'),
        cor: params.get('cor')
    };


    let textoNomeioComProc2 = "nomeio e constituo meus bastantes procuradores:";
    let textoAssinarComProc2 = `Podendo assinar em conjunto ou isoladamente, para fim de vender ou transferir para si próprios,
                    locar,
                    comprar e permutar o veículo com as seguintes
                    características:`;


    let estilosDaPagina = window.document.querySelector("style")

    if (preencheuValoresProcurador2 == true) {
        estilosDaPagina.innerHTML += `           
        #veiculo-id {
            margin-top: 20px;
        }

        #poderes-texto {
            margin-top: 30px;
            font-size: 18px;
        }


        #data-proc {
            margin-top: 10px;
        }

        
        `;

        document.getElementById("com-proc-2").style.display = "block"
        document.getElementById("texto-nomeacao-procuradores").innerHTML = textoNomeioComProc2
        document.getElementById("texto-conjunto-ou-isolado").innerHTML = textoAssinarComProc2
        document.getElementById("nome-proc-2").innerHTML = DadosProcPf.procurador2
        document.getElementById("cpf-proc-2").innerHTML = DadosProcPf.cpfproc2
    }

    document.getElementById("nome-proprietario").innerHTML = DadosProcPf.proprietario
    document.getElementById("nome-proprietario-ass").innerHTML = DadosProcPf.proprietario
    document.getElementById("cpf-prop").innerHTML = DadosProcPf.cpf
    document.getElementById("nome-proc-1").innerHTML = DadosProcPf.procurador1
    document.getElementById("cpf-proc-1").innerHTML = DadosProcPf.cpfproc1
    document.getElementById("marca-mod").innerHTML = DadosProcPf.marcamodelo
    document.getElementById("placa").innerHTML = DadosProcPf.placa
    document.getElementById("renavam").innerHTML = DadosProcPf.renavam
    document.getElementById("chassi").innerHTML = DadosProcPf.chassi
    document.getElementById("anofab-anomod").innerHTML = DadosProcPf.anoveiculo
    document.getElementById("cor").innerHTML = DadosProcPf.cor

}
function gerarContratoAlienacaoFiduciaria() {
    const DadosCAF = {

        credor: params.get('credor1'),
        cpfCredor: params.get('cpfCredor1'),
        rgCredor: params.get('rgCredor1'),
        endCredor: params.get('endCredor1'),
        cepCredor: params.get('cepCredor1'),
        telefoneCredor: params.get('telCredor1'),
        devedor: params.get('devedor1'),
        cpfDevedor: params.get('cpfDevedor1'),
        rgDevedor: params.get('rgDevedor1'),
        endDevedor: params.get('endDevedor1'),
        cepDevedor: params.get('cepDevedor1'),
        telefoneDevedor: params.get('telDevedor1'),
        marcaModelo: params.get('marcaModelo'),
        placa: params.get('placa'),
        renavam: params.get('renavam'),
        chassi: params.get('chassi'),
        ano: params.get('anoFabMod'),
        entrada: params.get('valorEntrada'),
        xParcelas: params.get('xParcelas'),
        valorParcelas: params.get('vlrParcelas')


    };

    let RDomCSS = `:root {

        --font-size: 20px;
        --gap: 8.05px;
        --font-family:"Poppins", sans-serif;
    }


    #marginCSS {
        background-color: rgba(0, 78, 0, 0);
        height: 100%;
        width: 900px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #box-rDom {
        background-color: rgba(39, 240, 39, 0);
        display: flex;
        height: 100%;
        width: 800px;
        flex-direction: column;
        font-family: "Poppins", sans-serif;
        gap: var(--gap);
    }

    #tituloRDom {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #box-devedor,
    #box-credor {
        
        width: 100%;
        font-size: var(--font-size);
    }


    #box-veiculo {
        background-color: rgba(0, 255, 255, 0);
        width: 50%;
        font-size: var(--font-size);

    }

    #box-venda {
        font-size: var(--font-size);
        background-color: rgba(210, 105, 30, 0);
    }

    #parcelasCSS {
        display: flex;
        flex-direction: row;
    }

    .titulos-formato {
        font-weight: 500;
        display: flex;
        

    }


    #texto1,
    #texto2 {


        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 255, 255, 0);
        font-size: var(--font-size);

    }


    #clausula2,
    #clausula3,
    #clausula4,
    #clausula5,
    #clausula6,
    #clausula7 {
        font-size: var(--font-size);
        background-color: rgba(177, 166, 132, 0);
        display: flex;
        flex-direction: column;
        height: auto;
        width: 100%;



    }

    .titulos-clausulas {

        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: rgba(137, 43, 226, 0);

    }

    #divClau {
        display: flex;
        flex-direction: column;
        gap: var(--gap);

    }

    #box-infos {
        display: flex;
        flex-direction: column;
        gap: var(--gap);

    }

    .titulos-partes {
        background-color: rgba(0, 255, 255, 0);
        display: flex;
        width: 30%;
        font-weight: 500;
        font-size: 22px;
    }

    #assinaturas {
        font-size: 22px;
        background-color: rgba(0, 255, 255, 0);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 290px;
        margin-top: 10px;
        gap: 70px;

    }

    #loc-data {
        font-size: 22px;
        background-color: rgba(179, 110, 176, 0);
        display: flex;
        align-items: center;
        justify-content: center;

    }

    #align1,
    #align2 {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .line {
        font-family: "Roboto", sans-serif;
    }

    #box-credor,
    #box-devedor,
    #box-veiculo,
    #box-venda {
        margin-left: 20px;
    }



    #clausula1 {
        font-size: var(--font-size);
        background-color: rgba(7, 138, 214, 0);
        display: flex;
        flex-direction: column;
        height: auto;
        width: 100%;

    }

    .clausula {
        background-color: #ffffff00;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 100%;
        line-height: 1.6;
    }
    .fonte-info-saida{
        font-size: 18px;
        margin-left: 5px;
        margin-right: 5px;
        align-self: center;
        justify-self: end;
        
    }`
    let RDomBody = `<div id="marginCSS">
        <div id="box-rDom">
            <h2 id="tituloRDom">Contrato particular de venda de veículo Nº<div id="nContrato"></div>
            </h2>
            <div id="box-infos">
                <div class="titulos-partes">DADOS DAS PARTES:</div>
                <div id="box-credor">
                    <div class="titulos-formato">• Credor:<div id="credorNome" class="fonte-info-saida">JOÃO SILVA
                            PEREIRA</div>
                    </div>
                    <div class="titulos-formato">• Cpf:<div id="cpfCredor" class="fonte-info-saida">038.882.260-07</div>
                    </div>
                    <div class="titulos-formato">• Rg:<div id="rgCredor" class="fonte-info-saida">4872078</div>
                    </div>
                    <div class="titulos-formato">• Endereço:<div id="enderecoCredor" class="fonte-info-saida">JULIO DE
                        CASTILHOS, 699, RINCÃO, ESTÂNCIA VELHA - RSAAAAAAAAA</div>
                    </div>
                    <div class="titulos-formato">• CEP:<div id="cepCredor" class="fonte-info-saida">93.600-000</div>
                    </div>
                    <div class="titulos-formato">• Telefone:<div id="telefoneCredor" class="fonte-info-saida">51
                            994163466</div>
                    </div>

                </div>
                <div id="box-devedor">
                    <div class="titulos-formato">• Devedor:<div id="devedorNome" class="fonte-info-saida">JOÃO SILVA
                        PEREIRA</div>
                    </div>
                    <div class="titulos-formato">• Cpf:<div id="cpfDevedor" class="fonte-info-saida">038.882.260-07</div>
                    </div>
                    <div class="titulos-formato">• Rg:<div id="rgDevedor" class="fonte-info-saida">4832078</div>
                    </div>
                    <div class="titulos-formato">• Endereço:<div id="enderecoDevedor" class="fonte-info-saida">JULIO DE
                        CASTILHOS, 699, RINCÃO, ESTÂNCIA VELHA - RSAAAAAAAAA</div>
                    </div>
                    <div class="titulos-formato">• CEP:<div id="cepDevedor" class="fonte-info-saida">93.600-000</div>
                    </div>
                    <div class="titulos-formato">• Telefone:<div id="telefoneDevedor" class="fonte-info-saida">51
                        994163466</div>
                    </div>
                </div>
                <div class="titulos-partes">DADOS DO VEÍCULO:</div>
                <div id="box-veiculo">
                    <div class="titulos-formato">• Marca/Modelo:<div id="marcaVeiculo" class="fonte-info-saida">HONDA BIZ 125KS</div>
                    </div>
                    <div class="titulos-formato">• Placa:<div id="placaVeiculo" class="fonte-info-saida">IOV-9478</div>
                    </div>
                    <div class="titulos-formato">• Renavam:<div id="renavamVeiculo" class="fonte-info-saida">01234567891</div>
                    </div>
                    <div class="titulos-formato">• Chassi:<div id="chassiVeiculo" class="fonte-info-saida">9BGK348V0JF153530</div>
                    </div>
                    <div class="titulos-formato">• Ano Fab/Modelo:<div id="anoVeiculo" class="fonte-info-saida">2009-2009</div>
                    </div>
                </div>
                <div class="titulos-partes">DADOS DA VENDA:</div>
                <div id="box-venda">
                    <div class="titulos-formato">• Valor total: <div id="valorTotal" class="fonte-info-saida">R$20.900,00.</div>
                    ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀</div>
                    <div class="titulos-formato">• Valor da entrada:<div id="valorEntrada" class="fonte-info-saida">
                        </div>⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
                    </div>
                    <div class="titulos-formato">• Valor financiado: <div id="valorFinanciado" class="fonte-info-saida">R$10.900,00
                        </div>⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
                    </div>
                    <div class="titulos-formato" id="parcelasCSS">• Parcelas:<div id="xParcelas"
                            class="fonte-info-saida">20</div>parcelas de R$<div id="valorParcelas"
                            class="fonte-info-saida">R$545,00</div>cada. ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀
                    </div>
                    <div class="titulos-formato">• Primeira parcela: <div class="fonte-info-saida" id="primeiraParcela">10/10/2024</div>
                    ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀</div>
                    <div class="titulos-formato">• Última parcela: <div class="fonte-info-saida" id="ultimaParcela">10/05/2026</div>
                    ⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀⍀</div>
                    <div class="titulos-formato">• Formas de pagamento: PIX, Dinheiro ou transferência bancária.⍀⍀⍀⍀⍀⍀</div>
                </div>
            </div>
            <div id="texto1">As partes acima mencionadas têm entre si justo e contratado o presente Contrato de
                Venda de Veículo, que se regerá pelas cláusulas seguintes:
            </div>

            <div id="divClau">
                <div id="clausula1">
                    <div class="titulos-clausulas">CLÁUSULA 1:</div>
                    <div>
                        O CREDOR vende ao DEVEDOR o veículo descrito acima pelo
                        valor total de R$<span class="fonte-info-saida" id="clausula1-total">20.900,00</span>.
                    </div>
                </div>
                <div id="clausula2">
                    <div class="titulos-clausulas">CLÁUSULA 2:</div>

                    
                    <div class="clausula2-2">
                        Por conta do preço referido na cláusula 1, o DEVEDOR pagou neste ato a quantia de <span
                            class="fonte-info-saida" id="clausula-entrada-valor">R$10.000,00</span> e o valor financiado de 
                        <span class="fonte-info-saida" id="clausula-financiado-valor">R$10.900,00</span>, que será pago em <span
                            class="fonte-info-saida" id="clausula-parcelas-numero">20</span> parcelas de
                        <span class="fonte-info-saida" id="clausula-parcelas-valor">R$545,00</span> cada, pago em dinheiro, PIX,
                        ou transferência bancária, nas seguintes datas: a primeira em <span class="fonte-info-saida"
                            id="clausula-data-primeira">10/10/2024</span> e a última
                        em <span class="fonte-info-saida" id="clausula-data-ultima">10/05/2026</span>.
                    </div>
                    
                </div>
                <div id="clausula3">
                    <div class="titulos-clausulas">CLÁUSULA 3:</div>
                    Por força do pacto da alienação fiduciária, fica estabelecido que o CREDOR terá a prioridade
                    sobre o
                    veículo descrito na cláusula 1 até que seja liquidada a última das prestações mencionadas acima.
                </div>
                <div id="clausula4">
                    <div class="titulos-clausulas">CLÁUSULA 4:</div>
                    Em caso de atraso no pagamento de qualquer parcela mencionada na cláusula 2, o DEVEDOR incorrerá
                    em
                    multa de 2% sobre o valor em atraso, além de juros de mora de 1% ao mês. O não cumprimento das
                    obrigações financeiras poderá resultar na restituição do veículo ao CREDOR, conforme estipulado
                    nos
                    artigos 343 e seguintes do Código de Processo Civil. ÚNICO - O CREDOR poderá optar pela rescisão
                    deste
                    contrato em caso de mora ou inadimplemento pelo DEVEDOR, procedendo à cobrança judicial dos
                    valores
                    devidos.
                </div>
                <div id="clausula5">
                    <div class="titulos-clausulas">CLÁUSULA 5:</div>
                    A falência do DEVEDOR implicará na resolução deste contrato, permitindo ao CREDOR reivindicar o
                    veículo
                    junto à massa falida.
                </div>
                <div id="clausula6">
                    <div class="titulos-clausulas">CLÁUSULA 6:</div>
                    Enquanto não estiver integralmente pago o preço estipulado na cláusula 2, o DEVEDOR se
                    compromete a
                    manter o veículo em perfeito estado de conservação, protegendo-o contra terceiros e permitindo
                    ao
                    CREDOR
                    inspecioná-lo quando necessário, mediante aviso prévio por escrito em caso de mudança de
                    residência.
                </div>
                <div id="clausula7">
                    <div class="titulos-clausulas">CLÁUSULA 7:</div>
                    O DEVEDOR assume integral responsabilidade civil e criminal por quaisquer acidentes, multas de
                    trânsito,
                    impostos, seguro obrigatório e outras obrigações relacionadas ao veículo a partir da data de
                    assinatura
                    deste contrato. Até a assinatura do contrato, essas obrigações são de responsabilidade do
                    CREDOR.
                </div>
            </div>
            <div id="texto2">E, por estarem assim justos e contratados, firmam o presente instrumento particular em
                duas
                vias de igual teor, juntamente com as testemunhas abaixo assinadas.</div>
            <div id="loc-data">Local e data: <div id="loc-data-valor">Estância Velha, 26 de JULHO DE 2024.</div>
            </div>

            <div id="assinaturas">
                <div id="align1">
                    <div class="line">________________________________________</div>
                    <div id="credorAss">JOÃO SILVA
                        PEREIRA</div>
                </div>
                <div id="align2">
                    <div class="line">________________________________________</div>
                    <div id="devedorAss">JOÃO SILVA
                        PEREIRA</div>
                </div>
            </div>

        </div>
    </div>`

    let C = window.document.getElementById('cssTag')
    let D = window.document.getElementById('bodyTag')


    C.innerHTML = (RDomCSS)
    D.innerHTML = (RDomBody)
    document.getElementById("credorNome").innerHTML = DadosCAF.credor
    document.getElementById("cpfCredor").innerHTML = DadosCAF.cpfCredor
    document.getElementById("rgCredor").innerHTML = DadosCAF.rgCredor
    document.getElementById("enderecoCredor").innerHTML = DadosCAF.endCredor
    document.getElementById("cepCredor").innerHTML = DadosCAF.cepCredor
    document.getElementById("telefoneCredor").innerHTML = DadosCAF.telefoneCredor
    document.getElementById("devedorNome").innerHTML = DadosCAF.devedor
    document.getElementById("cpfDevedor").innerHTML = DadosCAF.cpfDevedor
    document.getElementById("rgDevedor").innerHTML = DadosCAF.rgDevedor
    document.getElementById("enderecoDevedor").innerHTML = DadosCAF.endDevedor
    document.getElementById("cepDevedor").innerHTML = DadosCAF.cepDevedor
    document.getElementById("telefoneDevedor").innerHTML = DadosCAF.telefoneDevedor
    document.getElementById("marcaVeiculo").innerHTML = DadosCAF.marcaModelo
    document.getElementById("placaVeiculo").innerHTML = DadosCAF.placa
    document.getElementById("renavamVeiculo").innerHTML = DadosCAF.renavam
    document.getElementById("chassiVeiculo").innerHTML = DadosCAF.chassi
    document.getElementById("anoVeiculo").innerHTML = DadosCAF.ano
    document.getElementById("valorEntrada").innerHTML = DadosCAF.entrada
    document.getElementById("xParcelas").innerHTML = DadosCAF.xParcelas
    document.getElementById("valorParcelas").innerHTML = DadosCAF.valorParcelas
    //document.getElementById("ultimaParcela").innerHTML = DadosCAF. // ari
    //document.getElementById("valorFinanciado").innerHTML = DadosCAF. // ari
    //document.getElementById("valorTotal").innerHTML = DadosCAF. // ari
    //document.getElementById("clausula1-total").innerHTML = DadosCAF. // ari
    document.getElementById("clausula-entrada-valor").innerHTML = DadosCAF.entrada
    //document.getElementById("clausula-financiado-valor").innerHTML = DadosCAF. // ari
    document.getElementById("clausula-parcelas-numero").innerHTML = DadosCAF.xParcelas
    document.getElementById("clausula-parcelas-valor").innerHTML = DadosCAF.valorParcelas
    document.getElementById("clausula-data-primeira").innerHTML = DadosCAF.dataPrimeiraParcela
    //document.getElementById("clausula-data-ultima").innerHTML = DadosCAF. // ari
    //document.getElementById("loc-data-valor").innerHTML = DadosCAF. //ari
    document.getElementById("credorAss").innerHTML = DadosCAF.credor
    document.getElementById("devedorAss").innerHTML = DadosCAF.devedor


}