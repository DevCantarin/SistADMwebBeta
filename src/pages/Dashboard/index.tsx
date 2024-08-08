import { useEffect, useState } from "react";
// import Avaliacao from "../../components/Avaliacao";
import Botao from "../../components/Botao";
// import Cabecalho from "../../components/Cabecalho";
import Container from "../../components/Container";
import Grafico from "../../components/Grafico";
// import Rodape from "../../components/Rodape";
import Subtitulo from "../../components/Subtitulo";
import Tabela from "../../components/Tabela";
import Titulo from "../../components/Titulo";
import ModalCadastro from "./Modal";
import autenticaStore from "../../stores/autentica.store";
import { pegarEscalasUsuario } from "../../servicos/EscalaServico";
import { pegarDadosUsuarios, pegarFolgasUsuario } from "../../servicos/UsuarioServico";
import { Folga } from "../../interfaces/Folga";
import { Usuario } from "../../interfaces/Usuario";
import { Escala } from "../../interfaces/Escala";
import TabelaFolga from "../../components/TabelaFolga";
import usuarioStore from "../../stores/usuario.store";


export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [mikeId, setMikeId] = useState('');
  const [folgasAgendadas, setFolgasAgendadas] = useState<Folga[]>([]);
  const [folgasfuturas, setFolgasFuturas] = useState<Folga[]>([]);
  const [dadosUsuarios, setDadosUsuarios] = useState<Usuario>({} as Usuario);
  const [dadosEscalas, setDadosEscalas] = useState<Escala[]>([]);

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
      }
    }
    fetchData();
  }, [open]);

  useEffect(() => {
    async function folgaData() {
      try {
        if (!dadosUsuarios.re || !dadosUsuarios.dig) {
          return;
        }
  
        const resultado = await pegarFolgasUsuario(`${dadosUsuarios.re}-${dadosUsuarios.dig}`);
        if (resultado) {
          setFolgasAgendadas(resultado);
  
          // Filtra apenas as folgas futuras
          const folgasFuturas = resultado.filter((folga:Folga) => {
            const folgaData = new Date(folga.DATA);
            return folgaData >= new Date();
          });
  
          setFolgasFuturas(folgasFuturas);
        }
      } catch (error) {
        console.error("Erro ao buscar folgas:", error);
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
        }
      } catch (error) {
        console.error("Erro ao buscar escalas:", error);
      }
    }

    escalaData();
  }, [dadosUsuarios.re, dadosUsuarios.dig]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Titulo>Área Administrativa</Titulo>
      <Botao onClick={handleOpen}>Solicitar Folga</Botao>
      <ModalCadastro open={open} handleClose={handleClose} />
      <Titulo imagem="consulta">Escalas Previstas</Titulo>
      <Tabela escala={dadosEscalas} />
      <Titulo imagem="grafico">Folgas Agendadas</Titulo>
      <Subtitulo>Agosto/24</Subtitulo>
      <TabelaFolga folga={folgasfuturas} />
      <Titulo imagem="avaliacao">Observações da ADM</Titulo>
      {/* <Avaliacao profissionais={profissionais} /> */}
    </Container>
  );
}
