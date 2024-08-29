import { useEffect, useState } from "react";
import {FadeLoader} from "react-spinners"
// import Avaliacao from "../../components/Avaliacao";
import Botao from "../../components/Botao";
// import Cabecalho from "../../components/Cabecalho";
import Container from "../../components/Container";
// import Rodape from "../../components/Rodape";
import Subtitulo from "../../components/Subtitulo";
import Tabela from "../../components/Tabela";
import Titulo from "../../components/Titulo";
import ModalCadastro from "./Modal";
import autenticaStore from "../../stores/autentica.store";
import { pegarEscalasUsuario } from "../../servicos/EscalaServico";
import { pegarDadosUsuarios, pegarFeriasUsuario, pegarFolgasUsuario } from "../../servicos/UsuarioServico";
import { Folga } from "../../interfaces/Folga";
import { Usuario } from "../../interfaces/Usuario";
import { Escala } from "../../interfaces/Escala";
import TabelaFolga from "../../components/TabelaFolga";
import usuarioStore from "../../stores/usuario.store";
import converterData from "../../utils/ConverterData";
import { Efetivo } from "../../interfaces/Efetivo";
import { pegaTodoEfetivo } from "../../servicos/EfetivoServico";
import { pegarTodasAsFolgas } from "../../servicos/FolgasServico";
import { Ferias } from "../../interfaces/Ferias";
import CampoDigitacao from "../../components/CampoDigitacao";
import styled from "styled-components";

