
//QUERO COLOCAR DENTRO DE UMA FUNCTION

const params = new URLSearchParams(window.location.search);
const trueOrfalse = params.get('proc2TF')
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

let OneProcText = `<div id="title">Procuração</div>


<div id="pessoas-id">
    <div>Pelo presente instrumento particular de procuração, eu:</div>

    <div id="cxprop">
        <div id="nome-proprietario" class="fonte-info-saida"></div>
        <div id="cpf-fixed">CPF:</div>
        <div id="cpf-prop" class="fonte-info-saida"></div>
    </div>

    <div>nomeio e constituo meu bastante procurador:</div>
    <div id="cxproc">
        <div id="nome-proc-1" class="fonte-info-saida"></div>
        <div id="cpf-fixed">CPF:</div>
        <div id="cpf-proc-1" class="fonte-info-saida"></div>
    </div>
    A fim de vender ou transferir para si próprio, locar, comprar e permutar o veículo com as seguintes
    características:
</div>

<div id="veiculo-id">
    <div id="veiculo-id1">
        Marca/Modelo:<div id="marca-mod" class="fonte-info-saida"></div>
        Placa:<div id="placa" class="fonte-info-saida"></div>
        Renavam:<div id="renavam" class="fonte-info-saida"></div>
    </div>
    <div id="veiculo-id2">
        Chassi:<div id="chassi" class="fonte-info-saida"></div>
        Ano/Modelo:<div id="anofab-anomod" class="fonte-info-saida"></div>
        Cor do veículo:<div id="cor" class="fonte-info-saida"></div>
    </div>
</div>

<div id="poderes-texto">

    Podendo ainda efetuar a venda ou transferir a si próprios,
    receber o preço, solicitar ATPVe, assinar requerimentos, realizar vistorias, com poderes também para
    requerer ,
    junto aos CRVAS/DETRAN-RS, os processos de 2ª via de CRV/CRLV, podendo assinar declaração de endereço
    residencial e
    de perda/extravio do CRV/CRLV, baixa definitiva do veículo, alteração de informação do veículo, alteração de
    característica, autorização e renovação de RNTRC ( ANTT), cancelamento de processo, autorização para
    regravação
    de
    chassi, colocar restrição por transferência, liberar restrição por transferência, troca de município,
    alteração
    de
    entrega do CRV e ou CRLV, inclusão de representar perante quaisquer repartições públicas e/ou privadas para
    tratar
    de assuntos que forem relacionados à inclusão, renovação ou exclusão do combustível GNV ( Gás Natural
    Veicular),
    assinar contratos de inclusão e liberação de: alienação, locação, comodato, reserva de domínio, e ainda
    assinar
    carta de desistência de leasing, endossar documentos, retirar documentos junto ás agências dos correios,
    retirar
    o
    veículo de depósito, usar o veículo em apreço, manejando o mesmo, em qualquer parte do território nacional
    ou
    podendo transferir para si próprio conforme Art. 685 do código civil, causa própria e finalmente, usar e
    gozar
    do
    veículo como uma coisa sua e sem interferência ou autorização de outros, podendo ainda substabelecer a
    presente
    no
    todo ou parte, praticar enfim os mais amplos e ilimitados poderes no fiel cumprimento do presente mandato. O
    presente mandato é celebrado em caráter IRREVOGAVEL, SEM PRESTAÇÃO DE CONTAS e podendo agir em causa
    própria.
    Outorgante, pelo presente instrumento declara-se responsável pelos pagamentos de multas e impostos do
    veículo
    acima
    descrito e caracterizado, até a data da outorga do presente mandato.
</div>

<div id="data-proc">Local e data:

    <div id="linha-data">____________________, ______/____________/______.</div>

</div>

<div id="campo-de-assinatura">


    <div id="linha">
        _____________________________________________________

    </div>

    <div id="campo-assinatura">

        <div id="nome-proprietario-ass" class="fonte-info-saida"></div>

    </div>


</div>`
let TwoProcText = `<div id="title">Procuração</div>
<div id="pessoas-id">
    <div>Pelo presente instrumento particular de procuração, eu:</div>
    <div id="cxprop">
        <div id="nome-proprietario" class="fonte-info-saida"></div>
        <div id="cpf-fixed">CPF:</div>
        <div id="cpf-prop" class="fonte-info-saida"></div>
    </div>
    <div>nomeio e constituo meus bastantes procuradores:</div>
    <div id="cxproc">
        <div id="nome-proc-1" class="fonte-info-saida"></div>
        <div id="cpf-fixed">CPF:</div>
        <div id="cpf-proc-1" class="fonte-info-saida"></div>
    </div>
    <div>E também:</div>
    <div id="cxproc2">
        <div id="nome-proc-2" class="fonte-info-saida"></div>
        <div id="cpf-fixed">CPF:</div>
        <div id="cpf-proc-2" class="fonte-info-saida"></div>
    </div>
    Podendo assinar em conjunto ou isoladamente, para fim de vender ou transferir para si próprios, locar,
    comprar e permutar o veículo com as seguintes
    características:
</div>
<div id="veiculo-id">
    <div id="veiculo-id1">
        Marca/Modelo:<div id="marca-mod" class="fonte-info-saida"></div>
        Placa:<div id="placa" class="fonte-info-saida"></div>
        Renavam:<div id="renavam" class="fonte-info-saida"></div>
    </div>
    <div id="veiculo-id2">
        Chassi:<div id="chassi" class="fonte-info-saida"></div>
        Ano/Modelo:<div id="anofab-anomod" class="fonte-info-saida"></div>
        Cor do veículo:<div id="cor" class="fonte-info-saida"></div>
    </div>
</div>
<div id="poderes-texto">

    Podendo ainda efetuar a venda ou transferi a si próprio,
    receber o preço, solicitar ATPVe, assinar requerimentos, realizar vistorias, com poderes também para
    requerer ,
    junto aos CRVAS/DETRAN-RS, os processos de 2ª via de CRV/CRLV, podendo assinar declaração de endereço
    residencial e
    de perda/extravio do CRV/CRLV, baixa definitiva do veículo, alteração de informação do veículo, alteração de
    característica, autorização e renovação de RNTRC ( ANTT), cancelamento de processo, autorização para
    regravação
    de
    chassi, colocar restrição por transferência, liberar restrição por transferência, troca de município,
    alteração
    de
    entrega do CRV e ou CRLV, inclusão de representar perante quaisquer repartições públicas e/ou privadas para
    tratar
    de assuntos que forem relacionados à inclusão, renovação ou exclusão do combustível GNV ( Gás Natural
    Veicular),
    assinar contratos de inclusão e liberação de: alienação, locação, comodato, reserva de domínio, e ainda
    assinar
    carta de desistência de leasing, endossar documentos, retirar documentos junto ás agências dos correios,
    retirar
    o
    veículo de depósito, usar o veículo em apreço, manejando o mesmo, em qualquer parte do território nacional
    ou
    podendo transferir para si próprio conforme Art. 685 do código civil, causa própria e finalmente, usar e
    gozar
    do
    veículo como uma coisa sua e sem interferência ou autorização de outros, podendo ainda substabelecer a
    presente
    no
    todo ou parte, praticar enfim os mais amplos e ilimitados poderes no fiel cumprimento do presente mandato. O
    presente mandato é celebrado em caráter IRREVOGAVEL, SEM PRESTAÇÃO DE CONTAS e podendo agir em causa
    própria.
    Outorgante, pelo presente instrumento declara-se responsável pelos pagamentos de multas e impostos do
    veículo
    acima
    descrito e caracterizado, até a data da outorga do presente mandato.
</div>
<div id="data-proc">Local e data:
    <div id="linha-data">____________________, ______/____________/______.</div>
</div>
<div id="campo-de-assinatura">
    <div id="linha">
        _____________________________________________________
    </div>
    <div id="campo-assinatura">
        <div id="nome-proprietario-ass" class="fonte-info-saida"></div>
    </div>
</div>`
let CSS2Proc = `#box-proc {
    background-color: rgba(0, 128, 0, 0);
    display: flex;
    height: 1300px;
    width: 900px;
    flex-direction: column;
    font-family: "Poppins", sans-serif;
}

#title {

    height: 60px;
    display: flex;
    background-color: rgba(236, 255, 127, 0);
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-style: normal;
    font-size: 50px;
}

#veiculo-id {
    background-color: rgba(91, 165, 42, 0);
    height: 190px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 500;
    margin-top: 20px;
}
#veiculo-id1 {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    background-color: rgba(121, 121, 252, 0);

}

#veiculo-id2 {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    background-color: rgba(255, 166, 0, 0);

}

#poderes-texto {

    margin-top: 30px;
    font-size: 18px;
    background-color: rgba(127, 255, 212, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}

.fonte-info-saida {

    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;

}

#data-proc {
    margin-top: 10px;
    font-size: 22px;
    background-color: rgba(56, 245, 31, 0);
    height: 50px;
    display: flex;
    align-items: end;
    justify-content: center;
}

#campo-de-assinatura {

    margin-top: 20px;
    background-color: rgba(165, 42, 42, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    width: 900px;
    height: 100px;
    gap: 10px;


}

#linha {

    font-family: "Roboto", sans-serif;


}

#campo-assinatura {
    background-color: rgba(152, 152, 255, 0);
    font-size: 22px;
    height: 24px;
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#cxprop {
    display: flex;
    flex-direction: row;
    background-color: rgba(0, 255, 255, 0);
    width: 900px;
    align-items: center;
    justify-content: center;

}

#nome-proc-1,
#nome-proc-2 {
    height: 30px;
    background-color: rgba(73, 226, 43, 0);
    display: flex;
    justify-content: center;
}

#cpf-proc-1,
#cpf-proc-2 {
    width: 200px;
    height: 30px;
    background-color: rgba(236, 66, 66, 0);
    display: flex;
    justify-content: cente
}

#cpf-fixed {

    margin-left: 5px;
    background-color: rgba(255, 0, 0, 0);
}

#linha-data {

    display: flex;
    margin-left: 20px;
    font-family: "Roboto", sans-serif;
}

#nome-proprietario {

    height: 30px;
    background-color: rgba(73, 226, 43, 0);
    display: flex;
    justify-content: center;
}

#cpf-fixed {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 30px;
    background-color: rgba(236, 26, 26, 0);
}

#cpf-prop {
    width: 200px;
    height: 30px;
    background-color: rgba(32, 48, 197, 0);
    display: flex;


}

#pessoas-id {

    margin-top: 20px;
    display: flex;
    flex-direction: column;
    height: 200px;
    background-color: rgba(58, 226, 43, 0);
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

#cxproc,
#cxproc2 {

    display: flex;
    flex-direction: row;
    background-color: rgba(234, 0, 255, 0);
    width: 900px;
    align-items: center;
    justify-content: center;
}`
let CSS1Proc = `#box-proc {
    background-color: rgba(0, 128, 0, 0);
    display: flex;
    height: 1300px;
    width: 900px;
    flex-direction: column;
    font-family: "Poppins", sans-serif;
}

#title {

    height: 60px;
    display: flex;
    background-color: rgba(236, 255, 127, 0);
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-style: normal;
    font-size: 50px;
}

#pessoas-id {
    display: flex;
    flex-direction: column;
    height: 200px;
    background-color: rgba(137, 43, 226, 0);
    align-items: center;
    justify-content: center;
    font-size: 20px;
}


#veiculo-id {
    background-color: rgba(165, 42, 42, 0);
    height: 190px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 500;

}


#veiculo-id1 {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    background-color: rgba(121, 121, 252, 0);

}

#veiculo-id2 {


    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    background-color: rgba(255, 166, 0, 0);

}

#poderes-texto {


    font-size: 20px;
    background-color: rgba(127, 255, 212, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}

.fonte-info-saida {

    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;

}

#data-proc {

    font-size: 22px;
    background-color: rgba(56, 245, 31, 0);
    height: 50px;
    display: flex;
    align-items: end;
    justify-content: center;
}

#campo-de-assinatura {

    margin-top: 20px;
    background-color: rgba(165, 42, 42, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    width: 900px;
    height: 100px;
    gap: 10px;


}

#linha {

    font-family: "Roboto", sans-serif;


}

#campo-assinatura {
    background-color: rgba(152, 152, 255, 0);
    font-size: 22px;
    height: 24px;
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#cxprop {
    display: flex;
    flex-direction: row;
    background-color: rgba(0, 255, 255, 0);
    width: 900px;
    align-items: center;
    justify-content: center;

}

#cxproc {

    display: flex;
    flex-direction: row;
    background-color: rgba(0, 255, 255, 0);
    width: 900px;
    align-items: center;
    justify-content: center;


}

#nome-proc-1 {
    height: 30px;
    background-color: rgba(73, 226, 43, 0);
    display: flex;
    justify-content: center;
}

#cpf-proc-1 {
    width: 200px;
    height: 30px;
    background-color: rgba(236, 66, 66, 0);
    display: flex;
    justify-content: cente
}

#cpf-fixed {

    margin-left: 5px;
    background-color: rgba(255, 0, 0, 0);
}

#linha-data {

    display: flex;
    margin-left: 20px;
    font-family: "Roboto", sans-serif;
}

#nome-proprietario {

    height: 30px;
    background-color: rgba(73, 226, 43, 0);
    display: flex;
    justify-content: center;
}

#cpf-fixed {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 30px;
    background-color: rgba(236, 26, 26, 0);
}

#cpf-prop {
    width: 200px;
    height: 30px;
    background-color: rgba(32, 48, 197, 0);
    display: flex;


}`
let A = window.document.getElementById('box-proc')
let B = window.document.getElementById('cssTag')

