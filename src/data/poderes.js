// Poderes da procuração veicular.
// "Procuração de amplos poderes" usa todos os itens, na ordem, exceto os marcados
// como "opcional" (esses só entram se o usuário marcar).

// Marcador trocado pelo valor de venda no texto dos poderes que têm "exigeValor"
export const MARCADOR_VALOR = '{VALOR}'

export const PODERES = [
  {
    id: 1,
    titulo: 'VENDA E TRANSFERÊNCIA DO VEÍCULO',
    texto:
      'Podendo efetuar a venda ou transferir o veículo para si próprio, receber o preço da venda, solicitar ATPV-e e reimpressão de ATPV-e, assinar requerimentos, realizar vistorias.',
  },
  {
    id: 2,
    titulo: 'DOCUMENTAÇÃO E REGULARIZAÇÃO VEICULAR',
    texto:
      'Requerer, junto aos CRVAs/DETRAN-RS, os processos de segunda via de CRV/CRLV, podendo assinar declaração de endereço residencial e de perda/extravio do CRV/CRLV, alteração de informações do veículo, alteração de características, troca de município, alteração de entrega do CRV e/ou CRLV, endossar documentos, retirar documentos junto às agências dos Correios e praticar os demais atos necessários à regularização documental do veículo.',
  },
  {
    id: 3,
    titulo: 'ÓRGÃOS PÚBLICOS E RECEITAS ESTADUAIS',
    texto:
      'Representar o outorgante perante Receita Federal do Brasil, Secretarias da Fazenda/Receitas Estaduais, DETRAN, CIRETRANS de quaisquer estados, requerer revisão, correção, baixa, cancelamento, isenção, restituição, compensação, parcelamento, prescrição, decadência ou reconhecimento de inexigibilidade de IPVA (de qualquer exercício), taxas, licenciamento, seguro obrigatório, encargos, juros, multas e demais débitos e ônus vinculados ao veículo, acompanhar processos e cumprir exigências.',
  },
  {
    id: 4,
    titulo: 'AGENTES FINANCEIROS E BANCOS',
    texto:
      'Representar o outorgante perante quaisquer instituições financeiras, bancos, cooperativas de crédito e sociedades de arrendamento mercantil, requerer financiamento, renegociação, quitação, liberação de gravame, liberação de alienação fiduciária e demais atos necessários à regularização financeira do veículo.',
  },
  {
    id: 5,
    titulo: 'BAIXA, RESTRIÇÕES E PROCEDIMENTOS ADMINISTRATIVOS',
    texto:
      'Requerer baixa definitiva do veículo, cancelamento de processo, autorização para regravação de chassi e/ou motor, inclusão de restrição por transferência e liberação de restrição por transferência, bem como cancelar comunicação de venda ou formalizar distrato de venda.',
  },
  {
    id: 6,
    titulo: 'GNV – GÁS NATURAL VEICULAR',
    texto:
      'Representar o outorgante perante quaisquer repartições públicas e/ou privadas para tratar de assuntos relacionados à inclusão, renovação ou exclusão do combustível GNV (Gás Natural Veicular).',
  },
  {
    id: 7,
    titulo: 'CONTRATOS, ALIENAÇÕES, LEASING',
    texto:
      'Assinar contratos de inclusão e liberação de alienação, locação, comodato e reserva de domínio, bem como assinar carta de desistência de leasing. Podendo transferir o veículo para si próprio.',
  },
  {
    id: 8,
    titulo: 'RETIRADA E UTILIZAÇÃO DO VEÍCULO',
    texto:
      'Retirar o veículo de depósito, usar e conduzir o veículo em apreço em qualquer parte do território nacional e/ou estrangeiro, podendo utilizá-lo e gozá-lo como coisa sua, sem interferência ou autorização de terceiros.',
  },
  {
    id: 9,
    titulo: 'REPRESENTAÇÃO SIMPLES DO OUTORGANTE',
    texto:
      'Representar o outorgante para a transferência do veículo para seu próprio nome (Outorgante) e assinar o de acordo no DUT/ATPV-e, assinar declaração de residência, solicitar vistorias, abrir processos, assinar protocolos, solicitar e pagar taxas, tarifas, assinar cancelamentos de ATPV-e, dut, declarações gerais de procedências de peças, motores, solicitar troca de placas e alterações de informações e características do veículo.',
  },
  {
    id: 10,
    titulo: 'SUBSTABELECIMENTO E PODERES GERAIS',
    texto: 'Podendo substabelecer a presente procuração, no todo ou em parte.',
  },
  {
    id: 11,
    titulo: 'IRREVOGABILIDADE E DISPENSA DE PRESTAÇÃO DE CONTAS',
    texto:
      'O presente mandato é celebrado em caráter IRREVOGÁVEL, IRRETRATÁVEL E ISENTO DE PRESTAÇÃO DE CONTAS.',
  },
  {
    id: 12,
    titulo: 'RESPONSABILIDADE POR MULTAS E IMPOSTOS',
    texto:
      'O outorgante, pelo presente instrumento, declara-se responsável pelos pagamentos de multas e impostos incidentes sobre o veículo acima descrito e caracterizado, até a data da outorga do presente mandato.',
  },
  {
    id: 13,
    titulo: 'RNTRC – ANTT',
    texto:
      'Requerer autorização e renovação do RNTRC (Registro Nacional de Transportadores Rodoviários de Cargas), junto à ANTT, praticando os atos necessários ao cumprimento dessas finalidades.',
  },
  {
    id: 14,
    titulo: 'RATIFICAÇÃO DE PODERES ANTERIORES',
    texto:
      'Ratificando os poderes concedidos em procurações anteriores, inclusive para assinar cancelamento de comunicação de venda ou distrato de venda.',
  },
  {
    id: 15,
    titulo: 'USAR O VEÍCULO EM CAUSA PRÓPRIA',
    // Não entra automaticamente na "Procuração de amplos poderes": o usuário marca se quiser
    opcional: true,
    // Exige o valor de venda do veículo; {VALOR} vira "R$ 0,00 (valor por extenso)"
    exigeValor: true,
    texto:
      'O presente mandato é conferido com a cláusula "em causa própria", nos termos do Art. 685 do Código Civil, tendo como valor de venda do veículo acima descrito a quantia de {VALOR}, de modo que a sua revogação não terá eficácia, nem se extinguirá pela morte de qualquer das partes, ficando o procurador dispensado de prestar contas e podendo usar e transferir para si o veículo em questão, objeto do mandato, obedecidas as formalidades legais.',
  },
]
