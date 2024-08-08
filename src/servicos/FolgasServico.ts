import axios from "axios";
import api from "./api";
import apiDispensas from "./apiDispensass";

export async function pegarTodasAsFolgas(){

  try{
    const folgas = await apiDispensas.get("https://script.google.com/macros/s/AKfycbyLyLYwfc_PJSh9x3vJcgtCiB2271w2QLd-r55t53XMI3N4zZKGo8MCDIMkoVbxqEI/exec?",{
    })
    return folgas.data.saida
  }
  catch(error){
    console.log(error);
    return null;
  }
}


export async function agendarFolgas(data: Date, gradId:string, reId: string, nomeId: string, motivoId:string, quantidadeId:string){
  try {
    const apiCadastraFolga = axios.create({
      baseURL: "https://script.google.com/macros/s/AKfycbwRQj96ZnzcUA79rY3guh1_80ijdIsM6v2vtgWjpr6zeBlWIAfOLRSkq95aFMFY6go/exec"
      // baseURL: "exp://192.168.15.12:19000"
    })
    const resultado = await apiCadastraFolga.post('https://script.google.com/macros/s/AKfycbwRQj96ZnzcUA79rY3guh1_80ijdIsM6v2vtgWjpr6zeBlWIAfOLRSkq95aFMFY6go/exec', {
      GRAD: gradId,
      RE: reId,
      DATA: data,
      NOME: nomeId,
      MOTIVO: motivoId,
      QUANTIDADE: quantidadeId
    });
    console.log(resultado.data)
    return resultado.data

  }
  catch(error){
    console.log(error);
    return null;
  }
}

export async function avaliaFolgas(folgaId:string, aprovacaoID:string){
  try {
    const resultado = await api.put(`/folgas/id/${folgaId}`, {

      APROVACAO: aprovacaoID,

    });

    return resultado.data
  }
  catch(error){
    console.log(error);
    return null;
  }
}

export async function cancelarFolgas(folgaId: string) {
  try {
    const resultado = await api.delete(`/folgas/id/${folgaId}`, {
    });
    console.log(resultado.data);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function pegarFolgasUsuario(re: string) {
  if (!re) {
    console.log("re Nulo");
    return null;
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbyLyLYwfc_PJSh9x3vJcgtCiB2271w2QLd-r55t53XMI3N4zZKGo8MCDIMkoVbxqEI/exec?re=${encodeURIComponent(re)}`;
    const resultado = await apiDispensas.get(url, {
    });

    // console.log(`Chamando o endpoint DE FOLGA: ${url}`);
    // console.log("O RE é " + re);
    // console.log(`Resultado é DISPENSAS ${JSON.stringify(resultado.data.reornoDaSaida[0])}`);
    return resultado.data.reornoDaSaida;
  } catch (error) {
    console.log(error);
    return null;
  }
}