const CampaDePesquisa = styled.div`
  width: 30vw;
  margin-bottom: 1em;
`

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [mikeId, setMikeId] = useState('');
  const [folgasAgendadas, setFolgasAgendadas] = useState<Folga[]>([]);
  const [folgasfuturas, setFolgasFuturas] = useState<Folga[]>([]);
  const [dadosUsuarios, setDadosUsuarios] = useState<Usuario>({} as Usuario);
  const [dadosEscalas, setDadosEscalas] = useState<Escala[]>([]);
  const [efetivo, setEfetivo] = useState<Efetivo[]>([]);
  const [folgaDosSubordinados, setFolgasDosSubordinaos] = useState<Folga[]>([]);
  const [feriasUsuario, setFeriasUsuario] = useState<Ferias[]>([] );

  const [loadingEscala, setLoadingEscala] = useState(true)
  const [loadingFolgas, setLoadingFolgas] = useState(true)
  const [loadingFolgasSubordinados, setLoadingFolgasSubordinados] = useState(true)

  const [reFiltrado, setReFiltrado] = useState("")







  useEffect(() => {
    async function fetchData() {
      try {
        const storedMikeId = await autenticaStore.usuario.id;
        if (!storedMikeId) return;

        setMikeId(storedMikeId);

        const resultado = await pegarDadosUsuarios(storedMikeId);
        if (resultado) {
          setDadosUsuarios(resultado);
          usuarioStore.atualizaFuncionario(dadosUsuarios)
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("erro no serividor. Tente novamente mais tarde")
      }
    }
    fetchData();
  }, [dadosUsuarios]);

  useEffect(() => {
    async function folgaData() {
      try {
        if (!dadosUsuarios.re || !dadosUsuarios.dig) {
          return;
        }
  
        const resultado = await pegarFolgasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          setFolgasAgendadas(resultado);

        const folgasFuturas = resultado.filter((folga: Folga) => {
          // Converte a data para o formato Date
          const folgaData = converterData(folga.DATA);
          // Verifica se a data da folga é maior ou igual à data atual
          return folgaData >= new Date();
          });
  
          setFolgasFuturas(folgasFuturas);
          setLoadingFolgas(false)
        }
      } catch (error) {
        console.error("Erro ao buscar folgas:", error);
        alert("erro no serividor. Tente novamente mais tarde")
      }
    }
  
    folgaData();
  }, [dadosUsuarios.re, dadosUsuarios.dig]);
  

  useEffect(() => {
    async function escalaData() {
      try {
        if (!dadosUsuarios.re || !dadosUsuarios.dig) {
          return;
        }

        const resultado = await pegarEscalasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          setDadosEscalas(resultado);
          setLoadingEscala(false)
        }
      } catch (error) {
        console.error("Erro ao buscar escalas:", error);
        alert("erro no serividor. Tente novamente mais tarde")
      }
    }

    escalaData();
  }, [dadosUsuarios.re, dadosUsuarios.dig]);

  useEffect(() => {
    async function efetivo() {
      try {     
        const resultado: Efetivo[] = await pegaTodoEfetivo();
        if (resultado) {
          const efetivoDesseUsuario = 
            usuarioStore.usuario.funcao === "CGP1" ?
              resultado.filter(mike => mike.EQUIPE === "1º PEL") :
            usuarioStore.usuario.funcao === "CGP2" ?
              resultado.filter(mike => mike.EQUIPE === "2º PEL") :
            usuarioStore.usuario.funcao === "CGP3" ?
              resultado.filter(mike => mike.EQUIPE === "3º PEL") :
            usuarioStore.usuario.funcao === "CGP4" ?
              resultado.filter(mike => mike.EQUIPE === "4º PEL") :
              resultado;
  

          

          setEfetivo(efetivoDesseUsuario);
        }
      } catch (error) {
        alert("erro no serividor. Tente novamente mais tarde")
        console.error("Erro ao buscar dados do usuário:", error);
        
      }
    }
    efetivo();
  }, [dadosUsuarios.re]);
  

  useEffect(() => {
    async function folgas() {
      try {
        const resultado: Folga[] = await pegarTodasAsFolgas();
        if (resultado) {
          // Filtra folgas do efetivo
          const folgasDoEfetivoDesseUsuario = resultado.filter(folga => {
            const reFolga = folga.RE.substring(0, 6);
            return efetivo.some(mike => mike.RE === reFolga);
          });
  
          // Filtra folgas futuras
          const folgasFuturas = folgasDoEfetivoDesseUsuario.filter((folga: Folga) => {
            const folgaData = converterData(folga.DATA);
            return folgaData >= new Date();
          });
  
          if (reFiltrado) {
            const folgasFiltradas = folgasFuturas.filter((folga: Folga) => {
              return folga.RE.includes(reFiltrado); 
            });
            setFolgasDosSubordinaos(folgasFiltradas);
          } else {
            setFolgasDosSubordinaos(folgasFuturas);
          }
  
          setLoadingFolgasSubordinados(false);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Erro no servidor. Tente novamente mais tarde.");
      }
    }
  
    folgas();
  }, [efetivo, reFiltrado]);  


  useEffect(() => {
    async function ferias() {
      try {
        if (!dadosUsuarios.re || !dadosUsuarios.dig) {
          return;
        }
  
        const resultado = await pegarFeriasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          console.log(`o resustalde de pegarFeriasUsuario é ${JSON.stringify(resultado)}` )
          setFeriasUsuario(resultado);;
          return
        }
      } catch (error) {
        console.error("Erro ao buscar folgas:", error);
        alert("erro no serividor. Tente novamente mais tarde")
      }
    }
  
    ferias();
  }, [dadosUsuarios.re, dadosUsuarios.dig]);

  
    

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Titulo>Área Administrativa</Titulo>
      {dadosUsuarios.funcao !== "RP" && <Botao onClick={handleOpen}>Solicitar Folga</Botao>}
      <ModalCadastro open={open} handleClose={handleClose} />
      <Titulo>{`Observações Da ADM:`}</Titulo>
        {feriasUsuario.length > 0 && feriasUsuario[0].INICIO && (
            <p>{`* Suas Férias estão marcadas para: de ${feriasUsuario[0].INICIO} a ${feriasUsuario[0].TERMINO}.`}</p>
        )}
        {feriasUsuario.length > 0 && feriasUsuario[0].INICIO2 && (
            <p>{`* Suas Férias estão marcadas para: de ${feriasUsuario[0].INICIO2} a ${feriasUsuario[0].TERMINO2}.`}</p>
        )}
      <Titulo imagem="consulta">Escalas Previstas</Titulo>
      {loadingEscala===false ?<Tabela escala={dadosEscalas}/>:<FadeLoader loading={loadingEscala}/>}
      <Titulo imagem="grafico">Folgas Agendadas</Titulo>
      {/* <Subtitulo>Agosto/24</Subtitulo> */}
      {loadingFolgas===false?<TabelaFolga folga={folgasfuturas} />:<FadeLoader loading={loadingFolgas}/>}
      
      
      {(usuarioStore.usuario.funcao === "CGP1" ||
          usuarioStore.usuario.funcao === "CGP2" ||
          usuarioStore.usuario.funcao === "CGP3" ||
          usuarioStore.usuario.funcao === "CGP4" ||
          usuarioStore.usuario.funcao === "ADMINISTRADOR") && (
            <>
            <Titulo imagem="avaliacao">{`${usuarioStore.usuario.funcao}, Folgas do Efetivo sob seu Comando`}</Titulo>
            <CampaDePesquisa>
              <CampoDigitacao
                tipo="texto"
                label="Procura por RE"
                valor={reFiltrado}
                placeholder="Digite o RE procurado"
                onChange={setReFiltrado}
              />
            </CampaDePesquisa>
            {
              loadingFolgasSubordinados ===false?<TabelaFolga folga={folgaDosSubordinados} />:<FadeLoader loading={loadingFolgasSubordinados}/>
            }
          </>
      )}
      {/* <Avaliacao profissionais={profissionais} /> */}
    </Container>
  );
}
