let menuAbertoAtual = null;


const formPrincipal = document.getElementById("encaixotei")
const cxInfisico = document.getElementById("caixa-dos-inputs-fisicos")
const cxInjuridico = document.getElementById("caixa-dos-inputs-juridicos")
const cxInGrandes = document.getElementById("caixa-dos-inputs-grande")
const cxProcSType = document.getElementById("procSelectType")
const cxContrSType = document.getElementById("contractSelectType")
const cxContratoRDom = document.getElementById("inputBoxContratoResDom")
const cxRDomPartes = document.getElementById("inputBoxPartes")
const cxRDomVeVe = document.getElementById("inputBoxVeiculoEVenda")

cxContratoRDom.addEventListener("submit", gerarContratoAlienacaoFiduciaria)
formPrincipal.addEventListener("submit", gerarProc)

function clean() {
    document.getElementById('procPfInput1').value = ""
    document.getElementById('procPfInput2').value = ""
    document.getElementById('procPfInput3').value = ""
    document.getElementById('procPfInput4').value = ""
    document.getElementById('procPfInput5').value = ""
    document.getElementById('procPfInput6').value = ""
    document.getElementById('placa').value = ""
    document.getElementById('rnvvei').value = ""
    document.getElementById('marmodvei').value = ""
    document.getElementById('chassi1').value = ""
    document.getElementById('anoveiculo').value = ""
    document.getElementById('corveiculo').value = ""
}
function preencher() {

    if (menuAbertoAtual == "gerador-procuracao-fisica") {

        document.getElementById('procPfInput1').value = "MURILO GRADEL SOUZA BRITO"
        document.getElementById('procPfInput2').value = "038.882.260-07"
        document.getElementById('procPfInput3').value = "MARIO DUARTE SOUZA PEREIRA PINTO"
        document.getElementById('procPfInput4').value = "397.001.626-64"
        document.getElementById('procPfInput5').value = "JECA TATU DO MATO FERRAZ BRAS"
        document.getElementById('procPfInput6').value = "038.882.260-07"
        document.getElementById('placa').value = "JTV-6591"
        document.getElementById('rnvvei').value = "12345678935"
        document.getElementById('marmodvei').value = "Ferrari 456 GT"
        document.getElementById('chassi1').value = "9BGKC9103292B3"
        document.getElementById('anoveiculo').value = "2010 - 2010"
        document.getElementById('corveiculo').value = "VERMELHO"
    }
    else if (menuAbertoAtual == "ContratoAlienacaoFiduciariaPg2") {

        document.getElementById('credor1').value = "JOSNELSON"
        document.getElementById('cpfCredor1').value = "0000000"
        document.getElementById('rgCredor1').value = "00000000"
        document.getElementById('endCredor1').value = "JOSE OSMAR 144"
        document.getElementById('cepCredor1').value = "000000"
        document.getElementById('telCredor1').value = "51999999999"
        document.getElementById('devedor1').value = "MARCIO"
        document.getElementById('cpfDevedor1').value = "03888226007"
        document.getElementById('rgDevedor1').value = "314139432"
        document.getElementById('endDevedor1').value = "GERNAMO DAUERNHEIMER"
        document.getElementById('cepDevedor1').value = "93610-740"
        document.getElementById('telDevedor1').value = "4002-8922"
        document.getElementById('MaMod').value = "Sonata"
        document.getElementById('placa1').value = "IEB-4922"
        document.getElementById('renavam1').value = "0109284"
        document.getElementById('chass').value = "AAAAAAAAAAA"
        document.getElementById('anoFabMod').value = "2001-2002"
        document.getElementById('vlrEntrada').value = "2000"
        document.getElementById('xParcelas1').value = "24"
        document.getElementById('vlrParcelas').value = "200"


    }
}

