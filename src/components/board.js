import "../CSS/ingame.css"

import React, { useState } from "react"
import CellGrid from './cellGrid.js'

function Board() {
  const initArray = Array.from({ length: 10 }, () => Array.from({ length: 20 }, () => 1));
  const [cellType, setCellType] = useState(initArray);

  return (
    <div className='board'>
      <CellGrid cellType={cellType} setCellType={setCellType} />
    </div>
  );
};

export default Board;