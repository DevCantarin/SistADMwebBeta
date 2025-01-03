import styled from "styled-components";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from 'react';
import Botao from "../../../../components/Botao";
import CampoDigitacao from "../../../../components/CampoDigitacao";
import usePost from "../../../../usePost";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../../../interfaces/Usuario";
import { cadastrarUsuario, pegarDadosUsuarios } from "../../../../servicos/UsuarioServico";
import autenticaStore from "../../../../stores/autentica.store";
import usuarioStore from "../../../../stores/usuario.store";
import ModalCadastro from "./Modal/intex";
import rsoStore from "../../../../stores/rso.store";
import TabelaRSO from "../../../../components/TabelaRSO";

const Imagem = styled.img`
  padding: 2em 0;
  width: 20%;  
  height: 20%;
`;

interface PropsCustomizadas {
    cor: string
}

const StepCustomizada = styled.div<PropsCustomizadas>`
    background-color: ${({cor}) => cor};
    width: 16px;
    height: 16px;
    border-radius: 50%;
`

const Titulo = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza);
  text-align: center; 
  margin-bottom: 20px;
`;


const Formulario = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2em;

`;

const BotaoCustomizado = styled(Botao)`
  width: 10%;
   margin: 3em
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
`;




export default function RSOPessoas() {
    const [open, setOpen] = useState(false);
    const [viatura, setViatura] = useState('');
    const [modalidade, setModalidade] = useState('');
    const [setor, setSetor] = useState('');
    const [kmInicial, setkmInicial] = useState(0);
    const [kmFinal, setkmFinal] = useState(0);
    const [kmRodados, setkmRodados] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [acessorios, setAcessorios] = useState('');
    const [avarias, setAvarias] = useState('');


    const [dadosUsuarios, setDadosUsuarios] = useState<Usuario>({} as Usuario);


    const [cop, setCop] = useState('');;
    const [mikeId, setMikeId] = useState('');

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Container>  
          <Titulo>Pessoas Abordadas</Titulo>
          <BotaoCustomizado onClick={handleOpen}>Cadastar Abordado</BotaoCustomizado>
          {/* {rsoStore.rso.Abordados.map(abordado=> (
            abordado.nome
          ))} */}
          <TabelaRSO abordado={rsoStore.rso.Abordados}/>

            

          <ModalCadastro open={open} handleClose={handleClose} />
        </Container>
    );
}