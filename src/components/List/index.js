import React from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
      </header>
      <ul>
        { data.cards.map((card, index) => (
          <Card 
            key={card.re} 
            listIndex={listIndex}
            index={index} 
            data={card}
          />
        )) }
      </ul>
    </Container>
  );
}
