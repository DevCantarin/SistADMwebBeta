import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container } from './styles';
import { CardInt } from '../../interfaces/Card';

interface CardProps {
  data: CardInt,
  index: any,
  listIndex: any
}

export default function Card({ data, index, listIndex }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { move }: any = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD', // Defina 'type' diretamente
    item: { index, listIndex, equipe: data.equipe }, // 'item' contém apenas os dados do item
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: any, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      console.log(item.equipe) // card que eh arreastado
      console.log(data.equipe) // card que recebe o arraste

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current && ref.current.getBoundingClientRect();
      const targetCenter = targetSize && (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset && targetSize ? draggedOffset.y - targetSize.top : null;

      if (draggedTop && targetCenter) {
        if (draggedIndex < targetIndex && draggedTop < targetCenter) {
          return;
        }

        if (draggedIndex > targetIndex && draggedTop > targetCenter) {
          return;
        }
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container
      ref={ref}
      isDragging={isDragging}
      color={data.grad === "Cb PM" ? "green" :
        data.grad === "Sd PM" ? "blue":
        data.grad === "Cap PM" ? "yellow":    
        "red"}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding:0 }}>
        {data.user && (
          <img
            src={data.user}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        )}
      <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", margin:10 }} >
        <p>{`NOME: ${data.content}`}</p>
        <p>{data.sat ? `SAT: ${data.sat}`:'SAT:'}</p>
        <p>{data.vtr && data.vtr }</p>
      </div  >
      </div>
    </Container>
  );
}
