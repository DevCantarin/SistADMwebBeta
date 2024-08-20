import api from "./api";
import apiDispensas from "./apiDispensass";
import autenticaStore from "../stores/autentica.store";

export async function pegaTodasAsFerias(){

  const token = await autenticaStore.usuario.token;

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.get(`/gdispensas/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    return resultado.data.folgas;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function agendarFolgas(data: string, gradId: string, reId: string, nomeId: string, motivoId: string, quantidadeId: string, justificativaID: string) {
  const token = await autenticaStore.usuario.token;

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.post(
      '/gdispensas/nova',
      {
        GRAD: gradId,
        RE: reId,
        DATA: data,
        NOME: nomeId,
        MOTIVO: motivoId,
        QUANTIDADE: quantidadeId,
        JUSTIDICATIVA: justificativaID
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    alert(`${motivoId} de ${nomeId} agendada para ${data}`)
    return resultado.data;
  } catch (error) {
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


export async function pegaFeriasUsuario(re: string) {
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


