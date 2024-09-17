import styled from "styled-components";
import escalaImg from "./Imagens/escala.jpeg"
import RSO from "../RSO/rso.png";

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
    return (
        <>
            {/* <Banner /> */}
            <Container>
                <ContainerIcones>
                    <LinkEstilizado href="/dashboard">
                        <p>Verificar Escala</p>
                        <EscalaStyled src= {escalaImg}/>
                    </LinkEstilizado>
                    <LinkEstilizado href="/rso">
                        <p>RSO</p>
                        <RSOStyled src= {RSO}/>
                    </LinkEstilizado>
                </ContainerIcones>
                {/* <Pesquisa /> */}
                {/* <Atividades />
                <Depoimentos /> */}
            </Container >
        </>
    )
}