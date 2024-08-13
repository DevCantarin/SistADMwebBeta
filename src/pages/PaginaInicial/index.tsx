import styled from "styled-components";
import escalaImg from "./Imagens/escala.jpeg"
import Atividades from "./Atividades";
// import Banner from "./Banner";
import Depoimentos from "./Depoimentos";
// import Pesquisa from "./Pesquisa";

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
padding: 2em;
`
const LinkEstilizado = styled.a`
 color: var(--azul-escuro);
 font-weight: 700;
 align-items: center;
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

`

export default function PaginaInicial() {
    return (
        <>
            {/* <Banner /> */}
            <Container>
                <LinkEstilizado href="/dashboard">
                    <p>Verificar Escala</p>
                    <EscalaStyled src= {escalaImg}/>
                </LinkEstilizado>
                {/* <Pesquisa /> */}
                {/* <Atividades />
                <Depoimentos /> */}
            </Container >
        </>
    )
}