import api from './api';
import autenticaStore from '../stores/autentica.store';

export async function pegarEscalasUsuario(re: string) {
  const token = await autenticaStore.usuario.token;

  if (!token) {
    console.log('Token não encontrado no armazenamento local.');
    return null;
  }

  if (!re) {
    console.log("re Nulo");
    return null;
  }

  try {
    const resultado = await api.get(`/gdescalas/re/${re}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("O RE é  escalas" + re);
    console.log(`Resultado é ${JSON.stringify(resultado.data.escalasRE)}`);
    console.log(`achou escala`)
    return resultado.data.escalasRE;
  } catch (error) {
    console.log(error);
    return null;
  }
}
