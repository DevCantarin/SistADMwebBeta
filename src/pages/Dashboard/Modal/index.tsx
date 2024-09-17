import { useEffect, useState } from "react";
import { Radio, FormControlLabel, FormGroup, Modal, RadioGroup } from '@mui/material';
import { Box } from "@mui/material";
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Botao from "../../../components/Botao";
import Subtitulo from "../../../components/Subtitulo";
import IMike from "../../../types/IMIKE";
import usePost from "../../../usePost";
import autenticaStore from "../../../stores/autentica.store";
import usuarioStore from "../../../stores/usuario.store";
import { pegarDadosUsuarios, pegaTodosUsuarios } from "../../../servicos/UsuarioServico";
import { Usuario } from "../../../interfaces/Usuario";
import { agendarFolgas, pegarTodasAsFolgas } from "../../../servicos/FolgasServico";
import converterData from "../../../utils/ConverterData";
import { setReactionScheduler } from "mobx/dist/internal";
import { Efetivo } from "../../../interfaces/Efetivo";
import { pegaTodoEfetivo } from "../../../servicos/EfetivoServico";
import { wait } from "@testing-library/user-event/dist/utils";
import { Folga } from "../../../interfaces/Folga";
import { isNumber } from "util";

const BoxCustomizado = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--branco);
  border: none;
  border-radius: 16px;
  padding: 1em 5em;
`;

const Container = styled.div`
text-align: left;
`;

const BotaoCustomizado = styled(Botao)`
    width: 50%;
    display: block;
    margin: 0 auto;
