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
import { Abordado, Veiculo } from "../../../../../interfaces/RSO";

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
  const [veiculo, setVeicullo] = useState({
    marcaModelo: '',
    cor: '',
    placa: '',
    numeracaoAIT: '',
    numeracaoCRR: '',
    observacao: '',
  });

  const [situacao, setSituacao] = useState('');
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [horarioAbordagem, setHorarioAbordagem] = useState(() => {
    const date = new Date();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  });

  const adicionaVeiculo = (novoVeiculo: Veiculo) => {
    setVeiculos([...veiculos, novoVeiculo]); // Adiciona um novo abordado ao array
  };


  const atualizaVeiculo = (campo: string, valor: string) => {
    setVeicullo((prevAbordado) => ({
      ...prevAbordado,
      [campo]: valor
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const novoVeiculo = {
      marcaModelo: veiculo.marcaModelo,
      cor: veiculo.cor,
      placa: veiculo.placa,
      numeracaoAIT: veiculo.numeracaoAIT,
      numeracaoCRR: veiculo.numeracaoCRR,
      observacao: veiculo.observacao
    };
  
    rsoStore.adicionaVeiculo(novoVeiculo); // Adiciona ao MobX store
    adicionaVeiculo(novoVeiculo); // Adiciona ao estado local do React
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
          <Titulo>Cadastre o Veiculo:</Titulo>
          <form onSubmit={handleSubmit}>
            <Container>
              <CampoDigitacao
                tipo="text"
                label="Marca/Modelo"
                valor={veiculo.marcaModelo}
                obrigatorio={true}
                placeholder="Digite a marca e modelo do veiculo"
                onChange={(valor) => atualizaVeiculo('marcaModelo', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Cor"
                valor={veiculo.cor}
                obrigatorio={true}
                placeholder="Digite a cor"
                onChange={(valor) => atualizaVeiculo('cor', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Placa"
                valor={veiculo.placa}
                obrigatorio={true}
                placeholder="Digite a placa do veliculo"
                onChange={(valor) => atualizaVeiculo('placa', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Numeração do AIT"
                valor={veiculo.numeracaoAIT}
                placeholder="Digite o número do AIT"
                onChange={(valor) => atualizaVeiculo('numeracaoAIT', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Numeração da CNH"
                valor={veiculo.numeracaoCRR}
                placeholder="Digite a numeeração da CNH"
                onChange={(valor) => atualizaVeiculo('numeracaoCRR', valor)}
              />
              <CampoDigitacao
                tipo="text"
                label="Observações"
                valor={veiculo.observacao}
                placeholder="Observações"
                onChange={(valor) => atualizaVeiculo('observacao', valor)}
              />
            </Container>
            <BotaoCustomizado type="submit">Cadastrar</BotaoCustomizado>
          </form>
        </BoxCustomizado>
      </Modal>
    </>
  );
}
