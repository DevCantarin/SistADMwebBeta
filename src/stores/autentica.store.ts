import { makeObservable, observable, action } from "mobx";

interface IUsuario {
    id: string,
    email: string,
    token: string
}

class AutenticaStore {
    estaAutenticado = false;
    usuario: IUsuario = {email: "", token: "", id:""};

    constructor() {
        makeObservable(this, {
            estaAutenticado: observable,
            usuario: observable,
            login: action,
            logout: action
        })
    }

    login({email, token,id} : IUsuario) {
        this.estaAutenticado = true;
        this.usuario = {email, token, id};
    }

    logout() {
        this.estaAutenticado = false;
        this.usuario = {email: "", token: "", id:""}
    }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;