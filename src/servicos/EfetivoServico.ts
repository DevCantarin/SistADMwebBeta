import autenticaStore from "../stores/autentica.store";
import api from "./api";


export async function  pegaTodoEfetivo (){
    const token = await autenticaStore.usuario.token;
    if (!token) {
        console.log('Token não encontrado no armazenamento local.');
        return null;
    }

    try {
        const resultado = await api.get("/efetivo",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resultado.data.folgas
        
    } catch (error) {
        console.log(error);
        return null;
    }
}