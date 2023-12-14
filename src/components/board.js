import "../CSS/ingame.css"

import React, { useState } from "react"
import CellGrid from './cellGrid.js'

//
// cell들의 상태를 관리하는 컴포넌트
//
function Board() {
  const initArray = Array.from({ length: 10 }, () => Array.from({ length: 20 }, () => 1));
  const [cellType, setCellType] = useState(initArray);
  console.log(initArray);


  console.log("Draw Board");

  // context api : time
  return (
    <div className='board'>
      <CellGrid cellType={cellType} setCellType={setCellType} />
    </div>
  );
};

export default Board;