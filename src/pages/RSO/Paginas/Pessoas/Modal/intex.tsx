import { useEffect, useState } from "react";
import { Radio, FormControlLabel, FormGroup, Modal, RadioGroup } from '@mui/material';
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
import { Abordado } from "../../../../../interfaces/RSO";

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
  const [abordado, setAbordado] = useState({
    nome: '',
    rg: '',
    cnh: '',
    localAbordagem: '',
    artigos: '',
    horario: '',
    situacao: ''
  });

  const [situacao, setSituacao] = useState('');
  const [abordados, setAbordados] = useState<Abordado[]>([]);
  const [horarioAbordagem, setHorarioAbordagem] = useState(() => {
    const date = new Date();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  });

  const adicionaAbordado = (novoAbordado: Abordado) => {
    setAbordados([...abordados, novoAbordado]); // Adiciona um novo abordado ao array
  };


  const atualizaAbordado = (campo: string, valor: string) => {
    setAbordado((prevAbordado) => ({
      ...prevAbordado,
      [campo]: valor
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const novoAbordado = {
      nome: abordado.nome,
      rg: abordado.rg,
      cnh: abordado.cnh,
      localAbordagem: abordado.localAbordagem,
      artigos: abordado.artigos,
      situacao: abordado.situacao
    };
  
    rsoStore.adicionaAbordado(novoAbordado); // Adiciona ao MobX store
    adicionaAbordado(novoAbordado); // Adiciona ao estado local do React
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
          <Titulo>Cadastre o Abordado:</Titulo>
          <form onSubmit={handleSubmit}>
            <Container>
              <CampoDigitacao
                tipo="text"
                label="Nome"
                valor={abordado.nome}
                obrigatorio={true}
                placeholder="Digite o nome do abordado"
                onChange={(valor) => atualizaAbordado('nome', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="RG"
                valor={abordado.rg}
                obrigatorio={true}
                placeholder="Digite o RG do Abordado"
                onChange={(valor) => atualizaAbordado('rg', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="CNH"
                valor={abordado.cnh}
                placeholder="Digite o Número da CNH (se houver)"
                onChange={(valor) => atualizaAbordado('cnh', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Local"
                valor={abordado.localAbordagem}
                obrigatorio={true}
                placeholder="Digite o local da Abordagem"
                onChange={(valor) => atualizaAbordado('localAbordagem', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Artigos"
                valor={abordado.artigos}
                placeholder="Digite os artigos criminais do abordado se houver"
                onChange={(valor) => atualizaAbordado('artigos', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Horário da Abordagem"
                valor={horarioAbordagem}
                placeholder="00:00"
                onChange={(valor) => {
                  setHorarioAbordagem(valor);
                  atualizaAbordado('horario', valor);
                }}
              />
              <Subtitulo>Selecione a Situação do Abordado:</Subtitulo>
              <FormGroup>
                <RadioGroup
                  value={abordado.situacao}
                  onChange={(e) => atualizaAbordado('situacao', e.target.value)}
                >
                  <FormControlLabel control={<Radio />} label="PARTE DA OCORRÊNCIA" value="PARTE DA OCORRÊNCIA" />
                  <FormControlLabel control={<Radio />} label="TESTEMUNHA" value="TESTEMUNHA" />
                  <FormControlLabel control={<Radio />} label="CONDUTOR" value="CONDUTOR" />
                  <FormControlLabel control={<Radio />} label="PASSAGEIRO" value="PASSAGEIRO" />
                  <FormControlLabel control={<Radio />} label="OUTROS" value="OUTROS" />
                </RadioGroup>
              </FormGroup>
            </Container>
            <BotaoCustomizado type="submit">Cadastrar</BotaoCustomizado>
          </form>
        </BoxCustomizado>
      </Modal>
    </>
  );
}
