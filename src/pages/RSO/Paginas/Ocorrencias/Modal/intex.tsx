import { useEffect, useState } from "react";
import { Radio, FormControlLabel, FormGroup, Modal, RadioGroup, accordionActionsClasses } from '@mui/material';
import { Box } from "@mui/material";
import styled from "styled-components";
import Botao from "../../../../../components/Botao";
import autenticaStore from "../../../../../stores/autentica.store";
import { Folga } from "../../../../../interfaces/Folga";
import { Efetivo } from "../../../../../interfaces/Efetivo";
import { pegaTodoEfetivo } from "../../../../../servicos/EfetivoServico";
import usuarioStore from "../../../../../stores/usuario.store";
import { pegarTodasAsFolgas } from "../../../../../servicos/FolgasServico";
import Titulo from "../../../../../components/Titulo";
import CampoDigitacao from "../../../../../components/CampoDigitacao";
import Subtitulo from "../../../../../components/Subtitulo";
import rsoStore from "../../../../../stores/rso.store";
import { Abordado, Ocorrencia } from "../../../../../interfaces/RSO";

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
  const [ocorrencia, setOcorrencia] = useState({
    talao: "",
    apoio: "",
    qtrIrradiado: "",
    qtrLocal: "",
    qtrTerm1: "",
    qtrTerm2: "",
    endereco: "",
    numero: "",
    natureza: "",
    resultado: "",
    observacao: "",
  });

  const [situacao, setSituacao] = useState('');
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [horarioAbordagem, setHorarioAbordagem] = useState(() => {
    const date = new Date();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  });

  const adicionaOcorrencia = (novaOcorrencia: Ocorrencia) => {
    setOcorrencias([...ocorrencias, novaOcorrencia]); // Adiciona um novo abordado ao array
  };


  const atualizaOcorrencia = (campo: string, valor: string) => {
    setOcorrencia((prevOcorrencia) => ({
      ...prevOcorrencia,
      [campo]: valor
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const novaOcorrencia = {
      talao: ocorrencia.talao,
      apoio: ocorrencia.apoio,
      qtrIrradiado: ocorrencia.qtrIrradiado,
      qtrLocal: ocorrencia.qtrLocal,
      qtrTerm1: ocorrencia.qtrTerm1,
      qtrTerm2: ocorrencia.qtrTerm2,
      endereco: ocorrencia.endereco,
      numero: ocorrencia.numero,
      natureza: ocorrencia.natureza,
      resultado: ocorrencia.resultado,
      observacao: ocorrencia.observacao
    };
  
    rsoStore.adicionaOcorrencia(novaOcorrencia); // Adiciona ao MobX store
    adicionaOcorrencia(novaOcorrencia); // Adiciona ao estado local do React
    ocorrencia.talao=""
    ocorrencia.apoio=""
    ocorrencia.qtrIrradiado=""
    ocorrencia.qtrLocal=""
    ocorrencia.qtrTerm1=""
    ocorrencia.qtrTerm2=""
    ocorrencia.endereco=""
    ocorrencia.numero=""
    ocorrencia.natureza=""
    ocorrencia.resultado=""
    ocorrencia.observacao=""
    handleClose(); // Fecha o modal após o cadastro
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxCustomizado>
          <Titulo>Cadastre a Ocorrência:</Titulo>
          <form onSubmit={handleSubmit}>
            <Container>
              <CampoDigitacao
                tipo="text"
                label="Talão"
                valor={ocorrencia.talao}
                obrigatorio={true}
                placeholder="Digite o número do Talão"
                onChange={(valor) => atualizaOcorrencia('talao', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Apoio?"
                valor={ocorrencia.apoio}
                obrigatorio={true}
                placeholder="Digite sim ou não"
                onChange={(valor) => atualizaOcorrencia('apoio', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Hora da Irradiação"
                valor={ocorrencia.qtrIrradiado}
                placeholder="Digite o horário da irradiação da ocorrência"
                onChange={(valor) => atualizaOcorrencia('qtrIrradiado', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Local"
                valor={ocorrencia.endereco}
                obrigatorio={true}
                placeholder="Digite o local da Ocorrência"
                onChange={(valor) => atualizaOcorrencia('endereco', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Horário Local"
                valor={ocorrencia.qtrLocal}
                placeholder="Digite o horário de chegada no Local da Ocorrência"
                onChange={(valor) => atualizaOcorrencia('qtrLocal', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="1º Término"
                valor={ocorrencia.qtrTerm1}
                placeholder="00:00"
                onChange={(valor) => {
                  setHorarioAbordagem(valor);
                  atualizaOcorrencia('qtrTerm1', valor);
                }}
              />
              <CampoDigitacao
                tipo="text"
                label="2º Término"
                valor={ocorrencia.qtrTerm2}
                placeholder="00:00"
                onChange={(valor) => {
                  setHorarioAbordagem(valor);
                  atualizaOcorrencia('qtrTerm2', valor);
                }}
              />
              <CampoDigitacao
                tipo="text"
                label="Natureza da ocorrência"
                valor={ocorrencia.natureza}
                placeholder="Código da ocorrência"
                onChange={(valor) => {
                  setHorarioAbordagem(valor);
                  atualizaOcorrencia('natureza', valor);
                }}
              />
              <CampoDigitacao
                tipo="text"
                label="Resultado"
                valor={ocorrencia.resultado}
                placeholder="Resultado da Ocorrência"
                onChange={(valor) => {
                  setHorarioAbordagem(valor);
                  atualizaOcorrencia('resultado', valor);
                }}
              />
              {/* <Subtitulo>Selecione a Situação do Abordado:</Subtitulo> */}
              {/* <FormGroup>
                <RadioGroup
                  value={abordado.situacao}
                  onChange={(e) => atualizaOcorrencia('situacao', e.target.value)}
                >
                  <FormControlLabel control={<Radio />} label="PARTE DA OCORRÊNCIA" value="PARTE DA OCORRÊNCIA" />
                  <FormControlLabel control={<Radio />} label="TESTEMUNHA" value="TESTEMUNHA" />
                  <FormControlLabel control={<Radio />} label="CONDUTOR" value="CONDUTOR" />
                  <FormControlLabel control={<Radio />} label="PASSAGEIRO" value="PASSAGEIRO" />
                  <FormControlLabel control={<Radio />} label="OUTROS" value="OUTROS" />
                </RadioGroup>
              </FormGroup> */}
            </Container>
            <BotaoCustomizado type="submit">Cadastrar</BotaoCustomizado>
          </form>
        </BoxCustomizado>
      </Modal>
    </>
  );
}
