import { Usuario } from "../interfaces/Usuario";
import autenticaStore from "../stores/autentica.store";
import api from "./api";
import apiDispensas from "./apiDispensass";

export async function pegaTodosUsuarios() {
  const token = await autenticaStore.usuario.token;

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.get(`/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(resultado.data);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
  
  

export async function cadastrarUsuario(usuario: Usuario){
  if(!usuario) return null;

  try {
    const resultado = await api.post('/usuarios', usuario);
    console.log(resultado.data);
    return resultado.data;
  }
  catch(error){
    console.log(error);
    return null;
  }
}

export async function pegarDadosUsuarios(id: string) {
  const token = await autenticaStore.usuario.token;

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  try {
    const resultado = await api.get(`/usuarios/id/${id}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(resultado.data);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}



export async function editarFotoUsuario(id: string, foto: any) {
  const token = await autenticaStore.usuario.token;

  if (!foto || !token) return null;

  try {
    const resultado = await api.put(`/usuarios/id/${id}`, { imagem: foto }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(foto);
    console.log(resultado.data.imagem);  
    return resultado.data.imagem;  
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function editarUsuario(id: string, novosDados: any) {
  const token = await autenticaStore.usuario.token;

  try {
    console.log('Conteúdo de novosDados:', novosDados)
    const resultado = await api.put(`/usuarios/id/${id}`, {funcao: novosDados}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`novos dados é: ${novosDados}`)

    return resultado.data; // Retorna o objeto completo do usuário editado
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function pegarFolgasUsuario(re: string) {
  const token = await autenticaStore.usuario.token;

  if (!token) {
    console.log('Token não encontrado no armazenamento local. ');
    return null;
  }

  if (!re) {
    console.log("re Nulo");
    return null;
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbw2wgOYgJ5s0BvcEaVXDWDChclWxVsPKJmR7wcAdO-NiiPHlKpjtpSgPAA0bsEMcB4/exec?re=${encodeURIComponent(re)}`;
    // console.log(`o re que eu estou procurando é ${encodeURIComponent(re)}`)
    // console.log( `o endpoint chamdo foi ${url}`)
    const resultado = await apiDispensas.get(url, {
    });

    // console.log(`Chamando o endpoint DE FOLGA: ${url}`);
    // console.log("O RE é " + re);
    // console.log(`Resultado é DISPENSAS ${JSON.stringify(resultado.data.reornoDaSaida[0])}`);
    // console.log(`o resultado de folgas   é ${JSON.stringify(resultado.data.reornoDaSaida[0])}`)
    return resultado.data.reornoDaSaida;
  } catch (error) {
    console.log( "deu erro na chamada de folgas")
    console.log(error);
    return null;
  }
}

// export async function pegarFeriasUsuario(re: string) {
//   const token = await autenticaStore.usuario.token;

//   if (!token) {
//     console.log('Token não encontrado no armazenamento local.');
//     return null;
//   }

//   try {
//     const resultado = await api.get(`/ferias/re/${re}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return resultado.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
