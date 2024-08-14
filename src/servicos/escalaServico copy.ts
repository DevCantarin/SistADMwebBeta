import autenticaStore from '../stores/autentica.store';
// import apiSheets from './apiSheets';
import api from './api';

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
    const resultado = await api.get(`/gdispensas/re/${re}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // console.log("O RE é  escalas" + re);
    // console.log(`Resultado é ${JSON.stringify(resultado.data.folgasRE[0])}`);
    // console.log(`achou escala`)
    return resultado.data.folgasRE;
  } catch (error) {
    console.log(error);
    return null;
  }
}
