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



export default function RSOInfomacoes() {
    const [etapaAtiva, setEtapaAtiva] = useState(0);
    const [dadosUsuarios, setDadosUsuarios] = useState<Usuario>({} as Usuario);

    const [OPM, setOPM] = useState('');
    const [US, setUS] = useState('');
    const [dataSevico, setDataSevico] = useState(new Date().toISOString().substring(0, 10));
    const [HorarioInicio, setHorarioInicio] = useState('');
    const [horarioFinal, setHorarioFinal] = useState(() => {
        const date = new Date();
        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`; // Formato HH:MM
      });



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


    const handleHorarioChange = (valor: string) => {
        // Remove todos os caracteres que não sejam números
        let novoValor = valor.replace(/\D/g, '');
    
        // Adiciona automaticamente o ":" após os dois primeiros números (horas)
        if (novoValor.length > 2) {
            novoValor = `${novoValor.slice(0, 2)}:${novoValor.slice(2, 4)}`;
        }
    
        // Atualiza o estado com o valor formatado
        setHorarioInicio(novoValor);
    
        // Validação quando o valor tem exatamente 5 caracteres (formato completo HH:MM)
        if (novoValor.length === 5) {
            const [horas, minutos] = novoValor.split(':').map(Number);
    
            if (horas > 23) {
                alert('As horas não podem ser maiores que 23');
                setHorarioInicio("")
            } else if (minutos > 59) {
                alert('Os minutos não podem ser maiores que 59');
                setHorarioInicio("")
            } else {
                // Se a validação estiver correta, armazena o valor
                rsoStore.rso.Equipe.motorista.telefone = novoValor;
            }
        }
    };
    const handleHorarioFinalChange = (valor: string) => {
        // Remove todos os caracteres que não sejam números
        let novoValor = valor.replace(/\D/g, '');
    
        // Adiciona automaticamente o ":" após os dois primeiros números (horas)
        if (novoValor.length > 2) {
            novoValor = `${novoValor.slice(0, 2)}:${novoValor.slice(2, 4)}`;
        }
    
        // Atualiza o estado com o valor formatado
        setHorarioFinal(novoValor);
    
        // Validação quando o valor tem exatamente 5 caracteres (formato completo HH:MM)
        if (novoValor.length === 5) {
            const [horas, minutos] = novoValor.split(':').map(Number);
    
            if (horas > 23) {
                alert('As horas não podem ser maiores que 23');
                setHorarioFinal("")
            } else if (minutos > 59) {
                alert('Os minutos não podem ser maiores que 59');
                setHorarioFinal("")
            } else {
                // Se a validação estiver correta, armazena o valor
                rsoStore.rso.Equipe.motorista.telefone = novoValor;
            }
        }
    };
    
    
    


    return (
        <>  
            <Formulario onSubmit={handleSubmit}>
            <TituloCabeca>Informações</TituloCabeca>
                <CampoDigitacao
                    tipo="text"
                    label="Unidade Operacional"
                    valor={OPM}
                    placeholder="Insira o posto/graduação"
                    onChange={(valor) => {
                        setOPM(valor);
                        rsoStore.rso.Equipe.motorista.grad = valor;
                    }}
                />

                <CampoDigitacao
                    tipo="text"
                    label="Equipe Operacional"
                    valor={US}
                    placeholder="Insira o endereço de e-mail para login"
                    onChange={(valor) => {
                        setUS(valor);
                        rsoStore.rso.Equipe.motorista.re = valor;
                    }}
                />

                <CampoDigitacao
                    tipo="date"
                    label="Data do Serviço"
                    valor={dataSevico}
                    placeholder="Confirme sua senha"
                    onChange={(valor) => {
                        setDataSevico(valor);
                        rsoStore.rso.Equipe.motorista.nome = valor;
                    }}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Horario de inicio do serviço"
                    valor={HorarioInicio}
                    placeholder="00:00"
                    onChange={handleHorarioChange}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Horario de Fim do serviço"
                    valor={horarioFinal}
                    placeholder="00:00"
                />


                <BotaoCustomizado type="submit">
                    Cadastrar
                </BotaoCustomizado>
            </Formulario>
        </>
    );
}