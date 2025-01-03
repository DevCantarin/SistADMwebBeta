import styled from "styled-components";
import escalaImg from "./Imagens/escala.jpeg"
import RSO from "../RSO/rso.png";
import EscalaDeServiço from "./Imagens/EscalaDeServiço.jpeg"
import { useEffect, useState } from "react";
import usuarioStore from "../../stores/usuario.store";
import autenticaStore from "../../stores/autentica.store";
import { pegarDadosUsuarios } from "../../servicos/UsuarioServico";
import { Usuario } from "../../interfaces/Usuario";

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
padding: 2em;
`
const ContainerIcones = styled.section`
display: flex;
flex-direction: line;
align-items: center;
padding: 5em;
`
const LinkEstilizado = styled.a`
 color: var(--azul-escuro);
 font-weight: 700;
 align-items: center;
 margin: 0 10px;
   p {
    text-align: center;
  }
`
const LinkEstilizadoDeslogado = styled(LinkEstilizado)`
font-weight: 400;
text-decoration: none;
color: var(--azul-escuro)
display: bloc;
align-items: center;

`

const EscalaStyled = styled.img`
  width: 20em;  
  height: 20em; 
  object-fit: cover;
//   border: 2px solid var(--azul-escuro);
`

const RSOStyled = styled.img`
  width: 20em;  
  height: 20em; 
  object-fit: cover; 
//   border: 2px solid var(--azul-escuro);
`

export default function PaginaInicial() {
  const [mikeId, setMikeId]  = useState("")
  const [dadosUsuarios, setDadosUsuarios] = useState<Usuario>({} as Usuario);

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


  
  
  return (
    <>
        {/* <Banner /> */}
        <Container>
            <ContainerIcones>
                <LinkEstilizado href="/dashboard">
                    <p>Verificar Escala</p>
                    <EscalaStyled src={escalaImg} alt="Verificar Escala" />
                </LinkEstilizado>
                
                <LinkEstilizado href="/rso">
                    <p>RSO</p>
                    <RSOStyled src={RSO} alt="RSO" />
                </LinkEstilizado>

                {usuarioStore.usuario.funcao === "ADMINISTRADOR" && (
                    <LinkEstilizado href="/escala">
                        <p>Escalada De Serviço</p>
                        <RSOStyled src={EscalaDeServiço} alt="Escalada De Serviço" />
                    </LinkEstilizado>
                )}
            </ContainerIcones>
            {/* <Pesquisa /> */}
            {/* <Atividades /> */}
            {/* <Depoimentos /> */}
        </Container>
    </>
);

}