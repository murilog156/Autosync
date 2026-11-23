// Dados de teste usados pelo botão "PREENCHER" dos formulários.

// Procuração: o proprietário muda conforme Pessoa Física / Pessoa Jurídica
export const procuracaoTeste = {
  proprietarioFisica: {
    nome: 'MURILO GRADEL SOUZA BRITO',
    documento: '038.882.260-07',
    rg: '1234567890',
    endereco: 'RUA DAS FLORES, 123, CENTRO, PORTO ALEGRE/RS',
    telefone: '(51) 99999-8888',
  },
  proprietarioJuridica: {
    nome: 'AUTO CENTER EXEMPLO LTDA',
    documento: '11.222.333/0001-81',
    rg: '',
    endereco: 'AV. BRASIL, 1500, SÃO JOÃO, PORTO ALEGRE/RS',
    telefone: '(51) 3333-4444',
  },
  procuradores: [
    {
      nome: 'MARIO DUARTE SOUZA PEREIRA PINTO',
      documento: '397.001.626-64',
      rg: '9876543210',
      endereco: 'RUA OSVALDO ARANHA, 45, NOVO HAMBURGO/RS',
    },
    {
      nome: 'DESPACHANTE MODELO LTDA',
      documento: '12.ABC.345/01DE-35',
      rg: '',
      endereco: '',
    },
  ],
  veiculo: {
    placa: 'JTV-6591',
    renavam: '12345678935',
    marcaModelo: 'FERRARI 456 GT',
    chassi: '9BGKC9103292B3',
    anoFabricacao: '2010',
    anoModelo: '2010',
    cor: 'VERMELHO',
  },
}

export const contratoAlienacaoTeste = {
  credor1: 'JOSNELSON',
  cpfCredor1: '0000000',
  rgCredor1: '00000000',
  endCredor1: 'JOSE OSMAR 144',
  cepCredor1: '000000',
  telCredor1: '51999999999',
  devedor1: 'MARCIO',
  cpfDevedor1: '03888226007',
  rgDevedor1: '314139432',
  endDevedor1: 'GERNAMO DAUERNHEIMER',
  cepDevedor1: '93610-740',
  telDevedor1: '4002-8922',
  marcaModelo: 'Sonata',
  placa: 'IEB-4922',
  renavam: '0109284',
  chassi: 'AAAAAAAAAAA',
  anoFabMod: '2001-2002',
  valorEntrada: '2000',
  xParcelas: '24',
  vlrParcelas: '200',
}