function esconderProcSelecType(tipoproc) {


    //ESCONDE A CAIXA DE POP UP
    cxProcSType.style.display = "none"
    // MOSTRA A CAIXA DOS INPUTS DO FORMULARIO
    cxInGrandes.style.display = "flex"


    // SE O BOTÃO QUE FOI CLICADO FOI O BOTÃO DE PESSOA FISICA
    if (tipoproc == "fisica") {
        // EXECUTA ISSO ABAIXO


        document.getElementById("procPjInput1").required = false
        document.getElementById("procPjInput2").required = false
        cxInjuridico.style.display = "none" // fecha input juridicos
        cxInfisico.style.display = "flex" // abre inputs físicos
        menuAbertoAtual = "gerador-procuracao-fisica"
        console.log(menuAbertoAtual);

    }

    // SE O BOTÃO QUE FOI CLICADO FOI O BOTÃO DE PESSOA JURIDICA
    if (tipoproc == "juridica") {
        // EXECUTA ISSO ABAIXO

        document.getElementById("procPfInput1").required = false
        document.getElementById("procPfInput2").required = false
        cxInfisico.style.display = "none"
        cxInjuridico.style.display = "flex"
        menuAbertoAtual = "gerador-procuracao-juridica"
        console.log(menuAbertoAtual);
    }
}
function retornaProcSelecType() {

    cxInGrandes.style.display = "none"
    cxProcSType.style.display = "flex"
    menuAbertoAtual = "gerador-de-procuracao-type"
    console.log(menuAbertoAtual);

}
function fecharTodosMenus() {
    cxProcSType.style.display = "none";
    cxInGrandes.style.display = "none";
    cxContrSType.style.display = "none";
    menuAbertoAtual = "null"
}
function openProcSelecType() {
    fecharTodosMenus();
    cxProcSType.style.display = "flex"
    menuAbertoAtual = "gerador-de-procuracao-type"
    console.log(menuAbertoAtual);
}
function gerarProcPf() {

    const DadosProcPf = {

        proprietario: document.getElementById('procPfInput1').value,
        proprietarioCpf: document.getElementById('procPfInput2').value,
        procurador1: document.getElementById('procPfInput3').value,
        cpfproc1: document.getElementById('procPfInput4').value,
        placa: document.getElementById('placa').value,
        renavam: document.getElementById('rnvvei').value,
        marcamodelo: document.getElementById('marmodvei').value,
        chassi: document.getElementById('chassi1').value,
        anoveiculo: document.getElementById('anoveiculo').value,
        cor: document.getElementById('corveiculo').value,
        proc2TF: false,
        MAA: 'geradorDeProcuracao'
    };

    window.open(`./docsaida.html?MAA=${DadosProcPf.MAA}&proc2TF=${DadosProcPf.proc2TF}&proprietario=${DadosProcPf.proprietario}&proprietarioCpf=${DadosProcPf.proprietarioCpf}&procurador1=${DadosProcPf.procurador1}&cpfproc1=${DadosProcPf.cpfproc1}&placa=${DadosProcPf.placa}&renavam=${DadosProcPf.renavam}&marcamodelo=${DadosProcPf.marcamodelo}&chassi=${DadosProcPf.chassi}&anoveiculo=${DadosProcPf.anoveiculo}&cor=${DadosProcPf.cor}`)


}
function gerarProcPf2() {

    const DadosProcPf = {

        proprietario: document.getElementById('procPfInput1').value,
        proprietarioCpf: document.getElementById('procPfInput2').value,
        procurador1: document.getElementById('procPfInput3').value,
        cpfproc1: document.getElementById('procPfInput4').value,
        procurador2: document.getElementById('procPfInput5').value,
        cpfproc2: document.getElementById('procPfInput6').value,
        placa: document.getElementById('placa').value,
        renavam: document.getElementById('rnvvei').value,
        marcamodelo: document.getElementById('marmodvei').value,
        chassi: document.getElementById('chassi1').value,
        anoveiculo: document.getElementById('anoveiculo').value,
        cor: document.getElementById('corveiculo').value,
        proc2TF: true,
        MAA: 'geradorDeProcuracao'
    };

    window.open(`./docsaida.html?MAA=${DadosProcPf.MAA}&proc2TF=${DadosProcPf.proc2TF}&proprietario=${DadosProcPf.proprietario}&proprietarioCpf=${DadosProcPf.proprietarioCpf}&procurador1=${DadosProcPf.procurador1}&cpfproc1=${DadosProcPf.cpfproc1}&procurador2=${DadosProcPf.procurador2}&cpfproc2=${DadosProcPf.cpfproc2}&placa=${DadosProcPf.placa}&renavam=${DadosProcPf.renavam}
        &marcamodelo=${DadosProcPf.marcamodelo}&chassi=${DadosProcPf.chassi}&anoveiculo=${DadosProcPf.anoveiculo}&cor=${DadosProcPf.cor}`)
    console.log(DadosProcPf)

}
function gerarProc(evento1) {

    const procurador2 = document.getElementById('procPfInput5').value;
    const cpfproc2 = document.getElementById('procPfInput6').value;
    let temValor = procurador2 !== '' && cpfproc2 !== '';
    evento1.preventDefault()

    // if (evento1 != null) {

    //     evento1.preventDefault()

    if (menuAbertoAtual == "gerador-procuracao-fisica" && temValor == false) {
        gerarProcPf()
        console.log(temValor)
    }
    if (menuAbertoAtual == "gerador-procuracao-fisica" && temValor == true) {
        gerarProcPf2()
        console.log(temValor)
    }
    // else if (menuAbertoAtual == "gerador-procuracao-juridica") {
    //     gerarProcPj()
    // }

}
function openContratos() {

    fecharTodosMenus();
    cxContrSType.style.display = "flex"
    menuAbertoAtual = "contratos";
    console.log(menuAbertoAtual);


}
function fecharGuia() {

    if (menuAbertoAtual == "gerador-de-procuracao-type") {
        cxProcSType.style.display = "none"
    }
    if (menuAbertoAtual == "contratos") {
        cxContrSType.style.display = "none"
    }

}
function abrirContratoReservaDominioPg1() {


    cxContratoRDom.style.display = "flex"
    cxRDomPartes.style.display = "flex"
    cxRDomVeVe.style.display = "none"
    cxContrSType.style.display = "none"
    menuAbertoAtual = "ContratoAlienacaoFiduciariaPg1"
    console.log(menuAbertoAtual)

}
function abrirContratoReservaDominioPg2() {

    cxRDomPartes.style.display = "none"
    cxRDomVeVe.style.display = "flex"
    menuAbertoAtual = "ContratoAlienacaoFiduciariaPg2"
    console.log(menuAbertoAtual)

}
function gerarContratoAlienacaoFiduciaria(event1) {

    event1.preventDefault()

    const dadosContratoRDom = {

        credor1: document.getElementById('credor1').value,
        cpfCredor1: document.getElementById('cpfCredor1').value,
        rgCredor1: document.getElementById('rgCredor1').value,
        endCredor1: document.getElementById('endCredor1').value,
        cepCredor1: document.getElementById('cepCredor1').value,
        telCredor1: document.getElementById('telCredor1').value,
        devedor1: document.getElementById('devedor1').value,
        cpfDevedor1: document.getElementById('cpfDevedor1').value,
        rgDevedor1: document.getElementById('rgDevedor1').value,
        endDevedor1: document.getElementById('endDevedor1').value,
        cepDevedor1: document.getElementById('cepDevedor1').value,
        telDevedor1: document.getElementById('telDevedor1').value,
        marcaModelo: document.getElementById('MaMod').value,
        placa: document.getElementById('placa1').value,
        renavam: document.getElementById('renavam1').value,
        chassi: document.getElementById('chassi2').value,
        anoFabMod: document.getElementById('anoFabMod').value,
        valorEntrada: document.getElementById('vlrEntrada').value,
        xParcelas: document.getElementById('xParcelas1').value,
        vlrParcelas: document.getElementById('vlrParcelas').value,
        MAA: 'CAF'
    };

    window.open(`./docsaida.html?MAA=${dadosContratoRDom.MAA}&credor1=${dadosContratoRDom.credor1}&cpfCredor1=${dadosContratoRDom.cpfCredor1}&rgCredor1=${dadosContratoRDom.rgCredor1}&endCredor1=${dadosContratoRDom.endCredor1}&cepCredor1=${dadosContratoRDom.cepCredor1}&telCredor1=${dadosContratoRDom.telCredor1}&devedor1=${dadosContratoRDom.devedor1}&cpfDevedor1=${dadosContratoRDom.cpfDevedor1}&rgDevedor1=${dadosContratoRDom.rgDevedor1}&endDevedor1=${dadosContratoRDom.endDevedor1}&cepDevedor1=${dadosContratoRDom.cepDevedor1}&telDevedor1=${dadosContratoRDom.telDevedor1}&marcaModelo=${dadosContratoRDom.marcaModelo}&placa=${dadosContratoRDom.placa}&renavam=${dadosContratoRDom.renavam}&chassi=${dadosContratoRDom.chassi}&anoFabMod=${dadosContratoRDom.anoFabMod}&valorEntrada=${dadosContratoRDom.valorEntrada}&xParcelas=${dadosContratoRDom.xParcelas}&vlrParcelas=${dadosContratoRDom.vlrParcelas}`)


}