if (trueOrfalse == "false") {

    B.innerHTML = (CSS1Proc)
    A.innerHTML = (OneProcText)
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
else {
    B.innerHTML = (CSS2Proc)
    A.innerHTML = (TwoProcText)
    document.getElementById("nome-proprietario").innerHTML = DadosProcPf.proprietario
    document.getElementById("nome-proprietario-ass").innerHTML = DadosProcPf.proprietario
    document.getElementById("cpf-prop").innerHTML = DadosProcPf.cpf
    document.getElementById("nome-proc-1").innerHTML = DadosProcPf.procurador1
    document.getElementById("cpf-proc-1").innerHTML = DadosProcPf.cpfproc1
    document.getElementById("nome-proc-2").innerHTML = DadosProcPf.procurador2
    document.getElementById("cpf-proc-2").innerHTML = DadosProcPf.cpfproc2
    document.getElementById("marca-mod").innerHTML = DadosProcPf.marcamodelo
    document.getElementById("placa").innerHTML = DadosProcPf.placa
    document.getElementById("renavam").innerHTML = DadosProcPf.renavam
    document.getElementById("chassi").innerHTML = DadosProcPf.chassi
    document.getElementById("anofab-anomod").innerHTML = DadosProcPf.anoveiculo
    document.getElementById("cor").innerHTML = DadosProcPf.cor
}

//QUERO COLOCAR DENTRO DE UMA FUNCTION
