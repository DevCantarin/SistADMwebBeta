import { jwtDecode, JwtPayload } from "jwt-decode";
import { makeObservable, observable, action } from "mobx";

interface IUsuario {
    id: string;
    email: string;
    token: string;
}

class AutenticaStore {
    estaAutenticado = false;
    usuario: IUsuario = { email: "", token: "", id: "" };

    constructor() {
        makeObservable(this, {
            estaAutenticado: observable,
            usuario: observable,
            login: action,
            logout: action
        });

        this.loadFromLocalStorage();
    }

    login({ email, token, id }: IUsuario) {
        this.estaAutenticado = true;
        this.usuario = { email, token, id };
        this.saveToLocalStorage();
    }

    logout() {
        this.estaAutenticado = false;
        this.usuario = { email: "", token: "", id: "" };
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem("authStore", JSON.stringify({
            estaAutenticado: this.estaAutenticado,
            usuario: this.usuario
        }));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem("authStore");
        if (data) {
            const { estaAutenticado, usuario } = JSON.parse(data);

            this.usuario = usuario;
            this.estaAutenticado = estaAutenticado;

            try {
                const decoded = jwtDecode<JwtPayload>(this.usuario.token);
                if (decoded.exp) {
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decoded.exp < currentTime) {
                        this.estaAutenticado = false;
                    }
                }
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                this.estaAutenticado = false;
            }
        }
    }
}

const autenticaStore = new AutenticaStore();
export default autenticaStore;
