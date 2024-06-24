
// EXECUTA ESSA FUNÇÃO QUANDO EU CLICO EM QUALQUER BOTÃO DE TIPOS
// E PASSA COMO PARAMETRO QUAL O BOTÃO QUE EU CLIQUEI
// PARA EU PODER DECIDIR O QUE FAÇO CONFORME O TIPO QUE RECEBI

// Operador OU -> || 
// Operador AND -> &&
// Operador maior que ->  >
// Operador menor que ->  <
// Operador menor ou igual que ->  <=
// Operador maior ou igual que ->  >=

let menuAbertoAtual = null;

function esconderProcSelecType(tipo) {

    //ESCONDE A CAIXA DE POP UP
    document.getElementById("procSelectType").style.display = "none"
    // MOSTRA A CAIXA DOS INPUTS DO FORMULARIO
    document.getElementById("caixa-dos-inputs-grande").style.display = "flex"


    // SE O BOTÃO QUE FOI CLICADO FOI O BOTÃO DE PESSOA FISICA
    if (tipo == "fisica") {
        // EXECUTA ISSO ABAIXO
        document.getElementById("caixa-dos-inputs-juridicos").style.display = "none" // fecha input juridicos
        document.getElementById("caixa-dos-inputs-fisicos").style.display = "flex" // abre inputs físicos


    }

    // SE O BOTÃO QUE FOI CLICADO FOI O BOTÃO DE PESSOA JURIDICA
    if (tipo == "juridica") {
        // EXECUTA ISSO ABAIXO

        document.getElementById("caixa-dos-inputs-fisicos").style.display = "none"
        document.getElementById("caixa-dos-inputs-juridicos").style.display = "flex"
    }
}
function retornaProcSelecType() {

    document.getElementById("caixa-dos-inputs-grande").style.display = "none"
    document.getElementById("procSelectType").style.display = "flex"

}
function fecharTodosMenus() {
    document.getElementById("procSelectType").style.display = "none";
    document.getElementById("caixa-dos-inputs-grande").style.display = "none";
}
function openProcSelecType() {
    fecharTodosMenus();
    document.getElementById("procSelectType").style.display = "flex"
    menuAbertoAtual = "Gerador-de-procuração";
}
function openRecibo() {

    fecharTodosMenus();
    menuAbertoAtual = "Recibo";


}