import { makeObservable, observable, action } from "mobx";
import { Usuario } from "../interfaces/Usuario";

class UsuarioStore {
    estaAutenticado = false;
    usuario: Usuario = {
        email: "", admissao: "", bairro: "", bigodes: "", cabelo: "", carteira_trabalho: "", cat: "", id: "",
        cep: "", cidade: "", cnh: "", conjuge: "", cor: "", cpf: "", dependentes: "", dig: "", estado: "",
        funcao: "", grad: "", imagem: "", mae: "", nascimento: "", nome: "", nome_completo: "", olhos: "",
        pai: "", pasep: "", pis: "", re: "", residencia: "", rg: "", sangue: "", sat: "", telefone: "", val: "", token:""
    };

    constructor() {
        makeObservable(this, {
            estaAutenticado: observable,
            usuario: observable,
            atualizaFuncionario: action,
        });
    }

    atualizaFuncionario(dados: Partial<Usuario>) {
        this.estaAutenticado = true;
        Object.assign(this.usuario, dados);
    }
}

const usuarioStore = new UsuarioStore();

export default usuarioStore;
