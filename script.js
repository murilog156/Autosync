
// EXECUTA ESSA FUNÇÃO QUANDO EU CLICO EM QUALQUER BOTÃO DE TIPOS
// E PASSA COMO PARAMETRO QUAL O BOTÃO QUE EU CLIQUEI
// PARA EU PODER DECIDIR O QUE FAÇO CONFORME O TIPO QUE RECEBI

// Operador OU -> || 
// Operador AND -> &&
// Operador maior que ->  >
// Operador menor que ->  <
// Operador menor ou igual que ->  <=
// Operador maior ou igual que ->  >=
/* Estados menuAbertoAtual possíveis:

gerador-de-procuracao-type
gerador-procuracao-juridica
gerador-procuracao-fisica
recibo-simples

*/


let menuAbertoAtual = null;
const formPrincipal = document.getElementById("encaixotei")
const cxInfisico = document.getElementById("caixa-dos-inputs-fisicos")
const cxInjuridico = document.getElementById("caixa-dos-inputs-juridicos")
const cxInGrandes = document.getElementById("caixa-dos-inputs-grande")
const cxProcSType = document.getElementById("procSelectType")
formPrincipal.addEventListener("submit", gerarProc)


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
    menuAbertoAtual = "null"
}
function openProcSelecType() {
    fecharTodosMenus();
    cxProcSType.style.display = "flex"
    menuAbertoAtual = "gerador-de-procuracao-type"
    console.log(menuAbertoAtual);
}
function openRecibo() {

    fecharTodosMenus();
    menuAbertoAtual = "recibo-simples";
    console.log(menuAbertoAtual);


}
function gerarProcPf() {

    const DadosProcPF = {

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
        cor: document.getElementById('corveiculo').value
    };

    if (menuAbertoAtual == "gerador-procuracao-fisica") {




    }

}
function gerarProcPj() {

    const DadosProcPj = {

        razaoSocial: document.getElementById('procPjInput1').value,
        cnpj: document.getElementById('procPfInput2').value,
        procurador1: document.getElementById('procPfInput3').value,
        cpfproc1: document.getElementById('procPfInput4').value,
        procurador2: document.getElementById('procPfInput5').value,
        cpfproc2: document.getElementById('procPfInput6').value,
        placa: document.getElementById('placa').value,
        renavam: document.getElementById('rnvvei').value,
        marcamodelo: document.getElementById('marmodvei').value,
        chassi: document.getElementById('chassi1').value,
        anoveiculo: document.getElementById('anoveiculo').value,
        cor: document.getElementById('corveiculo').value
    };

    if (menuAbertoAtual == "gerador-procuracao-juridica") {

        console.log(DadosProcPj);

    }

}
function gerarProc(evento1) {

    if (evento1 != null) {

        evento1.preventDefault()
    }

    if (menuAbertoAtual == "gerador-procuracao-fisica") {
        gerarProcPf()
    } else if (menuAbertoAtual == "gerador-procuracao-juridica") {
        gerarProcPj()
    }
}
