import IProfissional from "./types/IMIKE";
import useFetch from "./useFetch";

const useDadosProfissional = () => {
    return useFetch<IProfissional[]>({ url: 'especialista' });
}

export default useDadosProfissional;