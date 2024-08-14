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
import { pegarDadosUsuarios } from "../../../servicos/UsuarioServico";
import { Usuario } from "../../../interfaces/Usuario";
import { agendarFolgas } from "../../../servicos/FolgasServico";
import converterData from "../../../utils/ConverterData";

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
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
             if(new Date(dataFolga) <=new Date()){
                alert("A Data da Folga deve Ser Para o Futuro")
                 return
            } 

            
            
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
                    <Titulo>Cadastre o especialista inserindo os dados abaixo:</Titulo>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <CampoDigitacao tipo="text" label="Nome" valor={usuarioStore.usuario.nome} placeholder="Digite o completo"/>
                            <CampoDigitacao tipo="email" label="Email" valor={usuarioStore.usuario.email} placeholder="Digite o email"/>
                            <CampoDigitacao tipo="text" label="Graduação" valor={usuarioStore.usuario.grad} placeholder="Digite a graduação "/>
                            <CampoDigitacao tipo="text" label="RE" valor={`${usuarioStore.usuario.re}-${usuarioStore.usuario.dig}`} placeholder="Insira o RE com Digito '123456-7'"/>
                            <CampoDigitacao tipo="date" label="Data do inicio da Folga" valor={dataFolga} placeholder="Digite a data de inicio da Folga" onChange={setDataFolga} />
                            <CampoDigitacao tipo="text" label="Quantidade de Dias" valor={quantidade} placeholder="digite a quantidade de dias de Folga" onChange={setQuantidade} />
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
                        </Container>
                        <BotaoCustomizado>Cadastrar</BotaoCustomizado>
                    </form>
                </BoxCustomizado>
            </Modal>
        </>
    );
}