`;

export default function ModalCadastro({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const [motivoFolga, setMotivoFolga] = useState('');
    const [quantidade, setQuantidade] = useState("");
    const [dataFolga, setDataFolga] = useState("");
    const {cadastrarDados} = usePost();
    const {usuario} = autenticaStore;
    const [dadosUsuarios, setDadosUsuarios] = useState<Usuario>({} as Usuario);
    const [mikeId, setMikeId] = useState('');
    const [re, setRe] = useState("");
    const [nome, setNome] = useState("");
    const [grad, setGrad] = useState("");
    const [justificativa, setJustificativa] = useState("");
    const [folgasAgendadas, setFolgasAgendadas] = useState<Folga[]>([])
    const [folgasAgendadasDoMes, setfolgasAgendadasDoMes] = useState<Folga[]>([])
    const [ds, setDs] = useState<Folga[]>([])


    const [efetivo, setEfetivo] = useState<Efetivo[]>([]);


    

      useEffect(() => {
        async function fetchData() {
          try {     
            const resultado = await pegaTodoEfetivo();
            if (resultado) {
                // console.log(`o resultade de efetivo é${JSON.stringify(resultado)}`)
              setEfetivo(resultado);
              setRe(usuarioStore.usuario.re+"-"+usuarioStore.usuario.dig)
            }
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
          }
        }
        fetchData();
      }, [open]);

      useEffect(() => {
        async function fetchData() {
          try {     
            const resultado:Folga[] = await pegarTodasAsFolgas();
            if (resultado) {
              const ds = resultado.filter((folga)=> folga.MOTIVO = "DISPENSA DO SERVIÇO" )
              setDs(ds)
              setFolgasAgendadas(resultado);

            }
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
          }
        }
        fetchData();
      }, [open]);

      useEffect(() => {
        async function fetchData() {
            const encontrado = efetivo.find(mike => `${mike.RE}-${mike.DIG}` === re);
                if (encontrado) {
                    setNome(encontrado.QRA);
                    setGrad(encontrado.GRAD)
                } else {
                    setNome('')
                    setGrad('')
                }
        }
        fetchData();
      }, [re]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
             if(new Date(dataFolga) <=new Date()){
                alert("A Data da Folga deve Ser Para o Futuro")
                 return
            }
        if(motivoFolga==="FOLGA MENSAL BG 101/23"){
            const folgasDoMes = folgasAgendadas.filter((folga) => {
            const dataFolgaVerificada = new Date(converterData(folga.DATA));
            const dataComparada = new Date(dataFolga);
    
            // console.log(`dataFolgaVerificada: ${dataFolgaVerificada}`);
            // console.log(`dataComparada: ${dataComparada}`);
    
            if (isNaN(dataFolgaVerificada.getTime()) || isNaN(dataComparada.getTime())) {
                console.error("Uma ou ambas as datas são inválidas após a conversão.");
            }           
            return folga.RE === re && folga.MOTIVO === "FOLGA MENSAL BG 101/23" && folga.APROVA==="SIM" && dataFolgaVerificada.getMonth() === dataComparada.getMonth();
                });
                console.log(JSON.stringify(folgasDoMes))
                setfolgasAgendadasDoMes(folgasDoMes)
                if(folgasDoMes.length>0){
                    alert(`${folgasDoMes.map(folga=> folga.NOME)} já tem uma folga mesal aprovada em ${folgasDoMes.map(folga=> folga.DATA)}`)
                    setRe("")
                    return
                }
        }
        
            agendarFolgas(dataFolga,grad,re,nome,motivoFolga,quantidade,justificativa)
            setRe("")


            
            
        } catch (error) {
            alert(`Deu RUIM ${error}`)
        }
    }



    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BoxCustomizado>
                    <Titulo>Cadastre o nome do Mike:</Titulo>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <CampoDigitacao tipo="text" label="RE" valor={re} obrigatorio={true} placeholder="Insira o RE com Digito '123456-7'" onChange={setRe}/>
                            <CampoDigitacao tipo="text" label="Nome" valor={nome} obrigatorio={true} placeholder=""/>
                            {/* <CampoDigitacao tipo="email" label="Email" valor={usuarioStore.usuario.email} placeholder="Digite o email"/> */}
                            <CampoDigitacao tipo="text" label="Graduação" valor={grad} obrigatorio={true} placeholder=""/>
                            <CampoDigitacao tipo="date" label="Data do inicio da Folga" valor={dataFolga} obrigatorio={true} placeholder="Digite a data de inicio da Folga" onChange={setDataFolga} />
                            <CampoDigitacao tipo="number" label="Quantidade de Dias" valor={quantidade} obrigatorio={true} placeholder="digite a quantidade de dias de Folga" onChange={setQuantidade} />
                            <Subtitulo>Selecione o Motivo da Folga:</Subtitulo>
                            <FormGroup>
                                <RadioGroup value={motivoFolga} onChange={(e) => setMotivoFolga(e.target.value)}>
                                    <FormControlLabel control={<Radio />} label="JUNÇÃO DE MEIOS" value="JUNÇÃO DE MEIOS" />
                                    <FormControlLabel control={<Radio />} label="DISPENSA DO SERVIÇO" value="DISPENSA DO SERVIÇO" />
                                    <FormControlLabel control={<Radio />} label="FOLGA MENSAL BG 101/23" value="FOLGA MENSAL BG 101/23" />
                                    <FormControlLabel control={<Radio />} label="LUTO" value="LUTO" />
                                    <FormControlLabel control={<Radio />} label="PATERNIDADE" value="PATERNIDADE" />
                                    <FormControlLabel control={<Radio />} label="NUPCIAS" value="NUPCIAS" />
                                    <FormControlLabel control={<Radio />} label="MEIO EXPEDIENTE - 08:00 - 13:00" value="MEIO EXPEDIENTE - 08:00 - 13:00" />
                                    <FormControlLabel control={<Radio />} label="MEIO EXPEDIENTE - 13:00 - 18:00" value="MEIO EXPEDIENTE - 13:00 - 18:00" />
                                    <FormControlLabel control={<Radio />} label="LSV" value="LSV" />
                                    <FormControlLabel control={<Radio />} label="ANIVERSÁRIO" value="ANIVERSÁRIO" />
                                    <FormControlLabel control={<Radio />} label="COMPENSAÇÃO OPERACIONAL" value="COMPENSAÇÃO OPERACIONAL" />
                                    <FormControlLabel control={<Radio />} label="FOLGA FLAGRANTE" value="FOLGA FLAGRANTE" />
                                </RadioGroup>
                            </FormGroup>
                            {motivoFolga==="COMPENSAÇÃO OPERACIONAL" && 
                            <CampoDigitacao tipo="number" label="MOTIVO DA COMPENSAÇÃO OPERACIONAL" obrigatorio ={true} valor={justificativa} placeholder="digite o motivo da compensação operacional" onChange={setJustificativa} />}
                        </Container>
                        <BotaoCustomizado>Cadastrar</BotaoCustomizado>
                    </form>
                </BoxCustomizado>
            </Modal>
        </>
    );
}
