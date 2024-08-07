import apiSheets from './apiSheets';

export async function pegarEscalasUsuario(re: string) {

  if (!re) {
    console.log("re Nulo");
    return null;
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbxnTVnngDBdRdOrUC4nC7C-446RfotrlbmuylPo2LRdqQmGZHUnvURCOYqj-mDAKSo/exec?re=${encodeURIComponent(re)}`;
    const resultado = await apiSheets.get(url, {
    });

    console.log(`Chamando o endpoint: ${url}`);
    console.log("O RE é  escalas" + re);
    console.log(`Resultado é ${JSON.stringify(resultado.data.reornoDaSaida[0])}`);
    console.log(`achou escala`)
    return resultado.data.reornoDaSaida;
  } catch (error) {
    console.log(error);
    return null;
  }
}
