import React, { useState } from "react";
import { UseCellInfo } from './cellInfo.js';

import "../CSS/ingame.css"


function Cell({ type, id }) {
  let cell = [];

  if (type === 1)
    cell.push(<div className='block' key={id}></div>);
  if (type === 0)
    cell.push(<div className='none' key={id}></div>);
  if (type === 2)
    cell.push(<div className='my' key={id}></div>);

  return cell;
}

function Board() {
  const [cellInfo, setCellInfo] = UseCellInfo();
  
  function makeBoard() {
    let board = [];
    for (let y = 19; y >= 0; --y) {
      for (let x = 9; x >= 0; --x) {
          board.push(<Cell type={cellInfo[x][y]} id={x*100+y}/>);
      }
    }
    return board;
  }

  return (
    <div className='board'>
      {makeBoard()}
    </div>
  );
};

export default Board;