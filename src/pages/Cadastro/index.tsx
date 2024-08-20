import styled from "styled-components";
import pmesp from "./pmesp.png"
import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from 'react';
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import usePost from "../../usePost";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../interfaces/Usuario";
import { cadastrarUsuario } from "../../servicos/UsuarioServico";

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

const Formulario = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BotaoCustomizado = styled(Botao)`
  width: 50%;
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 30% 65%;
  justify-content: space-between
`;


export default function Cadastro() {
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
        <Imagem src={pmesp} alt="Logo da Voll" />
        <Stepper activeStep={etapaAtiva}>
            <Step>
                <StepLabel 
                StepIconComponent={(props) => (
                    <StepCustomizada cor={props.active ? 'lightblue' : 'lightgray'} />
                )}
                />
            </Step>
            <Step>
            <StepLabel 
                StepIconComponent={(props) => (
                    <StepCustomizada cor={props.active ? 'lightblue' : 'lightgray'} />
                )}
                />
            </Step>
        </Stepper>

        {etapaAtiva === 0 ? (
                <>
                    <Titulo>Primeiro, alguns dados básicos:</Titulo>
                    <Formulario onSubmit={handleSubmit}>
                        <CampoDigitacao
                            tipo="text"
                            label="Nome"
                            valor={nome}
                            placeholder="Insira seu nome"
                            onChange={setNome}
                        />
                        <CampoDigitacao
                            tipo="email"
                            label="Email"
                            valor={email}
                            placeholder="Insira o endereço de e-mail para login"
                            onChange={setEmail}
                        />
                        <CampoDigitacao
                            tipo="password"
                            label="Senha"
                            valor={senha}
                            placeholder="Digite sua senha"
                            onChange={setSenha}
                        />
                        <CampoDigitacao
                            tipo="password"
                            label="Confirme a senha"
                            valor={senhaVerificada}
                            placeholder="Confirme sua senha"
                            onChange={setSenhaVerificada}
                        />
                        <BotaoCustomizado type="submit">Avançar</BotaoCustomizado>
                    </Formulario>
                </>) : (
                <>
                    <Titulo>Agora, os dados técnicos:</Titulo>
                    <Formulario onSubmit={handleSubmit}>
                        <CampoDigitacao
                            tipo="text"
                            label="Nome Completo"
                            valor={nomeCompleto}
                            placeholder="Insira seu Nome Completo"
                            onChange={setNomeCompleto}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Posto ou Graduação"
                            valor={grad}
                            placeholder="Insira seu Posto ou Graduação"
                            onChange={setGrad}
                        />
                        <CampoDigitacao
                            tipo="number"
                            label="Registro Estatistico (RE) sem Digito"
                            valor={re}
                            placeholder="Insira o seu RE sem o Digito"
                            onChange={setRE}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Digito do RE"
                            valor={dig}
                            placeholder="Digite Apenas o Digito do RE"
                            onChange={setDig}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Pai"
                            valor={pai}
                            placeholder="Digite o Nome do Seu Pai"
                            onChange={setPai}
                        />
                            <CampoDigitacao
                                tipo="text"
                                label="Mãe"
                                valor={mae}
                                placeholder="Digite o Nome da Sua Mãe"
                                onChange={setMae}
                            />
                            <CampoDigitacao
                                tipo="date"
                                label="Data de Admissão"
                                valor={admissao}
                                placeholder="Digite a data da Sua Admissão"
                                onChange={setAdmissao}
                            />
                            <CampoDigitacao
                                tipo="date"
                                label="Data de Nascimento"
                                valor={nascimento}
                                placeholder="Digite a sua Data de Nascimento"
                                onChange={setNascimento}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Cidade "
                                valor={cidade}
                                placeholder="Digite a Cidade da sua Residência"
                                onChange={setCidade}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Conjuge "
                                valor={conjuge}
                                placeholder="Digite o nome completo do seu Conjuge"
                                onChange={setConjuge}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Dependente "
                                valor={dependentes}
                                placeholder="Digite a quantidade de dependentes"
                                onChange={setDependentes}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Tipo Saguineo "
                                valor={sangue}
                                placeholder="Digite o seu Tipo Sanguineo com o Fator RH"
                                onChange={setSangue}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Cor da Pele "
                                valor={cor}
                                placeholder="Digite a Cor da Sua Pele"
                                onChange={setCor}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Cor dos Olhos "
                                valor={olhos}
                                placeholder="Digite a Cor dos seus Olhos"
                                onChange={setOlhos}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Cabelo "
                                valor={cabelos}
                                placeholder="Digite do seu Cabelo"
                                onChange={setCabelos}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Bigode "
                                valor={bigodes}
                                placeholder="Voce usa Bigode?"
                                onChange={setBigodes}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="CPF "
                                valor={cpf}
                                placeholder="Digite o seu CPF"
                                onChange={setCpf}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="RG "
                                valor={rg}
                                placeholder="Digite o seu RG"
                                onChange={setRG}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="PASEP "
                                valor={pasep}
                                placeholder="Digite o seu PASEP"
                                onChange={setPasep}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="PIS "
                                valor={pis}
                                placeholder="Digite o seu PIS"
                                onChange={setPis}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Carteira de Trabalho "
                                valor={carteiraTrabalho}
                                placeholder="Digite o número da sua Carteira de Trabalho"
                                onChange={setCarteiraTrabalho}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="CNH "
                                valor={cnh}
                                placeholder="Digite  o número da sua CNH"
                                onChange={setCnh}
                            />
                            <CampoDigitacao
                                tipo="date" 
                                label="Validade da CNH "                              
                                valor={val}
                                placeholder="Digite a data de validade da sua CNH"
                                onChange={setVal}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Categoria da CNH "
                                valor={cat}
                                placeholder="Digite a Categoria da Sua CNH"
                                onChange={setCat}
                                />
                            <CampoDigitacao
                                tipo="text"
                                label="SAT "
                                valor={sat}
                                placeholder="Digite o número do seu SAT"
                                onChange={setSat}
                                />
                            <CampoDigitacao
                                tipo="text"
                                label="Residência "
                                valor={residencia}
                                placeholder="Digite o endereço da sua Residência"
                                onChange={setResidencia}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="Bairro "
                                valor={bairro}
                                placeholder="Digite o Bairro da sua Residência"
                                onChange={setBairro}
                            />
                            <CampoDigitacao
                                tipo="text"
                                label="CEP "
                                valor={cep}
                                placeholder="Digite  o número do  seu  CEP"
                                onChange={setCep}
                                />
                            <CampoDigitacao
                                tipo="tel"
                                label="Telefone"
                                valor={telefone}
                                placeholder="(DDD) XXXXX-XXXX"
                                onChange={setTelefone}
                                />
                                <Container>
                        </Container>
                        <BotaoCustomizado type="submit">Cadastrar</BotaoCustomizado>
                    </Formulario>
                </>
    )
    
} 
</> 
)
}