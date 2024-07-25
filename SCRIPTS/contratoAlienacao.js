const cxContrSType = document.getElementById("contractSelectType")
const cxContratoRDom = document.getElementById("inputBoxContratoResDom")
const cxRDomPartes = document.getElementById("inputBoxPartes")
const cxRDomVeVe = document.getElementById("inputBoxVeiculoEVenda")
cxContratoRDom.addEventListener("submit", gerarContratoAlienacaoFiduciaria)





function abrirContratoAlienacaoFiduciaria(pagina) {

    if (pagina == 'pg1') {
        cxContratoRDom.style.display = "flex"
        cxRDomPartes.style.display = "flex"
        cxRDomVeVe.style.display = "none"
        cxContrSType.style.display = "none"
        menuAbertoAtual = "ContratoAlienacaoFiduciariaPg1"

    }

    else if (pagina == "pg2") {

        cxRDomPartes.style.display = "none"
        cxRDomVeVe.style.display = "flex"
        menuAbertoAtual = "ContratoAlienacaoFiduciariaPg2"

    }

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

    window.open(`./RESERVADOMINIO.html?MAA=${dadosContratoRDom.MAA}&credor1=${dadosContratoRDom.credor1}&cpfCredor1=${dadosContratoRDom.cpfCredor1}&rgCredor1=${dadosContratoRDom.rgCredor1}&endCredor1=${dadosContratoRDom.endCredor1}&cepCredor1=${dadosContratoRDom.cepCredor1}&telCredor1=${dadosContratoRDom.telCredor1}&devedor1=${dadosContratoRDom.devedor1}&cpfDevedor1=${dadosContratoRDom.cpfDevedor1}&rgDevedor1=${dadosContratoRDom.rgDevedor1}&endDevedor1=${dadosContratoRDom.endDevedor1}&cepDevedor1=${dadosContratoRDom.cepDevedor1}&telDevedor1=${dadosContratoRDom.telDevedor1}&marcaModelo=${dadosContratoRDom.marcaModelo}&placa=${dadosContratoRDom.placa}&renavam=${dadosContratoRDom.renavam}&chassi=${dadosContratoRDom.chassi}&anoFabMod=${dadosContratoRDom.anoFabMod}&valorEntrada=${dadosContratoRDom.valorEntrada}&xParcelas=${dadosContratoRDom.xParcelas}&vlrParcelas=${dadosContratoRDom.vlrParcelas}`)
}


