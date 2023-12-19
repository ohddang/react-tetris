import React from 'react';

import Board from '../components/board';
import { TimerContext } from '../context/timerContext';
import { UseTimer } from '../hooks/timer';

function Ingame () {
  const [time, setTime] = UseTimer();
  console.log("draw Ingame");

  return (
    <TimerContext.Provider value={time}>
        {/* <h3>Tetris</h3> */}
        <Board />
    </TimerContext.Provider>
  );
}

export default Ingame;