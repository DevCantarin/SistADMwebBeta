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
import rsoStore from "../../../../stores/rso.store";
import RSO from "../..";

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

`;
const TituloCabeca = styled.h2`
  font-weight: 700;
  font-size: 50px;
  line-height: 28px;
  color: var(--cinza);

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
  display: grid;
  width: 100%;
  grid-template-columns: 30% 65%;
  justify-content: space-between
`;


export default function RSOEquipe() {
    const [etapaAtiva, setEtapaAtiva] = useState(0);
    const [dadosUsuarios, setDadosUsuarios] = useState<Usuario>({} as Usuario);

    const [gradMotorista, setGradMotorista] = useState('');
    const [reMotorista, setReMotorista] = useState('');
    const [copMotorista, setCopMotorista] = useState('');
    const [nomeMotorista, setNomeMotorista] = useState('');
    const [telefoneMotorista, setTelefoneMotorista] = useState('');

    const [gradSegurança1, setGradSegurança1] = useState('');
    const [reSegurança1, setReSegurança1] = useState('');
    const [copSegurança1, setCopSegurança1] = useState('');
    const [nomeSegurança1, setNomeSegurança1] = useState('');
    const [telefoneSegurança1, setTelefoneSegurança1] = useState('');
    
    const [gradSegurança2, setGradSegurança2] = useState('');
    const [reSegurança2, setReSegurança2] = useState('');
    const [copSegurança2, setCopSegurança2] = useState('');
    const [nomeSegurança2, setNomeSegurança2] = useState('');
    const [telefoneSegurança2, setTelefoneSegurança2] = useState('');
    
    const [gradSegurança3, setGradSegurança3] = useState('');
    const [reSegurança3, setReSegurança3] = useState('');
    const [copSegurança3, setCopSegurança3] = useState('');
    const [nomeSegurança3, setNomeSegurança3] = useState('');
    const [telefoneSegurança3, setTelefoneSegurança3] = useState('');
    
    const [gradSegurança4, setGradSegurança4] = useState('');
    const [reSegurança4, setReSegurança4] = useState('');
    const [copSegurança4, setCopSegurança4] = useState('');
    const [nomeSegurança4, setNomeSegurança4] = useState('');
    const [telefoneSegurança4, setTelefoneSegurança4] = useState('');
    
    
    const [senhaVerificada, setSenhaVerificada] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');


    const [grad, setGrad] = useState('');
    const [re, setRE] = useState('');
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
    const [cop, setCop] = useState('');
    const [telefone, setTelefone] = useState('');
    const {cadastrarDados, erro, sucesso} = usePost();
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();
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


        

        if (etapaAtiva !== 0) {
            try {
                // rsoStore.atualizaRSO()
                // navigate('/login');
            } catch (erro) {
                erro && alert('Erro ao cadastrar os dados')
            }
        }

    }


    return (
        <>  
            <Formulario onSubmit={handleSubmit}>
            <TituloCabeca>Equipe</TituloCabeca>
            <Titulo>Encarregado:</Titulo>
            {/* <p>{rsoStore.rso.Equipe.motorista.grad}</p>
            <p>{rsoStore.rso.Equipe.motorista.re}</p>
            <p>{rsoStore.rso.Equipe.motorista.cop}</p>
            <p>{rsoStore.rso.Equipe.motorista.nome}</p>
            <p>{rsoStore.rso.Equipe.motorista.telefone}</p>
            <p>{usuarioStore.usuario.nome}</p> */}
                <CampoDigitacao
                    tipo="text"
                    label="Posto/Graduação"
                    valor={dadosUsuarios.grad}
                    placeholder="Insira seu nome"
                />
                <CampoDigitacao
                    tipo="text"
                    label="RE"
                    valor={`${dadosUsuarios.re}-${dadosUsuarios.dig}`}
                    placeholder="Insira o endereço de e-mail para login"
                />
                <CampoDigitacao
                    tipo="text"
                    label="Número da Coop"
                    valor={cop}
                    placeholder="Digite sua senha"
                    onChange={setCop}
                />
                <CampoDigitacao
                    tipo="text"
                    label="QRA"
                    valor={dadosUsuarios.nome}
                    placeholder="Confirme sua senha"
                />
                <CampoDigitacao
                    tipo="text"
                    label="Telefone"
                    valor={dadosUsuarios.telefone && dadosUsuarios.telefone.toString()}
                    placeholder="Confirme sua senha"
                />

                <Titulo>Motorista:</Titulo>
                <CampoDigitacao
                    tipo="text"
                    label="Posto/Graduação"
                    valor={gradMotorista}
                    placeholder="Insira o posto/graduação"
                    onChange={(valor) => {
                        setGradMotorista(valor);
                        rsoStore.rso.Equipe.motorista.grad = valor;
                    }}
                />

                <CampoDigitacao
                    tipo="text"
                    label="RE"
                    valor={reMotorista}
                    placeholder="Insira o endereço de e-mail para login"
                    onChange={(valor) => {
                        setReMotorista(valor);
                        rsoStore.rso.Equipe.motorista.re = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Número da Coop"
                    valor={copMotorista}
                    placeholder="Digite sua senha"
                    onChange={(valor) => {
                        setCopMotorista(valor);
                        rsoStore.rso.Equipe.motorista.cop = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="QRA"
                    valor={nomeMotorista}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setNomeMotorista(valor);
                        rsoStore.rso.Equipe.motorista.nome = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Telefone"
                    valor={telefoneMotorista}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setTelefoneMotorista(valor);
                        rsoStore.rso.Equipe.motorista.telefone = valor;
                    }}
                />

                <Titulo>Segurança:</Titulo>
                <CampoDigitacao
                    tipo="text"
                    label="Posto/Graduação"
                    valor={gradSegurança1}
                    placeholder="Insira seu nome"
                    onChange={(valor) => {
                        setGradSegurança1(valor);
                        rsoStore.rso.Equipe.seguranca1.grad = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="RE"
                    valor={reSegurança1}
                    placeholder="Insira o endereço de e-mail para login"
                    onChange={(valor) => {
                        setReSegurança1(valor);
                        rsoStore.rso.Equipe.seguranca1.re = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Número da Coop"
                    valor={copSegurança1}
                    placeholder="Digite sua senha"
                    onChange={(valor) => {
                        setCopSegurança1(valor);
                        rsoStore.rso.Equipe.seguranca1.cop = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="QRA"
                    valor={nomeSegurança1}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setNomeSegurança1(valor);
                        rsoStore.rso.Equipe.seguranca1.nome = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Telefone"
                    valor={telefoneSegurança1}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setTelefoneSegurança1(valor);
                        rsoStore.rso.Equipe.seguranca1.telefone = valor;
                    }}
                />
                
                <Titulo>Segurança:</Titulo>
                <CampoDigitacao
                    tipo="text"
                    label="Posto/Graduação"
                    valor={gradSegurança2}
                    placeholder="Insira seu nome"
                    onChange={(valor) => {
                        setGradSegurança2(valor);
                        rsoStore.rso.Equipe.seguranca2.grad = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="RE"
                    valor={reSegurança2}
                    placeholder="Insira o endereço de e-mail para login"
                    onChange={(valor) => {
                        setReSegurança2(valor);
                        rsoStore.rso.Equipe.seguranca2.re = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Número da Coop"
                    valor={copSegurança2}
                    placeholder="Digite sua senha"
                    onChange={(valor) => {
                        setCopSegurança2(valor);
                        rsoStore.rso.Equipe.seguranca2.cop = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="QRA"
                    valor={nomeSegurança2}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setNomeSegurança2(valor);
                        rsoStore.rso.Equipe.seguranca2.nome = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Telefone"
                    valor={telefoneSegurança2}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setTelefoneSegurança2(valor);
                        rsoStore.rso.Equipe.seguranca2.telefone = valor;
                    }}
                />

                <Titulo>Segurança:</Titulo>
                <CampoDigitacao
                    tipo="text"
                    label="Posto/Graduação"
                    valor={gradSegurança3}
                    placeholder="Insira seu nome"
                    onChange={(valor) => {
                        setGradSegurança3(valor);
                        rsoStore.rso.Equipe.seguranca3.grad = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="RE"
                    valor={reSegurança3}
                    placeholder="Insira o endereço de e-mail para login"
                    onChange={(valor) => {
                        setReSegurança3(valor);
                        rsoStore.rso.Equipe.seguranca3.re = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Número da Coop"
                    valor={copSegurança3}
                    placeholder="Digite sua senha"
                    onChange={(valor) => {
                        setCopSegurança3(valor);
                        rsoStore.rso.Equipe.seguranca3.cop = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="QRA"
                    valor={nomeSegurança3}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setNomeSegurança3(valor);
                        rsoStore.rso.Equipe.seguranca3.nome = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Telefone"
                    valor={telefoneSegurança3}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setTelefoneSegurança3(valor);
                        rsoStore.rso.Equipe.seguranca3.telefone = valor;
                    }}
                />
                
                
                
                <BotaoCustomizado type="submit">
                    Cadastrar
                </BotaoCustomizado>
            </Formulario>
        </>
    );
}