


const params = new URLSearchParams(window.location.search);
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

console.log(DadosProcPf)

window.print()