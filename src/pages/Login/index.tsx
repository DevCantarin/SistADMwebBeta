import styled from "styled-components";
import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";


import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import { fazerLogin } from "../../servicos/AutenticacaoServico";
// import logo from './Logo.png';
import autenticaStore from "../../stores/autentica.store";
import { jwtDecode } from "jwt-decode";

// const Imagem = styled.img`
//   padding: 2em 0;
// `;

const Titulo = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza)
`;

const Paragrafo = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: var(--azul-escuro)
`;

const ParagrafoCadastro = styled(Paragrafo)`
  color: var(--cinza);
`;

const LinkCustomizado = styled(Link)`
  color: var(--azul-claro);
  font-weight: 700;
  text-decoration: none;
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


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const resultado = await fazerLogin(email, senha);
    if (resultado) {
      const { accessToken } = resultado;
      const tokenDecodificado = jwtDecode(accessToken) as any;
      // await AsyncStorage.setItem('mikeId', mikeId); 
      const mikeId = tokenDecodificado.id;
      await autenticaStore.login({email: email , token: accessToken, id: mikeId}); 

      navigate('/dashboard')
    } else {
      alert("deu ruim")
    }
  }

    

    return (
        <>
        {/* <Imagem src={logo} alt="Logo da Voll" /> */}
        <Titulo>Faça login em sua conta</Titulo>
        <Formulario onSubmit={handleLogin}>
            <CampoDigitacao tipo="email" label="Email" valor={email} placeholder="Insira seu endereço de email" onChange={setEmail} />
            <CampoDigitacao tipo="password" label="Senha" valor={senha} placeholder="Insira sua senha" onChange={setSenha} />
            <BotaoCustomizado type="submit">Entrar</BotaoCustomizado>
        </Formulario>
        <Paragrafo>Esqueceu sua senha?</Paragrafo>
        <ParagrafoCadastro>Ainda não tem conta? <LinkCustomizado to="/cadastro">Faça seu cadastro!</LinkCustomizado></ParagrafoCadastro>
        </>  
    )
}