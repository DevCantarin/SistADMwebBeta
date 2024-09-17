export interface MembroEquipe {
    grad: string;
    re: string;
    cop: string;
    nome: string;
    telefone: string;
  }
  
  export interface Viatura {
    prefixo: string;
    modalidade: string;
    setor: string;
    kmInicial: string;
    KmFinal: string;
    kmRodados: string;
    Obs: string;
    Acessorios: string;
    Avarias: string;
  }
  
  export interface Abordado {
    nome: string;
    rg: string;
    cnh: string;
    localAbordagem: string;
    artigos: string;
    situacao: string;
  }
  
  export interface Veiculo {
    marcaModelo: string;
    cor: string;
    placa: string;
    numeracaoAIT?: string;
    numeracaoCRR?: string;
    observacao?: string;
  }
  
  export interface Ocorrencia {
    talao: string;
    apoio: string;
    qtrIrradiado: string;
    qtrLocal: string;
    qtrTerm1: string;
    qtrTerm2: string;
    endereco: string;
    numero: string;
    natureza: string;
    resultado: string;
    observacao: string;
  }
  
  export interface RSO {
    Equipe: {
      encarregado: MembroEquipe;
      motorista: MembroEquipe;
      seguranca1?: MembroEquipe;
      seguranca2?: MembroEquipe;
      seguranca3?: MembroEquipe;
    };
    Viatura: Viatura;
    Abordados: Abordado[];
    Veiculos?: Veiculo[];
    Ocorrencias?: Ocorrencia[];
    relatorio?: string;
  }
  