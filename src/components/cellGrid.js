import { useEffect } from 'react';
import Cell from './cell.js'
import UsePlayer from '../hooks/player.js';

export function CellGrid({ cellType, setCellType }) {
  console.log("Draw CellGrid");
  const [playerState, setPlayerState] = UsePlayer();

  //
  // useEffect로 playerState 감지
  //
  const updateElement = (row, col, type) => {
    setCellType(prevCellType => {
      // 이중 배열의 불변성을 유지하며 특정 요소 업데이트

      console.log(`${row} ${col} ${type}`)

      if(row == undefined || col == undefined) // TODO : check why undefined
        return [...prevCellType];              //

      const newCellType = [...prevCellType];
      newCellType[row] = [...prevCellType[row]];
      newCellType[row][col] = type;
      return newCellType;
    });
  };

  const playerType = 2;
  useEffect(() => {
    updateElement(playerState.site_x, playerState.site_y, playerType); // TODO : cellType:2(player) -> const, context or enum
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
      {makeGrid()}
    </>
  );
}

export default CellGrid;
