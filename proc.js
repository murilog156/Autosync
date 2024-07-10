


const params = new URLSearchParams(window.location.search);
const DadosProcPj = {

    razaoSocial: params.get('razaoSocial'),
    cnpj: params.get('cnpj'),
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

document.getElementById("nome-proprietario").innerHTML = DadosProcPj.razaoSocial

console.log(DadosProcPj)

//window.print()