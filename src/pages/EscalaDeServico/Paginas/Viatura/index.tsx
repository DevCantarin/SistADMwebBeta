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
  align-items: center;
  justify-content: center;

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
  width: 50%;
   margin: 3em
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 30% 65%;
  justify-content: space-between
  align-items: center;
`;


export default function RSOViatura() {
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


    return (
        <>  
            <Formulario onSubmit={handleSubmit}>
                <Titulo>Viatura</Titulo>
                <CampoDigitacao
                    tipo="text"
                    label="Viatura"
                    valor={viatura}
                    placeholder="Insira o prefixo da VTR"
                />
                <CampoDigitacao
                    tipo="text"
                    label="Modalidade"
                    valor={`${modalidade}`}
                    placeholder="Digite a Modalidade de policiamento"
                />
                <CampoDigitacao
                    tipo="text"
                    label="Setor"
                    valor={setor}
                    placeholder="Digite o sub setor de policiamento"
                    onChange={setSetor}
                />
                <CampoDigitacao
                    tipo="number"
                    label="Km Inicial"
                    valor={kmInicial}
                    placeholder="Digite o Km Inicial da VTR"
                    onChange={setkmInicial}
                />
                <CampoDigitacao
                    tipo="number"
                    label="Km Final"
                    valor={kmFinal}
                    placeholder="Digite o Km Inicial da VTR"
                    onChange={setkmFinal}
                />
                <CampoDigitacao
                    tipo="number"
                    label="Km Rodados"
                    valor={kmFinal&&kmInicial&& (kmFinal- kmInicial)>0? kmFinal- kmInicial:""}
                    placeholder="Calculado automaticamente"
                />
                <CampoDigitacao
                    tipo="text"
                    label="Observações"
                    valor={observacoes}
                    placeholder="Digite as observações pertinentes
                    "
                />
                <CampoDigitacao
                    tipo="text"
                    label="Acessórios"
                    valor={acessorios}
                    placeholder="Digite os Acessórios pertinentes"
                />
                <CampoDigitacao
                    tipo="text"
                    label="Avarias"
                    valor={avarias}
                    placeholder="Digite as avarias presentes na viatura"
                />
                
                <BotaoCustomizado type="submit">
                    Cadastrar
                </BotaoCustomizado>
            </Formulario>
        </>
    );
}