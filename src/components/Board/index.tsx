import React, { useEffect, useState } from 'react';
import { Efetivo } from "../../interfaces/Efetivo";
import { produce } from 'immer';
import BoardContext from './context';
import List from '../List';
import { Container } from './styles';
import { pegaTodoEfetivo } from '../../servicos/EfetivoServico';
import { ListaDeCards } from '../../interfaces/ListaDeCards';
import { Button } from '@mui/material';
import { ADD } from 'mobx/dist/internal';
import { ADM } from '../List/ADM';
import { PEL1 } from '../List/1PEL';
import { PEL2 } from '../List/2PEL';

// Função para agrupar policiais por equipe
function agruparPorEquipe(policiais: Efetivo[]): ListaDeCards[] {
  const equipesMap: Record<string, Efetivo[]> = {};

  // Agrupar policiais por equipe
  for (const policial of policiais) {
    const { EQUIPE } = policial;

    if (!equipesMap[EQUIPE]) {
      equipesMap[EQUIPE] = [];
    }

    equipesMap[EQUIPE].push(policial);
  }

  // Transformar o objeto em um array de equipes
  return Object.keys(equipesMap).map(title => ({
    title,
    creatable: true, // Define se novos cartões podem ser criados nesta lista
    cards: equipesMap[title].map((policial, index) => ({
      id: index + 1, // Gerar um ID para o cartão, pode ser ajustado conforme necessário
      content: `${policial.GRAD} ${policial.RE}-${policial.DIG} ${policial.NOME}`, // O conteúdo do cartão será o nome do policial
      grad: policial.GRAD,
      equipe: policial.EQUIPE,
      user: policial.USER && policial.USER,
      sat: policial.SAT,
      vtr: policial.VTR
    })),
  }));
}

export default function Board() {
  const [listadeCards, setListaDeCards] = useState<ListaDeCards[]>([]);
  const [lists, setLists] = useState();
   
  useEffect(() => {
    async function efetivo() {
      try {
        const resultado: Efetivo[] = await pegaTodoEfetivo();
        if (resultado) {
          const policiais: Efetivo[] = resultado;

          // Agrupar e definir o estado com o resultado agrupado
          const equipesAgrupadas = agruparPorEquipe(policiais);
          // console.log(JSON.stringify(equipesAgrupadas))

          // Ordenar as listas: letras primeiro, depois números
          const equipesOrdenadas = equipesAgrupadas.sort((a, b) => {
            const regex = /^[0-9]/; // Expressão regular para identificar números

            const aIsNumber = regex.test(a.title);
            const bIsNumber = regex.test(b.title);

            // Se ambos forem números, ordena normalmente
            if (aIsNumber && bIsNumber) {
              return a.title.localeCompare(b.title);
            }

            // Se 'a' for número e 'b' não, 'b' vem primeiro
            if (aIsNumber) return 1;

            // Se 'b' for número e 'a' não, 'a' vem primeiro
            if (bIsNumber) return -1;

            // Se nenhum for número, ordena normalmente
            return a.title.localeCompare(b.title);
          });
          // console.log(`equipesOrdenadas é ${JSON.stringify(equipesOrdenadas)}`)
          console.log(equipesOrdenadas )
          setListaDeCards(equipesOrdenadas);
        }
      } catch (error) {
        alert("Erro no servidor. Tente novamente mais tarde.");
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }
    efetivo();
  }, []); 

  function move(fromList: any, toList: any, from: any, to: any) {
    setListaDeCards(produce(listadeCards, draft => {
      const dragged = draft[fromList].cards[from];

      // Atualiza a equipe do policial ao mover para a nova lista
      dragged.equipe = draft[toList].title;

      // Remove o policial da lista original
      draft[fromList].cards.splice(from, 1);
      
      // Adiciona o policial à nova lista
      draft[toList].cards.splice(to, 0, dragged);
    }));
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Button>Salvar</Button>
      {/*  */}
      <PEL1/>
      <PEL2/>
      {/* <Container>
        {listadeCards.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container> */}
    </BoardContext.Provider>
  );
}
