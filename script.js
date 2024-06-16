
// EXECUTA ESSA FUNÇÃO QUANDO EU CLICO EM QUALQUER BOTÃO DE TIPOS
// E PASSA COMO PARAMETRO QUAL O BOTÃO QUE EU CLIQUEI
// PARA EU PODER DECIDIR O QUE FAÇO CONFORME O TIPO QUE RECEBI
function esconderProcSelecType(tipo) {

    //ESCONDE A CAIXA DE POP UP
    document.getElementById("inputboxprocselectype").style.display = "none"
    // MOSTRA A CAIXA DOS INPUTS DO FORMULARIO
    document.getElementById("caixa-dos-inputs-grande").style.display = "flex"


    // SE O BOTÃO QUE FOI CLICADO FOI O BOTÃO DE PESSOA FISICA
    if (tipo == "fisica") {
        // EXECUTA ISSO ABAIXO
        document.getElementById("caixa-dos-inputs-juridicos").style.display = "none"
        document.getElementById("caixa-dos-inputs-fisicos").style.display = "flex"


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
    document.getElementById("inputboxprocselectype").style.display = "flex"

}

function openProcSelecType() {

    if (document.getElementById("caixa-dos-inputs-grande").style.display == "none") {

        document.getElementById("inputboxprocselectype").style.display = "flex"

    }



}

function openRecibo() {

    document.getElementById("inputboxprocselectype").style.display = "none"

}