import React from 'react';
import Board from '../components/board';
import { UseTimer } from '../hooks/timer';

function Ingame () {
  const time = UseTimer(); // TODO : 타이머 어떤 컴포넌트에서 사용해야할까..

  return (
      <Board />
  );
}

export default Ingame;