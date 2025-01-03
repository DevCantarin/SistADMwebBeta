import styled from "styled-components";
import informacao from "./Imagens/informacao.png"
import equipe from "./Imagens/equipe.png"
import viatura from "./Imagens/vtr.png"
import abordagem from "./Imagens/abordagem.png"
import veiculos from "./Imagens/veiculo.png"
import ocorrencia from "./Imagens/ocorrenias.png"
import relatorio from "./Imagens/relatorio.png"
import produtividade from "./Imagens/produtividade.pmg.jpg"
import rondoas from "./Imagens/rondas.png"
import operacoes from "./Imagens/operacoes.png"
import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from 'react';
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import usePost from "../../usePost";
import { Link, useNavigate } from "react-router-dom";
import { Usuario } from "../../interfaces/Usuario";
import { cadastrarUsuario } from "../../servicos/UsuarioServico";
import Card from "../../components/Card";
import Board from "../../components/Board";
import List from "../../components/List";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const RSOOpcoes = [

    {   id: 1,
        titulo: "Informações iniciais",
        imagem: informacao,
        alt: "icone de um 'i' de informações",
        pagina:"/rso/informacoes"
    },
    {   id: 2,
        titulo: "Equipe",
        imagem: equipe,
        alt: "icone de dois policiais",
        pagina:"/rso/equipe"
    },
    {   id: 3,
        titulo: "Viatura",
        imagem: viatura,
        alt: "icone de uma viatura policial",
        pagina:"/rso/viatura"
    },
    {   id: 4,
        titulo: "Pessoas Abordadas",
        imagem: abordagem,
        alt: "icone de um policial abordando uma pessoa",
        pagina:"/rso/pessoas"
    },
    {   id: 5,
        titulo: "Veiculos Abordados",
        imagem: veiculos,
        alt: "icone de de um carro",
        pagina:"/rso/veiculos"
    },
    {   id: 6,
        titulo: "Ocorrencias",
        imagem: ocorrencia,
        alt: "icone de um bloico de notass",
        pagina:"/rso/ocorrencias"
    },
    {   id: 7,
        titulo: "Relatório",
        imagem: relatorio,
        alt: "icone de um bloico de notass",
        pagina:""
    },
    {   id: 8,
        titulo: "Produtividade",
        imagem: produtividade,
        alt: "icone de uma engrenagem que represena a produtividade",
        pagina:""
    },
    {   id: 9,
        titulo: "Rondas",
        imagem: rondoas,
        alt: "icone de uma caneta",
        pagina:""
    },
    {   id: 10,
        titulo: "Operações",
        imagem: operacoes,
        alt: "icone de fuzis cruzados",
        pagina:""
    },
]

const Imagem = styled.img`
  padding: 2em 0;
  width: 13em;  
  height: 13em;
  border: 2px solid black;
  margin: 0.3em
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
  align-items: center;
`;

const Formulario = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BotaoCustomizado = styled(Botao)`
  width: 50%;
  margin: 3em
`;

const Container = styled.div`
  display: Flex;
  width: 100%;
  grid-template-columns: 30% 65%;
  justify-content: center;
  flex-wrap: wrap;
`;
const ContainerPrincipal = styled.div`
  width: 100%;
  grid-template-columns: 30% 65%;
  justify-content: center;
  align-items:center;
`;
const TituloAlinhado = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2em;
`
const Opcoes = styled.div`
    font-size: 20px;
    text-align: center
`
const Texto =styled.div`
    font-weight: bold
`
const LinkRso = styled.a`
    text-decoration: none;
    color: black
`;



export default function EscalaDeServiço() {
    const [etapaAtiva, setEtapaAtiva] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVerificada, setSenhaVerificada] = useState('');


    const [nomeCompleto, setNomeCompleto] = useState('');
    const [grad, setGrad] = useState('');
    const [re, setRE] = useState('');
    const [dig, setDig] = useState('');
    const [pai, setPai] = useState('');
    const [mae, setMae] = useState('');
    const [admissao, setAdmissao] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [cidade, setCidade] = useState('');
    const [conjuge, setConjuge] = useState('');
    const [dependentes, setDependentes] = useState('');
    const [sangue, setSangue] = useState('');
    const [cor, setCor] = useState('');
    const [olhos, setOlhos] = useState('');
    const [cabelos, setCabelos] = useState('');
    const [bigodes, setBigodes] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRG] = useState('');
    const [pasep, setPasep] = useState('');
    const [pis, setPis] = useState('');
    const [carteiraTrabalho, setCarteiraTrabalho] = useState('');
    const [cnh, setCnh] = useState('');
    const [val, setVal] = useState('');
    const [cat, setCat] = useState('');
    const [sat, setSat] = useState('');
    const [residencia, setResidencia] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const {cadastrarDados, erro, sucesso} = usePost();
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

      
        const usuario: Usuario = {
            admissao:admissao,
            email: email,
            nome: nome,
            senha: senha,
            bairro: bairro,
            bigodes: bigodes,
            cabelo: cabelos,
            carteira_trabalho:carteiraTrabalho,
            cat: cat,
            cep: cep,
            cidade: cidade,
            cnh: cnh,
            conjuge: conjuge,
            cor: cor,
            cpf: cpf,
            dependentes: dependentes,
            dig: dig,
            estado: estado,
            grad: grad,
            mae:mae,
            nascimento:nascimento,
            nome_completo:nomeCompleto,
            olhos:olhos,
            pai:pai,
            pasep:pasep,
            pis:pis,
            re:re,
            residencia:residencia,
            rg:rg,
            sangue:sangue,
            sat:sat,
            telefone:telefone,
            val:val,
            funcao:"RP"            
        }

        if (etapaAtiva !== 0) {
            try {
                cadastrarUsuario(usuario);
                navigate('/login');
            } catch (erro) {
                erro && alert('Erro ao cadastrar os dados')
            }
        }

        setEtapaAtiva(etapaAtiva + 1); // atualiza o estado da etapa para a próxima etapa
    }


    return (
        <>
        <DndProvider backend={HTML5Backend}>
            <Container>
                <Board />
            </Container>
        </DndProvider>
        </> 
    )
}