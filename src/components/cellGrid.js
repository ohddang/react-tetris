import "../CSS/ingame.css"

import { useEffect } from 'react';
import Cell from './Cell.js'
import UsePlayer from '../hooks/player.js';

export function CellGrid({ cellType, setCellType }) {
  const [playerState, setPlayerState] = UsePlayer();

  const NONE = 0; // TODO : move const.js
  const BLOCK = 1; // TODO : move const.js
  const PLAYER = 2; // TODO : move const.js
  //
  // useEffect로 playerState 감지
  //
  const updateElement = (row, col, type) => {
    setCellType(prevCellType => {
      // 이중 배열의 불변성을 유지하며 특정 요소 업데이트

      console.log(`${row} ${col} ${type}`)

      if (row == undefined || col == undefined) // TODO : check why undefined
        return [...prevCellType];

      try {
        // new
        const newCellType = [...prevCellType];
        newCellType[row] = [...prevCellType[row]];
        newCellType[row][col] = type;

        // reset
        newCellType[row][col + 1] = NONE;

        return newCellType;
      } catch (e) {
        console.error(e);
      }
    });
  };

  useEffect(() => {
    updateElement(playerState.site_x, playerState.site_y, PLAYER); // TODO : cellType:2(player) -> const, context or enum
  }, [playerState]);


  // draw
  function makeGrid() {
    let items = [];
    for (let y = 19; y >= 0; --y) {
      for (let x = 9; x >= 0; --x) {
        items.push(<Cell type={cellType[x][y]} id={x * 100 + y} />);
      }
    }
    return items;
  }

  return (
    <>
      <div className="cellGrid">
        {makeGrid()}
      </div>
    </>
  );
}

export default CellGrid;
