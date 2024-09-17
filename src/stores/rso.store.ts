import { makeObservable, observable, action } from "mobx";
import { Abordado, RSO, Veiculo } from "../interfaces/RSO";

class RSOStore {
  estaAutenticado = false;
  rso = {
    Equipe: {
      encarregado: {
        grad: "",
        re: "",
        cop: "",
        nome: "",
        telefone: ""
      },
      motorista: {
        grad: "",
        re: "",
        cop: "",
        nome: "",
        telefone: ""
      },
      seguranca1: {
        grad: "",
        re: "",
        cop: "",
        nome: "",
        telefone: ""
      },
      seguranca2: {
        grad: "",
        re: "",
        cop: "",
        nome: "",
        telefone: ""
      },
      seguranca3: {
        grad: "",
        re: "",
        cop: "",
        nome: "",
        telefone: ""
      }
    },
    Viatura: {
      prefixo: "",
      modalidade: "",
      setor: "",
      kmInicial: "",
      KmFinal: "",
      kmRodados: "",
      Obs: "",
      Acessorios: "",
      Avarias: ""
    },
    Abordados: [] as Abordado[],
    Veiculos: [] as Array<{ marcaModelo: string; cor: string; placa: string; numeracaoAIT: string, numeracaoCRR: string, observacao: string }>,
    Ocorrencias: [] as Array<{
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
    }>,
    relatorio: ""
  };

  constructor() {
    makeObservable(this, {
      estaAutenticado: observable,
      rso: observable,
      atualizaRSO: action,
      adicionaAbordado: action,
      adicionaVeiculo: action,
      adicionaOcorrencia: action
    });

    this.loadFromLocalStorage(); // Carregar do LocalStorage ao inicializar
  }

  // Método para atualizar o RSO
  atualizaRSO(dados: RSO) {
    this.estaAutenticado = true;
    Object.assign(this.rso, dados);
    this.saveToLocalStorage(); // Salvar no LocalStorage sempre que atualizar
  }

  // Método para adicionar um abordado e salvar
  adicionaAbordado(abordado: Abordado) {
    this.rso.Abordados.push(abordado);
    this.saveToLocalStorage(); // Salvar no LocalStorage após a alteração
  }

  // Método para adicionar um veículo e salvar
  adicionaVeiculo(veiculo: {  marcaModelo: string; cor: string; placa: string; numeracaoAIT: string, numeracaoCRR: string, observacao: string  }) {
    this.rso.Veiculos.push(veiculo);
    this.saveToLocalStorage(); // Salvar no LocalStorage após a alteração
  }

  // Método para adicionar uma ocorrência e salvar
  adicionaOcorrencia(ocorrencia: {
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
  }) {
    this.rso.Ocorrencias.push(ocorrencia);
    this.saveToLocalStorage(); // Salvar no LocalStorage após a alteração
  }

  // Método para salvar no LocalStorage
  saveToLocalStorage() {
    localStorage.setItem("rsoStore", JSON.stringify(this.rso));
  }

  // Método para carregar do LocalStorage
  loadFromLocalStorage() {
    const storedData = localStorage.getItem("rsoStore");
    if (storedData) {
      this.rso = JSON.parse(storedData);
    }
  }
}

const rsoStore = new RSOStore();

export default rsoStore;
